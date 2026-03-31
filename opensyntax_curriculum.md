# OpenSyntax Academy Curriculum Architecture

## Overview
The OpenSyntax Academy curriculum follows a "Minus Zero to Hero" pipeline. It bridges individuals with zero prior programming knowledge into advanced, production-grade engineers. The learning journey is divided into a mandatory Foundational Architecture and 11 subsequent domain-specific tracks.

## Phase 1: Foundational Architecture (The "Minus Zero" Tier)
This global foundational tier must be completed before pursuing any specific track. It establishes the low-level computing concepts required to conceptualize software engineering abstractly.

### Module 1: Computing Fundamentals
- **CPU Architecture and Logic**: Instruction sets, clock cycles, registers, and ALU operations.
- **Memory Management**: RAM, ROM, cache hierarchy (L1/L2/L3), memory addresses, and the stack vs. the heap.
- **Binary and Hexadecimal**: Bitwise operations, data encoding (ASCII/UTF-8), and data representation.

### Module 2: The Internet and Networking
- **Protocols and Architecture**: TCP/IP models, HTTP/1.1 vs HTTP/2 vs HTTP/3, UDP, and packet switching.
- **DNS and Routing**: Domain resolution, routing tables, and CDN basic concepts.

### Module 3: Environment Setup and Tooling
- **Command Line Navigation**: POSIX shell commands, permissions (chmod), absolute vs. relative paths, and piping.
- **Version Control**: Git internals, trees, blobs, directed acyclic graphs (DAGs), branching, merging, and rebasing.

## Phase 2: Domain-Specific Tracks

Each of the 11 tracks is structured into three tiers:
- **Tier 1: Foundations**: Syntax, core language concepts, and standard libraries.
- **Tier 2: Intermediate**: Standard APIs, frameworks, and application construction.
- **Tier 3: Production-Grade**: Bleeding-edge system architecture, security integration, optimization, and scaling.

---

### Track 1: Full-Stack Web Development (Next.js 16)

#### Tier 1: Foundations
- **HTML5/CSS3**: Semantic architecture, flexbox, grid, and CSS variables.
- **JavaScript (ES6+)**: Event loop, closures, promises, and prototyping.

#### Tier 2: Intermediate
- **React 19**: Server components, client components, hooks, state management, and the virtual DOM.
- **Next.js 16**: File-based routing, API routes, and data fetching methods.

#### Tier 3: Production-Grade
- **Edge Architecture**: Next.js Edge caching, Vercel Edge Functions, and middleware.
- **Advanced State and Data**: Integrating localized Small Language Models (SLMs) via WebAssembly for client-side processing.
- **Security Interlocks**: SSR token validation, XSS prevention in dangerouslySetInnerHTML, and CSRF nonce implementations.

---

### Track 2: Advanced Discord Development (discord.py)

#### Tier 1: Foundations
- **Python Setup**: PyPI, virtual environments, and asynchronous loop basics.
- **Bot Instantiation**: Gateway connection, intents, and simple event listening.

#### Tier 2: Intermediate
- **Cogs and Command Trees**: Application commands (Slash commands), UI components (buttons, dropdowns), and persistent views.
- **State Management**: PostgreSQL connections locally with asyncpg.

#### Tier 3: Production-Grade
- **Scaling Architecture**: Cross-shard IPC, dynamic sharding, and distributed caching with Redis.
- **High-Performance Event Handling**: Gateway payload dropping, offloading compute to Celery workers, and threadpool executors.

---

### Track 3: AI and Machine Learning Engineering

#### Tier 1: Foundations
- **Mathematics**: Linear algebra (matrices, vectors), calculus (gradients), and probability theory.
- **Data Structures**: NumPy array processing, Pandas DataFrames, and vectorized operations.

#### Tier 2: Intermediate
- **Model Training**: Scikit-Learn for traditional ML, basic neural network architectures via PyTorch.
- **Evaluation**: Loss functions, optimizers, over/underfitting, and precision/recall metrics.

#### Tier 3: Production-Grade
- **LLM Integration**: RAG pipelines, vector databases (Pinecone, Weaviate), and semantic routing.
- **Deployment**: Local SLM inference (Ollama, vLLM), quantization (GGML/GGUF), and model endpoint security against prompt injection.

---

### Track 4: DevOps and Cloud Infrastructure

#### Tier 1: Foundations
- **Linux Internals**: Kernel architecture, runlevels, systemd, and bash scripting.
- **Virtualization**: Hypervisors, containers vs. VMs, and namespace isolation.

#### Tier 2: Intermediate
- **Containerization**: Dockerfile optimization, multi-stage builds, and Docker Compose networks.
- **CI/CD**: GitHub Actions, GitLab CI, artifact repositories, and deployment pipelines.

#### Tier 3: Production-Grade
- **Kubernetes (K8s) Scaling**: Pod Disruption Budgets (PDBs), Horizontal Pod Autoscaling (HPA), and Helm chart parameterization.
- **Infrastructure as Code**: Terraform state locking, Ansible playbooks, and GitOps using ArgoCD.

---

### Track 5: PostgreSQL Database Architecture

