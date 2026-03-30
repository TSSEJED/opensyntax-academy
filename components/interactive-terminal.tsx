"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Terminal } from "lucide-react"

type Command = {
  cmd: string
  output: React.ReactNode
}

const HISTORY: Command[] = [
  {
    cmd: "npx create-opensyntax-app@latest",
    output: (
      <div className="text-emerald-400">
        <p>Creating a new OpenSyntax application...</p>
        <p>Installing dependencies: react, next, framer-motion...</p>
        <p>Initialized a git repository.</p>
        <p className="text-white mt-2">Success! Ready to build the future.</p>
      </div>
    )
  },
]

export function InteractiveTerminal() {
  const [history, setHistory] = useState<Command[]>(HISTORY)
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const trimmed = input.trim()
    let output: React.ReactNode = <span className="text-red-400">Command not found: {trimmed}</span>

    if (trimmed === "clear") {
      setHistory([])
      setInput("")
      return
    }

    if (trimmed === "help") {
      output = (
        <div className="text-blue-300">
          <p>Available commands:</p>
          <ul className="list-disc pl-4 mt-1 space-y-1">
            <li><span className="text-emerald-300 font-bold">whoami</span> - Display current user info</li>
            <li><span className="text-emerald-300 font-bold">courses</span> - List all available learning paths</li>
            <li><span className="text-emerald-300 font-bold">enroll</span> - Start your journey</li>
            <li><span className="text-emerald-300 font-bold">clear</span> - Clear the terminal</li>
          </ul>
        </div>
      )
    } else if (trimmed === "whoami") {
      output = <span className="text-purple-300">guest_user_992 @ opensyntax-academy</span>
    } else if (trimmed === "courses") {
      output = (
        <div className="text-yellow-200">
          <p>1. Web Engineering (Next.js, Edge)</p>
          <p>2. System Design (Kafka, Redis, Sharding)</p>
          <p>3. Rust & Systems Programming</p>
          <p>4. AI/ML Engineering</p>
          <p>5. DevOps & Cloud</p>
          <p className="text-gray-400 italic mt-1">...and 8 more.</p>
        </div>
      )
    } else if (trimmed === "enroll") {
      output = <span className="text-emerald-400">Access Granted. Routing to dashboard...</span>
      setTimeout(() => {
        window.location.href = "/courses"
      }, 1500)
    } else if (trimmed.startsWith("echo ")) {
      output = <span className="text-white">{trimmed.substring(5)}</span>
    } else if (trimmed === "sudo") {
      output = <span className="text-red-500 font-bold">Nice try. But you don't have root privileges here.</span>
    }

    setHistory(prev => [...prev, { cmd: trimmed, output }])
    setInput("")
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/10"
      style={{
        background: "linear-gradient(180deg, rgba(15,15,20,0.95) 0%, rgba(10,10,15,0.98) 100%)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 198, 255, 0.1)"
      }}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
          <Terminal size={12} />
          <span>bash — opensyntax-cli</span>
        </div>
        <div className="w-12" /> {/* Spacer for balance */}
      </div>

      {/* Terminal Body */}
      <div 
        className="p-5 font-mono text-sm h-[320px] overflow-y-auto custom-scrollbar"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="text-gray-400 mb-4">
          <p>Welcome to OpenSyntax OS v3.1.0.</p>
          <p>Type <span className="text-emerald-400 font-bold">'help'</span> to see available commands.</p>
        </div>

        {history.map((h, i) => (
          <div key={i} className="mb-4">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <span className="text-blue-400">~/opensyntax</span>
              <span className="text-gray-500">$</span>
              <span className="text-white">{h.cmd}</span>
            </div>
            <div>{h.output}</div>
          </div>
        ))}

        <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4">
          <span className="text-blue-400">~/opensyntax</span>
          <span className="text-gray-500">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white font-mono placeholder:text-gray-700"
            placeholder="Type a command..."
            spellCheck={false}
            autoComplete="off"
            autoFocus
          />
        </form>
        <div ref={bottomRef} className="h-2" />
      </div>
    </motion.div>
  )
}
