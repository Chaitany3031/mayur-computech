# MAYUR COMPUTECH — DEVELOPMENT ROADMAP & EXECUTION PHASES

This roadmap details the sequential, disciplined execution plan for rebuilding Mayur Computech into an enterprise-grade education platform with a headless CMS.

---

## Phase Breakdown

### Phase 0: Architecture & Foundation (Current Phase)
- [x] Extract authentic content, courses, credentials, and assets from existing repository (`Sujalmane15/Mayur-Computech-`).
- [x] Establish `ARCHITECTURE.md` (high-level system design, security model).
- [x] Establish `DATABASE_DESIGN.md` (relational SQL schemas, indexes, RLS policies).
- [x] Establish `PERMISSION_MODEL.md` (granular RBAC, central `can()` & `requirePermission()` guards).
- [x] Establish `CMS_MODEL.md` (reusable section block engine, schema types, hydrator).
- [x] Establish `DEVELOPMENT_ROADMAP.md` & `context/progress-tracker.md`.
- [x] Review proposed architecture with stakeholders before executing database writes.

### Phase 1: Database Schema & Migrations
- Define TypeScript database models, enums, and types.
- Prepare SQL migrations for RBAC, dynamic CMS sections, courses, trainers, testimonials, FAQs, media, enquiries, and audit trails.
- Configure RLS policies for public anonymity vs client/super admin roles.

### Phase 2: Clerk Authentication & Session Boundary
- Integrate Clerk provider and authentication middleware.
- Configure session tokens with custom claims for fast server-side user resolution.
- Establish user synchronization between Clerk identities and internal `admin_users` table.

### Phase 3: Authorization & RBAC Central Engine
- Implement central authorization module (`src/lib/auth/rbac.ts`).
- Build permission check utilities: `can(user, permission)` and `requirePermission(user, permission)`.
- Enforce server-side route guards for API handlers and server actions.

### Phase 4: CMS Engine & Block Hydrator
- Implement typed Block Registry (`src/components/blocks/*`).
- Create `SectionRenderer` with support for polymorphic block types.
- Build section layout ordering, visibility toggling, and draft staging logic.

### Phase 5: Public Design System & Dark UI Foundation
- Configure Tailwind CSS design tokens: deep dark obsidian canvas, warm amber primary accent (`#F59E0B`), optical typography hierarchy.
- Integrate Google fonts (`Syne` display + `Plus Jakarta Sans` body + `JetBrains Mono` telemetry).
- Apply Universal Frontend Design Constitution (anti-slop, zero-pill discipline, hairline borders).

### Phase 6: Homepage & Cinematic Sections
- Build Top Bar Contract (Govt Center code 78210482, Mayur Sir phone 8655050595, verified Google 4.9 rating).
- Build cinematic Hero section with strong editorial typography and primary CTA.
- Implement Why Choose Us / Trust statistics (100% practical lab, 1:1 mentorship).

### Phase 7: Courses Catalog & Syllabus Detail Engine
- Populate all 12 verified courses from Mayur Computech curriculum:
  1. MS-CIT Course (Govt. Valid · Center: 78210482)
  2. MS Office 2021 Suite with AI Tools
  3. Advanced Excel (Formulas, XLOOKUP, Pivot, Dashboards)
  4. Tally Prime (GST, TDS & Payroll Certified)
  5. Digital Marketing (SEO, Google Ads, WordPress)
  6. Programming in C & C++ (CS, IT & Engineering)
  7. Full Stack Web Development (HTML5, Modern CSS, JS, PHP/DB)
  8. Java Programming Language (Core Java, OOP, Collections)
  9. Marathi Typing (CCTP) 30 WPM (Govt. GCC-TBC Certified)
  10. English Typing (CCTP) 30/40 WPM (Govt. Valid)
  11. AI & Machine Learning with Robotics (Python, Sensors, Hardware)
  12. Microsoft Power BI (Data Ingestion, DAX, KPI Dashboards)
- Implement course category filter tabs (All, Beginner & Office, Programming & Tech, Finance & Business).
- Build deep course syllabus drawers with interactive module breakdowns.

### Phase 8: Trainers & Mayur Sir Spotlight
- Build dedicated Mayur Sir mentor profile (13+ years experience since 2014, Computer Diploma, 5000+ students trained).
- Highlight bilingual instruction (Marathi, Hindi, English) and direct 1:1 guidance.
- Social channels integration (YouTube, Instagram, Telegram, Facebook).

### Phase 9: Gallery & ImageKit Media Pipeline
- Implement high-speed responsive gallery with lightbox inspection.
- Set up server-side signed ImageKit media ingestion and thumbnail optimization.
- Support categorization (Classroom, Practical Lab, Events, Certifications).

### Phase 10: Testimonials & FAQ Accordion
- Build official Google Business Review showcase (4.9★ rating based on 200+ verified student reviews).
- Render genuine student outcome stories (Govt. exam cleared, accounting placement, coding projects).
- Implement interactive FAQ accordion covering lab timings (7:30 AM to 9:30 PM), demo classes, fee EMI options, and exam software.

### Phase 11: Inbound Lead & Enquiry CRM
- Build responsive quick enquiry forms with Zod schema validation.
- Implement direct WhatsApp advisor dispatcher (`wa.me/918655050595`).
- Admin lead management table with status progression (New → Contacted → Qualified → Enrolled).

### Phase 12: Super Admin CMS Console
- Build dark, responsive admin workspace.
- Real-time dashboard KPI metrics: total courses, published blocks, new leads, active admins.
- Full CRUD for courses, instructors, testimonials, FAQs, and global site settings.
- Section layout visual reordering (drag-and-drop or sequential up/down buttons).

### Phase 13: Client Admin Granular Portal
- Dynamic sidebar that filters navigation based on database-driven permissions.
- Inaccessible modules hidden from DOM and blocked server-side.
- Granular permission matrix assignment interface for Super Admin.

### Phase 14: Draft / Preview / Publish Workflow
- Three-tier status lifecycle: `DRAFT`, `PUBLISHED`, `ARCHIVED`.
- Side-by-side or responsive iframe live preview mode for staged drafts.
- Granular publication authority enforcement.

### Phase 15: Content Versioning & Audit History
- Detailed chronological audit log of all system mutations with actor details.
- Content revision snapshots with one-click restoration.

### Phase 16: SEO, Accessibility & Core Web Vitals
- Semantic HTML tags, ARIA labels, keyboard tab navigation, WCAG AA compliance.
- OpenGraph social cards, JSON-LD Schema.org structured data (`EducationalOrganization`, `Course`).
- Zero layout shift (CLS < 0.05), responsive image srcset transformations.

### Phase 17: Comprehensive QA & Verification
- Unit and integration tests for authorization logic.
- Cross-device verification (mobile, tablet, laptop, ultrawide).
- Build compilation check (`compile_applet`) and zero-error verification.

### Phase 18: Production Launch Readiness
- Environment variable verification (`.env.example`).
- Deployment readiness checks.
