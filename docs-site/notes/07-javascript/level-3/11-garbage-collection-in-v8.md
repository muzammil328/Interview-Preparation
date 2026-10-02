---
id: garbage-collection-in-v8
title: "Garbage Collection in V8"
sidebar_label: "Garbage Collection in V8"
sidebar_position: 11
description: "Garbage Collection in V8 — JavaScript interview notes."
---
JavaScript frees memory automatically. V8 uses **mark-and-sweep**: anything that cannot be reached from the roots (global object, current call stack) is garbage.

1. Marks all reachable objects from roots
2. Sweeps unmarked objects
3. Compacts memory (moves objects together to reduce fragmentation)

```text
Roots (global, stack)
   │
   ├──► objA ✓ ──► objB ✓        reachable → kept
   │
   objC ✗ ◄──► objD ✗            not reachable from roots → freed
                                 (even though they reference each other)
```

V8 also splits memory by age: a **young generation** (short-lived objects, cleaned often and quickly) and an **old generation** (objects that survived, cleaned less often).

---
