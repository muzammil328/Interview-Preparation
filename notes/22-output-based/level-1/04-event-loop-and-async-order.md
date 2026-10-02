---
id: event-loop-and-async-order
title: "Event Loop and Async Order"
sidebar_label: "Event Loop and Async Order"
sidebar_position: 4
description: "Event Loop and Async Order — Output Based interview notes."
---
Node.js priority order:

```text
Synchronous code  →  process.nextTick  →  Promise (microtasks)  →  Timers / I/O
```

### Example 1 — The Classic (Browser and Node)

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
```

**Output:** `1`, `4`, `3`, `2`

| Phase                     | Output |
| ------------------------- | ------ |
| Synchronous (console)     | 1, 4   |
| Microtasks (Promise)      | 3      |
| Timer                     | 2      |

Even with a `0`ms delay, `setTimeout` always waits for the stack **and** the microtask queue to be empty.

### Example 2 — async / await Ordering

```js
async function run() {
  console.log('2');
  await null;
  console.log('4');
}

console.log('1');
setTimeout(() => console.log('6'), 0);
run();
Promise.resolve().then(() => console.log('5'));
console.log('3');
```

**Output:** `1`, `2`, `3`, `4`, `5`, `6`

- The code in an `async` function runs **synchronously** until the first `await`.
- Everything after the `await` becomes a **microtask**.

```text
Step | Call Stack              | Microtask Queue     | Macrotask Queue | Output
─────┼─────────────────────────┼─────────────────────┼─────────────────┼─────────────
 1   | console.log('1')        |                     |                 | 1
 2   | setTimeout              |                     | [log 6]         | 1
 3   | run() → log('2')        |                     | [log 6]         | 1 2
 4   | run() hits await        | [rest of run]       | [log 6]         | 1 2
 5   | Promise.then            | [rest of run, log 5]| [log 6]         | 1 2
 6   | console.log('3')        | [rest of run, log 5]| [log 6]         | 1 2 3
 7   | drain micro → log('4')  | [log 5]             | [log 6]         | 1 2 3 4
 8   | drain micro → log('5')  |                     | [log 6]         | 1 2 3 4 5
 9   | ONE macrotask           |                     |                 | 1 2 3 4 5 6
```

### Example 3 — process.nextTick (Node)

```js
console.log("A");
process.nextTick(() => console.log("B"));
Promise.resolve().then(() => console.log("C"));
setTimeout(() => console.log("D"), 0);
console.log("E");
```

**Output:** `A`, `E`, `B`, `C`, `D`

| Phase                     | Output |
| ------------------------- | ------ |
| Synchronous (console)     | A, E   |
| nextTick                  | B      |
| Microtasks (Promise)      | C      |
| Timer                     | D      |

**Sync → nextTick → Promise → Timer**

### Example 4 — setTimeout vs setImmediate (Node)

```js
setTimeout(() => console.log("A"), 0);
setImmediate(() => console.log("B"));
Promise.resolve().then(() => console.log("C"));
process.nextTick(() => console.log("D"));
```

**Output:** `D`, `C`, then `A` / `B`

| Phase                     | Output    |
| ------------------------- | --------- |
| nextTick                  | D         |
| Microtasks (Promise)      | C         |
| Timer / Check             | A or B    |

**nextTick → Promise → Timer**

**Note:** from the main module the order of `setTimeout(..., 0)` and `setImmediate` is **not guaranteed** — it depends on how fast the process starts. Inside an I/O callback, `setImmediate` always runs first.

```text
Main script ends
   │
   ▼
nextTick queue  ──► D
   │
   ▼
Promise queue   ──► C
   │
   ▼
Event loop phases:
 ┌─► timers ──► A  (only if the 1ms timer is already due)
 │     │
 │     ▼
 │   poll (I/O)
 │     │
 │     ▼
 │   check ────► B  (setImmediate)
 │     │
 └─────┘   if the timer was not due yet, A runs on the NEXT loop → B, A
