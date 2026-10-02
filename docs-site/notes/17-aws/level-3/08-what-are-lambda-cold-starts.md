---
id: what-are-lambda-cold-starts
title: "What are Lambda cold starts?"
sidebar_label: "What are Lambda cold starts?"
sidebar_position: 8
description: "What are Lambda cold starts? — AWS interview notes."
---
1. A **cold start** happens when Lambda takes extra time to initialize a new execution environment before running the function.
2. It usually happens when the function has not been used recently or when scaling up.
3. Reduce it with smaller bundles, fewer dependencies, initializing clients outside the handler, or **provisioned concurrency**.

```text
Cold:  [create environment][load code][init]  →  [run handler]   (slower)
Warm:                                           [run handler]   (fast, reuses environment)
```

---
