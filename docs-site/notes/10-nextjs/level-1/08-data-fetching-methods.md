---
id: data-fetching-methods
title: "Data Fetching Methods"
sidebar_label: "Data Fetching Methods"
sidebar_position: 8
description: "Data Fetching Methods — Next.js interview notes."
---
```mermaid
flowchart LR
    subgraph PR["Pages Router"]
        A["getStaticProps"] --> A1["Build time (SSG)"]
        B["getServerSideProps"] --> B1["Every request (SSR)"]
        C["getStaticPaths"] --> C1["Which dynamic pages to build"]
    end
    subgraph AR["App Router"]
        D["async Server Component + fetch"] --> D1["SSG / ISR / SSR by cache options"]
        E["generateStaticParams"] --> E1["Which dynamic pages to build"]
    end
```

## getStaticProps (Pages Router)

Fetches data during build time.

Used for:

* Static pages
* Blogs
* Documentation

---

## getServerSideProps (Pages Router)

Fetches data on every request.

Used for:

* Dynamic data
* User-specific pages

---

## generateStaticParams (App Router)

Replacement for `getStaticPaths`.

Generates dynamic routes at build time.

Example:

```tsx
export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" }
  ];
}
```

```text
next build ──► generateStaticParams() → [{id:"1"},{id:"2"}]
                    │
                    ├──► /products/1  (static HTML)
                    └──► /products/2  (static HTML)
```

---
