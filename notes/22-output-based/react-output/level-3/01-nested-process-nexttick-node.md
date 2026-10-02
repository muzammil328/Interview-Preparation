---
id: nested-process-nexttick-node
title: "Nested process.nextTick (Node)"
sidebar_label: "Nested process.nextTick (Node)"
sidebar_position: 1
description: "Nested process.nextTick (Node) — Output Based interview notes."
---
```js
process.nextTick(() => {
  console.log("A");
  process.nextTick(() => {
    console.log("B");
  });
});
Promise.resolve().then(() => console.log("C"));
console.log("D");
```

**Output:** `D`, `A`, `B`, `C`

| Phase                     | Output |
| ------------------------- | ------ |
| Synchronous (console)     | D      |
| nextTick                  | A, B   |
| Microtasks (Promise)      | C      |

**Sync → nextTick → Promise**

The nextTick queue is fully drained first — including tick callbacks added **inside** a tick callback — before promises run.

```text
Step | Call Stack        | nextTick Queue | Promise Queue | Output
─────┼───────────────────┼────────────────┼───────────────┼─────────
 1   | nextTick(cbA)     | [A]            |               |
 2   | Promise.then      | [A]            | [C]           |
 3   | log("D")          | [A]            | [C]           | D
 4   | run A → log("A")  |                | [C]           | D A
 5   |   A queues tick B | [B]            | [C]           | D A
 6   | run B             |                | [C]           | D A B    ← tick queue drained first
 7   | run C             |                |               | D A B C
```
