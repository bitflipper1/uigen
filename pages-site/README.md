# HotD companion — static site

A standalone static build of the **House of the Dragon** second-screen companion
(the `/hotd` route of the main UIGen app), published to GitHub Pages.

It reuses the exact dashboard source from `../src` via a Vite `@` → `../src`
alias, so there is no code duplication — the app route and the static site
render from the same components and data.

## Local development

```bash
cd pages-site
npm install
npm run dev      # http://localhost:5173/uigen/
npm run build    # outputs static files to dist/
npm run preview  # serves the built dist/ at the /uigen/ base path
```

## Deployment

`../.github/workflows/deploy-pages.yml` builds this project and deploys `dist/`
to GitHub Pages on every push to `main` that touches the dashboard.

> One-time setup: a repo admin must enable Pages once —
> **Settings → Pages → Build and deployment → Source: "GitHub Actions"**.

Once live, the site is served at `https://<owner>.github.io/uigen/`
(deep links such as `?ep=14` select a spoiler-safe episode state).
