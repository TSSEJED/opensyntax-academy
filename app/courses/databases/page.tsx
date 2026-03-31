import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

export const metadata: Metadata = {
  title: "Database Engineering — PostgreSQL Internals & Redis",
  description: "Understand databases at the internals level. EXPLAIN ANALYZE, B-Tree indexes, MVCC, vacuum tuning, Redis data structures, and event streaming.",
  keywords: ["Database Course", "PostgreSQL Tutorial", "Redis Course", "SQL Optimization", "B-Tree Index", "Database Engineering"],
}

const databasesModules: Module[] = [
  {
    id: "db-tier-1", title: "Tier 1: Foundations — Relational Theory & SQL",
    lessons: [
      {
        id: "sql-basics", title: "SQL Syntax & Normalization", duration: "30 min",
        description: "The core of data integrity. Understanding 1NF, 2NF, 3NF and the power of JOINs.",
        content: `<h2>The Relational Model</h2>
<p>Databases aren't just for storage; they are for ensuring <strong>Data Integrity</strong>. By following normalization rules, we prevent data duplication and update anomalies.</p>
<h3>The power of JOINs</h3>
<p>SQL allows us to pull related data across tables efficiently. Understanding <strong>Inner</strong>, <strong>Left</strong>, and <strong>Full Outer Joins</strong> is the first step toward complex data reporting.</p>`
      }
    ]
  },
  {
    id: "db-tier-2", title: "Tier 2: Intermediate — Optimization & Caching",
    lessons: [
      {
        id: "indexing-redis", title: "B-Tree Indexes & Redis Caching", duration: "45 min",
        description: "How to make queries fly. EXPLAIN ANALYZE mastery and in-memory caching strategies.",
        content: `<h2>Mastering Performance</h2>
<p>Slow queries kill applications. We use <strong>Indexes</strong> to turn O(n) scans into O(log n) lookups. Using <code>EXPLAIN ANALYZE</code>, we can see exactly where the database bottleneck is.</p>
<h3>Redis Caching</h3>
<p>The fastest database is the one you don't call. We use <strong>Redis</strong> to store frequently accessed data in RAM, reducing load on our primary PostgreSQL instance.</p>`
      }
    ]
  },
  {
    id: "db-tier-3", title: "Tier 3: Production — Systems Internals",
    lessons: [
      {
        id: "mvcc-streaming", title: "MVCC, Vacuuming & Event Streaming", duration: "60 min",
        description: "Multi-Version Concurrency Control (MVCC) internals and building event-driven systems with Redis Streams.",
        content: `<h2>PostgreSQL Internals</h2>
<p>To scale to millions of users, you must understand **MVCC**. PostgreSQL doesn't overwrite data; it creates 'dead tuples'. Configuring <strong>Autovacuum</strong> correctly is critical to prevent database bloat.</p>
<h3>Event Streaming</h3>
<p>Modern architectures are event-driven. We use <strong>Redis Streams</strong> with <strong>Consumer Groups</strong> to ensure reliable message processing across multiple distributed workers.</p>
<p><strong>System Tip:</strong> For high-availability, implement <strong>Logical Replication</strong> to keep a standby database in sync for instant failover.</p>`
      }
    ]
  }
]

export default function DatabasesPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Database Engineering"
        description="Master the systems data layer. From relational theory and SQL normalization to PostgreSQL internals and high-performance event streaming."
        category="Systems"
        accentColor="#336791"
        modules={databasesModules}
        instructor="Martin Kleppmann"
        rating={5.0}
        reviewCount={1100}
        lastUpdated="Mar 2026"
      />
    </div>
  )
}
