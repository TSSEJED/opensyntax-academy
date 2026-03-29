# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Course Metadata**: Added `instructor`, `rating`, `reviewCount`, and `prerequisites` to all courses.
- **Premium Catalog Redesign**: The `/courses` catalog has been completely transformed into a "Bento-style" rich grid layout.
- **Category Filtering**: Users can now filter courses by category (`Web`, `DevOps`, `AI & Data`, etc.) directly on the catalog page.
- **Framer Motion Animations**: Introduced high-end transition animations, stagger effects, and hover states using `framer-motion` across the catalog.
- **3D Hero Integration**: Replaced the static hero section with an immersive, time-reactive 3D scene driven by `@react-three/fiber` and `@react-three/drei`.
- **Lesson Player Meta View**: The `LessonPlayer` component now displays the newly populated course metadata directly within the sidebar header.
- **Interactive Knowledge Checks**: Lessons now feature optional end-of-lesson quizzes with instant feedback, correct/incorrect answer highlighting, and explanations. Shipped to Web, Discord, and Python tracks.
- **Framer Motion Lesson Transitions**: Clicking a lesson now triggers a smooth slide-in/out animation via `AnimatePresence`, eliminating jarring content snaps.
- **Persistent Progress via localStorage**: Lesson completion state now persists across page refreshes and browser restarts, fully client-side with zero tracking.
- **Contributing Page**: Added `/contributing` as a fully-designed page mirroring `CONTRIBUTING.md` with formatted code blocks, commit type tables, and a PR checklist.
- **Changelog Page**: Added `/changelog` as a styled, bento-card formatted page displaying platform version history.
- **Rich Social Presence**: Added `openGraph` and `twitter` card metadata to `layout.tsx` so link previews render properly on Discord, X, and LinkedIn.
- **SEO Sitemap** (`/sitemap.xml`): Dynamically generated via Next.js `app/sitemap.ts`, covering all 11 course routes, static pages, and legal pages with correct priorities and change frequencies.
- **robots.txt** (`/robots.txt`): Configured for Google, Bing, DuckDuckGo, and AI crawlers (GPTBot, OAI-SearchBot, Claude-Web) via `app/robots.ts`.
- **Schema.org JSON-LD**: Added `components/SEO/JsonLd.tsx` exporting `OrganizationJsonLd`, `CourseJsonLd`, and `WebsiteJsonLd` for rich search results eligibility.
- **Full Metadata Overhaul**: `layout.tsx` now includes `metadataBase`, `title.template`, `keywords`, `authors`, `alternates.canonical`, and explicit `robots` directives for Googlebot.

### Changed
- **Forced Light Mode**: Permanently replaced dark mode themes with a vibrant, high-contrast OKLCH light mode color palette for maximum readability and a premium feel.
- **Terms of Service**: Updated to reflect community-aggregated course metadata and ratings.
- **Privacy Policy**: Updated to explicitly state that all interactive features (3D assets, framer-motion animations) are fully client-sided and do not track user input.

### Removed
- Removed legacy Next-Themes dark mode variant implementations across the UI components.
