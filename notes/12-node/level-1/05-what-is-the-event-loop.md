---
id: what-is-the-event-loop
title: "What is the Event Loop?"
sidebar_label: "What is the Event Loop?"
sidebar_position: 5
description: "What is the Event Loop? — Node.js interview notes."
---
The event loop is the mechanism that lets Node perform non-blocking, asynchronous operations despite running JavaScript on one thread.

### Who does what

```text
                         NODE.JS RUNTIME
                                │
       ┌────────────────────────┼────────────────────────┐
       │                        │                        │
   V8 ENGINE                NODE CORE                  libuv
   executes JS          APIs + nextTick queue    event loop + async I/O
       │                        │                        │
  ┌────┴─────┐          fs, net, timers,         ┌───────┴────────┐
  │          │          process.nextTick         │                │
Call Stack  Promise                           OS kernel       Thread pool
(sync code) microtasks                    (network sockets)  (fs, dns.lookup,
            .then / await /                                   crypto, zlib)
            queueMicrotask
```

- **V8** runs synchronous code on the Call Stack and owns the **Promise microtask queue**.
- **Node core** provides the APIs (`fs`, `net`, timers) and owns the **`process.nextTick()` queue**, which is not part of V8.
- **libuv** runs the **event loop**. It hands network I/O to the OS and runs blocking work (file system, `dns.lookup`, crypto, zlib) on its **thread pool**.

### How it works

- **First,** synchronous code executes line-by-line on the Call Stack.
- **Second,** async tasks (timers, file reads, network calls) are handed off to **libuv** / the OS (in Node there are no "Web APIs" — that is the browser).
- **Third,** when those tasks finish, their callbacks (**macrotasks**) are queued in the matching phase.
- **Fourth,** whenever the Call Stack empties — after the sync code and after **every** callback — Node drains the **microtask** queues first: all of `process.nextTick()`, then all Promise callbacks.
- **Finally,** the event loop walks through its phases and runs the queued callbacks.

`console.log()`, variable declarations, loops and plain function calls are **synchronous**. They run straight on the Call Stack and are not microtasks.

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
2. **Promise microtask queue** — `.then()`, `.catch()`, `.finally()`, code after `await`, `queueMicrotask()` (managed by V8)

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

**Common misconception:** the order is **not** "sync → all microtasks → all macrotasks". Microtasks are drained again after **each** callback:

```text
Sync code → microtasks → callback → microtasks → callback → microtasks → ...
```

### nextTick vs setImmediate vs setTimeout

| API                   | Runs when                                          | Priority |
| --------------------- | -------------------------------------------------- | -------- |
| `process.nextTick()`  | Right after the current operation, before promises | Highest  |
| `Promise.then()`      | After the nextTick queue                           | High     |
| `setTimeout(fn, 0)`   | Timers phase (minimum ~1ms delay)                  | Lower    |
| `setImmediate()`      | Check phase (right after poll)                     | Lower    |

**setTimeout vs setImmediate ordering:**

- In the **main module** the order is **not guaranteed** (depends on process performance).
- Inside an **I/O callback**, `setImmediate` **always** runs first (check comes right after poll) — see G before H in the worked example below.

```javascript
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
// Main module: either order is possible
```

### Quick example

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
process.nextTick(() => console.log('4'));
console.log('5');

// Output: 1, 5, 4, 3, 2
```

1. **Sync code:** prints `1` and `5`. The timer, the promise and the nextTick are only scheduled at this point.
2. **Microtasks:** the nextTick runs first (`4`), then the promise (`3`).
3. **Event loop:** the timers phase runs the `setTimeout` callback (`2`).

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

### Interview mind map

```text
┌───────────────────────────────┐
│ 1. SYNC JAVASCRIPT            │  V8 Call Stack
└───────────────┬───────────────┘
┌───────────────▼───────────────┐
│ 2. MICROTASKS                 │  nextTick → Promise
└───────────────┬───────────────┘
┌───────────────▼───────────────┐
│ 3. ASYNC WORK                 │  libuv → OS / thread pool
└───────────────┬───────────────┘
┌───────────────▼───────────────┐
│ 4. CALLBACK READY             │  queued in its phase
└───────────────┬───────────────┘
┌───────────────▼───────────────┐ <──┐
│ 5. EVENT LOOP RUNS CALLBACK   │    │
└───────────────┬───────────────┘    │
┌───────────────▼───────────────┐    │
│ 6. MICROTASKS                 │    │  next callback
│    nextTick → Promise         │ ───┘
└───────────────────────────────┘
```

**One sentence to memorize:** V8 runs synchronous JavaScript and Promise microtasks, Node owns the `process.nextTick()` queue, and libuv runs async I/O and the event loop. After every callback, Node drains nextTick and then Promise microtasks before it moves on to the next callback.

---
