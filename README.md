# WRAITH — Proof of Silence Protocol

> Your silence is your reputation.

WRAITH is a privacy reputation system for AI agents built on 0G's modular infrastructure. Instead of proving what your agent did, WRAITH proves what it chose **not** to expose.

## Live Demo
🌐 [wraith.dingidingi.site](https://wraith.dingidingi.site)

## What is WRAITH?
Every time an AI agent handles sensitive data — wallet correlations, trading intent, identity fragments — inside a Trusted Execution Environment (TEE), WRAITH generates a cryptographic **Silence Proof** and stores it permanently on 0G Storage. Your Agent ID accumulates these proofs, building an on-chain reputation based entirely on discretion.

## 0G Components Used
- **0G Storage** — Permanent archival of Silence Proofs (Log + KV layer)
- **0G Compute (TEE)** — Hardware-enforced private inference execution
- **Agent ID** — Sovereign on-chain identity with encrypted metadata
- **0G Chain** — Proof hash verification and Silence Score updates

## Track
Track 5 — Privacy & Sovereign Infrastructure | 0G APAC Hackathon 2026

## Architecture
## Smart Contracts (0G Chain)
- `WraithAgentID.sol` — ERC-721 Agent ID token with Silence Score
- `SilenceProofRegistry.sol` — Immutable proof hash registry
- `ReputationScorer.sol` — On-chain score calculation

## Tech Stack
- React + Vite frontend
- Deployed on Ubuntu VPS via PM2 + Nginx + SSL
- 0G Storage SDK, 0G Compute, Agent ID

## Builder
Built by [@kane_120](https://x.com/kane_120) for the 0G APAC Hackathon
