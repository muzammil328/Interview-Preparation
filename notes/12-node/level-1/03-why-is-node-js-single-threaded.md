---
id: why-is-node-js-single-threaded
title: "Why is Node.js single-threaded?"
sidebar_label: "Why is Node.js single-threaded?"
sidebar_position: 3
description: "Why is Node.js single-threaded? — Node.js interview notes."
---
- Node.js uses a **single main thread** (event loop thread) to run JavaScript
- Uses the **event loop + callback queues** to handle concurrency

When an I/O operation (like reading a file) is requested, Node offloads it to the libuv thread pool or the OS kernel. The event loop continues with other work, and when the operation completes its callback is queued for the main thread.

"Single-threaded" means **your JS runs on one thread**. Node itself uses extra threads (libuv thread pool, V8 GC threads).

```mermaid
flowchart LR
    R1["Request 1"] --> EL["Main thread: event loop"]
    R2["Request 2"] --> EL
    R3["Request 3"] --> EL
    EL -->|"offload I/O"| POOL["libuv thread pool / OS kernel"]
    POOL -->|"callback when done"| EL
```

### Why not for CPU-heavy tasks?

- A long computation blocks the single thread, so **every** other request waits
- Offload them with `worker_threads` or `cluster` instead

---
