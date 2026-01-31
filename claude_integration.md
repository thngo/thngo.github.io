# Working with Claude on This Project

## Project Context

This is a **personal portfolio website** built with **React 19**, **TypeScript**, and **Vite**. The site showcases researcher profiles (Tra Ngo, Amy Ngo) with academic publications, talks, awards, and professional timeline. It's structured as a single-page application with multiple route-based pages and profile sections.

**Key Architecture Points:**
- Vite for build tooling with fast HMR
- React Router 7 with HashRouter (transitioning to BrowserRouter recommended)
- Tailwind CSS for styling (currently CDN, migrating to build process)
- JSON-based content management in `/data` folder
- TypeScript with strict typing throughout
- Functional components with React hooks

**Current State:** The project is in transition from prototype to production. Several configuration issues exist (see analysis_report.md for details).

---

## How to Get the Best Results from Claude

### 1. Providing Context

When asking Claude for help with this codebase, always include:

**Essential Context:**
- **Specific file paths** - Use exact paths like `src/components/Header.tsx` or `src/pages/TraNgo.tsx`
- **What you're trying to achieve** - Be specific about the desired outcome
- **Current behavior vs. expected behavior** - For debugging
- **Any error messages** - Full stack traces are helpful

**Example Prompt:**
```
I'm working on the contact form in src/pages/Contact.tsx. Currently it just
shows an alert on submission. I need to integrate with Formspree to actually
send emails. Can you:
1. Show me how to set up Formspree
2. Update the form submission handler
3. Add proper error handling and loading states
4. Maintain the existing Tailwind styling
```

**Bad Example (too vague):**
```
Make the contact form work
```

### 2. Common Tasks & Effective Prompts

#### Adding a New Feature

**Template:**
```
I need to add [feature description] to this website. Based on the current
architecture in src/[relevant folders], what's the best approach?

Please provide:
1. Where the new files should go (follow existing structure)
2. TypeScript interfaces for any new data structures
3. Component implementation with proper typing
4. Integration points with existing code (App.tsx routes, data files, etc.)
5. Any necessary updates to existing files
6. Tailwind CSS styling matching the existing teal/gray theme

Context:
- Current project uses [specific patterns from codebase]
- Styling follows [Tailwind conventions in project]
- Data is stored in JSON files in src/data/
```

**Real Example:**
```
I need to add a "Projects" page that displays research projects with:
- Project title, description, tech stack, and GitHub link
- Grid layout similar to the papers section in TraNgo.tsx
- Route at /projects

Based on the current architecture:
1. Should I create src/pages/Projects.tsx?
2. Should project data go in src/data/projects.json?
3. Do I need to add a new TypeScript interface in types.ts?
4. How should I integrate this with the Header navigation?

Please provide the complete implementation.
```

#### Debugging Issues

**Template:**
```
I'm experiencing [specific issue] in [component/file].

Symptoms: [what's happening]
Expected: [what should happen]
Error message: [paste full error]

Here's the relevant code:
[paste code snippet]

Can you:
1. Identify the root cause
2. Explain why this is happening
3. Provide the fixed code
4. Suggest how to prevent this in the future
```

**Real Example:**
```
I'm experiencing a TypeScript error in src/pages/TraNgo.tsx when trying to
map over the papers array.

Error message:
Property 'papers' does not exist on type 'TraNgoData | null'

Here's the code (line 90-96):
{papers.map((paper, i) => (
  <li key={i}>{paper.title}</li>
))}

The data is fetched with useState and initialized as null. Can you:
1. Explain why TypeScript is complaining
2. Show me the proper way to handle this with optional chaining
3. Suggest best practices for handling loading/null states
```

#### Refactoring Code

**Template:**
```
I want to refactor [component/module] to [improvement goal].

Current implementation: [paste code or file path]

Goals:
- [specific improvement 1]
- [specific improvement 2]
- Maintain TypeScript type safety
- Keep existing functionality working

Please:
1. Suggest a better approach explaining the benefits
2. Provide refactored code with types
3. Note any breaking changes to other files
4. Show how to test the refactored version
```

