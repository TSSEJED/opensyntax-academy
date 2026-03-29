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

### Changed
- **Forced Light Mode**: Permanently replaced dark mode themes with a vibrant, high-contrast OKLCH light mode color palette for maximum readability and a premium feel.
- **Terms of Service**: Updated to reflect community-aggregated course metadata and ratings.
- **Privacy Policy**: Updated to explicitly state that all interactive features (3D assets, framer-motion animations) are fully client-sided and do not track user input.

### Removed
- Removed legacy Next-Themes dark mode variant implementations across the UI components.
