---
id: what-is-backpressure
title: "What is Backpressure?"
sidebar_label: "What is Backpressure?"
sidebar_position: 1
description: "What is Backpressure? — Node.js interview notes."
---
Backpressure happens when the **writer is slower than the reader** (e.g. fast disk read → slow network). Without handling it, chunks pile up in memory.

- `writable.write(chunk)` returns `false` when the internal buffer is full (`highWaterMark`).
- The reader should **pause** until the writable emits `drain`.
- `.pipe()` and `pipeline()` handle this automatically.

```javascript
readable.on('data', (chunk) => {
  const ok = writable.write(chunk);
  if (!ok) {
    readable.pause();
    writable.once('drain', () => readable.resume());
  }
});
```

```mermaid
sequenceDiagram
    participant R as Readable (fast)
    participant W as Writable (slow)
    R->>W: write(chunk)
    W-->>R: true (buffer OK)
    R->>W: write(chunk)
    W-->>R: false (buffer full)
    Note over R: pause()
    W-->>R: 'drain' event
    Note over R: resume()
    R->>W: write(chunk)
```

---
