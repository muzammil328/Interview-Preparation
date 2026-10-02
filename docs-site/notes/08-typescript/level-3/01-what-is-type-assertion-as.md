---
id: what-is-type-assertion-as
title: "What is Type Assertion (as)?"
sidebar_label: "What is Type Assertion (as)?"
sidebar_position: 1
description: "What is Type Assertion (as)? — TypeScript interview notes."
---
Telling TypeScript "trust me, I know the type". It does **not** convert or check the value at runtime.

```ts
const input = document.getElementById("email") as HTMLInputElement;
input.value;
```

```text
as     → compile-time only, no runtime check   (can be wrong!)
narrow → real runtime check (typeof / in / instanceof)   (safe)
```

Prefer narrowing. Use `as` only when you truly know more than the compiler. `!` (non-null assertion) is the same idea: `user!.name`.

---
