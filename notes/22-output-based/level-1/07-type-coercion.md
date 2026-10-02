---
id: type-coercion
title: "Type Coercion"
sidebar_label: "Type Coercion"
sidebar_position: 7
description: "Type Coercion — Output Based interview notes."
---
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
