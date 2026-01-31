# GitHub Pages Deployment Guide

## ✅ Setup Complete!

Your project is now configured for GitHub Pages deployment. Here's what was set up:

### Files Configured
- ✅ `package.json` - Added deploy scripts
- ✅ `vite.config.ts` - Added base path for GitHub Pages
- ✅ `.github/workflows/github-pages.yml` - Automatic deployment workflow

---

## 🚀 How to Deploy

### Option 1: Manual Deployment (One Command!)

```bash
npm run deploy
```

This will:
1. Build your production bundle
2. Create/update the `gh-pages` branch
3. Push to GitHub
4. Your site will be live in ~1-2 minutes!

### Option 2: Automatic Deployment (Recommended)

Every time you push to `main` or `master` branch, GitHub Actions will automatically:
1. Run tests
2. Build your site
3. Deploy to GitHub Pages

---

## ⚙️ Enable GitHub Pages (One-Time Setup)

**You need to do this ONCE in your GitHub repository:**

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll to **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - (Don't select "Deploy from a branch" - we're using Actions)
5. Save

That's it! 🎉

---

## 🌐 Your Website URL

After deployment, your site will be available at:

```
https://[your-username].github.io/TraProject1_basicWebsite/
```

Example: `https://johndoe.github.io/TraProject1_basicWebsite/`

---

## 📝 First Deployment Steps

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```
   (Or `master` if that's your branch name)

3. **Watch the deployment:**
   - Go to GitHub → Your repo → "Actions" tab
   - You'll see the deployment workflow running
   - Wait ~2-3 minutes for completion

4. **Enable GitHub Pages** (see section above)

5. **Visit your site!** 🎉

---

## 🔄 Making Updates

After initial setup, to update your site:

```bash
# Make your changes
# Then commit and push
git add .
git commit -m "Update content"
git push

# GitHub Actions will automatically deploy!
# Or deploy manually:
npm run deploy
```

---

## 🔧 Custom Domain (Optional)

Want a custom domain like `www.yourname.com`?

1. Buy a domain (Namecheap, Google Domains, etc.)
2. Add `CNAME` file to `public/` folder:
   ```
   www.yourname.com
   ```
3. Update `vite.config.ts`:
   ```typescript
   base: '/', // Change from '/TraProject1_basicWebsite/'
   ```
4. Configure DNS settings at your domain registrar:
   - Add CNAME record pointing to `[username].github.io`
5. In GitHub repo settings → Pages → Add custom domain

---

## ⚠️ Important Notes

### Base Path
The site is configured with base path `/TraProject1_basicWebsite/`

**If you rename your repository**, update `vite.config.ts`:
```typescript
base: '/new-repo-name/',
```

**If using custom domain**, change to:
```typescript
base: '/',
```

### Before First Deployment
Make sure to update these placeholders:
- [ ] `src/pages/Contact.tsx` - Replace `YOUR_FORM_ID` with Formspree ID
- [ ] `index.html` - Update URLs from `https://yourwebsite.com/`
- [ ] `public/sitemap.xml` - Update all URLs
- [ ] `public/robots.txt` - Update sitemap URL

---

## 🐛 Troubleshooting

### "404 Not Found" after deployment
- Make sure GitHub Pages is enabled (Settings → Pages)
- Source must be "GitHub Actions", not "Deploy from a branch"
- Wait 2-3 minutes after first deployment

### Styles not loading
- Check that `base` in `vite.config.ts` matches your repo name
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### Workflow fails
- Check the "Actions" tab for error details
- Ensure all tests pass locally: `npm test -- --run`
- Ensure build succeeds locally: `npm run build`

---

## 📊 Monitoring Deployments

View deployment status:
- GitHub repo → **Actions** tab
- See build logs, test results, deployment status
- Get notified on failures

---

## 🎯 Quick Command Reference

```bash
# Deploy manually
npm run deploy

# Build and test locally before deploying
npm run build
npm run preview

# Run all quality checks
npm run lint
npm run type-check
npm test -- --run

# Development
npm run dev
```

---

## ✨ Next Steps

1. ✅ Push code to GitHub
2. ✅ Enable GitHub Pages in repo settings
3. ✅ Wait for first deployment
4. ✅ Visit your site!
5. 🎨 Add favicon and og-image for social sharing
6. 📧 Set up Formspree for contact form
7. 🔗 Share your portfolio!

---

**Need help?** Check the [README.md](./README.md) for full documentation.

Happy deploying! 🚀
