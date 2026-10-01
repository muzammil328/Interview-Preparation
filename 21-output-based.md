# Output Based Questions

How to read the trace diagrams:

- **Call Stack** — the code running right now.
- **Microtask Queue** — `Promise.then`, `await`, `queueMicrotask` (high priority, drained fully).
- **Macrotask Queue** — `setTimeout`, `setInterval`, I/O (one task at a time).
- **Output** — what has been printed so far.

---

## Hoisting and Scope

```js
console.log(a);
var a = 10;
```

**Output:** `undefined`

`var` is hoisted and initialized with `undefined`.

```js
console.log(b);
let b = 20;
```

**Output:** `ReferenceError: Cannot access 'b' before initialization`

`let` and `const` are hoisted too, but stay in the **Temporal Dead Zone** until the declaration runs.

```text
Creation phase (before any line runs)     Execution phase
┌──────────────────────────────┐
│ a → undefined   (var)        │  line 1: console.log(a) → undefined
│ b → <uninitialized> (TDZ)    │  line 1: console.log(b) → ReferenceError
└──────────────────────────────┘
          a = 10 / b = 20 only happens when that line executes
```

---

## Function Declaration vs var vs Function Expression Hoisting

```js
console.log(typeof foo);
var foo = 1;
function foo() {}
console.log(typeof foo);

console.log(typeof bar);
var bar = function () {};
```

**Output:** `function`, `number`, `undefined`

- Function declarations are hoisted **with their body**, and win over a `var` of the same name during hoisting.
- The assignment `foo = 1` happens later, at run time.
- A function **expression** assigned to `var` is hoisted like any `var` — only as `undefined`.

```text
Creation phase memory          Step                       Memory after
┌───────────────────────┐
│ foo → function foo()  │      typeof foo                 → "function"
│ bar → undefined       │      foo = 1                    foo → 1
└───────────────────────┘      typeof foo                 → "number"
                               typeof bar                 → "undefined"
                               bar = function () {}       bar → function
```

---

## Local var Shadows the Global

```js
var name = 'Global';
function greet() {
  console.log(name);
  var name = 'Local';
  console.log(name);
}
greet();
```

**Output:** `undefined`, `Local`

Many people expect `Global` first. But `var name` inside `greet` is hoisted to the top of **greet**, so the local `name` (still `undefined`) hides the global one.

```text
Global memory               greet() memory (creation phase)
┌────────────────────┐      ┌──────────────────────────┐
│ name → 'Global'    │      │ name → undefined          │ ◄── found here first,
└────────────────────┘      └──────────────────────────┘     global never checked

line 1: console.log(name) → undefined
line 2: name = 'Local'
line 3: console.log(name) → 'Local'
```

---

## Function Declaration Inside a Function

```js
var a = 1;
function b() {
  a = 10;
  return;
  function a() {}
}
b();
console.log(a);
```

**Output:** `1`

`function a() {}` is hoisted to the top of `b`, creating a **local** `a`. So `a = 10` changes the local one, and the global `a` stays `1`. The `return` doesn't matter — hoisting happens before any line runs.

```text
b() creation phase:   local a → function a() {}
b() runs:             a = 10   → changes LOCAL a  (function replaced by 10)
                      return
global:               a → 1    (never touched)
```

---

## Accidental Global: `var a = b = 5`

```js
(function () {
  var a = b = 5;
})();

console.log(typeof a);
console.log(typeof b);
```

**Output:** `undefined`, `number`

The line is read **right to left**: `b = 5` first (no `var`, so `b` becomes a **global**), then `var a = b` (a local).

```text
var a = b = 5;
        └─┬─┘
          1. b = 5      → b is not declared → creates global b  (sloppy mode)
  └──┬─┘
     2. var a = b       → a is local to the IIFE

After IIFE:  a → gone (local)   → typeof a = "undefined"
             b → 5 (global)     → typeof b = "number"
```

In strict mode, step 1 throws `ReferenceError: b is not defined`.

---

## TDZ When a Block Shadows a Variable

```js
let x = 1;
{
  console.log(x);
  let x = 2;
}
```

