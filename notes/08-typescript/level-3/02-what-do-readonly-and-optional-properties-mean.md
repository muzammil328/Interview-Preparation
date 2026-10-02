---
id: what-do-readonly-and-optional-properties-mean
title: "What do readonly and optional (?) properties mean?"
sidebar_label: "What do readonly and optional (?) properties mean?"
sidebar_position: 2
description: "What do readonly and optional (?) properties mean? — TypeScript interview notes."
---
```ts
interface User {
  readonly id: number; // cannot be reassigned after creation
  name: string;
  phone?: string;      // may be missing → type is string | undefined
}

const u: User = { id: 1, name: "Ali" };
u.id = 2;              // ✗ Error: readonly
u.phone?.length;       // ✓ safe access
```

---
