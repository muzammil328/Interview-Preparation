---
id: app-router-vs-pages-router
title: "App Router vs Pages Router"
sidebar_label: "App Router vs Pages Router"
sidebar_position: 4
description: "App Router vs Pages Router — Next.js interview notes."
---
| Pages Router                                   | App Router                                      |
| ---------------------------------------------- | ----------------------------------------------- |
| Older routing system                           | Modern routing system (Next 13+)                |
| Uses `pages` directory                         | Uses `app` directory                            |
| Uses `getServerSideProps` and `getStaticProps` | Uses Server Components and `async` components    |
| No Server Components — every page is pre-rendered and then hydrated in full | Server Components by default; only `"use client"` parts ship JS |
| `_app.tsx` / `_document.tsx` for shared shell  | Nested `layout.tsx` files                       |
| API routes in `pages/api`                      | Route Handlers in `route.ts`                    |

```text
pages/                        app/
 ├── _app.tsx                  ├── layout.tsx       (root layout)
 ├── index.tsx      → /        ├── page.tsx         → /
 ├── about.tsx      → /about   ├── about/page.tsx   → /about
 └── api/hello.ts   → /api/hello └── api/hello/route.ts → /api/hello
```

---
