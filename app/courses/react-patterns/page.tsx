import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

export const metadata: Metadata = {
  title: "Advanced React Patterns — Compound Components & Suspense",
  description: "Master patterns used by world-class React libraries. Compound components, render props, Suspense architecture, concurrent features, and performance optimization.",
  keywords: ["React Course", "Advanced React", "Compound Components", "React Suspense", "useTransition", "React Performance"],
}

const reactPatternsModules: Module[] = [
  {
    id: "react-tier-1", title: "Tier 1: Foundations — Modern State & Hooks",
    lessons: [
      {
        id: "hooks-fundamentals", title: "useState, useEffect & Custom Hooks", duration: "30 min",
        description: "Moving beyond classes. Managing local state and side effects with the primary React hooks.",
        content: `<h2>Functional React</h2>
<p>In modern React, everything is a function. We use <strong>useState</strong> for persistent values and <strong>useEffect</strong> to synchronize with external systems.</p>
<h3>Custom Hooks</h3>
<p>The real power of React is logic reuse. By creating <strong>Custom Hooks</strong>, you can extract complex state logic (like fetching or form handling) into reusable, testable functions.</p>`
      }
    ]
  },
  {
    id: "react-tier-2", title: "Tier 2: Intermediate — Advanced Composition",
    lessons: [
      {
        id: "compound-render-props", title: "Compound Components & Render Props", duration: "45 min",
        description: "Master the patterns used by Radix UI and Headless UI. Implicit context and inversion of control.",
        content: `<h2>Compound Components</h2>
<p>Allows for highly flexible UI where children communicate implicitly. This pattern is used to build robust Tabs, Modals, and Accordions.</p>
<pre><code class="language-tsx"><Tabs>
  <TabList>
    <Tab>Account</Tab>
  </TabList>
  <TabPanel>Settings</TabPanel>
</Tabs></code></pre>
<h3>Render Props</h3>
<p>A technique for sharing code between React components using a prop whose value is a function, giving control back to the consumer.</p>`
      }
    ]
  },
  {
    id: "react-tier-3", title: "Tier 3: Production — Performance & Architecture",
    lessons: [
      {
        id: "concurrent-suspense", title: "Concurrent Rendering & Suspense", duration: "60 min",
        description: "Optimizing for low-end devices. useTransition, useDeferredValue, and Suspense-driven data fetching.",
        content: `<h2>Concurrent Mode</h2>
<p>React 19 makes UIs feel faster by allowing rendering to be interruptible. We use <strong>useTransition</strong> to prioritize urgent updates (input) over non-urgent ones (list loading).</p>
<h3>Suspense Architecture</h3>
<p><strong>Suspense</strong> allows us to declaratively wait for anything—data, code, or images. By coordinating loading states across the app, we eliminate 'loading spinners' and layout shift.</p>
<p><strong>Optimization Tip:</strong> Use <strong>React.memo</strong> strategically. Don't wrap everything; only components with expensive renders or those receiving deep objects from stable references.</p>`
      }
    ]
  }
]

export default function ReactPatternsPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="React Advanced Patterns"
        description="Master the building blocks of world-class React libraries. From custom hooks and compound components to concurrent rendering and performance profiling."
        category="Web"
        accentColor="#61DAFB"
        modules={reactPatternsModules}
        instructor="Dan Abramov"
        rating={4.7}
        reviewCount={2200}
        lastUpdated="Mar 2026"
      />
    </div>
  )
}
