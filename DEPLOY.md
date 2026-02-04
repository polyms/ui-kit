# Vercel Deploy Setup

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/polyms/core-ui)

## Manual Setup

### 1. Install Vercel CLI (Optional)

```bash
pnpm add -g vercel
```

### 2. Deploy to Vercel

**Option A: Via Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel auto-detects `vercel.json` config
5. Click "Deploy"

**Option B: Via CLI**

```bash
# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Deploy to production
vercel --prod
```

### 3. Configuration

The project uses `vercel.json` with:

```json
{
  "buildCommand": "pnpm nx build docs",
  "outputDirectory": "dist/docs",
  "devCommand": "pnpm nx serve docs",
  "installCommand": "pnpm install"
}
```

### 4. Environment Variables (if needed)

No environment variables required for static docs deployment.

### 5. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## Build Locally

Test production build before deploying:

```bash
# Build docs
pnpm nx build docs

# Preview build (optional)
cd dist/docs
npx serve
```

## Deployment Triggers

- **Automatic**: Push to `main` branch
- **Manual**: Use Vercel CLI or Dashboard

## Troubleshooting

**Build fails:**
- Check Node.js version (use `.nvmrc` if provided)
- Verify all dependencies in `package.json`
- Run `pnpm install` locally first

**404 on routes:**
- Ensure SPA routing is configured (handled by Vite)
- Check `index.html` exists in output directory

## Nx Monorepo Notes

Since this is an Nx monorepo:
- Vercel detects the root `package.json`
- Build command uses `nx` to build only `docs` project
- Output directory points to `dist/docs` (not root)

---

**Deployed URL:** Your docs will be live at `https://your-project.vercel.app`
