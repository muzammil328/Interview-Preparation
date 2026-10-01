# DSA Interview

---

## Big-O Basics

Big-O describes how the running time (or memory) **grows** as the input size `n` grows. Constants are dropped: `O(2n)` is just `O(n)`.

| Big-O        | Name         | Example                                   | n = 1,000 → steps |
| ------------ | ------------ | ----------------------------------------- | ----------------- |
| `O(1)`       | Constant     | `arr[i]`, `map.get(key)`                  | 1                 |
| `O(log n)`   | Logarithmic  | Binary search                             | ~10               |
| `O(n)`       | Linear       | One loop over the array                   | 1,000             |
| `O(n log n)` | Linearithmic | `arr.sort()`, merge sort                  | ~10,000           |
| `O(n²)`      | Quadratic    | Nested loops over the same array          | 1,000,000         |
| `O(2ⁿ)`      | Exponential  | Naive recursive Fibonacci                 | too many          |

```text
steps
  ▲                                   O(n²)
  │                                 /
  │                              /
  │                          /        O(n log n)
  │                     /       ___/
  │                /     ___/         O(n)
  │           / ___/ ___/
  │      /___/__/________________     O(log n)
  │  /__/____________________________ O(1)
  └──────────────────────────────────► n
```

**Quick rules:**

- One loop → `O(n)`. Two nested loops over the same data → `O(n²)`.
- Halving the input each step → `O(log n)`.
- Two separate loops one after another → `O(n + n)` = `O(n)`.
- **Space complexity** counts extra memory you create (a new array, a `Map`, the recursion stack).

### Common Data Structure Operations

| Structure      | Access   | Search   | Insert                  | Delete                  |
| -------------- | -------- | -------- | ----------------------- | ----------------------- |
| Array          | `O(1)`   | `O(n)`   | `O(1)` at end, `O(n)` at start | `O(1)` at end, `O(n)` at start |
| Object / Map / Set | —    | `O(1)` average | `O(1)` average    | `O(1)` average          |
| Linked List    | `O(n)`   | `O(n)`   | `O(1)` at head          | `O(1)` at head          |
| Stack / Queue  | —        | `O(n)`   | `O(1)`                  | `O(1)`                  |
| Balanced BST   | —        | `O(log n)` | `O(log n)`            | `O(log n)`              |

---

## Event Loop & Async - Output Questions

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

## JavaScript Equality (== vs ===)

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

## Array Problems

### Find Even and Odd Numbers

```javascript
let arr = [1, 2, 3, 4, 5, 6];

// Even
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    console.log(arr[i]);
  }
}
// Output: 2, 4, 6

// Odd
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 !== 0) {
    console.log(arr[i]);
  }
}
// Output: 1, 3, 5

// One-liners
arr.filter(n => n % 2 === 0); // [2, 4, 6]
arr.filter(n => n % 2 !== 0); // [1, 3, 5]
```

```text
value   1   2   3   4   5   6
n % 2   1   0   1   0   1   0
        odd even odd even odd even
```

**Time:** O(n) — **Space:** O(1) for the loop, O(n) for `filter`

---

### Remove Negative Numbers

```javascript
let arr = [1, -2, 3, -4, 5];
let result = [];

for (let i = 0; i < arr.length; i++) {
  if (arr[i] >= 0) {
    result.push(arr[i]);
  }
}

console.log(result);
// Output: [1, 3, 5]

// One-liner
arr.filter(n => n >= 0); // [1, 3, 5]
```

```text
arr      [ 1, -2,  3, -4,  5 ]
keep?      ✓   ✗   ✓   ✗   ✓
result   [ 1,      3,      5 ]
```

**Time:** O(n) — **Space:** O(n)

---

### Find Minimum and Maximum in an Array

```javascript
const numbers = [14, 58, 2, 99, 43, -5];

console.log(Math.max(...numbers)); // 99
console.log(Math.min(...numbers)); // -5
```

**Warning:** spreading fails with a "Maximum call stack size exceeded" error on very large arrays (roughly 100k+ items), because each element becomes a function argument. Use a loop or `reduce` instead:

