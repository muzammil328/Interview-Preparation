---
id: environment-variables-and-next-public
title: "Environment Variables and NEXT_PUBLIC_"
sidebar_label: "Environment Variables and NEXT_PUBLIC_"
sidebar_position: 4
description: "Environment Variables and NEXT_PUBLIC_ — Next.js interview notes."
---
* Variables in `.env.local` are available **on the server only** (`process.env.DB_URL`).
* Prefix with `NEXT_PUBLIC_` to expose a variable to the browser. It is **inlined into the JS bundle at build time**.
* Never put a secret behind `NEXT_PUBLIC_` — anyone can read it in DevTools.

```text
.env.local
 ├── DATABASE_URL=...          ──► server only   ✓ safe for secrets
 └── NEXT_PUBLIC_API_URL=...   ──► server + browser bundle   ✗ never a secret
```

---
