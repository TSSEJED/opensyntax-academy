import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const modules: Module[] = [
  {
    id: "numpy",
    title: "Module 1 \u2014 NumPy Internals",
    lessons: [
      {
        id: "vectorization",
        title: "Vectorization & Broadcasting",
        duration: "22 min",
        description: "Replace Python loops with vectorized NumPy operations for 100x speedups.",
        content: `<h2>NumPy Vectorization & Broadcasting</h2>
<p>NumPy operations execute in compiled C. Replacing Python loops with vectorized operations typically yields 50–200x speedups.</p>
<h3>Eliminate Loops — Vectorize Everything</h3>
<pre><code>import numpy as np

# Slow: Python loop
def euclidean_slow(a, b):
    return [sum((ai-bi)**2 for ai,bi in zip(ra,rb))**0.5 for ra,rb in zip(a,b)]

# Fast: fully vectorized (380x faster on 100k rows)
def euclidean_fast(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    return np.sqrt(np.sum((a - b) ** 2, axis=1))</code></pre>
<h3>Broadcasting — Shape Rules</h3>
<pre><code>rng = np.random.default_rng(42)
centers = rng.standard_normal((5, 3))   # 5 cluster centers
points  = rng.standard_normal((1000, 3))

# (1000,1,3) - (1,5,3) = (1000,5,3) via broadcasting
diff   = points[:, np.newaxis, :] - centers[np.newaxis, :, :]
dists  = np.sqrt(np.sum(diff ** 2, axis=2))  # (1000, 5)
labels = np.argmin(dists, axis=1)  # nearest center for each point</code></pre>`,
      },
      {
        id: "pandas-advanced",
        title: "Advanced Pandas Wrangling",
        duration: "28 min",
        description: "Master MultiIndex, rolling windows, EMA, and memory-efficient categorical types.",
        content: `<h2>Advanced Pandas</h2>
<h3>MultiIndex & Cross-Section Slicing</h3>
<pre><code>import pandas as pd
idx = pd.MultiIndex.from_product(
    [["2024","2025"], ["Q1","Q2","Q3","Q4"], ["TN","FR","DE"]],
    names=["year","quarter","country"]
)
df = pd.DataFrame({"revenue": np.random.randint(10_000,500_000,len(idx))}, index=idx)

q1  = df.xs("Q1", level="quarter")
yoy = df.groupby(level=["quarter","country"])["revenue"].pct_change()</code></pre>
<h3>Rolling Windows & Bollinger Bands</h3>
<pre><code>ts = pd.read_parquet("sales.parquet").set_index("date").sort_index()
ts["ma_30d"]  = ts["revenue"].rolling("30D", min_periods=7).mean()
ts["ema_7d"]  = ts["revenue"].ewm(span=7, adjust=False).mean()
w = 20
ts["bb_upper"] = ts["revenue"].rolling(w).mean() + 2*ts["revenue"].rolling(w).std()
ts["bb_lower"] = ts["revenue"].rolling(w).mean() - 2*ts["revenue"].rolling(w).std()</code></pre>
<h3>Categoricals — 100x Memory Savings</h3>
<pre><code># string col with 10 unique values in 10M rows → 800MB
df["status"] = df["status"].astype("category")  # → ~8MB
df["tier"] = pd.Categorical(df["tier"],
    categories=["free","pro","enterprise"], ordered=True)
df[df["tier"] >= "pro"]  # comparison works because ordered=True</code></pre>`,
      },
    ],
  },
  {
    id: "sklearn",
    title: "Module 2 \u2014 Scikit-learn Pipelines",
    lessons: [
      {
        id: "ml-pipeline",
        title: "End-to-End ML Pipeline",
        duration: "30 min",
        description: "Build a production ML pipeline with preprocessing, cross-validation, and hyperparameter tuning.",
        content: `<h2>End-to-End Scikit-learn Pipeline</h2>
<p>A Pipeline wraps preprocessing and modeling into a single object — preventing data leakage and making deployment simple.</p>
<pre><code>from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import StratifiedKFold, cross_val_score
import joblib

preprocessor = ColumnTransformer([
    ("num", StandardScaler(), ["age","income","account_age"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["country","plan"]),
])

pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("clf", GradientBoostingClassifier(n_estimators=300, max_depth=5, learning_rate=0.05)),
])

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(pipeline, X, y, cv=cv, scoring="roc_auc", n_jobs=-1)
print(f"CV ROC-AUC: {scores.mean():.4f} ± {scores.std():.4f}")

pipeline.fit(X, y)
joblib.dump(pipeline, "models/churn_v1.pkl")</code></pre>`,
      },
    ],
  },
]

export default function CoursePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Python & Data Science"
        description="NumPy vectorization, advanced Pandas, Matplotlib, and end-to-end Scikit-learn ML pipelines."
        category="AI & Data"
        accentColor="oklch(0.82 0.17 90)"
        modules={modules}
      />
    </div>
  )
}