```javascript
function minMax(arr) {
  let min = arr[0];
  let max = arr[0];

  for (const num of arr) {
    if (num < min) min = num;
    if (num > max) max = num;
  }
  return { min, max };
}

console.log(minMax(numbers)); // { min: -5, max: 99 }
```

```text
num     14   58    2   99   43   -5
min     14   14    2    2    2   -5
max     14   58   58   99   99   99
```

**Time:** O(n) — **Space:** O(1)

---

### Reverse an Array

```javascript
// In place (mutates the original)
const original = ['a', 'b', 'c', 'd'];
original.reverse();
console.log(original); // ['d', 'c', 'b', 'a']

// Without mutating
const arr = ['a', 'b', 'c', 'd'];
const reversed = [...arr].reverse(); // or arr.toReversed() in ES2023
console.log(arr);      // ['a', 'b', 'c', 'd']
console.log(reversed); // ['d', 'c', 'b', 'a']

// Manual two pointer
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}
```

```text
[ a, b, c, d ]
  L        R     swap a ↔ d
[ d, b, c, a ]
     L  R        swap b ↔ c
[ d, c, b, a ]
     R  L        L >= R → stop
```

**Time:** O(n) — **Space:** O(1)

---

### Remove Duplicates from Array

```javascript
const arr = [1, 2, 2, 3, 4, 4, 5];

// Method 1: Using Set — O(n), the answer interviewers expect first
const unique1 = [...new Set(arr)];
console.log(unique1); // [1, 2, 3, 4, 5]

// Method 2: Using filter — O(n²), indexOf scans the array each time
const unique2 = arr.filter((item, index) => arr.indexOf(item) === index);
console.log(unique2); // [1, 2, 3, 4, 5]

// Method 3: Using for loop — O(n²), includes scans the result each time
const unique3 = [];
for (const item of arr) {
  if (!unique3.includes(item)) {
    unique3.push(item);
  }
}
console.log(unique3); // [1, 2, 3, 4, 5]
```

```text
arr    1   2   2   3   4   4   5
Set   {1} {1,2} skip {1,2,3} {1,2,3,4} skip {1,2,3,4,5}
```

---

### Remove Duplicates In Place (Two Pointers)

This is the version interviewers ask for when extra memory is not allowed.

```javascript
function removeDuplicatesInPlace(arr) {
  if (arr.length === 0) return arr;

  // 1. Sort the array first
  arr.sort((a, b) => a - b);

  // 2. Shift unique elements to the front
  let writePointer = 1;

  for (let readPointer = 1; readPointer < arr.length; readPointer++) {
    if (arr[readPointer] !== arr[readPointer - 1]) {
      arr[writePointer] = arr[readPointer];
      writePointer++;
    }
  }

  // 3. Trim the array to its new length
  arr.length = writePointer;
  return arr;
}

const nums = [3, 1, 2, 3, 4, 1, 2];
console.log(removeDuplicatesInPlace(nums)); // [1, 2, 3, 4]
```

```text
sorted   [ 1, 1, 2, 2, 3, 3, 4 ]
            W  R                    1 == 1 → skip
            W     R                 2 != 1 → arr[1] = 2, W++
         [ 1, 2, 2, 2, 3, 3, 4 ]
               W     R              2 == 2 → skip
               W        R           3 != 2 → arr[2] = 3, W++
               ...
final    [ 1, 2, 3, 4 | 3, 3, 4 ]  → trim at W = 4 → [1, 2, 3, 4]
```

**Time:** O(n log n) because of the sort — **Space:** O(1)

**Trade-off:** this changes the original array and loses the original order.

---

### Find All Duplicates in an Array

Use one `Set` to track what you have seen and another for the duplicates.

```javascript
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();

  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }
  return Array.from(duplicates);
}

const numbers = [1, 2, 3, 2, 4, 5, 1, 6, 1];
console.log(findDuplicates(numbers)); // [2, 1]
```

```text
item   seen                 duplicates
1      {1}                  {}
2      {1,2}                {}
3      {1,2,3}              {}
2      {1,2,3}              {2}
4      {1,2,3,4}            {2}
5      {1,2,3,4,5}          {2}
1      {1,2,3,4,5}          {2,1}
6      {1,2,3,4,5,6}        {2,1}
1      {1,2,3,4,5,6}        {2,1}   already there, not added twice
```

