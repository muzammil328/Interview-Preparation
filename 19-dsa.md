# DSA Interview

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

**Answer**: `1, 2, 4...` (infinite 4s)
**Explanation**: setTimeout is async, so it goes to callback queue. While loop blocks the event loop, so 3 never executes.

---

### Question 2

```javascript
0.1 + 0.2 === 0.3;
```

**Answer**: `False`
**Explanation**: Floating point precision issue in JavaScript.

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
**Explanation**: sync code runs first, setTimeout goes to callback queue.

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

**Answer**: `Error: x is not defined`
**Explanation**: `x` is block-scoped (let) and doesn't exist outside the if block.

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

**Answer**: `first, fourth, third, second`
**Explanation**: Sync code runs first, Promise.then is microtask (runs before macrotask), setTimeout is macrotask.

---

## Array Problems

### Find Even Numbers

```javascript
let arr = [1, 2, 3, 4, 5, 6];

for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    console.log(arr[i]);
  }
}
// Output: 2, 4, 6
```

---

### Find Odd Numbers

```javascript
let arr = [1, 2, 3, 4, 5, 6];

for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 !== 0) {
    console.log(arr[i]);
  }
}
// Output: 1, 3, 5
```

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
```

---

## Two Sum Problem

```javascript
// Find two numbers that add up to target
let nums = [2, 7, 11, 15];
let target = 9;

// Solution 1: Brute Force - O(n^2)
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[i] + nums[j] === target) {
      console.log([i, j]); // [0, 1]
    }
  }
}

// Solution 2: Hash Map - O(n)
let map = {};
for (let i = 0; i < nums.length; i++) {
  let complement = target - nums[i];
  if (map[complement] !== undefined) {
    console.log([map[complement], i]);
  }
  map[nums[i]] = i;
}
```

---

## Reverse String

```javascript
// Method 1: Built-in reverse()
let str = 'hello';
let reversed = str.split('').reverse().join('');
console.log(reversed); // "olleh"

// Method 2: Manual reverse
let str = 'hello';
let reversed = '';
for (let i = str.length - 1; i >= 0; i--) {
  reversed += str[i];
}
console.log(reversed); // "olleh"

// Method 3: For of loop
let str = 'hello';
let reversed = '';
for (let char of str) {
  reversed = char + reversed;
}
console.log(reversed); // "olleh"
```

---

## Remove Duplicate from Array

```javascript
// Method 1: Using Set
let arr = [1, 2, 2, 3, 4, 4, 5];
let unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4, 5]

// Method 2: Using filter
let arr = [1, 2, 2, 3, 4, 4, 5];
let unique = arr.filter((item, index) => arr.indexOf(item) === index);
console.log(unique); // [1, 2, 3, 4, 5]

// Method 3: Using for loop
let arr = [1, 2, 2, 3, 4, 4, 5];
let unique = [];
for (let item of arr) {
  if (!unique.includes(item)) {
    unique.push(item);
  }
}
console.log(unique); // [1, 2, 3, 4, 5]
```

---

## Merge 2 Sorted Arrays

```javascript
// Merge two sorted arrays
let arr1 = [1, 3, 5, 7];
let arr2 = [2, 4, 6, 8];

// Method 1: Concatenate + Sort
let merged = [...arr1, ...arr2].sort((a, b) => a - b);
console.log(merged); // [1, 2, 3, 4, 5, 6, 7, 8]

// Method 2: Two pointer (O(n+m))
let i = 0,
  j = 0,
  result = [];
while (i < arr1.length && j < arr2.length) {
  if (arr1[i] < arr2[j]) {
    result.push(arr1[i]);
    i++;
  } else {
    result.push(arr2[j]);
    j++;
  }
}
result = result.concat(arr1.slice(i)).concat(arr2.slice(j));
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8]
```

---

## Move Zeros to End

```javascript
// Move all zeros to the end while maintaining order
let arr = [0, 1, 0, 3, 12];

// Method 1: Filter
let nonZeros = arr.filter(num => num !== 0);
let zerosCount = arr.length - nonZeros;
let result = [...nonZeros, ...Array(zerosCount).fill(0)];
console.log(result); // [1, 3, 12, 0, 0]

// Method 2: Two pointer
let arr = [0, 1, 0, 3, 12];
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
console.log(arr); // [1, 3, 12, 0, 0]
```

---

## Multiply Two Numbers Without Using \* Operator

```javascript
// Multiply a = 7, b = 5 without * operator

// Method 1: Addition (loop)
let a = 7,
  b = 5;
let result = 0;
for (let i = 0; i < b; i++) {
  result += a;
}
console.log(result); // 35

// Method 2: Bitwise (using left shift)
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

---

## First Non-Repeating Character

```javascript
// Find first non-repeating character
let str = 'swiss';

// Method 1: Using object
let count = {};
for (let char of str) {
  count[char] = (count[char] || 0) + 1;
}
for (let char of str) {
  if (count[char] === 1) {
    console.log(char); // "w"
    break;
  }
}

// Method 2: Using indexOf and lastIndexOf
for (let i = 0; i < str.length; i++) {
  if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
    console.log(str[i]); // "w"
    break;
  }
}
```

---

## Check Palindrome String

```javascript
// Check if string is palindrome

// Method 1: Reverse string
let str = 'racecar';
let reversed = str.split('').reverse().join('');
console.log(str === reversed); // true

// Method 2: Two pointer
let str = 'racecar';
let isPalindrome = true;
let left = 0,
  right = str.length - 1;
while (left < right) {
  if (str[left] !== str[right]) {
    isPalindrome = false;
    break;
  }
  left++;
  right--;
}
console.log(isPalindrome); // true

// Method 3: Using every()
let str = 'racecar';
let isPalindrome = str.split('').every((char, i) => char === str[str.length - 1 - i]);
console.log(isPalindrome); // true

// With numbers
let num = 121;
let numStr = num.toString();
let reversedNum = numStr.split('').reverse().join('');
console.log(num === parseInt(reversedNum)); // true
```

---

## JavaScript Equality (== vs ===)

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
console.log([] == ''); // true (array converts to "" then to 0, string converts to 0)
console.log([] == 0); // true (array converts to "" then to 0)
console.log([1] == 1); // true

// Object to primitive
console.log({} == '[object Object]'); // false (different types)
console.log({} == ''); // false

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

### Common Interview Questions

```javascript
// Question 1
console.log('' == []); // true
// [] converts to "" then to 0, "" converts to 0 → true

// Question 2
console.log('' === []); // false
// Different types: string vs array

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
// ![] is false, false converts to 0, [] converts to 0 → true

// Question 9
console.log('2' + 2); // "22" (concatenation)
console.log('2' - 2); // 0 (subtraction forces number conversion)

// Question 10
console.log(+[]); // 0 (unary + converts to number)
console.log(+{}); // NaN
```

### Truthy and Falsy Values

```javascript
// Falsy values (false when converted to boolean)
console.log(Boolean(false)); // false
console.log(Boolean(0)); // false
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

```

```
