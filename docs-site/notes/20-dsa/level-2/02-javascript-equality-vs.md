---
id: javascript-equality-vs
title: "JavaScript Equality (== vs ===)"
sidebar_label: "JavaScript Equality (== vs ===)"
sidebar_position: 2
description: "JavaScript Equality (== vs ===) — DSA interview notes."
---
```text
a === b   →  same type?  ── no ──► false
                 │ yes
                 ▼
             same value? → true / false

a == b    →  same type?  ── yes ─► compare like ===
                 │ no
                 ▼
     null/undefined pair?  → true (only with each other)
     boolean involved?     → convert boolean to number, compare again
     object vs primitive?  → convert object to primitive ([] → "", {} → "[object Object]")
     string vs number?     → convert string to number, compare again
```

### Loose Equality (==) - Type Coercion

```javascript
// String to Number
console.log('5' == 5); // true (string "5" converts to number 5)

// Empty string to number
console.log('' == 0); // true ("" converts to 0)

// Null and undefined
console.log(null == undefined); // true (they are loosely equal)
console.log(null == 0); // false

// Array to primitive
console.log([] == ''); // true ([] converts to "", then "" == "")
console.log([] == 0); // true ([] converts to "", then "" converts to 0)
console.log([1] == 1); // true ([1] converts to "1", then to 1)

// Object to primitive
console.log({} == '[object Object]'); // true ({} converts to "[object Object]")
console.log({} == ''); // false ("[object Object]" !== "")

// Boolean to number
console.log(true == 1); // true
console.log(false == 0); // true
console.log(true == '1'); // true

// NaN
console.log(NaN == NaN); // false (NaN is not equal to anything)

// Mixed comparisons
console.log('hello' == 'hello'); // true
console.log('hello' == 'world'); // false
console.log(0 == false); // true
console.log(0 == null); // false
```

### Strict Equality (===) - No Type Coercion

```javascript
// Same value and same type
console.log(5 === 5); // true
console.log('5' === 5); // false (different types)
console.log('' === 0); // false

// Special values
console.log(null === undefined); // false
console.log(NaN === NaN); // false

// Objects
console.log({} === {}); // false (different references)
console.log([] === []); // false (different references)
```

```text
const a = {}      const b = {}
    │                 │
    ▼                 ▼
 [ object #1 ]    [ object #2 ]     a === b → false (different boxes)

const c = a
    │
    └──► [ object #1 ]               a === c → true (same box)
```

### Common Interview Questions

```javascript
// Question 1
console.log('' == []); // true
// [] converts to "" → "" == "" → true

// Question 2
console.log('' === []); // false
// Different types: string vs object

// Question 3
console.log(0 == ''); // true
// "" converts to 0 → true

// Question 4
console.log(0 == '0'); // true
// "0" converts to 0 → true

// Question 5
console.log(0 === '0'); // false
// Different types

// Question 6
console.log(null === null); // true
console.log(undefined === undefined); // true

// Question 7
console.log([] + []); // ""
console.log([] + {}); // "[object Object]"
console.log({} + []); // "[object Object]"
console.log({} + {}); // "[object Object][object Object]"

// Question 8
console.log([] == ![]); // true
// ![] is false, false converts to 0, [] converts to "" then 0 → true

// Question 9
console.log('2' + 2); // "22" (concatenation)
console.log('2' - 2); // 0 (subtraction forces number conversion)

// Question 10
console.log(+[]); // 0 (unary + converts to number)
console.log(+{}); // NaN
```

`[] == ![]` step by step:

```text
[] == ![]
[] == false        ! makes a boolean: [] is truthy → false
[] == 0            boolean → number
"" == 0            object → primitive
0  == 0            string → number
true
```

### Truthy and Falsy Values

```javascript
// Falsy values (false when converted to boolean)
console.log(Boolean(false)); // false
console.log(Boolean(0)); // false
console.log(Boolean(-0)); // false
console.log(Boolean(0n)); // false (BigInt zero)
console.log(Boolean('')); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false

// Truthy values (everything else)
console.log(Boolean('0')); // true
console.log(Boolean(' ')); // true
console.log(Boolean([])); // true (empty array is truthy!)
console.log(Boolean({})); // true (empty object is truthy!)

// Common mistakes
if ('') console.log('empty string'); // won't run
if ([]) console.log('empty array'); // will run! (array is truthy)
if ({}) console.log('empty object'); // will run! (object is truthy)
```

```text
FALSY (only these 8)                 TRUTHY (everything else)
┌──────────────────────────┐         ┌──────────────────────────┐
│ false  0  -0  0n  ""     │         │ "0"  " "  []  {}         │
│ null  undefined  NaN     │         │ -1  Infinity  () => {}   │
└──────────────────────────┘         └──────────────────────────┘
```

---
