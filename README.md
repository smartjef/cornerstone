# The Cornerstone Foundation Website (Frontend Blueprint)

A modern, accessible, public-facing website structure using **Next.js App Router**, **Tailwind CSS**, and **shadcn/ui-style components**, designed for future integration with **Payload CMS**.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui component architecture (local `ui/` primitives)
- IBM Plex Sans typography
- Light/Dark intentional theming

## Folder Structure

```text
src/
  app/
    about/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    contact/page.tsx
    donate/page.tsx
    programs/page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    layout/
      footer.tsx
      header.tsx
      theme-provider.tsx
      theme-toggle.tsx
    ui/
      badge.tsx
      button.tsx
      card.tsx
      input.tsx
      separator.tsx
      textarea.tsx
  lib/
    content.ts
    utils.ts
```

## Layout Hierarchy
1. `app/layout.tsx`
   - Global font injection (IBM Plex Sans)
   - Theme provider with class-based dark mode
   - Persistent `Header`
   - Page content slot (`children`)
   - Persistent `Footer`
2. Page-level sections are composed from reusable cards, buttons, and form controls.

## Component Structure (shadcn/ui style)
- **Primitive UI Components** (`components/ui`)
  - `Button`, `Card`, `Badge`, `Input`, `Textarea`, `Separator`
- **Composed Layout Components** (`components/layout`)
  - `Header` with nav and theme toggle
  - `Footer` with contact and governance links
- **Content Source Layer** (`lib/content.ts`)
  - Mission pillars
  - Trustees
  - Updates/activities
  - Donation tiers

## Required Pages Covered
- Homepage: hero, CTA, mission pillars, impact preview, latest updates, donation CTA, footer.
- About: founder, trustees, governance ethos, vision/mission/values.
- Programs: card-based focus areas.
- Blog/Activities: article grid and individual article layout.
- Donate: trust indicators, tiers, usage explanation, payment placeholders.
- Contact: contact form layout, info panel, map placeholder.

## Design System Notes
- **Primary color**: Navy/Royal Blue via `--primary` tokens.
- **Typography**: IBM Plex Sans (`next/font/google`) with clear weight hierarchy.
- **Spacing**: containerized layout with generous vertical rhythm (`py-12` to `py-20`, `space-y-*`).
- **Visual style**: minimal, institutional, low decoration; no heavy gradients.
- **Accessibility**:
  - high contrast foreground/background in both themes
  - visible focus rings (`ring` tokens)
  - semantic heading flow
- **Dark mode**:
  - intentionally tuned tokens in `globals.css` (not inverted light values)

## Suggested Content Blocks (for editorial growth)
- Homepage:
  - annual metrics strip (people served, schools supported, clinics held)
  - annual report download callout
- About:
  - governance charter summary
  - trustee profiles with headshots
- Programs:
  - eligibility criteria block
  - region-specific impact maps
- Blog:
  - categories, tags, related posts, featured image
- Donate:
  - recurring giving options
  - downloadable accountability summary
- Contact:
  - department routing (partnerships, press, support)

## Future Payload CMS Connection Points
- `lib/content.ts` currently contains static mock content.
- Replace static arrays with Payload queries for:
  - `posts` collection (`/blog`, `/blog/[slug]`)
  - `programs` collection (`/programs`)
  - `siteSettings` global (hero text, contact info, footer links)
  - `donationTiers` collection (`/donate`)
- Recommended approach:
  1. Add a `cms/` service layer with typed fetchers.
  2. Use Server Components in `app/*/page.tsx` for SSR content.
  3. Add ISR/revalidation for frequently updated content pages.

## Notes
- No backend/API/database logic included in this phase, per requirement.
