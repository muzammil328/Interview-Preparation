---
id: difference-between-interface-and-type
title: "Difference Between interface and type"
sidebar_label: "Difference Between interface and type"
sidebar_position: 3
description: "Difference Between interface and type — TypeScript interview notes."
---
An **interface** is mainly used to define the structure of objects and can be extended.

A **type** is more flexible because it can define objects, unions, primitives, tuples, and complex combinations.

For simple object structures, interfaces are commonly used. For unions and advanced type combinations, types are preferred.

| **interface**                           | **type**                                             |
| --------------------------------------- | ---------------------------------------------------- |
| Mainly used to define object structures | Can define objects, unions, primitives, tuples, etc. |
| Can be extended using `extends`         | Can create combinations using `&`                    |
| Supports declaration merging            | Does not support declaration merging                 |
| Common for object-oriented designs      | More flexible                                        |

```text
interface → objects only           type → anything
┌─────────────────┐                ┌───────────────────────────────┐
│ { name; age }   │                │ { name; age }                 │
│ extends         │                │ "admin" | "user"   (union)    │
│ merging ✓       │                │ [string, number]   (tuple)    │
└─────────────────┘                │ A & B              (intersect)│
                                   └───────────────────────────────┘
```

Example:

### Interface

```ts
interface User {
  name: string;
  age: number;
}

interface Admin extends User {
  role: string;
}

// Declaration merging — both declarations combine
interface User {
  email: string;
}
```

### Type

```ts
type User = {
  name: string;
  age: number;
};

type Admin = User & {
  role: string;
};

type Status = "active" | "inactive"; // only possible with type
```

---
