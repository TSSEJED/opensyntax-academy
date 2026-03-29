import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const modules: Module[] = [
  {
    id: "advanced-types",
    title: "Module 1 \u2014 Advanced Type System",
    lessons: [
      {
        id: "conditional-types",
        title: "Conditional & Mapped Types",
        duration: "26 min",
        description: "Build type-safe utilities using conditional types, the infer keyword, and mapped type modifiers.",
        content: `<h2>Conditional & Mapped Types</h2>
<p>TypeScript's type system is Turing-complete. These patterns encode complex constraints at the type level, catching entire classes of bugs at compile time.</p>
<h3>Conditional Types with infer</h3>
<pre><code>// Extract return type of any async function (recursively)
type DeepAwaited&lt;T&gt; =
  T extends Promise&lt;infer U&gt; ? DeepAwaited&lt;U&gt; :
  T extends Array&lt;infer I&gt;  ? Array&lt;DeepAwaited&lt;I&gt;&gt; :
  T

// Extract function return type
type FetcherReturn&lt;T extends (...args: any) =&gt; Promise&lt;any&gt;&gt; =
  DeepAwaited&lt;ReturnType&lt;T&gt;&gt;

const getUser = async (id: string) =&gt; ({ id, name: "Alice", role: "admin" as const })
type User = FetcherReturn&lt;typeof getUser&gt;
//   ^ { id: string; name: string; role: "admin" }</code></pre>
<h3>Mapped Types with Modifiers</h3>
<pre><code>// Deep readonly
type DeepReadonly&lt;T&gt; = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly&lt;T[K]&gt; : T[K]
}

// Pick properties by value type
type PickByValue&lt;T, V&gt; = {
  [K in keyof T as T[K] extends V ? K : never]: T[K]
}

interface Config { apiUrl: string; timeout: number; debug: boolean }
type StringConfig = PickByValue&lt;Config, string&gt;  // { apiUrl: string }</code></pre>
<h3>Template Literal Types</h3>
<pre><code>type Events = {
  userCreated: { id: string; email: string }
  orderPlaced: { orderId: string; total: number }
}
type EventKey = keyof Events

class TypedEmitter {
  on&lt;K extends EventKey&gt;(event: K, handler: (payload: Events[K]) =&gt; void) {}
  emit&lt;K extends EventKey&gt;(event: K, payload: Events[K]) {}
}

const e = new TypedEmitter()
e.on("userCreated", ({ id, email }) =&gt; {})  // fully typed
e.emit("userCreated", { id: "1", email: "a@b.com" })  // wrong shape = compile error</code></pre>`,
      },
    ],
  },
]

export default function CoursePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="TypeScript Mastery"
        description="Conditional types, mapped types, template literals, infer keyword, and type-safe API patterns."
        category="Web"
        accentColor="oklch(0.60 0.16 230)"
        modules={modules}
      />
    </div>
  )
}
