---
id: what-are-utility-types
title: "What are Utility Types?"
sidebar_label: "What are Utility Types?"
sidebar_position: 5
description: "What are Utility Types? — TypeScript interview notes."
---
Built-in generic types that **transform an existing type** so you don't rewrite it.

```text
interface User { id: number; name: string; email: string; password: string }

Partial<User>            → { id?; name?; email?; password? }     all optional
Required<User>           → all required
Readonly<User>           → all readonly
Pick<User, "id"|"name">  → { id; name }                           keep some
Omit<User, "password">   → { id; name; email }                    remove some
Record<"a"|"b", number>  → { a: number; b: number }                key → value map
```

| Utility             | Use case                                          |
| ------------------- | ------------------------------------------------- |
| `Partial<T>`        | Update payloads (PATCH) — every field optional    |
| `Pick<T, K>`        | Public user shape with only some fields           |
| `Omit<T, K>`        | Remove `password` before sending to the client    |
| `Record<K, V>`      | Lookup objects, e.g. `Record<string, number>`     |
| `ReturnType<F>`     | Get the return type of a function                 |
| `Awaited<T>`        | Unwrap a Promise type                             |

```ts
function updateUser(id: number, changes: Partial<User>) { /* ... */ }

type PublicUser = Omit<User, "password">;
```

---
