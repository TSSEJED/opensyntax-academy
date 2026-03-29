"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary text-primary-foreground font-mono text-xs font-bold select-none">
            OS
          </span>
          <span className="font-semibold text-sm tracking-tight">OpenSyntax</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/courses/discord" className="hover:text-foreground transition-colors">Discord Dev</Link>
          <Link href="/courses/web" className="hover:text-foreground transition-colors">Web Engineering</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <a
            href="https://discord.gg/66GA8MNPeB"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-foreground hover:border-accent hover:text-accent transition-colors"
          >
            Community
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4 text-sm text-muted-foreground">
          <Link href="/courses/discord" className="hover:text-foreground transition-colors" onClick={() => setOpen(false)}>Discord Dev</Link>
          <Link href="/courses/web" className="hover:text-foreground transition-colors" onClick={() => setOpen(false)}>Web Engineering</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors" onClick={() => setOpen(false)}>Terms</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors" onClick={() => setOpen(false)}>Privacy</Link>
          <a
            href="https://discord.gg/66GA8MNPeB"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium"
          >
            Join Community
          </a>
        </div>
      )}
    </header>
  )
}
