import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

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
</code></pre>`
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
<p>Always use query parameterization (\`$1\`, \`$2\`), which sends the query plan and the user data to the database separately. The database treats the input strictly as a literal scalar value, making injection structurally impossible.</p>`
      },
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
<p>This ensures the sensitive Access Token is never exposed to the user's browser or any client-side XSS vectors.</p>`
      },
      {
        id: "jwt-claims", title: "Secure JWT Implementations", duration: "30 min",
        description: "Algorithmic downgrades ('none' exploits), asymmetrical signing matrices, and secure token storage.",
        content: `<h2>JSON Web Tokens (JWT)</h2>
<p>JWTs are stateless, cryptographically signed tokens containing arbitrary JSON claims. They do NOT encrypt data (the payload is base64 text) — they only guarantee integrity.</p>
<h3>The RS256 vs HS256 Debate</h3>
<p>Never use HS256 (symmetric secret) if you share tokens with third parties. An attacker possessing your HS256 secret to verify a token can also forge them. Use RS256 (asymmetric keys): your backend signs with a Private Key, and all microservices verify using a Public Key.</p>
<h3>Storage Dangers</h3>
<p>Storing a JWT in <code>localStorage</code> exposes it to XSS. Storing it in an <code>HttpOnly</code> cookie defends against XSS, but exposes you to CSRF (Cross-Site Request Forgery). We will architect the "Double Submit Cookie" pattern or use <code>SameSite=Strict</code> attributes to neutralize both!</p>`
      },
      {
        id: "csrf-defense", title: "CSRF & SameSite Mitigation", duration: "20 min",
        description: "Protecting state-changing endpoints against malicious cross-domain requests.",
        content: `<h2>Cross-Site Request Forgery (CSRF)</h2>
<p>A malicious website can formulate a POST request to your bank's API. If you are currently logged into the bank in another tab, your browser will automatically attach your session cookies to that malicious request.</p>
<h3>The SameSite Cookie attribute</h3>
<p>By enforcing <code>Set-Cookie: session=xyz; SameSite=Strict</code>, the browser explicitly prevents your session cookie from traversing across domains automatically. For APIs requiring looser CORS policies, cryptographically linked Anti-CSRF tokens passed in headers are strictly required.</p>`
      },
    ],
  },
]

export default function CybersecurityPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Cybersecurity Fundamentals"
        description="Understand web security from an attacker's perspective to defend like an expert. Injection attacks, XSS with Content Security Policy, secure JWT patterns, OAuth 2.0, and CSRF prevention."
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
