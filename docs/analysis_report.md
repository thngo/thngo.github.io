# Codebase Analysis Report
**Date:** 2026-02-13
**Project:** NGO Family Portfolio Website
**Status:** Phase 1 Complete — Config-driven architecture operational
**Primary Stack:** React 19 + TypeScript + Vite + Tailwind CSS
**Deployment:** GitHub Pages via GitHub Actions

---

## Executive Summary

The project has been refactored from a hardcoded two-person portfolio into a **config-driven family portfolio platform**. Adding a new family member now requires only creating a JSON file — no React code changes needed. Phase 1 of the revised development plan is complete.

**Key metrics:**
- 46 TypeScript source files (~2,050 lines)
- 40/40 tests passing
- 0 TypeScript errors
- 0 ESLint errors
- Build output: 26 KB CSS + 256 KB JS (82 KB gzipped)
- Build time: ~3s

---

## Architecture Overview

### Config-Driven Design

```
public/data/
├── site.json                 # Global config: family name, nav, profile registry
└── profiles/
    ├── tra-ngo.json          # Profile data (academic template)
    └── amy-ngo.json          # Profile data (business template)
```

**Adding a new person:**
1. Create `public/data/profiles/{slug}.json`
2. Add entry to `site.json` profiles array
3. Done — route `/profiles/{slug}` works automatically

### Project Structure

```
src/
├── components/
│   ├── common/               # ErrorBoundary, LoadingSkeleton
│   ├── icons/                # GithubIcon, LinkedinIcon, GoogleScholarIcon
│   ├── profile/
│   │   ├── sections/         # AboutSection, PapersSection, TalksSection, etc.
│   │   ├── templates/        # AcademicTemplate, BusinessTemplate, MinimalTemplate
│   │   ├── ProfileRenderer   # Template dispatcher (meta.template → component)
│   │   └── SectionRenderer   # Section dispatcher (section.type → component)
│   ├── Header.tsx
│   ├── Dropdown.tsx
│   └── Timeline.tsx
├── hooks/
│   ├── useProfileData.ts     # Fetches /data/profiles/{slug}.json
│   └── useSiteConfig.ts      # Fetches /data/site.json (cached)
├── pages/
│   ├── Profile.tsx           # Dynamic profile page using URL params
│   ├── Contact.tsx           # Web3Forms contact form
│   ├── About.tsx
│   ├── SmiFsm.tsx
│   └── NotFound.tsx
├── types/
│   ├── profile.ts            # ProfileData, ProfileMeta, ProfileHero, etc.
│   ├── sections.ts           # Discriminated union for all section types
│   ├── site.ts               # SiteConfig, SiteProfileEntry
│   ├── feed.ts               # FeedItem, AggregatedFeedItem
│   └── index.ts              # Barrel re-exports
├── App.tsx                   # Routes with lazy loading + Suspense
└── index.tsx                 # React root
```

### Data Flow

```
URL /profiles/tra-ngo
  → Profile.tsx reads slug from useParams()
  → useProfileData("tra-ngo") fetches /data/profiles/tra-ngo.json
  → ProfileRenderer reads meta.template ("academic")
  → AcademicTemplate iterates sections[]
  → SectionRenderer dispatches each section to its component
```

### Template System

| Template | Description | Status |
|----------|-------------|--------|
| `academic` | Sticky section nav, social icons, section-based layout | Implemented |
| `business` | Hero banner with avatar/role, card-based sections | Implemented |
| `minimal` | Centered layout with avatar, bio, links | Implemented |
| `creative` | Future template | Falls through to minimal |

### Section Components

| Section Type | Component | Status |
|--------------|-----------|--------|
| `about` | AboutSection | Implemented |
| `papers` | PapersSection | Implemented |
| `talks` | TalksSection | Implemented |
| `posters` | PostersSection | Implemented |
| `awards` | AwardsSection | Implemented |
| `timeline` | TimelineSection | Implemented |
| `education` | EducationSection | Implemented |
| `certifications` | CertificationsSection | Implemented |
| `skills` | SkillsSection | Implemented |
| `custom` | CustomSection | Implemented |
| `projects` | — | Future |
| `gallery` | — | Future |

