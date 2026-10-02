---
id: lists-and-keys
title: "Lists and Keys"
sidebar_label: "Lists and Keys"
sidebar_position: 11
description: "Lists and Keys — React interview notes."
---
Lists are rendered by mapping an array to JSX. Each item needs a stable, unique `key` so React can match old and new items during reconciliation.

```jsx
{todos.map((todo) => (
  <TodoItem key={todo.id} todo={todo} />
))}
```

**Why not use the array index as key?** If items are inserted, deleted, or reordered, the index of each item changes, so React matches the wrong components — state (like an input's text or a checkbox) sticks to the wrong row.

```text
Before:  key=0 "Milk" [✓]   key=1 "Eggs" [ ]
Insert "Bread" at top, keys = index:
After:   key=0 "Bread" [✓]  ← React reused key=0, so the ✓ moved to the wrong item!
         key=1 "Milk"  [ ]
         key=2 "Eggs"  [ ]

With key = todo.id:
After:   key=b "Bread" [ ]  ← new component
         key=m "Milk"  [✓]  ← same component, state kept
         key=e "Eggs"  [ ]
```

Index as key is fine **only** when the list is static (never reordered, filtered, or inserted into).

---