**Output:** `ReferenceError: Cannot access 'x' before initialization`

You might expect `1` from the outer scope. But the inner `let x` is hoisted to the top of the **block**, so the block has its own `x` that is still in the TDZ.

```text
Outer scope: x = 1
┌─ block ──────────────────────────────┐
│ x → <uninitialized> (TDZ)            │ ◄── lookup stops HERE
│ console.log(x)  → ReferenceError     │     (never reaches outer x = 1)
│ let x = 2                            │
└──────────────────────────────────────┘
```

---

## Closures in Loops

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```

**Output:** `3`, `3`, `3`

`var` is function-scoped, so all three callbacks share the **same** `i`. By the time the timers fire, the loop has finished and `i` is `3`.

**Fix:** use `let`, which creates a new binding per iteration.

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// 0, 1, 2
```

```text
var — ONE shared box                 let — a NEW box per iteration

  cb1 ─┐                               cb1 ──► [ i = 0 ]
  cb2 ─┼──► [ i ]  0 → 1 → 2 → 3        cb2 ──► [ i = 1 ]
  cb3 ─┘                               cb3 ──► [ i = 2 ]

After 1s every callback reads i = 3   After 1s each reads its own box
Output: 3 3 3                          Output: 0 1 2
```

**Fix without `let` (often asked as a follow-up):** wrap the body in an IIFE so each iteration gets its own copy.

```js
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => console.log(j), 0);
  })(i);
}
// 0, 1, 2
```

```text
iteration 0 → IIFE(0) → new scope { j = 0 } ◄── cb1
iteration 1 → IIFE(1) → new scope { j = 1 } ◄── cb2
iteration 2 → IIFE(2) → new scope { j = 2 } ◄── cb3
```

---

## Closure Counter

```js
function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counterA = createCounter();
const counterB = createCounter();

console.log(counterA());
console.log(counterA());
console.log(counterB());
```

**Output:** `1`, `2`, `1`

Each call to `createCounter()` creates a **new** `count` variable. The returned function keeps a reference to its own one.

```text
createCounter() #1               createCounter() #2
┌──────────────────┐            ┌──────────────────┐
│ count: 0 → 1 → 2 │◄─counterA  │ count: 0 → 1     │◄─counterB
└──────────────────┘            └──────────────────┘

counterA() → 1    counterA() → 2    counterB() → 1   (separate memory)
```

---

## `this` — Regular Method vs Arrow Function

```js
const user = {
  username: 'Ali',
  regular() {
    return this.username;
  },
  arrow: () => {
    return this.username;
  },
  nested() {
    return [1].map(() => this.username)[0];
  },
};

console.log(user.regular());
console.log(user.arrow());
console.log(user.nested());

const detached = user.regular;
console.log(detached());
```

**Output:** `Ali`, `undefined`, `Ali`, `undefined`

| Call               | `this` is                                    | Result      |
| ------------------ | -------------------------------------------- | ----------- |
| `user.regular()`   | `user` (object before the dot)               | `Ali`       |
| `user.arrow()`     | Outer scope `this` (global / module), not `user` | `undefined` |
| `user.nested()`    | Arrow inherits `this` from `nested` → `user` | `Ali`       |
| `detached()`       | No object before the dot → global (or `undefined` in strict mode, which throws) | `undefined` |

```text
Regular function: `this` is decided at CALL time   → look left of the dot
Arrow function:   `this` is decided at WRITE time  → copy it from the enclosing scope

user.regular()     user ◄── dot ── regular()          this = user
user.arrow()       arrow written at top level         this = global/module
user.nested()      nested(): this = user
                     └── arrow inside copies it      this = user
detached()         nothing left of the call           this = global/undefined
```

---

## `this` Inside setTimeout

```js
const obj = {
  name: 'Ali',
  regular() {
    setTimeout(function () {
      console.log(this.name);
    }, 0);
  },
  arrow() {
    setTimeout(() => console.log(this.name), 0);
  },
};

obj.regular();
obj.arrow();
```

