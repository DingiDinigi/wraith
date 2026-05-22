# WRAITH Integration Guide

> Give your AI agent a verifiable privacy reputation in minutes.

## Overview

WRAITH allows any AI agent to generate cryptographic **Silence Proofs** on-chain every time it handles sensitive data privately. Your agent builds a **Silence Score** on 0G Chain automatically.

## Prerequisites

- Node.js 18+
- ethers.js v6
- A wallet with OG tokens on 0G Mainnet
- An Agent ID (mint at wraith.dingidingi.site)

## Contract Addresses (0G Mainnet)

| Contract | Address |
|---|---|
| WraithAgentID | `0x05587B4E0FD476dbFD59174EBC66e9B556512A8d` |
| SilenceProofRegistry | `0xA76EFDCF062BE24483758Cf7AbE6DB1DfA8D699F` |
| ReputationScorer | `0xFd705cde07777913Baed4bEAcB606A38c18acda1` |

## Step 1 — Install dependencies

```bash
npm install ethers
```

## Step 2 — Setup the provider

```javascript
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://0g-mainnet.drpc.org");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
```

## Step 3 — Mint your Agent ID (one time)

```javascript
const agentIDABI = ["function mint() external returns (uint256)"];
const agentID = new ethers.Contract(
  "0x05587B4E0FD476dbFD59174EBC66e9B556512A8d",
  agentIDABI,
  wallet
);

const tx = await agentID.mint();
await tx.wait();
console.log("Agent ID minted!");
```

## Step 4 — Seal a Silence Proof

Call this every time your agent handles sensitive data privately:

```javascript
const registryABI = ["function sealProof(bytes32 hash) external"];
const registry = new ethers.Contract(
  "0xA76EFDCF062BE24483758Cf7AbE6DB1DfA8D699F",
  registryABI,
  wallet
);

// Generate a unique hash for this silence event
const eventData = `wallet_correlation_${Date.now()}_${agentAddress}`;
const hash = ethers.keccak256(ethers.toUtf8Bytes(eventData));

const tx = await registry.sealProof(hash);
await tx.wait();
console.log("Silence Proof sealed:", hash);
```

## Step 5 — Full agent example

```javascript
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://0g-mainnet.drpc.org");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const registryABI = ["function sealProof(bytes32 hash) external"];
const registry = new ethers.Contract(
  "0xA76EFDCF062BE24483758Cf7AbE6DB1DfA8D699F",
  registryABI,
  wallet
);

async function handleSensitiveData(data) {
  // 1. Process the sensitive data privately
  const result = await processPrivately(data);

  // 2. Seal a Silence Proof on WRAITH
  const hash = ethers.keccak256(
    ethers.toUtf8Bytes(`silence_${Date.now()}_${wallet.address}`)
  );
  const tx = await registry.sealProof(hash);
  await tx.wait();

  console.log("Data handled privately. Silence Proof sealed.");
  return result;
}
```

## Event Types

Use descriptive event strings to categorize your agent's silence events:

| Event | String |
|---|---|
| Wallet analysis | `wallet_analysis_${timestamp}` |
| Trading signal | `trade_signal_${timestamp}` |
| Identity check | `identity_check_${timestamp}` |
| Cross-chain query | `crosschain_query_${timestamp}` |

## Verify on Explorer

Check your agent's on-chain activity at:
`https://chainscan.0g.ai/address/YOUR_AGENT_ADDRESS`

## Support

- Dashboard: wraith.dingidingi.site
- X: @Wraith__DA
- GitHub Issues: github.com/DingiDinigi/wraith/issues
