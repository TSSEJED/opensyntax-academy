"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Bug, LifeBuoy, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type PromptType = "discord" | "bugs" | "support"

interface PromptData {
  id: PromptType
  icon: typeof MessageSquare
  title: string
  detail: string
  action: string
  href: string
  external?: boolean
  accent: string
}

const PROMPTS: PromptData[] = [
  {
    id: "discord",
    icon: MessageSquare,
    title: "Wanna discord this?",
    detail: "Join 2,500+ devs discussing lessons in real-time.",
    action: "Join Server",
    href: "https://discord.gg/66GA8MNPeB",
    external: true,
    accent: "oklch(0.60 0.22 295)",
  },
  {
    id: "bugs",
    icon: Bug,
    title: "Encountered a glitch?",
    detail: "Check our known bugs list or report a new one.",
    action: "See Status",
    href: "/bugs",
    accent: "oklch(0.63 0.20 25)",
  },
  {
    id: "support",
    icon: LifeBuoy,
    title: "Join our support server?",
    detail: "Direct access to instructors and maintainers.",
    action: "Get Help",
    href: "https://discord.gg/66GA8MNPeB",
    external: true,
    accent: "oklch(0.72 0.17 196)",
  },
]

const STORAGE_KEY = "opensyntax-dismissed-prompts"

function getDismissed(): Set<string> {
  try {
    const raw = globalThis.localStorage?.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch { return new Set() }
}

function saveDismissed(set: Set<string>) {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify([...set]))
  } catch { /* noop */ }
}

export function Prompts() {
  const [active, setActive] = useState<PromptType | null>(null)
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const pathname = usePathname()

  useEffect(() => {
    setDismissed(getDismissed())
  }, [])

  useEffect(() => {
    const stored = getDismissed()
    const timer = setTimeout(() => {
      let pick: PromptType = "discord"
      if (pathname === "/bugs") pick = "discord"
      else if (pathname === "/dashboard") pick = "bugs"
      else if (pathname === "/") pick = "support"
      else pick = "discord"

      if (!stored.has(pick)) setActive(pick)
    }, 8000)

    return () => clearTimeout(timer)
  }, [pathname])

  const dismiss = () => {
    if (active) {
      const next = new Set(dismissed)
      next.add(active)
      setDismissed(next)
      saveDismissed(next)
      setActive(null)
    }
  }

  const current = PROMPTS.find(p => p.id === active && !dismissed.has(p.id))

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] w-[calc(100vw-32px)] sm:w-[300px] pointer-events-auto"
        >
          <div className="bg-card border border-border rounded-2xl p-5 shadow-2xl overflow-hidden relative group">
            <button 
              onClick={dismiss}
              className="absolute top-3 right-3 p-1 text-muted-foreground/40 hover:text-foreground transition-colors z-20"
            >
              <X size={14} />
            </button>

            <div className="flex items-start gap-4">
              <div 
                className="p-2.5 rounded-xl flex-shrink-0"
                style={{ background: current.accent + "15", border: `1px solid ${current.accent}20` }}
              >
                <current.icon size={18} style={{ color: current.accent }} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-foreground mb-1 leading-tight tracking-tight">{current.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">{current.detail}</p>
                
                <Link 
                  href={current.href}
                  target={current.external ? "_blank" : undefined}
                  rel={current.external ? "noopener noreferrer" : undefined}
                  onClick={dismiss}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-[10px] font-bold transition-all hover:gap-3 shadow-lg"
                >
                  {current.action}
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Background Glow */}
            <div 
              className="absolute -right-4 -bottom-4 h-20 w-20 rounded-full blur-[40px] opacity-10 pointer-events-none"
              style={{ background: current.accent }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

