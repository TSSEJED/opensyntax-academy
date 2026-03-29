import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const discordModules: Module[] = [
  {
    id: "architecture",
    title: "Module 1 — Microservices",
    lessons: [
      {
        id: "microservices-intro",
        title: "The Microservices Architecture",
        description: "Move from a single file bot to a scalable multi-node system using Cogs and IPC.",
        duration: "18 min",
        content: `
          <h2 class="text-lg font-semibold text-foreground mb-3">From Monolith to Microservices</h2>
          <p>A single-file bot works for prototypes, but falls apart under load. The solution is a microservices architecture — splitting your bot into isolated, independently scalable <strong>Cogs</strong>.</p>
          <br/>
          <h3 class="text-sm font-semibold text-foreground mb-2">What is a Cog?</h3>
          <p>In discord.py, a <strong>Cog</strong> is a class that groups related commands and event listeners. Think of it like a module or plugin — your bot loads and unloads them dynamically at runtime.</p>
          <br/>
          <pre class="rounded-lg bg-card border border-border p-4 text-xs font-mono text-foreground overflow-auto"><code># cogs/moderation.py
from discord.ext import commands

class ModerationCog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    @commands.has_permissions(ban_members=True)
    async def ban(self, ctx, member: discord.Member, *, reason=None):
        await member.ban(reason=reason)
        await ctx.send(f"Banned {member.mention}.")

async def setup(bot):
    await bot.add_cog(ModerationCog(bot))</code></pre>
          <br/>
          <h3 class="text-sm font-semibold text-foreground mb-2">Custom IPC (Inter-Process Communication)</h3>
          <p>When you run multiple bot shards across processes, they need to communicate. IPC lets shards share state — e.g., user data, guild counts — without hitting the Discord API on every request.</p>
          <br/>
          <p>We use <code class="bg-card border border-border rounded px-1 py-0.5 text-xs font-mono">discord-ext-ipc</code> or a Redis pub/sub channel as the message bus between processes.</p>
        `,
      },
      {
        id: "sharding",
        title: "Sharding at Scale",
        description: "Distribute your bot across thousands of guilds with AutoShardedBot.",
        duration: "14 min",
        content: `
          <h2 class="text-lg font-semibold text-foreground mb-3">Sharding at Scale</h2>
          <p>Discord requires sharding once your bot reaches 2,500 guilds. Each shard handles a subset of guilds and maintains its own WebSocket connection.</p>
          <br/>
          <pre class="rounded-lg bg-card border border-border p-4 text-xs font-mono text-foreground overflow-auto"><code>import discord

bot = discord.AutoShardedBot(
    command_prefix="!",
    shard_count=4,  # Discord recommends 1 shard per 1000 guilds
)

@bot.event
async def on_shard_connect(shard_id):
    print(f"[v0] Shard {shard_id} connected")

bot.run("TOKEN")</code></pre>
          <br/>
          <p>For production, use <strong>shard managers</strong> that spawn shard clusters in separate OS processes, each handled by a process manager like <code class="bg-card border border-border rounded px-1 py-0.5 text-xs font-mono">pm2</code> or <code class="bg-card border border-border rounded px-1 py-0.5 text-xs font-mono">systemd</code>.</p>
        `,
      },
    ],
  },
  {
    id: "database",
    title: "Module 2 — Database Layer",
    lessons: [
      {
        id: "prisma-redis",
        title: "Database Deep-Dive: Prisma & Redis",
        description: "Scale your data layer with Prisma ORM and Redis caching.",
        duration: "22 min",
        content: `
          <h2 class="text-lg font-semibold text-foreground mb-3">Scaling with Prisma ORM and Redis</h2>
          <p>Raw SQL queries don't scale well in a team. <strong>Prisma ORM</strong> gives you a type-safe query builder that auto-generates from your schema, reducing bugs and speeding up development.</p>
          <br/>
          <pre class="rounded-lg bg-card border border-border p-4 text-xs font-mono text-foreground overflow-auto"><code># Install prisma for Python via prisma-client-py
# schema.prisma
model User {
  id         String   @id @default(cuid())
  discordId  String   @unique
  xp         Int      @default(0)
  createdAt  DateTime @default(now())
}</code></pre>
          <br/>
          <h3 class="text-sm font-semibold text-foreground mb-2">Redis as a Cache Layer</h3>
          <p>Database reads on every command invocation will kill your latency. Use Redis to cache hot data — leaderboard entries, user XP — with a TTL of 60 seconds. On write, invalidate the cache key.</p>
          <br/>
          <pre class="rounded-lg bg-card border border-border p-4 text-xs font-mono text-foreground overflow-auto"><code>import redis.asyncio as redis

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

async def get_user_xp(user_id: str) -> int:
    cached = await r.get(f"xp:{user_id}")
    if cached:
        return int(cached)
    # Fallback to DB
    user = await prisma.user.find_unique(where={"discordId": user_id})
    await r.setex(f"xp:{user_id}", 60, user.xp)
    return user.xp</code></pre>
        `,
      },
    ],
  },
  {
    id: "ui",
    title: "Module 3 — Advanced UI",
    lessons: [
      {
        id: "modals-selects",
        title: "Complex Modals & Dynamic Select Menus",
        description: "Build stateful modal forms and dynamic select menus with proper state management.",
        duration: "20 min",
        content: `
          <h2 class="text-lg font-semibold text-foreground mb-3">Advanced Interaction UI</h2>
          <p>Discord's interaction API supports multi-step modal forms and select menus that dynamically update based on previous inputs. Here is how to build a multi-page configuration wizard.</p>
          <br/>
          <pre class="rounded-lg bg-card border border-border p-4 text-xs font-mono text-foreground overflow-auto"><code>import discord
from discord import ui

class ConfigModal(ui.Modal, title="Bot Configuration"):
    prefix = ui.TextInput(
        label="Command Prefix",
        placeholder="e.g. !",
        max_length=5,
    )
    welcome_channel = ui.TextInput(
        label="Welcome Channel ID",
        placeholder="Enter channel ID",
    )

    async def on_submit(self, interaction: discord.Interaction):
        # Persist to DB
        await save_config(
            guild_id=interaction.guild_id,
            prefix=str(self.prefix),
            welcome_channel=int(str(self.welcome_channel)),
        )
        await interaction.response.send_message(
            "Configuration saved!", ephemeral=True
        )</code></pre>
        `,
      },
    ],
  },
  {
    id: "security",
    title: "Module 4 — Security",
    lessons: [
      {
        id: "rate-limiting",
        title: "Security & Rate-Limiting",
        description: "Protect your bot from API abuse, SQL injections, and unauthorized access.",
        duration: "16 min",
        content: `
          <h2 class="text-lg font-semibold text-foreground mb-3">Security & Rate-Limiting</h2>
          <p>Production bots face abuse — users spamming commands, trying to break parsers, or escalating privileges. A layered security approach is essential.</p>
          <br/>
          <h3 class="text-sm font-semibold text-foreground mb-2">Command-Level Rate Limiting</h3>
          <pre class="rounded-lg bg-card border border-border p-4 text-xs font-mono text-foreground overflow-auto"><code>from discord.ext import commands
from discord.ext.commands import cooldown, BucketType

class EconomyCog(commands.Cog):
    @commands.command()
    @cooldown(rate=1, per=30, type=BucketType.user)
    async def daily(self, ctx):
        """Claim daily XP — limited to once per 30 seconds per user."""
        await grant_daily_xp(ctx.author.id)
        await ctx.send("Daily XP claimed!")</code></pre>
          <br/>
          <h3 class="text-sm font-semibold text-foreground mb-2">SQL Injection Prevention</h3>
          <p>Never concatenate user input into SQL strings. Always use parameterized queries. With Prisma, this is handled automatically — with raw SQL via asyncpg, use <code class="bg-card border border-border rounded px-1 py-0.5 text-xs font-mono">$1</code> placeholders:</p>
          <br/>
          <pre class="rounded-lg bg-card border border-border p-4 text-xs font-mono text-foreground overflow-auto"><code># GOOD — parameterized
await conn.execute(
    "SELECT * FROM users WHERE discord_id = $1",
    user_id  # never interpolated directly
)

# BAD — never do this
await conn.execute(f"SELECT * FROM users WHERE discord_id = {user_id}")</code></pre>
        `,
      },
    ],
  },
]

export default function DiscordCoursePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Advanced Discord Development"
        description="Cogs, sharding, databases, advanced UI, and security — the complete Python/discord.py track."
        modules={discordModules}
      />
    </div>
  )
}