---

## Security Assessment

### PASSED — No Issues Found

| Check | Status |
|-------|--------|
| No hardcoded API keys | PASS |
| No credentials in code | PASS |
| No .env files committed | PASS |
| No private data exposed | PASS |
| .gitignore covers secrets | PASS |
| ES modules throughout | PASS |
| No CommonJS patterns | PASS |

### Contact Form

The contact form uses Web3Forms. The access key is loaded from `VITE_WEB3FORMS_KEY` environment variable — not hardcoded. Without the key, the form shows a configuration error message.

---

## Code Quality

### Patterns Used

- **ES Modules only** — `import.meta.url` + `fileURLToPath` for `__dirname` equivalents
- **No `React.FC`** — Function declarations with typed props
- **No unnecessary `import React`** — jsx-runtime handles JSX transformation
- **Discriminated unions** — Section types use `type` field for type-safe dispatch
- **Lazy loading** — All page routes use `React.lazy()` + `Suspense`
- **Error boundary** — Wraps the entire app
- **Modular types** — `src/types/` directory with barrel exports

### Test Coverage

| Test Suite | Tests | Status |
|------------|-------|--------|
| Header | 8 | Passing |
| Dropdown | 7 | Passing |
| Timeline | 6 | Passing |
| ErrorBoundary | 7 | Passing |
| Contact | 6 | Passing |
| About | 6 | Passing |
| **Total** | **40** | **All passing** |

### Build Output

| Asset | Size | Gzipped |
|-------|------|---------|
| CSS | 26.11 KB | 5.48 KB |
| Main JS | 237.39 KB | 75.94 KB |
| Profile chunk | 13.79 KB | 3.36 KB |
| Contact chunk | 3.34 KB | 1.27 KB |
| Other chunks | ~1.55 KB | ~1.02 KB |

### CI Pipeline

`.github/workflows/ci.yml` runs on every push:
1. `npm run validate` — JSON schema validation
2. `npm run lint` — ESLint
3. `npm run type-check` — TypeScript compiler
4. `npx vitest run` — Tests
5. `npm run build` — Production build

### Validation

`scripts/validate-profiles.ts` validates all JSON data files against the TypeScript types:
- Checks `site.json` structure
- Checks each profile JSON for required fields
- Validates section types match the discriminated union
- Run via `npm run validate`

---

## What's Done (Phase 1)

- [x] Cleanup: deleted duplicate `src/data/`, dead `me.json`, old Python validator
- [x] TypeScript types: modular `src/types/` with profile, sections, site, feed types
- [x] Data hooks: `useProfileData`, `useSiteConfig`
- [x] Data migration: `site.json`, `tra-ngo.json`, `amy-ngo.json` in new schema
- [x] Section components: 10 section types implemented
- [x] Template system: 3 templates (academic, business, minimal)
- [x] Dynamic Profile page with URL-based routing
- [x] Deleted old hardcoded pages (TraNgo.tsx, AmyNgo.tsx)
- [x] Updated routing to single `/profiles/:slug` dynamic route
- [x] All tests updated and passing

## What's Next (Phases 2-5)

See `docs/development_plan_v2.md` for full details.

**Phase 2 — Home Page & Navigation:**
- FamilyDirectory component (profile cards grid)
- Mobile hamburger nav
- Header reads nav items from `site.json`
- Footer component

**Phase 3 — Activity Feed:**
- Per-profile activity feed rendering
- Aggregated family feed on home page

**Phase 4-5 — Polish:**
- Creative template
- Per-profile theming
- Image optimization
- Additional test coverage for new components

---

## Files & Documentation

| File | Purpose | Status |
|------|---------|--------|
| `docs/development_plan_v2.md` | Current development roadmap | Active |
| `docs/analysis_report.md` | This report | Current |
| `README.md` | Project documentation | Active |
| `CLAUDE.md` | AI coding conventions | Active |

---

**Report generated:** 2026-02-13
