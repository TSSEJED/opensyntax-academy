# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [3.0.0] — 2026-03-31

### Added
- **Certificates System**: New `/certificates` page for unlocking and generating digital, beautifully crafted, cryptographic-style completion certificates using SVG for all 13 courses. Features real-time local state syncing and a dashboard integration to "View Awards".
- **Dashboard Synchronization**: Upgraded `/dashboard` so all newest courses (System Design, Rust) seamlessly fetch user completion stats from active browser localStorage.
- **Rust & Systems Programming Course**: Added a comprehensive Rust course covering memory safety, the ownership model, fearless concurrency, async programming with Tokio, and compiling high-performance WebAssembly (WASM) modules.
- **System Design Course**: Added a highly requested, brand new 3-module System Design course. Covers Load Balancing, Database Sharding, Caching Strategies, Message Queues (Kafka), Rate Limiting algorithms, and real-world system design case studies (URL Shortener, Notification System). 
- **Testimonials Section**: New social proof section on the homepage with developer testimonials from different personas (Full-Stack, ML, DevOps, Security, Blockchain engineers), Framer Motion scroll animations, and accent-colored avatar cards.
- **Reading Progress Bar**: Added a thin accent-colored gradient progress bar at the top of the lesson player that fills as users scroll through lesson content, improving UX for long lessons.
- **Scroll-to-Top Button**: Global floating button appears after 400px of scroll on any page, with smooth Framer Motion animations.
- **Enhanced Interactive Terminal**: Added `stats`, `about`, `latest`, and `version` commands. Updated course list to show all 13 paths. Version bumped to v3.0.0.
- **Beautiful 404 Page**: Designed a modern, branded 404 Not Found page with a massive glowing gradient background, animated elements, and quick links back to home and popular courses, preventing users from getting lost on missing pages.
- **System Status Page**: New `/status` page with real-time service health monitoring. Checks Website, API, CDN, Auth, Database, and GitHub Sync status live. Features a deployment synchronization panel that compares the latest GitHub commit against the Vercel-deployed version, a 90-day uptime visualization, and external links.
- **Navbar Resources Dropdown**: Desktop header now features a "Resources" dropdown containing links to Platform Status, Changelog, Contributing, Terms of Service, and Privacy Policy.
- **Mobile Navigation Overhaul**: Mobile menu now includes Status (with live green indicator), Contributing, Changelog, Terms, and Privacy links in a scrollable, organized layout.
- **Course Content Overhaul**: Massively expanded the Cybersecurity and Blockchain courses with comprehensive content, including XSS deep-dives, Zero Trust frameworks, ZK-Rollups, and MEV. Added rich HTML and real-world code snippets.
- **Page-Level SEO Metadata**: Exported contextual `metadata` tags (titles, descriptions, keywords) on **all 13 course pages**, targeting high-intent SERP queries. Every course now has contextual SEO titles, descriptions, and keyword arrays.
- **PWA Manifest**: Created `public/manifest.json` enabling Progressive Web App capabilities (installable on mobile/desktop devices).
- **Global Search Palette**: Implemented a blazing-fast command palette (`Ctrl+K` or `Cmd+K`) to search across all 50+ lessons. Features query highlighting, keyboard navigation, and instant redirection.
- **Student Progress Dashboard**: New `/dashboard` page that aggregates `localStorage` completion data from all 13 course paths into a unified visual overview with XP tracking.
- **Unified Client interactions**: Moved global event listeners and persistent UI components (Search Palette, Scroll-to-Top) into a `ClientWrapper` to maintain high-performance server-side metadata defaults.
- **Navbar Integration**: Added permanent "Dashboard" and "Search" entry points to the primary navigation. Added System Design and Rust courses to the courses dropdown. Added Certificates link to footer.

### Fixed
- **[DSB-001] Dashboard Progress Desync**: Fixed the critical dashboard sync bug by aligning localStorage key lookup (`storageTitle`) with the exact keys written by `LessonPlayer`. Dashboard now correctly reads completion progress from all 13 courses.
- **Mobile Sidebar Overlap**: Fixed `LessonPlayer` mobile layout so the sidebar appears as an overlay with a backdrop rather than squishing the main reading content.
- **Discord Popup Bounds**: Refactored `prompts.tsx` notification to stay perfectly bounded within the screen width on mobile devices without causing horizontal overflow.
- **Empty Category States**: Added a gracefully styled "Course in Development" empty state fallback in the Course Catalog for categories that have no active courses.
- **Discord Popup Persistence**: Prompt popups now persist dismiss state in `localStorage`. Once dismissed, they stay dismissed across page reloads and navigation, preventing UX friction and content overlap.
- **Missing manifest.json**: Created `public/manifest.json` to resolve 404 console errors and enable PWA install capability.
- **Stale Stats**: Updated hero (13 courses, 250+ lessons), community CTA, and footer to reflect the correct course count.
- **Misleading CTA**: Changed "Watch Trailer" hero button to "Join Community" since it links to Discord, not a video.

### Planned
- User authentication & persistent accounts (Cloud sync)
- Community lesson submissions & review workflow
- Comment threads on individual lessons

---.

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
