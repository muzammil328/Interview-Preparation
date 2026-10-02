---
id: difference-between-any-unknown-and-never-why-is-unknown-sa
title: "Difference Between any, unknown, and never — Why is unknown Safer?"
sidebar_label: "Difference Between any, unknown, and never — Why is unknown Safer?"
sidebar_position: 2
description: "Difference Between any, unknown, and never — Why is unknown Safer? — TypeScript interview notes."
---
```text
                 any   ← turns OFF type checking (escape hatch)

               unknown ← top type: holds ANY value, but you must check before using it
          ┌──────┼───────┬────────┐
       string  number  boolean  object ...
          └──────┼───────┴────────┘
                never  ← bottom type: NO value can ever be this
```

Both `any` and `unknown` can store values of any type, but `unknown` provides better type safety.

| **any**                                 | **unknown**                           | **never**                                  |
| --------------------------------------- | ------------------------------------- | ------------------------------------------ |
| Can contain any value                   | Can contain any value                 | Contains no value                          |
| Allows operations without type checking | Requires type checking before use     | Used for impossible cases                  |
| Less safe                               | More safe                             | Function that throws / never returns       |
| TypeScript provides fewer protections   | TypeScript prevents unsafe operations | Exhaustive `switch` checks                 |

Example:

```ts
let value: any = "Hello";

value.toUpperCase(); // Allowed
value.foo.bar();     // Also allowed — crashes at runtime!
```

```ts
let value: unknown = "Hello";

value.toUpperCase(); // Error

if (typeof value === "string") {
  value.toUpperCase(); // Allowed
}
```

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

---
