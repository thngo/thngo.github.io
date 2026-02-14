# Ngo Family Portfolio — Revised Development Plan (v2)

## Overview

This plan replaces the original `development_plan.md`. The original plan focused on bringing a single-person academic portfolio prototype to production. Since then, ~70% of those infrastructure tasks have been completed. This revised plan pivots toward the **actual goal**: a scalable family portfolio platform that supports 15+ family members worldwide, with multiple profile templates, location tracking, career updates, and an activity feed.

**Current State:** Working 2-person portfolio site with solid infrastructure (React 19, TypeScript, Vite, Tailwind 4, CI/CD, testing). The main problems are code duplication and a rigid architecture that requires writing new React components for each person.

**Target State:** A config-driven family portfolio platform where adding a new family member requires only creating a JSON file — no code changes. Supports multiple layout templates, per-person theming, career status updates, and both per-profile and aggregate activity feeds.

**Audience:** Family members, their professional contacts, and recruiters.

**Deployment:** GitHub Pages (thngo.github.io) via existing CI/CD pipeline.

---

## Architecture Overview

### Design Principles

1. **Data-driven, not code-driven** — Every profile is a JSON file. No new `.tsx` files per person.
2. **Template flexibility** — Academic, business, creative, and minimal templates. Each person picks theirs.
3. **Progressive disclosure** — Home page shows everyone at a glance; click through for full profiles.
4. **Family-first UX** — The site should feel like a family hub, not just one person's CV.
5. **Easy contribution** — Non-technical family members should be able to update their JSON (or submit updates to be committed).

### Target Directory Structure

```
thngo.github.io/
├── public/
│   ├── data/
│   │   ├── site.json                    # Global config: family name, members list, nav
│   │   └── profiles/
│   │       ├── tra-ngo.json             # One file per person
│   │       ├── amy-ngo.json
│   │       └── [slug].json              # Add new people here
│   ├── images/
│   │   ├── profiles/                    # Profile photos (WebP, optimized)
│   │   │   ├── tra-ngo.webp
│   │   │   └── amy-ngo.webp
│   │   └── og-image.jpg                 # Social sharing image
│   ├── 404.html
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx               # Nav from site.json
│   │   │   ├── Footer.tsx               # Family footer
│   │   │   └── MobileNav.tsx            # Hamburger menu for mobile
│   │   ├── profile/
│   │   │   ├── ProfileRenderer.tsx      # Template dispatcher
│   │   │   ├── templates/
│   │   │   │   ├── AcademicTemplate.tsx # Papers, talks, awards focus
│   │   │   │   ├── BusinessTemplate.tsx # Career, certifications, skills focus
│   │   │   │   ├── CreativeTemplate.tsx # Portfolio gallery, projects focus
│   │   │   │   └── MinimalTemplate.tsx  # Simple bio + links
│   │   │   └── sections/               # Reusable section components
│   │   │       ├── AboutSection.tsx
│   │   │       ├── PapersSection.tsx
│   │   │       ├── TimelineSection.tsx
│   │   │       ├── EducationSection.tsx
│   │   │       ├── SkillsSection.tsx
│   │   │       ├── ProjectsSection.tsx
│   │   │       ├── CertificationsSection.tsx
│   │   │       ├── GallerySection.tsx
│   │   │       ├── ActivityFeedSection.tsx
│   │   │       └── CustomSection.tsx    # Freeform content
│   │   ├── home/
│   │   │   ├── FamilyDirectory.tsx      # Grid of profile cards
│   │   │   ├── ProfileCard.tsx          # Card for one person
│   │   │   ├── LocationBadge.tsx        # City/country display
│   │   │   └── FilterBar.tsx            # Search + filter by location/field
│   │   ├── feed/
│   │   │   ├── ActivityFeed.tsx         # Aggregate feed component
│   │   │   └── FeedItem.tsx             # Single feed entry
│   │   ├── common/
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── LoadingSkeleton.tsx
│   │   │   └── SectionWrapper.tsx       # Consistent section styling
│   │   └── icons/
│   │       ├── GithubIcon.tsx
│   │       ├── LinkedinIcon.tsx
│   │       ├── GoogleScholarIcon.tsx
│   │       └── [additional as needed]
│   ├── pages/
│   │   ├── Home.tsx                     # Family directory landing page
│   │   ├── Profile.tsx                  # Dynamic profile loader
│   │   ├── Feed.tsx                     # Aggregate activity feed page
│   │   ├── Contact.tsx                  # Contact form
│   │   ├── About.tsx                    # About the site/family
│   │   └── NotFound.tsx
│   ├── hooks/
│   │   ├── useProfileData.ts           # Fetch + cache profile JSON
│   │   ├── useSiteConfig.ts            # Fetch site.json
│   │   └── useActivityFeed.ts          # Aggregate feed from all profiles
│   ├── types/
│   │   ├── profile.ts                  # Profile data schema
│   │   ├── site.ts                     # Site config schema
│   │   ├── feed.ts                     # Activity feed types
│   │   └── sections.ts                 # Section type definitions
│   ├── utils/
│   │   └── slugToFilename.ts           # URL slug → JSON filename
│   ├── App.tsx
│   ├── index.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── scripts/
│   ├── validate-profiles.ts            # Validate all profile JSON files
│   └── generate-sitemap.ts             # Auto-generate sitemap from profiles
├── docs/
│   ├── development_plan.md             # Original plan (archived)
│   ├── development_plan_v2.md          # This document
│   └── profile-schema.md              # Documentation for JSON format
├── .github/workflows/
│   ├── ci.yml
│   └── github-pages.yml
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── .prettierrc
```