**Real Example:**
```
I want to refactor the Section component in src/pages/TraNgo.tsx (lines 10-18)
into a reusable component that can be used across all profile pages.

Goals:
- Move to src/components/common/Section.tsx
- Make it accept optional subtitle and custom styling
- Use it in TraNgo.tsx, AmyNgo.tsx, and future profile pages
- Maintain the current visual design

Please:
1. Show the new component with proper TypeScript types
2. Update the imports in TraNgo.tsx to use it
3. Demonstrate how to use it with and without optional props
```

#### Code Review

**Template:**
```
Please review this [component/feature] implementation.

Code: [paste code or reference file path]

Check for:
- Code quality and React/TypeScript best practices
- Potential bugs or edge cases I might have missed
- Performance considerations (unnecessary re-renders, etc.)
- Accessibility issues (ARIA labels, keyboard navigation)
- Security concerns (especially if handling user input)
- Consistency with existing codebase patterns

Provide feedback in format: Issue → Recommendation → Example Code
```

**Real Example:**
```
Please review my new Timeline component in src/components/Timeline.tsx.

Check for:
- Is the data mapping efficient?
- Are there accessibility issues with the timeline visualization?
- Could the styling be improved for mobile?
- Any potential bugs with the left/right positioning logic?
- Is the TypeScript typing appropriate?

Be specific about what should change and show example code.
```

### 3. Project-Specific Conventions

When working with Claude on this project, follow these established patterns:

#### Naming Conventions

- **Components:** PascalCase - `Header.tsx`, `Timeline.tsx`, `Dropdown.tsx`
- **Pages:** PascalCase, descriptive names - `TraNgo.tsx`, `Contact.tsx`, `About.tsx`
- **Utilities:** camelCase - `formatDate.ts`, `fetchData.ts`
- **Types:** PascalCase interfaces - `TraNgoData`, `TimelineItem`, `Paper`
- **CSS classes:** Tailwind utility classes, kebab-case for custom classes

#### State Management

- **No global state library** - React hooks (useState, useContext) are sufficient for current scope
- **Local component state** - Use useState for UI state (dropdowns, form inputs)
- **Data fetching** - useEffect with fetch API for JSON data
- **Loading states** - Always handle loading, error, and success states

**Pattern:**
```typescript
const [data, setData] = useState<TraNgoData | null>(null);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  fetch('/data/traNgoData.json')
    .then(response => response.json())
    .then(setData)
    .catch(err => setError(err.message));
}, []);
```

#### Styling Approach

- **Tailwind CSS utilities only** - No custom CSS files (currently)
- **Responsive by default** - Use `md:`, `lg:` prefixes for breakpoints
- **Color palette:**
  - Primary: `teal-500`, `teal-600`, `teal-700`
  - Text: `gray-600`, `gray-700`, `gray-800`, `gray-900`
  - Backgrounds: `gray-50`, `white`
- **Common patterns:**
  - Sections: `py-12 md:py-16`
  - Containers: `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8`
  - Cards: `rounded-lg shadow-md` or `shadow-lg`

#### Component Patterns

- **Functional components only** - No class components
- **TypeScript interfaces for props** - Always define prop types
- **React.FC type** - Use for function components: `const Component: React.FC<Props> = ({ ... }) => { ... }`
- **Extract inline components** - If JSX is repeated, extract to separate component or variable

**Example:**
```typescript
interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => (
  <section id={id} className="py-12 md:py-16">
    {/* ... */}
  </section>
);
```

#### File Organization

```
src/
├── components/
│   ├── common/         # Reusable components (Dropdown, Timeline)
│   ├── icons/          # SVG icon components
│   └── layout/         # Layout components (Header, Footer)
├── pages/              # Route-level page components
│   ├── profiles/       # Profile pages (TraNgo, AmyNgo)
│   └── misc/           # Miscellaneous pages
├── data/               # JSON data files
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main app with routing
└── index.tsx           # Entry point
```

**When creating new files:**
- Components → `src/components/[category]/ComponentName.tsx`
- Pages → `src/pages/PageName.tsx` or `src/pages/[category]/PageName.tsx`
- Types → Add to `src/types.ts` (or create category-specific type files)
- Data → `src/data/fileName.json` (lowercase, descriptive)

### 4. Key Files to Reference

