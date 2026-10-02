---
id: what-is-typescript-and-how-is-it-different-from-javascript
title: "What is TypeScript and how is it different from JavaScript?"
sidebar_label: "What is TypeScript and how is it different from JavaScript?"
sidebar_position: 1
description: "What is TypeScript and how is it different from JavaScript? — TypeScript interview notes."
---
---

**TypeScript** is a superset of JavaScript that adds **static typing** and other features to JavaScript. TypeScript code is compiled into JavaScript before execution.

```mermaid
flowchart LR
    A["app.ts<br/>(with types)"] --> B["tsc / bundler<br/>type check"]
    B -- "type error" --> X["❌ Error in editor / build"]
    B -- "ok" --> C["app.js<br/>(types removed)"]
    C --> D["Browser / Node.js"]
```

Types exist **only at compile time**. At runtime it is plain JavaScript — TypeScript cannot validate API responses or user input by itself.

| **JavaScript (JS)**          | **TypeScript (TS)**                               |
| ---------------------------- | ------------------------------------------------- |
| Dynamically typed            | Statically typed                                  |
| Types are checked at runtime | Types are checked during development/compile time |
| No type definitions required | Supports type definitions                         |
| Runs directly in browsers and Node.js | Requires compilation                     |
| Easier to start              | Better for large-scale applications               |
| Uses `.js` files             | Uses `.ts` files                                  |
| Example: `let age = 25`      | Example: `let age: number = 25`                   |

---
