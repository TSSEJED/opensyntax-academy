export type SearchLesson = {
  id: string
  title: string
  description: string
  courseTitle: string
  courseSlug: string
  category: string
  accentColor: string
}

export const searchIndex: SearchLesson[] = [
  // ── Web Engineering ──────────────────────────────────────
  { id: "parallel-routes", title: "Parallel & Intercepted Routes", description: "Build complex UI patterns like modals that preserve URL state.", courseTitle: "Full-Stack Web Engineering", courseSlug: "web", category: "Web", accentColor: "oklch(0.72 0.17 196)" },
  { id: "use-cache", title: "The 'use cache' Directive", description: "Master Next.js 16 explicit caching primitives for granular control.", courseTitle: "Full-Stack Web Engineering", courseSlug: "web", category: "Web", accentColor: "oklch(0.72 0.17 196)" },
  { id: "edge-middleware", title: "Edge Middleware & Geolocation", description: "Build auth guards, A/B testing, and geo-routing at the CDN edge.", courseTitle: "Full-Stack Web Engineering", courseSlug: "web", category: "Web", accentColor: "oklch(0.72 0.17 196)" },
  { id: "server-actions-deep", title: "Server Actions Deep Dive", description: "Handle complex mutations with zero client JS using progressive enhancement.", courseTitle: "Full-Stack Web Engineering", courseSlug: "web", category: "Web", accentColor: "oklch(0.72 0.17 196)" },
  { id: "pwa-offline", title: "PWA & Service Worker Caching", description: "Make your Next.js app installable and work offline with background sync.", courseTitle: "Full-Stack Web Engineering", courseSlug: "web", category: "Web", accentColor: "oklch(0.72 0.17 196)" },

  // ── Discord Development ──────────────────────────────────
  { id: "intro-discord-py", title: "Introduction to discord.py", description: "Set up your bot token, permissions, and build a basic event loop.", courseTitle: "Advanced Discord Development", courseSlug: "discord", category: "Discord", accentColor: "#7289DA" },
  { id: "cogs-extensions", title: "Cogs & Hot-reloading", description: "Organize your bot into modular classes that reload without restarting.", courseTitle: "Advanced Discord Development", courseSlug: "discord", category: "Discord", accentColor: "#7289DA" },
  { id: "slash-commands", title: "Application/Slash Commands", description: "Migrate to native Discord slash commands with autocomplete.", courseTitle: "Advanced Discord Development", courseSlug: "discord", category: "Discord", accentColor: "#7289DA" },
  { id: "postgresql-asyncpg", title: "Database Integration with asyncpg", description: "Connect your bot to PostgreSQL using high-performance async pooling.", courseTitle: "Advanced Discord Development", courseSlug: "discord", category: "Discord", accentColor: "#7289DA" },
  { id: "sharding-ipc", title: "Sharding & Redis IPC", description: "Scale your bot beyond 2,500 servers using AutoShardedClient.", courseTitle: "Advanced Discord Development", courseSlug: "discord", category: "Discord", accentColor: "#7289DA" },

  // ── Python & Data Science ────────────────────────────────
  { id: "numpy-broadcasting", title: "Vectorization & Broadcasting", description: "Ditch Python for loops. Learn how NumPy executes C-level array ops.", courseTitle: "Python & Data Science", courseSlug: "python", category: "AI & Data", accentColor: "#FFD43B" },
  { id: "pandas-multiindex", title: "MultiIndex & Advanced Grouping", description: "Handle high-dimensional data in Pandas using hierarchical indexing.", courseTitle: "Python & Data Science", courseSlug: "python", category: "AI & Data", accentColor: "#FFD43B" },
  { id: "pandas-memory", title: "Memory Optimization", description: "Process massive CSVs by downcasting numeric types and using Categoricals.", courseTitle: "Python & Data Science", courseSlug: "python", category: "AI & Data", accentColor: "#FFD43B" },
  { id: "sklearn-pipelines", title: "Scikit-learn Pipelines", description: "Prevent data leakage by chaining preprocessing and estimators.", courseTitle: "Python & Data Science", courseSlug: "python", category: "AI & Data", accentColor: "#FFD43B" },
  { id: "columntransformer", title: "Column Transformers", description: "Apply different preprocessing to continuous and categorical variables.", courseTitle: "Python & Data Science", courseSlug: "python", category: "AI & Data", accentColor: "#FFD43B" },

  // ── AI/ML Engineering ────────────────────────────────────
  { id: "llm-fundamentals", title: "LLM Fundamentals & Architecture", description: "Understand transformer architecture and attention mechanisms.", courseTitle: "AI/ML Engineering", courseSlug: "ai-ml", category: "AI & Data", accentColor: "oklch(0.70 0.20 300)" },
  { id: "rag-pipeline", title: "RAG Pipeline Implementation", description: "Build retrieval augmented generation systems from scratch.", courseTitle: "AI/ML Engineering", courseSlug: "ai-ml", category: "AI & Data", accentColor: "oklch(0.70 0.20 300)" },
  { id: "fine-tuning", title: "Model Fine-Tuning with LoRA", description: "Efficiently fine-tune LLMs using Low-Rank Adaptation.", courseTitle: "AI/ML Engineering", courseSlug: "ai-ml", category: "AI & Data", accentColor: "oklch(0.70 0.20 300)" },

  // ── TypeScript ───────────────────────────────────────────
  { id: "advanced-generics", title: "Advanced Generics & Constraints", description: "Master conditional types, mapped types, and template literal types.", courseTitle: "TypeScript Mastery", courseSlug: "typescript", category: "Web", accentColor: "#3178C6" },
  { id: "zod-trpc", title: "Zod & tRPC Integration", description: "Build fully type-safe APIs with end-to-end type inference.", courseTitle: "TypeScript Mastery", courseSlug: "typescript", category: "Web", accentColor: "#3178C6" },
  { id: "type-guards", title: "Type Guards & Discriminated Unions", description: "Narrow types at runtime safely and expressively.", courseTitle: "TypeScript Mastery", courseSlug: "typescript", category: "Web", accentColor: "#3178C6" },

  // ── DevOps ───────────────────────────────────────────────
  { id: "kubernetes-deployments", title: "Kubernetes Deployments & Rollouts", description: "Deploy, scale, and roll back containerized apps with kubectl.", courseTitle: "DevOps & Cloud Infrastructure", courseSlug: "devops", category: "DevOps", accentColor: "oklch(0.68 0.18 145)" },
  { id: "terraform-iac", title: "Infrastructure as Code with Terraform", description: "Provision cloud infrastructure declaratively and reproducibly.", courseTitle: "DevOps & Cloud Infrastructure", courseSlug: "devops", category: "DevOps", accentColor: "oklch(0.68 0.18 145)" },
  { id: "prometheus-grafana", title: "Prometheus & Grafana Monitoring", description: "Build production-grade dashboards and alerting pipelines.", courseTitle: "DevOps & Cloud Infrastructure", courseSlug: "devops", category: "DevOps", accentColor: "oklch(0.68 0.18 145)" },

  // ── Databases ────────────────────────────────────────────
  { id: "pg-internals", title: "PostgreSQL Internals & VACUUM", description: "Understand MVCC, autovacuum, and table bloat management.", courseTitle: "Database Engineering", courseSlug: "databases", category: "DevOps", accentColor: "oklch(0.65 0.15 230)" },
  { id: "indexing-strategy", title: "Advanced Indexing Strategies", description: "Partial, covering, and expression indexes for maximum query speed.", courseTitle: "Database Engineering", courseSlug: "databases", category: "DevOps", accentColor: "oklch(0.65 0.15 230)" },

  // ── React Patterns ───────────────────────────────────────
  { id: "concurrent-react", title: "Concurrent React & useTransition", description: "Keep your UI responsive during expensive state transitions.", courseTitle: "Advanced React Patterns", courseSlug: "react-patterns", category: "Web", accentColor: "#61DAFB" },
  { id: "compound-components", title: "Compound Component Pattern", description: "Build flexible, expressive component APIs with implicit state sharing.", courseTitle: "Advanced React Patterns", courseSlug: "react-patterns", category: "Web", accentColor: "#61DAFB" },
  { id: "virtualization", title: "List Virtualization with TanStack", description: "Render thousands of rows without killing browser performance.", courseTitle: "Advanced React Patterns", courseSlug: "react-patterns", category: "Web", accentColor: "#61DAFB" },

  // ── Cybersecurity ────────────────────────────────────────
  { id: "xss-prevention", title: "XSS & Content Security Policy", description: "Eliminate cross-site scripting with CSP headers and sanitization.", courseTitle: "Cybersecurity", courseSlug: "cybersecurity", category: "DevOps", accentColor: "oklch(0.63 0.20 25)" },
  { id: "jwt-oauth", title: "JWT & OAuth 2.0 Security", description: "Implement secure authentication flows without common pitfalls.", courseTitle: "Cybersecurity", courseSlug: "cybersecurity", category: "DevOps", accentColor: "oklch(0.63 0.20 25)" },
  { id: "sql-injection", title: "SQL Injection & Parameterized Queries", description: "Protect your database layer from injection attacks.", courseTitle: "Cybersecurity", courseSlug: "cybersecurity", category: "DevOps", accentColor: "oklch(0.63 0.20 25)" },

  // ── Blockchain ───────────────────────────────────────────
  { id: "solidity-fundamentals", title: "Solidity Smart Contract Fundamentals", description: "Write, compile, and deploy your first Ethereum smart contract.", courseTitle: "Blockchain & Web3", courseSlug: "blockchain", category: "Web", accentColor: "oklch(0.72 0.17 55)" },
  { id: "defi-protocols", title: "DeFi Protocol Architecture", description: "Understand AMMs, liquidity pools, and yield farming mechanisms.", courseTitle: "Blockchain & Web3", courseSlug: "blockchain", category: "Web", accentColor: "oklch(0.72 0.17 55)" },
  { id: "smart-contract-security", title: "Smart Contract Security Auditing", description: "Identify and prevent reentrancy, overflow, and front-running attacks.", courseTitle: "Blockchain & Web3", courseSlug: "blockchain", category: "Web", accentColor: "oklch(0.72 0.17 55)" },

  // ── Mobile ───────────────────────────────────────────────
  { id: "react-native-setup", title: "React Native & Expo Setup", description: "Bootstrap a production-ready mobile app with Expo SDK.", courseTitle: "Mobile Engineering", courseSlug: "mobile", category: "Mobile", accentColor: "oklch(0.70 0.18 330)" },
  { id: "reanimated", title: "Reanimated 3 & Gesture Handler", description: "Build 60fps native animations driven by the UI thread.", courseTitle: "Mobile Engineering", courseSlug: "mobile", category: "Mobile", accentColor: "oklch(0.70 0.18 330)" },
  { id: "eas-deployment", title: "EAS Build & OTA Updates", description: "Submit to App Store and Play Store with automated CI pipelines.", courseTitle: "Mobile Engineering", courseSlug: "mobile", category: "Mobile", accentColor: "oklch(0.70 0.18 330)" },
]
