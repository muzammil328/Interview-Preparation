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
