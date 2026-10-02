---
id: environment-variables-and-config
title: "Environment Variables and Config"
sidebar_label: "Environment Variables and Config"
sidebar_position: 3
description: "Environment Variables and Config — Node.js interview notes."
---
- Config that changes per environment (DB URL, API keys, port) lives in **environment variables**, never in code.
- Read with `process.env.NAME`. Locally, load a `.env` file with `dotenv` or Node 20.6+'s `node --env-file=.env app.js`.
- Commit `.env.example`, **never** commit `.env`.
- Validate config at startup (fail fast if a variable is missing).

```javascript
// config.js — single place that reads process.env
require('dotenv').config();

const config = {
  port: Number(process.env.PORT) || 3000,
  dbUrl: process.env.DATABASE_URL,
};

if (!config.dbUrl) throw new Error('DATABASE_URL is required');
module.exports = config;
```

```mermaid
flowchart LR
    ENV[".env file / host env vars"] --> PE["process.env"]
    PE --> CFG["config.js: read + validate"]
    CFG --> APP["app, db, services"]
```

---
