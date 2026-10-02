---
id: heavy-work-single-thread
title: "Heavy Work on a Single Thread"
sidebar_label: "Heavy Work on a Single Thread"
sidebar_position: 6
description: "Heavy Work on a Single Thread — Node.js interview notes."
---
### 1. libuv Thread Pool — heavy background I/O

- Used for file system tasks (`fs.readFile`), `dns.lookup`, `crypto` (pbkdf2, scrypt), and `zlib` compression
- Default size is **4 threads** (change with `UV_THREADPOOL_SIZE`, max 1024)
- If 5 heavy tasks start at once, the 5th waits for a free thread

```text
Tasks:  [crypto1] [crypto2] [crypto3] [crypto4] [crypto5]
Pool:   T1:crypto1  T2:crypto2  T3:crypto3  T4:crypto4
Queue:  crypto5 waits ──────────────> runs when a thread frees up
```

### 2. OS Kernel — network tasks

- Used for network/socket work (`http`, `net`)
- The kernel handles these asynchronously, so no thread pool is needed

### 3. Worker Threads — heavy CPU tasks in the same app

- The `worker_threads` module runs isolated JS on separate threads **inside one process**
- Each worker has its own V8 instance and event loop
- Can share memory via `SharedArrayBuffer`; communicates with `postMessage`
- Good for heavy math, image resizing, large file parsing

```javascript
const { Worker } = require('worker_threads');
const worker = new Worker('./heavy-task.js', { workerData: 42 });
worker.on('message', (result) => console.log(result));
```

### 4. Cluster — scaling the whole app

- Forks the entire server into separate Node processes (usually one per CPU core)
- The primary process distributes incoming connections across worker processes
- **No shared memory** between workers (use Redis / DB for shared state)

```javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isPrimary) {
  os.cpus().forEach(() => cluster.fork());
} else {
  require('./server'); // each worker runs the app
}
```

---
