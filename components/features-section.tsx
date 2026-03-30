"use client"

import { BookOpen, Layers, Shield, Zap, Code2, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { InteractiveIcon } from "./interactive-icon"

const features = [
  { icon: BookOpen, title: "Production-Grade Curriculum", description: "Every lesson covers real-world patterns used in production systems — not toy examples." },
  { icon: Layers,   title: "11 Learning Paths",           description: "Web, Discord, AI/ML, DevOps, Security, Blockchain, Mobile, and more — master what matters." },
  { icon: Zap,      title: "Zero Paywalls. Ever.",         description: "No subscriptions, no locked content. Community-funded and free forever by design." },
  { icon: Shield,   title: "Security-First Mindset",       description: "Security concepts woven into every track — from SQL injection to smart contract auditing." },
  { icon: Code2,    title: "Deep Code Examples",           description: "Real, runnable code in every lesson. Copy-paste patterns you can use immediately." },
  { icon: Globe,    title: "Open Source & Forkable",       description: "Every lesson is MIT-licensed. Fork it, translate it, extend it — it's yours." },
]

export function FeaturesSection() {
  return (
    <section className="bg-gradient-to-b from-background to-secondary/30 border-t border-border py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base font-bold text-primary uppercase tracking-widest mb-4"
          >
            Why OpenSyntax
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-foreground tracking-tight"
          >
            Premium learning,<br />permanently free
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            Experience a modern bento-style curriculum engineered for developers who demand the highest quality education without the paywall.
          </motion.p>
        </div>

        <div className="mx-auto max-w-2xl sm:mt-20 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div 
                key={f.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                className="group relative flex flex-col rounded-3xl bg-background border-2 border-border p-8 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300"
              >
                <dt className="flex items-center gap-x-4 font-bold text-xl text-foreground mb-4">
                  <InteractiveIcon>
                    <f.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </InteractiveIcon>
                  {f.title}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">
                  <p className="flex-auto">{f.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
