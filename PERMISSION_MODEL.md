# MAYUR COMPUTECH — PERMISSION & RBAC MODEL SPECIFICATION

## 1. Architectural Principles

1. **Zero-Trust Client Boundary**: The client browser is considered untrusted. Role tags or permission lists sent to the frontend are solely for progressive UI disclosure (hiding navigation links or disabling controls).
2. **Central Authorization Layer**: All server actions, API endpoints, and mutation handlers verify access through a single, unified authorization engine. No scattered inline `if (role === 'admin')` conditions.
3. **Database-Driven Grants**: Client Administrator capabilities are dynamically configured by Super Admins through the database (`admin_permissions` and `role_permissions` tables) rather than static hardcoded code enums.
4. **Super Admin Invariant**: A user with the `SUPER_ADMIN` system role unconditionally passes all permission checks (`can(user, *) === true`).

---

## 2. Granular Permissions Catalog

| Module | Code | Label | Description |
| :--- | :--- | :--- | :--- |
| **Courses** | `courses.view` | View Courses | View all courses in CMS (including drafts) |
| | `courses.create` | Create Course | Author new course programs and syllabi |
| | `courses.edit` | Edit Course | Update course details, pricing, and content |
| | `courses.delete` | Delete Course | Soft-delete or archive course records |
| | `courses.publish` | Publish Course | Transition courses between draft and live |
| **Sections & CMS** | `sections.view` | View Sections | View page layout blocks and configuration |
| | `sections.edit` | Edit Section Content | Modify block content and visual settings |
| | `sections.reorder` | Reorder Sections | Change layout hierarchy and block sequence |
| | `sections.create` | Add Section Block | Insert new block types into page layouts |
| | `sections.delete` | Remove Section Block | Delete or detach blocks from page layouts |
| | `sections.publish` | Publish Sections | Push staged block updates to live page |
| **Pages** | `pages.view` | View Pages | View page directory and draft pages |
| | `pages.edit` | Edit Page SEO & Info | Update titles, slugs, and meta tags |
| | `pages.publish` | Publish Pages | Set page status to live |
| **Trainers** | `trainers.view` | View Trainers | View mentor roster and bio details |
| | `trainers.create` | Add Trainer | Add new instructors to institute team |
| | `trainers.edit` | Edit Trainer | Update credentials, photos, and expertise |
| | `trainers.delete` | Delete Trainer | Remove or archive instructor profiles |
| **Gallery & Media** | `gallery.view` | View Gallery | Browse media library and photo catalog |
| | `gallery.upload` | Upload Media | Dispatch authenticated media to ImageKit |
| | `gallery.edit` | Edit Media Details | Update titles, alt text, and categorization |
| | `gallery.delete` | Delete Media | Remove media assets from CDN and database |
| **Testimonials** | `testimonials.view` | View Testimonials | Read student reviews and feedback |
| | `testimonials.create` | Add Testimonial | Manually import or create review records |
| | `testimonials.edit` | Edit Testimonial | Modify review content and feature status |
| | `testimonials.delete` | Delete Testimonial | Remove review entries |
| **FAQs** | `faqs.view` | View FAQs | Browse FAQ accordion items |
| | `faqs.edit` | Edit FAQs | Modify questions, answers, and sort order |
| **Enquiries** | `enquiries.view` | View Enquiries | Access student lead CRM and inquiries |
| | `enquiries.update_status` | Update Lead Status | Progress leads from 'new' to 'enrolled' |
| | `enquiries.delete` | Delete Enquiry | Remove spam or duplicate inquiries |
| **Navigation & Site** | `navigation.edit` | Edit Navigation | Modify top bar menu items and ordering |
| | `footer.edit` | Edit Footer | Update footer columns, copyright, and links |
| | `seo.edit` | Manage Global SEO | Configure OpenGraph, meta tags, and robots |
| | `settings.edit` | Edit Site Settings | Update phone, center code, and address |
| **Administration** | `users.view` | View Admin Users | Browse administrator roster |
| | `users.manage` | Manage Admin Users | Invite, suspend, or update client admins |
| | `roles.manage` | Manage Roles & Perms| Create roles and customize permission sets |
| | `audit.view` | Inspect Audit Logs | Review chronological actor activity and diffs |
| | `audit.rollback` | Rollback Content | Restore previous content revision states |

---

## 3. Central Authorization API Design

### A. TypeScript Type Definitions

```typescript
export type PermissionCode =
  | 'courses.view'
  | 'courses.create'
  | 'courses.edit'
  | 'courses.delete'
  | 'courses.publish'
  | 'sections.view'
  | 'sections.edit'
  | 'sections.reorder'
  | 'sections.create'
  | 'sections.delete'
  | 'sections.publish'
  | 'pages.view'
  | 'pages.edit'
  | 'pages.publish'
  | 'trainers.view'
  | 'trainers.create'
  | 'trainers.edit'
  | 'trainers.delete'
  | 'gallery.view'
  | 'gallery.upload'
  | 'gallery.edit'
  | 'gallery.delete'
  | 'testimonials.view'
  | 'testimonials.create'
  | 'testimonials.edit'
  | 'testimonials.delete'
  | 'faqs.view'
  | 'faqs.edit'
  | 'enquiries.view'
  | 'enquiries.update_status'
  | 'enquiries.delete'
  | 'navigation.edit'
  | 'footer.edit'
  | 'seo.edit'
  | 'settings.edit'
  | 'users.view'
  | 'users.manage'
  | 'roles.manage'
  | 'audit.view'
  | 'audit.rollback';

export interface AdminUserSession {
  userId: string;
  clerkId: string;
  email: string;
  roleName: 'SUPER_ADMIN' | 'CLIENT_ADMIN' | string;
  permissions: Set<PermissionCode>;
}
```

### B. Core Guard Functions

```typescript
/**
 * Evaluates whether an authenticated user has the required permission.
 * Automatically resolves TRUE for SUPER_ADMIN role.
 */
export function can(user: AdminUserSession | null, permission: PermissionCode): boolean {
  if (!user) return false;
  if (user.roleName === 'SUPER_ADMIN') return true;
  return user.permissions.has(permission);
}

/**
 * Enforces permission in server action or API route.
 * Throws an explicit UnauthorizedError if validation fails.
 */
export function requirePermission(user: AdminUserSession | null, permission: PermissionCode): void {
  if (!can(user, permission)) {
    throw new Error(`Forbidden: Required permission '${permission}' not granted.`);
  }
}
```

---

## 4. Client Admin UI Adaptability Contract

When a `CLIENT_ADMIN` logs in:
1. **Dynamic Sidebar Projection**: The admin navigation sidebar queries `can(user, 'module.view')` for each section. If a client admin only has `courses.*` and `gallery.*`, navigation items for `Users`, `Roles`, `Settings`, `SEO`, and `Audit Logs` are omitted entirely from the DOM.
2. **Action Affordances**: Buttons such as "Publish", "Delete", and "Reorder" evaluate their respective permissions before rendering, preventing misleading UI interactions while backing all mutations with server-side validation.
