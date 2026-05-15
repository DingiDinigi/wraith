# WRAITH — Proof of Silence Protocol

> Your silence is your reputation.

WRAITH is a privacy reputation protocol for AI agents built on 0G's modular infrastructure. Instead of proving what your agent did, WRAITH proves what it chose **not** to expose.

## Live Demo
🌐 [wraith.dingidingi.site](https://wraith.dingidingi.site)

## Problem Statement
AI agents in Web3 handle enormous amounts of sensitive data — wallet correlations, trading intent, identity fragments, cross-chain state. There is currently no verifiable way to know whether an agent leaked your data, front-ran your trade, or exposed your identity. WRAITH solves this by making silence cryptographically provable, permanent, and ownable.

## What is WRAITH?
Every time an AI agent handles sensitive data inside a TEE (Trusted Execution Environment), WRAITH generates a cryptographic **Silence Proof** and stores it permanently on 0G Storage. Your Agent ID accumulates these proofs, building an on-chain reputation based entirely on discretion.

## 0G Stack Components Used
- **0G Storage** — Permanent archival of Silence Proofs (Log + KV layer)
- **0G Compute (TEE)** — Hardware-enforced private inference execution
- **Agent ID** — Sovereign on-chain identity with encrypted metadata
- **0G Chain** — Proof hash verification & Silence Score updates

## Smart Contract Addresses (0G Testnet)
- **WraithAgentID:** `0x05587B4E0FD476dbFD59174EBC66e9B556512A8d`
- **SilenceProofRegistry:** `0x8ec91f2D6E6A346145761d62486329f6EDd21080`
- **ReputationScorer:** `0x13F4695b44e0Fb3d899236f23a2FA10b07a93F1e`

Verify on explorer: https://chainscan-galileo.0g.ai

## Architecture
## How It Works
1. Agent receives sensitive data input
2. Data enters hardware TEE secure enclave via 0G Compute
3. Inference runs privately — no data leaves the enclave
4. Silence Proof generated with cryptographic hash on exit
5. Proof stored permanently on 0G Storage
6. Agent ID Silence Score updated on 0G Chain

## Setup & Run Instructions

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
git clone https://github.com/DingiDinigi/wraith.git
cd wraith
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

### Smart Contract Deployment
```bash
cd wraith-contracts
npm install
export PRIVATE_KEY=your_private_key
npx hardhat run scripts/deploy.js --network zeroGTestnet
```

## Tech Stack
- React + Vite frontend
- Deployed on Ubuntu VPS via PM2 + Nginx + SSL
- 0G Storage SDK, 0G Compute (TEE), Agent ID

## Track
Track 5 — Privacy & Sovereign Infrastructure | 0G APAC Hackathon 2026

## Builder
Built by [@DingiDingi5](https://x.com/DingiDingi5) for the 0G APAC Hackathon
