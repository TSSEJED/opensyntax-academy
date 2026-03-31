# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [4.2.0] — 2026-03-31 — Next-Level UX & PWA Optimization

### Added
- **Tier-3 Python Enhancements**: Deployed advanced Production-Grade module to the Python course covering Dask distributed dataframes and integrated local SLM inference via Llama.cpp and WebAssembly.
- **PWA App Installation Prompts**: Integrated a new "Download the App" persistent popup into the `prompts` engine to encourage offline mobile usage.

### Fixed
- **[LDG-005] Mobile UI Lag Smoothing**: Conditionally removed heavy CSS `backdrop-blur-sm` instances in mobile viewing modes (Specifically the `LessonPlayer` sidebars) optimizing DOM repaints to eliminate FPS drops on smaller device screens.

---

## [4.1.0] — 2026-03-31 — "Minus Zero to Hero" Curriculum Upgrade & Mobile Optimization

### Added
- **"Minus Zero to Hero" Curriculum Architecture**: Completely restructured the platform's learning paths. The curriculum now properly accommodates absolute beginners with introductory hardware, networking, and terminal modules before bridging them into advanced tracks.
- **3-Tier Track System**: All 11 core domains (Web, Discord, AI/ML, DevOps, PostgreSQL, TypeScript, React Patterns, Cybersecurity, Web3, Mobile, Python) are now explicitly tiered into Tier 1: Foundations, Tier 2: Intermediate, and Tier 3: Production-Grade.
- **Bleeding-Edge Tier 3 Upgrades**: Pushed production tiers to include the latest patterns: Next.js Edge caching, K8s pod disruption budgets, TS conditional types, local SLMs, and woven OWASP security constraints.

### Fixed
- **[HRO-002] 3D Hero Stutter on Low-End Devices**: Drastically improved mobile landing page performance by conditionally disabling the `@react-three/fiber` Canvas on viewports `<768px`, falling back to an optimized CSS-blurred rendering. Eliminates frame drops and battery drain on mobile.

---

## [4.0.0] — 2026-03-31 — Multi-Language Release

### Added
- **Multi-Language Support (i18n)**: The platform now fully supports English, Arabic (العربية), Tunisian Darija (تونسي), French (Français), and German (Deutsch). A globe-icon language switcher is embedded in the navbar (desktop + mobile). Locale preference is persisted in `localStorage` under key `opensyntax_locale`.
- **RTL Layout Engine**: Selecting Arabic or Tunisian Darija automatically applies `dir="rtl"` to the HTML root element, delivering a proper right-to-left reading experience across all translated UI surfaces — hero, navbar, footer, and terminal welcome text.
- **Language Switcher Component**: New `components/language-switcher.tsx` with native language labels, a `localechange` custom event bus that keeps the Navbar, Hero, Footer, and Terminal in sync without a full page reload.
- **`lib/i18n.ts` Translation System**: Lightweight, zero-dependency i18n system with typed `TranslationKeys` dictionaries for all 5 locales. No heavy i18n library required.
- **Known Bugs Page in Navigation**: The `/bugs` Known Bugs transparency page is now directly accessible from the Navbar Resources dropdown (desktop) and the mobile menu, with a distinct red Bug icon to signal its importance.
- **`lang` Terminal Command**: The interactive terminal now accepts a `lang` command that lists all 5 supported languages with native names and LTR/RTL direction.

### Fixed
- **[TRM-003] Terminal Scrolls Entire Page on Load**: Removed `autoFocus` from the terminal input — this caused the browser to scroll the full page down to the terminal on initial render, hiding the hero section. The `scrollIntoView` call was also replaced with direct `container.scrollTop` manipulation, preventing page-level scroll hijacking when users type commands.
- **[LDG-004] Landing Page Top Not Visible on Load**: Root cause traced to `autoFocus` on the terminal input combined with `scrollIntoView({ behavior: "smooth" })`. Both removed and scroll scoped to the terminal's own container div.
- **Discord Link Audit**: Performed a full codebase audit for any remaining `discord.com` or `discord.gg` links. All community-facing links now point to the Instagram profile (`@http.sejed.official`).

