"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, BookOpen, Star, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
  instructor: string
  rating: number
  reviewCount: number
  prerequisites: string[]
  lastUpdated: string
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
    instructor: "Sarah Drasner", rating: 4.9, reviewCount: 1250,
    prerequisites: ["React Basics", "TypeScript"], lastUpdated: "Mar 2026"
  },
  {
    href: "/courses/discord",
    title: "Advanced Discord Development",
    subtitle: "discord.py · Cogs · Sharding · PostgreSQL",
    description: "Production-grade Discord bot architecture with hot-reloadable Cogs, horizontal sharding via AutoShardedClient, connection pooling with asyncpg, Redis caching, and cross-shard IPC.",
    icon: "◈", iconColor: "#7289DA",
    category: "Discord", difficulty: "Advanced",
    duration: "10h 20m", modules: 5, lessons: 22,
    tags: ["Python", "discord.py", "PostgreSQL", "Redis", "Docker"],
    instructor: "Danny", rating: 4.8, reviewCount: 4200,
    prerequisites: ["Python OOP", "AsyncIO"], lastUpdated: "Feb 2026"
  },
  {
    href: "/courses/python",
    title: "Python & Data Science",
    subtitle: "NumPy · Pandas · Matplotlib · Scikit-learn",
    description: "Build a complete data science toolkit. Vectorized computation with NumPy broadcasting, multi-level Pandas indexing, rolling windows, memory-efficient categoricals, and end-to-end ML pipelines.",
    icon: "◎", iconColor: "#FFD43B",
    category: "AI & Data", difficulty: "Intermediate",
    duration: "12h 15m", modules: 5, lessons: 24,
    tags: ["Python", "NumPy", "Pandas", "Scikit-learn"],
    instructor: "Wes McKinney", rating: 4.9, reviewCount: 8100,
    prerequisites: ["Python Syntax"], lastUpdated: "Jan 2026"
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
    instructor: "Harrison Chase", rating: 5.0, reviewCount: 950,
    prerequisites: ["Python", "Linear Algebra Foundations"], lastUpdated: "Mar 2026"
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
    instructor: "Matt Pocock", rating: 4.9, reviewCount: 3400,
    prerequisites: ["JavaScript Fundamentals"], lastUpdated: "Dec 2025"
  },
  {
    href: "/courses/devops",
    title: "DevOps & Cloud Engineering",
    subtitle: "Docker · Kubernetes · Terraform · CI/CD",
    description: "Design and operate production infrastructure. Kubernetes rolling deployments with PodDisruptionBudgets, Terraform IaC, GitOps with ArgoCD, and full-stack observability with OpenTelemetry.",
    icon: "⬡", iconColor: "#0DB7ED",
    category: "DevOps", difficulty: "Intermediate",
    duration: "11h 00m", modules: 6, lessons: 26,
    tags: ["Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    instructor: "Kelsey Hightower", rating: 4.8, reviewCount: 1600,
    prerequisites: ["Terminal/CLI usage"], lastUpdated: "Feb 2026"
  },
  {
    href: "/courses/databases",
    title: "Database Engineering",
    subtitle: "PostgreSQL Internals · Query Optimization · Redis",
    description: "Understand databases at the internals level. EXPLAIN ANALYZE mastery, B-tree vs GIN vs BRIN index strategies, MVCC, vacuum tuning, Redis data structures, and schema design for high-write workloads.",
    icon: "◈", iconColor: "#336791",
    category: "Systems", difficulty: "Advanced",
    duration: "10h 30m", modules: 5, lessons: 22,
    tags: ["PostgreSQL", "Redis", "Indexing", "EXPLAIN"],
    instructor: "Martin Kleppmann", rating: 5.0, reviewCount: 1100,
    prerequisites: ["SQL Basics"], lastUpdated: "Mar 2026"
  },
  {
    href: "/courses/react-patterns",
    title: "React Advanced Patterns",
    subtitle: "Compound Components · Suspense · Performance",
    description: "Master the patterns used by world-class React libraries. Compound components with implicit context, render prop patterns, Suspense architecture, concurrent features, and React Profiler-driven optimization.",
    icon: "◉", iconColor: "#61DAFB",
    category: "Web", difficulty: "Intermediate",
    duration: "8h 20m", modules: 4, lessons: 18,
    tags: ["React", "Hooks", "Suspense", "Performance"],
    instructor: "Dan Abramov", rating: 4.7, reviewCount: 2200,
    prerequisites: ["React Basics"], lastUpdated: "Nov 2025"
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
    instructor: "Tanya Janca", rating: 4.8, reviewCount: 890,
    prerequisites: ["Web Protocols (HTTP)"], lastUpdated: "Jan 2026"
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
    instructor: "Patrick Collins", rating: 4.9, reviewCount: 310,
    prerequisites: ["JavaScript", "Basic Cryptography"], lastUpdated: "Feb 2026"
  },
  {
    href: "/courses/mobile",
    title: "Mobile Engineering · React Native",
    subtitle: "Expo Router · Reanimated 3 · Native Modules",
    description: "Build production React Native apps for iOS and Android. Gesture-driven 60fps animations with Reanimated 3 worklets, Expo Router file-based navigation, native module bridging, and EAS CI/CD.",
    icon: "◉", iconColor: "#3DDC84",
    category: "Mobile", difficulty: "Intermediate",
    duration: "10h 50m", modules: 5, lessons: 22,
    tags: ["React Native", "Expo", "Reanimated", "TypeScript"],
    instructor: "Evan Bacon", rating: 4.8, reviewCount: 2040,
    prerequisites: ["React Basics"], lastUpdated: "Mar 2026"
  },
]

