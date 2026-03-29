import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const webModules: Module[] = [
  {
    id: "app-router", title: "Module 1 — App Router Mastery",
    lessons: [
      {
        id: "parallel-routes", title: "Parallel & Intercepted Routes", duration: "20 min",
        description: "Build complex UI patterns like modals that preserve URL state using App Router's slot system.",
        content: `<h2>Parallel & Intercepted Routes</h2>
<p>Next.js 16 App Router unlocks powerful layout patterns impossible in the Pages Router. Two of the most important are <strong>Parallel Routes</strong> and <strong>Intercepted Routes</strong> — together they enable Instagram-style photo modals and multi-panel dashboards.</p>
<h3>Parallel Routes — @slot Convention</h3>
<p>Parallel routes let you render multiple pages in the same layout simultaneously using the <code>@folder</code> convention.</p>
<pre><code>// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,   // maps to app/dashboard/@analytics/page.tsx
  team,        // maps to app/dashboard/@team/page.tsx
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    &lt;div className="grid grid-cols-[1fr_320px] gap-6"&gt;
      &lt;div&gt;{children}&lt;/div&gt;
      &lt;aside className="space-y-4"&gt;
        {analytics}
        {team}
      &lt;/aside&gt;
    &lt;/div&gt;
  )
}</code></pre>
<h3>Intercepted Routes — (..) Segments</h3>
<p>Intercepted routes show a route inside a different context. Navigate from /feed to a photo and see a modal. Access /photos/[id] directly and see the full page — same component, different context.</p>
<pre><code>// app/feed/@modal/(..)photos/[id]/page.tsx
export default function PhotoModal({ params }: { params: { id: string } }) {
  return (
    &lt;Modal&gt;
      &lt;Photo id={params.id} /&gt;
    &lt;/Modal&gt;
  )
}

// app/dashboard/@analytics/default.tsx  — prevents crash on hard nav
export default function AnalyticsDefault() {
  return &lt;div className="animate-pulse h-64 rounded-xl bg-card" /&gt;
}</code></pre>`,
        quiz: [
          {
            question: "Which folder convention is used to define Parallel Routes in Next.js App Router?",
            options: ["(folder)", "[folder]", "@folder", "_folder"],
            correctIndex: 2,
            explanation: "The @folder convention maps a directory into a named slot prop in its parent layout.tsx."
          },
          {
            question: "What does the (..) notation do in Intercepted Routes?",
            options: ["Creates an API route", "Matches a segment exactly one level above", "Defines a dynamic parameter", "Creates a catch-all route"],
            correctIndex: 1,
            explanation: "Similar to relative pathing in the terminal (..), in routing it intercepts an existing route one segment up the tree."
          }
        ]
      },
      {
        id: "use-cache", title: "The 'use cache' Directive", duration: "15 min",
        description: "Master Next.js 16 explicit caching primitives for page, component, and function level control.",
        content: `<h2>The 'use cache' Directive in Next.js 16</h2>
<p>Next.js 16 introduced <code>'use cache'</code> — a compiler-level primitive for explicit, granular caching. Unlike implicit fetch caching, it gives you per-component and per-function control with structured expiry.</p>
<h3>Enabling & Page-Level Caching</h3>
<pre><code>// next.config.mjs
const nextConfig = {
  experimental: { cacheComponents: true },
}

// app/blog/[slug]/page.tsx
'use cache'
import { cacheLife } from 'next/cache'

export default async function BlogPost({ params }) {
  cacheLife('hours')
  const post = await db.post.findUnique({ where: { slug: params.slug } })
  return &lt;article&gt;{post.content}&lt;/article&gt;
}</code></pre>
<h3>Component & Function-Level Caching</h3>
<pre><code>// components/trending-sidebar.tsx
'use cache'
import { cacheTag, cacheLife } from 'next/cache'

export async function TrendingSidebar() {
  cacheTag('trending')
  cacheLife('minutes')
  const data = await fetchTrending()
  return &lt;aside&gt;{data.map(item =&gt; &lt;Item key={item.id} {...item} /&gt;)}&lt;/aside&gt;
}

// lib/queries.ts
export async function getTopPosts() {
  'use cache'
  cacheTag('posts')
  cacheLife('days')
  return db.post.findMany({ orderBy: { views: 'desc' }, take: 10 })
}

// Invalidate on mutation
'use server'
import { revalidateTag } from 'next/cache'
export async function publishPost(data) {
  await db.post.create({ data })
  revalidateTag('posts')
  revalidateTag('trending')
}</code></pre>`,
        quiz: [
          {
            question: "Instead of implicit fetch caching, what does the 'use cache' directive offer?",
            options: ["Global layout immutability", "Per-component and per-function level caching control", "Client-side browser cache control", "Service worker generation"],
            correctIndex: 1,
            explanation: "It allows you to specify caching directives explicitly at the component or function level returning complex objects."
          }
        ]
      },
      {
        id: "edge-middleware", title: "Edge Middleware & Geolocation", duration: "18 min",
        description: "Build authentication, A/B testing, and geo-routing that runs at the CDN edge before any page renders.",
        content: `<h2>Edge Middleware</h2>
<p>Edge Middleware runs before a request hits your server — at the CDN edge — with zero cold start. Perfect for auth guards, locale detection, and feature flags.</p>
<h3>Auth Guard + Geo-Routing</h3>
<pre><code>// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const { pathname, nextUrl } = req
  const country = req.geo?.country ?? 'US'

  // Geo-based locale redirect
  if (country === 'TN' && !pathname.startsWith('/ar')) {
    const url = nextUrl.clone()
    url.pathname = '/ar' + pathname
    return NextResponse.redirect(url)
  }

  // Auth guard on dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const token = req.cookies.get('auth-token')?.value
    if (!token) return NextResponse.redirect(new URL('/login', req.url))

    const payload = await verifyJWT(token)
    if (!payload) return NextResponse.redirect(new URL('/login', req.url))

    const res = NextResponse.next()
    res.headers.set('x-user-id', payload.sub as string)
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/((?!_next|api|favicon).*)'],
}</code></pre>
<h3>A/B Testing at the Edge</h3>
<pre><code>export async function middleware(req: NextRequest) {
  const bucket = req.cookies.get('ab-bucket')?.value
  const variant = bucket ?? (Math.random() > 0.5 ? 'a' : 'b')

  const url = req.nextUrl.clone()
  url.pathname = \`/_experiments/\${variant}\${url.pathname}\`

  const res = NextResponse.rewrite(url)
  if (!bucket) res.cookies.set('ab-bucket', variant, { maxAge: 86400 * 30 })
  return res
}</code></pre>`
      },
    ],
  },
  {
    id: "server-actions", title: "Module 2 — Server-Side Logic",
    lessons: [
      {
        id: "server-actions-deep", title: "Server Actions Deep Dive", duration: "22 min",
        description: "Handle complex mutations on the server with zero client JS using progressive enhancement and Zod validation.",
        content: `<h2>Server Actions — Progressive Enhancement at Scale</h2>
<p>Server Actions are async functions that run on the server. When bound to HTML forms they work even with JavaScript disabled — true progressive enhancement.</p>
<h3>Validated Form Actions with useActionState</h3>
<pre><code>// app/actions/waitlist.ts
'use server'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  role: z.enum(['developer', 'designer', 'manager']),
})

type State = { error?: string; success?: boolean }

export async function submitWaitlist(
  _prev: State, formData: FormData
): Promise&lt;State&gt; {
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const exists = await db.waitlist.findUnique({ where: { email: parsed.data.email } })
  if (exists) return { error: 'Already registered' }

  await db.waitlist.create({ data: parsed.data })
  revalidateTag('waitlist-count')
  redirect('/thank-you')
}

// Client component using useActionState
'use client'
import { useActionState } from 'react'

export function WaitlistForm() {
  const [state, action, isPending] = useActionState(submitWaitlist, {})
  return (
    &lt;form action={action} className="flex flex-col gap-4"&gt;
      &lt;input name="email" type="email" required /&gt;
      &lt;input name="name" required /&gt;
      {state.error &amp;&amp; &lt;p className="text-destructive text-sm"&gt;{state.error}&lt;/p&gt;}
      &lt;button disabled={isPending}&gt;{isPending ? 'Joining...' : 'Join Waitlist'}&lt;/button&gt;
    &lt;/form&gt;
  )
}</code></pre>`
      },
    ],
  },
  {
    id: "pwa", title: "Module 3 — PWA & Offline Sync",
    lessons: [
      {
        id: "pwa-offline", title: "PWA & Service Worker Caching", duration: "25 min",
        description: "Make your Next.js app installable and work offline with service workers and background sync.",
        content: `<h2>Progressive Web App with next-pwa</h2>
<p>A PWA makes your app installable on any device and functional offline. The two key browser APIs are <strong>Cache Storage</strong> and <strong>Background Sync</strong>.</p>
<h3>next-pwa Setup</h3>
<pre><code>// next.config.mjs
import withPWA from 'next-pwa'

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.example\.com\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: { maxAgeSeconds: 60 * 60 * 24 },
      },
    },
    {
      urlPattern: /\.(png|jpg|jpeg|svg|gif|webp)$/,
      handler: 'CacheFirst',
      options: { cacheName: 'images', expiration: { maxAgeSeconds: 60 * 60 * 24 * 30 } },
    },
  ],
})({
  // your existing next config
})</code></pre>
<h3>Web App Manifest</h3>
<pre><code>// public/manifest.json
{
  "name": "OpenSyntax Academy",
  "short_name": "OpenSyntax",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#000000",
  "icons": [
    { "src": "/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}</code></pre>
<h3>Background Sync — Queue Offline Actions</h3>
<pre><code>// Register sync in your component
async function submitOfflineForm(data) {
  if (!navigator.onLine) {
    const db = await openDB('offline-queue', 1)
    await db.add('queue', { ...data, timestamp: Date.now() })
    await navigator.serviceWorker.ready.then(
      (sw) => sw.sync.register('submit-form')
    )
    return { queued: true }
  }
  return fetch('/api/submit', { method: 'POST', body: JSON.stringify(data) })
}</code></pre>`
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
        description="Next.js 16, Server Actions, Edge Middleware, PWA, and offline sync — the complete modern web track."
        category="Web"
        accentColor="oklch(0.72 0.17 196)"
        modules={webModules}
      />
    </div>
  )
}
