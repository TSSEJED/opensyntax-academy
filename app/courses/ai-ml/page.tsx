import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

export const metadata: Metadata = {
  title: "AI/ML Engineering Course — PyTorch, RAG & LLMs",
  description: "Build production AI systems. From linear algebra and NumPy to RAG pipelines with Qdrant, LoRA fine-tuning, and local SLM inference.",
  keywords: ["AI Course", "Machine Learning Tutorial", "PyTorch Course", "RAG Pipeline", "LLM Fine-Tuning", "MLOps", "NumPy", "Pandas"],
}

const aimlModules: Module[] = [
  {
    id: "ai-tier-1", title: "Tier 1: Foundations — Linear Algebra & Data Structures",
    lessons: [
      {
        id: "math-for-ai", title: "Linear Algebra & Gradients", duration: "30 min",
        description: "The mathematical backbone of AI. Matrices, vectors, and how gradients drive backpropagation.",
        content: `<h2>Linear Algebra in AI</h2>
<p>Models are just vast collections of weights stored in matrices. To optimize them, we calculate <strong>gradients</strong>—the slope of the loss function—which tell us how to nudge weights to reduce error.</p>
<h3>NumPy Vectorization</h3>
<p>We use <strong>NumPy</strong> for high-performance array processing. Vectorized operations allow us to avoid slow Python loops, executing math in optimized C-code instead.</p>`
      }
    ]
  },
  {
    id: "ai-tier-2", title: "Tier 2: Intermediate — Model Training & PyTorch",
    lessons: [
      {
        id: "pytorch-nn", title: "Neural Networks with PyTorch", duration: "45 min",
        description: "Building your first multi-layer perceptron. Understanding layers, optimizers, and loss functions.",
        content: `<h2>Deep Learning with PyTorch</h2>
<p>PyTorch provides a dynamic computational graph. You define the architecture, and it handles the complex calculus via <strong>autograd</strong>.</p>
<pre><code class="language-python">import torch
import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = nn.Linear(10, 1)

    def forward(self, x):
        return self.fc(x)</code></pre>`
      }
    ]
  },
  {
    id: "ai-tier-3", title: "Tier 3: Production — RAG & Local SLM",
    lessons: [
      {
        id: "rag-slm", title: "RAG Pipelines & Local SLM Quantization", duration: "60 min",
        description: "Retrieval-Augmented Generation with Qdrant and local model deployment via Ollama/GGUF.",
        content: `<h2>Production AI Architecture</h2>
<p>Production systems don't just 'use ChatGPT'. We build <strong>RAG (Retrieval-Augmented Generation)</strong> pipelines to ground responses in corporate data using vector databases like <strong>Qdrant</strong>.</p>
<h3>Local Inference</h3>
<p>To ensure zero tracking and lower latency, we deploy <strong>Small Language Models (SLMs)</strong> locally. We use <strong>quantization</strong> (turning 32-bit weights into 4-bit integers) to run 7B+ parameter models on consumer hardware.</p>
<p><strong>Security Note:</strong> Always implement input sanitization to protect your model endpoints against prompt injection attacks.</p>`
      }
    ]
  }
]

export default function AILearningPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="AI/ML Engineering"
        description="Master the full AI stack. From linear algebra and vectorized NumPy data structures to production RAG pipelines and local SLM inference."
        category="AI & Data"
        accentColor="#A259FF"
        modules={aimlModules}
        instructor="Harrison Chase"
        rating={5.0}
        reviewCount={950}
        lastUpdated="Mar 2026"
      />
    </div>
  )
}
