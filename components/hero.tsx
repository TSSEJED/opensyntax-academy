import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-16 text-center overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.18 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.18 0 0 / 0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />
      {/* Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full -z-10 blur-3xl"
        style={{ background: "oklch(0.65 0.18 195 / 0.06)" }}
        aria-hidden="true"
      />

      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
        100% Open-Source &amp; Community-Funded
      </div>

      {/* Headline */}
      <h1 className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground text-balance leading-[1.08]">
        Master the Art of
        <br />
        <span className="text-accent">Advanced Development</span>
      </h1>

      <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
        OpenSyntax is a premium, open-source learning platform. Choose your path and go deep into the technologies that matter.
      </p>

      {/* Path Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        <Link
          href="/courses/discord"
          className="group relative flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-6 text-left transition-all duration-200 hover:border-accent hover:shadow-[0_0_0_1px_oklch(0.65_0.18_195_/_0.3)]"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-secondary">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-foreground" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.042.033.055a19.854 19.854 0 0 0 5.993 3.03.077.077 0 0 0 .084-.026c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">Master Advanced Discord Development</p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">Cogs, Sharding, PostgreSQL, Redis, IPC, and beyond.</p>
          </div>
          <ArrowRight size={14} className="mt-auto text-muted-foreground group-hover:text-accent transition-colors" aria-hidden="true" />
        </Link>

        <Link
          href="/courses/web"
          className="group relative flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-6 text-left transition-all duration-200 hover:border-accent hover:shadow-[0_0_0_1px_oklch(0.65_0.18_195_/_0.3)]"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-secondary">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">Full-Stack Web Engineering</p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">Next.js 16, Server Actions, Edge Middleware, and PWA.</p>
          </div>
          <ArrowRight size={14} className="mt-auto text-muted-foreground group-hover:text-accent transition-colors" aria-hidden="true" />
        </Link>
      </div>

      {/* Blueprint redirect */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-xs text-muted-foreground">Looking for the original Blueprint by Sejed?</p>
        <a
          href="https://discord-blueprint.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline underline-offset-4 transition-colors"
        >
          Continue to Discord Blueprint
          <ExternalLink size={11} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
