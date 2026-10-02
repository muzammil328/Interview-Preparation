---
id: security-best-practices
title: "Security Best Practices"
sidebar_label: "Security Best Practices"
sidebar_position: 5
description: "Security Best Practices — Express.js interview notes."
---
- Helmet (secure HTTP headers)
- Authentication (JWT / sessions) and authorization checks on every protected route
- Rate limiting (especially on login)
- Input validation (Joi, Zod)
- HTTPS/TLS
- Strict CORS configuration
- Sanitize inputs and escape output (prevent XSS, NoSQL/SQL injection)
- Hash passwords with bcrypt/argon2 — never store plain text
- Keep secrets in env vars; keep dependencies updated (`npm audit`)

```mermaid
flowchart LR
    REQ["Request"] --> H["helmet"]
    H --> RL["rate limit"]
    RL --> CO["CORS"]
    CO --> AU["auth"]
    AU --> V["validate input"]
    V --> HANDLER["handler"]
```

---
