import Link from "next/link"

const COURSE_LINKS = [
  { href: "/courses/web",           label: "Web Engineering" },
  { href: "/courses/discord",       label: "Discord Development" },
  { href: "/courses/python",        label: "Python & Data Science" },
  { href: "/courses/ai-ml",         label: "AI/ML Engineering" },
  { href: "/courses/typescript",    label: "TypeScript Mastery" },
  { href: "/courses/devops",        label: "DevOps & Cloud" },
  { href: "/courses/databases",     label: "Database Engineering" },
  { href: "/courses/react-patterns",label: "React Patterns" },
  { href: "/courses/cybersecurity", label: "Cybersecurity" },
  { href: "/courses/blockchain",    label: "Blockchain & Web3" },
  { href: "/courses/mobile",        label: "Mobile · React Native" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-mono text-xs font-bold"
              style={{ background: "linear-gradient(135deg, oklch(0.72 0.17 196), oklch(0.60 0.22 295))", color: "#000" }}>
              OS
            </span>
            <span className="font-semibold text-sm text-foreground">OpenSyntax</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The next evolution of open-source developer education. 100% community-funded, free forever.
          </p>
          <a href="https://discord.gg/66GA8MNPeB" target="_blank" rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-foreground hover:border-accent hover:text-accent transition-colors w-fit">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.042.033.055a19.854 19.854 0 0 0 5.993 3.03.077.077 0 0 0 .084-.026c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
            Join discord.gg/66GA8MNPeB
          </a>
        </div>

        {/* Courses — split across two columns */}
        <div className="flex flex-col gap-2.5">
          <p className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-1">Courses</p>
          {COURSE_LINKS.slice(0, 6).map((c) => (
            <Link key={c.href} href={c.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{c.label}</Link>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-1">More Courses</p>
          {COURSE_LINKS.slice(6).map((c) => (
            <Link key={c.href} href={c.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{c.label}</Link>
          ))}
        </div>

        {/* Community + Legal */}
        <div className="flex flex-col gap-2.5">
          <p className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-1">Community</p>
          <a href="https://discord.gg/66GA8MNPeB" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Discord Server</a>
          <a href="https://github.com/TSSEJED/opensyntax-academy" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">GitHub ↗</a>
          <div className="h-px bg-border my-1" />
          <p className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-1">Legal</p>
          <Link href="/changelog" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Changelog</Link>
          <Link href="/contributing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contributing</Link>
          <Link href="/terms"   className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
          <p className="text-xs text-muted-foreground/50">Apache 2.0 License</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/50">
          <p>© {new Date().getFullYear()} OpenSyntax Academy. Open-source &amp; community-funded.</p>
          <p>Built on the success of <a href="https://discord-blueprint.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline underline-offset-2 transition-colors">Discord Blueprint</a>.</p>
        </div>
      </div>
    </footer>
  )
}
