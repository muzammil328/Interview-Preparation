# Output Based Questions

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

---

## Event Loop and Async Order

Node.js priority order:

```text
Synchronous code  →  process.nextTick  →  Promise (microtasks)  →  Timers / I/O
```

### Example 1

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

### Example 2

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

### Example 3

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

### Example 4

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

---

## Type Coercion

```js
console.log(2 + '2'); // "22"
console.log(2 - '2'); // 0
```

`+` is overloaded — if one side is a string it does **concatenation**. `-` only works on numbers, so the string is converted to a number.

### More Examples

| Expression         | Output      | Reason                                  |
| ------------------ | ----------- | --------------------------------------- |
| `'5' * '2'`        | `10`        | `*` converts both to numbers            |
| `[] + []`          | `''`        | Both become empty strings               |
| `[] + {}`          | `'[object Object]'` | Array → `''`, object → `'[object Object]'` |
| `1 + true`         | `2`         | `true` → `1`                            |
| `'5' == 5`         | `true`      | `==` coerces types                      |
| `'5' === 5`        | `false`     | `===` compares type and value           |
| `null == undefined`| `true`      | Special rule in `==`                    |
| `null === undefined` | `false`   | Different types                         |
| `NaN === NaN`      | `false`     | `NaN` is never equal to itself          |