---

## Data Schema Design

### site.json — Global Configuration

```jsonc
{
  "familyName": "The Ngo Family",
  "tagline": "Around the world, staying connected",
  "profiles": [
    {
      "slug": "tra-ngo",
      "name": "Tra Ngo",
      "shortTitle": "Computational Biologist",
      "location": { "city": "Dallas", "region": "TX", "country": "US" },
      "avatar": "/images/profiles/tra-ngo.webp",
      "template": "academic"
    },
    {
      "slug": "amy-ngo",
      "name": "Amy Ngo",
      "shortTitle": "Investment Banking",
      "location": { "city": "Sydney", "region": "NSW", "country": "AU" },
      "avatar": "/images/profiles/amy-ngo.webp",
      "template": "business"
    }
    // ... more members
  ],
  "nav": {
    "showFeed": true,
    "showContact": true,
    "showAbout": true
  }
}
```

### Profile JSON Schema — Flexible Sections

Each profile declares which sections it wants and in what order. This is the key design decision that enables multiple templates:

```jsonc
{
  "meta": {
    "name": "Tra Ngo",
    "slug": "tra-ngo",
    "template": "academic",        // "academic" | "business" | "creative" | "minimal"
    "theme": {                     // Optional per-person color theme
      "primary": "teal",          // Tailwind color name
      "accent": "emerald"
    }
  },
  "hero": {
    "title": "Tra Ngo",
    "subtitle": "Computational Biologist",
    "avatar": "/images/profiles/tra-ngo.webp",
    "bio": "Short one-line bio for cards and previews.",
    "socials": {
      "github": "https://github.com/thngo",
      "linkedin": "https://www.linkedin.com/in/tra-ngo/",
      "googleScholar": "https://scholar.google.com/citations?user=nGlTcS0AAAAJ"
    }
  },
  "status": {
    "currentRole": "Research Operation Support/Project Manager",
    "organization": "UTSW",
    "location": { "city": "Dallas", "region": "TX", "country": "US" },
    "availableFor": ["collaboration", "mentoring"],  // Optional
    "lastUpdated": "2026-02-01"
  },
  "sections": [
    {
      "type": "about",
      "title": "About Me",
      "content": {
        "paragraphs": ["...", "..."]
      }
    },
    {
      "type": "papers",
      "title": "Publications",
      "content": {
        "items": [
          { "year": 2026, "authors": "...", "title": "...", "journal": "...", "url": "..." }
        ]
      }
    },
    {
      "type": "talks",
      "title": "Talks & Presentations",
      "content": {
        "items": [
          { "year": 2024, "description": "..." }
        ]
      }
    },
    {
      "type": "timeline",
      "title": "Career Timeline",
      "content": {
        "items": [
          { "title": "...", "institution": "...", "date": "...", "side": "left" }
        ]
      }
    },
    {
      "type": "education",
      "title": "Education",
      "content": {
        "items": [
          { "institution": "...", "degree": "...", "details": [], "url": "..." }
        ]
      }
    },
    {
      "type": "awards",
      "title": "Awards & Honors",
      "content": {
        "items": [
          { "year": 2020, "name": "...", "institution": "..." }
        ]
      }
    },
    {
      "type": "custom",
      "title": "Miscellaneous",
      "content": {
        "items": ["Free text item 1", "Free text item 2"]
      }
    }
  ],
  "activityFeed": [
    {
      "date": "2026-01-15",
      "type": "publication",
      "title": "New paper on automated OSCE assessment",
      "description": "Published in MedRxiv",
      "url": "https://..."
    },
    {
      "date": "2025-06-01",
      "type": "career",
      "title": "Started new role at UTSW",
      "description": "Research Operation Support/Project Manager"
    }
  ],
  "getInTouch": {
    "text": "Please use contact form.",
    "showEmail": false
  }
}
```

