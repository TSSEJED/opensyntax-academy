import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const modules: Module[] = [
  {
    id: "compound",
    title: "Module 1 \u2014 Compound Components",
    lessons: [
      {
        id: "compound-pattern",
        title: "Compound Component Pattern",
        duration: "24 min",
        description: "Build flexible, composable APIs like Radix UI using createContext and implicit state sharing.",
        content: `<h2>The Compound Component Pattern</h2>
<p>Compound components share implicit state via Context, creating APIs that feel natural — like Radix UI, Headless UI, and React Select.</p>
<pre><code>import { createContext, useContext, useId, useState } from "react"

type SelectCtx = {
  value: string; onChange: (v: string) =&gt; void
  open: boolean; setOpen: (v: boolean) =&gt; void
}
const Ctx = createContext&lt;SelectCtx | null&gt;(null)
const useSelect = () =&gt; { const c = useContext(Ctx); if(!c) throw Error(); return c }

function Select({ value, onChange, children }: {
  value: string; onChange: (v: string) =&gt; void; children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return &lt;Ctx.Provider value={{ value, onChange, open, setOpen }}&gt;
    &lt;div className="relative"&gt;{children}&lt;/div&gt;
  &lt;/Ctx.Provider&gt;
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { open, setOpen, value } = useSelect()
  return &lt;button aria-expanded={open} onClick={() =&gt; setOpen(!open)}&gt;{value || children}&lt;/button&gt;
}

function Option({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useSelect()
  return &lt;li role="option" aria-selected={ctx.value === value}
    onClick={() =&gt; { ctx.onChange(value); ctx.setOpen(false) }}&gt;
    {children}
  &lt;/li&gt;
}

Select.Trigger = Trigger
Select.Content = Content
Select.Option  = Option

// Usage — no prop drilling, clean declarative API
&lt;Select value={country} onChange={setCountry}&gt;
  &lt;Select.Trigger&gt;Select country&lt;/Select.Trigger&gt;
  &lt;Select.Content&gt;
    &lt;Select.Option value="TN"&gt;Tunisia&lt;/Select.Option&gt;
    &lt;Select.Option value="FR"&gt;France&lt;/Select.Option&gt;
  &lt;/Select.Content&gt;
&lt;/Select&gt;</code></pre>`,
      },
    ],
  },
]

export default function CoursePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="React Advanced Patterns"
        description="Compound components, render props, Suspense architecture, concurrent features, and Profiler optimization."
        category="Web"
        accentColor="oklch(0.72 0.14 195)"
        modules={modules}
      />
    </div>
  )
}
