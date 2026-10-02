---
id: what-is-the-event-loop
title: "What is the Event Loop?"
sidebar_label: "What is the Event Loop?"
sidebar_position: 5
description: "What is the Event Loop? — Node.js interview notes."
---
The event loop is the mechanism that lets Node perform non-blocking, asynchronous operations despite running JavaScript on one thread.

### How it works

- **First,** synchronous code executes line-by-line on the Call Stack.
- **Second,** async tasks (timers, file reads, network calls) are handed off to **libuv** / the OS (in Node there are no "Web APIs" — that is the browser).
- **Third,** when those tasks finish, their callbacks (**macrotasks**) are queued in the matching phase.
- **Fourth,** whenever the Call Stack empties — after the sync code and after **every** callback — Node drains the **microtask** queues first: all of `process.nextTick()`, then all Promise callbacks.
- **Finally,** the event loop walks through its phases and runs the queued callbacks.

### Event Loop Phases

Handled by **libuv**. Each phase has its own callback queue.

| #   | Phase             | What it handles                                    |
| --- | ----------------- | -------------------------------------------------- |
| 1   | Timers            | `setTimeout` and `setInterval` callbacks           |
| 2   | Pending callbacks | Deferred system/TCP errors                         |
| 3   | Idle, prepare     | Internal use only                                  |
| 4   | Poll              | New I/O events — network, files, database, streams |
| 5   | Check             | `setImmediate` callbacks                           |
| 6   | Close callbacks   | `socket.on('close')`, stream closures              |

```text
          ┌───────────────────────────┐
     ┌───>│ 1. timers                 │  setTimeout, setInterval
     │    └─────────────┬─────────────┘
     │          [nextTick → promises]
     │    ┌─────────────▼─────────────┐
     │    │ 2. pending callbacks      │  deferred TCP errors
     │    └─────────────┬─────────────┘
     │    ┌─────────────▼─────────────┐
     │    │ 3. idle, prepare          │  internal
     │    └─────────────┬─────────────┘
     │    ┌─────────────▼─────────────┐
     │    │ 4. poll                   │  I/O callbacks (fs, net, db)
     │    └─────────────┬─────────────┘
     │          [nextTick → promises]
     │    ┌─────────────▼─────────────┐
     │    │ 5. check                  │  setImmediate
     │    └─────────────┬─────────────┘
     │          [nextTick → promises]
     │    ┌─────────────▼─────────────┐
     └────┤ 6. close callbacks        │  socket.on('close')
          └───────────────────────────┘

[nextTick → promises] = drained after EVERY single callback, in every phase
```

### Microtasks and process.nextTick()

After **every callback** (since Node 11 — not only between phases), Node drains two extra queues before moving on:

1. **`process.nextTick()` queue** — highest priority (managed by Node)
2. **Promise microtask queue** — `.then()`, `.catch()`, `.finally()`, code after `await` (managed by V8)

```text
Synchronous code
   ↓
process.nextTick queue  (all of it)
   ↓
Promise microtask queue (all of it)
   ↓
Next callback / next event loop phase (timers, poll, check, ...)
```

- `process.nextTick()` schedules a callback to fire immediately after the current operation completes, **before** the event loop continues.
- Macrotasks (timers, I/O, `setImmediate`) are lower priority and are scheduled by libuv.

**Warning:** recursive `process.nextTick()` calls starve the event loop — the loop never reaches the next phase. Use `setImmediate()` when you want to yield.

### Worked example: guess the output

```javascript
const fs = require('fs');

console.log('A: sync');

fs.readFile(__filename, () => {
  console.log('E: poll — readFile callback');
  setTimeout(() => console.log('H: timers — setTimeout'), 0);
  setImmediate(() => console.log('G: check — setImmediate'));
  process.nextTick(() => console.log('F: nextTick'));
});

process.nextTick(() => console.log('C: nextTick'));
Promise.resolve().then(() => console.log('D: promise'));

console.log('B: sync');

// Output: A, B, C, D, E, F, G, H
```

```text
Step  What runs                  Why
────  ─────────────────────────  ──────────────────────────────────────────
 1    A, B                       synchronous code runs first
 2    C                          nextTick queue drains before promises
 3    D                          then the promise microtask queue
 4    (loop starts, file read in thread pool...)
 5    E                          poll phase: readFile finished
 6    F                          nextTick drains right after E's callback
 7    G                          check phase comes right after poll
 8    H                          timers phase is in the NEXT loop iteration
```

---