### Section Types Reference

Templates use these section types. Each template defines which sections it renders by default and how they're laid out:

| Section Type | Used By Templates | Description |
|---|---|---|
| `about` | All | Bio paragraphs + images |
| `papers` | Academic | Publications list |
| `talks` | Academic | Conference talks |
| `posters` | Academic | Poster presentations |
| `awards` | Academic, Business | Awards and honors |
| `timeline` | All | Visual career timeline |
| `education` | All | Degrees and institutions |
| `skills` | Business, Creative | Skills/competencies grid |
| `certifications` | Business | Professional certs (CFA, CPA, etc.) |
| `projects` | Creative | Project portfolio with images |
| `gallery` | Creative | Image/work gallery |
| `custom` | All | Freeform list or text content |

---

## Activity Feed Design

The activity feed is a key feature that shows what family members are up to. It exists in two views:

### Per-Profile Feed
Each profile JSON has an `activityFeed` array. This is shown:
- As a small "Recent Updates" section on the profile page
- Sorted by date, most recent first
- Shows last 5 items by default, expandable

### Aggregate Feed Page (`/feed`)
A dedicated page that merges all profiles' feeds into a single chronological stream:
- Each entry shows the person's avatar, name, and the update
- Filterable by person, type, or date range
- Paginated (10-20 items per page)
- Acts as a "what's new in the family" dashboard

### Feed Item Types

```typescript
type FeedItemType =
  | 'career'        // New job, promotion, role change
  | 'publication'   // Paper, article, blog post
  | 'education'     // Graduation, new program, certification
  | 'award'         // Awards, recognition
  | 'location'      // Moved to a new city/country
  | 'milestone'     // Personal milestones (wedding, etc.)
  | 'general';      // Catch-all
```

### Updating the Feed

Since this is a static site (no backend), feed updates are done by editing the profile JSON and committing. This is the simplest approach and works well for the expected update frequency (a few times per month across all members).

A future enhancement could be a simple admin UI or Google Form → GitHub Actions pipeline for non-technical family members to submit updates.

---

## Implementation Phases

### Phase 0: Cleanup (1-2 hours)

**Goal:** Clean up leftover issues from the original development cycle.

| Task | Effort | Description |
|---|---|---|
| 0.1 Delete `src/data/` directory | 5 min | Remove duplicate data files that aren't used |
| 0.2 Fix or replace `scripts/validate_data.py` | 30 min | Rewrite as TypeScript, validate against actual schema |
| 0.3 Fix failing Contact test | 30 min | The "loading state on submission" test is flaky |
| 0.4 Remove empty `public/data/me.json` | 5 min | Unused placeholder |
| 0.5 Add `poster` to types and render | 30 min | Data exists in traNgoData.json but isn't displayed |

