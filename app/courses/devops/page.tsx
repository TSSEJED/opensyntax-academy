import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

export const metadata: Metadata = {
  title: "DevOps & Cloud Engineering — Docker, Kubernetes & Terraform",
  description: "Design production infrastructure with Docker, Kubernetes rolling deployments, Terraform IaC, GitHub Actions CI/CD, and Prometheus observability.",
  keywords: ["DevOps Course", "Kubernetes Tutorial", "Docker Course", "Terraform", "CI/CD Pipeline", "Cloud Infrastructure"],
}

const devopsModules: Module[] = [
  {
    id: "devops-tier-1", title: "Tier 1: Foundations — Systems & Shell",
    lessons: [
      {
        id: "linux-bash", title: "Linux Internals & Bash Scripting", duration: "35 min",
        description: "Master the root of the cloud. Processes, signals, and automating infrastructure with shell scripts.",
        content: `<h2>The Linux Root</h2>
<p>Cloud engineering is just Linux engineering at scale. You must understand <strong>Processes (PID)</strong>, <strong>Signals (SIGTERM/SIGKILL)</strong>, and the <strong>Filesystem Hierarchy</strong>.</p>
<h3>Bash Automation</h3>
<p>Professional DevOps involves automating repetitive tasks. We use <strong>Bash</strong> to glue together CLI tools, handling exit codes and environment variables for reliable execution.</p>`
      }
    ]
  },
  {
    id: "devops-tier-2", title: "Tier 2: Intermediate — Containerization & IaC",
    lessons: [
      {
        id: "docker-terraform", title: "Docker Multi-stage & Terraform Basics", duration: "45 min",
        description: "Packaging applications for the cloud and defining infrastructure as code.",
        content: `<h2>Immutable Infrastructure</h2>
<p>We use <strong>Docker</strong> to package applications with their dependencies. By using <strong>Multi-stage builds</strong>, we keep production images small and secure.</p>
<h3>Terraform (IaC)</h3>
<p>Don't click around the AWS console. Use <strong>Terraform</strong> to describe your infrastructure in HCL (HashiCorp Configuration Language). This allows for version control, peer reviews, and automated rollbacks.</p>`
      }
    ]
  },
  {
    id: "devops-tier-3", title: "Tier 3: Production — Orchestration & Scaling",
    lessons: [
      {
        id: "k8s-observability", title: "Kubernetes Orchestration & OpenTelemetry", duration: "60 min",
        description: "Managing thousands of containers. Rolling updates, health probes, and full-stack observability.",
        content: `<h2>Kubernetes at Scale</h2>
<p>Kubernetes (K8s) is the industry standard for container orchestration. We use <strong>Deployments</strong> to manage rolling updates and <strong>Services</strong> to handle internal load balancing.</p>
<h3>Full-stack Observability</h3>
<p>Production systems require deep monitoring. We use <strong>Prometheus</strong> for metrics and <strong>OpenTelemetry</strong> for distributed tracing, allowing us to find bottlenecks across microservices instantly.</p>
<p><strong>Scaling Tip:</strong> Use Horizontal Pod Autoscaling (HPA) based on custom metrics (like request count) rather than just CPU/Memory for more responsive scaling.</p>`
      }
    ]
  }
]

export default function DevopsPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="DevOps & Cloud Engineering"
        description="Master the production infrastructure lifecycle. From Linux internals and Bash scripting to global Kubernetes orchestration and observability."
        category="DevOps"
        accentColor="#0DB7ED"
        modules={devopsModules}
        instructor="Kelsey Hightower"
        rating={4.8}
        reviewCount={1600}
        lastUpdated="Mar 2026"
      />
    </div>
  )
}
