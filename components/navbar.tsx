"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

const courses = [
  { href: "/courses/web",           label: "Web Engineering",       tag: "Next.js 16"   },
  { href: "/courses/discord",       label: "Discord Development",   tag: "discord.py"   },
  { href: "/courses/python",        label: "Python & Data Science", tag: "Pandas · ML"  },
  { href: "/courses/ai-ml",         label: "AI/ML Engineering",     tag: "LLMs · RAG"   },
  { href: "/courses/typescript",    label: "TypeScript Mastery",    tag: "Advanced Types"},
  { href: "/courses/devops",        label: "DevOps & Cloud",        tag: "K8s · Terraform"},
  { href: "/courses/databases",     label: "Database Engineering",  tag: "PostgreSQL"   },
  { href: "/courses/react-patterns",label: "React Advanced Patterns",tag: "Hooks · Perf"},
  { href: "/courses/cybersecurity", label: "Cybersecurity",         tag: "OWASP · Auth" },
  { href: "/courses/blockchain",    label: "Blockchain & Web3",     tag: "Solidity"     },
  { href: "/courses/mobile",        label: "Mobile · React Native", tag: "Expo · Reanimated"},
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-foreground group">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-mono text-xs font-bold select-none"
            style={{ background: "linear-gradient(135deg, oklch(0.72 0.17 196), oklch(0.60 0.22 295))", color: "#000" }}>
            OS
          </span>
          <span className="font-semibold text-sm tracking-tight">OpenSyntax</span>
          <span className="hidden sm:inline text-[10px] font-mono text-muted-foreground/60 border border-border rounded px-1.5 py-0.5">ACADEMY</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
          {/* Courses dropdown */}
          <div className="relative" onMouseLeave={() => setDropOpen(false)}>
            <button
              onMouseEnter={() => setDropOpen(true)}
              className="flex items-center gap-1 px-3 py-2 rounded-md hover:text-foreground hover:bg-secondary transition-colors"
            >
              Courses <ChevronDown size={13} className={`transition-transform ${dropOpen ? "rotate-180" : ""}`} />
            </button>
            {dropOpen && (
              <div className="absolute top-full left-0 mt-1 w-72 rounded-xl border border-border bg-card/95 backdrop-blur-lg p-2 shadow-2xl">
                {courses.map((c) => (
                  <Link key={c.href} href={c.href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors group"
                    onClick={() => setDropOpen(false)}>
                    <span className="text-xs font-medium text-foreground group-hover:text-accent transition-colors">{c.label}</span>
                    <span className="text-[10px] text-muted-foreground/70 font-mono">{c.tag}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/terms"   className="px-3 py-2 rounded-md hover:text-foreground hover:bg-secondary transition-colors">Terms</Link>
          <Link href="/privacy" className="px-3 py-2 rounded-md hover:text-foreground hover:bg-secondary transition-colors">Privacy</Link>

          <a href="https://discord.gg/66GA8MNPeB" target="_blank" rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-foreground hover:border-accent hover:text-accent transition-colors text-xs font-medium">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.042.033.055a19.854 19.854 0 0 0 5.993 3.03.077.077 0 0 0 .084-.026c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
            Community
          </a>
        </div>

        <button className="md:hidden text-muted-foreground hover:text-foreground transition-colors" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-1 text-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-2 pb-1">Courses</p>
          {courses.map((c) => (
            <Link key={c.href} href={c.href}
              className="flex items-center justify-between px-2 py-2.5 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setOpen(false)}>
              <span className="text-xs text-foreground">{c.label}</span>
              <span className="text-[10px] text-muted-foreground font-mono">{c.tag}</span>
            </Link>
          ))}
          <div className="h-px bg-border my-2" />
          <Link href="/terms"   className="px-2 py-2 text-xs text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>Terms</Link>
          <Link href="/privacy" className="px-2 py-2 text-xs text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>Privacy</Link>
          <a href="https://discord.gg/66GA8MNPeB" target="_blank" rel="noopener noreferrer" className="mt-1 px-2 py-2 text-xs text-accent font-medium">Join Community →</a>
        </div>
      )}
    </header>
  )
}
