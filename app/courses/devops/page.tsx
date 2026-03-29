import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const devopsModules: Module[] = [
  {
    id: "containers", title: "Module 1 — Containerization",
    lessons: [
      {
        id: "docker-multistage", title: "Multi-stage Docker Builds", duration: "25 min",
        description: "Reduce Docker image sizes by 90% by discarding build dependencies in production.",
        content: `<h2>Multi-Stage builds</h2>
<p>A Node.js or Rust application requires massive toolchains to compile, but the final binary only requires the minimal runtime.</p>
<p>Multi-stage builds let you compile the app in a "builder" image, and copy only the final artifact into a tiny production image.</p>
<pre><code class="language-dockerfile"># STAGE 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# STAGE 2: Production
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy only the compiled next folder and node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
</code></pre>
<p>The resulting \`runner\` image size drops drastically, meaning faster pulls across CI/CD and smaller vulnerability footprints.</p>`
      },
      {
        id: "k8s-deployments", title: "Kubernetes Rolling Updates", duration: "35 min",
        description: "Deploy and scale stateless applications securely across nodes with zero downtime.",
        content: `<h2>Kubernetes Deployments</h2>
<p>K8s uses Deployments to ensure a specific state is met cluster-wide. When releasing a new version, it utilizes a <strong>RollingUpdate</strong> strategy to swap Pods incrementally without dropping traffic.</p>
<pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-backend
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1       # Allow 1 extra pod to spin up
      maxUnavailable: 0 # Never drop below configured replicas during update
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: api
        image: api-backend:v2.0
        ports:
        - containerPort: 8080
        readinessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 5
</code></pre>
<p>The <code>readinessProbe</code> is critical; K8s won't route traffic to the new Pods until it returns a 200 OK status from the health endpoint.</p>`
      },
    ],
  },
  {
    id: "iac-observability", title: "Module 2 — IaC & Observability",
    lessons: [
      {
        id: "terraform-state", title: "Terraform State & Modules", duration: "30 min",
        description: "Lock infrastructure states remotely in S3 buckets and compose reusable infrastructure.",
        content: `<h2>Terraform State Management</h2>
<p>Terraform maps your HCL code to the real-world resources via a <code>.tfstate</code> file. In teams, keeping this file local creates massive conflict. You must configure remote state locking.</p>
<pre><code class="language-hcl">terraform {
  backend "s3" {
    bucket         = "production-tfstate-bucket"
    key            = "global/s3/terraform.tfstate"
    region         = "us-east-1"
    
    # DynamoDB handles the atomic locking mechanism
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
</code></pre>
<p>When someone executes <code>terraform apply</code>, DynamoDB locks the state. If another developer runs apply simultaneously, Terraform politely rejects the request to prevent cloud corruption.</p>`
      },
      {
        id: "github-actions", title: "GitHub Actions Matrices", duration: "25 min",
        description: "Run test suites across massive combinations of OS and Node.js versions in parallel.",
        content: `<h2>Matrix Builds</h2>
<p>Testing against different environments sequentially takes hours. A <code>matrix</code> automatically spawns parallel jobs combining different versions.</p>
<pre><code class="language-yaml">name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
        os: [ubuntu-latest, windows-latest]
        
    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js \${{ matrix.node-version }} on \${{ matrix.os }}
      uses: actions/setup-node@v3
      with:
        node-version: \${{ matrix.node-version }}
    - run: npm ci
    - run: npm test
</code></pre>
<p>This YAML instantly fans out into <strong>6 parallel jobs</strong>. Note the caching mechanism built into <code>setup-node@v3</code> to prevent redownloading dependencies on every step.</p>`
      },
      {
        id: "prometheus", title: "Prometheus & Grafana", duration: "20 min",
        description: "Scrape metrics from your microservices and build alerting dashboards.",
        content: `<h2>Metrics Engineering</h2>
<p>Uptime monitoring isn't enough. You need to log deep application metrics like 99th-percentile response times or database connection pool starvation.</p>
<p>Prometheus acts as a pull-model scraper. Your application exposes an endpoint (e.g., <code>/metrics</code>):</p>
<pre><code># HELP api_requests_total Total API requests
# TYPE api_requests_total counter
api_requests_total{method="GET",route="/users"} 12404
api_requests_total{method="POST",route="/users"} 314
</code></pre>
<p>Prometheus servers poll this endpoint every 15 seconds. Then, you write PromQL queries inside Grafana:</p>
<pre><code class="language-sql">rate(api_requests_total[5m])
</code></pre>
<p>This calculates the requests-per-second happening in a rolling 5-minute window!</p>`
      },
    ],
  },
]

export default function DevopsPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="DevOps & Cloud Engineering"
        description="Design and operate production infrastructure. Kubernetes rolling deployments with PodDisruptionBudgets, Terraform IaC, GitOps with ArgoCD, and full-stack observability with OpenTelemetry."
        category="DevOps"
        accentColor="#0DB7ED"
        modules={devopsModules}
        instructor="Kelsey Hightower"
        rating={4.8}
        reviewCount={1600}
        lastUpdated="Feb 2026"
      />
    </div>
  )
}
