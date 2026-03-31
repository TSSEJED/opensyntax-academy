import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

export const metadata: Metadata = {
  title: "Mobile Engineering — React Native, Expo & Reanimated",
  description: "Build production React Native apps. 60fps animations with Reanimated 3 worklets, Expo Router navigation, native module bridging, and EAS CI/CD.",
  keywords: ["React Native Course", "Mobile Development", "Expo Tutorial", "Reanimated", "Mobile App Development", "iOS Android"],
}

const mobileModules: Module[] = [
  {
    id: "mobile-tier-1", title: "Tier 1: Foundations — Native Bridge & UI",
    lessons: [
      {
        id: "rn-primitives", title: "React Native Primitives & Styling", duration: "30 min",
        description: "Moving from the DOM to Native Views. Understanding Flexbox on mobile and the asynchronous bridge.",
        content: `<h2>The Native Bridge</h2>
<p>React Native doesn't use the DOM. Instead, it maps your JavaScript components to <strong>Native UI Views</strong> (UIView on iOS, View on Android) via a C++ bridge.</p>
<h3>Mobile Layouts</h3>
<p>In mobile, <strong>Flexbox</strong> is the only layout engine. Unlike the web, the default direction is <code>column</code>. We use <code>StyleSheet.create</code> to ensure style objects are sent across the bridge efficiently.</p>`
      }
    ]
  },
  {
    id: "mobile-tier-2", title: "Tier 2: Intermediate — Navigation & State",
    lessons: [
      {
        id: "expo-router", title: "Expo Router & File-based Navigation", duration: "45 min",
        description: "Modern mobile navigation. Shared layouts, stack navigators, and deep linking with Expo.",
        content: `<h2>Expo Router Mastery</h2>
<p>Expo Router brings the 'Next.js' experience to mobile. By using an <code>app/</code> directory, we get file-based routing that automatically generates <strong>Native Stack</strong> and <strong>Tab</strong> navigators.</p>
<h3>Persistence & State</h3>
<p>Mobile apps aren't just website wrappers. We use <strong>AsyncStorage</strong> for light persistent data and <strong>React Query</strong> to manage server state with offline-first support.</p>`
      }
    ]
  },
  {
    id: "mobile-tier-3", title: "Tier 3: Production — Performance & Native Modules",
    lessons: [
      {
        id: "reanimated-eas", title: "60fps Animations & EAS CI/CD", duration: "60 min",
        description: "Bypassing the JS thread with Reanimated 3 worklets. Native module bridging and cloud-based EAS deployments.",
        content: `<h2>Fluid UI with Reanimated</h2>
<p>To achieve 60fps, we must move compute to the UI thread. <strong>Reanimated 3</strong> uses 'worklets'—JavaScript functions that run purely in C++ on the native side, preventing UI lag.</p>
<h3>EAS & Over-The-Air Updates</h3>
<p>We use <strong>EAS (Expo Application Services)</strong> to build binaries in the cloud. With <strong>EAS Update</strong>, we can push hotfixes to users instantly without waiting for App Store reviews.</p>
<p><strong>Performance Tip:</strong> Use <strong>FlashList</strong> (by Shopify) instead of FlatList for massive lists to ensure smooth scrolling on low-end Android devices.</p>`
      }
    ]
  }
]

export default function MobilePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Mobile Engineering · React Native"
        description="Build high-performance native apps for iOS and Android. From bridge fundamentals and Expo layouts to 60fps Reanimated worklets and cloud deployments."
        category="Mobile"
        accentColor="#3DDC84"
        modules={mobileModules}
        instructor="Evan Bacon"
        rating={4.8}
        reviewCount={2040}
        lastUpdated="Mar 2026"
      />
    </div>
  )
}
