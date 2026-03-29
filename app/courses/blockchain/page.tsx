import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const modules: Module[] = [
  {
    id: "security",
    title: "Module 1 \u2014 Smart Contract Security",
    lessons: [
      {
        id: "reentrancy",
        title: "Reentrancy Attacks & Guards",
        duration: "30 min",
        description: "The DAO hack explained, reentrancy attack vectors, and the checks-effects-interactions pattern.",
        content: `<h2>Reentrancy Attacks in Solidity</h2>
<p>The 2016 DAO hack exploited reentrancy to drain $60M. It occurs when an external call is made before state is updated.</p>
<h3>Vulnerable Contract</h3>
<pre><code>// VULNERABLE — state updated AFTER external call
contract VulnerableBank {
    mapping(address =&gt; uint256) public balances;

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] &gt;= amount);
        (bool ok,) = msg.sender.call{value: amount}("");  // ← re-entry point!
        require(ok);
        balances[msg.sender] -= amount;  // too late — already re-entered
    }
}</code></pre>
<h3>Attack Contract</h3>
<pre><code>contract Attacker {
    VulnerableBank public target;
    function attack() external payable {
        target.deposit{value: 1 ether}();
        target.withdraw(1 ether);
    }
    receive() external payable {
        if (address(target).balance >= 1 ether) target.withdraw(1 ether);
    }
}</code></pre>
<h3>Fix — Checks-Effects-Interactions + ReentrancyGuard</h3>
<pre><code>import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SecureBank is ReentrancyGuard {
    mapping(address =&gt; uint256) public balances;

    function withdraw(uint256 amount) external nonReentrant {
        // 1. CHECKS
        require(balances[msg.sender] &gt;= amount, "Insufficient");
        // 2. EFFECTS — update state FIRST
        balances[msg.sender] -= amount;
        // 3. INTERACTIONS — external call last
        (bool ok,) = msg.sender.call{value: amount}("");
        require(ok, "Transfer failed");
    }
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
        title="Blockchain & Web3 Engineering"
        description="Solidity security patterns, reentrancy guards, gas optimization, DeFi protocols, and Hardhat testing."
        category="Blockchain"
        accentColor="oklch(0.72 0.16 68)"
        modules={modules}
      />
    </div>
  )
}
