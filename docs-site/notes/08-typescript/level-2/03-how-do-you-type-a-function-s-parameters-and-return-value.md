---
id: how-do-you-type-a-function-s-parameters-and-return-value
title: "How Do You Type a Function's Parameters and Return Value?"
sidebar_label: "How Do You Type a Function's Parameters and Return Value?"
sidebar_position: 3
description: "How Do You Type a Function's Parameters and Return Value? — TypeScript interview notes."
---
In TypeScript, parameter types are defined after parameter names, and the return type is defined after the function parameters.

```text
function add( a: number , b: number ): number { ... }
              └─param─┘   └─param─┘   └return┘
```

Example:

```ts
function add(a: number, b: number): number {
  return a + b;
}

// Optional and default parameters
function greet(name: string, greeting: string = "Hello", suffix?: string): string {
  return `${greeting}, ${name}${suffix ?? ""}`;
}

// Arrow function type
const multiply: (a: number, b: number) => number = (a, b) => a * b;
```

Explanation:

* `a: number` → first parameter must be a number
* `b: number` → second parameter must be a number
* `: number` → function returns a number
* `suffix?` → optional parameter

---
