# Website Development & Improvement Plan

## Overview

This plan outlines a **5-phase approach** to transform the personal website from its current prototype state to a production-ready, maintainable, and performant application. The plan prioritizes critical infrastructure fixes first, followed by quality improvements, performance optimization, and finally polish.

**Estimated Total Duration:** 5-6 weeks (for 1 developer working part-time, ~15-20 hours/week)

**Team Size Assumption:** 1-2 developers

**Current State:** Working prototype with good architecture but critical configuration issues

**Target State:** Production-ready application with proper build process, testing, CI/CD, and optimized performance

## Goals

1. **Establish stable infrastructure** - Fix dependency conflicts, configure proper build process, initialize version control
2. **Improve code quality** - Add linting, formatting, testing, and error handling
3. **Optimize performance** - Reduce bundle size from ~3MB to <100KB, implement code splitting
4. **Enhance user experience** - Functional contact form, better loading states, accessibility improvements
5. **Enable sustainable development** - Documentation, CI/CD, automated testing

---

## Phase 1: Critical Fixes & Infrastructure

**Goal:** Address blocking issues that prevent production deployment and establish foundational development infrastructure

**Duration:** Week 1 (12-15 hours)

### Tasks

#### 1.1 Initialize Version Control
- **Priority:** 🔴 High
- **Effort:** 1 hour
- **Description:** Set up git repository to enable change tracking, collaboration, and git-based deployment
- **Success criteria:**
  - Git repository initialized with proper .gitignore
  - Initial commit created
  - Branch structure established (main, develop)
- **Files affected:**
  - Create `.gitignore`
  - All files tracked in git
- **Steps:**
  ```bash
  git init
  cat > .gitignore << EOF
  node_modules
  dist
  .env
  .env.local
  .DS_Store
  *.log
  EOF
  git add .
  git commit -m "Initial commit: personal website prototype"
  git branch develop
  ```

#### 1.2 Fix Dependency Management
- **Priority:** 🔴 High
- **Effort:** 2 hours
- **Description:** Resolve conflict between npm packages and import maps; consolidate to npm-only approach
- **Success criteria:**
  - Import maps removed from index.html
  - All dependencies managed via package.json
  - npm install works without errors
  - Development server runs successfully
- **Files affected:**
  - `src/index.html` (remove lines 20-29)
  - `package.json` (move from src/ to root)
  - `src/package.json` (delete after move)
- **Dependencies:** None
- **Steps:**
  1. Move `src/package.json` to root directory
  2. Update all relative paths in config files
  3. Remove import maps from `src/index.html`
  4. Run `npm install` to verify
  5. Test dev server: `npm run dev`
  6. Fix any import errors that arise
- **Testing checklist:**
  - [ ] npm install completes successfully
  - [ ] npm run dev starts server
  - [ ] All routes load without errors
  - [ ] Hot module replacement works

#### 1.3 Remove Dead Code
- **Priority:** 🔴 High
- **Effort:** 30 minutes
- **Description:** Delete empty legacy files that cause confusion and potential import errors
- **Success criteria:**
  - All empty files deleted
  - No broken imports
  - Repository is cleaner and easier to navigate
- **Files affected:**
  - DELETE: `src/App.js` (0 bytes)
  - DELETE: `src/pages/Home.jsx` (0 bytes)
  - DELETE: `src/pages/Profile.jsx` (0 bytes)
  - DELETE: `package.json` (root, 0 bytes)
- **Steps:**
  ```bash
  rm src/App.js
  rm src/pages/Home.jsx
  rm src/pages/Profile.jsx
  rm package.json  # empty root one
  ```
- **Testing:** Verify no import errors after deletion

#### 1.4 Fix Security Issue: Remove API Key
- **Priority:** 🔴 High
- **Effort:** 30 minutes
- **Description:** Remove exposed Gemini API key from client-side code to prevent abuse
- **Success criteria:**
  - API key definition removed from vite.config.ts
  - No API keys visible in built bundle
  - Build succeeds without errors
- **Files affected:**
  - `src/vite.config.ts` (remove lines 13-16, the entire `define` section)
- **Steps:**
  1. Open `src/vite.config.ts`
  2. Remove the `define` object (lines 13-16)
  3. If API is needed in future, document to use backend proxy instead
  4. Run build to verify: `npm run build`
- **Note:** Currently the API key is unused, but removing prevents future security issues

#### 1.5 Configure Tailwind Build Process
- **Priority:** 🔴 High
- **Effort:** 3 hours
- **Description:** Migrate from Tailwind CDN to proper build process for massive performance improvement
- **Success criteria:**
  - Tailwind installed as dev dependency
  - PostCSS and Autoprefixer configured
  - CDN script removed from HTML
  - All existing styles still work
  - Built CSS is <50KB (down from 3MB)
- **Files affected:**
  - `src/index.html` (remove Tailwind CDN script)
  - Create: `tailwind.config.js`
  - Create: `postcss.config.js`
  - Create: `src/styles/index.css`
  - `src/index.tsx` (import CSS)
