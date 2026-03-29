"use client"

import { useState, useEffect } from "react"
import { SearchPalette } from "@/components/search-palette"
import { Prompts } from "@/components/prompts"

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <Prompts />
      {children}
    </>
  )
}
