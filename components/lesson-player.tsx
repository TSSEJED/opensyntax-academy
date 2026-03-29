"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, CheckCircle2, Circle, BookOpen, Menu, X, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export type Lesson = {
  id: string
  title: string
  description: string
  content: string
  duration: string
  completed?: boolean
}

export type Module = {
  id: string
  title: string
  lessons: Lesson[]
}

interface LessonPlayerProps {
  title: string
  description: string
  category: string
  accentColor?: string
  modules: Module[]
}

export function LessonPlayer({ title, description, category, accentColor = "oklch(0.72 0.17 196)", modules }: LessonPlayerProps) {
  const allLessons = modules.flatMap((m) => m.lessons)
  const [activeId, setActiveId] = useState(allLessons[0]?.id ?? "")
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const activeLesson = allLessons.find((l) => l.id === activeId)
  const activeIdx   = allLessons.findIndex((l) => l.id === activeId)
  const progress    = allLessons.length > 0 ? (completed.size / allLessons.length) * 100 : 0

  const toggle = (id: string) => setCompleted((prev) => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  return (
    <div className="flex min-h-screen pt-[60px]">
      {/* ── SIDEBAR ──────────────────────────────────────── */}
      <aside className={cn(
        "flex-shrink-0 border-r border-border bg-sidebar sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden transition-[width] duration-250 z-20",
        sidebarOpen ? "w-72 lg:w-80" : "w-0"
      )}>
        <div className="min-w-72 lg:min-w-80">
          {/* Header */}
          <div className="px-5 py-5 border-b border-sidebar-border">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={13} style={{ color: accentColor }} aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accentColor }}>{category}</span>
            </div>
            <p className="text-xs font-semibold text-foreground leading-snug mb-1">{title}</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">{description}</p>

            {/* Progress */}
            <div className="flex justify-between text-[11px] text-muted-foreground mb-2">
              <span>Progress</span>
              <span className="text-foreground font-medium">{completed.size}/{allLessons.length} lessons</span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${accentColor}, oklch(0.60 0.22 295))` }}
                role="progressbar" aria-valuenow={completed.size} aria-valuemin={0} aria-valuemax={allLessons.length}
              />
            </div>
          </div>

          {/* Modules */}
          <nav aria-label="Course modules">
            {modules.map((mod) => (
              <div key={mod.id} className="border-b border-sidebar-border last:border-b-0">
                <p className="px-5 py-3 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{mod.title}</p>
                {mod.lessons.map((lesson) => {
                  const isActive = lesson.id === activeId
                  const isDone   = completed.has(lesson.id)
                  return (
                    <button key={lesson.id} onClick={() => setActiveId(lesson.id)}
                      className={cn(
                        "w-full flex items-start gap-3 px-5 py-3 text-left transition-colors",
                        isActive ? "bg-accent/8 border-l-2" : "border-l-2 border-transparent hover:bg-secondary/50"
                      )}
                      style={isActive ? { borderLeftColor: accentColor } : {}}>
                      <div className={cn("mt-0.5 flex-shrink-0 transition-colors", isDone ? "text-accent" : "text-muted-foreground/40")}>
                        {isDone ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                      </div>
                      <div className="min-w-0">
                        <p className={cn("text-xs leading-snug font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>
                          {lesson.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground/50 mt-0.5">{lesson.duration}</p>
                      </div>
                      {isActive && <ChevronRight size={12} className="ml-auto mt-0.5 flex-shrink-0" style={{ color: accentColor }} />}
                    </button>
                  )
                })}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* ── MAIN ─────────────────────────────────────────── */}
      <main className="flex-1 min-w-0 px-6 md:px-10 lg:px-16 py-8 max-w-3xl overflow-y-auto">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-secondary hover:bg-card transition-colors text-muted-foreground hover:text-foreground flex-shrink-0">
            {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground overflow-hidden">
            <Link href="/" className="hover:text-foreground transition-colors shrink-0 flex items-center gap-1">
              <ArrowLeft size={11} />Courses
            </Link>
            <ChevronRight size={11} className="shrink-0" />
            <span className="text-foreground/80 truncate max-w-[200px]">{title}</span>
            {activeLesson && (
              <>
                <ChevronRight size={11} className="shrink-0" />
                <span className="text-foreground truncate max-w-[160px]">{activeLesson.title}</span>
              </>
            )}
          </nav>
        </div>

        {activeLesson ? (
          <article>
            {/* Lesson header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border"
                  style={{ background: `color-mix(in oklch, ${accentColor} 12%, transparent)`, color: accentColor, borderColor: `color-mix(in oklch, ${accentColor} 28%, transparent)` }}>
                  {category}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {activeLesson.duration} · Lesson {activeIdx + 1} of {allLessons.length}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" style={{ letterSpacing: "-0.04em" }}>
                {activeLesson.title}
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">{activeLesson.description}</p>
            </div>

            <div className="h-px bg-border mb-8" />

            {/* Content */}
            <div
              className="lesson-content text-muted-foreground text-sm"
              dangerouslySetInnerHTML={{ __html: activeLesson.content }}
            />

            {/* Navigation bar */}
            <div className="mt-14 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {activeIdx > 0 && (
                  <button onClick={() => setActiveId(allLessons[activeIdx - 1].id)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium border border-border bg-secondary hover:bg-card text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronLeft size={13} />Prev
                  </button>
                )}
                <button onClick={() => toggle(activeLesson.id)}
                  className={cn("flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-semibold transition-all",
                    completed.has(activeLesson.id)
                      ? "bg-secondary text-muted-foreground hover:text-foreground border border-border"
                      : "text-primary-foreground hover:opacity-90"
                  )}
                  style={completed.has(activeLesson.id) ? {} : { background: accentColor }}>
                  <CheckCircle2 size={14} />
                  {completed.has(activeLesson.id) ? "Mark Incomplete" : "Mark Complete"}
                </button>
              </div>

              {activeIdx < allLessons.length - 1 ? (
                <button onClick={() => { toggle(activeLesson.id); setActiveId(allLessons[activeIdx + 1].id) }}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold border border-border bg-secondary text-foreground hover:bg-card transition-colors">
                  Next Lesson <ChevronRight size={13} />
                </button>
              ) : (
                <Link href="/"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, oklch(0.72 0.17 196), oklch(0.60 0.22 295))" }}>
                  ✓ Course Complete — Browse More
                </Link>
              )}
            </div>
          </article>
        ) : (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <BookOpen size={32} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm">Select a lesson from the sidebar to begin</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
