---
id: big-o-basics
title: "Big-O Basics"
sidebar_label: "Big-O Basics"
sidebar_position: 1
description: "Big-O Basics — DSA interview notes."
---
---

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
