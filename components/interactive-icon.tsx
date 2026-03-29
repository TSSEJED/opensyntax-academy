"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface InteractiveIconProps {
  children: ReactNode
}

export function InteractiveIcon({ children }: InteractiveIconProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="flex items-center justify-center w-12 h-12 rounded-xl border border-border bg-gradient-to-br from-card to-secondary shadow-sm"
    >
      {children}
    </motion.div>
  )
}
