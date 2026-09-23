# MAYUR COMPUTECH — PROGRESS TRACKER & ROADMAP

**Last Updated:** Current Session  
**Current Phase:** Phase 1: Architecture & Foundation (In Progress / Nearing Completion)  
**System Version:** v1.0.0-alpha  
**Institute Authority:** Maharashtra State Authorised Center Code: `78210482`  

---

## 1. Executive Status Dashboard

| Milestone | Status | Key Deliverables |
|:---|:---:|:---|
| **Phase 0: Discovery & Architecture Specification** | ✅ COMPLETED | Source audit, Institute credentials, 12 Course catalogs, `ARCHITECTURE.md`, `DEVELOPMENT_ROADMAP.md`, `CMS_MODEL.md`, `PERMISSION_MODEL.md` |
| **Phase 1: Architecture & Foundation** | 🟡 ACTIVE / IN PROGRESS | Core React SPA + Tailwind styling, Clerk Auth integration & fallbacks, 12 Courses catalog engine, Syllabus modal, Inbound Enquiry CRM, `DATABASE_DESIGN.md` (Supabase + RLS + Clerk mapping), Admin CMS console & RBAC switcher |
| **Phase 2: Database Provisioning & Supabase Migration** | ⏳ UPCOMING | Supabase database instance setup, SQL DDL migrations, RLS policies activation, Database functions & seed scripts |
| **Phase 3: Supabase Client SDK & Live CRUD Hooks** | ⏳ UPCOMING | Supabase Client singleton, React Query / data fetching hooks for courses, dynamic sections, and leads CRM |
| **Phase 4: Headless CMS Admin Console & Editor** | ⏳ UPCOMING | Drag-and-drop section reordering, Live course syllabus editor, Lead pipeline manager, Role assignment panel |
| **Phase 5: Media & Asset Storage (ImageKit / Storage Buckets)** | ⏳ UPCOMING | Student photo gallery, Course syllabus PDF downloads, Lab infrastructure photos, Cloud storage integration |
| **Phase 6: Quality Assurance, SEO & Production Launch** | ⏳ UPCOMING | OpenGraph social cards, Schema.org Course JSON-LD, Lighthouse 95+ score, Domain routing & SSL verification |

---

## 2. Current Phase Deep-Dive: Phase 1 — Architecture & Foundation

### Completed Items in Phase 1:
- [x] **Clerk Authentication Setup**:
  - Integrated `@clerk/clerk-react` and `@clerk/themes`.
  - Added navigation controls: `SignInButton`, `SignUpButton`, `UserButton`, `SignedIn`, and `SignedOut`.
  - Implemented dynamic fallback authentication provider for instant local previews and manual Clerk publishable key entry.
  - Configured Clerk App ID `app_3Jk16xxNCOsLG07pU9cDhtoQruh` connection logic.
- [x] **Institute Authority & Official Data Mined**:
  - Registered Center Code: `78210482` (Ghansoli Sector 5, Navi Mumbai).
  - Direct Helpline & WhatsApp: `+91 86550 50595` directly to Mayur Sir.
  - Verified 4.9★ Google Business Reviews showcase with 200+ student ratings.
  - Lab Timings: 7:30 AM – 9:30 PM (7 days/week) with dedicated PC workstations.
- [x] **12 Course Curriculum Catalog & Interactive Syllabus**:
  1. MS-CIT (Govt. Certified - MKCL)
  2. MS Office 2021 Suite & AI Tools
  3. Advanced Excel (XLOOKUP, Pivot, Dashboards)
  4. Tally Prime with GST & Payroll
  5. Digital Marketing & SEO
  6. Programming in C & C++
  7. Full Stack Web Development
  8. Java Programming Language
  9. Marathi Typing (CCTP) 30 WPM
  10. English Typing (CCTP) 30/40 WPM
  11. AI & Machine Learning (Robotics & Sensors)
  12. Microsoft Power BI & Data Analytics
- [x] **Interactive Syllabus Drawer**:
  - Detailed module breakdown, topic lists, duration, and career prospects for every course.
- [x] **Admissions & 2-Day Free Trial Demo Modal**:
  - Interactive admission enquiry form with automatic local persistence and 1-click WhatsApp redirect to Mayur Sir.
- [x] **Database Schema Proposal (`DATABASE_DESIGN.md`)**:
  - Supabase PostgreSQL schema with 8 core tables: `roles`, `permissions`, `role_permissions`, `users`, `pages`, `page_sections`, `courses`, `enquiries`.
  - Row Level Security (RLS) policies enforcing public read on published records, public write on enquiries, and scoped role checks.
  - Clerk identity integration via `current_clerk_id()` and `has_permission()` PostgreSQL functions.
  - Typed block schemas for dynamic CMS section storage.
