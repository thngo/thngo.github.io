# Personal Website - Academic Portfolio

A modern, performant personal website showcasing academic research, publications, and professional profiles. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🚀 **High Performance**: Code-split routes, optimized bundle sizes (<82KB gzipped)
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- ♿ **Accessible**: Semantic HTML and ARIA labels
- 🎨 **Modern UI**: Clean, professional design with animated loading states
- 📧 **Functional Contact Form**: Integrated with Web3Forms
- 🔍 **SEO Optimized**: Meta tags, sitemap, robots.txt, Open Graph tags
- ✅ **Type Safe**: Full TypeScript coverage
- 🧪 **Well Tested**: Unit and integration tests with Vitest
- 🎯 **Code Quality**: ESLint, Prettier, pre-commit hooks

## Tech Stack

### Core
- **React 19** - UI library
- **TypeScript 5.8** - Type safety
- **React Router 7** - Client-side routing
- **Vite 6** - Build tool and dev server

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Custom Fonts** - Google Fonts (Montserrat, Lora)

### Code Quality
- **ESLint** - Linting with React/TypeScript rules
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit checks

### Testing
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing
- **@vitest/ui** - Interactive test UI
- **Coverage** - V8 code coverage

## Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git** (for version control)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd thngo.github.io
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

**Contact Form Setup (Web3Forms):**
- Sign up at [Web3Forms](https://web3forms.com)
- Create a new contact form and get your Access Key
- Create `.env.local`:
  ```env
  VITE_WEB3FORMS_KEY=your_web3forms_access_key
  ```
- Update `src/pages/Contact.tsx` with your key

## Development

### Start development server

```bash
npm run dev
```

Opens at `http://localhost:5173` with hot module replacement (HMR).

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors automatically |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Run TypeScript type checking |
| `npm test` | Run tests in watch mode |
| `npm run test:ui` | Open interactive test UI |
| `npm run test:coverage` | Generate test coverage report |

## Project Structure

```
TraProject1_basicWebsite/
├── public/                  # Static assets
│   ├── sitemap.xml         # SEO sitemap
│   └── robots.txt          # Search engine rules
├── src/
│   ├── components/         # React components
│   │   ├── common/         # Shared components
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── LoadingSkeleton.tsx
│   │   ├── Dropdown.tsx    # Navigation dropdown
│   │   ├── Header.tsx      # Site header
│   │   └── Timeline.tsx    # Timeline visualization
│   ├── data/               # JSON data files
│   │   ├── aboutData.json
│   │   ├── amyNgoData.json
│   │   └── traNgoData.json
│   ├── pages/              # Route components (lazy-loaded)
│   │   ├── About.tsx
│   │   ├── AmyNgo.tsx
│   │   ├── Contact.tsx
│   │   ├── NotFound.tsx
│   │   ├── SmiFsm.tsx
│   │   └── TraNgo.tsx
│   ├── styles/
│   │   └── index.css       # Global styles & Tailwind imports
│   ├── App.tsx             # Main app component with routing
│   ├── index.tsx           # Application entry point
│   └── setupTests.ts       # Test configuration
├── .github/                # GitHub Actions workflows (CI/CD)
├── index.html              # HTML template with SEO meta tags
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.js        # ESLint configuration
├── .prettierrc             # Prettier configuration
└── package.json            # Dependencies and scripts
```

## Testing

### Run tests

```bash
# Watch mode (default)
npm test

# Interactive UI
npm run test:ui

# Coverage report
npm run test:coverage
```

### Test Coverage

Current coverage: **>70%** for components

Coverage report available at: `coverage/index.html`

### Writing Tests

Tests use Vitest + React Testing Library:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <MyComponent />
      </BrowserRouter>
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## Building for Production

### Create production build

```bash
npm run build
```

Outputs to `dist/` directory:
- Minified and optimized assets
- Code-split route chunks
- Gzipped: ~82KB total initial load

### Preview production build

```bash
npm run preview
```

Opens at `http://localhost:4173`

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].css    (~26KB, 5KB gzipped)
│   ├── index-[hash].js     (~232KB, 76KB gzipped)
│   └── [route]-[hash].js   (0.3-7KB each, lazy-loaded)
├── index.html
├── sitemap.xml
└── robots.txt
```

## Deployment

### GitHub Pages (Recommended)

Everything is pre-configured for automatic deployment via GitHub Actions!

**One-time setup:**
1. Go to your GitHub repo → **Settings** → **Pages**
2. Under "Build and deployment" → Source: **GitHub Actions**
3. Save

**Deploy:**
```bash
# Just push to main branch
git add .
git commit -m "Your changes"
git push origin main

