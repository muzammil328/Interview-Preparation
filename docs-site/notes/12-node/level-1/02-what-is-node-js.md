---
id: what-is-node-js
title: "What is Node.js?"
sidebar_label: "What is Node.js?"
sidebar_position: 2
description: "What is Node.js? — Node.js interview notes."
---
- **Runtime environment** that allows JavaScript to run outside the browser (typically on a server)
- Built on Chrome's **V8 engine** to execute JavaScript
- **Event-driven, non-blocking** architecture (handles multiple simultaneous connections)
- Fast due to event loop + non-blocking I/O

### Node.js adds server-side capabilities

- File system access (`fs`)
- Networking (`http`, `net`)
- Process management (`process`)
- Modules and package management via npm

```mermaid
flowchart TB
    JS["Your JavaScript code"] --> NODE["Node.js runtime"]
    NODE --> V8["V8 engine: runs the JS"]
    NODE --> API["Node APIs: fs, http, process, Buffer"]
    NODE --> UV["libuv: event loop + thread pool"]
    UV --> OS["Operating system: files, network, timers"]
```

---
