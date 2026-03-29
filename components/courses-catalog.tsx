import Link from "next/link"
import { Clock, Layers, BookOpen } from "lucide-react"

type Course = {
  href: string
  title: string
  subtitle: string
  description: string
  icon: string
  iconColor: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  modules: number
  lessons: number
  tags: string[]
}

const COURSES: Course[] = [
  {
    href: "/courses/web",
    title: "Full-Stack Web Engineering",
    subtitle: "Next.js 16 · Server Actions · Edge · PWA",
    description: "Master the Next.js 16 App Router, advanced caching with 'use cache', Server Actions for progressive enhancement, Edge Middleware with geo-routing, and offline-first PWA architecture.",
    icon: "⬡", iconColor: "#00C6FF",
    category: "Web", difficulty: "Advanced",
    duration: "8h 40m", modules: 6, lessons: 18,
    tags: ["Next.js", "TypeScript", "React", "Edge", "PWA"],
  },
  {
    href: "/courses/discord",
    title: "Advanced Discord Development",
    subtitle: "discord.py · Cogs · Sharding · PostgreSQL · Redis",
    description: "Production-grade Discord bot architecture with hot-reloadable Cogs, horizontal sharding via AutoShardedClient, connection pooling with asyncpg, Redis caching, and cross-shard IPC.",
    icon: "◈", iconColor: "#7289DA",
    category: "Discord", difficulty: "Advanced",
    duration: "10h 20m", modules: 5, lessons: 22,
    tags: ["Python", "discord.py", "PostgreSQL", "Redis", "Docker"],
  },
  {
    href: "/courses/python",
    title: "Python & Data Science",
    subtitle: "NumPy · Pandas · Matplotlib · Scikit-learn",
    description: "Build a complete data science toolkit. Vectorized computation with NumPy broadcasting, multi-level Pandas indexing, rolling windows, memory-efficient categoricals, and end-to-end ML pipelines.",
    icon: "◎", iconColor: "#FFD43B",
    category: "AI & Data", difficulty: "Intermediate",
    duration: "12h 15m", modules: 5, lessons: 24,
    tags: ["Python", "NumPy", "Pandas", "Scikit-learn", "Jupyter"],
  },
  {
    href: "/courses/ai-ml",
    title: "AI/ML Engineering",
    subtitle: "Transformers · RAG · Fine-tuning · MLOps",
    description: "Build production AI systems end-to-end. Hybrid RAG pipelines with Qdrant, cross-encoder reranking, LoRA fine-tuning, MLflow experiment tracking, and drift monitoring in production.",
    icon: "◉", iconColor: "#A259FF",
    category: "AI & Data", difficulty: "Advanced",
    duration: "14h 30m", modules: 6, lessons: 28,
    tags: ["PyTorch", "HuggingFace", "LangChain", "Qdrant", "MLflow"],
  },
  {
    href: "/courses/typescript",
    title: "TypeScript Mastery",
    subtitle: "Conditional Types · Generics · Template Literals",
    description: "Move beyond basic TypeScript into the type system's most powerful features. Conditional types, infer keyword, mapped type modifiers, template literal types, and type-safe API patterns.",
    icon: "⬡", iconColor: "#3178C6",
    category: "Web", difficulty: "Advanced",
    duration: "9h 45m", modules: 5, lessons: 20,
    tags: ["TypeScript", "Generics", "Decorators", "tRPC", "Zod"],
  },
  {
    href: "/courses/devops",
    title: "DevOps & Cloud Engineering",
    subtitle: "Docker · Kubernetes · Terraform · CI/CD",
    description: "Design and operate production infrastructure. Kubernetes rolling deployments with PodDisruptionBudgets, Terraform IaC, GitOps with ArgoCD, and full-stack observability with OpenTelemetry.",
    icon: "⬡", iconColor: "#0DB7ED",
    category: "DevOps", difficulty: "Intermediate",
    duration: "11h 00m", modules: 6, lessons: 26,
    tags: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "Prometheus"],
  },
  {
    href: "/courses/databases",
    title: "Database Engineering",
    subtitle: "PostgreSQL Internals · Query Optimization · Redis",
    description: "Understand databases at the internals level. EXPLAIN ANALYZE mastery, B-tree vs GIN vs BRIN index strategies, MVCC, vacuum tuning, Redis data structures, and schema design for high-write workloads.",
    icon: "◈", iconColor: "#336791",
    category: "Systems", difficulty: "Advanced",
    duration: "10h 30m", modules: 5, lessons: 22,
    tags: ["PostgreSQL", "Redis", "Indexing", "EXPLAIN", "Partitioning"],
  },
  {
    href: "/courses/react-patterns",
    title: "React Advanced Patterns",
    subtitle: "Compound Components · Suspense · Performance",
    description: "Master the patterns used by world-class React libraries. Compound components with implicit context, render prop patterns, Suspense architecture, concurrent features, and React Profiler-driven optimization.",
    icon: "◉", iconColor: "#61DAFB",
    category: "Web", difficulty: "Intermediate",
    duration: "8h 20m", modules: 4, lessons: 18,
    tags: ["React", "Hooks", "Suspense", "Performance", "Context"],
  },
  {
    href: "/courses/cybersecurity",
    title: "Cybersecurity Fundamentals",
    subtitle: "OWASP Top 10 · Secure Coding · Auth · CSP",
    description: "Understand web security from an attacker's perspective to defend like an expert. Injection attacks, XSS with Content Security Policy, secure JWT patterns, OAuth 2.0, and CSRF prevention.",
    icon: "◎", iconColor: "#FF4D4D",
    category: "Security", difficulty: "Intermediate",
    duration: "9h 10m", modules: 5, lessons: 21,
    tags: ["OWASP", "OAuth", "JWT", "XSS", "SQLi", "CSP"],
  },
  {
    href: "/courses/blockchain",
    title: "Blockchain & Web3 Engineering",
    subtitle: "Solidity · DeFi · Smart Contracts · Hardhat",
    description: "Build production-grade smart contracts on EVM chains. Solidity security patterns, reentrancy guards, gas optimization, DeFi protocol design, OpenZeppelin modules, and Hardhat testing suites.",
    icon: "⬡", iconColor: "#F6851B",
    category: "Blockchain", difficulty: "Advanced",
    duration: "13h 40m", modules: 5, lessons: 22,
    tags: ["Solidity", "Hardhat", "OpenZeppelin", "DeFi", "EVM"],
  },
  {
    href: "/courses/mobile",
    title: "Mobile Engineering · React Native",
    subtitle: "Expo Router · Reanimated 3 · Native Modules · EAS",
    description: "Build production React Native apps for iOS and Android. Gesture-driven 60fps animations with Reanimated 3 worklets, Expo Router file-based navigation, native module bridging, and EAS CI/CD.",
    icon: "◉", iconColor: "#3DDC84",
    category: "Mobile", difficulty: "Intermediate",
    duration: "10h 50m", modules: 5, lessons: 22,
    tags: ["React Native", "Expo", "Reanimated", "TypeScript", "EAS"],
  },
]

