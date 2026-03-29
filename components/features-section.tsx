import { BookOpen, Layers, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Advanced Curriculum",
    description: "Go beyond the basics. Each lesson covers production-grade patterns used in real-world applications.",
  },
  {
    icon: Layers,
    title: "Dual Learning Paths",
    description: "Choose Discord bot architecture or full-stack web engineering — or master both at your own pace.",
  },
  {
    icon: Zap,
    title: "Zero Paywalls",
    description: "Everything is free, forever. No subscriptions, no locked content. Just pure knowledge, community-funded.",
  },
  {
    icon: Shield,
    title: "Security-First",
    description: "Lessons cover rate-limiting, SQL injection prevention, and API hardening from day one.",
  },
]

const stats = [
  { value: "4+", label: "Advanced Lessons" },
  { value: "2", label: "Learning Paths" },
  { value: "100%", label: "Free & Open Source" },
  { value: "Apache 2.0", label: "Licensed" },
]

export function FeaturesSection() {
  return (
    <section className="border-t border-border">
      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center justify-center px-6 py-10 text-center">
            <p className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Features grid */}
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Why OpenSyntax</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Premium learning, permanently free
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-secondary">
                <f.icon size={16} className="text-accent" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{f.title}</p>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
