import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const modules: Module[] = [
  {
    id: "owasp",
    title: "Module 1 \u2014 OWASP Top 10",
    lessons: [
      {
        id: "injection",
        title: "Injection Attacks & Prevention",
        duration: "26 min",
        description: "SQL, NoSQL, command, and LDAP injection patterns with concrete prevention strategies.",
        content: `<h2>Injection Attacks & Prevention</h2>
<p>Injection is the #1 web vulnerability. The fix is always the same: separate code from data using parameterized queries.</p>
<h3>SQL Injection — Attack & Defense</h3>
<pre><code>// Vulnerable — string concatenation
const q = "SELECT * FROM users WHERE email = '" + email + "'"
// Attacker: email = ' OR '1'='1' -- → bypasses auth

// Safe — parameterized query
const user = await db.query(
  "SELECT * FROM users WHERE email = $1 AND password_hash = $2",
  [email, hashPassword(pass)]
)</code></pre>
<h3>Content Security Policy — Block XSS</h3>
<pre><code>// next.config.mjs
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'nonce-{NONCE}'",
      "img-src 'self' data: https://cdn.example.com",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
]</code></pre>
<h3>Secure JWT with jose</h3>
<pre><code>import { SignJWT, jwtVerify } from "jose"
const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function signToken(payload: Record&lt;string, unknown&gt;) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")  // short-lived access token
    .sign(secret)
}

// Store refresh tokens in httpOnly cookies — NOT localStorage
// httpOnly: prevents XSS from reading the token
// sameSite: 'lax' — prevents CSRF</code></pre>`,
      },
    ],
  },
]

export default function CoursePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Cybersecurity Fundamentals"
        description="OWASP Top 10, injection prevention, XSS with CSP, secure JWT, and OAuth 2.0 patterns."
        category="Security"
        accentColor="oklch(0.62 0.21 25)"
        modules={modules}
      />
    </div>
  )
}
