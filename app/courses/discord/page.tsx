import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const discordModules: Module[] = [
  {
    id: "cogs", title: "Module 1 — Cog Architecture",
    lessons: [
      {
        id: "cog-design", title: "Scalable Cog Systems", duration: "25 min",
        description: "Organize Discord bots into modular, hot-reloadable Cog classes with dependency injection and lifecycle hooks.",
        content: `<h2>Scalable Cog Architecture</h2>
<p>Cogs are the backbone of any production Discord bot. They allow you to split functionality into focused, hot-reloadable modules with lifecycle hooks for proper setup and teardown.</p>
<h3>Cog with Lifecycle Hooks & DI</h3>
<pre><code>from __future__ import annotations
import logging
from discord.ext import commands, tasks

log = logging.getLogger(__name__)

class ModerationCog(commands.Cog, name="Moderation"):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot   = bot
        self.db    = bot.db      # asyncpg pool injected at bot level
        self.redis = bot.redis   # aioredis client

    async def cog_load(self) -> None:
        await self._warm_case_counter()
        self.auto_unban.start()
        log.info("ModerationCog loaded")

    async def cog_unload(self) -> None:
        self.auto_unban.cancel()  # ALWAYS cancel tasks to prevent resource leaks

    async def _warm_case_counter(self) -> None:
        rows = await self.db.fetch(
            "SELECT guild_id, MAX(case_id) FROM cases GROUP BY guild_id"
        )
        self._case_counter = {r["guild_id"]: r["max"] for r in rows}

    @tasks.loop(minutes=5)
    async def auto_unban(self) -> None:
        expired = await self.db.fetch(
            "SELECT user_id, guild_id FROM temp_bans WHERE expires_at &lt;= NOW()"
        )
        for row in expired:
            guild = self.bot.get_guild(row["guild_id"])
            if guild:
                await guild.unban(discord.Object(row["user_id"]))
                await self.db.execute(
                    "DELETE FROM temp_bans WHERE user_id=$1 AND guild_id=$2",
                    row["user_id"], row["guild_id"]
                )

async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(ModerationCog(bot))</code></pre>
<h3>Hot-Reload Command</h3>
<pre><code>@bot.command(hidden=True)
@commands.is_owner()
async def reload(ctx: commands.Context, cog: str) -> None:
    try:
        await bot.reload_extension(f"cogs.{cog}")
        await ctx.send(f"✅ Reloaded \`cogs.{cog}\`")
    except commands.ExtensionNotFound:
        await ctx.send(f"❌ No cog named \`{cog}\`")
    except Exception as e:
        await ctx.send(f"❌ Error: \`{e}\`")</code></pre>`
      },
      {
        id: "error-handling", title: "Global Error Handling & Logging", duration: "18 min",
        description: "Implement a centralized error handler that logs exceptions to a Discord channel and persists them to a database.",
        content: `<h2>Global Error Handling</h2>
<p>Production bots need centralized error handling that logs to Discord, persists to a database, and provides context for debugging without crashing the bot.</p>
<pre><code>import traceback
import discord
from discord.ext import commands

class ErrorHandlerCog(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot = bot

    @commands.Cog.listener()
    async def on_command_error(self, ctx: commands.Context, error: commands.CommandError) -> None:
        # Ignore user errors
        if isinstance(error, (commands.CommandNotFound, commands.CheckFailure)):
            return

        if isinstance(error, commands.MissingPermissions):
            await ctx.send("❌ You don't have permission to use this command.")
            return

        if isinstance(error, commands.MissingRequiredArgument):
            await ctx.send(f"❌ Missing argument: \`{error.param.name}\`")
            return

        # Unexpected error — log to error channel
        tb = "".join(traceback.format_exception(type(error), error, error.__traceback__))

        # Store in DB for analysis
        await self.bot.db.execute(
            "INSERT INTO error_logs (guild_id, command, error, traceback) VALUES ($1, $2, $3, $4)",
            ctx.guild.id if ctx.guild else None,
            ctx.command.qualified_name if ctx.command else "unknown",
            str(error),
            tb[:4000],
        )

        # Post to error log channel
        error_channel_id = await self.bot.db.fetchval(
            "SELECT error_channel_id FROM guild_config WHERE guild_id = $1",
            ctx.guild.id if ctx.guild else 0
        )
        if error_channel_id:
            channel = self.bot.get_channel(error_channel_id)
            if channel:
                embed = discord.Embed(
                    title="Unhandled Command Error",
                    color=discord.Color.red()
                )
                embed.add_field(name="Command", value=ctx.command.qualified_name, inline=True)
                embed.add_field(name="User", value=str(ctx.author), inline=True)
                embed.add_field(name="Error", value=f"\`\`\`{str(error)[:1000]}\`\`\`", inline=False)
                await channel.send(embed=embed)

        await ctx.send("⚠️ An unexpected error occurred. The team has been notified.")

async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(ErrorHandlerCog(bot))</code></pre>`
      },
    ],
  },
  {
    id: "sharding", title: "Module 2 — Horizontal Sharding",
    lessons: [
      {
        id: "autosharding", title: "AutoShardedBot & Cross-Shard IPC", duration: "28 min",
        description: "Scale to thousands of guilds with AutoShardedBot and Redis Pub/Sub cross-shard communication.",
        content: `<h2>Horizontal Sharding</h2>
<p>Discord requires sharding once your bot reaches 2,500 guilds. Each shard maintains a dedicated WebSocket to Discord and handles a fraction of your guilds.</p>
<h3>AutoShardedBot</h3>
<pre><code>from discord.ext import commands
import discord

class ShardsBot(commands.AutoShardedBot):
    def __init__(self) -> None:
        super().__init__(
            command_prefix="!",
            intents=discord.Intents.default(),
            shard_count=16,  # Discord recommends ceil(guilds / 1000)
        )

    async def setup_hook(self) -> None:
        self.db = await asyncpg.create_pool(DATABASE_URL, min_size=5, max_size=20)
        self.redis = aioredis.from_url(REDIS_URL)
        for cog in COGS:
            await self.load_extension(f"cogs.{cog}")

    async def on_shard_ready(self, shard_id: int) -> None:
        print(f"[Shard {shard_id}/{self.shard_count}] Ready")</code></pre>
<h3>Cross-Shard IPC via Redis Pub/Sub</h3>
<pre><code>import asyncio, json
import aioredis

class ShardIPC:
    def __init__(self, bot, redis_url: str):
        self.bot = bot
        self._url = redis_url
        self._handlers: dict[str, list] = {}

    async def start(self) -> None:
        self._pub = await aioredis.from_url(self._url)
        self._sub = await aioredis.from_url(self._url)
        ch = await self._sub.subscribe("ipc:broadcast", f"ipc:shard:{self.bot.shard_ids[0]}")
        asyncio.create_task(self._listen(ch[0]))

    async def _listen(self, channel) -> None:
        async for msg in channel.iter(encoding="utf-8"):
            data = json.loads(msg)
            for handler in self._handlers.get(data["op"], []):
                asyncio.create_task(handler(data["payload"]))

    async def broadcast(self, op: str, payload: dict) -> None:
        await self._pub.publish("ipc:broadcast", json.dumps({"op": op, "payload": payload}))

    def on(self, op: str):
        def decorator(func):
            self._handlers.setdefault(op, []).append(func)
            return func
        return decorator

# Ban user across all shards
@ipc.on("network_ban")
async def handle_network_ban(payload: dict) -> None:
    for guild in bot.guilds:
        try:
            await guild.ban(discord.Object(payload["user_id"]), reason=payload["reason"])
        except discord.Forbidden:
            pass</code></pre>`
      },
    ],
  },
  {
    id: "database", title: "Module 3 — PostgreSQL & Redis",
    lessons: [
      {
        id: "asyncpg", title: "asyncpg Connection Pooling", duration: "22 min",
        description: "Configure a high-performance asyncpg pool with prepared statements and automatic retry on connection loss.",
        content: `<h2>asyncpg for Production Discord Bots</h2>
<p>asyncpg is the fastest PostgreSQL driver for Python, providing up to 3× better performance than psycopg2 for async workloads. Always use a connection pool — never create a new connection per command.</p>
<h3>Pool Setup with Codecs</h3>
<pre><code>import asyncpg
from datetime import datetime

async def create_pool(dsn: str) -> asyncpg.Pool:
    pool = await asyncpg.create_pool(
        dsn,
        min_size=5,
        max_size=20,
        max_queries=50_000,   # recycle connection after N queries
        max_inactive_connection_lifetime=300,  # drop idle connections after 5 min
        init=_init_connection,
    )
    return pool

async def _init_connection(conn: asyncpg.Connection) -> None:
    """Called for each new connection — register custom types here."""
    await conn.set_type_codec(
        'jsonb',
        encoder=json.dumps,
        decoder=json.loads,
        schema='pg_catalog',
        format='text',
    )

# Usage in a Cog — always use pool, never acquire manually for simple queries
class EconomyCog(commands.Cog):
    async def get_balance(self, user_id: int, guild_id: int) -> int:
        # asyncpg returns asyncpg.Record objects — access like dicts
        row = await self.bot.db.fetchrow(
            "SELECT balance FROM economy WHERE user_id=$1 AND guild_id=$2",
            user_id, guild_id
        )
        return row["balance"] if row else 0

    async def transfer(self, from_id: int, to_id: int, guild_id: int, amount: int) -> None:
        # Use transactions for atomicity
        async with self.bot.db.acquire() as conn:
            async with conn.transaction():
                await conn.execute(
                    "UPDATE economy SET balance = balance - $1 WHERE user_id=$2 AND guild_id=$3",
                    amount, from_id, guild_id
                )
                await conn.execute(
                    "INSERT INTO economy (user_id, guild_id, balance) VALUES ($1, $2, $3)
                     ON CONFLICT (user_id, guild_id) DO UPDATE SET balance = economy.balance + $3",
                    to_id, guild_id, amount
                )</code></pre>
<h3>Redis Caching Layer</h3>
<pre><code>import json
import aioredis

class CacheManager:
    def __init__(self, redis: aioredis.Redis):
        self.r = redis

    async def get_guild_config(self, guild_id: int) -> dict | None:
        cached = await self.r.get(f"guild:{guild_id}:config")
        if cached:
            return json.loads(cached)

        # Cache miss — fetch from DB and cache for 10 minutes
        row = await self.db.fetchrow("SELECT * FROM guild_config WHERE guild_id=$1", guild_id)
        if row:
            config = dict(row)
            await self.r.setex(f"guild:{guild_id}:config", 600, json.dumps(config))
            return config
        return None

    async def invalidate_guild_config(self, guild_id: int) -> None:
        await self.r.delete(f"guild:{guild_id}:config")</code></pre>`
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
        description="Production-grade Discord bot architecture with Cogs, sharding, PostgreSQL, Redis, and automated deployment."
        category="Discord"
        accentColor="oklch(0.57 0.18 272)"
        modules={discordModules}
      />
    </div>
  )
}