**Output (Node):** `undefined`, `Ali`
**Output (browser):** `''` (empty line), `Ali` — `window.name` exists and is an empty string by default.

The regular callback is called **later by the timer**, not by `obj`, so it loses `this`. The arrow callback copies `this` from `arrow()`, where it is `obj`.

```text
obj.regular()  this = obj
   └─ setTimeout(function () {...})
          later the TIMER calls it:  callback()   ← nothing before the dot
          this = Timeout object (Node) / window (browser) → this.name = undefined / ''

obj.arrow()    this = obj
   └─ setTimeout(() => {...})
          arrow has no own this → uses arrow()'s this = obj → 'Ali'
```

**Old-school fix:** `const self = this;` before the timer, or `.bind(this)`.

---

## bind Twice

```js
function show() {
  return this.name;
}
const a = show.bind({ name: 'A' });
const b = a.bind({ name: 'B' });
console.log(b());
```

**Output:** `A`

A bound function's `this` is **locked forever**. Binding it again creates a new wrapper, but the inner function still uses the first `this`.

```text
b() ──► wrapper(this = B) ──► a ──► wrapper(this = A) ──► show()   this = A ✓
                                    └── first bind wins
```

---

## call / bind on an Arrow Function

```js
const arrow = () => this;
const regular = function () {
  return this;
};
const obj = { id: 1 };

console.log(regular.call(obj) === obj);
console.log(arrow.call(obj) === obj);
```

**Output:** `true`, `false`

Arrow functions have **no own `this`**, so `call`, `apply`, and `bind` cannot change it. It always comes from where the arrow was written.

```text
regular.call(obj)  → this = obj               ✓ changed
arrow.call(obj)    → obj is ignored
                     this = outer scope's this ✗ not changed
```

---

## Class Method Passed as a Callback

```js
class Counter {
  count = 0;
  inc() {
    this.count++;
    return this.count;
  }
}

const c = new Counter();
const fn = c.inc;
fn();
```

**Output:** `TypeError: Cannot read properties of undefined (reading 'count')`

Class bodies are always in **strict mode**, so a detached method gets `this = undefined` (not the global object). This is the same bug as `onClick={this.handleClick}` in old React class components.

```text
c.inc()   → this = c          → works
fn()      → this = undefined  → undefined.count → TypeError
```

**Fixes:** `c.inc.bind(c)`, `() => c.inc()`, or define it as an arrow field: `inc = () => { ... }`.

---

## Event Loop and Async Order

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

```text
Step | Call Stack            | Microtask Queue | Macrotask Queue | Output
─────┼───────────────────────┼─────────────────┼─────────────────┼────────────
 1   | console.log('1')      |                 |                 | 1
 2   | setTimeout(...)       |                 | [log 2]         | 1
 3   | Promise.then(...)     | [log 3]         | [log 2]         | 1
 4   | console.log('4')      | [log 3]         | [log 2]         | 1 4
 5   | (empty) → drain micro |                 | [log 2]         | 1 4 3
 6   | run ONE macrotask     |                 |                 | 1 4 3 2
```

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

```text
Step | Call Stack   | nextTick Queue | Promise Queue | Timer Queue | Output
─────┼──────────────┼────────────────┼───────────────┼─────────────┼───────────
 1   | log("A")     |                |               |             | A
 2   | nextTick     | [B]            |               |             | A
 3   | Promise.then | [B]            | [C]           |             | A
 4   | setTimeout   | [B]            | [C]           | [D]         | A
 5   | log("E")     | [B]            | [C]           | [D]         | A E
 6   | (empty)      |                | [C]           | [D]         | A E B
 7   |              |                |               | [D]         | A E B C
 8   |              |                |               |             | A E B C D
```

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

## Promise.all vs Promise.race

```js
const slow = new Promise((resolve) => setTimeout(() => resolve('slow'), 200));
const fast = new Promise((resolve) => setTimeout(() => resolve('fast'), 100));

Promise.all([slow, fast]).then((values) => console.log('all', values));
Promise.race([slow, fast]).then((value) => console.log('race', value));
Promise.all([slow, Promise.reject('err')]).catch((error) => console.log('catch', error));
```