When asking Claude about specific functionality, reference these key files:

| File | Purpose | When to Reference |
|------|---------|-------------------|
| `src/App.tsx` | Main routing configuration | Adding new routes, changing navigation structure |
| `src/types.ts` | All TypeScript interfaces | Creating new data structures, understanding data shape |
| `src/components/Header.tsx` | Main navigation | Modifying nav menu, adding dropdown items |
| `src/pages/TraNgo.tsx` | Primary profile page template | Creating new profile pages, understanding section structure |
| `src/components/Dropdown.tsx` | Navigation dropdown logic | Implementing other dropdown menus, click-outside behavior |
| `src/components/Timeline.tsx` | Timeline visualization | Creating similar visual components with alternating layout |
| `src/vite.config.ts` | Build configuration | Modifying build process, adding plugins, path aliases |
| `src/tsconfig.json` | TypeScript configuration | Adjusting compiler options, fixing type errors |
| `src/data/traNgoData.json` | Example data structure | Understanding expected data format for profiles |

### 5. Testing with Claude

**When requesting tests:**
```
I need tests for [component/function] in [file path].

Current implementation: [paste code or describe functionality]

Please create:
1. Unit tests covering:
   - [specific scenario 1]
   - [specific scenario 2]
   - Edge cases: [describe]
2. Integration tests for:
   - [workflow 1]
   - [workflow 2]

Use Vitest and Testing Library (the project's testing framework).
Follow the patterns in [existing test file if available].

Include:
- Proper TypeScript types for test data
- Mock data matching the shape in types.ts
- Accessibility testing (getByRole, getByLabelText)
```

**Example:**
```
I need tests for the Dropdown component in src/components/Dropdown.tsx.

Please create unit tests covering:
1. Renders with title and items
2. Opens dropdown when clicked
3. Closes dropdown when clicking outside
4. Navigates to correct route when item clicked
5. Keyboard navigation (Enter key, Escape key)

Use Vitest and Testing Library. Test both functionality and accessibility.
```

### 6. Architecture Decisions

When proposing new features or changes, Claude should consider:

**Constraints:**
- **Bundle size matters** - Avoid heavy dependencies
- **Performance** - Optimize for fast load times (target <100KB bundle after Tailwind migration)
- **Maintainability** - Simple, readable code over clever abstractions
- **TypeScript strict mode** - All code must pass type checking
- **Mobile-first** - Design for small screens, enhance for desktop
- **No backend (yet)** - Static site only, all data in JSON files

**Architectural Patterns to Follow:**
1. **Component composition** - Build complex UIs from small, reusable components
2. **Colocation** - Keep related code together (component + types in same file if small)
3. **Single Responsibility** - Each component does one thing well
4. **Prop drilling is OK** - No Redux/Context until absolutely necessary (3+ levels deep)
5. **Data-driven rendering** - Use JSON data files, keep JSX minimal and generic

**Architectural Patterns to Avoid:**
1. **Premature abstraction** - Don't create utilities until pattern appears 3+ times
2. **Over-engineering** - No complex state machines, dependency injection, etc.
3. **Heavy dependencies** - Avoid moment.js, lodash, etc. Use native JS
4. **Class components** - Functional only
5. **Any types** - Always use proper TypeScript types

### 7. Codebase Learning Path

To understand this codebase quickly, explore files in this order:

**Step 1: Entry Points (15 minutes)**
1. `src/index.html` - HTML structure, Tailwind CDN, import maps
2. `src/index.tsx` - React root initialization
3. `src/App.tsx` - Routing structure, all available routes

**Step 2: Configuration (10 minutes)**
4. `src/package.json` - Dependencies and scripts
5. `src/vite.config.ts` - Build configuration, aliases
6. `src/tsconfig.json` - TypeScript setup

**Step 3: Component Architecture (20 minutes)**
7. `src/components/Header.tsx` - Navigation structure
8. `src/components/Dropdown.tsx` - Example of stateful component
9. `src/components/Timeline.tsx` - Example of display component

**Step 4: Page Structure (20 minutes)**
10. `src/pages/TraNgo.tsx` - Main profile page (most complex component)
11. `src/pages/Contact.tsx` - Form handling example
12. `src/pages/About.tsx` - Simple static page