**Time:** O(n) — **Space:** O(n)

A second `Set` is needed so a value appearing three times is not reported twice.

---

### Find the First Duplicate in an Array

Return as soon as a value is seen a second time.

```javascript
function findFirstDuplicate(arr) {
  const seen = new Set();

  for (const value of arr) {
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
  }
  return -1;
}

const numbers = [1, 2, 3, 2, 4, 5, 1, 6, 1];
console.log(findFirstDuplicate(numbers)); // 2
```

```text
value   1     2       3         2
seen   {1}  {1,2}  {1,2,3}   has 2? yes → return 2
```

**Time:** O(n) — **Space:** O(n)

**Note:** prefer `Set` over a plain object here. An object turns keys into strings, so `1` and `'1'` collide, and inherited keys like `constructor` can give false positives.

---

### Move Zeros to End

Move all zeros to the end while keeping the order of the other numbers.

```javascript
// Method 1: Filter
function moveZerosFilter(arr) {
  const nonZeros = arr.filter(num => num !== 0);
  const zerosCount = arr.length - nonZeros.length;
  return [...nonZeros, ...Array(zerosCount).fill(0)];
}
console.log(moveZerosFilter([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]

// Method 2: Two pointer (in place)
function moveZeros(arr) {
  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[index] = arr[i];
      index++;
    }
  }
  while (index < arr.length) {
    arr[index] = 0;
    index++;
  }
  return arr;
}
console.log(moveZeros([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
```

```text
i   arr[i]   action                  arr                 index
0   0        skip                    [0, 1, 0, 3, 12]    0
1   1        arr[0] = 1              [1, 1, 0, 3, 12]    1
2   0        skip                    [1, 1, 0, 3, 12]    1
3   3        arr[1] = 3              [1, 3, 0, 3, 12]    2
4   12       arr[2] = 12             [1, 3, 12, 3, 12]   3
fill the rest with 0               → [1, 3, 12, 0, 0]
```

**Time:** O(n) — **Space:** O(1) for the two-pointer version

---

### Merge 2 Sorted Arrays

```javascript
const arr1 = [1, 3, 5, 7];
const arr2 = [2, 4, 6, 8];

// Method 1: Concatenate + Sort — O((n+m) log(n+m))
const merged = [...arr1, ...arr2].sort((a, b) => a - b);
console.log(merged); // [1, 2, 3, 4, 5, 6, 7, 8]

// Method 2: Two pointer — O(n+m)
function mergeSorted(arr1, arr2) {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }
  // One array is used up — append whatever is left of the other
  return result.concat(arr1.slice(i)).concat(arr2.slice(j));
}
console.log(mergeSorted(arr1, arr2)); // [1, 2, 3, 4, 5, 6, 7, 8]
```

```text
arr1  [1, 3, 5, 7]     arr2  [2, 4, 6, 8]
       i                      j
1 < 2 → take 1          result [1]
       ·  i
3 > 2 → take 2          result [1, 2]
              ·  j
3 < 4 → take 3          result [1, 2, 3]
... until one side is empty, then append the rest
```

---

### Two Sum

Find the **indices** of two numbers that add up to the target.

```javascript
// Solution 1: Brute Force — O(n²) time, O(1) space
function twoSumBrute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}

// Solution 2: Hash Map — O(n) time, O(n) space
function twoSum(nums, target) {
  const seen = new Map(); // number => index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
```

```text
target = 9
i   nums[i]   need (9 - nums[i])   seen before?      seen after
0   2         7                    {}  → no          {2: 0}
1   7         2                    {2: 0} → YES      return [0, 1]
```

Check for the complement **before** storing the current number, otherwise a number could pair with itself. A plain object (`map[complement] !== undefined`) also works, but `Map` avoids string-key collisions.

---

### Find the Missing Number

An array contains `n` distinct numbers from `0` to `n`. One is missing — find it.

```javascript
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}

console.log(missingNumber([3, 0, 1])); // 2
console.log(missingNumber([0, 1, 2, 4, 5])); // 3
```

```text
nums = [3, 0, 1]      n = 3
expected  0 + 1 + 2 + 3 = 6     (n × (n + 1) / 2)
actual    3 + 0 + 1     = 4
missing   6 - 4         = 2
```

