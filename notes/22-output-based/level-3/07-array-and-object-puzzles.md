---
id: array-and-object-puzzles
title: "Array and Object Puzzles"
sidebar_label: "Array and Object Puzzles"
sidebar_position: 7
description: "Array and Object Puzzles — Output Based interview notes."
---
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
