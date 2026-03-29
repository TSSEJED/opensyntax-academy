# OpenSyntax Academy

> A premium, open-source learning platform for advanced developer education. 100% free, community-funded, and forever open-source.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Discord](https://img.shields.io/badge/Discord-Join_Community-5865F2?logo=discord&logoColor=white)](https://discord.gg/66GA8MNPeB)

---

## About Version 2.0

OpenSyntax 2.0 represents a massive scale-up of the platform. We have moved beyond just Next.js and Discord bots into a comprehensive architectural academy. Features now include a rich **Bento-style course catalog**, an immersive **3D interactive hero**, a pristine enforced Light Mode aesthetic, and over **50 new lesson modules** spanning 11 core disciplines.

This platform is **not** backed by venture capital or a subscription model. It is entirely community-funded and exists because developers want better, deeper, free education.

---

## Features

- **11 Extensive Learning Paths** — Web, Discord, Python, AI/ML, TypeScript, DevOps, Databases, React Patterns, Cybersecurity, Blockchain, and Mobile.
- **Premium Bento-box UI** — powered by `framer-motion` for stagger animations and layout transitions.
- **WebGL Hero Scene** — driven by `@react-three/fiber` for an immersive, zero-lag 3D physics interaction.
- **Sidebar-driven Lesson Player** — with deeply integrated course metadata (instructors, ratings, prerequisites).
- **GDPR-compliant** — Zero-tracking architecture. Interactions are executed efficiently on the client-side.
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

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + OKLCH Colors
- **Animation:** Framer Motion + React Three Fiber
- **Typography:** Geist Sans / Geist Mono
- **Hosting:** Vercel

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/TSSEJED/opensyntax-academy.git
cd opensyntax-academy

# Install dependencies (pnpm is recommended)
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

Join the support server: [discord.gg/66GA8MNPeB](https://discord.gg/66GA8MNPeB)

---

## License

Apache License 2.0 — see [LICENSE](./LICENSE) for details.
