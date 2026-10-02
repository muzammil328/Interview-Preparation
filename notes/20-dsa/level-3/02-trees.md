---
id: trees
title: "Trees"
sidebar_label: "Trees"
sidebar_position: 2
description: "Trees — DSA interview notes."
---
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