**Time:** O(n) — **Space:** O(1)

---

### Flatten a Nested Array

```javascript
const nested = [1, [2, [3, [4]], 5]];

// Built-in
nested.flat(Infinity); // [1, 2, 3, 4, 5]

// Recursive (what interviewers usually want)
function flatten(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

console.log(flatten(nested)); // [1, 2, 3, 4, 5]
```

```text
[1, [2, [3, [4]], 5]]
 │   └─ flatten([2, [3, [4]], 5])
 │        │   └─ flatten([3, [4]])
 │        │        │   └─ flatten([4]) → [4]
 │        │        └─ [3, 4]
 │        └─ [2, 3, 4, 5]
 └─ [1, 2, 3, 4, 5]
```

**Time:** O(n) total elements — **Space:** O(d) recursion depth + O(n) result

---

### Maximum Subarray Sum (Kadane's Algorithm)

Find the contiguous subarray with the largest sum.

```javascript
function maxSubArray(nums) {
  let current = nums[0];
  let best = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend the previous subarray or start fresh here
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6 → [4, -1, 2, 1]
```

```text
num       -2    1   -3    4   -1    2    1   -5    4
current   -2    1   -2    4    3    5    6    1    5
best      -2    1    1    4    4    5    6    6    6
                          ▲ start fresh (4 > -2 + 4)
```

**Time:** O(n) — **Space:** O(1)

---

### Best Time to Buy and Sell Stock

Buy once, sell once later. Return the maximum profit.

```javascript
function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;

  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    best = Math.max(best, price - minPrice);
  }
  return best;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5 (buy at 1, sell at 6)
console.log(maxProfit([7, 6, 4, 3, 1])); // 0 (never profitable)
```

```text
price       7    1    5    3    6    4
minPrice    7    1    1    1    1    1
profit      0    0    4    2    5    3
best        0    0    4    4    5    5
                 buy            sell
```

**Time:** O(n) — **Space:** O(1)

---

### Maximum Sum of k Consecutive Elements (Fixed Sliding Window)

```javascript
function maxSumK(arr, k) {
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];

  let best = windowSum;
  for (let i = k; i < arr.length; i++) {
    // Slide: add the new right element, drop the old left element
    windowSum += arr[i] - arr[i - k];
    best = Math.max(best, windowSum);
  }
  return best;
}

console.log(maxSumK([2, 1, 5, 1, 3, 2], 3)); // 9 → [5, 1, 3]
```

```text
k = 3
[ 2, 1, 5 ] 1, 3, 2      sum 8
  2,[ 1, 5, 1 ] 3, 2     sum 8 - 2 + 1 = 7
  2, 1,[ 5, 1, 3 ] 2     sum 7 - 1 + 3 = 9   ← best
  2, 1, 5,[ 1, 3, 2 ]    sum 9 - 5 + 2 = 6
```

**Time:** O(n) instead of O(n·k) — **Space:** O(1)

---

## String Problems

### Reverse String

```javascript
// Method 1: Built-in reverse()
function reverse1(str) {
  return str.split('').reverse().join('');
}

// Method 2: Manual loop from the end
function reverse2(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// Method 3: for...of, prepend each character
function reverse3(str) {
  let reversed = '';
  for (const char of str) {
    reversed = char + reversed;
  }
  return reversed;
}

console.log(reverse1('hello')); // "olleh"
```

```text
Method 3 (prepend):
char   reversed
h      "h"
e      "eh"
l      "leh"
l      "lleh"
o      "olleh"
```

**Note:** `split('')` breaks emoji into broken halves. Use `[...str].reverse().join('')` for Unicode-safe reversal.

**Time:** O(n) — **Space:** O(n)

---

### Check Palindrome String

```javascript
// Method 1: Reverse string
function isPalindromeReverse(str) {
  return str === str.split('').reverse().join('');
}

// Method 2: Two pointer (can exit early, no extra string)
function isPalindromeTwoPointer(str) {
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

// Method 3: Using every()
function isPalindromeEvery(str) {
  return str.split('').every((char, i) => char === str[str.length - 1 - i]);
}

console.log(isPalindromeTwoPointer('racecar')); // true

// With numbers
const num = 121;
console.log(String(num) === String(num).split('').reverse().join('')); // true
```

