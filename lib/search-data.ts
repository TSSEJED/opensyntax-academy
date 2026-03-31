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
  // ── Computing Foundations (Minus Zero) ──────────────────
  { id: "cpu-architecture", title: "CPU Architecture & Instruction Sets", description: "How registers, ALU, and clock cycles combine to execute code.", courseTitle: "Computing Foundations", courseSlug: "foundations", category: "Foundations", accentColor: "oklch(0.60 0.15 250)" },
  { id: "tcp-ip-model", title: "TCP/IP Model & Packet Switching", description: "How data travels the world via DNS, IP routing, and packets.", courseTitle: "Computing Foundations", courseSlug: "foundations", category: "Foundations", accentColor: "oklch(0.60 0.15 250)" },
  { id: "terminal-magic", title: "POSIX Shell & Navigation", description: "Mastering the professional command line environment.", courseTitle: "Computing Foundations", courseSlug: "foundations", category: "Foundations", accentColor: "oklch(0.60 0.15 250)" },

  // ── Web Engineering ──────────────────────────────────────
  { id: "semantic-html", title: "Semantic HTML5 Foundations", description: "Tier 1: Document structure, accessibility, and SEO fundamentals.", courseTitle: "Web Engineering", courseSlug: "web", category: "Web", accentColor: "oklch(0.72 0.17 196)" },
  { id: "parallel-routes", title: "Parallel & Intercepted Routes", description: "Tier 3: Complex Next.js UI patterns like modals and state preservation.", courseTitle: "Web Engineering", courseSlug: "web", category: "Web", accentColor: "oklch(0.72 0.17 196)" },
  { id: "use-cache", title: "The 'use cache' Directive", description: "Tier 3: Master Next.js 16 explicit caching primitives.", courseTitle: "Web Engineering", courseSlug: "web", category: "Web", accentColor: "oklch(0.72 0.17 196)" },

  // ── Discord Development ──────────────────────────────────
  { id: "intro-discord-py", title: "Introduction to discord.py", description: "Tier 1: Set up tokens, permissions, and basic event loops.", courseTitle: "Discord Development", courseSlug: "discord", category: "Discord", accentColor: "#7289DA" },
  { id: "slash-commands", title: "Application/Slash Commands", description: "Tier 2: Migrating to native Discord slash commands with autocomplete.", courseTitle: "Discord Development", courseSlug: "discord", category: "Discord", accentColor: "#7289DA" },
  { id: "sharding-ipc", title: "Sharding & Redis IPC", description: "Tier 3: Scaling bots beyond 2,500 servers with AutoShardedClient.", courseTitle: "Discord Development", courseSlug: "discord", category: "Discord", accentColor: "#7289DA" },

  // ── Python & Data Science ────────────────────────────────
  { id: "numpy-broadcasting", title: "Vectorization & Broadcasting", description: "Tier 1: How NumPy executes C-level array operations.", courseTitle: "Python & Data Science", courseSlug: "python", category: "AI & Data", accentColor: "#FFD43B" },
  { id: "sklearn-pipelines", title: "Scikit-learn Pipelines", description: "Tier 2: Chain preprocessing and estimators safely.", courseTitle: "Python & Data Science", courseSlug: "python", category: "AI & Data", accentColor: "#FFD43B" },
  { id: "dask-distributed", title: "Parallelism with Dask", description: "Tier 3: Distributed dataframes for massive datasets.", courseTitle: "Python & Data Science", courseSlug: "python", category: "AI & Data", accentColor: "#FFD43B" },

  // ── AI/ML Engineering ────────────────────────────────────
  { id: "neural-nets", title: "Neural Network Architecture", description: "Tier 1: Building backpropagation and activation functions.", courseTitle: "AI/ML Engineering", courseSlug: "ai-ml", category: "AI & Data", accentColor: "oklch(0.70 0.20 300)" },
  { id: "llm-fundamentals", title: "LLM Transformer Architecture", description: "Tier 2: Attention mechanisms and tokenization deep dive.", courseTitle: "AI/ML Engineering", courseSlug: "ai-ml", category: "AI & Data", accentColor: "oklch(0.70 0.20 300)" },
  { id: "rag-pipeline", title: "RAG Pipeline Implementation", description: "Tier 3: Vector databases and retrieval augmented generation.", courseTitle: "AI/ML Engineering", courseSlug: "ai-ml", category: "AI & Data", accentColor: "oklch(0.70 0.20 300)" },

  // ── TypeScript ───────────────────────────────────────────
  { id: "type-inference", title: "Type Inference & Let/Const", description: "Tier 1: How the TS compiler predicts your data structures.", courseTitle: "TypeScript Mastery", courseSlug: "typescript", category: "Web", accentColor: "#3178C6" },
  { id: "advanced-generics", title: "Advanced Generics & Constraints", description: "Tier 2: Conditional types and template literal masters.", courseTitle: "TypeScript Mastery", courseSlug: "typescript", category: "Web", accentColor: "#3178C6" },
  { id: "branding-nominal-types", title: "Nominal Typing & Branding", description: "Tier 3: Forcing type safety for primitives like UserIDs.", courseTitle: "TypeScript Mastery", courseSlug: "typescript", category: "Web", accentColor: "#3178C6" },

  // ── DevOps ───────────────────────────────────────────────
  { id: "docker-foundations", title: "Containerization with Docker", description: "Tier 1: Building efficient images and managing layers.", courseTitle: "DevOps & Cloud Engineering", courseSlug: "devops", category: "DevOps", accentColor: "oklch(0.68 0.18 145)" },
  { id: "kubernetes-deployments", title: "Kubernetes Orchestration", description: "Tier 2: Deploy, scale, and roll back apps with kubectl.", courseTitle: "DevOps & Cloud Engineering", courseSlug: "devops", category: "DevOps", accentColor: "oklch(0.68 0.18 145)" },
  { id: "terraform-iac", title: "Infrastructure as Code (Terraform)", description: "Tier 3: Provisioning cloud resources declaratively.", courseTitle: "DevOps & Cloud Engineering", courseSlug: "devops", category: "DevOps", accentColor: "oklch(0.68 0.18 145)" },

  // ── Databases ────────────────────────────────────────────
  { id: "sql-syntax", title: "DQL & Relationship Mapping", description: "Tier 1: Mastering JOINs, aggregations, and subqueries.", courseTitle: "Database Engineering", courseSlug: "databases", category: "DevOps", accentColor: "oklch(0.65 0.15 230)" },
  { id: "pg-internals", title: "PostgreSQL VACUUM & MVCC", description: "Tier 2: Understanding autovacuum and table bloat.", courseTitle: "Database Engineering", courseSlug: "databases", category: "DevOps", accentColor: "oklch(0.65 0.15 230)" },
  { id: "indexing-strategy", title: "Advanced Indexing (GIN/BRIN)", description: "Tier 3: Expression indexes for maximum query speed.", courseTitle: "Database Engineering", courseSlug: "databases", category: "DevOps", accentColor: "oklch(0.65 0.15 230)" },

  // ── React Patterns ───────────────────────────────────────
  { id: "hooks-foundations", title: "Hooks & Component Lifecycles", description: "Tier 1: Deep dive into useEffect, memo, and callbacks.", courseTitle: "React Advanced Patterns", courseSlug: "react-patterns", category: "Web", accentColor: "#61DAFB" },
  { id: "concurrent-react", title: "Concurrent React & useTransition", description: "Tier 2: Keeping UI responsive during expensive renders.", courseTitle: "React Advanced Patterns", courseSlug: "react-patterns", category: "Web", accentColor: "#61DAFB" },
  { id: "server-components", title: "React Server Components (RSC)", description: "Tier 3: Rethinking the client-server boundary for speed.", courseTitle: "React Advanced Patterns", courseSlug: "react-patterns", category: "Web", accentColor: "#61DAFB" },

  // ── Cybersecurity ────────────────────────────────────────
  { id: "linux-sec", title: "Linux Hardening & Permissions", description: "Tier 1: Securing the root user and audit logging.", courseTitle: "Cybersecurity Fundamentals", courseSlug: "cybersecurity", category: "DevOps", accentColor: "oklch(0.63 0.20 25)" },
  { id: "xss-prevention", title: "XSS & Content Security Policy", description: "Tier 2: Eliminating scripts with CSP and sanitization.", courseTitle: "Cybersecurity Fundamentals", courseSlug: "cybersecurity", category: "DevOps", accentColor: "oklch(0.63 0.20 25)" },
  { id: "zero-trust", title: "Zero Trust Architecture", description: "Tier 3: Identity-aware proxies and micro-segmentation.", courseTitle: "Cybersecurity Fundamentals", courseSlug: "cybersecurity", category: "DevOps", accentColor: "oklch(0.63 0.20 25)" },

  // ── Blockchain ───────────────────────────────────────────
  { id: "solidity-fundamentals", title: "Solidity Smart Contracts", description: "Tier 1: Writing, compiling, and deploying your first contract.", courseTitle: "Blockchain & Web3 Engineering", courseSlug: "blockchain", category: "Web", accentColor: "oklch(0.72 0.17 55)" },
  { id: "defi-protocols", title: "DeFi Protocol Architecture", description: "Tier 2: AMMs, liquidity pools, and yield mechanisms.", courseTitle: "Blockchain & Web3 Engineering", courseSlug: "blockchain", category: "Web", accentColor: "oklch(0.72 0.17 55)" },
  { id: "smart-contract-security", title: "Smart Contract Security Auditing", description: "Tier 3: Preventing reentrancy and front-running.", courseTitle: "Blockchain & Web3 Engineering", courseSlug: "blockchain", category: "Web", accentColor: "oklch(0.72 0.17 55)" },

  // ── Mobile ───────────────────────────────────────────────
  { id: "react-native-setup", title: "React Native & Expo Setup", description: "Tier 1: Bootstrapping production-ready mobile apps.", courseTitle: "Mobile Engineering", courseSlug: "mobile", category: "Mobile", accentColor: "oklch(0.70 0.18 330)" },
  { id: "reanimated", title: "Reanimated 3 & Gestures", description: "Tier 2: Build 60fps native animations on the UI thread.", courseTitle: "Mobile Engineering", courseSlug: "mobile", category: "Mobile", accentColor: "oklch(0.70 0.18 330)" },
  { id: "eas-deployment", title: "EAS Build & Store Submission", description: "Tier 3: Automated CI pipelines for iOS and Android.", courseTitle: "Mobile Engineering", courseSlug: "mobile", category: "Mobile", accentColor: "oklch(0.70 0.18 330)" },
]