const DIFFICULTY_STYLES = {
  Beginner:     "bg-emerald-50 text-emerald-600 border-emerald-200",
  Intermediate: "bg-amber-50 text-amber-600 border-amber-200",
  Advanced:     "bg-orange-50 text-orange-600 border-orange-200",
}

const CATEGORIES = ["All", "Web", "AI & Data", "DevOps", "Systems", "Security", "Blockchain", "Mobile", "Discord"]

export function CoursesCatalog() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredCourses = COURSES.filter(c => activeCategory === "All" || c.category === activeCategory)

  return (
    <section id="courses" className="bg-gradient-to-b from-secondary/30 to-background border-t border-border pt-24 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header & Filter */}
        <div className="mb-16">
          <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Course Library</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
              Choose Your Path
            </h2>
            <div className="flex flex-wrap gap-2 max-w-2xl">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-foreground text-background shadow-md transform scale-105' 
                      : 'bg-background border border-border text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Engine */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.href}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Link
                  href={course.href}
                  className="group relative flex flex-col h-full rounded-3xl border border-border bg-background p-6 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Premium Subtle Gradient Top Border */}
                  <div className="absolute inset-x-0 top-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${course.iconColor}, transparent)` }} />

                  {/* Header: Icon, Difficulty, Rating */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl border border-border text-2xl shadow-sm bg-gradient-to-br from-background to-secondary group-hover:scale-110 transition-transform duration-300"
                      style={{ color: course.iconColor }}>
                      {course.icon}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${DIFFICULTY_STYLES[course.difficulty]}`}>
                        {course.difficulty}
                      </span>
                      <div className="flex items-center gap-1 bg-amber-50 rounded-full px-2 py-0.5 border border-amber-100">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-bold text-amber-700">{course.rating}</span>
                        <span className="text-[10px] text-amber-600/60">({course.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Title Area */}
                  <div className="mb-4 flex-1">
                    <h3 className="font-black text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: course.iconColor }}>
                      {course.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {course.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] px-2.5 py-1 rounded-md bg-secondary font-mono text-muted-foreground font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Meta: Instructor, Duration, Lessons */}
                    <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground">
                       <div className="flex items-center gap-1.5">
                         <User className="w-3.5 h-3.5" />
                         <span className="font-bold">{course.instructor}</span>
                       </div>
                       <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />{course.duration}
                        </span>
                        <span className="flex items-center gap-1 font-bold text-foreground">
                          <BookOpen className="w-3.5 h-3.5" />{course.lessons}
                        </span>
                       </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
