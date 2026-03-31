"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, LayoutDashboard, Search as SearchIcon, Command, ArrowRight, Bug } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { getTranslations, Locale, DEFAULT_LOCALE, I18N_STORAGE_KEY, LOCALES } from "@/lib/i18n"

const courses = [
  { href: "/courses/web",            label: "Web Engineering",        tag: "Next.js 16"      },
  { href: "/courses/discord",        label: "Discord Development",    tag: "discord.py"      },
  { href: "/courses/python",         label: "Python & Data Science",  tag: "Pandas · ML"     },
  { href: "/courses/ai-ml",          label: "AI/ML Engineering",      tag: "LLMs · RAG"      },
  { href: "/courses/typescript",     label: "TypeScript Mastery",     tag: "Advanced Types"  },
  { href: "/courses/devops",         label: "DevOps & Cloud",         tag: "K8s · Terraform" },
  { href: "/courses/databases",      label: "Database Engineering",   tag: "PostgreSQL"      },
  { href: "/courses/react-patterns", label: "React Advanced Patterns",tag: "Hooks · Perf"   },
  { href: "/courses/cybersecurity",  label: "Cybersecurity",          tag: "OWASP · Auth"    },
  { href: "/courses/blockchain",     label: "Blockchain & Web3",      tag: "Solidity"        },
  { href: "/courses/mobile",         label: "Mobile · React Native",  tag: "Expo · Reanimated"},
  { href: "/courses/system-design",  label: "System Design",          tag: "Distributed"     },
  { href: "/courses/rust",           label: "Rust & Systems",         tag: "WASM · Tokio"    },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState<string | false>(false)
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(I18N_STORAGE_KEY) as Locale | null
      if (stored && LOCALES.find(l => l.code === stored)) setLocale(stored)
    } catch {}
    const handler = (e: Event) => setLocale((e as CustomEvent<Locale>).detail)
    window.addEventListener("localechange", handler)
    return () => window.removeEventListener("localechange", handler)
  }, [])

  const t = getTranslations(locale)

  const toggleSearch = () => {
    const e = new KeyboardEvent("keydown", { key: "k", ctrlKey: true, metaKey: true })
    document.dispatchEvent(e)
  }

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
              onMouseEnter={() => setDropOpen("courses")}
              className="flex items-center gap-1 px-3 py-2 rounded-md hover:text-foreground hover:bg-secondary transition-colors"
            >
              {t.nav_courses} <ChevronDown size={13} className={`transition-transform ${dropOpen === "courses" ? "rotate-180" : ""}`} />
            </button>
            {dropOpen === "courses" && (
              <div className="absolute top-full left-0 mt-1 w-72 rounded-xl border border-border bg-card/95 backdrop-blur-lg p-2 shadow-2xl pulse-in">
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

          <Link href="/dashboard" className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:text-foreground hover:bg-secondary transition-colors text-foreground font-medium">
            <LayoutDashboard size={14} className="text-accent" />
            {t.nav_dashboard}
          </Link>

          {/* Resources dropdown */}
          <div className="relative" onMouseLeave={() => setDropOpen(false)}>
            <button
              onMouseEnter={() => setDropOpen("resources")}
              className="flex items-center gap-1 px-3 py-2 rounded-md hover:text-foreground hover:bg-secondary transition-colors"
            >
              {t.nav_resources} <ChevronDown size={13} className={`transition-transform ${dropOpen === "resources" ? "rotate-180" : ""}`} />
            </button>
            {dropOpen === "resources" && (
              <div className="absolute top-full left-0 mt-1 w-52 rounded-xl border border-border bg-card/95 backdrop-blur-lg p-2 shadow-2xl pulse-in">
                <Link href="/status" className="flex justify-between items-center px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors group" onClick={() => setDropOpen(false)}>
                  <span className="text-xs font-medium text-foreground group-hover:text-accent transition-colors">{t.nav_status}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                </Link>
                <div className="h-px bg-border my-1 mx-2" />
                <Link href="/changelog" className="block px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-xs font-medium text-foreground" onClick={() => setDropOpen(false)}>{t.nav_changelog}</Link>
                <Link href="/contributing" className="block px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-xs font-medium text-foreground" onClick={() => setDropOpen(false)}>{t.nav_contributing}</Link>
                <div className="h-px bg-border my-1 mx-2" />
                <Link href="/bugs" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-xs font-medium text-red-500" onClick={() => setDropOpen(false)}>
                  <Bug size={11} /> {t.nav_known_bugs}
                </Link>
                <div className="h-px bg-border my-1 mx-2" />
                <Link href="/terms" className="block px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-[11px] text-muted-foreground" onClick={() => setDropOpen(false)}>{t.nav_terms}</Link>
                <Link href="/privacy" className="block px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-[11px] text-muted-foreground" onClick={() => setDropOpen(false)}>{t.nav_privacy}</Link>
              </div>
            )}
          </div>

          <button
            onClick={toggleSearch}
            className="group ml-2 flex items-center gap-3 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-muted-foreground hover:border-accent/40 hover:text-foreground transition-all hover:bg-secondary overflow-hidden min-w-[140px]"
          >
            <SearchIcon size={14} className="group-hover:text-accent transition-colors" />
            <span className="text-xs flex-1 text-left">{t.nav_search}</span>
            <div className="flex items-center gap-0.5 opacity-40 group-hover:opacity-70 transition-opacity text-[10px] font-mono">
              <Command size={10} /><span>K</span>
            </div>
          </button>

          {/* Language Switcher */}
          <div className="ml-1">
            <LanguageSwitcher />
          </div>

          <a href="https://www.instagram.com/http.sejed.official/" target="_blank" rel="noopener noreferrer"
            className="ml-3 flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-background hover:opacity-90 transition-opacity text-xs font-bold shadow-lg">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            {t.nav_community}
          </a>
        </div>

        <button className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-6 flex flex-col gap-1 text-sm shadow-xl animate-in slide-in-from-top duration-300 overflow-y-auto max-h-[85vh] custom-scrollbar">
          <Link href="/dashboard" className="flex items-center justify-between px-3 py-4 rounded-xl bg-accent/5 border border-accent/20 mb-4" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-3">
              <LayoutDashboard size={18} className="text-accent" />
              <span className="font-bold text-foreground">{t.nav_dashboard}</span>
            </div>
            <ArrowRight size={16} className="text-accent" />
          </Link>

          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 px-3 pb-2">Explore Paths</p>
          <div className="grid grid-cols-1 gap-1 mb-4 text-foreground">
            {courses.map((c) => (
              <Link key={c.href} href={c.href}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors"
                onClick={() => setOpen(false)}>
                <span className="text-xs font-medium">{c.label}</span>
                <span className="text-[10px] text-muted-foreground font-mono">{c.tag}</span>
              </Link>
            ))}
          </div>

          <div className="h-px bg-border my-2" />

          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 px-3 pb-2 pt-2">Resources & Status</p>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <Link href="/status" className="flex items-center justify-between px-3 py-3 rounded-lg border border-border bg-green-500/5 text-xs text-foreground font-medium" onClick={() => setOpen(false)}>
              {t.nav_status.split(" ")[0]} <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </Link>
            <Link href="/contributing" className="flex items-center gap-2 px-3 py-3 rounded-lg border border-border text-xs text-foreground font-medium" onClick={() => setOpen(false)}>{t.nav_contributing}</Link>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <Link href="/changelog" className="flex items-center gap-2 px-3 py-3 rounded-lg border border-border text-xs text-foreground font-medium" onClick={() => setOpen(false)}>{t.nav_changelog}</Link>
            <Link href="/bugs" className="flex items-center gap-2 px-3 py-3 rounded-lg border border-red-500/20 bg-red-500/5 text-xs text-red-500 font-medium" onClick={() => setOpen(false)}>
              <Bug size={12} /> {t.nav_known_bugs}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <Link href="/terms" className="flex items-center gap-2 px-3 py-3 rounded-lg border border-border text-xs text-foreground font-medium" onClick={() => setOpen(false)}>{t.nav_terms.split(" ").slice(0,2).join(" ")}</Link>
            <Link href="/privacy" className="flex items-center gap-2 px-3 py-3 rounded-lg border border-border text-xs text-foreground font-medium" onClick={() => setOpen(false)}>{t.nav_privacy.split(" ").slice(0,1).join(" ")}</Link>
          </div>

          {/* Language Switcher mobile */}
          <div className="mb-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 px-3 pb-2">Language</p>
            <LanguageSwitcher compact={false} />
          </div>

          <button
            onClick={() => { setOpen(false); toggleSearch() }}
            className="w-full mb-2 flex items-center justify-center gap-2 px-3 py-4 rounded-xl bg-secondary text-foreground font-bold text-xs"
          >
            <SearchIcon size={16} className="text-accent" />
            {t.nav_search}
          </button>

          <a href="https://www.instagram.com/http.sejed.official/" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center py-4 rounded-xl bg-foreground text-background font-bold text-sm shadow-lg">{t.nav_community}</a>
        </div>
      )}
    </header>
  )
}
