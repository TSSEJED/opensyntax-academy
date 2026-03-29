import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const modules: Module[] = [
  {
    id: "rag",
    title: "Module 1 \u2014 RAG Systems",
    lessons: [
      {
        id: "rag-pipeline",
        title: "Production RAG Pipeline",
        duration: "32 min",
        description: "Build a hybrid retrieval-augmented generation system with Qdrant and cross-encoder reranking.",
        content: `<h2>Production RAG Pipeline</h2>
<p>A production RAG system uses hybrid retrieval (dense + sparse), cross-encoder reranking, and grounded answer generation with source attribution.</p>
<h3>Document Ingestion with Hybrid Embeddings</h3>
<pre><code>from langchain_text_splitters import RecursiveCharacterTextSplitter
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, SparseVector
import fastembed

splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=64)
dense_model  = fastembed.TextEmbedding("BAAI/bge-small-en-v1.5")
sparse_model = fastembed.SparseTextEmbedding("prithvida/Splade_PP_en_v1")

async def ingest(path: str) -> int:
    docs   = load_document(path)
    chunks = splitter.split_documents(docs)
    texts  = [c.page_content for c in chunks]

    dense_vecs  = list(dense_model.embed(texts))
    sparse_vecs = list(sparse_model.embed(texts))

    client.upsert(collection_name="docs", points=[
        PointStruct(
            id=i,
            vector={"dense": dense_vecs[i].tolist(),
                    "sparse": SparseVector(**sparse_vecs[i].as_object())},
            payload={"text": texts[i], "source": path}
        ) for i in range(len(chunks))
    ])
    return len(chunks)</code></pre>
<h3>Hybrid Search + Reranking</h3>
<pre><code>from sentence_transformers import CrossEncoder

reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")

async def retrieve(query: str, top_k: int = 5) -> list[dict]:
    dense_q  = list(dense_model.embed([query]))[0].tolist()
    sparse_q = list(sparse_model.embed([query]))[0].as_object()

    results = client.query_points(
        collection_name="docs",
        prefetch=[
            Prefetch(query=dense_q, using="dense", limit=20),
            Prefetch(query=SparseVector(**sparse_q), using="sparse", limit=20),
        ],
        query=FusionQuery(fusion=Fusion.RRF),
        limit=20,
    ).points

    pairs  = [(query, r.payload["text"]) for r in results]
    scores = reranker.predict(pairs)
    ranked = sorted(zip(scores, results), key=lambda x: x[0], reverse=True)
    return [r.payload for _, r in ranked[:top_k]]</code></pre>`,
      },
    ],
  },
  {
    id: "fine-tuning",
    title: "Module 2 \u2014 Fine-Tuning LLMs",
    lessons: [
      {
        id: "lora",
        title: "LoRA Fine-Tuning with QLoRA",
        duration: "35 min",
        description: "Fine-tune a 7B LLM on a single GPU using QLoRA (4-bit quantization + LoRA adapters).",
        content: `<h2>QLoRA — Fine-Tuning on a Single GPU</h2>
<p>QLoRA combines 4-bit quantization (NF4) with LoRA adapters, reducing the memory footprint of a 7B model from ~28GB to ~6GB — trainable on a single RTX 4090.</p>
<pre><code>from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, TaskType
from trl import SFTTrainer, SFTConfig
import torch

# 4-bit quantization config
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
)

model = AutoModelForCausalLM.from_pretrained(
    "mistralai/Mistral-7B-v0.1",
    quantization_config=bnb_config,
    device_map="auto",
)
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-v0.1")

# LoRA config — only train ~0.1% of parameters
lora_config = LoraConfig(
    r=16,                  # rank
    lora_alpha=32,         # scaling factor
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM,
)
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# → trainable params: 41,943,040 || all params: 3,790,426,112 || trainable%: 1.107%

trainer = SFTTrainer(
    model=model,
    train_dataset=dataset["train"],
    args=SFTConfig(output_dir="./output", num_train_epochs=3, per_device_train_batch_size=4),
)
trainer.train()</code></pre>`,
      },
    ],
  },
]

export default function CoursePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="AI/ML Engineering"
        description="Production RAG pipelines, LoRA fine-tuning, MLflow tracking, and drift monitoring."
        category="AI & Data"
        accentColor="oklch(0.65 0.22 295)"
        modules={modules}
      />
    </div>
  )
}
