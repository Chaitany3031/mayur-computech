# MAYUR COMPUTECH — SYSTEM ARCHITECTURE & HIGH-LEVEL DESIGN (ARCHITECTURE.md)

**Document Version:** 1.0.0  
**Authority:** Maharashtra State Authorised Center Code: `78210482`  
**Target Environments:** Public Student Portal & Next-Gen Headless CMS  

---

## 1. Executive Summary & Vision

**Mayur Computech** is designed and engineered as a high-performance, dark-themed technology and computer education platform featuring a dynamic Headless Content Management System (CMS) and granular Role-Based Access Control (RBAC).

The system enforces strict architectural decoupling across three primary domains:
1. **Public Website**: Ultra-fast, SEO-optimized, accessible public presence showcasing the 12 government-recognized courses, verified credentials, and high-conversion student admission workflows.
2. **Super Admin CMS**: Universal root authority over system configurations, permission matrices, user provisioning, audit logging, and final publishing gates.
3. **Client Admin CMS**: Purpose-built, distraction-free operational workspace for Mayur Sir and institute staff to update course syllabi, reorder page blocks, and track student admission leads.

The underlying infrastructure coordinates three specialized services:
- **Clerk**: Authentication, MFA, and identity session management.
- **Supabase**: Relational PostgreSQL database with strict engine-level Row Level Security (RLS) and JSONB block stores.
- **ImageKit**: Secure media CDN, progressive WebP/AVIF transformations, and signed server-to-server asset uploads.

---

## 2. High-Level Architecture Diagram

```
+-----------------------------------------------------------------------------------------------+
|                                       CLIENT LAYER                                            |
|                                                                                               |
|  +---------------------------+  +---------------------------+  +---------------------------+  |
|  |      PUBLIC VISITORS      |  |       CLIENT ADMINS       |  |       SUPER ADMINS        |  |
|  |  (Prospective Students)   |  |   (Mayur Sir & Faculty)   |  |     (Platform Owners)     |  |
|  +-------------+-------------+  +-------------+-------------+  +-------------+-------------+  |
+----------------|------------------------------|------------------------------|----------------+
                 | HTTPS                        | HTTPS + Clerk JWT            | HTTPS + Clerk JWT
                 v                              v                              v
+-----------------------------------------------------------------------------------------------+
|                               APPLICATION RUNTIME LAYER                                       |
|                                                                                               |
|  [ 1. PUBLIC WEBSITE ]          [ 2. CLIENT ADMIN CMS ]         [ 3. SUPER ADMIN CMS ]        |
|  * Dynamic Section Renderer     * Course Syllabus Editor        * Role & Permission Matrix    |
|  * 12 Course Program Catalog    * Block Sequence Reordering     * User Account Provisioning   |
|  * Interactive Syllabus Drawer  * Admission Leads Pipeline      * Global Publish Overrides    |
|  * Admission Enquiry Modal      * Draft Content Submissions     * Immutable Audit Logs        |
|  * Instant WhatsApp Hotline     * Scoped Media Library          * System Configuration        |
|                                                                                               |
|  -------------------------------------------------------------------------------------------  |
|                                                                                               |
|  [ CORE MIDDLEWARE & INTEGRATION SERVICES ]                                                   |
|  * AuthGate: Evaluates JWT & enforces `public.has_permission(code)`                            |
|  * Block Hydrator: Maps database JSONB payloads to typed React components                     |
|  * ImageKit SDK: Handles signed client uploads and dynamic transformation URLs                |
|  * Supabase Client: Realtime client with Bearer token authentication                          |
+--------------------------------+------------------------------+-------------------------------+
                                 |                              |
                   Database Operations (RLS Enforced)           | Identity & MFA
                                 v                              v
+------------------------------------------------+    +-----------------------------------------+
|             SUPABASE (POSTGRESQL)              |    |                  CLERK                  |
|  * Granular RBAC (`roles`, `permissions`)      |    |  * Session JWT Issuance                 |
|  * CMS Storage (`pages`, `page_sections`)      |    |  * User Management & OAuth              |
|  * Curriculum Engine (`courses`)               |    |  * Security & MFA Enforcement           |
|  * Leads CRM (`enquiries`)                     |    |  * Webhook Identity Sync                |
|  * PostgreSQL Row Level Security (RLS)         |    +-----------------------------------------+
+-----------------------+------------------------+
                        |
            Asset URL References
                        v
+-----------------------------------------------------------------------------------------------+
|                                IMAGEKIT MEDIA CDN & PROCESSOR                                 |
|  * WebP / AVIF on-the-fly progressive transformations & edge caching                          |
|  * Secure private bucket for certificates and course material PDFs                            |
|  * Signed authentication parameters for safe client-side direct uploads                       |
+-----------------------------------------------------------------------------------------------+
```

