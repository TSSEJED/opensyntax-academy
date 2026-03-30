"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { BookOpen, CheckCircle2, Trophy, ArrowRight, LayoutDashboard, Search, Command, AlertCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const courses = [
  { slug: "web", title: "Web Engineering", color: "oklch(0.72 0.17 196)", lessons: 6 },
  { slug: "system-design", title: "System Design", color: "#E44D26", lessons: 8 },
  { slug: "rust", title: "Rust & Systems", color: "#DEA584", lessons: 10 },
  { slug: "discord", title: "Discord Dev", color: "#7289DA", lessons: 5 },
  { slug: "python", title: "Python & Data", color: "#FFD43B", lessons: 6 },
  { slug: "ai-ml", title: "AI/ML Engineering", color: "oklch(0.70 0.20 300)", lessons: 5 },
  { slug: "typescript", title: "TS Mastery", color: "#3178C6", lessons: 5 },
  { slug: "devops", title: "DevOps", color: "oklch(0.68 0.18 145)", lessons: 6 },
  { slug: "databases", title: "Databases", color: "oklch(0.65 0.15 230)", lessons: 5 },
  { slug: "react-patterns", title: "React Patterns", color: "#61DAFB", lessons: 5 },
  { slug: "cybersecurity", title: "Cybersecurity", color: "oklch(0.63 0.20 25)", lessons: 4 },
  { slug: "blockchain", title: "Web3/Blockchain", color: "oklch(0.72 0.17 55)", lessons: 4 },
  { slug: "mobile", title: "Mobile Apps", color: "oklch(0.70 0.18 330)", lessons: 5 },
]

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [progressData, setProgressData] = useState<Record<string, number>>({})

  useEffect(() => {
    setMounted(true)
    const data: Record<string, number> = {}
    
    courses.forEach(course => {
      const storageKey = `opensyntax-progress-${course.slug}`
      try {
        const saved = localStorage.getItem(storageKey)
        if (saved) {
          const completed = JSON.parse(saved)
          data[course.slug] = Array.isArray(completed) ? completed.length : 0
        } else {
          data[course.slug] = 0
        }
      } catch {
        data[course.slug] = 0
      }
    })
    
    setProgressData(data)
  }, [])

  const totalLessons = courses.reduce((acc, c) => acc + c.lessons, 0)
  const completedLessons = Object.values(progressData).reduce((acc, val) => acc + val, 0)
  const overallProgress = (completedLessons / totalLessons) * 100

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-20">
        <header className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <LayoutDashboard size={14} className="text-accent" />
              <p className="text-xs text-accent font-bold uppercase tracking-widest">Student Portal</p>
            </div>
            <h1 className="text-4xl font-bold text-foreground tracking-tight">Your Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Track your learning journey across all OpenSyntax paths. Your data is stored locally in your browser.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
             <div className="bg-card border border-border rounded-xl px-5 py-3 shadow-sm min-w-[140px] flex 1 items-center justify-between">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Completion</p>
                  <p className="text-2xl font-bold text-foreground">{mounted ? completedLessons : 0} / {totalLessons}</p>
                </div>
             </div>
             <div className="bg-accent/5 border border-accent/20 rounded-xl px-5 py-3 shadow-sm min-w-[140px] flex 1 items-center justify-between">
                <div>
                  <p className="text-[10px] text-accent uppercase font-bold tracking-wider mb-1">XP Level</p>
                  <p className="text-2xl font-bold text-accent">{mounted ? Math.floor(completedLessons * 120) : 0}</p>
                </div>
             </div>
             
             <Link href="/certificates" className="group flex flex-col justify-center bg-card border border-border hover:border-primary/50 hover:bg-secondary/50 rounded-xl px-5 py-3 shadow-sm min-w-[140px] transition-all">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                     <Trophy size={14} />
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider group-hover:text-primary transition-colors">Certifications</p>
                </div>
                <p className="text-sm font-bold text-foreground">View Awards <ArrowRight className="inline w-3 h-3 ml-1 text-muted-foreground/50 group-hover:translate-x-1 group-hover:text-primary transition-all" /></p>
             </Link>
          </div>
        </header>

        {/* Known Bug Alert Section */}
        <section className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
           <Link href="/bugs" className="group flex items-center justify-between gap-4 p-4 bg-red-500/5 border border-red-500/10 rounded-2xl hover:bg-red-500/10 transition-all">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-red-500/20 rounded-lg text-red-600 group-hover:scale-110 transition-transform">
                    <AlertCircle size={18} />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-0.5">Known Platform Issue</p>
                    <p className="text-sm text-red-600/80 font-medium leading-relaxed">Dashboard completion counts may occasionally lag behind course progress. We are standardizing keys in v3.1.0.</p>
                 </div>
              </div>
              <ArrowRight size={20} className="text-red-500/40 group-hover:translate-x-1 transition-transform" />
           </Link>
        </section>

        <section className="mb-10 min-h-[4px] bg-secondary rounded-full overflow-hidden relative">
           <motion.div 
             className="absolute inset-y-0 left-0 bg-accent rounded-full"
             initial={{ width: 0 }}
             animate={{ width: overallProgress + "%" }}
             transition={{ duration: 1, ease: "easeOut" }}
           />
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
           {courses.map((course, idx) => {
              const completed = progressData[course.slug] || 0
              const percent = (completed / course.lessons) * 100
              const isFinished = completed === course.lessons && course.lessons > 0

              return (
                <motion.div
                  key={course.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-lg hover:border-border/80",
                    isFinished && "border-accent/40 bg-accent/5 shadow-accent/5"
                  )}
                >
                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between">
                      <div 
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary transition-transform group-hover:scale-110"
                        style={{ background: course.color + "22", border: `1px solid ${course.color}44` }}
                      >
                         <BookOpen size={16} style={{ color: course.color }} />
                      </div>
                      {isFinished && (
                         <Trophy size={16} className="text-accent" />
                      )}
                    </div>

                    <h3 className="mb-1 text-sm font-bold text-foreground tracking-tight underline-offset-4 group-hover:underline">
                       {course.title}
                    </h3>
                    <div className="mb-4 flex items-center justify-between text-[11px] text-muted-foreground font-medium">
                      <span>{completed} / {course.lessons} Lessons</span>
                      <span className={isFinished ? "text-accent font-bold" : ""}>{Math.round(percent)}%</span>
                    </div>

                    <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden mb-5">
                       <motion.div 
                         className="h-full rounded-full"
                         style={{ background: course.color }}
                         initial={{ width: 0 }}
                         animate={{ width: percent + "%" }}
                         transition={{ duration: 0.8, delay: 0.2 }}
                       />
                    </div>

                    <Link 
                      href={`/courses/${course.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-foreground transition-all hover:gap-3"
                    >
                      {isFinished ? "Replay Content" : "Continue Learning"}
                      <ArrowRight size={14} className="text-muted-foreground/50" />
                    </Link>
                  </div>
                  
                  {/* Background decoration */}
                  <div 
                    className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full blur-[60px] opacity-10 transition-opacity group-hover:opacity-20 pointer-events-none"
                    style={{ background: course.color }}
                  />
                </motion.div>
              )
           })}
        </div>

        {/* Search Call to Action */}
        <section className="mt-16 bg-card border border-border rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 group">
          <div className="max-w-md">
             <div className="flex items-center gap-2 mb-3">
               <div className="p-2 bg-secondary rounded-lg">
                 <Search size={18} className="text-accent" />
               </div>
               <h3 className="text-lg font-bold">Fast-track with Search</h3>
             </div>
             <p className="text-sm text-muted-foreground leading-relaxed">
               Need to find a specific concept? Use the global search to jump directly to any lesson.
             </p>
          </div>
          
          <div className="flex flex-col items-center gap-3">
             <button 
               onClick={() => {
                 const e = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, metaKey: true });
                 document.dispatchEvent(e);
               }}
               className="flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-2xl font-bold text-sm transition-all hover:gap-4 hover:scale-105 active:scale-95 shadow-xl"
             >
               Open Search Palette
               <div className="flex items-center gap-1 opacity-60 bg-background/20 px-2 py-0.5 rounded text-[10px] font-mono border border-background/10">
                 <Command size={10} /> K
               </div>
             </button>
             <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Universal Hotkey Enabled</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
