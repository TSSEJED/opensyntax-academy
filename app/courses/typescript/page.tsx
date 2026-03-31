import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

export const metadata: Metadata = {
  title: "TypeScript Mastery — Generics, Conditional Types & tRPC",
  description: "Move beyond basic TypeScript. Conditional types, infer keyword, mapped types, Zod validation, and end-to-end type safety with tRPC.",
  keywords: ["TypeScript Course", "Advanced TypeScript", "tRPC Tutorial", "Zod Validation", "Type-Safe API", "Generics"],
}

const typescriptModules: Module[] = [
  {
    id: "ts-tier-1", title: "Tier 1: Foundations — Static Typing Core",
    lessons: [
      {
        id: "interfaces-enums", title: "Interfaces, Types & Enums", duration: "30 min",
        description: "The building blocks of type safety. When to use Interfaces vs. Type aliases and the pitfalls of Enums.",
        content: `<h2>Interfaces vs Type Aliases</h2>
<p>Both allow you to describe the shape of an object, but <strong>Interfaces</strong> are extendable (declaration merging), while <strong>Types</strong> are more flexible (unions, intersections).</p>
<h3>The Enum Problem</h3>
<p>Modern TypeScript often avoids <code>enum</code> in favor of <strong>const objects</strong> or <strong>union types</strong>, which result in smaller, more idiomatic JavaScript code after compilation.</p>`
      }
    ]
  },
  {
    id: "ts-tier-2", title: "Tier 2: Intermediate — Advanced Type Logic",
    lessons: [
      {
        id: "generics-conditional", title: "Generics & Conditional Types", duration: "45 min",
        description: "Write reusable logic inside the type system. Using 'extends', 'infer', and template literal types.",
        content: `<h2>Generics: Type Variables</h2>
<p>Generics act as placeholders for types. They allow you to write a function once and use it safely with numbers, strings, or custom objects.</p>
<pre><code class="language-typescript">function wrap<T>(item: T): { data: T } {
  return { data: item };
}</code></pre>
<h3>Conditional Types</h3>
<p>Using the ternary syntax at the type level: <code>T extends U ? X : Y</code>. This allows for complex transformations like unwrapping promises or stripping nullability.</p>`
      }
    ]
  },
  {
    id: "ts-tier-3", title: "Tier 3: Production — End-to-End Safety",
    lessons: [
      {
        id: "zod-trpc", title: "Zod Schema Validation & tRPC", duration: "55 min",
        description: "Bridging the gap between server and client. Runtime validation and type-safe API communication.",
        content: `<h2>Runtime Safety with Zod</h2>
<p>TypeScript disappears at runtime. We use <strong>Zod</strong> to validate incoming JSON data, ensuring our application never processes malformed payloads.</p>
<h3>The tRPC Revolution</h3>
<p>For full-stack TypeScript apps, <strong>tRPC</strong> eliminates the need for manual API definitions. The client infers the backend types directly, resulting in 100% type safety from the database to the UI.</p>
<p><strong>Design Tip:</strong> Use <strong>Moulded Types</strong>—derive your API schemas from your database models to ensure one source of truth for your data shapes.</p>`
      }
    ]
  }
]

export default function TypescriptPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="TypeScript Mastery"
        description="Master the most powerful type system in the world. From basic interfaces to advanced conditional types and production-grade end-to-end safety."
        category="Web"
        accentColor="#3178C6"
        modules={typescriptModules}
        instructor="Matt Pocock"
        rating={4.9}
        reviewCount={3400}
        lastUpdated="Mar 2026"
      />
    </div>
  )
}
