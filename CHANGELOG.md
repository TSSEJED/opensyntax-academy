# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] — v3.0

_This section collects work-in-progress changes for the upcoming v3.0 milestone._

### Added
- **Course Content Overhaul**: Massively expanded the Cybersecurity and Blockchain courses with comprehensive content, including XSS deep-dives, Zero Trust frameworks, ZK-Rollups, and MEV. Added rich HTML and real-world code snippets.
- **Page-Level SEO Metadata**: Exported contextual `metadata` tags (titles, descriptions, keywords) exclusively for individual dynamic and static course paths aiming to target high-intent SERP queries (e.g., "Learn Solidity Free").
- **Global Search Palette**: Implemented a blazing-fast command palette (`Ctrl+K` or `Cmd+K`) to search across all 50+ lessons. Features query highlighting, keyboard navigation, and instant redirection.
- **Student Progress Dashboard**: New `/dashboard` page that aggregates `localStorage` completion data from all 11 course paths into a unified visual overview with XP tracking.
- **Unified Client interactions**: Moved global event listeners and persistent UI components (Search Palette) into a `ClientWrapper` to maintain high-performance server-side metadata defaults.
- **Navbar Integration**: Added permanent "Dashboard" and "Search" entry points to the primary navigation for improved platform discoverability.

### Planned
- User authentication & persistent accounts (Cloud sync)
- Course completion certificates (Generated PDF/SVG)
- Community lesson submissions & review workflow
- Comment threads on individual lessons

---

### ⚠️ Known Bugs
- **[DSB-001] Dashboard Progress Desync**: Dashboard completion counts may appear as 0% even after completing lessons. This is a synchronization issue that will be resolved in **v3.1.0** by standardizing storage keys.
  - *Workaround*: Real progress is always visible is visible on the individual course pages.

---

## [2.0.0] — 2026-03-29

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
- **Changelog Page**: Added `/changelog` displaying the full platform version history.
- **Rich Social Presence**: Added `openGraph` and `twitter` card metadata for proper link previews on Discord, X, and LinkedIn.
- **SEO Sitemap** (`/sitemap.xml`): Dynamically generated, covering all 11 course routes and static pages.
- **robots.txt** (`/robots.txt`): Configured for all major crawlers and AI bots via `app/robots.ts`.
- **Schema.org JSON-LD**: `OrganizationJsonLd`, `CourseJsonLd`, and `WebsiteJsonLd` for rich search result eligibility.
- **Full Metadata Overhaul**: `metadataBase`, `title.template`, `keywords`, `authors`, `alternates.canonical`, and Googlebot directives.
- **Massive Content Scale**: Over 50 immersive HTML lessons across 11 course paths.
- **Deno Lint Compliance**: Replaced all `window` references with `globalThis` and removed unused imports.

### Changed
- **Forced Light Mode**: Permanently replaced dark mode with a vibrant, high-contrast OKLCH light mode palette.
- **Terms of Service**: Updated to reflect community-aggregated metadata and ratings.
- **Privacy Policy**: Clarified that all interactive features are fully client-side and do not track user input.
- **Performance**: 3D hero geometry reduced from 12 to 4 segments; DPR clamped to reduce GPU load on mobile.

### Removed
- Removed legacy `next-themes` dark mode variant implementations.
- Removed generic dummy placeholders in favor of fully flushed syllabus paths.

---

## [1.0.0] — 2026-01-01

### Added
- Initial platform launch with Discord Development and Full-Stack Web Engineering paths.
- Sidebar-driven lesson player with basic progress tracking.
- Community Discord integration.
- Apache 2.0 license.
