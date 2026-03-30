import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const reactPatternsModules: Module[] = [
  {
    id: "compound-components", title: "Module 1 — Component Architecture",
    lessons: [
      {
        id: "implicit-context", title: "Compound Components via Context", duration: "30 min",
        description: "Build flexible UI components like Tabs and Accordions used in libraries like Radix UI.",
        content: `<h2>Building Compound Components</h2>
<p>Instead of passing massive prop objects (e.g., <code>&lt;Tabs data={...} /&gt;</code>), compound components share implicit state via React Context, enabling extreme compositional flexibility.</p>
<pre><code class="language-tsx">import { createContext, useContext, useState } from 'react';

const TabsContext = createContext(null);

function Tabs({ children, defaultValue }) {
  const [active, setActive] = useState(defaultValue);
  return (
    &lt;TabsContext.Provider value={{ active, setActive }}&gt;
      {children}
    &lt;/TabsContext.Provider&gt;
  )
}

function TabList({ children }) {
  return &lt;div className="tab-list"&gt;{children}&lt;/div&gt;
}

function Tab({ value, children }) {
  const { active, setActive } = useContext(TabsContext);
  return (
    &lt;button 
      onClick={() =&gt; setActive(value)} 
      className={active === value ? 'active' : ''}
    &gt;
      {children}
    &lt;/button&gt;
  )
}

function TabPanel({ value, children }) {
  const { active } = useContext(TabsContext);
  if (value !== active) return null;
  return &lt;div className="panel"&gt;{children}&lt;/div&gt;
}

// Composition Usage
&lt;Tabs defaultValue="account"&gt;
  &lt;TabList&gt;
    &lt;Tab value="account"&gt;Account&lt;/Tab&gt;
    &lt;Tab value="security"&gt;Security&lt;/Tab&gt;
  &lt;/TabList&gt;
  &lt;TabPanel value="account"&gt;Your info here.&lt;/TabPanel&gt;
&lt;/Tabs&gt;
</code></pre>`
      },
      {
        id: "render-props", title: "Render Props & Custom Hooks", duration: "25 min",
        description: "Separate logic from UI using inversion of control.",
        content: `<h2>The Render Prop Pattern</h2>
<p>Before Hooks, render props were the only way to share stateful logic. While Hooks replaced most use-cases, render props remain incredibly powerful for inversion of control within list virtualizers and drag-and-drop engines.</p>
<pre><code class="language-tsx">&lt;List
  items={users}
  renderItem={(item, index) =&gt; (
    &lt;UserRow key={item.id} user={item} isEven={index % 2 === 0} /&gt;
  )}
/&gt;
</code></pre>
<p>This allows the <code>&lt;List&gt;</code> component to handle virtualization, scrolling math, and window intersection, but it completely yields the UI rendering definition back to the consumer component.</p>`
      },
    ],
  },
  {
    id: "react-performance", title: "Module 2 — Rendering Internals",
    lessons: [
      {
        id: "suspense-boundaries", title: "Suspense Architecture", duration: "35 min",
        description: "Coordinate async UI loading states using React Suspense and Error Boundaries.",
        content: `<h2>Flipping Loading State Upside Down</h2>
<p>Normally, a component fetches data internally and manages an <code>isLoading</code> boolean. With <strong>Suspense</strong>, the component throws a Promise to the nearest boundary. It halts rendering entirely until the Promise resolves.</p>
<pre><code class="language-tsx">import { Suspense } from 'react';

// A boundary coordinates all children loading states
// If Profile data is slow, the entire ProfileUI shows a fallback
// rather than rendering half a page.
function Dashboard() {
  return (
    &lt;Suspense fallback={&lt;SkeletonPage /&gt;}&gt;
      &lt;ProfileUI /&gt;
      &lt;Suspense fallback={&lt;Spinner /&gt;}&gt;
        &lt;SlowAnalyticsWidget /&gt;
      &lt;/Suspense&gt;
    &lt;/Suspense&gt;
  )
}
</code></pre>
<p>If <code>SlowAnalyticsWidget</code> suspends, the primary Profile still renders! Suspense gives you declarative control over the waterfall orchestration of your application.</p>`
      },
      {
        id: "usememo-callback", title: "useMemo & useCallback Limits", duration: "20 min",
        description: "Stop using useMemo everywhere. Understand object reference identity in dependency arrays.",
        content: `<h2>Reference Equality</h2>
<p>React compares props and dependency arrays using <code>Object.is()</code>. Every time a component renders, inline objects and inline functions get new memory addresses.</p>
<pre><code class="language-tsx">function Profile() {
  // Bad: Causes child to re-render every time
  const style = { color: 'red' }; 
  
  // Okay: Preserves memory address
  const style = useMemo(() =&gt; ({ color: 'red' }), []);

  return &lt;MemoizedChild style={style} /&gt;
}
</code></pre>
<p>However, <code>useMemo</code> is expensive! Only wrap expensive mathematical calculations, or objects being passed entirely into customized <code>React.memo</code> components or <code>useEffect</code> dependency arrays.</p>`
      },
      {
        id: "concurrent-react", title: "Concurrent Rendering & useTransition", duration: "20 min",
        description: "Keep your UI unblocked during heavy state updates without loading spinners.",
        content: `<h2>Non-blocking Transitions</h2>
<p>By default, state updates are urgent. If you update a list of 10,000 items, the thread is blocked, freezing inputs and hover effects. <code>useTransition</code> marks state updates as low-priority interrupts.</p>
<pre><code class="language-tsx">const [isPending, startTransition] = useTransition();
const [query, setQuery] = useState("");

function handleChange(e) {
  // Urgent: Updates input instantly
  setInputValue(e.target.value); 
  
  // Low priority: Renders the expensive list in the background
  startTransition(() =&gt; {
    setQuery(e.target.value);
  });
}
</code></pre>`
      },
    ],
  },
]

export default function ReactPatternsPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="React Advanced Patterns"
        description="Master the patterns used by world-class React libraries. Compound components with implicit context, render prop patterns, Suspense architecture, concurrent features, and React Profiler-driven optimization."
        category="Web"
        accentColor="#61DAFB"
        modules={reactPatternsModules}
        instructor="Dan Abramov"
        rating={4.7}
        reviewCount={2200}
        lastUpdated="Nov 2025"
      />
    </div>
  )
}
