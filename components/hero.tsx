"use client"

import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { Hero3DScene } from "./hero-3d-scene"

export function Hero() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 pt-28 pb-20 text-center overflow-hidden">
      {/* 3D Scene Background */}
      <Hero3DScene />

      {/* Light Mode Grid bg */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} />
      </div>
      
      <div className="absolute inset-0 -z-20"
        style={{ backgroundImage: "linear-gradient(to right, oklch(0.9 0.03 260 / 0.5) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0.03 260 / 0.5) 1px, transparent 1px)", backgroundSize: "44px 44px" }}
        aria-hidden="true" />

      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="relative z-10 flex flex-col items-center max-w-5xl"
      >
        {/* Badge */}
        <motion.div variants={item} className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-md px-5 py-2 text-sm text-foreground shadow-sm hover:shadow-md transition-shadow">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          Next-Level Open Source Education
        </motion.div>

        {/* Headline */}
        <motion.div variants={item}>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-foreground leading-[1.1]">
            Master the Art of<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600">
              Advanced Development
            </span>
          </h1>
        </motion.div>

        <motion.div variants={item}>
          <p className="mt-8 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            A premium, completely free platform built to elevate your skills. Forget toy examples—dive deep into the real architectures powering production systems today.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link href="#courses" className="group inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-base font-bold bg-primary text-primary-foreground shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            Start Learning Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="https://discord.gg/66GA8MNPeB" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold border-2 border-border text-foreground hover:border-discord hover:text-discord shadow-sm transition-all duration-300 hover:shadow-lg">
            <Play className="w-5 h-5 fill-current" />
            Watch Trailer
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-4xl border-t border-border/50 pt-10">
          {[["11", "Premium Courses"], ["200+", "In-depth Lessons"], ["50h+", "Video Content"], ["100%", "Free Forever"]].map(([n, l]) => (
            <div key={l} className="text-center group">
              <p className="text-4xl md:text-5xl font-black text-foreground tracking-tight group-hover:scale-110 group-hover:text-primary transition-all duration-300 delay-75">{n}</p>
              <p className="text-sm font-medium text-muted-foreground mt-2 uppercase tracking-widest">{l}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