### Phase 1: Core Architecture Refactor (6-8 hours)

**Goal:** Replace the duplicated per-person components with the config-driven architecture.

#### 1.1 Define TypeScript Types (1 hour)
- Create `src/types/profile.ts` with the full profile schema
- Create `src/types/site.ts` for site.json config
- Create `src/types/feed.ts` for activity feed types
- Create `src/types/sections.ts` for section discriminated union types

#### 1.2 Create Data Loading Hooks (1 hour)
- `useProfileData(slug: string)` — fetches and caches profile JSON
- `useSiteConfig()` — fetches and caches site.json
- Both handle loading/error states

#### 1.3 Migrate Data Files (1.5 hours)
- Create `public/data/site.json` with global config
- Restructure `traNgoData.json` → `public/data/profiles/tra-ngo.json` in new schema
- Restructure `amyNgoData.json` → `public/data/profiles/amy-ngo.json` in new schema
- Add `status` and `activityFeed` fields to each profile
- Delete old data files after migration

#### 1.4 Build Section Components (2 hours)
- Extract existing section rendering into standalone components:
  - `AboutSection.tsx` (from TraNgo.tsx inline rendering)
  - `PapersSection.tsx`
  - `TalksSection.tsx`
  - `TimelineSection.tsx`
  - `EducationSection.tsx`
  - `AwardsSection.tsx`
  - `CustomSection.tsx`
- Each section takes typed props and renders independently
- Create `SectionWrapper.tsx` for consistent heading + divider styling

#### 1.5 Build Profile Renderer + Templates (1.5 hours)
- Create `ProfileRenderer.tsx` — reads `meta.template`, dispatches to correct template
- Create `AcademicTemplate.tsx` — sections in order: About, Papers, Talks, Awards, Timeline, Education
- Create `BusinessTemplate.tsx` — sections in order: About, Timeline, Skills, Certifications, Education
- Create `MinimalTemplate.tsx` — just About + links (for younger family members, etc.)
- Templates iterate over the profile's `sections` array and render matching section components

#### 1.6 Create Dynamic Profile Page (30 min)
- `src/pages/Profile.tsx` uses `useParams()` to get slug
- Calls `useProfileData(slug)` to load data
- Passes data to `ProfileRenderer`
- Delete `TraNgo.tsx`, `AmyNgo.tsx`, **and their test files** (`TraNgo.test.tsx`)
- Update `App.tsx` routes: `/profiles/:slug`
- Update `Header.test.tsx` if header text changed

> **Rule: When you delete or rename a file, delete or update everything that imports it in the same step.** Tests, other components, route definitions — all must be updated together. Never defer "fix the tests" to a later phase when deleting the code they test. CI runs type-check and tests on every push, so a commit that deletes a file but keeps its test will fail the pipeline.

### Phase 2: Home Page & Navigation (4-6 hours)

**Goal:** Build the family directory landing page and fix mobile navigation.

#### 2.1 Build Home Page (2-3 hours)
- `FamilyDirectory.tsx` — reads `site.json`, renders grid of `ProfileCard` components
- `ProfileCard.tsx` — avatar, name, short title, location badge, link to profile
- `LocationBadge.tsx` — flag emoji + city/country display
- `FilterBar.tsx` — text search + filter by location/country/field
  - For 15+ members, filtering becomes essential
- Responsive: 1 column on mobile, 2 on tablet, 3-4 on desktop

#### 2.2 Add Mobile Navigation (1.5 hours)
- `MobileNav.tsx` — hamburger menu with slide-out drawer
- Shows on screens below `md` breakpoint
- Includes all nav items + profile dropdown
- Closes on route change
- Accessible: proper ARIA, focus trap, escape to close

