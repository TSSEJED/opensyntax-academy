import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const webModules: Module[] = [
  {
    id: "app-router",
    title: "Module 1 — App Router Mastery",
    lessons: [
      {
        id: "parallel-routes",
        title: "Parallel Routes & Intercepted Routes",
        description: "Build complex UI patterns like modals that preserve URL state with App Router.",
        duration: "20 min",
        content: `
          <h2 class="text-lg font-semibold text-foreground mb-3">App Router Mastery</h2>
          <p>Next.js 16 App Router unlocks powerful layout patterns impossible in the Pages Router. Two of the most important are <strong>Parallel Routes</strong> and <strong>Intercepted Routes</strong>.</p>
          <br/>
          <h3 class="text-sm font-semibold text-foreground mb-2">Parallel Routes (@slot)</h3>
          <p>Parallel routes let you render multiple pages in the same layout simultaneously. Use the <code class="bg-card border border-border rounded px-1 py-0.5 text-xs font-mono">@folder</code> convention to create named slots.</p>
          <br/>
          <pre class="rounded-lg bg-card border border-border p-4 text-xs font-mono text-foreground overflow-auto"><code>// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,   // @analytics slot
  team,        // @team slot
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    &lt;div className="grid grid-cols-2 gap-4"&gt;
      {children}
      {analytics}
      {team}
    &lt;/div&gt;
  )
}</code></pre>
          <br/>
          <h3 class="text-sm font-semibold text-foreground mb-2">Intercepted Routes (..)</h3>
          <p>Intercepted routes let you show a route inside a different context — like rendering a photo in a modal when navigated from a feed, while still being a full page when directly accessed via URL.</p>
          <br/>
          <pre class="rounded-lg bg-card border border-border p-4 text-xs font-mono text-foreground overflow-auto"><code>// app/feed/@modal/(..)photos/[id]/page.tsx
// This intercepts /photos/[id] when navigated from /feed
export default function PhotoModal({ params }: { params: { id: string } }) {
  return &lt;Modal&gt;&lt;Photo id={params.id} /&gt;&lt;/Modal&gt;
}</code></pre>
        `,
      },
      {
        id: "use-cache",
        title: "Cache Components & use cache",
        description: "Master Next.js 16 cache components for granular, explicit caching control.",
        duration: "15 min",
        content: `
          <h2 class="text-lg font-semibold text-foreground mb-3">Cache Components in Next.js 16</h2>
          <p>Next.js 16 introduced the <code class="bg-card border border-border rounded px-1 py-0.5 text-xs font-mono">'use cache'</code> directive — a compiler-level primitive for explicit, granular caching of pages, components, and functions.</p>
          <br/>
          <pre class="rounded-lg bg-card border border-border p-4 text-xs font-mono text-foreground overflow-auto"><code>// next.config.mjs
const nextConfig = {
  cacheComponents: true, // enable the feature
}

// app/blog/[slug]/page.tsx
'use cache'

export default async function BlogPost({ params }) {
  const post = await fetchPost(params.slug)
  return &lt;article&gt;{post.content}&lt;/article&gt;
}

// Or at function level:
export async function getTopPosts() {
  'use cache'
  return await db.query("SELECT * FROM posts ORDER BY views DESC LIMIT 10")
}</code></pre>
          <br/>
          <p>Use <code class="bg-card border border-border rounded px-1 py-0.5 text-xs font-mono">revalidateTag('posts', 'max')</code> in a Server Action to invalidate cached content and trigger background revalidation.</p>
        `,
      },
    ],
  },
  {
    id: "server-actions",
    title: "Module 2 — Server-Side Logic",
    lessons: [
      {
        id: "server-actions-deep",
        title: "Server Actions Without Client JS",
        description: "Handle complex form submissions entirely on the server with zero client-side JavaScript.",
        duration: "18 min",
        content: `
          <h2 class="text-lg font-semibold text-foreground mb-3">Server Actions for Progressive Enhancement</h2>
          <p>Server Actions are async functions that run on the server. When used with HTML forms, they work even with JavaScript disabled — true progressive enhancement.</p>
          <br/>
          <pre class="rounded-lg bg-card border border-border p-4 text-xs font-mono text-foreground overflow-auto"><code>"use server"

import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
})

export async function submitWaitlist(formData: FormData) {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
  })

  if (!parsed.success) {
    return { error: "Invalid input" }
  }

  await db.waitlist.create({ data: parsed.data })
  revalidateTag("waitlist-count", "hours")
  redirect("/thank-you")
}</code></pre>
          <br/>
          <p>Pair with <code class="bg-card border border-border rounded px-1 py-0.5 text-xs font-mono">useActionState</code> on the client to get pending and error states without writing custom fetch logic.</p>
        `,
      },
    ],
  },
  {
    id: "pwa",
    title: "Module 3 — PWA & Offline Sync",
    lessons: [
      {
        id: "pwa-offline",
        title: "PWA & Offline Sync",
        description: "Make the platform work in low-connectivity environments with service workers and background sync.",
        duration: "25 min",
        content: `
          <h2 class="text-lg font-semibold text-foreground mb-3">Progressive Web App & Offline First</h2>
          <p>A PWA allows users in low-connectivity areas — like parts of Tunisia or rural regions — to access course content without an active internet connection. The two key APIs are <strong>Cache Storage</strong> and <strong>Background Sync</strong>.</p>
          <br/>
          <pre class="rounded-lg bg-card border border-border p-4 text-xs font-mono text-foreground overflow-auto"><code>// public/sw.js — Service Worker
const CACHE_NAME = "opensyntax-v1"
const OFFLINE_URLS = ["/", "/courses/discord", "/courses/web"]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
  )
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(
      (cached) => cached ?? fetch(event.request)
    )
  )
})</code></pre>
          <br/>
          <h3 class="text-sm font-semibold text-foreground mb-2">next-pwa Integration</h3>
          <pre class="rounded-lg bg-card border border-border p-4 text-xs font-mono text-foreground overflow-auto"><code>// next.config.mjs
import withPWA from "next-pwa"

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [/* ... */],
})({
  // your existing next config
})</code></pre>
          <br/>
          <p>Add a <code class="bg-card border border-border rounded px-1 py-0.5 text-xs font-mono">manifest.json</code> and <code class="bg-card border border-border rounded px-1 py-0.5 text-xs font-mono">icon-192x192.png</code> to <code class="bg-card border border-border rounded px-1 py-0.5 text-xs font-mono">public/</code> to make the app installable on mobile and desktop.</p>
        `,
      },
    ],
  },
]

export default function WebCoursePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Full-Stack Web Engineering"
        description="Next.js 16, Server Actions, Edge Middleware, PWA, and offline sync — the complete web track."
        modules={webModules}
      />
    </div>
  )
}
