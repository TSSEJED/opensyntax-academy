import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AlertCircle, Bug, Github, MessageSquare, ExternalLink, RefreshCw, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Known Bugs — OpenSyntax Academy",
  description: "Transparency report on current platform issues and planned fixes.",
}

const resolvedBugs = [
  {
    id: "TRM-003",
    title: "Terminal Scrolls Entire Page on Load",
    severity: "Medium",
    status: "Fixed",
    description: "The interactive terminal on the landing page used `autoFocus` and `scrollIntoView`, which caused the browser to scroll the whole page down to the terminal input on initial load, hiding the hero section. Additionally, when users typed commands, the scrollIntoView call hijacked the page scroll container.",
    workaround: "Fixed in v4.0.0 — autoFocus removed; scroll is now contained within the terminal element.",
    plannedFix: "v4.0.0 ✓",
    resolvedIn: "v4.0.0",
  },
]

const currentBugs = [
  {
    id: "LNG-001",
    title: "Language Selection Resets on Hard Refresh (Rare)",
    severity: "Low",
    status: "Investigating",
    description: "In some browser configurations with strict privacy settings or storage partitioning (e.g., Firefox strict mode), the selected language may not persist across full page reloads because access to localStorage is blocked.",
    workaround: "Use a browser that supports localStorage, or set your browser's privacy level to Standard. The language switcher functions correctly on first selection within the session.",
    plannedFix: "v4.0.x",
  },
  {
    id: "HRO-002",
    title: "3D Hero Stutter on Low-End Devices",
    severity: "Low",
    status: "Fixing",
    description: "On some older mobile devices, the 3D scene may cause frame drops despite existing DPR clamping.",
    workaround: "None required; the site remains functional, only the background animation is affected.",
    plannedFix: "v4.0.x",
  },
]

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

function BugCard({ bug, resolved = false }: { bug: typeof currentBugs[0] & { resolvedIn?: string }, resolved?: boolean }) {
  return (
    <div className={cn(
      "group relative border rounded-2xl p-6 transition-all",
      resolved
        ? "bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10"
        : "bg-card border-border hover:bg-secondary/30"
    )}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[10px] font-mono text-muted-foreground/50 font-bold">{bug.id}</span>
            <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
              {bug.title}
              {resolved && <CheckCircle2 size={16} className="text-emerald-500" />}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className={cn(
              "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest",
              bug.severity === "High" ? "bg-red-500 text-white" :
              bug.severity === "Medium" ? "bg-amber-500/20 text-amber-600" :
              "bg-blue-500/20 text-blue-600"
            )}>
              {bug.severity} Severity
            </span>
            <span className={cn(
              "text-[10px] flex items-center gap-1",
              resolved ? "text-emerald-600" : "text-muted-foreground"
            )}>
              {resolved ? <CheckCircle2 size={10} /> : <RefreshCw size={10} className="animate-spin-slow" />}
              Status: {bug.status}
            </span>
          </div>
        </div>
        <div className={cn(
          "rounded-xl px-4 py-2 border",
          resolved ? "bg-emerald-500/10 border-emerald-500/20" : "bg-secondary border-border/50"
        )}>
          <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider mb-0.5">Target Fix</p>
          <p className={cn("text-sm font-mono font-bold", resolved ? "text-emerald-600" : "text-foreground")}>{bug.plannedFix}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-background/50 rounded-xl p-4 border border-border/40">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Description</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">{bug.description}</p>
        </div>
        <div className={cn(
          "rounded-xl p-4 border",
          resolved ? "bg-emerald-500/5 border-emerald-500/10" : "bg-red-500/5 border-red-500/10"
        )}>
          <h3 className={cn("text-[10px] font-bold uppercase tracking-widest mb-2", resolved ? "text-emerald-600" : "text-red-600")}>
            {resolved ? "Resolution" : "Workaround"}
          </h3>
          <p className={cn("text-sm leading-relaxed italic", resolved ? "text-emerald-600/80" : "text-red-600/80")}>{bug.workaround}</p>
        </div>
      </div>
    </div>
  )
}

export default function BugsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pt-28 pb-20">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-4">
            <AlertCircle size={12} />
            Transparency Report · v4.0.0
          </div>
          <h1 className="text-4xl font-bold text-foreground text-balance mb-4 tracking-tight">Known Bugs</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            We prioritize transparency. Below are the current known issues on the platform, our timeline for resolving them, and a record of recently resolved issues.
          </p>
        </div>

        {/* Active Bugs */}
        <section className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Active Issues ({currentBugs.length})
          </h2>
          <div className="space-y-8">
            {currentBugs.map((bug) => (
              <BugCard key={bug.id} bug={bug} />
            ))}
          </div>
        </section>

        {/* Resolved Bugs */}
        <section className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-500" />
            Recently Resolved
          </h2>
          <div className="space-y-8">
            {resolvedBugs.map((bug) => (
              <BugCard key={bug.id} bug={bug} resolved />
            ))}
          </div>
        </section>

        {/* Support CTA */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://github.com/TSSEJED/opensyntax-academy/issues"
            target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-accent/40 transition-all group"
          >
            <div className="p-3 bg-secondary rounded-xl group-hover:bg-accent/10 transition-colors">
              <Bug size={20} className="text-muted-foreground group-hover:text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1">Found something else?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Report new issues directly on our GitHub repository. We welcome community audits.</p>
              <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-accent">
                Open Issue on GitHub <ExternalLink size={12} />
              </div>
            </div>
          </a>

          <a
            href="https://www.instagram.com/http.sejed.official/"
            target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-accent/40 transition-all group"
          >
            <div className="p-3 bg-secondary rounded-xl group-hover:bg-accent/10 transition-colors">
              <MessageSquare size={20} className="text-muted-foreground group-hover:text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1">Need live support?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Follow our Instagram page and message us for immediate help.</p>
              <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-accent">
                Message Us <ExternalLink size={12} />
              </div>
            </div>
          </a>
        </section>
      </main>
      <Footer />
    </div>
  )
}
