import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-6 pt-28 pb-20 text-center overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 -z-10"
        style={{ backgroundImage: "linear-gradient(to right, oklch(0.16 0 0 / 0.5) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.16 0 0 / 0.5) 1px, transparent 1px)", backgroundSize: "44px 44px" }}
        aria-hidden="true" />
      {/* Glow blobs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full -z-10"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.17 196 / 0.07) 0%, transparent 70%)", filter: "blur(24px)" }}
        aria-hidden="true" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full -z-10"
        style={{ background: "radial-gradient(circle, oklch(0.60 0.22 295 / 0.06) 0%, transparent 70%)", filter: "blur(24px)" }}
        aria-hidden="true" />

      {/* Badge */}
      <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground animate-fade-in-up">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ animation: "pulse-dot 2s infinite" }} aria-hidden="true" />
        100% Free · 11 Courses · 200+ Lessons · Open Source
      </div>

      {/* Headline */}
      <h1 className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.06] animate-fade-in-up" style={{ animationDelay: "0.08s", letterSpacing: "-0.04em" }}>
        Master the Art of<br />
        <span style={{ background: "linear-gradient(120deg, oklch(0.72 0.17 196) 0%, oklch(0.60 0.22 295) 60%, oklch(0.72 0.17 196) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Advanced Development
        </span>
      </h1>

      <p className="mt-6 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.16s" }}>
        OpenSyntax is a premium, open-source learning platform. Go deep into the technologies that power production systems.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap gap-3 justify-center animate-fade-in-up" style={{ animationDelay: "0.22s" }}>
        <Link href="#courses"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          Browse All Courses <ArrowRight size={15} />
        </Link>
        <a href="https://discord.gg/66GA8MNPeB" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium border border-border text-foreground hover:border-accent hover:text-accent transition-colors">
          Join Community
        </a>
      </div>

      {/* Stats */}
      <div className="mt-16 flex flex-wrap gap-x-12 gap-y-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.30s" }}>
        {[["11", "Courses"], ["200+", "Lessons"], ["50h+", "Content"], ["Free", "Forever"]].map(([n, l]) => (
          <div key={l} className="text-center">
            <p className="text-2xl font-bold text-foreground tracking-tight" style={{ letterSpacing: "-0.04em" }}>{n}</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">{l}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
