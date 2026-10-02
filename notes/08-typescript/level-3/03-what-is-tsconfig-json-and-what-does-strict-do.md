---
id: what-is-tsconfig-json-and-what-does-strict-do
title: "What is tsconfig.json and what does strict do?"
sidebar_label: "What is tsconfig.json and what does strict do?"
sidebar_position: 3
description: "What is tsconfig.json and what does strict do? — TypeScript interview notes."
---
`tsconfig.json` configures the TypeScript compiler for the project.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

`"strict": true` turns on a group of safety checks:

| Flag                    | What it catches                                    |
| ----------------------- | -------------------------------------------------- |
| `noImplicitAny`         | Parameters without a type silently becoming `any`  |
| `strictNullChecks`      | Using a value that might be `null` / `undefined`   |
| `strictFunctionTypes`   | Unsafe function parameter types                    |
| `strictPropertyInitialization` | Class properties never initialized          |
| `useUnknownInCatchVariables` | `catch (e)` — `e` is `unknown`, not `any`     |

```text
strict: false   let name: string = null;   ✓ compiles → crashes later
strict: true    let name: string = null;   ✗ error now
```

**Always use `strict: true` in new projects.**

---