```text
 r   a   c   e   c   a   r
 L                       R    r == r ✓
     L               R        a == a ✓
         L       R            c == c ✓
             LR               L >= R → palindrome
```

**Time:** O(n) — **Space:** O(1) for two pointer

### Palindrome With Cleaning

Handles spaces, punctuation, and mixed case.

```javascript
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');

  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

console.log(isPalindrome('Racecar'));                       // true
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('hello'));                          // false
```

```text
"A man, a plan, a canal: Panama"
        │ toLowerCase + remove non a-z0-9
        ▼
"amanaplanacanalpanama"   → two pointer check → true
```

---

### First Non-Repeating Character

```javascript
// Method 1: Count, then scan (return the character)
function firstUniqueChar(str) {
  const count = {};
  for (const char of str) {
    count[char] = (count[char] || 0) + 1;
  }
  for (const char of str) {
    if (count[char] === 1) return char;
  }
  return null;
}
console.log(firstUniqueChar('swiss')); // "w"

// Method 2: indexOf === lastIndexOf — O(n²), shorter but slower
function firstUniqueCharShort(str) {
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) return str[i];
  }
  return null;
}

// Method 3: Return the index (LeetCode version)
function firstUniqChar(str) {
  const charCount = {};
  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  for (let i = 0; i < str.length; i++) {
    if (charCount[str[i]] === 1) return i;
  }
  return -1;
}

console.log(firstUniqChar('leetcode'));     // 0  ('l')
console.log(firstUniqChar('loveleetcode')); // 2  ('v')
console.log(firstUniqChar('aabb'));         // -1 (none)
```

```text
str = "swiss"

Pass 1 — count          Pass 2 — scan in order
┌──────┬───────┐        s → 3 ✗
│ s    │ 3     │        w → 1 ✓  return "w"
│ w    │ 1     │
│ i    │ 1     │
└──────┴───────┘
```

**Time:** O(n) — **Space:** O(1), at most 26 letters (or the alphabet size)

Two passes are required — you cannot know a character is unique until the whole string is counted.

---

### Character Frequency Counter & Valid Anagram

Two strings are anagrams if they use the same characters the same number of times.

```javascript
function charFrequency(str) {
  const freq = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}
console.log(charFrequency('hello')); // { h: 1, e: 1, l: 2, o: 1 }

function isAnagram(a, b) {
  if (a.length !== b.length) return false;

  const freq = {};
  for (const char of a) freq[char] = (freq[char] || 0) + 1;
  for (const char of b) {
    if (!freq[char]) return false; // missing or used up
    freq[char]--;
  }
  return true;
}

console.log(isAnagram('listen', 'silent')); // true
console.log(isAnagram('rat', 'car'));       // false
```

```text
a = "listen"  → { l:1, i:1, s:1, t:1, e:1, n:1 }
b = "silent"  → subtract each char
                s → 0, i → 0, l → 0, e → 0, n → 0, t → 0
all zero      → true
```

**Time:** O(n) — **Space:** O(1) for a fixed alphabet

Shortcut: `[...a].sort().join('') === [...b].sort().join('')` — O(n log n).

---

### Group Anagrams

```javascript
function groupAnagrams(words) {
  const groups = new Map(); // sorted key => list of words

  for (const word of words) {
    const key = [...word].sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return [...groups.values()];
}

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
```

```text
word   sorted key    groups
eat    aet           aet → [eat]
tea    aet           aet → [eat, tea]
tan    ant           ant → [tan]
ate    aet           aet → [eat, tea, ate]
nat    ant           ant → [tan, nat]
bat    abt           abt → [bat]
```

**Time:** O(n · k log k), where k is the longest word — **Space:** O(n · k)

---

### Longest Substring Without Repeating Characters (Sliding Window)

```javascript
function lengthOfLongestSubstring(s) {
  const lastSeen = new Map(); // char => last index
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    // Repeat inside the current window → move left past it
    if (lastSeen.has(char) && lastSeen.get(char) >= left) {
      left = lastSeen.get(char) + 1;
    }
    lastSeen.set(char, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

console.log(lengthOfLongestSubstring('abcabcbb')); // 3 ("abc")
console.log(lengthOfLongestSubstring('bbbbb'));    // 1 ("b")
console.log(lengthOfLongestSubstring('pwwkew'));   // 3 ("wke")
```

