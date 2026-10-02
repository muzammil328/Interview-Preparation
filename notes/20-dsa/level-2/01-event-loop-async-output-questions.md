---
id: event-loop-async-output-questions
title: "Event Loop & Async - Output Questions"
sidebar_label: "Event Loop & Async - Output Questions"
sidebar_position: 1
description: "Event Loop & Async - Output Questions — DSA interview notes."
---
### Question 1

```javascript
console.log(1);
console.log(2);
setTimeout(() => {
  console.log(3);
  while (true) {
    console.log(4);
  }
});
```

**Answer**: `1, 2, 3, 4, 4, 4...` (infinite 4s, the page/process freezes)
**Explanation**: `1` and `2` are sync. `setTimeout` puts its callback in the macrotask queue. When the stack is empty the callback runs: it logs `3`, then the `while (true)` loop never ends, so it blocks the event loop forever.

```text
Call Stack                    Macrotask Queue
──────────                    ───────────────
log(1)      → prints 1
log(2)      → prints 2
setTimeout  ───────────────►  [ callback ]
(stack empty)
callback    ◄───────────────  [ ]
  log(3)    → prints 3
  while(true) log(4) → 4, 4, 4 ... stack never empties again
```

---

### Question 2

```javascript
0.1 + 0.2 === 0.3;
```

**Answer**: `false`
**Explanation**: Numbers are stored as 64-bit binary floating point. `0.1` and `0.2` cannot be stored exactly, so `0.1 + 0.2` is `0.30000000000000004`.

```text
0.1        → 0.1000000000000000055...
0.2        → 0.2000000000000000111...
0.1 + 0.2  → 0.30000000000000004      ≠ 0.3
```

Compare with a tolerance instead:

```javascript
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON; // true
```

---

### Question 3

```javascript
function test() {
  console.log('a');
  setTimeout(() => {
    console.log('b');
  });
  console.log('c');
}

test();
```

**Answer**: `a, c, b`
**Explanation**: sync code runs first, the `setTimeout` callback waits in the macrotask queue until the stack is empty.

```text
Call Stack              Macrotask Queue        Output
log('a')                                        a
setTimeout  ─────────►  [ log('b') ]
log('c')                                        c
(empty)     ◄─────────  run log('b')            b
```

---

### Question 4

```javascript
function test() {
  if (true) {
    let x = 1;
  }
  console.log(x);
}

test();
```

**Answer**: `ReferenceError: x is not defined`
**Explanation**: `x` is block-scoped (`let`) and doesn't exist outside the `if` block.

```text
function test ─────────────────────┐
│  if block ───────────┐           │
│  │  let x = 1   ✓    │           │
│  └───────────────────┘           │
│  console.log(x)   ✗ x not here   │
└──────────────────────────────────┘
```

---

### Question 5

```javascript
console.log('first');

setTimeout(() => {
  console.log('second');
});

new Promise(resolve => {
  resolve('Third');
}).then(console.log);

console.log('fourth');
```

**Answer**: `first, fourth, Third, second`
**Explanation**: Sync code runs first, `Promise.then` is a microtask (runs before macrotasks), `setTimeout` is a macrotask.

```text
Step   Call Stack           Microtask Queue    Macrotask Queue    Output
1      log('first')                                                first
2      setTimeout                               [second]
3      new Promise → then   [Third]             [second]
4      log('fourth')        [Third]             [second]           fourth
5      (empty) → drain ALL microtasks                              Third
6      (empty) → run ONE macrotask                                 second
```

---
