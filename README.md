# OpenSyntax Academy

> A premium, open-source learning platform for advanced developer education. 100% free, community-funded, and forever open-source.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Instagram](https://img.shields.io/badge/Instagram-Join_Community-E4405F?logo=instagram&logoColor=white)](https://www.instagram.com/http.sejed.official/)
[![Version](https://img.shields.io/badge/version-4.0.0-violet)](https://opensyntax-academy.vercel.app/changelog)

---

## About Version 4.0.0 — Multi-Language Release

OpenSyntax 4.0.0 brings full **multi-language support** to the platform. Users can now switch between **English, Arabic (العربية), Tunisian Darija (تونسي), French (Français), and German (Deutsch)** via a globe-icon language switcher in the navbar. Arabic and Tunisian automatically apply a proper **RTL layout**. Language preference is persisted in `localStorage`.

This release also ships critical bug fixes: the interactive terminal no longer scrolls the entire page on load, and the landing page now correctly shows the top of the hero on first render.

---

## Features

- **13 Extensive Learning Paths** — Web, Discord, Python, AI/ML, TypeScript, DevOps, Databases, React Patterns, Cybersecurity, Blockchain, Mobile, System Design, and Rust.
- **Multi-Language UI** — EN · AR (RTL) · TN (RTL) · FR · DE with localStorage persistence.
- **Premium Bento-box UI** — powered by `framer-motion` for stagger animations and layout transitions.
- **WebGL Hero Scene** — driven by `@react-three/fiber` for an immersive, zero-lag 3D physics interaction.
- **Sidebar-driven Lesson Player** — with deeply integrated course metadata (instructors, ratings, prerequisites).
- **Student Dashboard** — aggregates localStorage progress from all 13 courses with XP tracking.
- **Certificates System** — SVG-rendered completion certificates for each course.
- **Global Search Palette** — `Ctrl+K` / `Cmd+K` command palette searching all 250+ lessons.
- **Known Bugs Transparency Page** — `/bugs` accessible from the navbar Resources menu.
- **GDPR-compliant** — Zero-tracking architecture. All interactions are client-side only.
- **Apache 2.0 licensed** — clone, deploy, and distribute freely.

---

## The Curriculum Paths

Our courses are organized directly in the filesystem (`app/courses/[category]/page.tsx`). Each path boasts a dynamic set of lessons and modules spanning:

1. **Web Engineering (Next.js 16)**
2. **Discord Development (discord.py / AutoSharding)**
3. **Python & Data Science (Pandas, ML Pipelines)**
4. **AI/ML Engineering (LLMs, RAG Architectures)**
5. **TypeScript Mastery (Generics, Conditional Types, Zod, tRPC)**
6. **DevOps & Cloud (Kubernetes, Terraform, Prometheus)**
7. **Database Engineering (PostgreSQL internals, Indexing, Normalization)**
8. **React Advanced Patterns (Hooks, Concurrency, Virtualization)**
9. **Cybersecurity (XSS, SQLi, JWT/OAuth, CSRF)**
10. **Blockchain & Web3 (Solidity, Smart Contracts, DeFi)**
11. **Mobile Engineering (React Native, Expo, Reanimated)**
12. **System Design (Kafka, Redis, Sharding, Rate Limiting)**
13. **Rust & Systems Programming (WASM, Tokio, Ownership)**

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + OKLCH Colors
- **Animation:** Framer Motion + React Three Fiber
- **Typography:** Geist Sans / Geist Mono
- **i18n:** Custom lightweight localStorage-based i18n system (no heavy library)
- **Hosting:** Vercel

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/TSSEJED/opensyntax-academy.git
cd opensyntax-academy

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Contributing

We welcome contributions from the community. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) to learn how to inject new lessons, paths, and modules into the ecosystem.

---

## Community

Join the community: [@http.sejed.official](https://www.instagram.com/http.sejed.official/)

---

## License

Apache License 2.0 — see [LICENSE](./LICENSE) for details.