const DIFFICULTY_STYLES = {
  Beginner:     "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Advanced:     "bg-orange-500/10 text-orange-400 border-orange-500/20",
}

const CATEGORIES = ["All", "Web", "AI & Data", "DevOps", "Systems", "Security", "Blockchain", "Mobile", "Discord"]

export function CoursesCatalog() {
  return (
    <section id="courses" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Course Library</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground" style={{ letterSpacing: "-0.04em" }}>
              Choose Your Path
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs">{COURSES.length} premium courses · always free</p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COURSES.map((course) => (
            <Link
              key={course.href}
              href={course.href}
              className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-all duration-200 hover:border-border/80 hover:bg-secondary/30 overflow-hidden"
            >
              {/* Top accent line on hover */}
              <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${course.iconColor}80, transparent)` }} />

              {/* Icon + difficulty */}
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-border text-lg"
                  style={{ background: `${course.iconColor}14`, color: course.iconColor }}>
                  {course.icon}
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${DIFFICULTY_STYLES[course.difficulty]}`}>
                  {course.difficulty}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="font-bold text-sm text-foreground leading-snug mb-1" style={{ letterSpacing: "-0.02em" }}>
                  {course.title}
                </h3>
                <p className="text-xs font-medium" style={{ color: course.iconColor }}>{course.subtitle}</p>
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">{course.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {course.tags.slice(0, 4).map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground/80 font-mono">
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex gap-3">
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock size={11} />{course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Layers size={11} />{course.modules} modules
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <BookOpen size={11} />{course.lessons}
                  </span>
                </div>
                <span className="text-[11px] text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Start →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
