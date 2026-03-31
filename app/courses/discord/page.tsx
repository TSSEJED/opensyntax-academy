import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

export const metadata: Metadata = {
  title: "Advanced Discord Development — discord.py, Sharding & asyncpg",
  description: "Build production-grade Discord bots. Hot-reloadable Cogs, slash commands, PostgreSQL pooling with asyncpg, horizontal sharding, and Redis IPC.",
  keywords: ["Discord Bot Course", "discord.py Tutorial", "Discord Bot Development", "Python Bot", "Slash Commands", "Bot Sharding"],
}

const discordModules: Module[] = [
  {
    id: "discord-tier-1", title: "Tier 1: Foundations — Bot Architecture",
    lessons: [
      {
        id: "intro-discord-py", title: "Python Setup & Bot Instantiation", duration: "25 min",
        description: "Set up your environment (PyPI, venv) and establish bird-eye connectivity with the Discord Gateway.",
        content: `<h2>Bot Initialization</h2>
<p>Modern Discord bot development relies on asynchronous Python. The <code>discord.py</code> library provides a comprehensive async API wrapping the Discord Gateway.</p>
<h3>Simple Event Listening</h3>
<pre><code class="language-python">import discord
from discord.ext import commands

class MyBot(commands.Bot):
    async def setup_hook(self):
        print(f'Logged in as {self.user}')

bot = MyBot(command_prefix='!', intents=discord.Intents.all())
bot.run('TOKEN')</code></pre>`
      }
    ]
  },
  {
    id: "discord-tier-2", title: "Tier 2: Intermediate — Feature Scaling",
    lessons: [
      {
        id: "cogs-slash", title: "Cogs & Slash Command Trees", duration: "40 min",
        description: "Modularize your bot into classes and implement native UI components like buttons and dropdowns.",
        content: `<h2>Modular Architecture with Cogs</h2>
<p>Cogs allow you to group related commands and listeners into separate modules. This is essential for large-scale bots.</p>
<pre><code class="language-python">class Moderation(commands.Cog):
    @app_commands.command(name="kick")
    async def kick(self, interaction: discord.Interaction, user: discord.Member):
        await user.kick()
        await interaction.response.send_message(f"Kicked {user}")</code></pre>
<h3>PostgreSQL Consistency</h3>
<p>In Tier 2, we integrate <strong>asyncpg</strong> to manage persistent data (prefixes, user profiles, etc.) with high-performance connection pooling.</p>`
      }
    ]
  },
  {
    id: "discord-tier-3", title: "Tier 3: Production — Systems Engineering",
    lessons: [
      {
        id: "sharding-redis", title: "Dynamic Sharding & Distributed Caching", duration: "50 min",
        description: "Scale beyond 2,500 servers. Implementing cross-shard IPC and offloading compute to Celery.",
        content: `<h2>Scaling Architecture</h2>
<p>At production scale, a single instance cannot handle the gateway load. We use <strong>AutoShardedClient</strong> to distribute the WebSocket connection across multiple processes.</p>
<h3>Redis & IPC</h3>
<p>Use <strong>Redis</strong> for distributed caching and Inter-Process Communication (IPC). This allows shards running in different containers to sync state and share message queues efficiently.</p>
<p><strong>Performance Tip:</strong> Use Celery or Dramatiq to offload heavy compute tasks (like image generation) away from the bot's main async loop to prevent gateway timeouts.</p>`
      }
    ]
  }
]

export default function DiscordCoursePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Advanced Discord Development"
        description="Production-grade Discord bot architecture. Tiered from basic events to distributed sharding and Redis IPC."
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
