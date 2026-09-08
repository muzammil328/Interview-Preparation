# TypeScript Interview

---

# What is TypeScript and how is it different from JavaScript?

**TypeScript** is a superset of JavaScript that adds **static typing** and other features to JavaScript. TypeScript code is compiled into JavaScript before execution.

| **JavaScript (JS)**          | **TypeScript (TS)**                               |
| ---------------------------- | ------------------------------------------------- |
| Dynamically typed            | Statically typed                                  |
| Types are checked at runtime | Types are checked during development/compile time |
| No type definitions required | Supports type definitions                         |
| Easier to start              | Better for large-scale applications               |
| Uses `.js` files             | Uses `.ts` files                                  |
| Example: `let age = 25`      | Example: `let age: number = 25`                   |

## Key Differences

| **TypeScript**                     | **JavaScript**                                |
| ---------------------------------- | --------------------------------------------- |
| Static typing                      | Dynamic typing                                |
| Compile-time checking              | Runtime checking                              |
| Requires compilation               | Runs directly in browsers and Node.js         |
| Better tooling and error detection | Less strict                                   |
| Suitable for large projects        | Suitable for smaller scripts and applications |

---

# Difference Between `any` vs `unknown` — Why is `unknown` Safer?

Both `any` and `unknown` can store values of any type, but `unknown` provides better type safety.

| **any**                                 | **unknown**                           |
| --------------------------------------- | ------------------------------------- |
| Can contain any value                   | Can contain any value                 |
| Allows operations without type checking | Requires type checking before use     |
| Less safe                               | More safe                             |
| TypeScript provides fewer protections   | TypeScript prevents unsafe operations |

Example:

```ts
let value: any = "Hello";

value.toUpperCase(); // Allowed
```

```ts
let value: unknown = "Hello";

value.toUpperCase(); // Error

if (typeof value === "string") {
  value.toUpperCase(); // Allowed
}
```

---

# Difference Between `interface` and `type`

An **interface** is mainly used to define the structure of objects and can be extended.

A **type** is more flexible because it can define objects, unions, primitives, tuples, and complex combinations.

For simple object structures, interfaces are commonly used. For unions and advanced type combinations, types are preferred.

| **interface**                           | **type**                                             |
| --------------------------------------- | ---------------------------------------------------- |
| Mainly used to define object structures | Can define objects, unions, primitives, tuples, etc. |
| Can be extended using `extends`         | Can create combinations using `&`                    |
| Supports declaration merging            | Does not support declaration merging                 |
| Common for object-oriented designs      | More flexible                                        |

Example:

### Interface

```ts
interface User {
  name: string;
  age: number;
}

interface Admin extends User {
  role: string;
}
```

### Type

```ts
type User = {
  name: string;
  age: number;
};

type Admin = User & {
  role: string;
};
```

---

# What are Generics and Why are They Useful?

Generics allow us to write **reusable and type-safe code** that works with different types.

Instead of using `any`, we use a generic type like `T` to preserve type information.

Example:

```ts
function identity<T>(value: T): T {
  return value;
}

identity<string>("Hello");
identity<number>(100);
```

Benefits:

* Reusable code
* Better type safety
* Avoids using `any`
* Maintains the original type information

---

# What is Type Narrowing and How Do You Achieve It?

**Type narrowing** means reducing a union type into a more specific type so TypeScript can understand what operations are safe.

Ways to achieve type narrowing:

* `typeof`
* `instanceof`
* `in`
* Equality checks
* Custom type guards

Example:

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

---

# Difference Between Union (`|`) and Intersection (`&`) Types

| **Union (`|`)** | **Intersection (`&`)** |
|---|---|
| Means **OR** | Means **AND** |
| Value can be one of the types | Value must contain all types |
| Example: `string \| number` | Example: `User & Admin` |

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

type AdminUser = User & Admin;
```

---

# How Do You Type a Function's Parameters and Return Value?

In TypeScript, parameter types are defined after parameter names, and the return type is defined after the function parameters.

Example:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Explanation:

* `a: number` → first parameter must be a number
* `b: number` → second parameter must be a number
* `: number` → function returns a number

---

# TypeScript Summary

| Concept            | Description                                 |                            |
| ------------------ | ------------------------------------------- | -------------------------- |
| TypeScript         | Superset of JavaScript with static typing   |                            |
| Static typing      | Types checked during compile time           |                            |
| `any`              | Allows anything but removes type safety     |                            |
| `unknown`          | Safer alternative that requires type checks |                            |
| `interface`        | Defines object structures                   |                            |
| `type`             | Flexible type definitions                   |                            |
| Generics           | Reusable type-safe code                     |                            |
| Type narrowing     | Converts broad types into specific types    |                            |
| Union (`           | `)                                          | OR — one of multiple types |
| Intersection (`&`) | AND — combines multiple types               |                            |