- [x] **CMS & Granular RBAC Console**:
  - Admin modal with live switcher between **Super Admin** and **Client Admin**.
  - Courses manager, Leads CRM status updates (`new` -> `contacted` -> `enrolled`), and Page Section Layout toggles.
  - RBAC permission matrix display (`courses.publish`, `users.manage`, `sections.reorder`, etc.).

---

## 3. Remaining Development Roadmap

```
Phase 1: Architecture & Foundation (Current)
   │
   ▼
Phase 2: Database Provisioning & Supabase Migration
   │   ├── Execute DDL migrations from DATABASE_DESIGN.md
   │   ├── Seed roles, permissions, initial homepage blocks, and 12 courses
   │   └── Enable and verify Row Level Security (RLS) policies
   │
   ▼
Phase 3: Supabase Client Integration & Live Data Layer
   │   ├── Initialize @supabase/supabase-js client with Clerk token injection
   │   ├── Replace in-memory/mock datasets with live Supabase subscriptions
   │   └── Direct DB insertion for admission inquiries
   │
   ▼
Phase 4: Full Headless CMS Admin Dashboard
   │   ├── Rich text & JSONB block content editor for Mayur Sir
   │   ├── Drag-and-drop page section layout reordering
   │   ├── Lead pipeline Kanban / table with note-taking & status updates
   │   └── Staff account invitation and role assignment
   │
   ▼
Phase 5: Media Layer, Gallery & Assets
   │   ├── Institute computer lab & classroom photo gallery
   │   ├── Syllabus PDF download generation
   │   └── Student certification verification module
   │
   ▼
Phase 6: Polish, SEO & Production Deployment
       ├── Schema.org Course & EducationalOrganization JSON-LD structured data
       ├── OpenGraph & Twitter social cards
       ├── Accessibility, responsiveness, and Lighthouse audit (Score 95+)
       └── Production environment verification & custom domain launch
```

---

## 4. Phase-by-Phase Task Breakdown & Acceptance Criteria

### Phase 2: Database Provisioning & Supabase Migration
- **Tasks**:
  1. Set up Supabase project credentials (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
  2. Run migration scripts from `DATABASE_DESIGN.md` in Supabase SQL editor.
  3. Verify RLS policies:
     - Anonymous queries cannot read drafts or other users' profiles.
     - Anonymous users can submit inquiries.
     - Role checks properly evaluate Clerk JWT claims.
- **Acceptance Criteria**: All 8 tables exist with foreign keys, indexes, and active RLS.

### Phase 3: Supabase Client Integration & Live Data Layer
- **Tasks**:
  1. Configure Supabase client to pass Clerk session tokens via Authorization headers.
  2. Create TypeScript database client wrapper and React hooks (`useCourses`, `usePageSections`, `useEnquiries`).
  3. Connect the inquiry form to write directly to `public.enquiries`.
- **Acceptance Criteria**: Inbound student enquiries appear instantly in Supabase and trigger notification events.

### Phase 4: Full Headless CMS Admin Dashboard
- **Tasks**:
  1. Expand Admin Portal into a comprehensive control center.
  2. Implement course editing: update fees, syllabus modules, and publishing states.
  3. Implement layout block orchestrator: toggle visibility, update copy, reorder indices.
  4. Enforce RBAC in UI: Client Admin cannot publish without Super Admin approval.
- **Acceptance Criteria**: Changes made in Admin Console reflect immediately on the live landing page.

### Phase 5: Media & Student Certification Portal
- **Tasks**:
  1. Setup media storage for lab photos, Mayur Sir's credentials, and student success stories.
  2. Add printable / downloadable course brochures in PDF format.
  3. Add simple certificate verification tool by Student Roll Number / Center Code `78210482`.
- **Acceptance Criteria**: High-resolution imagery loads lazily with WebP compression.

### Phase 6: SEO & Launch Readiness
- **Tasks**:
  1. Embed Schema.org JSON-LD for local business, educational courses, and reviews.
  2. Verify social share preview cards (WhatsApp, Facebook, Twitter).
  3. Test full mobile responsiveness across iOS and Android viewports.
  4. Run Lighthouse performance check targeting 95+ across all metrics.
- **Acceptance Criteria**: Zero compilation warnings, perfect mobile UX, instant page load.

---

## 5. Risk & Dependency Tracker

| Item | Impact | Mitigation Strategy |
|:---|:---:|:---|
| **Clerk Token Synchronization** | Medium | JWT template configured in Clerk with Supabase secret; client hooks provide fallback anonymous client if unauthenticated. |
| **RLS Policy Edge Cases** | High | Helper functions `has_permission()` and `current_role_name()` unit tested directly in PostgreSQL before client usage. |
| **Offline / Slow 3G Connectivity** | Low | Local storage caching of core course catalog so prospective students can view syllabi even on poor network connections. |