```text
s = a b c a b c b b
    0 1 2 3 4 5 6 7

R=2  [a b c] a b c b b          window "abc"   best 3
R=3   a[b c a]b c b b           'a' repeats → L = 1
R=4   a b[c a b]c b b           'b' repeats → L = 2
R=5   a b c[a b c]b b           'c' repeats → L = 3
R=6   a b c a b[c b]b           'b' repeats → L = 5
R=7   a b c a b c b[b]          'b' repeats → L = 7
best = 3
```

**Time:** O(n) — **Space:** O(min(n, alphabet))

---

### Valid Parentheses (Stack)

Every opening bracket must be closed by the same type, in the right order.

```javascript
function isValid(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else if (stack.pop() !== pairs[char]) {
      return false;
    }
  }
  return stack.length === 0;
}

console.log(isValid('({[]})')); // true
console.log(isValid('([)]'));   // false
console.log(isValid('(('));     // false (left open)
```

```text
s = ( { [ ] } )

char   action           stack
(      push             (
{      push             ( {
[      push             ( { [
]      pop [ ✓          ( {
}      pop { ✓          (
)      pop ( ✓          (empty) → valid
```

**Time:** O(n) — **Space:** O(n)

---

### FizzBuzz

Print 1 to n. Multiples of 3 → "Fizz", of 5 → "Buzz", of both → "FizzBuzz".

```javascript
function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) console.log('FizzBuzz');
    else if (i % 3 === 0) console.log('Fizz');
    else if (i % 5 === 0) console.log('Buzz');
    else console.log(i);
  }
}

fizzBuzz(15);
```

```text
i      1  2  3     4  5     6     ...  15
out    1  2  Fizz  4  Buzz  Fizz  ...  FizzBuzz
```

Check 15 **first** — otherwise 15 matches `% 3` and prints "Fizz".

---

## Searching

### Binary Search

Works only on a **sorted** array. Cut the search range in half each step.

```javascript
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

console.log(binarySearch([1, 3, 5, 7, 9, 11], 7)); // 3
console.log(binarySearch([1, 3, 5, 7, 9, 11], 4)); // -1
```

```text
target = 7
index   0   1   2   3   4   5
arr   [ 1,  3,  5,  7,  9, 11 ]
        L       M           H     5 < 7 → go right (L = 3)
                    L   M   H     9 > 7 → go left  (H = 3)
                   LMH            7 = 7 → found at 3
```

**Time:** O(log n) — **Space:** O(1)

---

## Recursion

### Fibonacci (Recursion vs Memoization)

```javascript
// Naive recursion — O(2ⁿ), recalculates the same values
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

// Memoized — O(n), each value computed once
function fibMemo(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// Iterative — O(n) time, O(1) space
function fibLoop(n) {
  let prev = 0;
  let curr = 1;
  for (let i = 0; i < n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return prev;
}

console.log(fibMemo(10)); // 55
```

```text
Naive fib(5) call tree — fib(3) and fib(2) are computed again and again:

                 fib(5)
               /        \
          fib(4)          fib(3)   ← repeated
         /      \         /    \
     fib(3)   fib(2)   fib(2) fib(1)
     /    \
 fib(2) fib(1)

Memoization stores each result the first time, so every fib(k) runs once.
```

---

## Linked List

A linked list is a chain of nodes. Each node holds a value and a pointer to the next node.

```javascript
class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

// 1 → 2 → 3 → null
const head = new ListNode(1, new ListNode(2, new ListNode(3)));
```

```text
head
 │
 ▼
[1 | •]──►[2 | •]──►[3 | •]──► null
```

### Reverse a Linked List

```javascript
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next; // 1. save the rest of the list
    curr.next = prev;       // 2. flip the pointer
    prev = curr;            // 3. move prev forward
    curr = next;            // 4. move curr forward
  }
  return prev; // new head
}
```

```text
start      null   1 → 2 → 3 → null
           prev  curr

step 1     null ← 1    2 → 3 → null
                 prev curr

step 2     null ← 1 ← 2    3 → null
                     prev curr

step 3     null ← 1 ← 2 ← 3    null
                         prev  curr  → stop, return prev (3)
```

