import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

export const metadata: Metadata = {
  title: "Computing Foundations — The 'Minus Zero' Onboarding",
  description: "Start your journey from absolute zero. Learn how CPUs process instructions, how the internet routes data, and how to master the professional terminal environment.",
  keywords: ["Computing Architecture", "How the Internet Works", "Terminal Basics", "Git Fundamentals", "Programming for Beginners"],
}

const foundationModules: Module[] = [
  {
    id: "hardware-logic", title: "Module 1 — Hardware Logic & Memory",
    lessons: [
      {
        id: "cpu-architecture", title: "CPU Architecture & Instruction Sets", duration: "20 min",
        description: "Demystifying the silicon. Learn how registers, the ALU, and clock cycles combine to execute code.",
        content: `<h2>How a CPU Actually Works</h2>
<p>At the lowest level, every program you write is translated into a series of binary instructions. The <strong>Central Processing Unit (CPU)</strong> is the engine that fetches, decodes, and executes these instructions.</p>
<h3>The Fetch-Decode-Execute Cycle</h3>
<ol>
  <li><strong>Fetch:</strong> The Control Unit gets the next instruction from RAM.</li>
  <li><strong>Decode:</strong> The instruction is broken down into an opcode (command) and operands (data).</li>
  <li><strong>Execute:</strong> The Arithmetic Logic Unit (ALU) performs the operation.</li>
</ol>
<p>Modern CPUs handle billions of these cycles per second (GHz), using <strong>pipelines</strong> to start the next instruction before the current one finishes.</p>`,
        quiz: [
          {
            question: "Which component of the CPU is responsible for performing mathematical and logical operations?",
            options: ["Control Unit", "Arithmetic Logic Unit (ALU)", "Registers", "Instruction Pointer"],
            correctIndex: 1,
            explanation: "The ALU is the calculator of the CPU, handling all binary math and logic gates."
          }
        ]
      },
      {
        id: "memory-hierarchy", title: "RAM, Cache & The Stack/Heap", duration: "25 min",
        description: "Understand why memory speed matters. From L1 cache hits to dynamic heap allocation.",
        content: `<h2>The Memory Hierarchy</h2>
<p>Not all memory is created equal. Developers must balance <strong>speed</strong> vs. <strong>capacity</strong>.</p>
<ul>
  <li><strong>Registers:</strong> Instant access, located inside the CPU core.</li>
  <li><strong>L1/L2/L3 Cache:</strong> Extremely fast, storing frequently used data.</li>
  <li><strong>RAM:</strong> Main memory, where active programs live.</li>
  <li><strong>SSD/HDD:</strong> High capacity, but thousands of times slower than RAM.</li>
</ul>
<h3>Stack vs. Heap</h3>
<p>The <strong>Stack</strong> is used for temporary, local variables with a fixed size (last-in, first-out). The <strong>Heap</strong> is for dynamic data that can grow or shrink, requiring manual or automated (Garbage Collection) management.</p>`
      }
    ]
  },
  {
    id: "networking-protocols", title: "Module 2 — Internet Protocols & HTTP",
    lessons: [
      {
        id: "tcp-ip-model", title: "The TCP/IP Model & Packet Switching", duration: "30 min",
        description: "How data travels across the world. Routing, DNS, and the reliable transport layer.",
        content: `<h2>The Backbone of the Internet</h2>
<p>The internet isn't a single entity; it's a massive network of interconnected computers communicating via the <strong>TCP/IP Protocol Suite</strong>.</p>
<h3>Packet Switching</h3>
<p>When you send a request, the data is broken into small <strong>packets</strong>. Each packet contains a destination IP address and can take a different physical path to reach the target, where it is reassembled.</p>
<p><strong>DNS (Domain Name System)</strong> acts as the phonebook, translating human-friendly names (google.com) into machine-readable IP addresses (142.250.190.46).</p>`
      },
      {
        id: "http-evolution", title: "HTTP/1.1 vs HTTP/2 vs HTTP/3", duration: "20 min",
        description: "The protocol of the web. Understanding headers, verbs, and the shift to QUIC and UDP.",
        content: `<h2>The Hypertext Transfer Protocol</h2>
<p>HTTP is the application-layer protocol we use to browse the web. It has evolved significantly to handle modern rich media.</p>
<ul>
  <li><strong>HTTP/1.1:</strong> Simple text-based requests; one request per connection (head-of-line blocking).</li>
  <li><strong>HTTP/2:</strong> Binary framing; multiplexing multiple requests over one connection.</li>
  <li><strong>HTTP/3:</strong> Built on QUIC (UDP) to eliminate packet loss delays in noisy networks.</li>
</ul>`
      }
    ]
  },
  {
    id: "environment-tooling", title: "Module 3 — POSIX Terminal & Git DAGs",
    lessons: [
      {
        id: "terminal-magic", title: "POSIX Shell & Navigation", duration: "25 min",
        description: "Master the command line. Pipes, redirects, and a professional terminal workflow.",
        content: `<h2>Mastering the Terminal</h2>
<p>Professional engineering happens in the shell. While GUIs are comfortable, the terminal is <strong>scriptable, reproducible, and fast</strong>.</p>
<pre><code class="language-bash"># The Big 3 of Navigation
ls -la      # List all files with permissions
cd path/    # Change directory
pwd         # Print working directory

# Power User Tools
grep "error" server.log  # Search for text
cat file.txt | sort      # Piping output between tools
chmod +x script.sh       # Modify permissions</code></pre>`
      },
      {
        id: "git-internals", title: "Git Internals & Branching", duration: "35 min",
        description: "Git is not just for backup. Understand the Directed Acyclic Graph (DAG) and how blobs, trees, and commits work.",
        content: `<h2>Git: The Engine of Collaboration</h2>
<p>Git is a <strong>content-addressable filesystem</strong>. It doesn't store diffs; it stores snapshots of your entire project state.</p>
<h3>The DAG (Directed Acyclic Graph)</h3>
<p>Every commit points to its parent(s). This creates a graph. <strong>Branching</strong> is simply creating a new pointer to a specific commit. <strong>Merging</strong> is combining two paths of the graph back together.</p>
<p>Mastering <code>git rebase</code> and <code>git cherry-pick</code> allows you to rewrite history and maintain a clean project timeline.</p>`
      }
    ]
  }
]

export default function FoundationsPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Computing Foundations"
        description="The 'Minus Zero' onboarding. Bridge the gap from absolute beginner to production-ready developer with core computer science concepts."
        category="Foundations"
        accentColor="oklch(0.60 0.15 250)"
        modules={foundationModules}
        instructor="OpenSyntax Academy"
        rating={5.0}
        reviewCount={450}
        lastUpdated="Mar 2026"
      />
    </div>
  )
}