**Output:**

```text
catch err
race fast
all [ 'slow', 'fast' ]
```

- `Promise.all` waits for **every** promise and keeps the **input order**, not the finish order.
- `Promise.all` rejects **immediately** when any promise rejects.
- `Promise.race` settles with the **first** promise to settle (resolve or reject).

```text
time  0ms ─────────── 100ms ─────────── 200ms
       │                │                 │
reject ●  → all(...reject) catches "err"  │
fast   ─────────────────● → race = "fast" │
slow   ───────────────────────────────────● → all = ['slow', 'fast']
                                               (input order, not finish order)
```

---

## Promise Puzzles

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

## Object Reference Mutation

```js
const a = { value: 1 };
const b = a;
b.value = 2;
console.log(a.value);

let x = 1;
let y = x;
y = 2;
console.log(x);
```

**Output:** `2`, `1`

Objects are copied **by reference** — `a` and `b` point to the same object. Primitives are copied **by value**.

```text
Objects (reference)                    Primitives (value)

 a ──┐                                  x ──► [ 1 ]
     ├──► { value: 1 → 2 }              y ──► [ 1 → 2 ]   (separate copy)
 b ──┘

a.value → 2                             x → 1
```

---

## Spread Is a Shallow Copy

```js
const original = { name: 'Ali', address: { city: 'Lahore' } };
const copy = { ...original };

copy.name = 'Sara';
copy.address.city = 'Karachi';

console.log(original.name);
console.log(original.address.city);
```

**Output:** `Ali`, `Karachi`

Spread copies only the **top level**. Nested objects are still shared. Use `structuredClone()` for a deep copy.

```text
original ──► { name: 'Ali',  address: ─┐ }
                                       ├──► { city: 'Lahore' → 'Karachi' }
copy     ──► { name: 'Sara', address: ─┘ }

name    → copied (separate)       address → shared reference
```

---

## Object Keys and Reference Overwriting

```js
const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
```

**Output:** `456`

Object keys are always **strings** (or symbols). Both `b` and `c` are converted with `toString()` to the same key `"[object Object]"`, so the second assignment overwrites the first.

```js
console.log(a); // { '[object Object]': 456 }
```

**Fix:** use a `Map`, which allows object references as real keys.

```js
const m = new Map();
m.set(b, 123);
m.set(c, 456);
console.log(m.get(b)); // 123
```

```text
a[b] = 123   b.toString() → "[object Object]"   a = { "[object Object]": 123 }
a[c] = 456   c.toString() → "[object Object]"   a = { "[object Object]": 456 }  ← overwritten
a[b]         b.toString() → "[object Object]"   → 456
```

---

## Array and Object Puzzles

### `['1', '2', '3'].map(parseInt)`

```js
console.log(['1', '2', '3'].map(parseInt));
```

**Output:** `[1, NaN, NaN]`

`map` passes **three** arguments: `(value, index, array)`. `parseInt` takes `(string, radix)`, so the index is used as the radix (number base).

```text
map calls             parseInt(string, radix)     result
parseInt('1', 0)      radix 0 → treated as 10     1
parseInt('2', 1)      radix 1 → invalid base      NaN
parseInt('3', 2)      base 2 only has 0 and 1     NaN
```

**Fix:** `['1', '2', '3'].map(Number)` or `.map((s) => parseInt(s, 10))`.

### Array length and Holes

```js
const arr = [1, 2, 3];
arr[5] = 6;
console.log(arr.length);
console.log(arr);

arr.length = 2;
console.log(arr);

const d = [1, 2, 3];
delete d[1];
console.log(d, d.length);
```

**Output:**

```text
6
[ 1, 2, 3, <2 empty items>, 6 ]
[ 1, 2 ]
[ 1, <1 empty item>, 3 ] 3
```

```text
arr[5] = 6        index: 0  1  2  3  4  5
                         1  2  3  _  _  6     length = last index + 1 = 6

arr.length = 2           1  2                 everything after is DELETED

delete d[1]              1  _  3              leaves a hole, length stays 3
                                              (use splice to really remove)
```

