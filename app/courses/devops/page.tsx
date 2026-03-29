import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const modules: Module[] = [
  {
    id: "k8s",
    title: "Module 1 \u2014 Kubernetes Production",
    lessons: [
      {
        id: "zero-downtime",
        title: "Zero-Downtime Deployments",
        duration: "30 min",
        description: "Rolling updates, PodDisruptionBudgets, readiness probes, and graceful shutdown in Node.js.",
        content: `<h2>Zero-Downtime Kubernetes Deployments</h2>
<p>A production Kubernetes deployment requires careful orchestration of readiness probes, resource limits, PodDisruptionBudgets, and rollout strategies.</p>
<h3>Production Deployment Manifest</h3>
<pre><code>apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # allow 1 extra pod during rollout
      maxUnavailable: 0  # never remove a pod before a new one is ready
  template:
    spec:
      terminationGracePeriodSeconds: 60
      containers:
        - name: api
          image: ghcr.io/org/api:$(IMAGE_TAG)
          resources:
            requests: { memory: "256Mi", cpu: "125m" }
            limits:   { memory: "512Mi", cpu: "500m" }
          readinessProbe:
            httpGet: { path: /healthz/ready, port: 3000 }
            initialDelaySeconds: 5
            periodSeconds: 5
            failureThreshold: 3</code></pre>
<h3>PodDisruptionBudget</h3>
<pre><code>apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-pdb
spec:
  minAvailable: 3  # always keep 3+ pods running
  selector:
    matchLabels:
      app: api-server</code></pre>
<h3>Graceful Shutdown in Node.js</h3>
<pre><code>const server = app.listen(3000)

process.on("SIGTERM", () => {
  server.close(async () => {
    await db.destroy()
    await redis.quit()
    process.exit(0)
  })
  setTimeout(() => process.exit(1), 55_000)
})</code></pre>`,
      },
    ],
  },
  {
    id: "terraform",
    title: "Module 2 \u2014 Infrastructure as Code",
    lessons: [
      {
        id: "terraform-modules",
        title: "Terraform Modules & State",
        duration: "28 min",
        description: "Build reusable Terraform modules, manage remote state with S3+DynamoDB locking, and use workspaces.",
        content: `<h2>Terraform Modules & Remote State</h2>
<h3>Reusable Module Structure</h3>
<pre><code># modules/eks-cluster/main.tf
variable "cluster_name" { type = string }
variable "node_count"   { type = number; default = 3 }
variable "instance_type"{ type = string; default = "t3.medium" }

resource "aws_eks_cluster" "this" {
  name     = var.cluster_name
  role_arn = aws_iam_role.cluster.arn
  version  = "1.29"
  vpc_config {
    subnet_ids = var.subnet_ids
  }
}

output "cluster_endpoint" { value = aws_eks_cluster.this.endpoint }
output "cluster_name"     { value = aws_eks_cluster.this.name }</code></pre>
<h3>Remote State with S3 + DynamoDB Locking</h3>
<pre><code># backend.tf
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "production/eks/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"  # prevents concurrent applies
    encrypt        = true
  }
}</code></pre>
<h3>Workspaces for Multi-Environment</h3>
<pre><code># Create environments
terraform workspace new staging
terraform workspace new production

# Environment-specific variables
locals {
  env_config = {
    staging    = { node_count = 2, instance_type = "t3.small" }
    production = { node_count = 6, instance_type = "m5.large" }
  }
  config = local.env_config[terraform.workspace]
}</code></pre>`,
      },
    ],
  },
]

export default function CoursePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="DevOps & Cloud Engineering"
        description="Kubernetes production patterns, Terraform IaC, GitOps with ArgoCD, and OpenTelemetry observability."
        category="DevOps"
        accentColor="oklch(0.68 0.14 210)"
        modules={modules}
      />
    </div>
  )
}
