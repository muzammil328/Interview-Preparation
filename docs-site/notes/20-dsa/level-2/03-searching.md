---
id: searching
title: "Searching"
sidebar_label: "Searching"
sidebar_position: 3
description: "Searching — DSA interview notes."
---
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