---

## 3. Tier Separation: Public vs. Client Admin vs. Super Admin

```
                             APPLICATION PERIMETER
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            ▼                          ▼                          ▼
  ┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
  │  Public Website  │       │ Client Admin CMS │       │ Super Admin CMS  │
  └─────────┬────────┘       └─────────┬────────┘       └─────────┬────────┘
            │                          │                          │
  ┌─────────▼────────┐       ┌─────────▼────────┐       ┌─────────▼────────┐
  │ - Public Read    │       │ - Scoped Edit    │       │ - Root Authority │
  │ - Zero Auth Req. │       │ - Draft Creation │       │ - Direct Publish │
  │ - Sub-second CDN │       │ - Leads Pipeline │       │ - Role Delegator │
  │ - Enquiry Insert │       │ - Block Reorder  │       │ - Audit Review   │
  └──────────────────┘       └──────────────────┘       └──────────────────┘
```

### 3.1 Tier 1: Public Website (Prospective Students & Visitors)
- **Objective**: Inform, inspire, and convert prospective students into enrolled candidates.
- **Access Level**: Public anonymous (no authentication required).
- **Core Capabilities**:
  - Browse all 12 government-recognized courses (MS-CIT, Tally Prime, Coding, Typing, Power BI, AI/ML).
  - Inspect comprehensive syllabi via the interactive slide-over drawer.
  - Review Mayur Sir’s credentials (10+ years teaching experience, Center Code `78210482`).
  - Read verified 4.9★ Google Reviews (200+ student testimonials).
  - Submit 2-day free demo class trial requests (stored directly in `public.enquiries`).
  - 1-click WhatsApp helpline routing (`+91 86550 50595`).
- **Data Access & Security**:
  - Restricted strictly to rows with `status = 'published'` and `is_visible = true`.
  - Can only execute `INSERT` on `enquiries` with strict payload length validation.

---

### 3.2 Tier 2: Client Admin CMS (Institute Staff & Mayur Sir)
- **Objective**: Enable non-technical institute operators to manage day-to-day curriculum updates and track leads without touching code.
- **Access Level**: Authenticated users possessing the `CLIENT_ADMIN` role.
- **Core Capabilities**:
  - **Course Curriculum Editor**: Modify syllabus topics, course durations, pricing discounts, and highlights.
  - **Dynamic Page Layout Orchestrator**: Reorder landing page section blocks (`order_index`) and toggle block visibility.
  - **Admissions Lead Pipeline**: View inbound enquiries, filter by course interest, update lead status (`new` → `contacted` → `enrolled`), and make direct phone calls.
  - **Drafting Workflow**: Save edits in `draft` state; changes are shielded from public view until approved.
- **Data Access & Security**:
  - Enforced via PostgreSQL helper function `public.has_permission(required_code)`.
  - Cannot delete system tables or alter platform permissions.
  - Publishing directly to the live website requires explicit `courses.publish` permission.

---

