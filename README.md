# Taskop Global Consulting — website

Marketing site for [TASKOP Global Consulting Inc.](https://taskopglobalconsulting.com), rebuilt in Next.js after the original WordPress site was disabled. Content was restored from the Internet Archive capture of July 2024.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript), fully static output
- **Tailwind CSS v4** with design tokens in `src/app/globals.css`
- **motion** for scroll reveals and micro-interactions (honours `prefers-reduced-motion`)
- **Netlify** hosting, **Netlify Forms** for the contact and newsletter forms

## Editing content

All copy lives in one file: `src/content/site.ts` (company details, navigation, sectors and their service lists, team, FAQs, calls to action). Edit it and redeploy.

- **Team photos**: drop a file into `public/images/team/` and add `image: "/images/team/<name>.jpg"` to the member in `site.ts`. Until then the team page shows initials avatars.
- **Images**: `public/images/`. Hero, sector and CTA imagery were generated for the rebuild; replace them with real photography whenever available.
- **Forms**: field definitions for Netlify's build-time detection live in `public/__forms.html`. If you add a field to the React form, add it there too.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # production build (also type-checks)
```

## Deploy

The site is connected to Netlify (`netlify.toml`). Every push to the production branch triggers a build. Form submissions arrive under **Forms** in the Netlify dashboard; enable email notifications there to have them forwarded to `hello@taskopglobalconsulting.com`.
