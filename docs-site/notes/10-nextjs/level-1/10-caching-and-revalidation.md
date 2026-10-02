---
id: caching-and-revalidation
title: "Caching and Revalidation"
sidebar_label: "Caching and Revalidation"
sidebar_position: 10
description: "Caching and Revalidation — Next.js interview notes."
---
**Next.js 15 change:** `fetch` requests are **not cached by default** anymore (Next 14 cached them by default). You opt in.

| Option                                   | Behaviour                     |
| ---------------------------------------- | ----------------------------- |
| `fetch(url)`                             | Not cached (Next 15 default)  |
| `fetch(url, { cache: "force-cache" })`   | Cached → static (SSG)         |
| `fetch(url, { next: { revalidate: 60 } })` | Cached, refreshed every 60s (ISR) |
| `fetch(url, { next: { tags: ["posts"] } })` | Cached, refreshed on `revalidateTag("posts")` |
| `export const revalidate = 60`           | Route-level ISR               |
| `revalidatePath("/posts")`               | Purge a route on demand (e.g. after a mutation) |

```mermaid
flowchart LR
    A["Server Action: create post"] --> B["Save to DB"]
    B --> C["revalidateTag('posts')"]
    C --> D["Cached 'posts' data marked stale"]
    D --> E["Next request fetches fresh data"]
```

---
