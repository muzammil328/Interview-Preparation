---
id: monolith-vs-microservices
title: "Monolith vs Microservices"
sidebar_label: "Monolith vs Microservices"
sidebar_position: 3
description: "Monolith vs Microservices — Architecture interview notes."
---
| Monolith                                   | Microservices                                       |
| ------------------------------------------ | --------------------------------------------------- |
| One codebase, one deployment               | Many small services, deployed independently         |
| Simple to build, test, and debug at first  | More complex: network calls, tracing, many deployments |
| Scale the **whole** app                    | Scale **only** the busy service                     |
| One bug or bad deploy can take down everything | Failures can be isolated to one service         |
| In-process function calls (fast)           | Network calls (slower, can fail)                    |
| One tech stack                             | Each service can use a different stack              |
| Best for small teams and new products      | Best for large teams and large, mature systems      |

**Interview answer:** start with a **well-structured monolith** (a "modular monolith"). Split out a service only when there is a real reason — a part that needs to scale separately, or a team that needs to deploy independently.

---
