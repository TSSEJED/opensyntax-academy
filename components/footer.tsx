"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Instagram } from "lucide-react"
import { getTranslations, Locale, DEFAULT_LOCALE, I18N_STORAGE_KEY, LOCALES } from "@/lib/i18n"

const COURSE_LINKS = [
  { href: "/courses/web",            label: "Web Engineering" },
  { href: "/courses/discord",        label: "Discord Development" },
  { href: "/courses/python",         label: "Python & Data Science" },
  { href: "/courses/ai-ml",          label: "AI/ML Engineering" },
  { href: "/courses/typescript",     label: "TypeScript Mastery" },
  { href: "/courses/devops",         label: "DevOps & Cloud" },
  { href: "/courses/databases",      label: "Database Engineering" },
  { href: "/courses/react-patterns", label: "React Patterns" },
  { href: "/courses/cybersecurity",  label: "Cybersecurity" },
  { href: "/courses/blockchain",     label: "Blockchain & Web3" },
  { href: "/courses/mobile",         label: "Mobile · React Native" },
]

export function Footer() {
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
            {t.footer_tagline}
          </p>
          <a href="https://www.instagram.com/http.sejed.official/" target="_blank" rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-foreground hover:border-accent hover:text-accent transition-colors w-fit">
            <Instagram size={14} className="text-current" />
            Join @http.sejed.official
          </a>
        </div>

        {/* Courses — split across two columns */}
        <div className="flex flex-col gap-2.5">
          <p className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-1">{t.footer_courses}</p>
          {COURSE_LINKS.slice(0, 6).map((c) => (
            <Link key={c.href} href={c.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{c.label}</Link>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-1">{t.footer_more_courses}</p>
          {COURSE_LINKS.slice(6).map((c) => (
            <Link key={c.href} href={c.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{c.label}</Link>
          ))}
          <Link href="/courses/system-design" className="text-xs text-muted-foreground hover:text-foreground transition-colors">System Design</Link>
          <Link href="/courses/rust" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Rust</Link>
        </div>

        {/* Community + Legal */}
        <div className="flex flex-col gap-2.5">
          <p className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-1">{t.footer_community}</p>
          <a href="https://www.instagram.com/http.sejed.official/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t.footer_instagram}</a>
          <a href="https://github.com/TSSEJED/opensyntax-academy" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t.footer_github}</a>
          <div className="h-px bg-border my-1" />
          <p className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-1">{t.footer_legal}</p>
          <Link href="/status" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{t.footer_status}</Link>
          <Link href="/changelog" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t.footer_changelog}</Link>
          <Link href="/contributing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t.footer_contributing}</Link>
          <Link href="/certificates" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">{t.footer_certificates}</Link>
          <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t.footer_terms}</Link>
          <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t.footer_privacy}</Link>

          <div className="h-px bg-border my-1" />
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">{t.footer_issues}</p>
          <Link href="/bugs" className="text-xs text-red-500/80 hover:text-red-500 font-medium transition-colors animate-pulse">{t.footer_known_bugs}</Link>
          <a href="https://github.com/TSSEJED/opensyntax-academy/issues" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t.footer_report_bug}</a>
          <p className="text-xs text-muted-foreground/50">Apache 2.0 License</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/50">
          <p>© {new Date().getFullYear()} {t.footer_copyright}</p>
          <p>Built on the success of <a href="https://discord-blueprint.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline underline-offset-2 transition-colors">Discord Blueprint</a>.</p>
        </div>
      </div>
    </footer>
  )
}
