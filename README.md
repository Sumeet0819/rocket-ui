# rocket-ui

Rocket UI is a Vite + React project designed to run as a frontend application.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

4. Preview the production build locally:

   ```bash
   npm run preview
   ```

## Vercel Deployment Fix

This repository previously used Vite library mode in `vite.config.ts`, which produced JavaScript library artifacts instead of a static app build. That caused Vercel to deploy without an `index.html` entrypoint and resulted in a `404: NOT_FOUND` error.

The fix is to use a standard Vite app configuration so `npm run build` generates a production-ready site in `dist`.

## Vercel Notes

- Build command: `npm run build`
- Output directory: `dist`

This repository includes `vercel.json` for single-page app routing. All unmatched URLs are rewritten to `index.html` so client-side navigation works after deployment.
