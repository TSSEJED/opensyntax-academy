import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const databasesModules: Module[] = [
  {
    id: "pg-internals", title: "Module 1 — PostgreSQL Internals",
    lessons: [
      {
        id: "explain-analyze", title: "EXPLAIN ANALYZE", duration: "25 min",
        description: "Stop guessing why queries are slow. Learn to read PostgreSQL query execution plans.",
        content: `<h2>Query Optimization</h2>
<p>When you run an SQL query, the database planner evaluates possible execution paths. Prefixing a query with <code>EXPLAIN ANALYZE</code> forces the DB to execute it and print the exact cost metrics.</p>
<pre><code class="language-sql">EXPLAIN ANALYZE 
SELECT * FROM users WHERE last_login > '2023-01-01';

-- Output snippets:
-- Seq Scan on users (cost=0.00..541.00 rows=145 width=15) (actual time=0.012..1.503 rows=140 loops=1)
--   Filter: (last_login > '2023-01-01 00:00:00'::timestamp without time zone)
</code></pre>
<p>A "Seq Scan" (Sequential Scan) means the database read the entire table into memory line by line. On a 10-million row table, this will crash your API.</p>`
      },
      {
        id: "btree-indexes", title: "B-Tree Index Strategies", duration: "35 min",
        description: "How B-Trees physically order data on disk, and when to use composite vs. partial indexes.",
        content: `<h2>B-Tree Mechanics</h2>
<p>Databases use Balanced Trees (B-Trees) to navigate to a row in <code>O(log n)</code> time instead of <code>O(n)</code>. But blindly adding indexes is dangerous—every index slows down INSERT operations because the tree must be updated.</p>
<h3>Partial Indexes</h3>
<p>If you only ever query for <em>active</em> users, don't index the whole table. A partial index is tiny and sits entirely in RAM.</p>
<pre><code class="language-sql">CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';
</code></pre>
<h3>Composite Indexes</h3>
<p>An index on <code>(last_name, first_name)</code> works like a phonebook. It helps queries filtering on <em>just</em> <code>last_name</code>, or both, but it <strong>cannot</strong> be used to filter on <em>just</em> <code>first_name</code> without doing a full scan!</p>`
      },
    ],
  },
  {
    id: "redis-caching", title: "Module 2 — In-Memory Architecture",
    lessons: [
      {
        id: "redis-datatypes", title: "Redis Data Structures", duration: "30 min",
        description: "Move beyond simple string KV pairs with Redis Hashes, Sets, and Sorted Sets.",
        content: `<h2>Redis Complex Types</h2>
<p>Redis isn't just memcached. It supports atomic operations on complex data structures natively.</p>
<h3>ZSET (Sorted Sets)</h3>
<p>Perfect for real-time leaderboards. A Sorted Set couples strings with a floating-point score, keeping them ordered internally in O(1) time.</p>
<pre><code class="language-bash"># Add users to a global leaderboard with scores
ZADD leaderboard 500 "user_1"
ZADD leaderboard 800 "user_2"

# Get top 10 users instantly
ZREVRANGE leaderboard 0 9 WITHSCORES
</code></pre>
<h3>Hashes (HSET)</h3>
<p>Instead of stringifying a massive JSON object and storing it under one key (requiring heavy serialization to update a single field), map an object directly to a Redis Hash.</p>
<pre><code class="language-bash"># Update just the name without fetching the whole object
HSET user:1001 name "Alice" age 24
HINCRBY user:1001 age 1 # Happy birthday
</code></pre>`
      },
      {
        id: "pubsub-streams", title: "Pub/Sub vs. Streams", duration: "25 min",
        description: "Architect event-driven systems using Redis Streams and Consumer Groups.",
        content: `<h2>Event Streaming</h2>
<p>Redis Pub/Sub is fire-and-forget. If a subscriber disconnects, it loses messages. <strong>Redis Streams</strong> introduced durable logs with Kafka-like consumer groups.</p>
<pre><code class="language-bash"># Add a message to the stream
XADD api_requests * endpoint "/login" method "POST"
</code></pre>
<p>You can define <strong>Consumer Groups</strong> that ensure multiple worker processes share the load of processing events, with internal "acknowledgment" tracking (XACK). If a worker crashes mid-process, the message is tracked in a Pending Entries List (PEL) for retry.</p>`
      },
      {
        id: "mvcc-vacuum", title: "MVCC & Vacuum Tuning", duration: "20 min",
        description: "Why your database randomly locks up: understanding Multi-Version Concurrency Control.",
        content: `<h2>MVCC Mechanics</h2>
<p>In PostgreSQL, when you <code>UPDATE</code> a row, it doesn't overwrite it. It leaves the old row on the disk (so current readers don't get locked) and writes a new row. The old row becomes a "dead tuple".</p>
<p>If you don't aggressively configure <code>autovacuum</code>, these dead tuples bloat your storage and destroy sequence scan performance. We'll cover how to analyze the <code>pg_stat_user_tables</code> to determine exactly how bloated your live tables have become.</p>`
      },
    ],
  },
]

export default function DatabasesPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Database Engineering"
        description="Understand databases at the internals level. EXPLAIN ANALYZE mastery, B-tree vs GIN vs BRIN index strategies, MVCC, vacuum tuning, Redis data structures, and schema design for high-write workloads."
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