- **Dependencies:** Completes after 1.2 (dependency management fixed)
- **Steps:**
  1. Install dependencies:
     ```bash
     npm install -D tailwindcss postcss autoprefixer
     ```
  2. Initialize Tailwind:
     ```bash
     npx tailwindcss init -p
     ```
  3. Configure `tailwind.config.js`:
     ```javascript
     export default {
       content: [
         "./index.html",
         "./src/**/*.{js,ts,jsx,tsx}",
       ],
       theme: {
         extend: {
           colors: {
             teal: {
               500: '#14b8a6',
               600: '#0d9488',
               700: '#0f766e',
             }
           }
         },
       },
       plugins: [],
     }
     ```
  4. Create `src/styles/index.css`:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```
  5. Import in `src/index.tsx`: `import './styles/index.css';`
  6. Remove CDN script from `src/index.html` (line 8)
  7. Test all pages for styling issues
- **Testing checklist:**
  - [ ] All pages render with correct styling
  - [ ] Responsive design still works
  - [ ] Colors match previous appearance
  - [ ] Build produces small CSS file (<50KB)

#### 1.6 Switch to BrowserRouter
- **Priority:** 🟡 Medium
- **Effort:** 1 hour
- **Description:** Replace HashRouter with BrowserRouter for cleaner URLs and better SEO
- **Success criteria:**
  - URLs no longer have #/ hash fragments
  - All routes work correctly
  - Hosting configured with fallback route
- **Files affected:**
  - `src/App.tsx` (line 13: HashRouter → BrowserRouter)
- **Steps:**
  1. Update import: `import { BrowserRouter, ... }`
  2. Replace `<HashRouter>` with `<BrowserRouter>`
  3. Test all routes locally
  4. Document hosting configuration needed (see below)
- **Hosting Configuration:**
  - **Vercel:** Add `vercel.json`:
    ```json
    {
      "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
    }
    ```
  - **Netlify:** Add `netlify.toml`:
    ```toml
    [[redirects]]
      from = "/*"
      to = "/index.html"
      status = 200
    ```

#### 1.7 Add 404 Not Found Page
- **Priority:** 🟢 Low
- **Effort:** 1 hour
- **Description:** Create fallback page for invalid routes instead of blank screen
- **Success criteria:**
  - NotFound component created
  - Catch-all route added
  - User-friendly message and navigation
- **Files affected:**
  - Create: `src/pages/NotFound.tsx`
  - `src/App.tsx` (add catch-all route)
- **Steps:**
  1. Create `src/pages/NotFound.tsx`:
     ```typescript
     import React from 'react';
     import { Link } from 'react-router-dom';

     const NotFound: React.FC = () => {
       return (
         <div className="container mx-auto p-8 text-center">
           <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
           <p className="text-xl text-gray-600 mb-8">Page not found</p>
           <Link to="/" className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600">
             Go Home
           </Link>
         </div>
       );
     };
     export default NotFound;
     ```
  2. Add to `src/App.tsx` routes:
     ```typescript
     <Route path="*" element={<NotFound />} />
     ```
  3. Test by navigating to `/invalid-route`

### Deliverables

- [ ] Git repository initialized and configured
- [ ] Package.json moved to root, import maps removed
- [ ] Dead code files deleted
- [ ] API key removed from configuration
- [ ] Tailwind configured with build process
- [ ] BrowserRouter implemented
- [ ] 404 page created

### Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Breaking changes in dependency update | Medium | High | Test thoroughly after each change; commit between steps |
| Tailwind migration causes styling issues | Medium | Medium | Compare screenshots before/after; test all pages and breakpoints |
| Import errors after moving package.json | Low | High | Keep backup; test dev server immediately after change |

---

## Phase 2: Code Quality & Tooling

**Goal:** Establish code quality standards through linting, formatting, and automated checks

**Duration:** Week 2 (10-12 hours)

**Dependencies:** Phase 1 complete (especially task 1.2 - dependency management)

### Tasks

#### 2.1 Configure ESLint
- **Priority:** 🟡 Medium
- **Effort:** 2 hours
- **Description:** Set up ESLint with React and TypeScript rules to catch bugs and enforce consistency
- **Success criteria:**
  - ESLint installed and configured
  - All files pass linting (or errors documented for fixing)
  - VS Code shows inline lint errors
- **Files affected:**
  - Create: `.eslintrc.json`
  - Create: `.eslintignore`
  - `package.json` (add lint script)
- **Steps:**
  1. Install dependencies:
     ```bash
     npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
     npm install -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
     ```
  2. Create `.eslintrc.json`:
     ```json
     {
       "env": { "browser": true, "es2021": true },
       "extends": [
         "eslint:recommended",
         "plugin:react/recommended",
         "plugin:react-hooks/recommended",
         "plugin:@typescript-eslint/recommended",
         "plugin:jsx-a11y/recommended"
       ],
       "parser": "@typescript-eslint/parser",
       "parserOptions": {
         "ecmaFeatures": { "jsx": true },
         "ecmaVersion": "latest",
         "sourceType": "module"
       },
       "plugins": ["react", "@typescript-eslint", "jsx-a11y"],
       "rules": {
         "react/react-in-jsx-scope": "off"
       },
       "settings": {
         "react": { "version": "detect" }
       }
     }
     ```
  3. Create `.eslintignore`:
     ```
     dist
     node_modules
     *.config.js
     *.config.ts
     ```
  4. Add script to `package.json`:
     ```json
     "lint": "eslint src --ext ts,tsx"
     ```
  5. Run and document errors: `npm run lint`
  6. Fix auto-fixable issues: `npm run lint -- --fix`

#### 2.2 Configure Prettier
- **Priority:** 🟡 Medium
- **Effort:** 1 hour
- **Description:** Set up Prettier for consistent code formatting across the project
- **Success criteria:**
  - Prettier installed and configured
  - All files formatted consistently
  - Prettier plays nicely with ESLint (no conflicts)
- **Files affected:**
  - Create: `.prettierrc`
  - Create: `.prettierignore`
  - `package.json` (add format script)
- **Steps:**
  1. Install:
     ```bash
     npm install -D prettier eslint-config-prettier
     ```
  2. Update `.eslintrc.json` extends array, add `"prettier"` at end
  3. Create `.prettierrc`:
     ```json
     {
       "semi": true,
       "trailingComma": "es5",
       "singleQuote": true,
       "printWidth": 100,
       "tabWidth": 2
     }
     ```
  4. Create `.prettierignore`:
     ```
     dist
     node_modules
     ```
  5. Add to `package.json`:
     ```json
     "format": "prettier --write \"src/**/*.{ts,tsx,css,json}\"",
     "format:check": "prettier --check \"src/**/*.{ts,tsx,css,json}\""
     ```
  6. Run: `npm run format`

#### 2.3 Set Up Pre-commit Hooks
- **Priority:** 🟡 Medium
- **Effort:** 1 hour
- **Description:** Automatically run linting and formatting before commits to maintain quality
- **Success criteria:**
  - Husky installed and configured
  - Pre-commit hook runs lint and format
  - Bad code cannot be committed
- **Files affected:**
  - Create: `.husky/pre-commit`
  - `package.json` (add prepare script)
- **Steps:**
  1. Install:
     ```bash
     npm install -D husky lint-staged
     npx husky install
     ```
  2. Add to `package.json`:
     ```json
     "prepare": "husky install",
     "lint-staged": {
       "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
       "*.{css,json}": ["prettier --write"]
     }
     ```
  3. Create hook:
     ```bash
     npx husky add .husky/pre-commit "npx lint-staged"
     ```
  4. Test by making a commit with intentionally bad formatting

#### 2.4 Add TypeScript Type Checking Script
- **Priority:** 🟡 Medium
- **Effort:** 30 minutes
- **Description:** Add script to run TypeScript compiler for type checking without emitting files
- **Success criteria:**
  - Type checking script added
  - All files pass type checking
- **Files affected:**
  - `package.json` (add type-check script)
- **Steps:**
  1. Add to `package.json` scripts:
     ```json
     "type-check": "tsc --noEmit"
     ```
  2. Run: `npm run type-check`
  3. Fix any type errors found
  4. Document any remaining errors with plan to fix

#### 2.5 Create VS Code Workspace Settings
- **Priority:** 🟢 Low
- **Effort:** 1 hour
- **Description:** Configure VS Code for optimal development experience
- **Success criteria:**
  - Recommended extensions configured
  - Formatting on save enabled
  - Consistent settings across team
- **Files affected:**
  - Create: `.vscode/settings.json`
  - Create: `.vscode/extensions.json`
- **Steps:**
  1. Create `.vscode/extensions.json`:
     ```json
     {
       "recommendations": [
         "dbaeumer.vscode-eslint",
         "esbenp.prettier-vscode",
         "bradlc.vscode-tailwindcss",
         "ms-vscode.vscode-typescript-next"
       ]
     }
     ```
  2. Create `.vscode/settings.json`:
     ```json
     {
       "editor.formatOnSave": true,
       "editor.defaultFormatter": "esbenp.prettier-vscode",
       "editor.codeActionsOnSave": {
         "source.fixAll.eslint": true
       },
       "typescript.tsdk": "node_modules/typescript/lib",
       "tailwindCSS.experimental.classRegex": [
         ["className\\s*=\\s*['\"`]([^'\"`]*)['\"`]", "'([^']*)'"]
       ]
     }
     ```

#### 2.6 Fix All Linting Errors
- **Priority:** 🟡 Medium
- **Effort:** 3 hours
- **Description:** Address all ESLint errors and warnings in the codebase
- **Success criteria:**
  - Zero ESLint errors
  - Zero ESLint warnings (or documented exceptions)
  - Code follows React/TypeScript best practices
- **Files affected:** Various (identified by `npm run lint`)
- **Steps:**
  1. Run `npm run lint` to list all issues
  2. Group issues by type (unused vars, missing deps, etc.)
  3. Fix systematically:
     - Auto-fixable: `npm run lint -- --fix`
     - Accessibility issues: Add ARIA labels, semantic HTML
     - Hooks dependencies: Update useEffect dependency arrays
     - Unused variables: Remove or prefix with underscore
  4. Re-run lint after each fix
  5. Document any intentional rule exceptions with inline comments

### Deliverables

- [ ] ESLint configured with React/TypeScript rules
- [ ] Prettier configured for consistent formatting
- [ ] Pre-commit hooks preventing bad code commits
- [ ] Type checking script added
- [ ] VS Code workspace configured
- [ ] All linting errors fixed

### Risk Mitigation

- **Linting reveals many issues:** Prioritize high-severity issues; document low-severity for later
- **Pre-commit hooks slow down commits:** Configure lint-staged to only check changed files
- **Team members don't have VS Code:** Document tool-agnostic commands (npm scripts)

---

## Phase 3: Testing Infrastructure

**Goal:** Establish comprehensive testing to catch regressions and enable confident refactoring

**Duration:** Week 3-4 (15-18 hours)

**Dependencies:** Phase 2 complete (code quality tools in place)

### Tasks

#### 3.1 Configure Vitest
- **Priority:** 🔴 High
- **Effort:** 2 hours
- **Description:** Set up Vitest (Vite-native testing framework) with React Testing Library
- **Success criteria:**
  - Vitest installed and configured
  - Test script runs successfully
  - Sample test passes
- **Files affected:**
  - `vite.config.ts` (add test configuration)
  - Create: `src/setupTests.ts`
  - `package.json` (add test scripts)
- **Steps:**
  1. Install dependencies:
     ```bash
     npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
     npm install -D @testing-library/user-event @vitest/ui
     ```
  2. Update `vite.config.ts`:
     ```typescript
     import { defineConfig } from 'vite';
     export default defineConfig({
       // ... existing config
       test: {
         globals: true,
         environment: 'jsdom',
         setupFiles: './src/setupTests.ts',
         css: true,
       },
     });
     ```
  3. Create `src/setupTests.ts`:
     ```typescript
     import '@testing-library/jest-dom';
     ```
  4. Add to `package.json`:
     ```json
     "test": "vitest",
     "test:ui": "vitest --ui",
     "test:coverage": "vitest --coverage"
     ```
  5. Test configuration:
     ```bash
     npm test
     ```

#### 3.2 Write Component Unit Tests
- **Priority:** 🔴 High
- **Effort:** 6 hours
- **Description:** Create unit tests for all reusable components
- **Success criteria:**
  - Test files created for Dropdown, Timeline, Header
  - Tests cover rendering, interaction, and edge cases
  - All tests pass
  - Code coverage >70% for component folder
- **Files affected:**
  - Create: `src/components/__tests__/Dropdown.test.tsx`
  - Create: `src/components/__tests__/Timeline.test.tsx`
  - Create: `src/components/__tests__/Header.test.tsx`
- **Steps:**

  **Dropdown Tests:**
  ```typescript
  import { describe, it, expect, vi } from 'vitest';
  import { render, screen, fireEvent } from '@testing-library/react';
  import { BrowserRouter } from 'react-router-dom';
  import Dropdown from '../Dropdown';

  const mockItems = [
    { label: 'Item 1', path: '/item-1' },
    { label: 'Item 2', path: '/item-2' },
  ];

  describe('Dropdown', () => {
    it('renders with title', () => {
      render(
        <BrowserRouter>
          <Dropdown title="Test Menu" items={mockItems} />
        </BrowserRouter>
      );
      expect(screen.getByText('Test Menu')).toBeInTheDocument();
    });

    it('opens menu on click', () => {
      render(
        <BrowserRouter>
          <Dropdown title="Test Menu" items={mockItems} />
        </BrowserRouter>
      );
      fireEvent.click(screen.getByText('Test Menu'));
      expect(screen.getByText('Item 1')).toBeVisible();
    });

    it('closes menu when clicking outside', () => {
      render(
        <div>
          <BrowserRouter>
            <Dropdown title="Test Menu" items={mockItems} />
          </BrowserRouter>
          <div data-testid="outside">Outside</div>
        </div>
      );
      fireEvent.click(screen.getByText('Test Menu'));
      fireEvent.mouseDown(screen.getByTestId('outside'));
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });
  });
  ```

  Similar tests for Timeline and Header components.

#### 3.3 Write Page Integration Tests
- **Priority:** 🟡 Medium
- **Effort:** 4 hours
- **Description:** Create integration tests for page components
- **Success criteria:**
  - Tests for TraNgo, Contact, About pages
  - Tests verify data fetching, rendering, and user interactions
  - Mock data properly configured
- **Files affected:**
  - Create: `src/pages/__tests__/TraNgo.test.tsx`
  - Create: `src/pages/__tests__/Contact.test.tsx`
  - Create: `src/pages/__tests__/About.test.tsx`
- **Steps:**

  **TraNgo Test Example:**
  ```typescript
  import { describe, it, expect, beforeEach, vi } from 'vitest';
  import { render, screen, waitFor } from '@testing-library/react';
  import { BrowserRouter } from 'react-router-dom';
  import TraNgo from '../TraNgo';

  const mockData = {
    aboutMe: {
      title: 'ABOUT ME',
      paragraphs: ['Test paragraph'],
      images: [],
      socials: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        googleScholar: 'https://scholar.google.com',
      },
    },
    papers: [],
    talks: [],
    awards: [],
    miscellaneous: [],
    timeline: [],
    education: [],
    getInTouch: { email: 'test@example.com', text: 'Get in touch' },
  };

  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData),
    })
  ) as any;

  describe('TraNgo', () => {
    it('shows loading state initially', () => {
      render(
        <BrowserRouter>
          <TraNgo />
        </BrowserRouter>
      );
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders page data after loading', async () => {
      render(
        <BrowserRouter>
          <TraNgo />
        </BrowserRouter>
      );
      await waitFor(() => {
        expect(screen.getByText('Test paragraph')).toBeInTheDocument();
      });
    });

    it('shows error message on fetch failure', async () => {
      global.fetch = vi.fn(() => Promise.reject(new Error('Failed'))) as any;
      render(
        <BrowserRouter>
          <TraNgo />
        </BrowserRouter>
      );
      await waitFor(() => {
        expect(screen.getByText(/Failed to load page data/)).toBeInTheDocument();
      });
    });
  });
  ```

#### 3.4 Add Error Boundary Tests
- **Priority:** 🟡 Medium
- **Effort:** 2 hours
- **Description:** Create ErrorBoundary component and test it
- **Success criteria:**
  - ErrorBoundary component created
  - Tests verify error catching and fallback UI
  - Integrated into App.tsx
- **Files affected:**
  - Create: `src/components/common/ErrorBoundary.tsx`
  - Create: `src/components/common/__tests__/ErrorBoundary.test.tsx`
  - `src/App.tsx` (wrap Routes in ErrorBoundary)

#### 3.5 Configure Coverage Reporting
- **Priority:** 🟢 Low
- **Effort:** 1 hour
- **Description:** Set up code coverage reporting to track test effectiveness
- **Success criteria:**
  - Coverage report generated
  - Coverage thresholds configured
  - HTML report available
- **Steps:**
  1. Install: `npm install -D @vitest/coverage-v8`
  2. Update `vite.config.ts`:
     ```typescript
     test: {
       coverage: {
         provider: 'v8',
         reporter: ['text', 'html', 'lcov'],
         exclude: ['node_modules/', 'src/setupTests.ts'],
       },
     }
     ```
  3. Run: `npm run test:coverage`
  4. Review coverage/index.html

### Deliverables

- [ ] Vitest configured and working
- [ ] Unit tests for all components
- [ ] Integration tests for pages
- [ ] ErrorBoundary component with tests
- [ ] Coverage reporting configured
- [ ] Test coverage >70%

### Risk Mitigation

- **Testing takes longer than estimated:** Prioritize critical user flows; defer edge case tests
- **Mocking fetch API is complex:** Use MSW (Mock Service Worker) for more realistic API mocking
- **Coverage is low:** Focus on high-risk areas first; gradually increase coverage

---

## Phase 4: Performance & Features

**Goal:** Optimize performance and complete missing features for production readiness

**Duration:** Week 5 (12-15 hours)

**Dependencies:** Phase 1-3 complete

### Tasks

#### 4.1 Implement Code Splitting
- **Priority:** 🟡 Medium
- **Effort:** 2 hours
- **Description:** Use React.lazy() to split routes into separate bundles
- **Success criteria:**
  - Each route loads as separate JS chunk
  - Initial bundle size reduced by 40%+
  - Loading states shown during chunk load
- **Files affected:**
  - `src/App.tsx`
- **Steps:**
  1. Update `src/App.tsx`:
     ```typescript
     import React, { lazy, Suspense } from 'react';

     const TraNgo = lazy(() => import('./pages/TraNgo'));
     const AmyNgo = lazy(() => import('./pages/AmyNgo'));
     const Contact = lazy(() => import('./pages/Contact'));
     const About = lazy(() => import('./pages/About'));
     const SmiFsm = lazy(() => import('./pages/SmiFsm'));

     // In render:
     <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
       <Routes>
         {/* ... routes */}
       </Routes>
     </Suspense>
     ```
  2. Build and analyze: `npm run build`
  3. Check dist/ for separate chunk files

#### 4.2 Create Loading Skeleton Component
- **Priority:** 🟡 Medium
- **Effort:** 2 hours
- **Description:** Replace plain "Loading..." text with animated skeleton UI
- **Success criteria:**
  - Skeleton component created
  - Used in TraNgo and other pages
  - Smooth transition from skeleton to content
- **Files affected:**
  - Create: `src/components/common/LoadingSkeleton.tsx`
  - `src/pages/TraNgo.tsx` (use skeleton)
- **Implementation:**
  ```typescript
  const LoadingSkeleton: React.FC = () => (
    <div className="max-w-4xl mx-auto p-8 space-y-8 animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="h-48 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
  ```

#### 4.3 Integrate Functional Contact Form
- **Priority:** 🟡 Medium
- **Effort:** 3 hours
- **Description:** Integrate Formspree or EmailJS for actual email delivery
- **Success criteria:**
  - Form submissions send real emails
  - Success/error messages shown
  - Form validation improved
  - Loading state during submission
- **Files affected:**
  - `src/pages/Contact.tsx`
- **Steps (Formspree):**
  1. Sign up at formspree.io, get form endpoint
  2. Update Contact.tsx:
     ```typescript
     const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
       setStatus('loading');
       const form = e.currentTarget;
       const data = new FormData(form);

       try {
         const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
           method: 'POST',
           body: data,
           headers: { 'Accept': 'application/json' },
         });
         if (response.ok) {
           setStatus('success');
           form.reset();
         } else {
           setStatus('error');
         }
       } catch (error) {
         setStatus('error');
       }
     };

     // Show status messages in UI
     ```
  3. Test form submission

#### 4.4 Optimize Images
- **Priority:** 🟡 Medium
- **Effort:** 2 hours
- **Description:** Replace placeholder images with optimized real images
- **Success criteria:**
  - Images converted to WebP format
  - Lazy loading implemented
  - Images served from /public/images
  - Page load time improved
- **Files affected:**
  - Create: `public/images/` directory
  - `src/data/traNgoData.json` (update image paths)
  - Image files (compress and convert)
- **Steps:**
  1. Create `public/images` folder
  2. Add actual images (compressed)
  3. Use lazy loading:
     ```typescript
     <img loading="lazy" src="/images/profile.webp" alt="Profile" />
     ```
  4. Update JSON data with real paths

#### 4.5 Add SEO Metadata
- **Priority:** 🟡 Medium
- **Effort:** 2 hours
- **Description:** Add proper meta tags for SEO and social sharing
- **Success criteria:**
  - Title, description, OG tags added
  - Favicon added
  - Sitemap created
  - robots.txt configured
- **Files affected:**
  - `src/index.html`
  - Create: `public/favicon.ico`
  - Create: `public/sitemap.xml`
  - Create: `public/robots.txt`
- **Steps:**
  1. Update `index.html`:
     ```html
     <meta name="description" content="Personal website of [Your Name], researcher in biophysics">
     <meta property="og:title" content="[Your Name] - Personal Website">
     <meta property="og:description" content="Academic portfolio showcasing research, publications, and projects">
     <meta property="og:image" content="/images/og-image.jpg">
     <link rel="icon" href="/favicon.ico">
     ```
  2. Create sitemap.xml
  3. Create robots.txt

#### 4.6 Performance Audit & Optimization
- **Priority:** 🟡 Medium
- **Effort:** 2 hours
- **Description:** Run Lighthouse audit and address performance issues
- **Success criteria:**
  - Lighthouse Performance score >90
  - First Contentful Paint <1.5s
  - Largest Contentful Paint <2.5s
- **Steps:**
  1. Build production: `npm run build`
  2. Preview: `npm run preview`
  3. Run Lighthouse in Chrome DevTools
  4. Address issues:
     - Preconnect to external domains
     - Add resource hints
     - Optimize font loading
  5. Re-run audit to verify improvements

### Deliverables

- [ ] Code splitting implemented
- [ ] Loading skeleton component
- [ ] Functional contact form
- [ ] Optimized images
- [ ] SEO metadata complete
- [ ] Lighthouse score >90

---

## Phase 5: Documentation & Deployment

**Goal:** Complete documentation and set up automated deployment

**Duration:** Week 6 (8-10 hours)

### Tasks

#### 5.1 Write Comprehensive README
- **Priority:** 🔴 High
- **Effort:** 2 hours
- **Description:** Create README with setup, development, and deployment instructions
- **Success criteria:**
  - New developer can set up project from README alone
  - All commands documented
  - Architecture explained
- **Files affected:**
  - Create: `README.md`
- **Sections:**
  - Project overview
  - Features
  - Tech stack
  - Prerequisites
  - Installation
  - Development
  - Testing
  - Building
  - Deployment
  - Project structure
  - Contributing

#### 5.2 Set Up CI/CD Pipeline
- **Priority:** 🔴 High
- **Effort:** 3 hours
- **Description:** Create GitHub Actions workflow for automated testing and deployment
- **Success criteria:**
  - CI runs on every push
  - Linting, type checking, and tests run automatically
  - Failed builds block merging
  - Production deploys on merge to main
- **Files affected:**
  - Create: `.github/workflows/ci.yml`
  - Create: `.github/workflows/deploy.yml`
- **CI Workflow:**
  ```yaml
  name: CI
  on: [push, pull_request]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
          with: { node-version: '18' }
        - run: npm ci
        - run: npm run lint
        - run: npm run type-check
        - run: npm test
        - run: npm run build
  ```

#### 5.3 Deploy to Production
- **Priority:** 🔴 High
- **Effort:** 2 hours
- **Description:** Deploy to Vercel or Netlify with automatic deployments
- **Success criteria:**
  - Site live at custom domain (or platform subdomain)
  - HTTPS enabled
  - Automatic deployments configured
  - Environment variables configured
- **Steps (Vercel):**
  1. Install Vercel CLI: `npm i -g vercel`
  2. Login: `vercel login`
  3. Deploy: `vercel`
  4. Configure: `vercel --prod`
  5. Set up GitHub integration for auto-deploy
  6. Add custom domain (optional)

#### 5.4 Add Component Documentation
- **Priority:** 🟢 Low
- **Effort:** 2 hours
- **Description:** Add JSDoc comments to complex components
- **Success criteria:**
  - All public components documented
  - Props described with examples
- **Example:**
  ```typescript
  /**
   * Dropdown navigation menu with click-outside detection
   *
   * @param title - Text displayed on the dropdown button
   * @param items - Array of navigation links to display in menu
   *
   * @example
   * ```tsx
   * <Dropdown
   *   title="Profiles"
   *   items={[
   *     { label: 'Tra Ngo', path: '/profiles/tra-ngo' },
   *     { label: 'Amy Ngo', path: '/profiles/amy-ngo' }
   *   ]}
   * />
   * ```
   */
  ```

### Deliverables

- [ ] Comprehensive README.md
- [ ] CI/CD pipeline configured
- [ ] Site deployed to production
- [ ] Component documentation added

---

## Success Metrics

Track these metrics before and after implementation:

| Metric | Current | Target | Measurement Method |
|--------|---------|--------|-------------------|
| Test Coverage | 0% | 75% | `npm run test:coverage` |
| Build Time | ~30s | <20s | `time npm run build` |
| Page Load Time | ~4s | <2s | Lighthouse, Network tab |
| Bundle Size (JS) | Unknown | <150KB gzipped | `ls -lh dist/assets/*.js` |
| Bundle Size (CSS) | 3MB (CDN) | <50KB | `ls -lh dist/assets/*.css` |
| Lighthouse Score | Unknown | >90 | Chrome DevTools Lighthouse |
| ESLint Errors | Unknown | 0 | `npm run lint` |
| TypeScript Errors | 0 | 0 | `npm run type-check` |

**How to measure:**
1. **Before starting:** Run all commands and record baseline
2. **After Phase 1:** Measure bundle size improvements
3. **After Phase 3:** Measure test coverage
4. **After Phase 4:** Run Lighthouse audit
5. **After Phase 5:** Final measurements

---

## Resource Requirements

### Tools Needed

- **Node.js 18+** (already have)
- **Git** (need to install if not present)
- **VS Code** (recommended) with extensions
- **Chrome** (for Lighthouse audits)
- **Hosting account** (Vercel/Netlify free tier)
- **Formspree account** (free tier, for contact form)

### Skills Required

- React & TypeScript (have)
- Vite configuration (have basics, will learn)
- Testing with Vitest (new, tutorials available)
- Git workflow (basics needed)
- CI/CD concepts (GitHub Actions documentation)

---

## Risks & Contingencies

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| Tailwind migration breaks styling | Medium | High | Take screenshots before migration; test all pages; keep CDN as backup temporarily |
| Testing takes longer than estimated | High | Medium | Prioritize critical paths; defer edge cases; aim for 60% coverage initially |
| Breaking changes during dependency update | Low | High | Update one major dependency at a time; read changelogs; commit between updates |
| CI/CD deployment fails | Medium | Medium | Test deploy manually first; use platform documentation; have fallback manual deploy |
| Performance targets not met | Low | Medium | Profile with DevTools; defer optimizations; document for future iteration |
| Time overruns | High | Medium | Complete phases in order; Phase 1-2 are critical, 3-5 can be deferred |

---

## Maintenance Plan (Post-Implementation)

### Weekly

- **Monitor production errors** - Check error monitoring dashboard (if set up)
- **Review dependency security** - Run `npm audit` and address critical vulnerabilities
- **Check analytics** - Review site traffic and user behavior (if GA set up)

### Monthly

- **Update dependencies** - Run `npm outdated`, update patch versions
- **Review test coverage** - Ensure coverage hasn't dropped, add tests for new code
- **Performance audit** - Run Lighthouse, ensure scores haven't regressed
- **Backup check** - Verify git remote backup is up to date

### Quarterly

- **Major dependency updates** - Update React, TypeScript, Vite to latest versions
- **Security audit** - Run full security scan with `npm audit`
- **Code review** - Review recent changes for quality and consistency
- **Feature planning** - Plan next improvements based on user feedback

### Annually

- **Architecture review** - Assess if current architecture still fits needs
- **Technology updates** - Consider new tools/frameworks that might improve DX
- **Performance baseline** - Re-establish performance baselines and targets

---

## Appendix: Detailed Task Breakdown

### Phase 1, Task 1.5: Tailwind Migration Details

**Time breakdown:**
- Install and config (30 min)
- Test all pages (60 min)
- Fix styling issues (60 min)
- Verify responsive design (30 min)

**Testing checklist:**
- [ ] Header navigation renders correctly
- [ ] Dropdown menus work and style matches
- [ ] Profile pages load with correct colors
- [ ] Timeline visualization intact
- [ ] Contact form styling preserved
- [ ] Hover states work (links, buttons)
- [ ] Focus states visible
- [ ] Mobile responsive (test 375px, 768px, 1024px)
- [ ] Build succeeds: `npm run build`
- [ ] Built CSS file <50KB

**Rollback plan:** If issues arise, temporarily revert to CDN while debugging:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

### Phase 3, Task 3.2: Test Coverage Targets

**Minimum coverage by file:**
- `Dropdown.tsx`: 80% (critical user interaction)
- `Timeline.tsx`: 70% (visual component)
- `Header.tsx`: 75% (navigation critical)
- `TraNgo.tsx`: 60% (complex page, lower priority)
- `Contact.tsx`: 80% (form handling critical)

**Testing priorities:**
1. User interactions (clicks, form submission)
2. Data rendering (map operations, conditional display)
3. Error states
4. Loading states
5. Edge cases (empty arrays, null data)

---

## Phase 6: Code Architecture Refactoring (Future Enhancement)

**Goal:** Eliminate code duplication and improve maintainability by refactoring profile pages to use a dynamic component architecture

**Duration:** 2-3 hours

**Status:** 🔮 Future Enhancement (Not yet implemented)

### Overview

Currently, each profile page (TraNgo.tsx, AmyNgo.tsx) has its own separate component file with nearly identical code (~200 lines of duplicated code). This creates maintenance overhead and makes it difficult to add new profiles.

**Current Architecture:**
```
/profiles/tra-ngo  → TraNgo.tsx (fetches traNgoData.json)
/profiles/amy-ngo  → AmyNgo.tsx (fetches amyNgoData.json)
```

**Target Architecture:**
```
/profiles/:profileId  → Profile.tsx (dynamically fetches {profileId}Data.json)
```

### Benefits

- ✅ **Eliminate Code Duplication** - 400+ lines reduced to ~200 lines
- ✅ **Easier Maintenance** - Fix bugs once, affects all profiles
- ✅ **Scalability** - Add new profiles by just adding JSON files
- ✅ **Theme Support** - Optional per-profile theming
- ✅ **Consistent UX** - All profiles guaranteed to have same layout

### Tasks

#### 6.1 Create Dynamic Profile Component
- **Priority:** 🟡 Medium
- **Effort:** 1.5 hours
- **Description:** Create single reusable Profile.tsx component that loads data based on URL parameter
- **Success criteria:**
  - Profile.tsx created with URL parameter support
  - Dynamically loads correct JSON file
  - Works for both tra-ngo and amy-ngo
- **Files affected:**
  - Create: `src/pages/Profile.tsx`
  - Modify: `src/App.tsx` (update routes)
  - Delete: `src/pages/TraNgo.tsx`
  - Delete: `src/pages/AmyNgo.tsx`
- **Steps:**

  1. Create `src/pages/Profile.tsx`:
     ```typescript
     import React, { useEffect, useState } from 'react';
     import { useParams, Link } from 'react-router-dom';
     import { TraNgoData } from '../types';
     import Timeline from '../components/Timeline';
     import GithubIcon from '../components/icons/GithubIcon';
     import LinkedinIcon from '../components/icons/LinkedinIcon';
     import GoogleScholarIcon from '../components/icons/GoogleScholarIcon';

     const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({
       id,
       title,
       children,
     }) => (
       <section id={id} className="py-12 md:py-16">
         <div className="text-center mb-10">
           <h2 className="text-3xl font-bold tracking-tight uppercase text-gray-700">{title}</h2>
           <div className="w-16 h-1 bg-teal-500 mx-auto mt-2"></div>
         </div>
         {children}
       </section>
     );

     const Profile: React.FC = () => {
       const { profileId } = useParams<{ profileId: string }>();
       const [pageData, setPageData] = useState<TraNgoData | null>(null);
       const [error, setError] = useState<string | null>(null);

       useEffect(() => {
         // Convert URL param to data file name
         // e.g., "tra-ngo" -> "traNgoData.json"
         const dataFileName = profileId
           ?.split('-')
           .map((word, index) =>
             index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
           )
           .join('') + 'Data.json';

         fetch(`/data/${dataFileName}`)
           .then((response) => {
             if (!response.ok) {
               throw new Error(`Network response was not ok: ${response.statusText}`);
             }
             return response.json();
           })
           .then((data: TraNgoData) => {
             setPageData(data);
           })
           .catch((err) => {
             console.error('Failed to load page data:', err);
             setError('Failed to load page data. Please try refreshing the page.');
           });
       }, [profileId]);

       if (error) {
         return <div className="text-center p-10 text-red-500">{error}</div>;
       }

       if (!pageData) {
         return <div className="text-center p-10">Loading...</div>;
       }

       // ... rest of component (same as TraNgo.tsx)
     };

     export default Profile;
     ```

  2. Update `src/App.tsx` routes:
     ```typescript
     import Profile from './pages/Profile';

     // Replace individual routes:
     // <Route path="/profiles/tra-ngo" element={<TraNgo />} />
     // <Route path="/profiles/amy-ngo" element={<AmyNgo />} />

     // With dynamic route:
     <Route path="/profiles/:profileId" element={<Profile />} />
     ```

  3. Delete old files:
     ```bash
     rm src/pages/TraNgo.tsx
     rm src/pages/AmyNgo.tsx
     ```

  4. Test both profiles:
     - Visit `/profiles/tra-ngo`
     - Visit `/profiles/amy-ngo`
     - Verify both load correctly

- **Testing checklist:**
  - [ ] tra-ngo profile loads correctly
  - [ ] amy-ngo profile loads correctly
  - [ ] Navigation between profiles works
  - [ ] All sections render properly
  - [ ] Social links work
  - [ ] Timeline displays correctly

#### 6.2 Add Theme Support (Optional)
- **Priority:** 🟢 Low
- **Effort:** 1 hour
- **Description:** Add optional per-profile theming support
- **Success criteria:**
  - Theme configuration in JSON files
  - Theme colors applied dynamically
  - Smooth theme transitions
- **Files affected:**
  - `src/pages/Profile.tsx` (add theme logic)
  - `src/data/traNgoData.json` (add theme field)
  - `src/data/amyNgoData.json` (add theme field)
- **Steps:**

  1. Add theme field to JSON files:
     ```json
     {
       "theme": {
         "primary": "teal",
         "accent": "teal"
       },
       "aboutMe": { ... }
     }
     ```

  2. Create theme configuration:
     ```typescript
     const themes = {
       teal: {
         primary: 'bg-teal-500 hover:bg-teal-600',
         accent: 'text-teal-600',
         border: 'border-teal-500',
       },
       blue: {
         primary: 'bg-blue-500 hover:bg-blue-600',
         accent: 'text-blue-600',
         border: 'border-blue-500',
       },
       purple: {
         primary: 'bg-purple-500 hover:bg-purple-600',
         accent: 'text-purple-600',
         border: 'border-purple-500',
       },
     };
     ```

  3. Apply theme dynamically in Profile.tsx:
     ```typescript
     const theme = themes[pageData.theme?.primary || 'teal'];

     // Use theme classes:
     <button className={`${theme.primary} text-white px-6 py-3`}>
       Send Message
     </button>
     ```

  4. Test different themes by changing JSON files

### Deliverables

- [ ] Single Profile.tsx component created
- [ ] Dynamic route implemented
- [ ] Old duplicate files deleted
- [ ] Both profiles working correctly
- [ ] Optional: Theme support added
- [ ] Tests updated for new architecture

### Migration Notes

**Breaking Changes:**
- Direct imports of TraNgo/AmyNgo components will break
- Tests that import these components need updating

**Rollback Plan:**
If issues arise, can temporarily restore old files from git:
```bash
git checkout HEAD -- src/pages/TraNgo.tsx src/pages/AmyNgo.tsx
```

### Future Enhancements

After completing this refactor, consider:
- **Profile metadata**: Add name, title, photo URL to JSON
- **Custom sections**: Allow profiles to show/hide sections via config
- **Section ordering**: Let profiles reorder sections via JSON
- **Multiple layouts**: Support different layout templates (academic, corporate, creative)

### Example: Adding a New Profile

**Before refactor (current):**
1. Copy TraNgo.tsx to NewPerson.tsx (200 lines)
2. Update all data fetching
3. Update route in App.tsx
4. Create newPersonData.json

**After refactor:**
1. Create `newPersonData.json` in `public/data/`
2. Done! Route automatically works at `/profiles/new-person`

---

## Conclusion

This 5-phase plan transforms your personal website from prototype to production-ready application. **Phase 1 and 2 are critical** - they fix blocking issues and establish quality standards. **Phase 3-5 are important but can be deferred** if time constraints arise.

**Recommended approach:**
1. Complete Phase 1 entirely before moving on (critical infrastructure)
2. Complete Phase 2 to establish quality baseline
3. Implement Phase 3-5 iteratively, deploying improvements as they're completed

**Success depends on:**
- Following phases in order (dependencies matter)
- Testing thoroughly after each task
- Committing frequently with descriptive messages
- Not skipping "boring" tasks like documentation and testing

After completion, you'll have a fast, tested, maintainable website with automated deployment - ready for real-world use and easy to extend with new features.
