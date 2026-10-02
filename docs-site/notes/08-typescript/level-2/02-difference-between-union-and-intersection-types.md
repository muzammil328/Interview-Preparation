---
id: difference-between-union-and-intersection-types
title: "Difference Between Union (|) and Intersection (&) Types"
sidebar_label: "Difference Between Union (|) and Intersection (&) Types"
sidebar_position: 2
description: "Difference Between Union (|) and Intersection (&) Types — TypeScript interview notes."
---
| **Union (`\|`)** | **Intersection (`&`)** |
|---|---|
| Means **OR** | Means **AND** |
| Value can be one of the types | Value must contain all types |
| Example: `string \| number` | Example: `User & Admin` |

```text
Union  A | B                        Intersection  A & B  (for object types)
"either shape"                      "both shapes combined"

 ┌───────┐   ┌───────┐               { name }  +  { role }
 │   A   │ OR│   B   │                      ↓
 └───────┘   └───────┘               { name, role }   ← must have ALL properties
```

Example:

### Union Type

```ts
let id: string | number;

id = "ABC";
id = 123;
```

### Intersection Type

```ts
type User = {
  name: string;
};

type Admin = {
  role: string;
};

type AdminUser = User & Admin; // { name: string; role: string }
```

---
