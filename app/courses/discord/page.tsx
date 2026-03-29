import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const discordModules: Module[] = [
  {
    id: "discord-fundamentals", title: "Module 1 — Bot Architecture",
    lessons: [
      {
        id: "intro-discord-py", title: "Introduction to discord.py", duration: "15 min",
        description: "Set up your bot token, permissions, and build a basic event loop.",
        content: `<h2>Getting Started with discord.py</h2>
<p>Modern Discord bot development relies on asynchronous Python. The <code>discord.py</code> library provides a comprehensive async API wrapping the Discord Gateway.</p>
<h3>Bot Initialization</h3>
<pre><code class="language-python">import discord
from discord.ext import commands

class MyBot(commands.Bot):
    def __init__(self):
        intents = discord.Intents.default()
        intents.message_content = True
        super().__init__(command_prefix='!', intents=intents)

    async def setup_hook(self):
        print(f'Logged in as {self.user} (ID: {self.user.id})')
        print('------')

bot = MyBot()
bot.run('YOUR_TOKEN_HERE')</code></pre>
<p>Notice the use of <code>Intents</code>. Discord requires you to explicitly declare what events your bot needs (like reading messages or detecting member joins) to save bandwidth and improve privacy.</p>`
      },
      {
        id: "cogs-extensions", title: "Cogs & Hot-reloading", duration: "25 min",
        description: "Organize your bot features into modular classes called Cogs that can be reloaded without restarting.",
        content: `<h2>Modular Architecture with Cogs</h2>
<p>As your bot grows, keeping all commands in one file becomes unmanageable. Cogs allow you to group related commands, listeners, and state into separate modules.</p>
<h3>Creating a Moderation Cog</h3>
<pre><code class="language-python"># cogs/moderation.py
import discord
from discord.ext import commands

class Moderation(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(name='kick')
    @commands.has_permissions(kick_members=True)
    async def kick_user(self, ctx, member: discord.Member, *, reason=None):
        await member.kick(reason=reason)
        await ctx.send(f'Kicked {member.mention} for: {reason}')

async def setup(bot):
    await bot.add_cog(Moderation(bot))</code></pre>
<p>You can hot-reload this file in production using <code>await bot.reload_extension('cogs.moderation')</code>, applying code updates without taking the bot offline!</p>`
      },
    ],
  },
  {
    id: "discord-advanced", title: "Module 2 — Advanced Scaling",
    lessons: [
      {
        id: "slash-commands", title: "Application/Slash Commands", duration: "20 min",
        description: "Migrate from text prefix commands to native Discord slash commands with autocomplete.",
        content: `<h2>Slash Commands using app_commands</h2>
<p>Prefix commands are obsolete. Slash commands provide UI integration, type hinting, and autocomplete directly in the Discord client.</p>
<pre><code class="language-python">from discord import app_commands

class Utilities(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @app_commands.command(name="ping", description="Check bot latency")
    async def ping(self, interaction: discord.Interaction):
        latency_ms = round(self.bot.latency * 1000)
        await interaction.response.send_message(f'Pong! {latency_ms}ms')

    # Autocomplete example
    @app_commands.command(name="fruit")
    async def fruit(self, interaction: discord.Interaction, choice: str):
        await interaction.response.send_message(f'You picked {choice}')

    @fruit.autocomplete('choice')
    async def fruit_autocomplete(self, interaction: discord.Interaction, current: str):
        fruits = ['Apple', 'Banana', 'Cherry']
        return [
            app_commands.Choice(name=f, value=f) 
            for f in fruits if current.lower() in f.lower()
        ]</code></pre>`
      },
      {
        id: "postgresql-asyncpg", title: "Database Integration with asyncpg", duration: "30 min",
        description: "Connect your bot to PostgreSQL using high-performance async connection pooling.",
        content: `<h2>High-Performance PostgreSQL</h2>
<p>For scalable bots, SQLite is insufficient. <code>asyncpg</code> is the fastest PostgreSQL driver for Python, designed specifically for async environments.</p>
<h3>Connection Pooling</h3>
<pre><code class="language-python">import asyncpg
import asyncio

class DBContext:
    def __init__(self, bot):
        self.bot = bot
        self.pool = None

    async def connect(self):
        self.pool = await asyncpg.create_pool(
            user='postgres', password='password',
            database='discord_bot', host='127.0.0.1'
        )

    async def get_prefix(self, guild_id: int) -> str:
        query = "SELECT prefix FROM guild_config WHERE guild_id = $1"
        return await self.pool.fetchval(query, guild_id)</code></pre>
<p>Store your connection pool in your Bot instance (\`bot.pool = await asyncpg.create_pool(...)\`) so any Cog can access database connections efficiently without opening new TCP sockets.</p>`
      },
      {
        id: "sharding-ipc", title: "Sharding & Redis IPC", duration: "35 min",
        description: "Scale your bot beyond 2,500 servers using AutoShardedClient and cross-shard communication.",
        content: `<h2>Horizontal Scaling: Sharding</h2>
<p>Discord enforces sharding (splitting the WebSocket connection) when a bot joins more than 2,500 servers. To manage this safely across multiple servers/processes, use <code>AutoShardedClient</code> and Redis.</p>
<h3>AutoShardedBot Setup</h3>
<pre><code class="language-python">class ShardedBot(commands.AutoShardedBot):
    def __init__(self):
        super().__init__(
            command_prefix='!', 
            intents=discord.Intents.default(),
            shard_count=10 # Explicitly set or let Discord calculate
        )

    async def on_ready(self):
        print(f'Ready! Operating on {len(self.shards)} shards.')</code></pre>
<h3>Redis IPC for Cluster Communication</h3>
<p>When shards run in different Docker containers, they can't share memory. Use Redis Pub/Sub to pass messages between them (e.g., broadcasting a global ban, or syncing rate limits).</p>`
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
        description="Production-grade Discord bot architecture with hot-reloadable Cogs, horizontal sharding via AutoShardedClient, connection pooling with asyncpg, Redis caching, and cross-shard IPC."
        category="Discord"
        accentColor="#7289DA"
        modules={discordModules}
        instructor="Danny"
        rating={4.8}
        reviewCount={4200}
        lastUpdated="Feb 2026"
      />
    </div>
  )
}
