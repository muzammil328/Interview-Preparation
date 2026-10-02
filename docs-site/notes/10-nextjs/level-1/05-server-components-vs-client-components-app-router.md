---
id: server-components-vs-client-components-app-router
title: "Server Components vs Client Components (App Router)"
sidebar_label: "Server Components vs Client Components (App Router)"
sidebar_position: 5
description: "Server Components vs Client Components (App Router) — Next.js interview notes."
---
| Server Component                      | Client Component                  |
| ------------------------------------- | --------------------------------- |
| Runs only on the server               | Pre-rendered on the server, then hydrated and run in the browser |
| Adds no JavaScript to the bundle      | Adds JavaScript to browser bundle |
| Can fetch data directly (`async`)     | Used for interactive UI           |
| Can access backend resources securely (DB, secrets) | Uses hooks and browser APIs |
| Cannot use state, effects, or event handlers | Supports state, events, and hooks |
| Default in the `app` directory        | Opt in with `"use client"`        |

```mermaid
flowchart TD
    P["page.tsx (Server)"] --> H["Header (Server)"]
    P --> L["ProductList (Server, fetches DB)"]
    L --> C["AddToCartButton (Client: 'use client')"]
    P --> S["SearchBox (Client: 'use client')"]
```

**Rule:** keep components on the server by default, and push `"use client"` down to the smallest interactive leaf.

---