**Step 5: Data Layer (10 minutes)**
13. `src/types.ts` - All data structures
14. `src/data/traNgoData.json` - Example data format

**Total: ~75 minutes** to understand entire codebase

### 8. Common Pitfalls & Solutions

| Pitfall | Why It Happens | Solution |
|---------|----------------|----------|
| TypeScript error: "Cannot find module" | Path alias `@/` not resolved in IDE | Restart TypeScript server or update tsconfig paths |
| Tailwind classes not working | CSS loaded from CDN, not all classes available | Use only documented Tailwind classes, or migrate to build process |
| Page not found after refresh | HashRouter only works with #/ URLs | Use HashRouter or configure server redirects for BrowserRouter |
| Data fetch returns 404 | JSON file path incorrect or not in public folder | Check fetch path, ensure data is in public/data or served correctly |
| Component re-renders excessively | Missing dependency array in useEffect | Add proper dependencies to useEffect, or use useMemo/useCallback |
| Build fails with type errors | TypeScript strict mode enabled | Fix all type errors, never use `@ts-ignore` or `any` |
| Click-outside doesn't work | Event listener not cleaned up | Return cleanup function from useEffect (see Dropdown.tsx:27-28) |
| Router NavLink styling not applying | isActive function signature wrong | Use `({ isActive }) => \`classes ${isActive ? 'active' : ''}\`` |

### 9. Performance Optimization Prompts

When asking Claude to optimize performance:

```
Analyze the performance of [component/page] in [file path].

Current implementation: [paste code or describe]

Identify:
1. Unnecessary re-renders (check useEffect dependencies, inline functions)
2. Large bundle size impacts (heavy dependencies, unused imports)
3. Slow render times (complex computations, large lists without virtualization)
4. Network performance (data fetching, image loading)

Suggest improvements with:
- Specific code changes
- Before/after comparison
- Expected performance impact
- Any trade-offs or considerations
```

**Example:**
```
Analyze the performance of the TraNgo profile page in src/pages/TraNgo.tsx.

The page has many sections and maps over arrays (papers, talks, awards).
It fetches JSON data on mount.

Identify:
1. Could we virtualize the long lists?
2. Should we lazy load images?
3. Is the sticky navigation causing layout thrashing?
4. Could we preload the JSON data?

Suggest specific optimizations with code examples.
```

### 10. Quick Reference Commands

Use these shorthand prompts for common tasks:

**Component Creation:**
```
Create [ComponentName] in src/components/[category]/[ComponentName].tsx
- Props: [describe]
- Functionality: [describe]
- Styling: Tailwind matching existing teal/gray theme
- TypeScript: Proper interfaces
```

**Route Addition:**
```
Add route for [page name] at [path]
- Create page component in src/pages/[PageName].tsx
- Add route to App.tsx
- Add navigation link to Header.tsx
- Include TypeScript types
```

**Data Structure:**
```
Add data structure for [feature]
- Create interface in types.ts
- Create JSON file in src/data/[name].json
- Show example data
- Show how to fetch and use in component
```

**Bug Fix:**
```
Fix bug in [component] at [file:line]
- Current behavior: [describe]
- Expected behavior: [describe]
- Error (if any): [paste]
- Root cause analysis + fix
```

**Accessibility:**
```
Improve accessibility of [component] in [file]
- Check ARIA labels
- Check keyboard navigation
- Check focus management
- Check screen reader compatibility
- Provide specific code fixes
```

### 11. Using Claude Code CLI

If using the Claude Code CLI tool in this project:

**Recommended Workflow:**

1. **Start session with context:**
   ```bash
   claude-code
   # Then in the chat:
   I'm working on the personal website project. I need to [task].
   Reference analysis_report.md and claude_integration.md for context.
   ```

2. **Reference specific files:**
   ```
   @src/components/Header.tsx - Show me how to add a new navigation item
   ```

3. **Ask for project-wide changes:**
   ```
   Find all instances of [pattern] in src/ and refactor to [new pattern]
   ```

4. **Generate boilerplate:**
   ```
   Create a new profile page for "John Doe" following the pattern in TraNgo.tsx:
   - Create src/pages/JohnDoe.tsx
   - Create src/data/johnDoeData.json
   - Add route to App.tsx
   - Add to Header dropdown
   ```

