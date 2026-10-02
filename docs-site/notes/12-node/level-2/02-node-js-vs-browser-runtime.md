---
id: node-js-vs-browser-runtime
title: "Node.js vs Browser Runtime"
sidebar_label: "Node.js vs Browser Runtime"
sidebar_position: 2
description: "Node.js vs Browser Runtime — Node.js interview notes."
---
| Feature       | Browser Runtime                        | Node.js Runtime                    |
| ------------- | -------------------------------------- | ---------------------------------- |
| Environment   | Runs JS in browser, interacts with DOM | Runs JS on server, no DOM          |
| APIs          | document, window, fetch, localStorage  | fs, http, path, process, Buffer    |
| Global object | window (`globalThis`)                  | global (`globalThis`)              |
| Async engine  | Browser Web APIs                       | libuv                              |
| Use case      | Frontend, UI, client-side logic        | Backend services, servers, scripts |

```text
Browser                         Node.js
┌──────────────────┐            ┌──────────────────┐
│ V8 / JS engine   │            │ V8               │
│ DOM, window      │            │ fs, http, process│
│ Web APIs         │            │ libuv            │
└──────────────────┘            └──────────────────┘
   UI in a tab                     Server / CLI
```

---