**Time:** O(n) — **Space:** O(1)

---

### Detect a Cycle (Floyd's Fast & Slow Pointers)

```javascript
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;      // 1 step
    fast = fast.next.next; // 2 steps
    if (slow === fast) return true;
  }
  return false; // fast reached the end → no cycle
}
```

```text
1 → 2 → 3 → 4 → 5
        ▲       │
        └───────┘   (5 points back to 3)

step   slow   fast
0      1      1
1      2      3
2      3      5
3      4      4    ← they meet → cycle
```

If there is a cycle, the fast pointer laps the slow one and they meet. If not, fast reaches `null`.

**Time:** O(n) — **Space:** O(1)

---

## Trees

```javascript
class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3),
);
```

```text
        1
       / \
      2   3
     / \
    4   5
```

### Maximum Depth of a Binary Tree

```javascript
function maxDepth(node) {
  if (!node) return 0;
  return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
}

console.log(maxDepth(root)); // 3
```

```text
        1          depth = 1 + max(2, 1) = 3
       / \
      2   3        2 → 1 + max(1, 1) = 2      3 → 1 + max(0, 0) = 1
     / \
    4   5          4 → 1      5 → 1
```

**Time:** O(n) — **Space:** O(h), where h is the tree height (recursion stack)

---

### BFS vs DFS Traversal

- **BFS (Breadth-First Search):** level by level, uses a **queue**.
- **DFS (Depth-First Search):** go deep first, uses a **stack** (or recursion).

```javascript
// BFS — level order
function bfs(root) {
  const result = [];
  const queue = [root];

  while (queue.length) {
    const node = queue.shift();
    result.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}

// DFS — preorder (node, left, right)
function dfs(node, result = []) {
  if (!node) return result;
  result.push(node.value);
  dfs(node.left, result);
  dfs(node.right, result);
  return result;
}

console.log(bfs(root)); // [1, 2, 3, 4, 5]
console.log(dfs(root)); // [1, 2, 4, 5, 3]
```

```text
        1
       / \
      2   3
     / \
    4   5

BFS (queue)                      DFS preorder (stack / recursion)
queue        visit               go deep left first
[1]          1                   1 → 2 → 4 (dead end)
[2, 3]       2                         ↩ 5 (dead end)
[3, 4, 5]    3                   ↩ ↩ 3
[4, 5]       4
[5]          5
order: 1 2 3 4 5                 order: 1 2 4 5 3
```

| DFS order  | Visit order          | Result for the tree above |
| ---------- | -------------------- | ------------------------- |
| Preorder   | node → left → right  | 1, 2, 4, 5, 3             |
| Inorder    | left → node → right  | 4, 2, 5, 1, 3             |
| Postorder  | left → right → node  | 4, 5, 2, 3, 1             |

| Use BFS when                         | Use DFS when                          |
| ------------------------------------ | ------------------------------------- |
| You need the shortest path (unweighted) | You need to explore every path      |
| You process level by level           | The tree is deep and narrow           |

**Time:** O(n) for both — **Space:** O(width) for BFS, O(height) for DFS

**Note:** `queue.shift()` is O(n) on a JS array. For large inputs, use an index pointer instead of `shift()`.

---

# Rarely Asked (Lower Priority)

## Multiply Two Numbers Without Using \* Operator

```javascript
// Multiply a = 7, b = 5 without * operator

// Method 1: Addition (loop) — O(b)
function multiplyLoop(a, b) {
  let result = 0;
  for (let i = 0; i < b; i++) {
    result += a;
  }
  return result;
}
console.log(multiplyLoop(7, 5)); // 35

// Method 2: Bitwise (shift and add) — O(log b), positive integers only
function multiply(a, b) {
  let result = 0;
  while (b > 0) {
    if (b & 1) result += a;
    a <<= 1;
    b >>= 1;
  }
  return result;
}
console.log(multiply(7, 5)); // 35
```

```text
a = 7, b = 5 (binary 101)

b (binary)   b & 1   result        a
101          1       0 + 7 = 7     7  → 14
10           0       7             14 → 28
1            1       7 + 28 = 35   28 → 56
0            stop    35
```