### 3.3 Tier 3: Super Admin CMS (Platform Owners & Senior Administrators)
- **Objective**: Total architectural, operational, and security control of the Mayur Computech web application.
- **Access Level**: Authenticated users possessing the `SUPER_ADMIN` role.
- **Core Capabilities**:
  - **Role & Permission Management**: Grant or revoke specific granular capabilities from any role.
  - **User Administration**: Invite instructors, assign roles, reset accounts, or suspend users.
  - **Direct Live Publishing**: Immediate bypass to publish or unpublish any course or page section.
  - **Media & Infrastructure Management**: Oversee ImageKit storage limits, purge CDN caches, and manage API keys.
  - **Audit & Compliance Logging**: Review an immutable audit trail of who made changes, before/after JSON diffs, and exact timestamps.
- **Data Access & Security**:
  - Universal bypass in Supabase RLS (`public.current_role_name() = 'SUPER_ADMIN'`).

---

## 4. Triangular Service Integration: Clerk ↔ Supabase ↔ ImageKit

```
   ┌────────────────────────────────────────────────────────────────────────┐
   │                           1. AUTHENTICATION                            │
   │   User signs in via Clerk ───────► Issues Clerk JWT with claims.sub    │
   └───────────────────────────────────┬────────────────────────────────────┘
                                       │
                                       ▼
   ┌────────────────────────────────────────────────────────────────────────┐
   │                            2. AUTHORIZATION                            │
   │   Supabase receives Bearer JWT ───► Maps clerk_id to public.users       │
   │                                     Enforces Row Level Security (RLS)  │
   └───────────────────────────────────┬────────────────────────────────────┘
                                       │
                                       ▼
   ┌────────────────────────────────────────────────────────────────────────┐
   │                             3. MEDIA FLOW                              │
   │   Upload request to ImageKit ─────► Server generates signed token      │
   │                                     Client uploads image directly      │
   │                                     Supabase stores clean CDN URL      │
   └────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Step-by-Step Data Flow Scenarios

#### Scenario A: Admin Edits a Course & Uploads a Thumbnail
1. **Authentication**: Admin signs in using Clerk. Clerk provides a signed session token.
2. **Media Signature**:
   - The CMS frontend requests upload parameters from `/api/imagekit/auth`.
   - The server verifies the caller has `courses.edit` permission and signs a temporary ImageKit upload token using `IMAGEKIT_PRIVATE_KEY`.
3. **Direct Media Upload**:
   - The frontend uploads the image directly to ImageKit CDN (`uploadEndpoint`).
   - ImageKit returns an optimized asset URL (e.g., `https://ik.imagekit.io/mayurcomputech/courses/tally-prime.webp`).
4. **Database Mutation**:
   - The frontend calls Supabase with the updated course record and the ImageKit CDN URL.
   - Supabase RLS executes `public.has_permission('courses.edit')`.
   - The row in `public.courses` is updated and logged to `public.audit_logs`.

---

#### Scenario B: Public Student Visits the Website & Books Demo Class
1. **Page Load**:
   - Browser requests the homepage.
   - Public client queries Supabase for `pages` where `slug = 'home'` and `status = 'published'`, plus associated `page_sections` where `is_visible = true`.
   - Supabase RLS allows the query through public read policy.
2. **Media Optimization**:
   - ImageKit serves all course badges, hero graphics, and mentor avatars in WebP/AVIF with device-specific width parameters (`?tr=w-800,q-80`).
3. **Enquiry Submission**:
   - Student completes the "Book 2-Day Free Trial" modal.
   - Payload is sent to `public.enquiries`.
   - Supabase RLS validates phone number and name length, inserting the record with `status = 'new'`.
   - Frontend triggers instant WhatsApp deep-link to Mayur Sir (`+91 86550 50595`).

---

## 5. Dynamic Block-Based CMS Architecture

The platform avoids static page templates by employing a polymorphic block architecture:

