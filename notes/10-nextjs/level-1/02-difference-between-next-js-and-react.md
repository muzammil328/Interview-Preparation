---
id: difference-between-next-js-and-react
title: "Difference Between Next.js and React"
sidebar_label: "Difference Between Next.js and React"
sidebar_position: 2
description: "Difference Between Next.js and React — Next.js interview notes."
---

| Feature       | React JS                     | Next.js                        |
| ------------- | ---------------------------- | ------------------------------ |
| Type          | UI Library                   | Full Stack React Framework     |
| Rendering     | Mainly Client-Side Rendering | SSR, SSG, ISR, CSR             |
| SEO           | Requires extra setup         | Better SEO support             |
| Routing       | Uses React Router DOM        | Built-in file-based routing    |
| Performance   | Manual optimization          | Automatic optimization         |
| API           | No built-in API routes       | Built-in Route Handlers        |
| Data Fetching | External solutions required  | Built-in data fetching support |

```text
React app (CSR)                     Next.js app (SSR/SSG)
───────────────                     ─────────────────────
Browser gets empty <div id=root>    Browser gets full HTML
        │                                   │
Download JS → render → content      Content visible → JS hydrates
(search engine sees little)         (search engine sees everything)
```

---
