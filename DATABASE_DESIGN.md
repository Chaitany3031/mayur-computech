# Supabase PostgreSQL Database Architecture & Schema Specification (DATABASE_DESIGN.md)

This specification documents the production **Supabase PostgreSQL** schema, **Clerk Authentication** integration, **Row Level Security (RLS)** policies, and **Dynamic Block-Based Headless CMS** architecture for the **Mayur Computech** web platform (Maharashtra State Authorised Center Code: `78210482`).

---

## 1. Architecture Overview & Identity Flow

### 1.1 Clerk & Supabase Integration Model
Supabase acts as the primary data store and authorization engine, while Clerk provides user identity management, multi-factor authentication, and session handling:

1. **User Authentication (Clerk)**: The client authenticates via Clerk (`SignIn`, `SignUp`, Google OAuth).
2. **JWT Delegation (Clerk Supabase Integration)**: Clerk generates a signed JWT token using the Supabase JWT secret configured in the Clerk dashboard.
3. **Database Authorization (Supabase RLS)**: Supabase inspects the incoming JWT via `auth.jwt() ->> 'sub'` (which contains the Clerk user ID `user_2...`).
4. **Local Profile & RBAC Mapping**: The Supabase `public.users` table maps the unique `clerk_id` to a `role_id` (`SUPER_ADMIN` or `CLIENT_ADMIN`), evaluating fine-grained permissions stored in `role_permissions`.

```
+------------------+         +------------------+         +-----------------------+
|   Client App     |         |   Clerk Auth     |         |  Supabase PostgreSQL  |
|  (React / Vite)  |         |   Identity Core  |         |  (Database + RLS)     |
+--------+---------+         +--------+---------+         +-----------+-----------+
         |                            |                               |
         | 1. Sign In / Authenticate  |                               |
         +--------------------------->|                               |
         |                            |                               |
         | 2. Issues JWT (claims.sub) |                               |
         |<---------------------------+                               |
         |                                                            |
         | 3. Query with Bearer JWT (or Clerk session token)          |
         +----------------------------------------------------------->|
         |                                                            |
         |                                4. Evaluates auth.jwt() sub |
         |                                   Maps clerk_id -> role_id |
         |                                   Enforces RLS Policies    |
         |                                                            |
         | 5. Returns Filtered Data (Published or Scoped Admin Rows)  |
         |<-----------------------------------------------------------+
```

---

## 2. Entity Relationship Diagram (ERD)

```
        +-----------------------------------------------------------+
        |                           roles                           |
        |  id (UUID PK) | name (TEXT UNIQUE) | label | is_system    |
        +--------------+------------------------------+-------------+
                       ^                              ^
                       | 1:N                          | M:N
        +--------------+-------------+  +-------------+-------------+
        |            users           |  |      role_permissions     |
        | id (UUID PK)               |  | role_id (UUID FK)         |
        | clerk_id (TEXT UNIQUE)     |  | permission_id (UUID FK)   |
        | email (TEXT)               |  +-------------+-------------+
        | role_id (UUID FK -> roles) |                |
        | status (TEXT)              |                v
        +----------------------------+  +---------------------------+
                                        |        permissions        |
                                        | id (UUID PK)              |
                                        | code (TEXT UNIQUE)        |
                                        | module (TEXT) | action    |
                                        +---------------------------+

        +-----------------------------------------------------------+
        |                           pages                           |
        | id (UUID PK) | slug (TEXT UNIQUE) | title | status        |
        | seo_metadata (JSONB) | created_by | published_at          |
        +----------------------------+------------------------------+
                                     | 1:N
                                     v
        +-----------------------------------------------------------+
        |                       page_sections                       |
        | id (UUID PK) | page_id (UUID FK -> pages)                 |
        | section_key (TEXT) | block_type (TEXT) | order_index (INT)|
        | content (JSONB) | settings (JSONB) | is_visible (BOOLEAN) |
        +-----------------------------------------------------------+

        +-----------------------------------------------------------+
        |                          courses                          |
        | id (UUID PK) | slug (TEXT UNIQUE) | title | category      |
        | duration | level | price | badge | highlights (JSONB)     |
        | syllabus (JSONB) | career_prospects (JSONB) | status      |
        +-----------------------------------------------------------+

        +-----------------------------------------------------------+
        |                         enquiries                         |
        | id (UUID PK) | full_name | phone | course_interested      |
        | message | status (new / contacted / enrolled) | source    |
        +-----------------------------------------------------------+
```