### Strings Are Immutable

```js
let str = 'hello';
str[0] = 'H';
console.log(str);
```

**Output:** `hello`

Strings can't be changed in place; the assignment is silently ignored (a `TypeError` in strict mode). Create a new string instead: `str = 'H' + str.slice(1)`.

```text
'hello'  ── str[0] = 'H' ──► ✗ ignored ──► 'hello'
'hello'  ── 'H' + 'ello'  ──► new string ──► 'Hello'
```

### JSON.stringify Drops Values

```js
console.log(
  JSON.stringify({
    a: 1,
    b: undefined,
    c: () => {},
    d: null,
    e: NaN,
    f: new Date(0),
  })
);
```

**Output:** `{"a":1,"d":null,"e":null,"f":"1970-01-01T00:00:00.000Z"}`

| Value | Becomes |
| ----- | ------- |
| `undefined`, functions, symbols | **Removed** from objects |
| `NaN`, `Infinity` | `null` |
| `Date` | ISO string (not a Date again after `JSON.parse`) |

This is why `JSON.parse(JSON.stringify(obj))` is a risky deep copy.

```text
{ a:1, b:undefined, c:fn, d:null, e:NaN, f:Date }
        ✗ removed  ✗ removed    → null  → "1970-..."
```

### Object.freeze Is Shallow

```js
const cfg = Object.freeze({ port: 80, db: { host: 'a' } });
cfg.port = 3000;
cfg.db.host = 'b';
console.log(cfg.port, cfg.db.host);
```

**Output:** `80 b`

```text
cfg  🔒 { port: 80,  db: ─┐ }      top level frozen   → port change ignored
                          └──► { host: 'a' → 'b' }  nested NOT frozen → changed
```

### Default sort()

```js
console.log([10, 1, 5, 100].sort());
```

**Output:** `[1, 10, 100, 5]`

Without a compare function, `sort()` converts items to **strings** and sorts them alphabetically. `"100"` comes before `"5"` because `"1" < "5"`.

```text
as strings:  "10"  "1"  "5"  "100"
sorted:      "1"   "10" "100" "5"        ✗
fix:         .sort((a, b) => a - b)  →  [1, 5, 10, 100]   ✓
```

---

## typeof Quirks

```js
console.log(typeof null);
console.log(typeof []);
console.log(typeof function () {});
console.log(typeof NaN);
console.log(typeof undefined);
console.log(typeof notDeclared);
```

**Output:** `object`, `object`, `function`, `number`, `undefined`, `undefined`

| Expression            | Output        | Why                                                     |
| --------------------- | ------------- | ------------------------------------------------------- |
| `typeof null`         | `"object"`    | A bug from the first version of JS, kept for compatibility |
| `typeof []`           | `"object"`    | Arrays are objects — use `Array.isArray()`              |
| `typeof function(){}` | `"function"`  | Functions are callable objects with their own tag        |
| `typeof NaN`          | `"number"`    | NaN is a special numeric value                          |
| `typeof notDeclared`  | `"undefined"` | `typeof` is the one place an undeclared name does not throw |

```text
             typeof value
                  │
   ┌──────────────┼───────────────┐
primitive?     function?       everything else
   │              │                 │
"string"      "function"        "object"
"number" (incl. NaN)            ├── {}  []  new Date()
"boolean"                        └── null  ← historical bug
"undefined"
"bigint" "symbol"
```

---

## Type Coercion

```js
console.log(2 + '2'); // "22"
console.log(2 - '2'); // 0
```

`+` is overloaded — if one side is a string it does **concatenation**. `-` only works on numbers, so the string is converted to a number.

```text
'5' + 3                     '5' - 3
   │                           │
one side is a string?        `-` only does math
   │ yes                       │
3 → '3'                      '5' → 5
   │                           │
'5' + '3' = "53"             5 - 3 = 2
```

### `[] == ![]`

```js
console.log([] == ![]);
```

**Output:** `true`

