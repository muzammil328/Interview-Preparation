---
id: what-are-keyof-and-typeof-in-typescript
title: "What are keyof and typeof in TypeScript?"
sidebar_label: "What are keyof and typeof in TypeScript?"
sidebar_position: 5
description: "What are keyof and typeof in TypeScript? — TypeScript interview notes."
---
```text
typeof  : value  ──►  type        (get the type of a variable)
keyof   : type   ──►  union of its keys
```

```ts
const config = { port: 3000, host: "localhost" };

type Config = typeof config;   // { port: number; host: string }
type ConfigKey = keyof Config; // "port" | "host"

function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

getValue(config, "port");  // number ✓
getValue(config, "debug"); // ✗ "debug" is not a key
```

---