#### 2.3 Update Header (1 hour)
- Read navigation config from `site.json` instead of hardcoded items
- Dynamically generate the Profiles dropdown from `site.json.profiles`
- For 15+ members, group by location/country in the dropdown
- Add link to Feed page if `nav.showFeed` is true

#### 2.4 Add Footer (30 min)
- Simple footer: family name, year, "Built with React"
- Optional: links to individual profiles

### Phase 3: Activity Feed (3-4 hours)

**Goal:** Implement both per-profile and aggregate activity feed.

#### 3.1 Per-Profile Feed Section (1.5 hours)
- `ActivityFeedSection.tsx` — renders the last 5 feed items from a profile
- Shows date, type icon, title, optional description
- "Show more" expands to full list
- Visual design: simple timeline/card list

#### 3.2 Aggregate Feed Page (2 hours)
- `src/pages/Feed.tsx` — fetches all profile JSONs, merges `activityFeed` arrays
- `useActivityFeed()` hook — loads all profiles, extracts + sorts feed items
- `ActivityFeed.tsx` — renders chronological list with person attribution
- `FeedItem.tsx` — avatar, name, date, type badge, title, description
- Filtering: by person, by type, by date range
- Pagination or "load more" for long feeds

#### 3.3 Feed Item Type Icons (30 min)
- Small colored badges/icons for each feed type (career = briefcase, publication = book, etc.)
- Uses Tailwind classes for coloring by type

### Phase 4: Polish & Templates (4-5 hours)

**Goal:** Build remaining templates, add per-person theming, optimize for production.

#### 4.1 Business Template (1.5 hours)
- Layout optimized for corporate/finance professionals
- Sections: Hero with current role, About, Career Timeline, Skills grid, Certifications, Education
- Different visual weight than academic (less paper-focused)

#### 4.2 Creative Template (1.5 hours)
- Layout optimized for artists, designers, photographers
- Sections: Hero with portfolio highlight, About, Projects gallery, Skills, Timeline
- Image-heavy, grid layout for gallery section

#### 4.3 Per-Person Theming (1 hour)
- Read `meta.theme.primary` from profile JSON
- Apply via CSS custom properties or Tailwind's arbitrary values
- Map theme names to Tailwind color scales (teal, blue, purple, amber, rose, etc.)
- Each profile page has its own accent color

#### 4.4 Image Optimization (1 hour)
- Replace external avatar URLs with local WebP files in `public/images/profiles/`
- Add proper `alt` text from profile names
- Implement `loading="lazy"` for below-fold images
- Add `<img>` width/height to prevent layout shift

### Phase 5: Testing & Documentation (3-4 hours)

**Goal:** Update tests for new architecture, document the JSON schema for family members.

#### 5.1 Update Existing Tests (1.5 hours)
- Remove TraNgo/AmyNgo-specific tests
- Add tests for `Profile.tsx` (dynamic loading)
- Add tests for `ProfileRenderer.tsx` (template dispatch)
- Add tests for `FamilyDirectory.tsx` (card rendering, filtering)
- Fix the Contact test

#### 5.2 Add Feed Tests (1 hour)
- Test aggregate feed merging and sorting
- Test filtering by person/type
- Test empty feed state

#### 5.3 Document Profile Schema (1 hour)
- Create `docs/profile-schema.md` with:
  - Full JSON schema with all fields documented
  - Example profiles for each template type
  - Step-by-step guide: "How to add a new family member"
  - Section type reference table
- This is the document you'd share with family members who want to add/update their profiles

#### 5.4 Validate Script (30 min)
- `scripts/validate-profiles.ts` — validates all JSON files against TypeScript types
- Checks for required fields, valid template names, valid section types
- Add as npm script: `npm run validate`
- Could be added to CI pipeline

---

## Route Structure

| Route | Page | Description |
|---|---|---|
| `/` | Home | Family directory with all members |
| `/profiles/:slug` | Profile | Dynamic profile page (e.g., `/profiles/tra-ngo`) |
| `/feed` | Feed | Aggregate activity feed from all members |
| `/contact` | Contact | Contact form |
| `/about` | About | About the site and family |
| `*` | NotFound | 404 page |

