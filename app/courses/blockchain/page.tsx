import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

export const metadata: Metadata = {
  title: "Blockchain & Web3 Engineering Course — Learn Solidity",
  description: "Build production-grade smart contracts on EVM chains. Solidity security patterns, DeFi protocol design, OpenZeppelin modules, ZK-Rollups, and MEV.",
  keywords: ["Blockchain Course", "Learn Solidity Free", "EVM Smart Contract Course", "DeFi Security Tutorials", "Web3 Engineering", "Ethereum Development"],
}

const blockchainModules: Module[] = [
  {
    id: "blockchain-tier-1", title: "Tier 1: Foundations — Cryptography & EVM",
    lessons: [
      {
        id: "bit-math-evm", title: "Hashing, Signatures & EVM Internals", duration: "35 min",
        description: "The mathematical trust layer. SHA-256, Elliptic Curve Digital Signatures (ECDSA), and the global state machine.",
        content: `<h2>The Trustless Architecture</h2>
<p>Blockchains replace human trust with mathematics. We use <strong>Hashing</strong> to create immutable links between blocks and <strong>Public-Key Cryptography</strong> to verify transaction ownership without middle-men.</p>
<h3>The Ethereum Virtual Machine (EVM)</h3>
<p>The EVM is a distributed state machine. Every node in the network executes the same smart contract code and reaches consensus on the final memory state, creating a 'World Computer'.</p>`
      }
    ]
  },
  {
    id: "blockchain-tier-2", title: "Tier 2: Intermediate — Smart Contract Engineering",
    lessons: [
      {
        id: "solidity-defi", title: "Solidity Patterns & DeFi Architecture", duration: "50 min",
        description: "Building verifiable logic. Interfaces, inheritance, and the Checks-Effects-Interactions (CEI) security pattern.",
        content: `<h2>Solidity: The Language of Value</h2>
<p>Solidity is a statically-typed language designed for the EVM. Because code is immutable once deployed, we follow strict patterns to ensure security.</p>
<pre><code class="language-solidity">function deposit() public payable {
    balances[msg.sender] += msg.value;
}</code></pre>
<h3>DeFi Protocol Design</h3>
<p>We build <strong>Decentralized Finance (DeFi)</strong> primitives like AMMs and Lending Pools using <strong>ERC-20</strong> and <strong>ERC-721</strong> standards. In Tier 2, we use <strong>Hardhat</strong> to test contracts against a local blockchain fork.</p>`
      }
    ]
  },
  {
    id: "blockchain-tier-3", title: "Tier 3: Production — L2 Scaling & Advanced Security",
    lessons: [
      {
        id: "rollups-zk", title: "ZK-Rollups, MEV & Smart Contract Auditing", duration: "65 min",
        description: "Scaling to the next billion users. Zero-Knowledge proofs, Layer 2 architectures, and protecting against reentrancy attacks.",
        content: `<h2>The Scalability Frontier</h2>
<p>Ethereum Mainnet is too slow for global commerce. We move execution to <strong>Layer 2 Rollups</strong>. <strong>ZK-Rollups</strong> use complex math (Validity Proofs) to compress thousands of transactions into a single on-chain proof.</p>
<h3>Advanced Security & Auditing</h3>
<p>To protect millions in TVL (Total Value Locked), we must defend against <strong>Reentrancy Hacks</strong> and <strong>Flash Loan Attacks</strong>. We'll perform a manual audit of a DeFi protocol to find common logic flaws.</p>
<p><strong>Econ Tip:</strong> Understand <strong>MEV (Maximal Extractable Value)</strong> to build contracts that are resilient against sandwich attacks and front-running by sophisticated network bots.</p>`
      }
    ]
  }
]

export default function BlockchainPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Blockchain & Web3 Engineering"
        description="Master the decentralized web. From cryptographic fundamentals and Solidity patterns to L2 scaling and advanced smart contract security auditing."
        category="Blockchain"
        accentColor="#F6851B"
        modules={blockchainModules}
        instructor="Patrick Collins"
        rating={4.9}
        reviewCount={310}
        lastUpdated="Mar 2026"
      />
    </div>
  )
}
