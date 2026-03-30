import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

export const metadata: Metadata = {
  title: "Free Cybersecurity Course — Learn Ethical Hacking",
  description: "Master cybersecurity fundamentals, understand web security from an attacker's perspective, injection attacks, XSS, OAuth 2.0, and CSRF prevention.",
  keywords: ["Free Cybersecurity Course", "Learn Ethical Hacking", "OWASP Top 10 Tutorial", "XSS", "SQL Injection", "Cybersecurity Training", "Penetration Testing", "InfoSec"],
}

const cybersecurityModules: Module[] = [
  {
    id: "owasp-top-10", title: "Module 1 — Attack Vectors",
    lessons: [
      {
        id: "xss-defense", title: "Cross-Site Scripting (XSS)", duration: "25 min",
        description: "How attackers inject JavaScript into your users' browsers, and how to stop it at the framework level.",
        content: `<h2>Cross-Site Scripting (XSS)</h2>
<p>If you mistakenly evaluate user input as executable code, an attacker can steal session cookies, impersonate the user, or rewrite the DOM.</p>
<h3>Sanitization Failure</h3>
<pre><code class="language-javascript">// VULNERABLE
document.getElementById('comments').innerHTML = userInput;
</code></pre>
<p>Modern frameworks like React automatically escape text nodes (e.g. <code>&lt;div&gt;{userInput}&lt;/div&gt;</code> mitigates this), but you can still bypass it using features like <code>dangerouslySetInnerHTML</code> or by injecting payloads into highly-specific DOM attributes (like <code>href=javascript:...</code>).</p>
<h3>Content Security Policy (CSP)</h3>
<p>The ultimate defense against XSS is a strict CSP header which tells the browser specifically what domains are allowed to execute scripts.</p>
<pre><code class="language-http">Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.google.com
</code></pre>
<h3>Reflected vs Stored XSS</h3>
<p>A Reflected XSS attack involves an attacker tricking a user into clicking a link that contains a malicious script in the URL, which the server then reflects back to the user's browser. Stored XSS is much more dangerous: the malicious script is permanently stored on the server (e.g., in a database via a comment field), and any user visiting the affected page will execute the script automatically without clicking a malicious link.</p>
`
      },
      {
        id: "sql-injection", title: "SQL Injection Vectors", duration: "25 min",
        description: "Understanding parameterization and how raw ORM queries can be manipulated.",
        content: `<h2>SQL Injection (SQLi)</h2>
<p>When user input is combined directly with SQL string concatenation, an attacker can append their own SQL commands to drop tables or read private data.</p>
<pre><code class="language-sql">-- VULNERABLE
SELECT * FROM users WHERE email = '" + req.body.email + "';
</code></pre>
<p>If the user sends <code>' OR 1=1 --</code>, the query evaluates as entirely true, bypassing authentication entirely.</p>
<h3>Prepared Statements</h3>
<p>Always use query parameterization (\`$1\`, \`$2\`), which sends the query plan and the user data to the database separately. The database treats the input strictly as a literal scalar value, making injection structurally impossible.</p>
<h3>Blind SQLi</h3>
<p>Even if the application doesn't return the database error directly to the DOM, attackers can infer the structure of your database based on timing attacks. Using <code>pg_sleep(10)</code> combined with malicious queries can force the server to wait for 10 seconds if a true condition is met, exposing tables row by row.</p>`
      },
      {
        id: "ssrf-attacks", title: "Server-Side Request Forgery", duration: "20 min",
        description: "How attackers coerce your server into making internal requests.",
        content: `<h2>Server-Side Request Forgery (SSRF)</h2>
<p>SSRF occurs when a web application is fetching a remote resource without validating the user-supplied URL. An attacker can force the web app to make requests and interact with internal systems they couldn't reach natively (e.g., local administrative panels, AWS metadata endpoints).</p>
<pre><code class="language-http">GET /api/fetch-image?url=http://169.254.169.254/latest/meta-data/ HTTP/1.1
</code></pre>
<p>By forcing the server to reach out to the AWS IMDS endpoint (169.254.169.254), attackers can steal powerful IAM keys attached to your EC2 instance.</p>`
      }
    ],
  },
  {
    id: "auth-security", title: "Module 2 — Identity & Transport",
    lessons: [
      {
        id: "oauth-2", title: "OAuth 2.0 Identity Flows", duration: "35 min",
        description: "Deconstruct Authorization Code flows with PKCE vs Implicit Grant types.",
        content: `<h2>OAuth 2.0 & OIDC</h2>
<p>Never build user passwords if you don't have to. Delegating to OAuth (Login with Google/GitHub) offloads hash complexity.</p>
<h3>Authorization Code Flow</h3>
<ol>
<li>Client sends user to Authorization Server.</li>
<li>User approves consent prompt.</li>
<li>Server redirects back to Client with a short-lived <code>code</code>.</li>
<li>Client backend securely swaps the <code>code</code> and its <code>client_secret</code> for an <code>access_token</code> directly with the Authorization Server.</li>
</ol>
<p>This ensures the sensitive Access Token is never exposed to the user's browser or any client-side XSS vectors.</p>
<h3>The Importance of PKCE</h3>
<p>Proof Key for Code Exchange (PKCE) is required when you don't have a secure backend to hold a <code>client_secret</code> (e.g. mobile apps or Single Page Apps). The client dynamically generates a cryptographic random string on the fly, hashing it and sending it during phase 1, and verifying it in phase 4. This prevents the authorization code from being hijacked mid-flight.</p>`
      },
      {
        id: "jwt-claims", title: "Secure JWT Implementations", duration: "30 min",
        description: "Algorithmic downgrades ('none' exploits), asymmetrical signing matrices, and secure token storage.",
        content: `<h2>JSON Web Tokens (JWT)</h2>
<p>JWTs are stateless, cryptographically signed tokens containing arbitrary JSON claims. They do NOT encrypt data (the payload is base64 text) — they only guarantee integrity.</p>
<h3>The RS256 vs HS256 Debate</h3>
<p>Never use HS256 (symmetric secret) if you share tokens with third parties. An attacker possessing your HS256 secret to verify a token can also forge them. Use RS256 (asymmetric keys): your backend signs with a Private Key, and all microservices verify using a Public Key.</p>
<h3>Storage Dangers & Strategies</h3>
<p>Storing a JWT in <code>localStorage</code> exposes it to XSS. Storing it in an <code>HttpOnly</code> cookie defends against XSS, but exposes you to CSRF (Cross-Site Request Forgery). The most secure pattern for SPAs is using an API Gateway or BFF (Backend for Frontend) that holds the token securely and issues encrypted, short-lived <code>HttpOnly</code> cookies to the browser.</p>`
      },
      {
        id: "csrf-defense", title: "CSRF & SameSite Mitigation", duration: "20 min",
        description: "Protecting state-changing endpoints against malicious cross-domain requests.",
        content: `<h2>Cross-Site Request Forgery (CSRF)</h2>
<p>A malicious website can formulate a POST request to your bank's API. If you are currently logged into the bank in another tab, your browser will automatically attach your session cookies to that malicious request.</p>
<h3>The SameSite Cookie attribute</h3>
<p>By enforcing <code>Set-Cookie: session=xyz; SameSite=Strict</code>, the browser explicitly prevents your session cookie from traversing across domains automatically. For APIs requiring looser CORS policies, cryptographically linked Anti-CSRF tokens passed in headers are strictly required.</p>
<h3>State Mutating Verbs</h3>
<p>Always ensure your server enforces strict HTTP Verb discipline. <code>GET</code> requests must NEVER mutate state. If an attacker can delete a user by hitting <code>GET /delete?user=123</code>, they can bypass CSRF defenses completely just by dropping an <code>&lt;img src=".../delete"&gt;</code> tag onto an external site.</p>`
      },
    ],
  },
  {
    id: "cloud-security", title: "Module 3 — Cloud & Network Defense",
    lessons: [
      {
        id: "zero-trust", title: "Zero Trust Architecture", duration: "40 min",
        description: "Moving from perimeter-based security logic to micro-segmented identity networks.",
        content: `<h2>Zero Trust Framework</h2>
<p>The concept of a "trusted internal network" is dead. If an attacker breaches the perimeter via a compromised end-user device or SSRF, they historically could roam freely. Zero Trust mandates that every single component, microservice, and user constantly proves their identity and authorization.</p>
<h3>Mutual TLS (mTLS)</h3>
<p>In a service mesh (like Istio), traffic between internal services is encrypted and authenticated using mTLS. Service A cannot talk to Service B without presenting a valid cryptographic certificate proving its identity, drastically shrinking the blast radius of a compromised service.</p>`
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
        description="Understand web security from an attacker's perspective to defend like an expert. Injection attacks, XSS with Content Security Policy, secure JWT patterns, OAuth 2.0, CSRF prevention, SSRF, and Zero Trust networks."
        category="Security"
        accentColor="#FF4D4D"
        modules={cybersecurityModules}
        instructor="Tanya Janca"
        rating={4.8}
        reviewCount={890}
        lastUpdated="Jan 2026"
      />
    </div>
  )
}
