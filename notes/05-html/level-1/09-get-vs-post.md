---
id: get-vs-post
title: "GET vs POST"
sidebar_label: "GET vs POST"
sidebar_position: 9
description: "GET vs POST — HTML interview notes."
---
| GET | POST |
|---|---|
| Used to retrieve data. | Used to send/create data. |
| Data is in the URL (query string). | Data is in the request body. |
| Visible in URL, history, and server logs — never send passwords. | Not shown in the URL (still needs HTTPS to be secure). |
| Can be cached and bookmarked. | Usually not cached. |
| Idempotent (repeating it changes nothing). | Not idempotent (repeating may create duplicates). |
| Example: Search query. | Example: Login form. |

```text
GET  /search?q=shoes           ← data in URL
     (no body)

POST /login
     Content-Type: application/json
     { "email": "...", "password": "..." }   ← data in body
```

---
