import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GitCommit, Plus, RefreshCw, Trash2, Rocket, Calendar } from "lucide-react"

export const metadata = {
  title: "Changelog — OpenSyntax Academy",
  description: "Recent updates and architectural changes to the platform.",
}

const v3Planned = [
  "User authentication and persistent accounts",
  "Course completion certificates",
  "Community lesson submissions and review workflow",
  "Full-text search across all course content",
  "Comment threads on individual lessons",
  "Instructor profiles and multi-author support",
]

const v2Added = [
  { label: "Interactive Knowledge Checks", detail: "End-of-lesson quizzes with instant feedback, answer highlighting, and explanations on Web, Discord, and Python tracks." },
  { label: "Cinematic Lesson Transitions", detail: "Framer Motion AnimatePresence slide animations when switching lessons, eliminating jarring content snaps." },
  { label: "Persistent Progress", detail: "Lesson completion saved to localStorage per-course. Progress bar survives page refreshes — fully client-side, zero tracking." },
  { label: "3D Hero Scene", detail: "Immersive WebGL icosahedron powered by @react-three/fiber with optimized DPR limits for mobile performance." },
  { label: "Premium Bento Catalog", detail: "The /courses page redesigned as a reactive, filterable Bento-box grid with category tags and stagger animations." },
  { label: "50+ Lesson Modules", detail: "Massive content injection across all 11 disciplines: Web, Discord, Python, AI/ML, TypeScript, DevOps, Databases, React, Cybersecurity, Blockchain, Mobile." },
  { label: "SEO Layer", detail: "sitemap.xml, robots.txt, JSON-LD Schema.org structured data, and metadataBase for Google, Bing, and AI crawlers." },
  { label: "Rich Social Presence", detail: "OpenGraph and Twitter card metadata for premium link previews on Discord, X, and LinkedIn." },
  { label: "Contributing Page", detail: "Formatted /contributing page with code examples, commit type tables, and PR checklist." },
  { label: "Changelog Page", detail: "This page — tracking all platform version history." },
]

const v2Changed = [
  { label: "Forced Light Mode", detail: "Transitioned the entire platform to a permanent OKLCH light mode palette for vibrant, high-contrast readability." },
  { label: "Performance", detail: "3D hero geometry reduced (12 → 4 segments) and DPR capped. Deno-compatible code: window → globalThis throughout." },
  { label: "Terms of Service", detail: "Updated to reflect course rating aggregation and community metadata." },
  { label: "Privacy Policy", detail: "Clarified that all interactive 3D and animation features are client-side with no remote tracking." },
]

const v2Removed = [
  "Legacy next-themes dark mode integrations",
  "Generic placeholder lesson content in favor of full course syllabi",
]

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pt-28 pb-20">
        <div className="mb-14">
          <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">Platform Updates</p>
          <h1 className="text-4xl font-bold text-foreground text-balance mb-4">Changelog</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            We iterate constantly. Every significant architectural change, feature drop, and content expansion is documented here.
          </p>
        </div>

        <div className="space-y-20">

          {/* ── v3.0 Unreleased ── */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              <h2 className="text-xl font-bold text-foreground">v3.0 — In Development</h2>
              <span className="px-2.5 py-1 rounded-md bg-accent/10 text-accent text-[10px] font-mono font-bold tracking-wider uppercase">Upcoming</span>
            </div>
            <div className="bg-card/40 border border-dashed border-accent/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-accent mb-4">
                <Rocket size={16} />
                <h3 className="font-semibold text-sm">Planned for v3.0</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {v3Planned.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/40 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── v2.0 Released ── */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h2 className="text-xl font-bold text-foreground">v2.0.0 — Platform Expansion</h2>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Calendar size={12} />
                <span>Released March 29, 2026</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Added */}
              <div className="bg-card/40 border border-border/60 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-emerald-600 mb-5">
                  <Plus size={18} />
                  <h3 className="font-semibold">Added</h3>
                </div>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {v2Added.map((item, i) => (
                    <li key={i}>
                      <strong className="text-foreground">{item.label}:</strong> {item.detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Changed */}
              <div className="bg-card/40 border border-border/60 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-blue-600 mb-5">
                  <RefreshCw size={18} />
                  <h3 className="font-semibold">Changed</h3>
                </div>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {v2Changed.map((item, i) => (
                    <li key={i}>
                      <strong className="text-foreground">{item.label}:</strong> {item.detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Removed */}
              <div className="bg-card/40 border border-border/60 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-red-500 mb-5">
                  <Trash2 size={18} />
                  <h3 className="font-semibold">Removed</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  {v2Removed.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>
          </section>

          {/* ── v1.0 Released ── */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40" />
              <h2 className="text-xl font-bold text-foreground">v1.0.0 — Initial Launch</h2>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Calendar size={12} />
                <span>January 2026</span>
              </div>
            </div>
            <div className="bg-card/20 border border-border/40 rounded-2xl p-6 opacity-80">
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>Initial platform launch with Discord Development and Full-Stack Web Engineering paths.</li>
                <li>Sidebar-driven lesson player with basic progress tracking.</li>
                <li>Community Discord integration.</li>
                <li>Apache 2.0 open-source license.</li>
              </ul>
            </div>
          </section>

          <div className="flex items-center justify-center pt-8 border-t border-border">
            <a
              href="https://github.com/TSSEJED/opensyntax-academy/commits/main"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group"
            >
              <GitCommit size={14} className="group-hover:text-accent transition-colors" />
              View full commit history on GitHub
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
