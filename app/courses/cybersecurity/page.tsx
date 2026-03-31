import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

export const metadata: Metadata = {
  title: "Cybersecurity Fundamentals — Learn Ethical Hacking",
  description: "Master cybersecurity fundamentals. Web security from an attacker's perspective, injection attacks, XSS, OAuth 2.0, CSRF prevention, and Zero Trust architecture.",
  keywords: ["Cybersecurity Course", "Ethical Hacking", "OWASP Top 10", "Web Security", "XSS", "SQL Injection", "Zero Trust"],
}

const cybersecurityModules: Module[] = [
  {
    id: "security-tier-1", title: "Tier 1: Foundations — Network & Protocol Security",
    lessons: [
      {
        id: "http-ssl", title: "HTTP/S, SSL & TLS Internals", duration: "35 min",
        description: "Securing the transport layer. Understanding handshakes, certificates, and encryption at rest vs. transit.",
        content: `<h2>The Secure Transport</h2>
<p>Security starts at the transport layer. <strong>HTTPS</strong> adds a layer of encryption (TLS) over HTTP, ensuring that data cannot be sniffed by man-in-the-middle attacks.</p>
<h3>Certificates & CAs</h3>
<p>We trust websites because of <strong>Certificate Authorities (CAs)</strong>. A certificate proves that the server you are talking to is indeed who they claim to be, using asymmetric cryptography.</p>`
      }
    ]
  },
  {
    id: "security-tier-2", title: "Tier 2: Intermediate — Application Security (OWASP)",
    lessons: [
      {
        id: "owasp-top-10", title: "OWASP Top 10: XSS, SQLi & Broken Auth", duration: "50 min",
        description: "Deconstructing the most common web vulnerabilities and how to mitigate them at the source code level.",
        content: `<h2>Common Attack Vectors</h2>
<p>The <strong>OWASP Top 10</strong> is the definitive list of web security risks. We focus on <strong>Injection (SQLi)</strong> and <strong>Cross-Site Scripting (XSS)</strong>.</p>
<h3>Secure Authentication</h3>
<p>Stop rolling your own auth. We use <strong>OAuth 2.0</strong> and <strong>OIDC</strong> to delegate identity to trusted providers, and use <strong>JWTs</strong> with asymmetric signing (RS256) for secure, stateless sessions.</p>`
      }
    ]
  },
  {
    id: "security-tier-3", title: "Tier 3: Production — Advanced Defense & Zero Trust",
    lessons: [
      {
        id: "zero-trust-mtls", title: "Zero Trust Architecture & mTLS", duration: "60 min",
        description: "Securing microservices in a post-perimeter world. Implementing mutual TLS (mTLS) and DevSecOps pipelines.",
        content: `<h2>The Zero Trust Mindset</h2>
<p>In a <strong>Zero Trust</strong> world, we assume the network is already breached. No service or user is 'trusted' just because they are on the internal network.</p>
<h3>mTLS & Service Mesh</h3>
<p>We use <strong>mutual TLS (mTLS)</strong> to ensure that every service-to-service communication is encrypted and authenticated at <em>both</em> ends. This drastically shrinks the blast radius of a single compromised container.</p>
<p><strong>Defense Tip:</strong> Implement <strong>Content Security Policy (CSP)</strong> headers to prevent any untrusted scripts from running in your users' browsers, creating a final fallback layer of defense.</p>`
      }
    ]
  }
]

export default function CybersecurityPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Cybersecurity Fundamentals"
        description="Think like an attacker to defend like an expert. From network protocol security and OWASP mitigation to advanced Zero Trust architectures and mTLS."
        category="Security"
        accentColor="#FF4D4D"
        modules={cybersecurityModules}
        instructor="Tanya Janca"
        rating={4.8}
        reviewCount={890}
        lastUpdated="Mar 2026"
      />
    </div>
  )
}
