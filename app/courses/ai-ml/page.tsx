import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const aimlModules: Module[] = [
  {
    id: "pytorch-fundamentals", title: "Module 1 — PyTorch Fundamentals",
    lessons: [
      {
        id: "tensors", title: "Tensors & Gradients", duration: "25 min",
        description: "Understanding Autograd, multidimensional tensors, and moving computations to the GPU.",
        content: `<h2>PyTorch Tensors</h2>
<p>Unlike NumPy, PyTorch Tensors are designed to run on the GPU and track computational graphs natively.</p>
<pre><code class="language-python">import torch

# Create a tensor and attach gradients
x = torch.tensor(2.0, requires_grad=True)
y = x ** 2 + 5 * x

# Compute gradients via backward pass
y.backward()

# dy/dx = 2x + 5. At x=2, slope is 9.
print(x.grad) # tensor(9.)
</code></pre>
<h3>GPU Acceleration</h3>
<p>Transferring operations to thousands of CUDA cores takes one line of code:</p>
<pre><code class="language-python">device = 'cuda' if torch.cuda.is_available() else 'cpu'
matrix = torch.rand(1000, 1000).to(device)
</code></pre>`
      },
      {
        id: "transformer-architecture", title: "Transformer Architecture", duration: "45 min",
        description: "Deconstructing Self-Attention, Positional Encoding, and Feed-Forward Networks.",
        content: `<h2>The Transformer Model</h2>
<p>The core of models like GPT and BERT is the <strong>Self-Attention</strong> mechanism, which calculates dynamic weights for how much one word should attend to every other word in a sequence.</p>
<h3>Scaled Dot-Product Attention</h3>
<pre><code class="language-python">import torch.nn.functional as F
import math

# Q, K, V are matrices of shape (Batch, SeqLen, Dim)
def attention(query, key, value):
    dim_k = query.size(-1)
    # Q * K^T / sqrt(D)
    scores = torch.bmm(query, key.transpose(-2, -1)) / math.sqrt(dim_k)
    
    # Softmax to get probabilities
    weights = F.softmax(scores, dim=-1)
    return torch.bmm(weights, value)
</code></pre>
<p>Without positional encodings, self-attention treats sequences as sets (it has no concept of order). Positional encodings are added to the input embeddings to inject relative/absolute position information.</p>`
      },
    ],
  },
  {
    id: "rag-finetuning", title: "Module 2 — Applied LLMs",
    lessons: [
      {
        id: "rag-qdrant", title: "RAG & Vector Databases", duration: "35 min",
        description: "Build Retrieval-Augmented Generation systems using Qdrant vector search.",
        content: `<h2>Retrieval-Augmented Generation (RAG)</h2>
<p>LLMs hallucinate and lack private data. By indexing internal documents as vector embeddings, we can perform semantic search and prepend relevant context to the prompt.</p>
<h3>Generating Embeddings</h3>
<pre><code class="language-python">from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-MiniLM-L6-v2')

docs = ["Corporate policy prohibits remote work.", "Expense reports are due Friday."]
embeddings = model.encode(docs)
</code></pre>
<p>These vectors are stored in extremely fast specialized architectures (HNSW graphs) inside databases like <strong>Qdrant</strong> or Pinecone for millisecond retrieval over millions of records.</p>`
      },
      {
        id: "lora-finetune", title: "LoRA Fine-tuning", duration: "40 min",
        description: "Efficiently adapt massive LLMs on consumer hardware using Low-Rank Adaptation.",
        content: `<h2>Parameter-Efficient Fine-Tuning (PEFT)</h2>
<p>Updating a 7B parameter model requires vast VRAM for optimizer states. <strong>LoRA (Low-Rank Adaptation)</strong> freezes the massive pre-trained weights and injects tiny trainable rank-decomposition matrices.</p>
<pre><code class="language-python">from peft import LoraConfig, get_peft_model
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-v0.1")

# Apply LoRA selectively to Attention matrices
config = LoraConfig(
    r=8,
    lora_alpha=16,
    target_modules=["q_proj", "v_proj"],
    bias="none"
)

# Convert to PEFT model (reduces trainable params by 99%)
peft_model = get_peft_model(model, config)
</code></pre>
<p>When deployed, these small LoRA adapters can be dynamically merged back into the base model weights, resulting in identical inference latency with specialized performance.</p>`
      },
      {
        id: "mlflow-tracking", title: "MLOps with MLflow", duration: "30 min",
        description: "Track model artifacts, hyperparameters, and production drift over time.",
        content: `<h2>Experiment Tracking</h2>
<p>Data science breaks down without rigorous tracking. Was iteration 42 or 51 better? What was the dropout rate for the best model? <strong>MLflow</strong> solves this.</p>
<pre><code class="language-python">import mlflow

mlflow.set_tracking_uri("sqlite:///mlflow.db")
mlflow.set_experiment("LoRA-Finetune")

with mlflow.start_run():
    # Log parameters
    mlflow.log_params({"lr": 1e-4, "epochs": 5})
    
    # Train...
    loss = 0.42
    
    # Log metrics
    mlflow.log_metric("val_loss", loss)
    
    # Log the resulting PyTorch model
    mlflow.pytorch.log_model(peft_model, "model")
</code></pre>`
      },
    ],
  },
]

export default function AILearningPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="AI/ML Engineering"
        description="Build production AI systems end-to-end. Hybrid RAG pipelines with Qdrant, cross-encoder reranking, LoRA fine-tuning, MLflow experiment tracking, and drift monitoring in production."
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
