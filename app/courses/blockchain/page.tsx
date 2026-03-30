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
    id: "solidity-fundamentals", title: "Module 1 — EVM & Solidity",
    lessons: [
      {
        id: "smart-contracts", title: "EVM & Smart Contract basics", duration: "25 min",
        description: "Deploy verifiable, immutable logic directly to the Ethereum Virtual Machine.",
        content: `<h2>Smart Contract Architecture</h2>
<p>Unlike traditional servers, a Smart Contract is deployed to the blockchain permanently. Its code cannot be modified once minted. Its state is globally accessible and its entire transaction history is public.</p>
<pre><code class="language-solidity">// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Vault {
    // State variables are stored permanently on the blockchain
    mapping(address =&gt; uint256) public balances;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // Payable allows this function to receive native ETH
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] &gt;= amount, "Insufficient funds");
        balances[msg.sender] -= amount;

        // transferring ETH
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed.");
    }
}
</code></pre>
<p>Because there is no "devops" to patch a vulnerability later, smart contract code goes through intense financial auditing before mainnet deployment.</p>
<h3>EVM State Machine</h3>
<p>The Ethereum Virtual Machine is a massive, distributed state machine. Nodes across the globe reach consensus on the exact state of your contract's memory slot 0 within 12 seconds. Every transaction acts as a state transition function against the global singleton.</p>`
      },
      {
        id: "gas-optimization", title: "Gas Constraints", duration: "20 min",
        description: "Optimizing state reads and minimizing EVM OP-CODES to save transaction fees.",
        content: `<h2>Ethereum Gas Costs</h2>
<p>Every computation <code>OPCODE</code> execution on the EVM costs a small amount of "Gas". Modifying permanent state variables (<code>SSTORE</code>) is extraordinarily expensive.</p>
<h3>Memory vs Storage vs Calldata</h3>
<p>Minimize accessing <code>storage</code>. If you loop through an array 10 times, reading a storage array 10 times costs immense gas. Read it into <code>memory</code> once, operate, and save the result back to <code>storage</code> once!</p>
<h3>Packing Variables</h3>
<p>Ethereum storage slots are 256 bits (32 bytes). If you have two <code>uint128</code> variables next to each other in structural order, the Solidity compiler can pack them into a single 32-byte storage slot, turning two expensive <code>SSTORE</code> calls into one.</p>`
      },
    ],
  },
  {
    id: "defi-security", title: "Module 2 — DeFi & Security",
    lessons: [
      {
        id: "reentrancy", title: "Reentrancy Attacks", duration: "35 min",
        description: "Preventing the attack vector that drained The DAO of 3.6 Million ETH.",
        content: `<h2>The Reentrancy Exploit</h2>
<p>When you send Ethereum to an external contract (e.g. <code>msg.sender.call{value: amount}("")</code>), the EVM halts your function's execution, yields control to the external contract, and waits for its <code>receive()</code> fallback to naturally finish.</p>
<p>If that external contract is malicious, its <code>receive()</code> function can simply call your <code>withdraw()</code> function <strong>AGAIN</strong> before your contract has updated its internal ledgers.</p>
<pre><code class="language-solidity">function attack() external payable {
    vault.deposit{value: 1 ether}();
    vault.withdraw();
}

// The malicious fallback recursively drains the vault
receive() external payable {
    if (address(vault).balance &gt;= 1 ether) {
        vault.withdraw();
    }
}
</code></pre>
<h3>The CEI Pattern</h3>
<p>To fix this, utilize the Checks-Effects-Interactions (CEI) pattern: verify funds (Check), modify state directly (Effect), and <strong>only then</strong> send external funds (Interaction).</p>`
      },
      {
        id: "openzeppelin", title: "OpenZeppelin Inheritance", duration: "20 min",
        description: "Implement audited, standard features like ERC-20 entirely safely via modular imports.",
        content: `<h2>Audited Standards & Inheritance</h2>
<p>Don't roll your own crypto features! Utilize established inheritance models from OpenZeppelin to instantly adopt heavily audited, industry-standard math and architecture logic.</p>
<pre><code class="language-solidity">import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SyntaxCoin is ERC20, Ownable {
    constructor(address initialOwner) 
        ERC20("SyntaxCoin", "SYNX") 
        Ownable(initialOwner) 
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
</code></pre>`
      },
      {
        id: "hardhat", title: "Hardhat TDD", duration: "30 min",
        description: "Simulating local EVMs to test contract state using Ethers.js and Chai.",
        content: `<h2>Hardhat Local Deployment</h2>
<p>Smart contracts are tested utilizing a mocked local JSON-RPC blockchain environment via Hardhat. This simulates blocks mining instantly and offers free local Ether to 20 local Ethereum addresses.</p>
<pre><code class="language-javascript">const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SyntaxCoin", function () {
  it("Should assign the total supply to the owner", async function () {
    const [owner] = await ethers.getSigners();
    
    // Deploy contract locally
    const SyntaxCoin = await ethers.getContractFactory("SyntaxCoin");
    const token = await SyntaxCoin.deploy(owner.address);

    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });
});
</code></pre>
<p>Every edge case must be mocked and mathematically validated up to the 18 decimals characteristic of ERC-20 tokens.</p>`
      },
    ],
  },
  {
    id: "l2-scaling", title: "Module 3 — Layer 2 Scaling",
    lessons: [
      {
        id: "zk-rollups", title: "Zero-Knowledge Rollups", duration: "45 min",
        description: "How mathematics compress massive transaction throughput down to a singular hash.",
        content: `<h2>The Blockchain Trilemma</h2>
<p>Blockchains struggle to achieve Security, Decentralization, and Scalability simultaneously. Layer 2 Rollups solve this by moving execution off-chain, while inheriting the robust Security of the Layer 1 Ethereum mainnet.</p>
<h3>ZK-SNARKs and Validity Proofs</h3>
<p>Zero-Knowledge Rollups execute thousands of transactions off-chain, compute the resulting state tree, and submit a cryptographic "Validity Proof" (a ZK-SNARK or STARK) back to the L1 contract. The math guarantees the computation was legitimate without the mainnet needing to re-run the thousands of transactions, dropping gas fees to pennies.</p>`
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
        description="Build production-grade smart contracts on EVM chains. Solidity security patterns, reentrancy guards, gas optimization, DeFi protocol design, OpenZeppelin modules, L2 Rollups, and Hardhat testing suites."
        category="Blockchain"
        accentColor="#F6851B"
        modules={blockchainModules}
        instructor="Patrick Collins"
        rating={4.9}
        reviewCount={310}
        lastUpdated="Feb 2026"
      />
    </div>
  )
}
