import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const typescriptModules: Module[] = [
  {
    id: "ts-generics", title: "Module 1 — The Type System",
    lessons: [
      {
        id: "generics", title: "Generics & Constraints", duration: "25 min",
        description: "Write reusable functions while maintaining strict type safety.",
        content: `<h2>Understanding Generics</h2>
<p>Generics allow a component to work over a variety of types rather than a single one. They act as type variables.</p>
<pre><code class="language-typescript">function getFirstElement&lt;T&gt;(arr: T[]): T | undefined {
  return arr[0];
}

const num = getFirstElement([1, 2, 3]);    // T is inferred as number
const str = getFirstElement(['a', 'b']);  // T is inferred as string
</code></pre>
<h3>Constraints</h3>
<p>Sometimes you need to ensure a generic type has specific properties using the <code>extends</code> keyword.</p>
<pre><code class="language-typescript">interface HasLength {
  length: number;
}

function logLength&lt;T extends HasLength&gt;(item: T): void {
  console.log(item.length);
}

logLength("Hello"); // Works (string has length)
logLength([1, 2]);  // Works (array has length)
// logLength(42);   // Error: number doesn't have length
</code></pre>`
      },
      {
        id: "conditional-types", title: "Conditional Types", duration: "30 min",
        description: "Write logic inside the type system using ternary operations and generic inference.",
        content: `<h2>Conditional Types</h2>
<p>Conditional types take the form <code>T extends U ? X : Y</code>, matching standard JavaScript ternary logic, but evaluating types.</p>
<pre><code class="language-typescript">type IsString&lt;T&gt; = T extends string ? true : false;

type A = IsString&lt;"hello"&gt;; // true
type B = IsString&lt;42&gt;;      // false
</code></pre>
<h3>Unwrapping with 'infer'</h3>
<p>You can destructure types conditionally using the <code>infer</code> keyword. Useful for extracting the return type of a promise.</p>
<pre><code class="language-typescript">type UnpackPromise&lt;T&gt; = T extends Promise&lt;infer U&gt; ? U : T;

type Result = UnpackPromise&lt;Promise&lt;string&gt;&gt;; // string
</code></pre>`
      },
      {
        id: "mapped-types", title: "Mapped Types & Modifiers", duration: "20 min",
        description: "Transform existing Object interfaces iteratively.",
        content: `<h2>Mapped Types</h2>
<p>Mapped types iterate over the keys of an existing type to produce a new type. This is how utilities like <code>Partial&lt;T&gt;</code> and <code>Readonly&lt;T&gt;</code> are built in the standard library.</p>
<pre><code class="language-typescript">type User = {
  id: number;
  name: string;
};

// Custom implementation of Readonly
type MyReadonly&lt;Type&gt; = {
  readonly [Key in keyof Type]: Type[Key];
};

type ReadonlyUser = MyReadonly&lt;User&gt;;

// Adding modifiers via template literals
type Getters&lt;Type&gt; = {
    [Property in keyof Type as \`get\${Capitalize&lt;string &amp; Property&gt;}\`]: () =&gt; Type[Property]
};

type UserGetters = Getters&lt;User&gt;;
// { getId: () =&gt; number; getName: () =&gt; string; }
</code></pre>`
      },
    ],
  },
  {
    id: "ts-runtime", title: "Module 2 — Runtime & Tooling",
    lessons: [
      {
        id: "zod-validation", title: "Runtime Safety with Zod", duration: "25 min",
        description: "Bridge the gap between compile-time TypeScript and runtime data processing.",
        content: `<h2>Zod Schema Validation</h2>
<p>TypeScript disappears at runtime. When fetching data from an API, a generic <code>as User</code> cast is dangerous. <strong>Zod</strong> validates payloads at runtime and infers the exact TypeScript types.</p>
<pre><code class="language-typescript">import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  username: z.string().min(3),
  email: z.string().email(),
  tags: z.array(z.string()).optional()
});

// Infer TS type directly from the schema!
type User = z.infer&lt;typeof UserSchema&gt;;

// Using it safely
const res = await fetch('/api/user/1');
const data = await res.json();

try {
  // Throws highly readable error if JSON doesn't match
  const validUser: User = UserSchema.parse(data);
} catch(e) {
  console.error("Invalid API payload");
}
</code></pre>`
      },
      {
        id: "trpc", title: "End-to-End Type Safety with tRPC", duration: "35 min",
        description: "Share your backend TypeScript definitions directly with your frontend without codegen.",
        content: `<h2>tRPC (TypeScript Remote Procedure Call)</h2>
<p>Traditional APIs require swagger docs, GraphQL generation, or manual typing. tRPC utilizes <strong>TypeScript inference</strong> directly between your server router and React client.</p>
<h3>Server Definition</h3>
<pre><code class="language-typescript">import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const appRouter = t.router({
  getUser: t.procedure
    .input(z.string())
    .query((opts) =&gt; {
      // Backend logic
      return { id: opts.input, name: 'Alice' }; 
    }),
});

export type AppRouter = typeof appRouter;
</code></pre>
<h3>Client Usage</h3>
<pre><code class="language-tsx">// Client infers the input requirements and return type!
const { data, isLoading } = trpc.getUser.useQuery('1');

if (data) {
  // Full autocomplete: data.id, data.name
}
</code></pre>
<p>If you change the API return type on the server, your frontend will immediately show a TypeScript compilation error. No codegen required.</p>`
      },
    ],
  },
]

export default function TypescriptPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="TypeScript Mastery"
        description="Move beyond basic TypeScript into the type system's most powerful features. Conditional types, infer keyword, mapped type modifiers, template literal types, and type-safe API patterns."
        category="Web"
        accentColor="#3178C6"
        modules={typescriptModules}
        instructor="Matt Pocock"
        rating={4.9}
        reviewCount={3400}
        lastUpdated="Dec 2025"
      />
    </div>
  )
}
