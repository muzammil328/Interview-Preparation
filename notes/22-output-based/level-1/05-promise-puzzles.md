---
id: promise-puzzles
title: "Promise Puzzles"
sidebar_label: "Promise Puzzles"
sidebar_position: 5
description: "Promise Puzzles — Output Based interview notes."
---
### The Promise Executor Runs Synchronously

```js
console.log('A');
const p = new Promise((resolve) => {
  console.log('B');
  resolve('C');
  console.log('D');
});
p.then((v) => console.log(v));
console.log('E');
```

**Output:** `A`, `B`, `D`, `E`, `C`

- The function passed to `new Promise` runs **immediately**.
- `resolve()` does **not** stop the function — `D` still prints.
- Only the `.then` callback is async (a microtask).

```text
Step | Call Stack               | Microtask Queue | Output
─────┼──────────────────────────┼─────────────────┼───────────
 1   | log('A')                 |                 | A
 2   | executor → log('B')      |                 | A B
 3   | resolve('C')             |                 |               (promise now fulfilled)
 4   | log('D')                 |                 | A B D
 5   | p.then(...)              | [log C]         |               (already fulfilled → queue now)
 6   | log('E')                 | [log C]         | A B D E
 7   | drain micro              |                 | A B D E C
```

### resolve Twice, Then reject

```js
new Promise((resolve, reject) => {
  resolve(1);
  resolve(2);
  reject('err');
})
  .then((v) => console.log(v))
  .catch((e) => console.log('catch', e));
```

**Output:** `1`

A promise settles **only once**. After the first `resolve(1)`, every later `resolve` / `reject` is silently ignored.

```text
pending ──resolve(1)──► fulfilled(1)   🔒 locked
                         resolve(2)  → ignored
                         reject(err) → ignored
```

### then Without return

```js
Promise.resolve(1)
  .then((v) => {
    v * 2;
  })
  .then((v) => console.log(v));
```

**Output:** `undefined`

With curly braces you must write `return`. The first `.then` returns nothing, so the next one receives `undefined`.

```text
.then(v => { v * 2; })   → returns undefined ──► next .then(v) → v = undefined
.then(v => v * 2)        → returns 2         ──► next .then(v) → v = 2   (implicit return)
```

### Error in a Chain

```js
Promise.resolve(1)
  .then((v) => {
    console.log(v);
    return v + 1;
  })
  .then((v) => {
    console.log(v);
    throw new Error('fail');
  })
  .then((v) => console.log('skipped', v))
  .catch((e) => {
    console.log(e.message);
    return 10;
  })
  .then((v) => console.log(v));
```

**Output:** `1`, `2`, `fail`, `10`

- A `throw` jumps over every `.then` until the next `.catch`.
- `.catch` returns a **normal (fulfilled)** promise, so the chain **continues** after it.

```text
.then  log 1, return 2        ✓
.then  log 2, throw           ✗ ──┐
.then  'skipped'                  │ jumped over
.catch log 'fail', return 10  ◄───┘ recovered ✓
.then  log 10
```

### finally Passes the Value Through

```js
Promise.resolve('data')
  .finally(() => {
    console.log('cleanup');
    return 'ignored';
  })
  .then((v) => console.log(v));
```

**Output:** `cleanup`, `data`

`.finally` receives no value, and whatever it returns is **ignored** — the original value passes straight through. (Only a `throw` inside `finally` changes the result.)

```text
'data' ──► finally(cleanup) ──► 'data' ──► then(v) → 'data'
               return 'ignored' ✗ dropped
```

### Logging an async Function Call

```js
async function getNum() {
  return 5;
}
console.log(getNum());
getNum().then((n) => console.log(n));
```

**Output:** `Promise { 5 }`, `5`

An `async` function **always** returns a promise, even when you `return` a plain value. In the browser console it shows as `Promise {<fulfilled>: 5}`.

```text
return 5   ──async wraps it──►   Promise { 5 }
To get 5:  await getNum()   or   getNum().then(n => ...)
```

### await Inside forEach

```js
const wait = (ms) => new Promise((r) => setTimeout(() => r(ms), ms));

async function run() {
  [300, 100, 200].forEach(async (ms) => {
    const v = await wait(ms);
    console.log(v);
  });
  console.log('done');
}
run();
```

**Output:** `done`, `100`, `200`, `300`

`forEach` does not wait for async callbacks. It starts all three, ignores the promises they return, and moves on. Each one then finishes by its own timer.

```text
forEach starts cb(300), cb(100), cb(200)  → returns immediately
log 'done'
  100ms → 100
  200ms → 200
  300ms → 300
```

**Fix — run in order with `for...of`:**

```js
for (const ms of [300, 100, 200]) {
  const v = await wait(ms);
  console.log(v);
}
console.log('done');
// 300, 100, 200, done
```

Or run in parallel and wait for all: `await Promise.all(list.map(wait))`.

### try/catch Around setTimeout

```js
try {
  setTimeout(() => {
    throw new Error('boom');
  }, 0);
} catch (e) {
  console.log('caught', e.message);
}
console.log('after');
```

**Output:** `after`, then **uncaught** `Error: boom` (crashes the Node process)

By the time the timer callback runs, the `try` block has already finished and is gone from the call stack. The same happens with a promise you don't `await`.

```text
Call stack when try runs          Call stack when callback runs (later)
┌────────────────────┐            ┌────────────────────┐
│ try { setTimeout } │            │ timer callback     │ throw → nobody to catch it
└────────────────────┘            └────────────────────┘
 try/catch finished ✓              try/catch no longer exists ✗
```

**Fix:** put the `try/catch` **inside** the callback, or use `await` on a promise inside a `try`.

---