---

## Adding a New Family Member

After implementation, adding a new person requires:

1. Create `public/data/profiles/[slug].json` following the schema
2. Add a profile photo to `public/images/profiles/[slug].webp`
3. Add an entry to `public/data/site.json` → `profiles` array
4. Commit and push — CI/CD deploys automatically

**No React components to create. No routes to add. No code changes.**

For non-technical family members, this could be further simplified with:
- A Google Form that outputs JSON (manual process to commit)
- A simple admin page (future enhancement)
- A PR template with a JSON skeleton

---

## Technical Decisions & Rationale

### Why JSON files instead of a CMS or database?

- **Simplicity**: GitHub Pages is static hosting. No server, no database, no costs.
- **Version control**: Every profile change is tracked in git.
- **Performance**: JSON files are served as static assets via CDN.
- **Sufficient for scale**: 15-20 JSON files of ~5-10KB each is trivial.
- **If this outgrows JSON**: Could migrate to a headless CMS (Contentful, Sanity) later. The component architecture stays the same — only the data-fetching hooks change.

### Why templates instead of fully custom layouts?

- **Consistency**: Templates ensure a professional, cohesive look across all profiles.
- **Maintainability**: 4 templates to maintain vs. 15+ custom pages.
- **Flexibility**: The section system within templates still allows significant customization.
- **Adding templates later**: New templates (e.g., "student", "retired") can be added without touching existing profiles.

### Why not a React meta-framework (Next.js, Remix)?

- **GitHub Pages**: Requires static output. Next.js `export` mode would work, but adds complexity.
- **Current stack works**: Vite + React Router is already deployed and performing well.
- **No server-side needs**: No SSR required — all data is public static JSON.
- **Migration path**: If SSR becomes needed (e.g., for SEO on 50+ profiles), migrating to Next.js from Vite + React Router is straightforward.

---

## Effort Summary

| Phase | Effort | Dependencies |
|---|---|---|
| Phase 0: Cleanup | 1-2 hours | None |
| Phase 1: Core Architecture | 6-8 hours | Phase 0 |
| Phase 2: Home Page & Nav | 4-6 hours | Phase 1 |
| Phase 3: Activity Feed | 3-4 hours | Phase 1 |
| Phase 4: Polish & Templates | 4-5 hours | Phase 1 |
| Phase 5: Testing & Docs | 3-4 hours | Phase 1-4 |
| **Total** | **~21-29 hours** | |

Phases 2, 3, and 4 can be worked on in parallel after Phase 1 is complete.

**At 15-20 hours/week, this is approximately 1.5-2 weeks of work.**

---

## Success Criteria

| Metric | Current | Target |
|---|---|---|
| Profiles supported | 2 (hardcoded) | 15+ (config-driven) |
| Code to add a new person | New .tsx file + route | JSON file only |
| Templates available | 1 (academic) | 4 (academic, business, creative, minimal) |
| Mobile navigation | Broken (hidden) | Fully functional hamburger menu |
| Activity feed | None | Per-profile + aggregate page |
| Home page | Redirect to Tra's profile | Family directory with search/filter |
| Bundle size (CSS) | 26KB | <30KB (should stay similar) |
| Bundle size (JS, gzipped) | 76KB | <100KB (templates add some weight) |
| Test pass rate | 46/47 (98%) | 100% |
| Lighthouse Performance | Untested | >90 |

---

## Future Enhancements (Not in Scope)

These are ideas for after the v2 plan is complete:

- **World map visualization** — Show family member locations on an interactive map
- **Blog/long-form content** — Markdown-based blog posts per person
- **Photo albums** — Shared family photo galleries
- **Private profiles** — Password-protected profiles for family-only content
- **Admin interface** — Simple web UI for editing profiles without touching JSON
- **i18n** — Vietnamese/English toggle for family members back in Vietnam
- **Analytics** — Privacy-respecting analytics (Plausible, Umami)
- **Dark mode** — Per-user preference toggle