### Planned
- Auto-detect browser language for initial locale selection
- User authentication & persistent accounts (Cloud sync)
- Community lesson submissions & review workflow
- Comment threads on individual lessons

---

## [3.0.0] — 2026-03-31

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
- **System Status Page**: New `/status` page with real-time service health monitoring. Checks Website, API, CDN, Auth, Database, and GitHub Sync status live.
- **Navbar Resources Dropdown**: Desktop header now features a "Resources" dropdown containing links to Platform Status, Changelog, Contributing, Terms of Service, and Privacy Policy.
- **Mobile Navigation Overhaul**: Mobile menu now includes Status (with live green indicator), Contributing, Changelog, Terms, and Privacy links in a scrollable, organized layout.
- **Course Content Overhaul**: Massively expanded the Cybersecurity and Blockchain courses with comprehensive content, including XSS deep-dives, Zero Trust frameworks, ZK-Rollups, and MEV.
- **Page-Level SEO Metadata**: Exported contextual `metadata` tags (titles, descriptions, keywords) on **all 13 course pages**.
- **PWA Manifest**: Created `public/manifest.json` enabling Progressive Web App capabilities.
- **Global Search Palette**: Implemented a blazing-fast command palette (`Ctrl+K` or `Cmd+K`) to search across all 50+ lessons.
- **Student Progress Dashboard**: New `/dashboard` page that aggregates `localStorage` completion data from all 13 course paths.

### Fixed
- **[DSB-001] Dashboard Progress Desync**: Fixed the critical dashboard sync bug by aligning localStorage key lookup (`storageTitle`) with the exact keys written by `LessonPlayer`.
- **Mobile Sidebar Overlap**: Fixed `LessonPlayer` mobile layout so the sidebar appears as an overlay with a backdrop rather than squishing the main reading content.
- **Instagram Popup Bounds**: Refactored `prompts.tsx` notification to stay perfectly bounded within the screen width on mobile devices.
- **Empty Category States**: Added a gracefully styled "Course in Development" empty state fallback in the Course Catalog for categories that have no active courses.
- **Instagram Popup Persistence**: Prompt popups now persist dismiss state in `localStorage`.
- **Stale Stats**: Updated hero (13 courses, 250+ lessons), community CTA, and footer to reflect the correct course count.

### Planned
- User authentication & persistent accounts (Cloud sync)
- Community lesson submissions & review workflow
- Comment threads on individual lessons

---

## [2.0.0] — 2026-03-29

### Added
- **Course Metadata**: Added `instructor`, `rating`, `reviewCount`, and `prerequisites` to all courses.
- **Premium Catalog Redesign**: The `/courses` catalog has been completely transformed into a "Bento-style" rich grid layout.
- **Category Filtering**: Users can now filter courses by category (`Web`, `DevOps`, `AI & Data`, etc.) directly on the catalog page.
- **Framer Motion Animations**: Introduced high-end transition animations, stagger effects, and hover states using `framer-motion` across the catalog.
- **3D Hero Integration**: Replaced the static hero section with an immersive, time-reactive 3D scene driven by `@react-three/fiber` and `@react-three/drei`.
- **Interactive Knowledge Checks**: Lessons now feature optional end-of-lesson quizzes with instant feedback.
- **Persistent Progress via localStorage**: Lesson completion state now persists across page refreshes and browser restarts.
- **Contributing Page**: Added `/contributing` as a fully-designed page mirroring `CONTRIBUTING.md`.
- **Changelog Page**: Added `/changelog` displaying the full platform version history.
- **Rich Social Presence**: Added `openGraph` and `twitter` card metadata for proper link previews.
- **SEO Sitemap** (`/sitemap.xml`): Dynamically generated, covering all 11 course routes and static pages.
- **robots.txt** (`/robots.txt`): Configured for all major crawlers and AI bots via `app/robots.ts`.
- **Schema.org JSON-LD**: `OrganizationJsonLd`, `CourseJsonLd`, and `WebsiteJsonLd` for rich search result eligibility.
- **Massive Content Scale**: Over 50 immersive HTML lessons across 11 course paths.

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
- Community Instagram integration.
- Apache 2.0 license.
