---
id: file-based-routing-in-next-js
title: "File-Based Routing in Next.js"
sidebar_label: "File-Based Routing in Next.js"
sidebar_position: 4
description: "File-Based Routing in Next.js — Next.js interview notes."
---
Next.js uses file-based routing.

Folders inside the `app` directory become URL segments, and a `page.tsx` file makes that segment publicly reachable.

Example:

```text
app/
 ├── page.tsx
 ├── about/
 │    └── page.tsx
 └── products/
      └── page.tsx
```

Routes:

```text
/
/about
/products
```

No manual router configuration is required.

---
