---
id: how-nodejs-works
title: "How Node.js Works (Full Flow)"
sidebar_label: "How Node.js Works (Full Flow)"
sidebar_position: 1
description: "How Node.js Works (Full Flow) — Node.js interview notes."
---
One diagram, start to finish: process creation → which file gets read → who does which task → how the result comes back.

```mermaid
flowchart TB

    subgraph S0["STEP 0 — you type a command"]
        A1["$ node server.js"]
    end

    subgraph S1["STEP 1 — the process is created (C++, before any JS runs)"]
        direction TB
        B1["OS does fork + exec on the node binary<br/>gives you 1 PID, 1 main thread, its own memory"] --> B2["Node main() in C++<br/>reads argv, env vars, NODE_OPTIONS, cwd"] --> B3["create the V8 isolate, heap and Node environment object"] --> B4["create the libuv loop + signal handlers + stdout/stderr"]
    end

    subgraph S2["STEP 2 — read the entry file"]
        direction TB
        C1["resolve 'server.js' into an absolute path"] --> C2["hand the read job to the libuv thread pool"] --> C3["callback returns on the main thread<br/>the file is now a string in memory"] --> C4["V8 compiles it: source → AST → Ignition bytecode → TurboFan machine code once hot"]
    end

    subgraph S3["STEP 3 — your code actually runs"]
        direction TB
        D1["V8 runs the module wrapper<br/>module, exports, require, __filename, __dirname"] --> D2["top-level statements execute top to bottom"] --> D3["every require(): resolve → read → compile → execute → cache<br/>repeated for every file in the dependency tree"] --> D4["app.listen(3000) only registers a handle with libuv<br/>and returns instantly"] --> D5["top-level code ends, call stack is empty<br/>the main thread is now free"]
    end

    subgraph S4["STEP 4 — the event loop turns forever"]
        direction TB
        E1["nextTick queue, then promise microtasks"] --> E2["timers phase: expired setTimeout / setInterval"] --> E3["pending callbacks"] --> E4["poll phase: sit here waiting for I/O<br/>socket data, fs result, DNS reply"] --> E5["check phase: setImmediate callbacks"] --> E6["close callbacks"] -->|"next turn"| E1
        E4 -->|"a request just arrived"| F1["http parser builds req + res objects"] --> F2["emit 'request' → Express middleware chain, then your handler<br/>runs on the main thread"] --> F3{"does the handler need<br/>disk, DNS or crypto?"}
    end

    subgraph S5["STEP 5 — the task is assigned to someone"]
        direction TB
        G1["MAIN THREAD — JavaScript<br/>the event loop, all your code, every callback"]
        G2["libuv THREAD POOL — 4 threads by default<br/>fs.readFile, dns.lookup, crypto, zlib"]
        G3["OPERATING SYSTEM / kernel<br/>TCP sockets, timers, signals — never uses the pool"]
        G4["worker_threads / cluster<br/>the answer for real CPU-heavy work"]
    end

    subgraph S6["STEP 6 — the result comes back"]
        direction TB
        H1["pool thread finishes the job"] --> H2["result is queued as a callback on the loop"] --> H3["next loop turn: nextTick and microtasks run first"] --> H4["your callback runs with the data<br/>(err, data) → use it"] --> H5["res.end(status, headers, body)"] --> H6["libuv writes the bytes to the socket"] -->|"loop returns to poll, waiting again"| E4
    end

    A1 --> B1
    B4 --> C1
    C4 --> D1
    D5 --> E1
    E1 -.->|"every callback in these phases executes on"| G1
    E4 -->|"waits on"| G3
    F3 -->|"yes — queue the job and keep going"| G2
    F3 -->|"no — pure JavaScript"| G1
    G1 -.->|"too CPU heavy? offload it"| G4
    G2 --> H1
    G1 --> H4
```

The one sentence version: **Node reads one file, compiles it, runs it on a single main thread, and from then on the only job of that main thread is to run callbacks in phases — real work is pushed to the thread pool, the OS, or worker threads, and every answer comes back as a queued callback on the next turn of the same loop.**

### How to explain it in the interview (memorize these 6 words)

**Process → Read → Compile → Run → Loop → Callback**

| # | Word      | What you say                                                                                     |
| - | --------- | ------------------------------------------------------------------------------------------------ |
| 1 | **Process** | "When I run `node server.js`, the OS creates a new process. C++ code boots up V8 and libuv first — this happens before my JavaScript exists." |
| 2 | **Read**   | "Then Node reads **one** file from disk — my entry file — and reads it in the background using the thread pool." |
| 3 | **Compile**| "V8 compiles that file: source to AST to bytecode, and hot code to real machine code."              |
| 4 | **Run**    | "It runs my code top to bottom. Every `require()` repeats the same steps and is cached, so files load once." |
| 5 | **Loop**   | "When `listen()` returns, my code is done. The main thread is now free and only runs the event loop: timers, poll, check, close — forever." |
| 6 | **Callback**| "Real work goes to the thread pool, the OS, or worker threads. Every result comes back as a callback queued on the next turn of the loop." |

### The 30-second spoken answer

> "When I type `node server.js` the OS creates a new process. Before any of my JavaScript runs, C++ code sets up the V8 engine and libuv. Then Node reads exactly one file — my entry file — compiles it with V8, and runs it. Any `require()` pulls in another file the same way and caches it. When my top-level code finishes, the main thread is free, and from that moment its only job is the event loop: timers, poll, check, close. When I need a file or DNS, that job is handed to the thread pool, and the answer comes back as a callback on the next turn of the loop. So one thread, many requests — non-blocking."

### If they ask a follow-up

| Question                                 | Answer in one line                                                                                    |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Why is there only one thread?            | Because JavaScript is single-threaded. Adding threads to run JS would need locks, and shared mutable state would break. |
| Then how does it handle 10,000 users?    | I/O is handled by the OS and the thread pool, so the main thread only ever runs short callbacks.       |
| Where does the result come back?         | As a callback. The thread finishes, queues the callback, and the loop runs it on a later turn.       |
| What if the work is CPU-heavy?           | The thread pool only offloads I/O, so for real CPU work I use `worker_threads` or `cluster`.           |
| How do you scale it further?             | Run multiple processes with `cluster` or the container orchestrator, and put Nginx in front.          |

---
