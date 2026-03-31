"use client"

import { useState, useEffect, useRef } from "react"
import { Globe } from "lucide-react"
import { LOCALES, Locale, DEFAULT_LOCALE, I18N_STORAGE_KEY } from "@/lib/i18n"

interface LanguageSwitcherProps {
  compact?: boolean
}

export function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const [current, setCurrent] = useState<Locale>(DEFAULT_LOCALE)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(I18N_STORAGE_KEY) as Locale | null
      if (stored && LOCALES.find(l => l.code === stored)) {
        setCurrent(stored)
        applyLocale(stored)
      }
    } catch {}
  }, [])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  function applyLocale(code: Locale) {
    const locale = LOCALES.find(l => l.code === code)
    if (!locale) return
    document.documentElement.setAttribute("lang", code)
    document.documentElement.setAttribute("dir", locale.dir)
  }

  function select(code: Locale) {
    setCurrent(code)
    applyLocale(code)
    try {
      localStorage.setItem(I18N_STORAGE_KEY, code)
    } catch {}
    // Dispatch custom event so other components can react
    window.dispatchEvent(new CustomEvent("localechange", { detail: code }))
    setOpen(false)
  }

  const currentLocale = LOCALES.find(l => l.code === current)!

  return (
    <div ref={ref} className="relative" id="language-switcher">
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Switch language"
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-2.5 py-2 text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all ${compact ? "text-xs" : "text-[11px]"}`}
      >
        <Globe size={13} className="flex-shrink-0" />
        {!compact && (
          <span className="font-mono font-bold uppercase tracking-widest">{current}</span>
        )}
        <svg
          viewBox="0 0 24 24"
          width={10}
          height={10}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-44 rounded-xl border border-border bg-card/95 backdrop-blur-lg shadow-2xl p-1.5 z-[9999] pulse-in">
          {LOCALES.map(locale => (
            <button
              key={locale.code}
              onClick={() => select(locale.code)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                current === locale.code
                  ? "bg-accent/10 text-accent font-bold"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <span>{locale.nativeLabel}</span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase">{locale.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
