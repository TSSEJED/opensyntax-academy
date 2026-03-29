import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const modules: Module[] = [
  {
    id: "query-opt",
    title: "Module 1 \u2014 Query Optimization",
    lessons: [
      {
        id: "explain-analyze",
        title: "Reading EXPLAIN ANALYZE",
        duration: "28 min",
        description: "Decode PostgreSQL query plans and systematically eliminate sequential scans.",
        content: `<h2>Reading EXPLAIN ANALYZE Like a Pro</h2>
<p><code>EXPLAIN ANALYZE</code> shows exactly what PostgreSQL did — not what you hoped it would do.</p>
<h3>Reading a Query Plan</h3>
<pre><code>EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT u.email, COUNT(o.id), SUM(o.total)
FROM users u JOIN orders o ON o.user_id = u.id
WHERE u.country = 'TN'
  AND o.created_at >= NOW() - INTERVAL '30 days'
GROUP BY u.id ORDER BY 3 DESC LIMIT 20;

-- Output (key nodes):
-- Limit  (actual time=892ms)
--   Sort  (Sort Method: top-N heapsort)
--     HashAggregate
--       Hash Join
--         Seq Scan on orders   ← ⚠️ 2.8M rows filtered!
--         Index Scan on users  (index: users_country_idx)</code></pre>
<h3>Fix — Partial Index on Recent Orders</h3>
<pre><code>-- Create a partial index covering only recent orders
CREATE INDEX CONCURRENTLY idx_orders_user_recent
ON orders (user_id, total)
WHERE created_at >= NOW() - INTERVAL '90 days';

-- Result: 892ms → 8ms. Sequential scan eliminated.</code></pre>
<h3>MVCC Bloat — Why VACUUM Matters</h3>
<pre><code>-- PostgreSQL writes new row versions on UPDATE/DELETE
-- Old versions accumulate as "dead tuples"

SELECT relname, pg_size_pretty(pg_relation_size(relid)), n_dead_tup
FROM pg_stat_user_tables ORDER BY n_dead_tup DESC LIMIT 10;

VACUUM (ANALYZE, VERBOSE) orders;
-- For extreme bloat: pg_repack --table orders mydb (no lock required)</code></pre>`,
      },
    ],
  },
]

export default function CoursePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Database Engineering"
        description="PostgreSQL internals, EXPLAIN ANALYZE mastery, index strategies, MVCC, and Redis patterns."
        category="Systems"
        accentColor="oklch(0.55 0.13 235)"
        modules={modules}
      />
    </div>
  )
}