```

### Example 5 — Microtask Inside a Macrotask

```js
console.log("A");
setTimeout(() => {
  console.log("B");
  Promise.resolve().then(() => {
    console.log("C");
  });
}, 0);
Promise.resolve().then(() => console.log("D"));
console.log("E");
```

**Output:** `A`, `E`, `D`, `B`, `C`

| Phase                     | Output |
| ------------------------- | ------ |
| Synchronous (console)     | A, E   |
| Microtasks (Promise)      | D      |
| Timer                     | B      |
| Microtasks (Promise)      | C      |

**Sync → Promise → Timer → Promise**

The microtask queue is drained **after every task**, so `C` runs right after the timer callback finishes.

```text
Step | Call Stack            | Microtask Queue | Macrotask Queue | Output
─────┼───────────────────────┼─────────────────┼─────────────────┼───────────
 1   | log("A")              |                 |                 | A
 2   | setTimeout            |                 | [timer cb]      | A
 3   | Promise.then          | [log D]         | [timer cb]      | A
 4   | log("E")              | [log D]         | [timer cb]      | A E
 5   | drain micro           |                 | [timer cb]      | A E D
 6   | timer cb → log("B")   |                 |                 | A E D B
 7   |   cb queues .then     | [log C]         |                 | A E D B
 8   | drain micro again     |                 |                 | A E D B C
```

### Example 6 — The Most Famous One (async1 / async2)

This exact puzzle is asked in a huge number of interviews.

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}

console.log('script start');
setTimeout(() => console.log('setTimeout'), 0);
async1();
new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => console.log('promise2'));
console.log('script end');
```

**Output:**

```text
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```

Three things to notice:

- `async2()` is **called** synchronously — the `await` only pauses what comes **after** it.
- The `new Promise` executor (`promise1`) runs **synchronously**.
- `async1 end` was queued before `promise2`, so it prints first.

```text
Step | Call Stack                    | Microtask Queue          | Macrotask   | Output
─────┼───────────────────────────────┼──────────────────────────┼─────────────┼─────────────────
 1   | log('script start')           |                          |             | script start
 2   | setTimeout                    |                          | [setTimeout]|
 3   | async1() → log                |                          | [setTimeout]| async1 start
 4   | async2() → log                |                          | [setTimeout]| async2
 5   | await → pause async1          | [async1 end]             | [setTimeout]|
 6   | new Promise executor → log    | [async1 end]             | [setTimeout]| promise1
 7   | resolve() → .then queued      | [async1 end, promise2]   | [setTimeout]|
 8   | log('script end')             | [async1 end, promise2]   | [setTimeout]| script end
 9   | drain micro                   | [promise2]               | [setTimeout]| async1 end
10   | drain micro                   |                          | [setTimeout]| promise2
11   | ONE macrotask                 |                          |             | setTimeout
```

### Example 7 — setTimeout With Different Delays

```js
setTimeout(() => console.log('A'), 100);
setTimeout(() => console.log('B'), 0);
setTimeout(() => console.log('C'), 50);
console.log('D');
```

**Output:** `D`, `B`, `C`, `A`

Timers run in order of **when they expire**, not the order they were written.

```text
time   0ms ─────────── 50ms ─────────── 100ms
sync   D
timer  B (0ms)
                       C (50ms)
                                        A (100ms)
```

### Example 8 — Inside an I/O Callback (Node)

```js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
  process.nextTick(() => console.log('nextTick'));
  Promise.resolve().then(() => console.log('promise'));
});
```

**Output:** `nextTick`, `promise`, `immediate`, `timeout`

Unlike Example 4, this order is **guaranteed**. The callback runs in the **poll** phase, and the next phase is **check** (`setImmediate`). Timers only come around on the next loop.

```text
            ┌──────────► timers   ── "timeout"   (next loop)  4th
            │               │
            │               ▼
            │            poll     ── readFile callback runs here
            │               │        └─ after it: nextTick 1st, promise 2nd
            │               ▼
            │            check    ── "immediate"  3rd
            │               │
            └───────────────┘
```

---