# GitHub Actions automatically builds and deploys!
# Site will be live in ~2-3 minutes
```

**Your site URL:**
```
https://[username].github.io/thngo.github.io
```

**Manual deployment (if needed):**
```bash
npm run deploy
```

### Environment Variables

Create `.env.local` (not committed to git):
```env
# Web3Forms Contact Form
VITE_WEB3FORMS_KEY=your_web3forms_access_key
```

### Configuration

- `.github/workflows/github-pages.yml` - Automatic CI/CD pipeline
- `vite.config.ts` - Build configuration with GitHub Pages base path

### Custom Domain (Optional)

Want a custom domain like `www.yourname.com`?

1. Update `vite.config.ts`:
   ```typescript
   base: '/', // Change from '/thngo.github.io/'
   ```

2. Add `CNAME` file to `public/`:
   ```
   www.yourname.com
   ```

3. Update DNS settings at your domain registrar

4. In GitHub: Settings → Pages → Add custom domain

### Before First Deployment

**Checklist:**
- [ ] Set `VITE_WEB3FORMS_KEY` environment variable (sign up at [Web3Forms](https://web3forms.com))
- [ ] Update domain in meta tags (index.html)
- [ ] Update sitemap.xml with your domain
- [ ] Update robots.txt with your domain
- [ ] Add favicon.ico and og-image.jpg to public/
- [ ] Run tests: `npm test -- --run`
- [ ] Build locally: `npm run build`
- [ ] Preview: `npm run preview`

## Code Quality

### Linting

ESLint with React, TypeScript, and accessibility rules:

```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

### Formatting

Prettier ensures consistent code style:

```bash
npm run format          # Format all files
npm run format:check    # Check formatting
```

### Pre-commit Hooks

Husky + lint-staged automatically:
- Lints staged files
- Formats staged files
- Prevents bad code from being committed

### Type Checking

TypeScript strict mode enabled:

```bash
npm run type-check
```

## Performance

### Current Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| **Initial JS** (gzipped) | <150KB | 76KB | ✅ 49% under |
| **Initial CSS** (gzipped) | <50KB | 5KB | ✅ 90% under |
| **Total Initial Load** | <200KB | 81KB | ✅ 59% under |
| **First Contentful Paint** | <1.5s | TBD* | ⏳ |
| **Largest Contentful Paint** | <2.5s | TBD* | ⏳ |
| **Lighthouse Score** | >90 | TBD* | ⏳ |

*Run Lighthouse audit locally: `npm run build && npm run preview` then use Chrome DevTools

### Code-Split Route Chunks

Each route is lazy-loaded as a separate chunk:

| Route | Size | Gzipped |
|-------|------|---------|
| TraNgo | 7.27 KB | 2.44 KB |
| Contact | 3.57 KB | 1.40 KB |
| NotFound | 0.66 KB | 0.39 KB |
| About | 0.55 KB | 0.38 KB |
| AmyNgo | 0.31 KB | 0.23 KB |
| SmiFsm | 0.31 KB | 0.24 KB |

Users only download route code when they navigate to that page.

### Optimizations Applied

- ✅ Code splitting with React.lazy()
- ✅ Route-based chunking
- ✅ Tree shaking (Vite)
- ✅ Minification & gzip compression
- ✅ DNS prefetch for fonts
- ✅ Font display: swap (prevents invisible text)
- ✅ Optimized Tailwind CSS (Just-in-Time compiler)

### Run Performance Audit

```bash
# Build and preview production build
npm run build
npm run preview

# In Chrome: F12 → Lighthouse → Run audit
# Or use Lighthouse CLI
npx lighthouse http://localhost:4173
```

## Browser Support

Modern browsers only:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

No IE11 support (uses ES2022 features).

## Accessibility

- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus visible states
- Color contrast compliance

Tested with:
- `eslint-plugin-jsx-a11y`
- Keyboard navigation
- Screen reader compatibility

## Contributing

### Development Workflow

1. Create a feature branch
   ```bash
   git checkout -b feature/my-feature
   ```

2. Make changes and commit
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```
   Pre-commit hooks will run automatically.

3. Push and create pull request
   ```bash
   git push origin feature/my-feature
   ```

### Commit Message Convention

Use conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### Pull Request Process

1. Ensure all tests pass: `npm test`
2. Check linting: `npm run lint`
3. Verify type checking: `npm run type-check`
4. Update documentation if needed
5. Request review

## Troubleshooting

### Build Errors

**Issue**: `Module not found` errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue**: TypeScript errors
```bash
# Check for type errors
npm run type-check
```

### Development Server Issues

**Issue**: Port already in use
```bash
# Vite will automatically try next available port
# Or specify port:
npm run dev -- --port 3000
```

**Issue**: Hot reload not working
- Check firewall settings
- Try clearing browser cache
- Restart dev server

### Test Failures

**Issue**: Tests failing after dependency update
```bash
# Clear Vitest cache
rm -rf node_modules/.vitest
npm test
```

## License

This project is private and not licensed for public use.

## Contact

For questions or issues:
- Open an issue in the repository
- Use the contact form on the deployed site

---

**Built with ❤️ using React + TypeScript + Tailwind CSS**
