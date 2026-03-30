import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

export const metadata: Metadata = {
  title: "System Design Course — Scalable Architecture & Distributed Systems",
  description: "Master system design interviews and production architecture. Load balancers, database sharding, message queues, CDN design, rate limiting, and real-world case studies.",
  keywords: ["System Design Course", "Scalable Architecture", "Distributed Systems", "System Design Interview", "Microservices", "Load Balancer"],
}

const systemDesignModules: Module[] = [
  {
    id: "fundamentals", title: "Module 1 — Foundations of Scale",
    lessons: [
      {
        id: "load-balancing", title: "Load Balancing & Reverse Proxies", duration: "30 min",
        description: "Understand Layer 4 vs Layer 7 load balancing, consistent hashing, and health checks.",
        content: `<h2>Load Balancing Strategies</h2>
<p>When a single server can't handle millions of requests, we distribute traffic across a fleet. A <strong>Load Balancer</strong> sits between clients and backend servers, routing requests based on algorithms.</p>
<h3>Layer 4 vs Layer 7</h3>
<p><strong>Layer 4 (Transport)</strong> load balancers operate on TCP/UDP. They're extremely fast because they don't inspect HTTP headers or payloads — they just forward raw packets. <strong>Layer 7 (Application)</strong> balancers inspect HTTP requests and can route based on URL paths, cookies, or headers.</p>
<pre><code class="language-yaml"># NGINX L7 Load Balancer Configuration
upstream backend {
    # Weighted round-robin
    server api-1.internal:8080 weight=5;
    server api-2.internal:8080 weight=3;
    server api-3.internal:8080 weight=2;

    # Health checks
    server api-4.internal:8080 backup;
}

server {
    listen 443 ssl;
    location /api/ {
        proxy_pass http://backend;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # Connection pooling
        keepalive 32;
    }
}</code></pre>
<h3>Consistent Hashing</h3>
<p>Simple round-robin fails when you need session affinity or cache locality. <strong>Consistent hashing</strong> maps both servers and requests onto a virtual ring. When a server is added or removed, only 1/N of requests are remapped.</p>
<pre><code class="language-python">import hashlib

class ConsistentHash:
    def __init__(self, nodes, replicas=150):
        self.ring = {}
        self.sorted_keys = []
        for node in nodes:
            for i in range(replicas):
                key = self._hash(f"{node}:{i}")
                self.ring[key] = node
                self.sorted_keys.append(key)
        self.sorted_keys.sort()

    def _hash(self, key):
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

    def get_node(self, item):
        h = self._hash(item)
        for key in self.sorted_keys:
            if h <= key:
                return self.ring[key]
        return self.ring[self.sorted_keys[0]]
</code></pre>`
      },
      {
        id: "database-sharding", title: "Database Sharding & Partitioning", duration: "35 min",
        description: "Horizontal partitioning strategies, shard key selection, and cross-shard queries.",
        content: `<h2>Horizontal Sharding</h2>
<p>When a single PostgreSQL instance can't handle the write volume (or the dataset exceeds RAM), we split the data across multiple database instances called <strong>shards</strong>.</p>
<h3>Shard Key Selection</h3>
<p>The shard key determines which shard a row lives on. A bad choice creates <strong>hot spots</strong> — one shard gets 90% of traffic while others idle.</p>
<pre><code class="language-python"># Bad shard key: created_at (all recent writes go to one shard)
# Good shard key: user_id (evenly distributed writes)

def get_shard(user_id: int, num_shards: int = 8) -> int:
    """Deterministic shard assignment via modulo"""
    return user_id % num_shards

# User 42 always goes to shard 2
shard = get_shard(42)  # 42 % 8 = 2
</code></pre>
<h3>Cross-Shard Queries</h3>
<p>The fundamental trade-off: queries that span multiple shards (scatter-gather) are expensive. If you frequently JOIN user data with order data, they must live on the same shard (co-located sharding).</p>
<pre><code class="language-sql">-- This query is FAST (single shard lookup)
SELECT * FROM orders WHERE user_id = 42;

-- This query is SLOW (must query ALL shards and merge)
SELECT COUNT(*) FROM orders WHERE created_at > '2026-01-01';
</code></pre>
<p>Production systems like Vitess (used by YouTube) and Citus (PostgreSQL extension) handle this routing transparently.</p>`
      },
      {
        id: "caching-strategies", title: "Caching at Every Layer", duration: "25 min",
        description: "Cache-aside, write-through, write-behind patterns with Redis and CDN edge caching.",
        content: `<h2>Multi-Layer Caching Architecture</h2>
<p>Caching is the single most impactful optimization in system design. But misapplying it causes stale data bugs, thundering herds, and cache stampedes.</p>
<h3>Cache-Aside (Lazy Loading)</h3>
<p>The application checks the cache first. On a miss, it fetches from the database and populates the cache.</p>
<pre><code class="language-python">import redis
import json

cache = redis.Redis(host='localhost', port=6379)

async def get_user(user_id: int):
    # 1. Check cache
    cached = cache.get(f"user:{user_id}")
    if cached:
        return json.loads(cached)
    
    # 2. Cache miss → query database
    user = await db.query("SELECT * FROM users WHERE id = $1", user_id)
    
    # 3. Populate cache with TTL
    cache.setex(f"user:{user_id}", 3600, json.dumps(user))
    
    return user
</code></pre>
<h3>Cache Stampede Prevention</h3>
<p>When 10,000 requests arrive simultaneously for an expired key, all of them miss the cache and slam the database. Solutions:</p>
<pre><code class="language-python"># Probabilistic early expiration (XFetch)
import random, time

def should_recompute(ttl_remaining, delta, beta=1.0):
    """Probabilistically recompute before expiration"""
    return ttl_remaining - delta * beta * math.log(random.random()) <= 0
</code></pre>
<p>This ensures that as the TTL approaches zero, there's an increasing probability that ONE request will refresh the cache before it actually expires.</p>`
      },
    ],
  },
  {
    id: "distributed-systems", title: "Module 2 — Distributed Systems",
    lessons: [
      {
        id: "message-queues", title: "Message Queues & Event-Driven Architecture", duration: "30 min",
        description: "Kafka, RabbitMQ, and SQS patterns for decoupling services and handling backpressure.",
        content: `<h2>Asynchronous Communication</h2>
<p>In a monolith, function calls are synchronous. In distributed systems, services communicate via <strong>message queues</strong> — producers push messages, consumers pull and process them independently.</p>
<h3>When to Use Queues</h3>
<p>Any operation that doesn't need to complete before the API responds: sending emails, processing images, generating reports, updating search indexes.</p>
<pre><code class="language-python"># Producer: API endpoint enqueues work
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers='kafka:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

async def upload_image(request):
    image_url = await save_to_s3(request.file)
    
    # Don't process inline — enqueue it
    producer.send('image-processing', {
        'user_id': request.user_id,
        'image_url': image_url,
        'operations': ['resize', 'thumbnail', 'webp']
    })
    
    return {"status": "processing", "image_url": image_url}
</code></pre>
<h3>Consumer Groups & Backpressure</h3>
<p>Kafka partitions allow parallel consumers. If the queue grows faster than consumers process, you add more consumer instances. If producers overwhelm the system, implement <strong>backpressure</strong> by returning HTTP 429.</p>`
      },
      {
        id: "rate-limiting", title: "Rate Limiting & API Gateways", duration: "25 min",
        description: "Token bucket, sliding window, and distributed rate limiting with Redis.",
        content: `<h2>Protecting Services at Scale</h2>
<p>Without rate limiting, a single bad actor can DDoS your API, exhaust database connections, and take down the entire service. Rate limiters are the first line of defense.</p>
<h3>Token Bucket Algorithm</h3>
<p>Imagine a bucket that holds tokens. Each request costs one token. Tokens refill at a fixed rate. When the bucket is empty, requests are rejected.</p>
<pre><code class="language-python">import time
import redis

class TokenBucket:
    def __init__(self, redis_client, key, capacity, refill_rate):
        self.r = redis_client
        self.key = key
        self.capacity = capacity
        self.refill_rate = refill_rate  # tokens per second
    
    def allow_request(self) -> bool:
        now = time.time()
        pipe = self.r.pipeline()
        
        # Lua script for atomic token bucket
        lua = """
        local key = KEYS[1]
        local capacity = tonumber(ARGV[1])
        local refill_rate = tonumber(ARGV[2])
        local now = tonumber(ARGV[3])
        
        local data = redis.call('HMGET', key, 'tokens', 'last_refill')
        local tokens = tonumber(data[1]) or capacity
        local last = tonumber(data[2]) or now
        
        -- Refill tokens based on elapsed time
        local elapsed = now - last
        tokens = math.min(capacity, tokens + elapsed * refill_rate)
        
        if tokens >= 1 then
            tokens = tokens - 1
            redis.call('HMSET', key, 'tokens', tokens, 'last_refill', now)
            redis.call('EXPIRE', key, 3600)
            return 1
        end
        return 0
        """
        return self.r.eval(lua, 1, self.key, 
                          self.capacity, self.refill_rate, now) == 1
</code></pre>
<p>This implementation is <strong>distributed</strong> — multiple API servers share the same Redis state, ensuring global rate limiting across the fleet.</p>`
      },
      {
        id: "cap-theorem", title: "CAP Theorem & Consensus", duration: "30 min",
        description: "Understanding the fundamental trade-offs in distributed data stores.",
        content: `<h2>The CAP Theorem</h2>
<p>In a distributed system, you can only guarantee two of three properties simultaneously:</p>
<p><strong>C</strong>onsistency — Every read receives the most recent write.<br>
<strong>A</strong>vailability — Every request receives a response (no timeouts).<br>
<strong>P</strong>artition tolerance — The system continues operating despite network partitions.</p>

<h3>Real-World Trade-offs</h3>
<pre><code>┌─────────────────────────────────────────┐
│           CP Systems (Strong)           │
│  PostgreSQL, MongoDB, HBase, Zookeeper  │
│  → Sacrifices availability on partition │
├─────────────────────────────────────────┤
│           AP Systems (Available)        │
│  Cassandra, DynamoDB, CouchDB, Riak    │
│  → Sacrifices consistency on partition  │
├─────────────────────────────────────────┤
│           CA Systems (Theoretical)      │
│  Single-node RDBMS (no distribution)    │
│  → Can't tolerate network partitions    │
└─────────────────────────────────────────┘</code></pre>
<h3>Raft Consensus</h3>
<p>When you need strong consistency in a distributed system (like etcd for Kubernetes), you use consensus algorithms like <strong>Raft</strong>. A leader is elected, and writes must be replicated to a majority of nodes before being committed.</p>
<p>If the leader dies, followers hold an election. The node with the most up-to-date log wins. This is how databases like CockroachDB achieve globally consistent transactions.</p>`
      },
    ],
  },
  {
    id: "case-studies", title: "Module 3 — Real-World Case Studies",
    lessons: [
      {
        id: "design-url-shortener", title: "Design: URL Shortener", duration: "35 min",
        description: "End-to-end system design for a service handling billions of redirects per day.",
        content: `<h2>Designing a URL Shortener (like bit.ly)</h2>
<p>This is one of the most common system design interview questions. Let's build it properly for 1 billion URLs and 100K redirects/second.</p>
<h3>Requirements</h3>
<p><strong>Functional:</strong> Shorten a long URL → short code. Redirect short code → original URL. Optional: analytics, custom aliases, expiration.<br>
<strong>Non-functional:</strong> Low latency redirects (<50ms). High availability. URL uniqueness guaranteed.</p>
<h3>Core Design</h3>
<pre><code>Client → API Gateway → URL Service → Database
                              ↓
                         Cache (Redis)

Short Code Generation:
  Option A: Counter + Base62 encoding
  Option B: MD5 hash → take first 7 chars
  Option C: Pre-generated ID pool (Snowflake)
</code></pre>
<h3>Base62 Encoding</h3>
<pre><code class="language-python">ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def encode_base62(num: int) -> str:
    if num == 0:
        return ALPHABET[0]
    result = []
    while num:
        result.append(ALPHABET[num % 62])
        num //= 62
    return ''.join(reversed(result))

# 7-character base62 = 62^7 = 3.5 TRILLION unique URLs
encode_base62(123456789)  # → "8M0kX"
</code></pre>
<h3>Read Path (99.9% of traffic)</h3>
<p>1. Check Redis cache (hit rate ~95%). 2. On miss, query database. 3. Populate cache. 4. Return 301/302 redirect.</p>
<p>With 95% cache hit rate and Redis serving 100K ops/sec from a single instance, we handle massive scale with minimal database load.</p>`
      },
      {
        id: "design-notification-system", title: "Design: Notification System", duration: "30 min",
        description: "Multi-channel notification delivery with priority queues, deduplication, and rate limiting.",
        content: `<h2>Designing a Notification System</h2>
<p>A production notification system must handle push notifications, emails, SMS, and in-app messages — each with different delivery guarantees, rate limits, and user preferences.</p>
<h3>Architecture Overview</h3>
<pre><code>API Request → Validation Service → Priority Queue
                                        ↓
                              ┌─────────┼─────────┐
                              ↓         ↓         ↓
                         Push Queue  Email Queue  SMS Queue
                              ↓         ↓         ↓
                          APNs/FCM  SendGrid    Twilio
                              ↓         ↓         ↓
                         ────────── Analytics DB ──────────
</code></pre>
<h3>Deduplication</h3>
<p>Users should never receive the same notification twice. Use an idempotency key stored in Redis with a TTL.</p>
<pre><code class="language-python">async def send_notification(user_id, message, idempotency_key):
    dedup_key = f"notif:{user_id}:{idempotency_key}"
    
    # SET NX = only set if doesn't exist (atomic)
    if not await redis.set(dedup_key, 1, nx=True, ex=86400):
        return {"status": "duplicate", "skipped": True}
    
    # Check user preferences
    prefs = await get_user_preferences(user_id)
    
    channels = []
    if prefs.push_enabled:
        channels.append(push_queue.enqueue(user_id, message))
    if prefs.email_enabled and message.priority == "high":
        channels.append(email_queue.enqueue(user_id, message))
    
    await asyncio.gather(*channels)
    return {"status": "sent", "channels": len(channels)}
</code></pre>
<h3>Priority Queuing</h3>
<p>Security alerts must be delivered instantly. Marketing notifications can wait. Use separate queues with different consumer concurrency.</p>`
      },
    ],
  },
]

export default function SystemDesignPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="System Design"
        description="Master the art of designing scalable distributed systems. Load balancers, database sharding, caching strategies, message queues, rate limiting, and real-world case studies from companies serving billions."
        category="Systems"
        accentColor="#E44D26"
        modules={systemDesignModules}
        instructor="Alex Xu"
        rating={4.9}
        reviewCount={5600}
        lastUpdated="Mar 2026"
      />
    </div>
  )
}
