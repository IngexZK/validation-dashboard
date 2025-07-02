# Ingex Validator Dashboard

## Overview

The validator dashboard shows the current status of events in the attestation phase of the Ingex zk-oracle. It displays the proposer outcome, the bond subject to slashing and the attestation progress.

## Prerequisites

- Node.js (version 16 or higher)

## Installation

1. **Install dependencies:**

```bash
npm install
```

## Usage

### Starting the dashboard

To start the dashboard, use the following command:

```bash
npm start
```

### Environment Variables

The dashboard relies on the following environment variables:

- `API_KEY`: RPC endpoint to retreive data stored onchain.
- `CONTRACT_ADDRESS`: This will be initially set to the Sepolia deployment.
