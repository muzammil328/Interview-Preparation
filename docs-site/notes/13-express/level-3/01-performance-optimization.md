---
id: performance-optimization
title: "Performance Optimization"
sidebar_label: "Performance Optimization"
sidebar_position: 1
description: "Performance Optimization — Express.js interview notes."
---
- Caching (Redis)
- Clustering / multiple instances (use all CPU cores)
- Load balancing
- Use streams for large files
- Database connection pooling and indexes
- Compression (gzip / brotli)
- Avoid sync (`*Sync`) calls inside request handlers
- Move CPU-heavy work to worker threads or a job queue
- Use a CDN for static files

```mermaid
flowchart LR
    U["User"] --> CDN["CDN: static files"]
    U --> LB["Load balancer"]
    LB --> N1["Node instance 1"]
    LB --> N2["Node instance 2"]
    N1 --> RC[("Redis cache")]
    N2 --> RC
    RC -->|"cache miss"| DB[("Database with pool")]
```

---
