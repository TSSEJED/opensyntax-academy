"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const TESTIMONIALS = [
  {
    name: "Alex Chen",
    role: "Full-Stack Engineer at Stripe",
    quote: "OpenSyntax's Next.js course is the best free resource I've found. The 'use cache' and Server Actions lessons are production-grade. I got promoted months after completing the web track.",
    avatar: "AC",
    accentColor: "#00C6FF",
  },
  {
    name: "Priya Sharma",
    role: "ML Engineer at DeepMind",
    quote: "The AI/ML Engineering path covers RAG, fine-tuning, and MLOps better than paid platforms I've tried. The quiz sections really test your understanding.",
    avatar: "PS",
    accentColor: "#A259FF",
  },
  {
    name: "Marcus Johnson",
    role: "Discord Bot Developer",
    quote: "I went from basic discord.py scripts to a sharded, production-ready bot serving 50k users. The PostgreSQL + Redis lessons were game-changing.",
    avatar: "MJ",
    accentColor: "#7289DA",
  },
  {
    name: "Sarah Nakamura",
    role: "Security Researcher",
    quote: "The Cybersecurity course doesn't just teach theory — it shows you real exploit patterns and how to defend against them. OWASP Top 10 done right.",
    avatar: "SN",
    accentColor: "#FF4D4D",
  },
  {
    name: "David Park",
    role: "DevOps Lead at Cloudflare",
    quote: "Kubernetes, Terraform, and GitHub Actions all in one course? And it's free? This is what open-source education should look like.",
    avatar: "DP",
    accentColor: "#0DB7ED",
  },
  {
    name: "Luna Torres",
    role: "Blockchain Developer",
    quote: "The Solidity security patterns section alone saved me from a reentrancy vulnerability in production. OpenSyntax teaches what matters for real-world Web3.",
    avatar: "LT",
    accentColor: "#F6851B",
  },
]

export function TestimonialsSection() {
  return (
    <section className="border-t border-border bg-gradient-to-b from-background to-secondary/20 py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-primary uppercase tracking-widest mb-4"
          >
            Community Voices
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-foreground tracking-tight"
          >
            Trusted by developers<br />at every level
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            From juniors landing their first role to senior engineers sharpening their edge — hear what they have to say.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
              className="group relative flex flex-col rounded-3xl border border-border bg-background p-7 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote
                size={28}
                className="text-primary/15 mb-4 group-hover:text-primary/30 transition-colors"
              />

              {/* Quote text */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6 group-hover:text-foreground/80 transition-colors">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.accentColor}, ${t.accentColor}99)` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-[11px] text-muted-foreground">{t.role}</p>
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-[50px] opacity-0 group-hover:opacity-15 transition-opacity pointer-events-none"
                style={{ background: t.accentColor }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
