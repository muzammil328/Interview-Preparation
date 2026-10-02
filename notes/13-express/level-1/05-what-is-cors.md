---
id: what-is-cors
title: "What is CORS?"
sidebar_label: "What is CORS?"
sidebar_position: 5
description: "What is CORS? — Express.js interview notes."
---
**Cross-Origin Resource Sharing** — a **browser** security rule. A page on `https://app.com` can't read responses from `https://api.com` unless the API says it's allowed via response headers.

- Origin = protocol + domain + port
- It is enforced by the browser only — Postman/curl ignore it
- For non-simple requests (e.g. `PUT`, JSON body, custom headers) the browser first sends a **preflight** `OPTIONS` request

```javascript
const cors = require('cors');
app.use(cors({ origin: 'https://app.com', credentials: true }));
```

```mermaid
sequenceDiagram
    participant B as Browser (app.com)
    participant A as API (api.com)
    B->>A: OPTIONS /users (preflight)
    A-->>B: Access-Control-Allow-Origin: https://app.com
    B->>A: PUT /users (real request)
    A-->>B: 200 + CORS headers
    Note over B: Browser lets the page read the response
```

---
