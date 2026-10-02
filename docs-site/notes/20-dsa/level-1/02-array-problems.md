---
id: array-problems
title: "Array Problems"
sidebar_label: "Array Problems"
sidebar_position: 2
description: "Array Problems — DSA interview notes."
---
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
