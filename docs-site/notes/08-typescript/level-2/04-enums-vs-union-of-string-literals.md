---
id: enums-vs-union-of-string-literals
title: "Enums vs Union of String Literals"
sidebar_label: "Enums vs Union of String Literals"
sidebar_position: 4
description: "Enums vs Union of String Literals — TypeScript interview notes."
---
```ts
// Enum — creates a real JavaScript object at runtime
enum Role {
  Admin = "ADMIN",
  User = "USER",
}

// Union literal — types only, removed at compile time
type Role2 = "ADMIN" | "USER";
```

| Enum                                    | Union literal                         |
| --------------------------------------- | ------------------------------------- |
| Exists at runtime (adds JS code)        | Zero runtime code                     |
| Can loop over values (`Object.values`)  | Just a type                           |
| Must import `Role.Admin` to use         | Plain string `"ADMIN"` works          |
| Numeric enums allow any number (unsafe) | Only listed values allowed            |

```text
Compiled output:
enum Role       →  var Role = { Admin: "ADMIN", User: "USER" }   (real object)
type Role2      →  (nothing)
```

**Common answer:** most modern codebases prefer **union literals** (or an `as const` object) unless they need runtime values.

```ts
const ROLES = ["ADMIN", "USER"] as const;
type Role3 = (typeof ROLES)[number]; // "ADMIN" | "USER", and ROLES exists at runtime
```

---
