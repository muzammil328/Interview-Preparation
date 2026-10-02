---
id: recursion
title: "Recursion"
sidebar_label: "Recursion"
sidebar_position: 4
description: "Recursion — DSA interview notes."
---
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