---

## 3. Production Supabase DDL (Schema Definition)

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if performing full schema rebuild (in reverse dependency order)
-- DROP TABLE IF EXISTS public.page_sections CASCADE;
-- DROP TABLE IF EXISTS public.pages CASCADE;
-- DROP TABLE IF EXISTS public.enquiries CASCADE;
-- DROP TABLE IF EXISTS public.courses CASCADE;
-- DROP TABLE IF EXISTS public.role_permissions CASCADE;
-- DROP TABLE IF EXISTS public.permissions CASCADE;
-- DROP TABLE IF EXISTS public.users CASCADE;
-- DROP TABLE IF EXISTS public.roles CASCADE;

-- ============================================================================
-- 1. ROLES TABLE
-- Defines authorization hierarchy (SUPER_ADMIN, CLIENT_ADMIN)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,                       -- 'SUPER_ADMIN', 'CLIENT_ADMIN', 'INSTRUCTOR'
    label TEXT NOT NULL,                             -- 'Super Administrator', 'Institute Client Admin'
    description TEXT,                                -- Summary of administrative scope
    is_system BOOLEAN NOT NULL DEFAULT false,        -- Prevents deletion of core roles
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.roles IS 'Administrative roles for granular RBAC.';

-- ============================================================================
-- 2. PERMISSIONS TABLE
-- Atomic permissions for individual operations
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,                       -- E.g. 'courses.publish', 'sections.reorder'
    module TEXT NOT NULL,                            -- 'courses', 'pages', 'leads', 'users', 'system'
    action TEXT NOT NULL,                            -- 'view', 'edit', 'publish', 'manage', 'reorder'
    label TEXT NOT NULL,                             -- Friendly UI label
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.permissions IS 'Fine-grained capability flags.';

-- ============================================================================
-- 3. ROLE_PERMISSIONS TABLE (Junction)
-- Maps permissions to roles in an M:N matrix
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.role_permissions (
    role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (role_id, permission_id)
);

COMMENT ON TABLE public.role_permissions IS 'Junction mapping permissions to roles.';

-- ============================================================================
-- 4. USERS TABLE (Linked to Clerk Authentication)
-- Mirrors Clerk users and assigns local RBAC role
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_id TEXT NOT NULL UNIQUE,                   -- Clerk User ID (e.g. 'user_2xyz...')
    email TEXT NOT NULL,
    display_name TEXT NOT NULL DEFAULT '',
    avatar_url TEXT,
    phone_number TEXT,
    role_id UUID REFERENCES public.roles(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON public.users(clerk_id);
CREATE INDEX IF NOT EXISTS idx_users_role_id ON public.users(role_id);
CREATE INDEX IF NOT EXISTS idx_users_status ON public.users(status);

COMMENT ON TABLE public.users IS 'Internal user profile linked to external Clerk auth identifier.';

-- ============================================================================
-- 5. PAGES TABLE
-- Routes and metadata for the dynamic CMS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,                       -- E.g. 'home', 'courses', 'about'
    title TEXT NOT NULL,                             -- E.g. 'Home - Mayur Computech'
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    seo_metadata JSONB NOT NULL DEFAULT '{
        "title": "Mayur Computech — Computer Education & Typing Center",
        "description": "Maharashtra State Authorised Center Code: 78210482. MS-CIT, Tally Prime, Coding, Typing in Ghansoli.",
        "ogTitle": "Mayur Computech Ghansoli",
        "ogDescription": "Govt. Valid Computer Training & Certifications",
        "ogImage": "",
        "canonicalUrl": "",
        "noIndex": false
    }'::jsonb,
    created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON public.pages(status);

COMMENT ON TABLE public.pages IS 'Top-level CMS pages.';