```text
[] == ![]
       │  ![] → false  (an array is truthy, so NOT gives false)
[] == false
       │  boolean → number: false → 0
[] == 0
 │  object → primitive: [].toString() → ''
'' == 0
 │  string → number: '' → 0
0 == 0  →  true
```

### More Examples

| Expression         | Output      | Reason                                  |
| ------------------ | ----------- | --------------------------------------- |
| `'5' + 3`          | `'53'`      | String wins with `+`                    |
| `'5' - 3`          | `2`         | `-` converts to numbers                 |
| `'5' * '2'`        | `10`        | `*` converts both to numbers            |
| `true + true`      | `2`         | `true` → `1`                            |
| `[1, 2] + [3]`     | `'1,23'`    | Arrays → `'1,2'` and `'3'`, then concatenated |
| `[] + []`          | `''`        | Both become empty strings               |
| `[] + {}`          | `'[object Object]'` | Array → `''`, object → `'[object Object]'` |
| `1 + true`         | `2`         | `true` → `1`                            |
| `'5' == 5`         | `true`      | `==` coerces types                      |
| `'5' === 5`        | `false`     | `===` compares type and value           |
| `null == undefined`| `true`      | Special rule in `==`                    |
| `null === undefined` | `false`   | Different types                         |
| `NaN === NaN`      | `false`     | `NaN` is never equal to itself          |

### `'b' + 'a' + +'a' + 'a'`

```js
console.log('b' + 'a' + +'a' + 'a');
```

**Output:** `baNaNa`

```text
'b' + 'a' + (+'a') + 'a'
              │
              unary + converts 'a' to a number → NaN
'ba' + NaN  → 'baNaN'
'baNaN' + 'a' → 'baNaNa'
```

### `1 < 2 < 3` vs `3 > 2 > 1`

```js
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
```

**Output:** `true`, `false`

Comparisons run **left to right**, and the first result is a boolean.

```text
1 < 2 < 3              3 > 2 > 1
(1 < 2) → true         (3 > 2) → true
true < 3               true > 1
1 < 3 → true           1 > 1 → false
```

### `null` Comparisons

```js
console.log(null == 0);
console.log(null > 0);
console.log(null >= 0);
```

**Output:** `false`, `false`, `true`

`==` has a special rule (`null` only equals `undefined`), but `>` and `>=` convert `null` to the number `0`.

```text
null == 0   → special rule: null == only undefined → false
null >  0   → Number(null) = 0 → 0 > 0  → false
null >= 0   → Number(null) = 0 → 0 >= 0 → true
```

### More Tricky Values

```js
console.log(Math.max(), Math.min());
console.log([NaN].includes(NaN), [NaN].indexOf(NaN));
console.log(typeof typeof 1);
console.log(0.1 + 0.2 === 0.3);
```

**Output:**

```text
-Infinity Infinity
true -1
string
false
```

| Expression | Output | Why |
| ---------- | ------ | --- |
| `Math.max()` | `-Infinity` | Starting point for "find the max" — any number beats it |
| `Math.min()` | `Infinity` | Starting point for "find the min" |
| `[NaN].includes(NaN)` | `true` | `includes` uses SameValueZero, which treats NaN as equal |
| `[NaN].indexOf(NaN)` | `-1` | `indexOf` uses `===`, and `NaN !== NaN` |
| `typeof typeof 1` | `'string'` | `typeof 1` is `'number'` (a string) → `typeof 'number'` |
| `0.1 + 0.2 === 0.3` | `false` | Floating point: `0.1 + 0.2` is `0.30000000000000004` |

```text
typeof typeof 1
         └─ typeof 1 → "number"
typeof "number"      → "string"
```

---

# React Output Questions

These are asked in React interviews as "what happens when I click the button?". The answers assume React 18+ and a production build unless StrictMode is mentioned.

## setState Twice in One Click

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  }

  return <button onClick={handleClick}>{count}</button>;
}
```

**After one click — logs:** `0` **and the button shows:** `1`

- `count` is a **snapshot** for this render. Both calls are `setCount(0 + 1)`.
- `setCount` doesn't change `count` immediately, so the log still prints `0`.

```text
Render #1: count = 0 (snapshot)
  click → setCount(0 + 1)  queue: [1]
          setCount(0 + 1)  queue: [1, 1]   ← same value twice
          console.log(0)
