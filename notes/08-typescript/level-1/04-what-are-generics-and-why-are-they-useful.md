---
id: what-are-generics-and-why-are-they-useful
title: "What are Generics and Why are They Useful?"
sidebar_label: "What are Generics and Why are They Useful?"
sidebar_position: 4
description: "What are Generics and Why are They Useful? — TypeScript interview notes."
---
Generics allow us to write **reusable and type-safe code** that works with different types.

Instead of using `any`, we use a generic type like `T` to preserve type information.

```text
identity<T>  is like a box with a label slot:

  "Hello" ──► [ identity<string> ] ──► string
    100   ──► [ identity<number> ] ──► number

With any:   "Hello" ──► [ identity(any) ] ──► any   (type information lost)
```

Example:

```ts
function identity<T>(value: T): T {
  return value;
}

identity<string>("Hello");
identity(100); // T inferred as number
```

### Generic constraints (`extends`)

```ts
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength("hello");   // ✓ string has length
getLength([1, 2, 3]); // ✓ array has length
getLength(10);        // ✗ number has no length
```

### Real-world example — typed API response

```ts
interface ApiResponse<T> {
  data: T;
  error: string | null;
}

const res: ApiResponse<User[]> = await fetchUsers();
```

Benefits:

* Reusable code
* Better type safety
* Avoids using `any`
* Maintains the original type information

---
