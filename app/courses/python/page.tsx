import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

export const metadata: Metadata = {
  title: "Python & Data Science — NumPy, Pandas & Scikit-learn",
  description: "Build a complete data science toolkit. From Python core syntax to NumPy vectorization, Pandas data manipulation, and production ML pipelines.",
  keywords: ["Python Course", "Data Science Tutorial", "NumPy", "Pandas", "Scikit-learn", "Machine Learning Python"],
}

const pythonModules: Module[] = [
  {
    id: "python-tier-1", title: "Tier 1: Foundations — Python Core & Environment",
    lessons: [
      {
        id: "syntax-venv", title: "Syntax, Data Structures & Venv", duration: "35 min",
        description: "Mastering the Pythonic way. Lists, Dictionaries, List Comprehensions, and managing dependencies with Virtual Environments.",
        content: `<h2>The Pythonic Path</h2>
<p>Python's strength is its readability. We focus on <strong>List Comprehensions</strong> and <strong>Generators</strong> to write concise, memory-efficient code.</p>
<h3>Dependency Isolation</h3>
<p>Never install packages globally. We use <code>venv</code> or <code>conda</code> to create isolated environments, ensuring that project dependencies don't conflict across your system.</p>`
      }
    ]
  },
  {
    id: "python-tier-2", title: "Tier 2: Intermediate — Data Manipulation (NumPy/Pandas)",
    lessons: [
      {
        id: "numpy-pandas", title: "Vectorization with NumPy & Pandas DataFrames", duration: "50 min",
        description: "Ditch Python loops. Using NumPy broadcasting and Pandas grouping for high-performance data analysis.",
        content: `<h2>Vectorized Computation</h2>
<p>Python loops are slow. <strong>NumPy</strong> allows us to perform operations on entire arrays at C-speed using vectorization and broadcasting.</p>
<h3>Pandas: The Data Engine</h3>
<p>We use <strong>Pandas</strong> to clean, transform, and analyze tabular data. Mastering <code>groupby</code>, <code>merge</code>, and <code>pivot_table</code> allows you to extract insights from millions of rows in seconds.</p>`
      }
    ]
  },
  {
    id: "python-tier-3", title: "Tier 3: Production — Machine Learning & Big Data",
    lessons: [
      {
        id: "sklearn-dask", title: "Scikit-learn Pipelines & Dask Scaling", duration: "65 min",
        description: "Building production ML models. Pipeline engineering with Scikit-learn and scaling to big data with Dask.",
        content: `<h2>Production ML Pipelines</h2>
<p>To avoid data leakage, we wrap our preprocessing and model training into <strong>Scikit-learn Pipelines</strong>. This ensures that scaling and imputation are always consistent between training and inference.</p>
<h3>Scaling with Dask</h3>
<p>When data exceeds your RAM, we use <strong>Dask</strong>. It parallelizes NumPy and Pandas operations across all CPU cores or even multiple machines, allowing you to process Terabytes of data.</p>
<p><strong>Pro Tip:</strong> Integrate <strong>Local SLM Agents</strong> (Small Language Models) into your data pipelines for semantic classification and anomaly detection without relying on external cloud APIs.</p>`
      }
    ]
  }
]

export default function PythonCoursePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Python & Data Science"
        description="Master the data ecosystem. From Python core syntax and vectorized NumPy arrays to high-performance Pandas analysis and production ML pipelines."
        category="AI & Data"
        accentColor="#FFD43B"
        modules={pythonModules}
        instructor="Wes McKinney"
        rating={4.9}
        reviewCount={8100}
        lastUpdated="Mar 2026"
      />
    </div>
  )
}
