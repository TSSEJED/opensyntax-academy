import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeaturesSection } from "@/components/features-section"
import { CommunityCTA } from "@/components/community-cta"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main>
        <Hero />
        <FeaturesSection />
        <CommunityCTA />
      </main>
      <Footer />
    </div>
  )
}