#### Tier 1: Foundations
- **Relational Algebra**: Schemas, normalized forms (1NF, 2NF, 3NF), and primary/foreign keys.
- **Querying**: SELECT, JOIN types, WHERE clauses, GROUP BY, and basic aggregations.

#### Tier 2: Intermediate
- **Data Integrity**: Transactions, ACID properties, isolation levels, and check constraints.
- **Advanced Functions**: Window functions, CTEs (Common Table Expressions), and triggers.

#### Tier 3: Production-Grade
- **High Availability**: Streaming replication, logical replication, and failover mechanisms.
- **Optimization**: B-tree internals, partial indices, explain analyze profiling, connection pooling (PgBouncer), and SQL injection mitigation at the database driver level.

---

### Track 6: TypeScript

#### Tier 1: Foundations
- **Type Primitives**: Strings, numbers, booleans, arrays, tuples, and enums.
- **Structural Typing**: Interfaces, type aliases, and object shapes.

#### Tier 2: Intermediate
- **Generics**: Generic constraints, default generic types, and utility types (Partial, Pick, Omit).
- **Type Guards**: Custom type predicates, assertion functions, and control flow analysis.

#### Tier 3: Production-Grade
- **Advanced Typing**: Conditional types, mapped types with key remapping, and infer keyword extraction.
- **Compiler Architecture**: Strict mode configuration, AST manipulation, and declaration merging strategies for large monorepos.

---

### Track 7: React Patterns

#### Tier 1: Foundations
- **Component Lifecycle**: Render phase vs commit phase optimization.
- **Hooks Architecture**: rules of hooks, dependency arrays, and custom hook structuring.

#### Tier 2: Intermediate
- **Design Patterns**: Higher-Order Components (HOCs), render props, and compound components.
- **Context API**: Prop drilling mitigation, context slicing, and provider performance.

#### Tier 3: Production-Grade
- **Performance Optimization**: Deep equality checks, memoization (useMemo/React.memo) cost analysis, and concurrent rendering strategies.
- **State Architectures**: Zustand slicing, Redux Toolkit query micro-caching, and AI-assisted state generation patterns.

---

### Track 8: Cybersecurity

#### Tier 1: Foundations
- **Networking Defenses**: Ports, firewalls, and proxy chains.
- **Cryptography**: Symmetric vs asymmetric encryption, hashing algorithms (SHA-256), and salting.

#### Tier 2: Intermediate
- **Vulnerability Analysis**: OWASP Top 10, scanning tools (Nmap, Wireshark), and payload analysis.
- **Web Exploits**: Input validation flaws, IDOR, and session hijacking.

#### Tier 3: Production-Grade
- **Zero-Trust Networks**: mTLS (mutual TLS), identity-aware proxies, and ephemeral credentials.
- **Incident Response**: Kernel-level rootkit detection, automated SIEM analysis via LLMs, and secure container runtimes (gVisor).

---

### Track 9: Web3 and Blockchain

#### Tier 1: Foundations
- **Distributed Ledgers**: Consensus mechanisms (PoW vs PoS), blocks, hashes, and nonces.
- **Cryptography**: Public key infrastructure (PKI) and elliptic curve digital signatures (ECDSA).

#### Tier 2: Intermediate
- **Smart Contracts**: Solidity syntax, EVM memory layout (storage vs memory), and common token standards (ERC-20, ERC-721).
- **dApp Integration**: Ethers.js/Viem connection layers and wallet adapters.

#### Tier 3: Production-Grade
- **Scalability**: Zero-Knowledge (ZK) Rollups, optimistic rollups, and Layer 2 interconnectivity.
- **Smart Contract Security**: Reentrancy guards, MEV (Maximal Extractable Value) protection, and flash loan attack vectors.

---

### Track 10: Mobile Application Engineering (Expo & React Native)

#### Tier 1: Foundations
- **React Native Basics**: View, Text, StyleSheet, and cross-platform native component mapping.
- **Navigation**: React Navigation stacks, tabs, and drawer configurations.

#### Tier 2: Intermediate
- **Expo Tooling**: EAS Build pipelines, over-the-air (OTA) updates, and native module installation.
- **Device APIs**: Camera, location services, asynchronous storage, and biometric authentication.

#### Tier 3: Production-Grade
- **High Performance UI**: Reanimated 3 for 60fps gesture handling, list optimization (FlashList), and native memory leak profiling.
- **Secure Mobile Architecture**: Keychain encryption, certificate pinning, API key obfuscation, and bridging isolated on-device SLMs.

---

### Track 11: Python and Data Science

#### Tier 1: Foundations
- **Python Core**: Generators, iterators, list comprehensions, and magic methods.
- **Data Handling**: File I/O, CSV parsing, and simple JSON serialization.

#### Tier 2: Intermediate
- **Data Engineering**: Data scraping (BeautifulSoup, Selenium), data cleaning workflows, and API consumption.
- **Visualization**: Matplotlib, Seaborn, and interactive dashboards.

#### Tier 3: Production-Grade
- **Big Data Processing**: Dask/PySpark distributed dataframes, Parquet file optimization, and memory mapping.
- **Production Analytics**: Streaming data analysis, real-time dashboards integrated with LLM agents for predictive alerting.
