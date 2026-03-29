import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const pythonModules: Module[] = [
  {
    id: "python-vectors", title: "Module 1 — High-Performance Python",
    lessons: [
      {
        id: "numpy-broadcasting", title: "Vectorization & Broadcasting", duration: "25 min",
        description: "Ditch Python `for` loops. Learn how NumPy executes C-level loops over arrays.",
        content: `<h2>NumPy Vectorization</h2>
<p>Python's dynamic typing makes native <code>for</code> loops inherently slow. By utilizing <strong>NumPy</strong>, we offload operations to highly optimized C-code.</p>
<h3>Broadcasting Rules</h3>
<p>Broadcasting allows NumPy to perform operations on arrays of different shapes without copying data.</p>
<pre><code class="language-python">import numpy as np

# Multiply a 3x3 matrix by a 1D array
matrix = np.ones((3, 3))
vector = np.array([1, 2, 3])

result = matrix * vector
print(result)
# [[1. 2. 3.]
#  [1. 2. 3.]
#  [1. 2. 3.]]
</code></pre>
<p>Instead of mapping over rows, NumPy conceptually "stretches" the vector across the matrix instantly. This is the cornerstone of processing data without hardware-bound delays.</p>`,
        quiz: [
          {
            question: "What is the key performance advantage of NumPy vectorization over native Python for loops?",
            options: [
              "It uses multiple CPU cores automatically",
              "It compiles Python to machine code at runtime",
              "It offloads operations to optimized C code with contiguous memory",
              "It caches results in Redis"
            ],
            correctIndex: 2,
            explanation: "NumPy arrays are stored in contiguous C memory blocks, so element-wise operations are executed by pre-compiled C routines — orders of magnitude faster than Python's interpreted loops."
          },
          {
            question: "In broadcasting, what happens when a (3, 3) matrix is multiplied against a (3,) vector?",
            options: [
              "A ValueError is raised — shapes must match exactly",
              "The vector is conceptually stretched to (3, 3) and the operation is applied row-wise",
              "Only the first row of the matrix is multiplied",
              "The shapes are flattened to 1D first"
            ],
            correctIndex: 1,
            explanation: "Broadcasting 'virtually' stretches compatible shapes without copying data in memory, applying the operation row-wise across the matrix."
          }
        ]
      },
      {
        id: "pandas-multiindex", title: "MultiIndex & Advanced Grouping", duration: "30 min",
        description: "Handle high-dimensional data in Pandas using hierarchical indexing and grouped transformations.",
        content: `<h2>Pandas MultiIndex (Hierarchical Indexing)</h2>
<p>A MultiIndex allows you to work with higher dimensional data in a lower dimensional 2D DataFrame by structuring indices hierarchically.</p>
<pre><code class="language-python">import pandas as pd

# Creating a MultiIndex from tuples
index = pd.MultiIndex.from_tuples([
    ('2023', 'Q1'), ('2023', 'Q2'),
    ('2024', 'Q1'), ('2024', 'Q2')
], names=['Year', 'Quarter'])

df = pd.DataFrame({'Revenue': [100, 150, 200, 250]}, index=index)

# Querying hierarchical data
# Get all Q1 revenue across all years using xs (cross-section)
q1_revenue = df.xs('Q1', level='Quarter')
</code></pre>
<h3>Transformation vs Aggregation</h3>
<p>While <code>groupby(...).mean()</code> reduces data, <code>groupby(...).transform('mean')</code> returns an object shaped exactly like the input, allowing you to easily mean-center your features:</p>
<pre><code class="language-python">df['Centered'] = df.groupby('Year')['Revenue'].transform(lambda x: x - x.mean())</code></pre>`
      },
      {
        id: "pandas-memory", title: "Memory Optimization", duration: "20 min",
        description: "Process massive CSVs on a local machine by downcasting numeric types and using Categoricals.",
        content: `<h2>Optimizing Pandas Memory Usage</h2>
<p>When loading large datasets, strings (Objects) consume massive amounts of memory. By converting repetitive strings to Categorical data types, we replace the string array with a dictionary mapping integers to strings.</p>
<pre><code class="language-python"># Check current memory usage
print(df.memory_usage(deep=True))

# Convert object to categorical
df['Department'] = df['Department'].astype('category')

# Downcast 64-bit floats to 32-bit if precision allows
df['Income'] = pd.to_numeric(df['Income'], downcast='float')
</code></pre>
<p>This simple technique can instantly reduce DataFrame memory footprints by over 80%, keeping your process out of SWAP memory.</p>`
      },
    ],
  },
  {
    id: "scikit-pipelines", title: "Module 2 — Machine Learning",
    lessons: [
      {
        id: "sklearn-pipelines", title: "Scikit-learn Pipelines", duration: "35 min",
        description: "Prevent data leakage by chaining preprocessing and estimators seamlessly.",
        content: `<h2>End-to-End Pipelines</h2>
<p>Performing imputation, scaling, and training sequentially introduces major risks of <strong>data leakage</strong> during cross-validation. Scikit-learn Pipelines execute these steps safely.</p>
<pre><code class="language-python">from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier

# Define the pipeline steps
clf = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler()),
    ('model', RandomForestClassifier(n_estimators=100))
])

# Fit the entire pipeline
clf.fit(X_train, y_train)

# Predict
predictions = clf.predict(X_test)
</code></pre>
<p>When you call <code>fit</code>, the pipeline executes \`fit_transform\` on the imputer and scaler, but only \`fit\` on the classifier. When evaluating, it correctly applies only \`transform\` for preprocessing steps on test data.</p>`
      },
      {
        id: "columntransformer", title: "Column Transformers", duration: "25 min",
        description: "Apply different preprocessing steps to continuous and categorical variables simultaneously.",
        content: `<h2>ColumnTransformer</h2>
<p>Datasets contain mixed types. You need One-Hot Encoding for categories, and Standard Scaling for numbers. <code>ColumnTransformer</code> handles this branching naturally inside a Pipeline.</p>
<pre><code class="language-python">from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder

numeric_features = ['age', 'fare']
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

categorical_features = ['embarked', 'sex']
categorical_transformer = OneHotEncoder(handle_unknown='ignore')

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ])

# Attach to final pipeline
full_pipeline = Pipeline(steps=[('preprocessor', preprocessor),
                                ('classifier', RandomForestClassifier())])
</code></pre>`
      },
    ],
  },
]

export default function PythonCoursePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Python & Data Science"
        description="Build a complete data science toolkit. Vectorized computation with NumPy broadcasting, multi-level Pandas indexing, rolling windows, memory-efficient categoricals, and end-to-end ML pipelines."
        category="AI & Data"
        accentColor="#FFD43B"
        modules={pythonModules}
        instructor="Wes McKinney"
        rating={4.9}
        reviewCount={8100}
        lastUpdated="Jan 2026"
      />
    </div>
  )
}