-- ============================================================================
-- 6. PAGE_SECTIONS TABLE (Dynamic CMS Block Architecture)
-- Decoupled content blocks that can be rendered, ordered, and styled dynamically
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.page_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
    section_key TEXT NOT NULL,                       -- Unique identifier within the page (e.g. 'hero_block')
    block_type TEXT NOT NULL,                        -- Component name: 'HeroSection', 'CoursesCatalog', 'MentorSpotlight', etc.
    order_index INTEGER NOT NULL DEFAULT 0,          -- Layout position sequence (0, 1, 2...)
    content JSONB NOT NULL DEFAULT '{}'::jsonb,      -- Component-specific typed content
    settings JSONB NOT NULL DEFAULT '{
        "theme": "dark",
        "container": "standard",
        "paddingY": "normal",
        "animate": true
    }'::jsonb,
    is_visible BOOLEAN NOT NULL DEFAULT true,        -- Dynamic visibility switch
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_page_section_key UNIQUE (page_id, section_key)
);

CREATE INDEX IF NOT EXISTS idx_page_sections_order ON public.page_sections(page_id, order_index ASC);
CREATE INDEX IF NOT EXISTS idx_page_sections_visibility ON public.page_sections(page_id, is_visible, status);
CREATE INDEX IF NOT EXISTS idx_page_sections_block_type ON public.page_sections(block_type);

COMMENT ON TABLE public.page_sections IS 'Modular content blocks composing dynamic CMS layouts.';

-- ============================================================================
-- 7. COURSES TABLE
-- Curriculum engine for all 12 government-authorized and professional courses
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,                       -- 'ms-cit', 'tally-prime-gst', 'marathi-typing-30'
    title TEXT NOT NULL,                             -- 'MS-CIT (Govt. Certified)'
    tagline TEXT NOT NULL DEFAULT '',                -- 'Maharashtra Knowledge Corporation Official IT Course'
    short_description TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT 'beginner' CHECK (category IN ('beginner', 'tech', 'business')),
    duration TEXT NOT NULL,                          -- '3 Months (Flexible Lab Hours)'
    level TEXT NOT NULL DEFAULT 'Beginner to Advanced',
    price NUMERIC(10, 2),                            -- Base course fee in INR
    discount_price NUMERIC(10, 2),                   -- Promo / subsidized fee in INR
    badge TEXT,                                      -- E.g. 'Govt. Valid · Center: 78210482'
    highlights JSONB NOT NULL DEFAULT '[]'::jsonb,   -- Array of string bullet points
    syllabus JSONB NOT NULL DEFAULT '[]'::jsonb,     -- Structured array of { moduleNumber, title, topics: [] }
    career_prospects JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of job roles
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_status_order ON public.courses(status, display_order ASC);
CREATE INDEX IF NOT EXISTS idx_courses_syllabus ON public.courses USING gin (syllabus);

COMMENT ON TABLE public.courses IS 'Course curriculum, pricing, syllabus modules, and credentials.';

-- ============================================================================
-- 8. ENQUIRIES TABLE (CRM Leads)
-- Capture trial demo classes and admissions
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    course_interested TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'enrolled', 'closed')),
    source TEXT NOT NULL DEFAULT 'website_modal',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_phone ON public.enquiries(phone);

COMMENT ON TABLE public.enquiries IS 'Inbound admissions leads and demo class requests.';
```

---

## 4. RBAC Helper Functions (Supabase + Clerk JWT)

In Supabase, requests authenticated via Clerk supply a JWT with the user's Clerk identifier in `claims.sub`. The following helper functions extract this context efficiently:

```sql
-- 1. Extract Clerk user ID from Supabase auth.jwt() or request headers
CREATE OR REPLACE FUNCTION public.current_clerk_id()
RETURNS TEXT AS $$
BEGIN
    -- Check Supabase auth.jwt() first, fallback to request.jwt.claims
    RETURN COALESCE(
        NULLIF(auth.jwt() ->> 'sub', ''),
        NULLIF(current_setting('request.jwt.claims', true)::jsonb ->> 'sub', ''),
        NULLIF(current_setting('app.current_user_id', true), '')
    );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- 2. Resolve active role name of caller ('SUPER_ADMIN', 'CLIENT_ADMIN', or 'ANONYMOUS')
CREATE OR REPLACE FUNCTION public.current_role_name()
RETURNS TEXT AS $$
DECLARE
    r_name TEXT;
