---
id: what-is-javascript
title: "What is JavaScript?"
sidebar_label: "What is JavaScript?"
sidebar_position: 1
description: "What is JavaScript? — JavaScript interview notes."
---
---

JavaScript is a high-level, single-threaded, dynamically typed programming language that adds interactivity, logic, and dynamic behaviors to websites. With Node.js it also runs on the server.

```mermaid
flowchart LR
    JS["Your JavaScript"] --> E["JS Engine<br/>(V8, SpiderMonkey)"]
    E --> B["Browser<br/>+ Web APIs: DOM, fetch, timers"]
    E --> N["Node.js<br/>+ fs, http, process"]
```

The language is the same; the **runtime** (browser or Node) decides which extra APIs you get.
