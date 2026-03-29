"use client"

import { useState } from "react"
import { ChevronRight, CheckCircle2, Circle, BookOpen, ExternalLink } from "lucide-react"
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
  modules: Module[]
  accentColor?: string
}

export function LessonPlayer({ title, description, modules }: LessonPlayerProps) {
  const allLessons = modules.flatMap((m) => m.lessons)
  const [activeId, setActiveId] = useState(allLessons[0]?.id ?? "")
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  const activeLesson = allLessons.find((l) => l.id === activeId)

  const toggleComplete = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row pt-16">
      {/* Sidebar */}
      <aside className="w-full md:w-72 lg:w-80 border-r border-border bg-sidebar flex-shrink-0 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-auto">
        <div className="px-4 py-6 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={14} className="text-accent" aria-hidden="true" />
            <span className="text-xs font-semibold text-accent uppercase tracking-widest">{title}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed text-pretty">{description}</p>
          {/* Progress */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Progress</span>
              <span>{completed.size}/{allLessons.length}</span>
            </div>
            <div className="h-1 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{ width: `${allLessons.length > 0 ? (completed.size / allLessons.length) * 100 : 0}%` }}
                role="progressbar"
                aria-valuenow={completed.size}
                aria-valuemin={0}
                aria-valuemax={allLessons.length}
              />
            </div>
          </div>
        </div>

        <nav aria-label="Course modules">
          {modules.map((mod) => (
            <div key={mod.id} className="border-b border-border last:border-b-0">
              <p className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-widest">{mod.title}</p>
              {mod.lessons.map((lesson) => {
                const isActive = lesson.id === activeId
                const isDone = completed.has(lesson.id)
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveId(lesson.id)}
                    className={cn(
                      "w-full flex items-start gap-3 px-4 py-3 text-left transition-colors",
                      isActive
                        ? "bg-accent/10 border-l-2 border-accent"
                        : "border-l-2 border-transparent hover:bg-secondary"
                    )}
                  >
                    {isDone ? (
                      <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-accent" aria-hidden="true" />
                    ) : (
                      <Circle size={14} className="mt-0.5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                    )}
                    <div className="min-w-0">
                      <p className={cn("text-xs font-medium leading-snug", isActive ? "text-foreground" : "text-muted-foreground")}>
                        {lesson.title}
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-0.5">{lesson.duration}</p>
                    </div>
                    {isActive && <ChevronRight size={12} className="ml-auto mt-0.5 flex-shrink-0 text-accent" aria-hidden="true" />}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-6 md:px-10 lg:px-16 py-10 max-w-3xl">
        {activeLesson ? (
          <article>
            <div className="mb-6 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{title}</span>
              <ChevronRight size={12} className="text-muted-foreground" aria-hidden="true" />
              <span className="text-xs text-foreground">{activeLesson.title}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-balance mb-2">
              {activeLesson.title}
            </h1>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{activeLesson.description}</p>

            {/* Content */}
            <div
              className="prose prose-invert prose-sm max-w-none text-muted-foreground leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: activeLesson.content }}
            />

            {/* Complete button */}
            <div className="mt-12 flex items-center gap-4 pt-8 border-t border-border">
              <button
                onClick={() => toggleComplete(activeLesson.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all",
                  completed.has(activeLesson.id)
                    ? "bg-secondary text-muted-foreground hover:text-foreground"
                    : "bg-accent text-accent-foreground hover:bg-accent/90"
                )}
              >
                <CheckCircle2 size={15} aria-hidden="true" />
                {completed.has(activeLesson.id) ? "Mark Incomplete" : "Mark Complete"}
              </button>

              {/* Next lesson */}
              {(() => {
                const idx = allLessons.findIndex((l) => l.id === activeId)
                const next = allLessons[idx + 1]
                if (!next) return null
                return (
                  <button
                    onClick={() => setActiveId(next.id)}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Next Lesson
                    <ChevronRight size={14} aria-hidden="true" />
                  </button>
                )
              })()}
            </div>
          </article>
        ) : (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <ExternalLink size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select a lesson to begin</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