BEGIN
    SELECT r.name INTO r_name
    FROM public.users u
    JOIN public.roles r ON u.role_id = r.id
    WHERE u.clerk_id = public.current_clerk_id() 
      AND u.status = 'active'
    LIMIT 1;

    RETURN COALESCE(r_name, 'ANONYMOUS');
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- 3. Check if the current user possesses a specific permission code
CREATE OR REPLACE FUNCTION public.has_permission(required_code TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    current_role TEXT;
    has_perm BOOLEAN := false;
BEGIN
    current_role := public.current_role_name();

    -- SUPER_ADMIN has universal access
    IF current_role = 'SUPER_ADMIN' THEN
        RETURN true;
    END IF;

    -- Query role_permissions junction table
    SELECT EXISTS (
        SELECT 1
        FROM public.users u
        JOIN public.role_permissions rp ON u.role_id = rp.role_id
        JOIN public.permissions p ON rp.permission_id = p.id
        WHERE u.clerk_id = public.current_clerk_id()
          AND u.status = 'active'
          AND p.code = required_code
    ) INTO has_perm;

    RETURN has_perm;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
```

---

## 5. Supabase Row Level Security (RLS) Policies

### 5.1 Enable RLS Across All Tables
```sql
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
```

### 5.2 Roles & Permissions Policies
```sql
-- Allow authenticated administrators to read roles and permissions
CREATE POLICY "admin_read_roles" ON public.roles
    FOR SELECT
    USING (public.current_role_name() IN ('SUPER_ADMIN', 'CLIENT_ADMIN'));

CREATE POLICY "admin_read_permissions" ON public.permissions
    FOR SELECT
    USING (public.current_role_name() IN ('SUPER_ADMIN', 'CLIENT_ADMIN'));

CREATE POLICY "admin_read_role_permissions" ON public.role_permissions
    FOR SELECT
    USING (public.current_role_name() IN ('SUPER_ADMIN', 'CLIENT_ADMIN'));

-- Super Admin has full write access to configure roles & permissions
CREATE POLICY "super_admin_manage_roles" ON public.roles
    FOR ALL
    USING (public.current_role_name() = 'SUPER_ADMIN')
    WITH CHECK (public.current_role_name() = 'SUPER_ADMIN');

CREATE POLICY "super_admin_manage_permissions" ON public.permissions
    FOR ALL
    USING (public.current_role_name() = 'SUPER_ADMIN')
    WITH CHECK (public.current_role_name() = 'SUPER_ADMIN');

CREATE POLICY "super_admin_manage_role_permissions" ON public.role_permissions
    FOR ALL
    USING (public.current_role_name() = 'SUPER_ADMIN')
    WITH CHECK (public.current_role_name() = 'SUPER_ADMIN');
```

### 5.3 Users Table Policies
```sql
-- Any authenticated user can view their own profile
CREATE POLICY "users_read_own" ON public.users
    FOR SELECT
    USING (clerk_id = public.current_clerk_id());

-- Super Admin has full control to list, invite, and update roles
CREATE POLICY "super_admin_manage_all_users" ON public.users
    FOR ALL
    USING (public.current_role_name() = 'SUPER_ADMIN')
    WITH CHECK (public.current_role_name() = 'SUPER_ADMIN');

-- Client Admin can view active instructors & staff if granted 'users.view'
CREATE POLICY "client_admin_view_users" ON public.users
    FOR SELECT
    USING (public.has_permission('users.view'));
```

### 5.4 Pages & Dynamic Sections Policies (Headless CMS)
```sql
-- Public: Anyone can view published pages
CREATE POLICY "public_read_published_pages" ON public.pages
    FOR SELECT
    USING (status = 'published');

-- Public: Anyone can view visible sections belonging to a published page
CREATE POLICY "public_read_visible_sections" ON public.page_sections
    FOR SELECT
    USING (
        is_visible = true 
        AND status = 'published'
        AND EXISTS (
            SELECT 1 FROM public.pages p
            WHERE p.id = page_sections.page_id AND p.status = 'published'
        )
    );

-- Staff: View draft & archived pages and sections
CREATE POLICY "staff_read_all_pages" ON public.pages
    FOR SELECT
    USING (public.has_permission('pages.view'));

CREATE POLICY "staff_read_all_sections" ON public.page_sections
    FOR SELECT
    USING (public.has_permission('sections.view'));

-- Staff: Update page sections (layout reorder, text edits)
CREATE POLICY "staff_update_sections" ON public.page_sections
    FOR UPDATE
    USING (public.has_permission('sections.edit') OR public.has_permission('sections.reorder'))
    WITH CHECK (public.has_permission('sections.edit') OR public.has_permission('sections.reorder'));

-- Super Admin: Full management
CREATE POLICY "super_admin_manage_pages" ON public.pages
    FOR ALL
    USING (public.current_role_name() = 'SUPER_ADMIN')
    WITH CHECK (public.current_role_name() = 'SUPER_ADMIN');

CREATE POLICY "super_admin_manage_sections" ON public.page_sections
    FOR ALL
    USING (public.current_role_name() = 'SUPER_ADMIN')
    WITH CHECK (public.current_role_name() = 'SUPER_ADMIN');
```

### 5.5 Courses Table Policies
```sql
-- Public: Anyone can view published courses
CREATE POLICY "public_read_published_courses" ON public.courses
    FOR SELECT
    USING (status = 'published');

-- Staff: View all courses including drafts
CREATE POLICY "staff_read_all_courses" ON public.courses
    FOR SELECT
    USING (public.has_permission('courses.view'));

-- Staff: Edit course content & draft updates
CREATE POLICY "staff_edit_courses" ON public.courses
    FOR UPDATE
    USING (public.has_permission('courses.edit'))
    WITH CHECK (
        -- Client Admin can edit draft/active courses, but publishing requires 'courses.publish'
        public.has_permission('courses.publish') OR NEW.status <> 'published'
    );

-- Super Admin: Full management (create, delete, publish live)
CREATE POLICY "super_admin_manage_courses" ON public.courses
    FOR ALL
    USING (public.current_role_name() = 'SUPER_ADMIN')
    WITH CHECK (public.current_role_name() = 'SUPER_ADMIN');
```

### 5.6 Enquiries Table Policies (CRM)
```sql
-- Public: Allow any visitor to submit an admission enquiry
CREATE POLICY "public_insert_enquiry" ON public.enquiries
    FOR INSERT
    WITH CHECK (
        length(trim(full_name)) > 1 
        AND length(trim(phone)) >= 10
    );

-- Staff: Manage, view, and update enquiry lead status
CREATE POLICY "staff_manage_enquiries" ON public.enquiries
    FOR ALL
    USING (public.has_permission('enquiries.manage'))
    WITH CHECK (public.has_permission('enquiries.manage'));
```

---

## 6. Dynamic CMS Block Architecture & Content Schemas

The `page_sections.content` JSONB column stores block-specific configurations. Below are the standard schemas matching the React components:

### 6.1 `HeroSection`
```json
{
  "badge": "Maharashtra State Authorised · Center Code: 78210482",
  "headline": "Empowering Navi Mumbai with Future-Ready Tech Skills",
  "subheadline": "Individual PC workstations, government-certified courses, and 1-on-1 mentorship by Mayur Sir in Ghansoli.",
  "googleRating": 4.9,
  "totalReviews": 130,
  "stats": [
    { "label": "Students Trained", "value": "1,500+" },
    { "label": "Center Experience", "value": "10+ Years" },
    { "label": "Govt Exam Passing", "value": "98.4%" }
  ],
  "primaryCta": { "label": "Book Free Demo Class", "action": "open_enquiry" },
  "secondaryCta": { "label": "Explore 12 Courses", "action": "scroll_courses" }
}
```

### 6.2 `CoursesCatalog`
```json
{
  "title": "Government & Industry Certified Courses",
  "subtitle": "Job-ready curricula with dedicated 1-on-1 practical lab training.",
  "defaultFilter": "all",
  "categories": ["all", "beginner", "tech", "business"]
}
```

### 6.3 `WhyChooseUs`
```json
{
  "title": "Why Choose Mayur Computech",
  "subtitle": "Built differently from standard coaching classes.",
  "features": [
    { "title": "1:1 Personal Mentorship", "description": "Individual attention by Mayur Sir." },
    { "title": "100% Dedicated Workstation", "description": "No machine sharing during lab sessions." },
    { "title": "Govt. Recognized Certification", "description": "Valid for MPSC, Police Bharti, and private jobs." },
    { "title": "Flexible 7-Day Lab Timings", "description": "Open from 7:30 AM to 9:30 PM." }
  ]
}
```

### 6.4 `MentorSpotlight`
```json
{
  "name": "Mayur Sir",
  "role": "Founder & Principal Technical Mentor",
  "experience": "10+ Years Dedicated Teaching",
  "quote": "Every student learns at their own pace. At Mayur Computech, we don't move to the next topic until your fundamentals are rock-solid.",
  "directPhone": "+91 86550 50595",
  "credentials": [
    "Certified MS-CIT & GCC-TBC Instructor",
    "Tally Prime & GST Specialist",
    "Over 1,500 students mentored into IT & Govt jobs"
  ]
}
```

---

## 7. Seed Script (Bootstrap Roles, Permissions & 12 Courses)

```sql
-- 1. Insert Roles
INSERT INTO public.roles (name, label, description, is_system) VALUES
('SUPER_ADMIN', 'Super Administrator', 'Unrestricted administrative access across all CMS modules and user management.', true),
('CLIENT_ADMIN', 'Client Admin (Mayur Sir / Staff)', 'Course syllabus editor, admission lead manager, and page block layout orchestrator.', true)
ON CONFLICT (name) DO NOTHING;

-- 2. Insert Permissions
INSERT INTO public.permissions (code, module, action, label, description) VALUES
('courses.view', 'courses', 'view', 'View Courses', 'Can view courses including drafts.'),
('courses.edit', 'courses', 'edit', 'Edit Courses', 'Can update syllabus, fees, and course copy.'),
('courses.publish', 'courses', 'publish', 'Publish Courses', 'Can publish or unpublish course listings.'),
('sections.view', 'pages', 'view', 'View Sections', 'Can view block layout.'),
('sections.edit', 'pages', 'edit', 'Edit Sections', 'Can edit block text and settings.'),
('sections.reorder', 'pages', 'reorder', 'Reorder Layout', 'Can rearrange sequence of landing blocks.'),
('enquiries.manage', 'leads', 'manage', 'Manage Leads', 'Can view and change admission lead status.'),
('users.view', 'users', 'view', 'View Users', 'Can view user directory.'),
('users.manage', 'users', 'manage', 'Manage Users', 'Can provision or suspend user accounts.')
ON CONFLICT (code) DO NOTHING;

-- 3. Link SUPER_ADMIN to all permissions
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r, public.permissions p
WHERE r.name = 'SUPER_ADMIN'
ON CONFLICT DO NOTHING;

-- 4. Link CLIENT_ADMIN to operational permissions
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r, public.permissions p
WHERE r.name = 'CLIENT_ADMIN'
  AND p.code IN (
      'courses.view',
      'courses.edit',
      'sections.view',
      'sections.edit',
      'sections.reorder',
      'enquiries.manage'
  )
ON CONFLICT DO NOTHING;

-- 5. Seed Homepage Record
INSERT INTO public.pages (slug, title, status)
VALUES ('home', 'Mayur Computech — Home', 'published')
ON CONFLICT (slug) DO NOTHING;
```

---

## 8. TypeScript Types Reference (Client Integration)

```typescript
export type UserRole = 'SUPER_ADMIN' | 'CLIENT_ADMIN';

export type PermissionCode =
  | 'courses.view'
  | 'courses.edit'
  | 'courses.publish'
  | 'sections.view'
  | 'sections.edit'
  | 'sections.reorder'
  | 'enquiries.manage'
  | 'users.view'
  | 'users.manage';

export interface PageSectionRecord<T = Record<string, any>> {
  id: string;
  page_id: string;
  section_key: string;
  block_type: 'HeroSection' | 'CoursesCatalog' | 'WhyChooseUs' | 'MentorSpotlight' | 'GoogleReviews' | 'FAQSection' | 'ContactSection';
  order_index: number;
  content: T;
  settings: {
    theme: 'dark' | 'light';
    container: 'standard' | 'full';
    paddingY: 'compact' | 'normal' | 'spacious';
    animate: boolean;
  };
  is_visible: boolean;
  status: 'draft' | 'published' | 'archived';
}

export interface CourseRecord {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  short_description: string;
  description: string;
  category: 'beginner' | 'tech' | 'business';
  duration: string;
  level: string;
  price?: number;
  discount_price?: number;
  badge: string;
  highlights: string[];
  syllabus: {
    moduleNumber: number;
    title: string;
    topics: string[];
  }[];
  career_prospects: string[];
  is_featured: boolean;
  display_order: number;
  status: 'draft' | 'published' | 'archived';
}
```