```
[ Page Record: slug = 'home' ]
       │
       ├─► [ Section 0 ]: HeroSection (Badge, 4.9★ rating, CTA buttons)
       ├─► [ Section 1 ]: CoursesCatalog (12 Courses, category filters, fees)
       ├─► [ Section 2 ]: WhyChooseUs (1:1 Mentorship, Dedicated PCs, 7-day lab)
       ├─► [ Section 3 ]: MentorSpotlight (Mayur Sir's 10+ yrs credentials)
       ├─► [ Section 4 ]: GoogleReviews (200+ verified student testimonials)
       ├─► [ Section 5 ]: FAQSection (Govt. certification, fees, batch timings)
       └─► [ Section 6 ]: ContactSection (Ghansoli Center Code 78210482 map)
```

Each block is completely decoupled:
- **`section_key`**: Human-readable identifier (`hero_block`, `courses_catalog`).
- **`block_type`**: Maps directly to a React component in `SectionRenderer`.
- **`order_index`**: Integer determining the visual sequence on the page.
- **`content` (JSONB)**: Typed payload containing text, headlines, and child arrays.
- **`settings` (JSONB)**: Styling controls (theme, padding, animations).
- **`is_visible` (BOOLEAN)**: Instant toggle to show or hide blocks without deletion.

---

## 6. Zero-Trust Security Boundary & RLS Rules

```
                      INCOMING HTTP REQUEST
                                │
                                ▼
            ┌────────────────────────────────────────┐
            │       CLERK IDENTITY VALIDATION        │
            │  (Validates signature, expiration, sub)│
            └───────────────────┬────────────────────┘
                                │ Valid
                                ▼
            ┌────────────────────────────────────────┐
            │         SUPABASE RLS ENGINE            │
            │  - current_clerk_id()                  │
            │  - current_role_name()                 │
            │  - has_permission(required_code)       │
            └───────────────────┬────────────────────┘
                                │ Authorized
                                ▼
            ┌────────────────────────────────────────┐
            │          DATABASE EXECUTION            │
            │   (Executes query & records audit)     │
            └────────────────────────────────────────┘
```

### Security Rules:
1. **Zero Client Trust**: Frontend UI restrictions (hiding buttons or tabs) are strictly cosmetic conveniences. True authorization is strictly executed in database RLS policies.
2. **Secret Key Isolation**:
   - `CLERK_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `IMAGEKIT_PRIVATE_KEY` remain on secure backend environments and are never bundled into client builds.
   - Client bundles strictly consume publishable keys (`VITE_CLERK_PUBLISHABLE_KEY`, `VITE_SUPABASE_ANON_KEY`, `VITE_IMAGEKIT_URL_ENDPOINT`).
3. **Audit Immutability**: All critical admin mutations record the acting Clerk User ID, timestamp, action type, and before/after JSON diffs.

---

## 7. Technology Stack Decision Matrix

| Layer | Technology | Decision Rationale |
|:---|:---|:---|
| **Frontend Framework** | React 19 + TypeScript + Vite | Blazing fast client hydration, strict type safety, zero bloat. |
| **Styling & Design System** | Tailwind CSS + Lucide Icons | Utility-first dark theme styling with custom amber accents (`#F59E0B`), zero runtime CSS overhead. |
| **Authentication** | Clerk (`@clerk/clerk-react`) | Enterprise-grade user profiles, MFA, seamless social login, secure JWT sessions. |
| **Database & Security** | Supabase (PostgreSQL 16) | Engine-level RLS, JSONB indexing for dynamic blocks, robust relational integrity. |
| **Media Delivery & CDN** | ImageKit | Dynamic WebP/AVIF generation, automatic responsive widths, signed direct uploads. |
| **Lead Generation** | Custom Modal + WhatsApp API | High-conversion admission pipeline connecting prospective students directly to Mayur Sir. |
