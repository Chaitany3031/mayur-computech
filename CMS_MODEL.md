# MAYUR COMPUTECH — CMS & SECTION BLOCK MODEL SPECIFICATION

## 1. CMS Core Philosophy

The Mayur Computech web experience is structured as an **ordered sequence of independent, polymorphic section blocks**. The public homepage, course category landings, and institution pages are not static JSX files; they are synthesized at runtime or build time by querying the `page_sections` store and dispatching to a typed **Block Registry**.

```
+-----------------------------------------------------------------------------------+
|                                  PAGE SPECIFICATION                               |
|   Page: 'home' (Slug: '/')                                                        |
|   ├── Order 0: HeroBlock              (Eyebrow, Headline, CTAs, Floating Badges)  |
|   ├── Order 1: StatsBlock             (Practical training, Gov Center, Students)  |
|   ├── Order 2: CourseGridBlock        (12 Programs, Filters: Beginner/Tech/Biz)   |
|   ├── Order 3: WhyChooseUsBlock       (Lab Access, 1:1 Mentorship, Cert Validity) |
|   ├── Order 4: TrainerSpotlightBlock  (Mayur Sir 13+ yrs experience, credentials) |
|   ├── Order 5: TestimonialBlock       (Verified Google Reviews 4.9★, 200+ Reviews)|
|   ├── Order 6: GalleryBlock           (Lab infrastructure, coding desks, events)  |
|   ├── Order 7: FAQBlock               (Admissions, fee installments, timings)     |
|   ├── Order 8: CTABlock               (Talk to Advisor, WhatsApp direct connect)  |
|   └── Order 9: ContactBlock           (Sector 5 Ghansoli location, map, lead form)|
+-----------------------------------------------------------------------------------+
```

---

## 2. Block Registry & JSON Schemas

Every block stored in `page_sections.content` conforms to a strict TypeScript and Zod schema.

### A. `HeroBlock`
```typescript
export interface HeroBlockContent {
  badgeText: string;              // "Govt. Authorised Computer Training Institute"
  centerCode: string;             // "Center Code: 78210482"
  titleLine1: string;             // "Learn Today."
  titleHighlight: string;         // "Build Your Career."
  description: string;            // "Practical, career-focused computer training..."
  googleRating: {
    score: string;                // "4.9"
    reviewCount: string;          // "200+ Google Reviews"
    reviewUrl: string;
  };
  primaryCta: {
    label: string;                // "Explore Courses"
    url: string;                  // "#courses"
  };
  secondaryCta: {
    label: string;                // "Talk to an Advisor"
    phone: string;                // "8655050595"
    whatsappUrl: string;
  };
  floatingPills: Array<{
    title: string;
    category: string;
  }>;
}
```

### B. `StatsBlock`
```typescript
export interface StatsBlockContent {
  items: Array<{
    value: string;                // "100%"
    label: string;                // "Practical Lab Learning"
    subtext?: string;
  }>;
}
```

### C. `CourseGridBlock`
```typescript
export interface CourseGridBlockContent {
  eyebrow: string;                // "Explore Opportunities"
  heading: string;                // "Professional Training Programs"
  description: string;
  categories: Array<{
    key: string;                  // "all" | "beginner" | "tech" | "business"
    label: string;
  }>;
  featuredOnly: boolean;          // Toggle for homepage curated vs all
  limit?: number;
}
```

### D. `TrainerSpotlightBlock`
```typescript
export interface TrainerSpotlightBlockContent {
  eyebrow: string;                // "MEET YOUR TRAINER & MENTOR"
  name: string;                   // "Mayur Sir"
  title: string;                  // "Computer Education Expert & Institute Director"
  experienceYears: string;        // "13+ Years of Excellence"
  bio: string;
  credentials: string[];          // ["Computer Diploma", "Govt. Certified Center Leader"]
  contactPhone: string;           // "8655050595"
  socialLinks: {
    youtube?: string;
    instagram?: string;
    facebook?: string;
    telegram?: string;
  };
}
```

### E. `TestimonialBlock`
```typescript
export interface TestimonialBlockContent {
  eyebrow: string;                // "Official Google Rating"
  heading: string;                // "Real Student Google Reviews"
  overallScore: number;           // 4.9
  totalReviews: string;           // "200+ Verified Reviews"
  reviewProfileUrl: string;       // "https://g.page/r/Cbr2GCg8dQWrEBM/review"
  displayItemsCount: number;
}
```

### F. `FAQBlock`
```typescript
export interface FAQBlockContent {
  eyebrow: string;                // "Common Inquiries"
  heading: string;                // "Frequently Asked Questions"
  description: string;
  categoryFilter?: string;
}
```

### G. `ContactBlock`
```typescript
export interface ContactBlockContent {
  eyebrow: string;                // "Visit Our Center"
  heading: string;                // "Begin Your Technical Education"
  instituteName: string;          // "Mayur Computech"
  address: string;                // "Shop No 5, Plot No 18, Ambe Bhumi CHS, Sector 5, Ghansoli, Navi Mumbai"
  phone: string;                  // "8655050595"
  timings: string;                // "7:30 AM – 9:30 PM (Daily)"
  centerCode: string;             // "78210482"
  googleMapsEmbedUrl?: string;
}
```

---

## 3. Dynamic Section Renderer Pipeline

```tsx
// Architectural Pattern: SectionRenderer.tsx
import { HeroBlock } from '@/components/blocks/HeroBlock';
import { StatsBlock } from '@/components/blocks/StatsBlock';
import { CourseGridBlock } from '@/components/blocks/CourseGridBlock';
import { TrainerSpotlightBlock } from '@/components/blocks/TrainerSpotlightBlock';
import { TestimonialBlock } from '@/components/blocks/TestimonialBlock';
import { GalleryBlock } from '@/components/blocks/GalleryBlock';
import { FAQBlock } from '@/components/blocks/FAQBlock';
import { ContactBlock } from '@/components/blocks/ContactBlock';

const BLOCK_COMPONENTS: Record<string, React.ComponentType<any>> = {
  HeroBlock,
  StatsBlock,
  CourseGridBlock,
  TrainerSpotlightBlock,
  TestimonialBlock,
  GalleryBlock,
  FAQBlock,
  ContactBlock,
};

export function SectionRenderer({ sections }: { sections: PageSectionRecord[] }) {
  return (
    <>
      {sections
        .filter((sec) => sec.is_visible && sec.status === 'published')
        .sort((a, b) => a.order_index - b.order_index)
        .map((sec) => {
          const Component = BLOCK_COMPONENTS[sec.block_type];
          if (!Component) return null;
          return (
            <Component
              key={sec.id}
              content={sec.content}
              settings={sec.settings}
              sectionId={sec.section_key}
            />
          );
        })}
    </>
  );
}
```

---

## 4. Section Reordering & Staging Operations

1. **Atomic Sequence Indexing**: Reordering occurs by dragging or clicking Move Up / Move Down buttons in the admin console. A batch update updates `order_index` integers in a single transaction.
2. **Draft Preview Isolation**: When an editor updates a section's content, it can be saved in `draft` status with a revision snapshot. The public site only renders `status = 'published'`, while an authenticated admin preview renders drafts with real-time viewport toggling (desktop/tablet/mobile).
3. **One-Click Reversion**: Editors can inspect past revisions from `content_revisions` and instantly restore previous payloads.