**Configuration Tip:**

Create `.claudeconfig.json` in project root:
```json
{
  "contextFiles": [
    "analysis_report.md",
    "claude_integration.md",
    "src/types.ts"
  ],
  "ignorePaths": [
    "node_modules",
    "dist",
    "*.log"
  ]
}
```

### 12. Advanced Prompts

#### Multi-File Refactoring

```
I want to refactor the profile page pattern to be more maintainable.

Current state:
- TraNgo.tsx and AmyNgo.tsx duplicate most code
- Only data source differs

Goal:
- Create generic ProfilePage component
- Pass data and config as props
- Reduce duplication by 80%+
- Maintain all current functionality

Please:
1. Analyze current pattern in TraNgo.tsx
2. Design ProfilePage component API
3. Show ProfilePage implementation
4. Show how to use it in TraNgo.tsx and AmyNgo.tsx
5. List any trade-offs
```

#### Feature Planning

```
I want to add a blog section to the website.

Requirements:
- Blog posts written in Markdown
- List view showing post previews
- Individual post view with full content
- Categories/tags
- SEO-friendly URLs

Before implementing, please:
1. Propose architecture (components, data structure, routing)
2. Suggest libraries if needed (markdown parsing, etc.)
3. Show data structure (types and example JSON)
4. Identify files that need changes
5. Estimate complexity and suggest phased approach

Wait for my approval before implementing.
```

#### Migration Planning

```
Help me migrate from Tailwind CDN to build process.

Current: <script src="https://cdn.tailwindcss.com"></script>
Target: Proper Tailwind setup with PostCSS

Please:
1. List all dependencies to install
2. Show configuration files needed (tailwind.config.js, postcss.config.js)
3. Show changes to index.html
4. Show what to import in index.tsx
5. Explain purge/content configuration
6. Provide testing checklist after migration
7. Warn about potential issues
```

---

## Tips for Maximum Productivity

### DO:
- Provide full file paths for context
- Share error messages completely
- Ask for explanations along with code
- Request TypeScript types for everything
- Ask Claude to follow existing patterns
- Break large tasks into smaller steps
- Request before/after comparisons
- Ask for testing strategies

### DON'T:
- Ask vague questions like "fix this"
- Paste code without file path context
- Request features without explaining current state
- Ask for "any" types or type workarounds
- Request implementation without reviewing plan first
- Skip TypeScript in favor of JavaScript
- Ignore existing conventions in the codebase
- Forget to mention Tailwind styling requirements

---

## Example Full Workflow

**Scenario: Adding a new "Publications" page with filtering**

**Step 1: Planning**
```
I want to add a Publications page that shows all papers from all profiles
with filtering by year and author.

Current state:
- Papers are in individual profile data files (traNgoData.json, etc.)
- Papers use the Paper interface from types.ts

Before implementing, please:
1. Propose where files should go
2. Design data aggregation approach (combine JSON or unified file?)
3. Show component structure (PublicationsPage, FilterBar, PaperCard?)
4. Propose routing strategy
5. Estimate if this needs any new dependencies

Wait for my approval.
```

**Step 2: Implementation**
```
[After reviewing plan and approving]

Implement the Publications page based on the approved plan:
1. Create src/pages/Publications.tsx
2. Create aggregated src/data/allPublications.json
3. Add Publication type to types.ts if needed
4. Implement filtering by year and author
5. Add route to App.tsx
6. Add link to Header.tsx
7. Style with Tailwind matching existing theme

Provide complete code for each file.
```

**Step 3: Testing**
```
I've implemented the Publications page. Please review for:
1. TypeScript errors
2. Potential bugs (edge cases in filtering)
3. Performance issues
4. Accessibility
5. Consistency with rest of codebase

Suggest improvements.
```

**Step 4: Refinement**
```
The filtering works but could be better. Please:
1. Add URL query params for filters (e.g., /publications?year=2021)
2. Add "Clear filters" button
3. Show count of filtered results
4. Persist filter state on page navigation

Show only the changed portions of code.
```

This workflow ensures you get quality results while maintaining control over the architecture and implementation details.
