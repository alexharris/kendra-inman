# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm start        # Run production server
npm run lint     # Run Next.js linter
```

## Tech Stack

- **Framework**: Next.js 15.4 (App Router), React 19
- **CMS**: Sanity 4.3 (project ID: `9nmhdhuk`, dataset: `production`)
- **Styling**: Tailwind CSS 4, SCSS modules
- **Fonts**: Adobe TypeKit (Futura PT), custom fonts (Apris, Founders Grotesk)
- **Video/Images**: Custom video caching via Browser Cache API, Sanity CDN

## Architecture Overview

### Directory Structure

```
/src/
├── app/                    # Next.js App Router
│   ├── components/         # React components (CachedVideo, FullscreenVideoPlayer, Menu, Slideshow, etc.)
│   ├── work/
│   │   ├── [[...slug]]/    # Work index + category pages (server component)
│   │   └── project/[slug]/ # Individual project pages (static generation)
│   ├── about/              # About page (client component)
│   ├── studio/             # Sanity Studio mount point
│   ├── page.js             # Homepage (client component with animations)
│   └── globals.css         # Tailwind + CSS custom properties for brand colors
├── sanity/
│   ├── schemaTypes/        # Sanity document schemas
│   ├── lib/client.js       # Sanity client instance
│   └── structure.js        # Sanity Studio structure config
├── utils/
│   ├── sanity-queries.js   # Centralized GROQ queries
│   ├── pageColors.js       # Color management utilities
│   └── videoCache.js       # Browser Cache API helpers
└── hooks/                  # Custom React hooks
```

### Key Patterns

**Data Fetching**: All Sanity queries are centralized in `/src/utils/sanity-queries.js`. Server-side caching uses Next.js `revalidate` (1 hour default, 24 hours for homepage).

**Color System**: Pages use `setPageColors()` from `/src/utils/pageColors.js` to dynamically apply Tailwind classes to `document.body`, `#site-header`, and `#footer`. Colors are defined as CSS custom properties in `globals.css`.

**Video Caching**: `CachedVideo` component wraps native `<video>` and uses Browser Cache API to prevent re-downloading. Debug utilities available at `window.videoCacheUtils`.

**Client vs Server Components**: Homepage and About are client components (`'use client'`) for animations/interactivity. Work pages are server components with `generateStaticParams()` for static generation.

### Sanity Content Model

- **project**: Portfolio items with gallery (mixed images/videos), category/color references
- **homepage**: Singleton with heroSlideshow and sections referencing categories
- **about**: Singleton with portable text content
- **siteCategories**, **siteColors**, **siteExpertise**: Configuration documents
- **global**: Site settings (social links, email)

Sanity Studio is accessible at `/studio`.

### Path Alias

`@/*` maps to `./src/*` (configured in jsconfig.json)

## Git

Do not include any Claude or Anthropic attribution (e.g. `Co-Authored-By`) in commit messages.
