---
id: client-state-vs-server-state
title: "Client State vs Server State"
sidebar_label: "Client State vs Server State"
sidebar_position: 15
description: "Client State vs Server State — React interview notes."
---
| Client State (UI State)                      | Server State (Remote State)                                 |
| -------------------------------------------- | ----------------------------------------------------------- |
| Lives in the UI / browser                    | Lives in the database / backend API                         |
| Synchronous and predictable                  | Asynchronous and unpredictable                              |
| Lost on page refresh                         | Persistent across sessions and devices                      |
| Concerns: scoping, re-renders, prop drilling | Concerns: caching, deduplication, revalidation, concurrency |
| `useState`, Zustand, Redux, Jotai            | TanStack Query, SWR, RTK Query                              |

```mermaid
flowchart LR
    subgraph Browser
        CS["Client state: modal open, theme, form input"]
        Cache["Server-state cache (TanStack Query)"]
    end
    API["Backend API"] --> DB[("Database")]
    Cache <-->|"fetch / revalidate"| API
```

---
