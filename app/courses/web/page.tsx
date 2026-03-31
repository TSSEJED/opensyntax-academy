import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

export const metadata: Metadata = {
  title: "Full-Stack Web Engineering — Next.js 16, Server Actions & PWA",
  description: "Master Next.js 16 App Router, Server Actions, Edge Middleware, PWA, and offline sync. The complete modern web development course.",
  keywords: ["Next.js Course", "Full-Stack Web Development", "Server Actions", "App Router", "React Course", "PWA Tutorial"],
}

const webModules: Module[] = [
  {
    id: "web-tier-1", title: "Tier 1: Foundations — Core Architecture",
    lessons: [
      {
        id: "html-css-semantics", title: "Semantic HTML5 & Modern CSS Layouts", duration: "30 min",
        description: "Master the structure of the web. Semantic tags, Flexbox vs Grid, and CSS Variable architecture.",
        content: `<h2>Semantic Foundations</h2>
<p>HTML is the skeleton of your application. Using semantic tags like <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, and <code>&lt;section&gt;</code> isn't just for SEO — it's for accessibility (A11y) and machine readability.</p>
<h3>Modern Layout Engine</h3>
<p>Modern CSS has moved beyond floats. We use <strong>Flexbox</strong> for 1D alignment and <strong>CSS Grid</strong> for 2D layouts. By combining these with <strong>CSS Custom Properties</strong> (variables), you create maintainable design systems.</p>`
      },
      {
        id: "js-logic", title: "JavaScript ES6+ Deep Dive", duration: "40 min",
        description: "Closures, Promises, and the Event Loop. Understand how JavaScript executes in the browser.",
        content: `<h2>Mastering JavaScript Internals</h2>
<p>To be a senior web engineer, you must understand the <strong>Event Loop</strong>. JavaScript is single-threaded, but it achieves concurrency through a callback queue and the web API stack.</p>
<pre><code class="language-javascript">// Understanding Promises
const data = await fetch('/api')
  .then(res => res.json())
  .catch(err => console.error(err));
</code></pre>`
      }
    ]
  },
  {
    id: "web-tier-2", title: "Tier 2: Intermediate — Framework Mastery",
    lessons: [
      {
        id: "react-19-hooks", title: "React 19 & Server Components", duration: "45 min",
        description: "The return of server-side logic in the UI. Next.js App Router, hooks, and data fetching.",
        content: `<h2>React Server Components (RSC)</h2>
<p>React 19 marks a paradigm shift. We no longer ship entire libraries to the client. With Server Components, the heavy lifting stays on the server, sending only the resulting HTML/UI to the user.</p>
<h3>The App Router</h3>
<p>Next.js 16 leverages the App Router to provide file-based routing, layout persistence, and built-in loading/error boundaries.</p>`
      }
    ]
  },
  {
    id: "web-tier-3", title: "Tier 3: Production — Bleeding Edge",
    lessons: [
      {
        id: "edge-slm", title: "Edge Caching & Local SLMs", duration: "50 min",
        description: "Zero-latency deployments using Vercel Edge and client-side AI processing via WebAssembly.",
        content: `<h2>High-Performance Edge Architecture</h2>
<p>Tier 3 engineering involves moving logic as close to the user as possible. <strong>Next.js Edge Middleware</strong> runs at the CDN level, allowing for instant A/B testing and geolocation redirects.</p>
<h3>Local AI Processing</h3>
<p>Using <strong>Transformers.js</strong>, we can execute Small Language Models (SLMs) directly in the browser via WebAssembly. This ensures user data never leaves the device while providing rich AI features like semantic search or text analysis.</p>`
      }
    ]
  }
]

export default function WebCoursePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Full-Stack Web Engineering"
        description="Next.js 16, Server Actions, Edge Middleware, PWA, and offline sync — the complete modern web track."
        category="Web"
        accentColor="oklch(0.72 0.17 196)"
        modules={webModules}
      />
    </div>
  )
}
