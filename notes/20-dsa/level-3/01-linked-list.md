---
id: linked-list
title: "Linked List"
sidebar_label: "Linked List"
sidebar_position: 1
description: "Linked List — DSA interview notes."
---
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