Render #2: count = 1
```

**Fix — use the updater function:**

```jsx
setCount((c) => c + 1);
setCount((c) => c + 1);
// button shows 2
```

```text
queue: [c => c + 1, c => c + 1]
0 → 1 → 2   each updater receives the LATEST value
```

## Parent and Child Effect Order

```jsx
function Child() {
  console.log('Child render');
  useEffect(() => {
    console.log('Child effect');
  }, []);
  return null;
}

function Parent() {
  console.log('Parent render');
  useEffect(() => {
    console.log('Parent effect');
  }, []);
  return <Child />;
}
```

**Output:** `Parent render`, `Child render`, `Child effect`, `Parent effect`

Rendering goes **top-down**; effects run **bottom-up** after everything is committed to the DOM (the child must be ready before the parent).

```text
RENDER (top-down)          COMMIT to DOM          EFFECTS (bottom-up)
Parent render ──► Child render ──► DOM updated ──► Child effect ──► Parent effect
```

## Effect Cleanup Order When a Dependency Changes

```jsx
function Profile({ id }) {
  useEffect(() => {
    console.log('effect', id);
    return () => console.log('cleanup', id);
  }, [id]);
  return null;
}
// id changes 1 → 2, then the component unmounts
```

**Output:** `effect 1`, `cleanup 1`, `effect 2`, `cleanup 2`

The cleanup sees the **old** `id`, because it belongs to the old effect.

```text
mount (id=1)      → effect 1
id changes to 2   → cleanup 1  (old effect's closure)
                  → effect 2
unmount           → cleanup 2
```

## StrictMode in Development

```jsx
<StrictMode>
  <Profile id={1} />
</StrictMode>
```

**Output on mount (dev only):** `effect 1`, `cleanup 1`, `effect 1`

In development, StrictMode mounts, unmounts, and re-mounts each component once, to show you effects that are missing a cleanup. Components also render twice. This does **not** happen in production.

```text
DEV + StrictMode:   mount → effect 1 → (simulated unmount) cleanup 1 → mount again → effect 1
Production:         mount → effect 1
```

## Stale Closure in setInterval

```jsx
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>{count}</p>;
}
```

**Output:** shows `1` after one second, then **stays at `1` forever**.

The effect runs once (`[]`), so the interval callback closes over the **first** render's `count = 0`. Every tick sets `0 + 1`.

```text
Render #1: count = 0
  effect creates interval ──► callback remembers count = 0 (forever)
tick 1: setCount(0 + 1) → 1
tick 2: setCount(0 + 1) → 1   ← still sees 0
tick 3: setCount(0 + 1) → 1
```

**Fix:** `setCount((c) => c + 1)`, which doesn't need `count` from the closure.

---

# Rarely Asked (Lower Priority)

## Nested process.nextTick (Node)

```js
process.nextTick(() => {
  console.log("A");
  process.nextTick(() => {
    console.log("B");
  });
});
Promise.resolve().then(() => console.log("C"));
console.log("D");
```

**Output:** `D`, `A`, `B`, `C`

| Phase                     | Output |
| ------------------------- | ------ |
| Synchronous (console)     | D      |
| nextTick                  | A, B   |
| Microtasks (Promise)      | C      |

**Sync → nextTick → Promise**

The nextTick queue is fully drained first — including tick callbacks added **inside** a tick callback — before promises run.

```text
Step | Call Stack        | nextTick Queue | Promise Queue | Output
─────┼───────────────────┼────────────────┼───────────────┼─────────
 1   | nextTick(cbA)     | [A]            |               |
 2   | Promise.then      | [A]            | [C]           |
 3   | log("D")          | [A]            | [C]           | D
 4   | run A → log("A")  |                | [C]           | D A
 5   |   A queues tick B | [B]            | [C]           | D A
 6   | run B             |                | [C]           | D A B    ← tick queue drained first
 7   | run C             |                |               | D A B C
```
