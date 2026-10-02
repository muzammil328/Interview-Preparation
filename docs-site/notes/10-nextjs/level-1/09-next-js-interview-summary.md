---
id: next-js-interview-summary
title: "Next.js Interview Summary"
sidebar_label: "Next.js Interview Summary"
sidebar_position: 9
description: "Next.js Interview Summary — Next.js interview notes."
---
| Topic            | Explanation                               |
| ---------------- | ----------------------------------------- |
| Next.js          | React framework with server-side features |
| SSR              | Generates HTML on every request           |
| SSG              | Generates HTML at build time              |
| ISR              | Updates static pages after deployment     |
| CSR              | Renders UI in browser                     |
| Server Component | Runs on server, no hooks/events           |
| Client Component | Pre-rendered on server, hydrated in browser; supports hooks/events |
| Routing          | File-based routing                        |
| Dynamic Routes   | `[slug]`, `params` is a Promise in Next 15 |
| Catch-All Routes | `[...slug]`                               |
| Caching          | `fetch` not cached by default in Next 15  |
| Server Action    | `"use server"` function for mutations     |
| Route Handler    | `route.ts` HTTP endpoint                  |
| Middleware       | Runs before the route, e.g. auth redirect |
| App Router       | Modern Next.js architecture               |
| Pages Router     | Older routing system                      |

---
