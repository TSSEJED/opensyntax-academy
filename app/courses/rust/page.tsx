import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

export const metadata: Metadata = {
  title: "Rust & Systems Programming — Memory Safety, Tokio & WebAssembly",
  description: "Master Rust's ownership model, fearless concurrency, async programming with Tokio, and compiling high-performance WebAssembly modules for the web.",
  keywords: ["Rust Course", "Systems Programming", "WebAssembly", "WASM", "Tokio", "Rustlang", "Memory Safety"],
}

const rustModules: Module[] = [
  {
    id: "rust-foundations", title: "Module 1 — Memory & Ownership",
    lessons: [
      {
        id: "ownership-borrowing", title: "Ownership & Borrowing", duration: "35 min",
        description: "Understand the compiler rules that make Rust memory-safe without a garbage collector.",
        content: `<h2>The Ownership Model</h2>
<p>Unlike languages with a Garbage Collector (Java, Python) or manual memory management (C, C++), Rust introduces a third paradigm: <strong>Ownership</strong>. It guarantees memory safety at compile time.</p>
<h3>Three Rules of Ownership</h3>
<ol>
  <li>Each value in Rust has an owner.</li>
  <li>There can only be one owner at a time.</li>
  <li>When the owner goes out of scope, the value will be dropped.</li>
</ol>
<pre><code class="language-rust">fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // Ownership moves to s2
    
    // println!("{}, world!", s1); // ERROR: value borrowed here after move
    println!("{}, world!", s2); // Works perfectly
}</code></pre>

<h3>Borrowing with References</h3>
<p>If we want a function to use a value without taking ownership, we pass a reference (<code>&amp;</code>).</p>
<pre><code class="language-rust">fn calculate_length(s: &String) -> usize { // s is a reference to a String
    s.len()
} // Here, s goes out of scope. But because it does not have ownership, nothing is dropped.

fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}</code></pre>`
      },
      {
        id: "lifetimes", title: "Lifetimes", duration: "30 min",
        description: "Learn how the compiler prevents dangling pointers.",
        content: `<h2>Validating References with Lifetimes</h2>
<p>Every reference in Rust has a <em>lifetime</em>, which is the scope for which that reference is valid. The Rust borrow checker uses lifetimes to ensure all borrows are valid.</p>
<pre><code class="language-rust">// This will fail to compile!
// fn longest(x: &str, y: &str) -> &str {
//    if x.len() > y.len() { x } else { y }
// }

// Correct implementation with explicit lifetime annotations
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
</code></pre>
<p>The notation <code>&lt;'a&gt;</code> tells the compiler that the returned reference will be valid as long as <em>both</em> parameters are valid. It prevents returning a reference to a string that might be dropped early.</p>`
      },
    ],
  },
  {
    id: "async-rust", title: "Module 2 — Fearless Concurrency",
    lessons: [
      {
        id: "async-tokio", title: "Async Run-times & Tokio", duration: "40 min",
        description: "Build high-performance concurrent applications without data races.",
        content: `<h2>Asynchronous Programming in Rust</h2>
<p>Rust's standard library provides the <code>Future</code> trait, but it does not include an async runtime. <strong>Tokio</strong> is the industry standard runtime for writing reliable, asynchronous systems.</p>
<pre><code class="language-rust">use tokio::net::TcpListener;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let listener = TcpListener::bind("127.0.0.1:8080").await?;

    loop {
        let (mut socket, _) = listener.accept().await?;

        // Spawn a new green-thread per connection
        tokio::spawn(async move {
            let mut buf = [0; 1024];

            // In a loop, read data from the socket and write it back
            loop {
                let n = match socket.read(&mut buf).await {
                    Ok(n) if n == 0 => return,
                    Ok(n) => n,
                    Err(e) => {
                        eprintln!("failed to read from socket; err = {:?}", e);
                        return;
                    }
                };

                // Write the data back
                if let Err(e) = socket.write_all(&buf[0..n]).await {
                    eprintln!("failed to write to socket; err = {:?}", e);
                    return;
                }
            }
        });
    }
}</code></pre>
<p>Because of Rust's <code>Send</code> and <code>Sync</code> traits, it's impossible to accidentally share mutated state across threads without proper synchronization primitives (like <code>Mutex</code> or <code>RwLock</code>).</p>`
      },
    ],
  },
  {
    id: "webassembly", title: "Module 3 — WebAssembly",
    lessons: [
      {
        id: "rust-wasm", title: "Compiling Rust to WASM", duration: "35 min",
        description: "Run Rust code in the browser at near-native speeds.",
        content: `<h2>WebAssembly (WASM)</h2>
<p>WebAssembly is a binary instruction format for a stack-based virtual machine. It's designed as a portable compilation target allowing execution at native speed on the web.</p>
<h3>wasm-bindgen</h3>
<p><code>wasm-bindgen</code> facilitates high-level interactions between Wasm modules and JavaScript.</p>
<pre><code class="language-rust">use wasm_bindgen::prelude::*;

// When the \`wee_alloc\` feature is enabled, use \`wee_alloc\` as the global allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}! This is Rust running in the browser!", name));
}
</code></pre>
<p>You can compile this using <code>wasm-pack build --target web</code>, and then seamlessly import the resulting module directly into your Next.js frontend to offload heavy cryptographic or image-processing workloads!</p>`
      },
    ],
  },
]

export default function RustPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Rust & Systems Programming"
        description="Master the language Stack Overflow users voted 'most loved' for 8 years running. Understand the borrow checker, memory lifetimes, multithreaded concurrency with Tokio, and compiling high-performance WebAssembly."
        category="Systems"
        accentColor="#DEA584"
        modules={rustModules}
        instructor="Steve Klabnik"
        rating={4.9}
        reviewCount={4300}
        lastUpdated="Mar 2026"
      />
    </div>
  )
}
