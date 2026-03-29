import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AlertCircle, Bug, Github, MessageSquare, ExternalLink, RefreshCw } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Known Bugs — OpenSyntax Academy",
  description: "Transparency report on current platform issues and planned fixes.",
}

const currentBugs = [
  {
    id: "DSB-001",
    title: "Dashboard Progress Desync",
    severity: "Medium",
    status: "Confirmed",
    description: "The Student Dashboard may show 0% progress even if courses are partially completed. This is due to a mismatch between course titles and slug keys in localStorage.",
    workaround: "Open the specific course page to see your real progress. A fix that standardizes keys will be released in v3.1.0.",
    plannedFix: "v3.1.0",
  },
  {
    id: "HRO-002",
    title: "3D Hero Stutter on Low-End Devices",
    severity: "Low",
    status: "Fixing",
    description: "On some older mobile devices, the 3D scene may cause frame drops despite existing DPR clamping.",
    workaround: "None required; the site remains functional, only the background animation is affected.",
    plannedFix: "v3.0.x",
  },
]

export default function BugsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pt-28 pb-20">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-4">
            <AlertCircle size={12} />
            Transparency Report
          </div>
          <h1 className="text-4xl font-bold text-foreground text-balance mb-4 tracking-tight">Known Bugs</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            We prioritize transparency. Below are the current known issues on the platform and our timeline for resolving them.
          </p>
        </div>

        <div className="space-y-8">
          {currentBugs.map((bug) => (
            <div key={bug.id} className="group relative bg-card border border-border rounded-2xl p-6 transition-all hover:bg-secondary/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-mono text-muted-foreground/50 font-bold">{bug.id}</span>
                    <h2 className="text-lg font-bold tracking-tight">{bug.title}</h2>
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
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                       <RefreshCw size={10} className="animate-spin-slow" />
                       Status: {bug.status}
                    </span>
                  </div>
                </div>
                <div className="bg-secondary rounded-xl px-4 py-2 border border-border/50">
                   <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider mb-0.5">Target Fix</p>
                   <p className="text-sm font-mono font-bold text-foreground">{bug.plannedFix}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-background/50 rounded-xl p-4 border border-border/40">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Description</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">{bug.description}</p>
                </div>

                <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/10">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-2">Workaround</h3>
                  <p className="text-sm text-red-600/80 leading-relaxed italic">{bug.workaround}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

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
             href="https://discord.gg/66GA8MNPeB" 
             target="_blank" rel="noopener noreferrer"
             className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-accent/40 transition-all group"
           >
              <div className="p-3 bg-secondary rounded-xl group-hover:bg-accent/10 transition-colors">
                 <MessageSquare size={20} className="text-muted-foreground group-hover:text-accent" />
              </div>
              <div>
                 <h3 className="font-bold text-sm mb-1">Need live support?</h3>
                 <p className="text-xs text-muted-foreground leading-relaxed">Join our Discord server and post in the #platform-bugs channel for immediate help.</p>
                 <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-accent">
                    Join Support Server <ExternalLink size={12} />
                 </div>
              </div>
           </a>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
