import { BookOpen, Layers, Shield, Zap, Code2, Globe } from "lucide-react"

const features = [
  { icon: BookOpen, title: "Production-Grade Curriculum", description: "Every lesson covers real-world patterns used in production systems — not toy examples." },
  { icon: Layers,   title: "11 Learning Paths",           description: "Web, Discord, AI/ML, DevOps, Security, Blockchain, Mobile, and more — master what matters." },
  { icon: Zap,      title: "Zero Paywalls. Ever.",         description: "No subscriptions, no locked content. Community-funded and free forever by design." },
  { icon: Shield,   title: "Security-First Mindset",       description: "Security concepts woven into every track — from SQL injection to smart contract auditing." },
  { icon: Code2,    title: "Deep Code Examples",           description: "Real, runnable code in every lesson. Copy-paste patterns you can use immediately." },
  { icon: Globe,    title: "Open Source & Forkable",       description: "Every lesson is MIT-licensed. Fork it, translate it, extend it — it's yours." },
]

const stats = [
  { value: "11",   label: "Courses" },
  { value: "200+", label: "Lessons" },
  { value: "50h+", label: "Content" },
  { value: "MIT",  label: "License" },
]

export function FeaturesSection() {
  return (
    <section className="border-t border-border">
      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center justify-center px-6 py-10 text-center">
            <p className="text-3xl font-bold text-foreground" style={{ letterSpacing: "-0.04em" }}>{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Features grid */}
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Why OpenSyntax</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground" style={{ letterSpacing: "-0.04em" }}>
            Premium learning, permanently free
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 hover:border-border/60 hover:bg-secondary/20 transition-colors">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-secondary">
                <f.icon size={16} className="text-accent" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground mb-2">{f.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
