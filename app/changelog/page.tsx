import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GitCommit, Plus, RefreshCw, Trash2 } from "lucide-react"

export const metadata = {
  title: "Changelog — OpenSyntax Academy",
  description: "Recent updates and architectural changes to the platform.",
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pt-28 pb-20">
        <div className="mb-14">
          <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">Platform Updates</p>
          <h1 className="text-4xl font-bold text-foreground text-balance mb-4">Changelog</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            We constantly iterate on OpenSyntax via community feedback. View the latest major structural changes and feature drops here.
          </p>
        </div>

        <div className="space-y-16">
          {/* Unreleased/Latest Update */}
          <section className="relative">
            <div className="absolute left-0 top-2 bottom-0 w-px bg-border/50 hidden md:block" />
            
            <div className="md:pl-8">
              <div className="flex items-center gap-3 mb-6 relative">
                <div className="absolute -left-10 w-4 h-4 rounded-full bg-accent/20 border-2 border-accent hidden md:flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>
                <h2 className="text-xl font-bold">Version 2.0 — Platform Expansion</h2>
                <span className="px-2.5 py-1 rounded-md bg-accent/10 text-accent text-[10px] font-mono font-bold tracking-wider uppercase">Current</span>
              </div>

              <div className="space-y-8">
                {/* Added */}
                <div className="bg-card/40 border border-border/60 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-emerald-600 mb-4">
                    <Plus size={18} />
                    <h3 className="font-semibold">Added</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground list-disc list-inside">
                    <li><strong className="text-foreground">Course Metadata:</strong> Deployed specific <code>instructor</code>, <code>rating</code>, <code>reviewCount</code>, and <code>prerequisites</code> data interfaces to all courses.</li>
                    <li><strong className="text-foreground">Premium Catalog Redesign:</strong> The <code>/courses</code> catalog has been completely transformed into a reactive, Framer Motion-powered Bento-style grid layout.</li>
                    <li><strong className="text-foreground">Category Filtering:</strong> Users can now filter courses interactively by tag (<code>Web</code>, <code>DevOps</code>, <code>AI & Data</code>, etc.) on the catalog page.</li>
                    <li><strong className="text-foreground">3D Hero Integration:</strong> Enhanced the index page with a smooth, optimized <code>@react-three/fiber</code> interactive physics scene.</li>
                    <li><strong className="text-foreground">Lesson Meta View:</strong> The <code>LessonPlayer</code> component now displays deeply populated metadata directly within the sidebar header natively.</li>
                    <li><strong className="text-foreground">Massive Content Injection:</strong> Generated over 50 specific, immersive HTML-formatted module lessons across all 11 disciplines.</li>
                  </ul>
                </div>

                {/* Changed */}
                <div className="bg-card/40 border border-border/60 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-blue-600 mb-4">
                    <RefreshCw size={18} />
                    <h3 className="font-semibold">Changed</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground list-disc list-inside">
                    <li><strong className="text-foreground">Forced Light Mode:</strong> Transitioned the entire site to a permanent, vibrant, high-contrast OKLCH light mode color palette for maximum readability.</li>
                    <li><strong className="text-foreground">Performance Optimization:</strong> Tuned the 3D Icosahedron poly-count and clamped maximum Device Pixel Ratio to drastically enhance mobile battery usage and prevent browser lagging.</li>
                    <li><strong className="text-foreground">Terms of Service:</strong> Updated clauses to reflect community-aggregated course metadata and ratings dynamically.</li>
                    <li><strong className="text-foreground">Privacy Policy:</strong> Explicitly redefined that all interactive 3D assets render strictly on the client-side without remote tracking hooks.</li>
                  </ul>
                </div>

                {/* Removed */}
                <div className="bg-card/40 border border-border/60 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-red-500 mb-4">
                    <Trash2 size={18} />
                    <h3 className="font-semibold">Removed</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground list-disc list-inside">
                    <li>Removed outdated legacy <code>next-themes</code> integrations across UI components completely.</li>
                    <li>Removed generic dummy placeholders traversing the catalog in favor of fully flushed syllabus paths.</li>
                  </ul>
                </div>

              </div>
            </div>
          </section>
          
          <div className="flex items-center justify-center pt-8 border-t border-border">
            <a href="https://github.com/TSSEJED/opensyntax-academy/commits/main" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group">
              <GitCommit size={14} className="group-hover:text-accent transition-colors" />
              View full Git history on GitHub
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
