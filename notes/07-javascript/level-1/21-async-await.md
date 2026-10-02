---
id: async-await
title: "Async/Await"
sidebar_label: "Async/Await"
sidebar_position: 21
description: "Async/Await — JavaScript interview notes."
---
Cleaner way to handle promises.

```javascript
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('Error:', error);
  }
}
```

- An `async` function **always returns a promise**.
- `await` pauses only **this function**, not the whole program. The rest of the function continues later as a microtask.

```text
async function f() {
  console.log('A');          ← runs synchronously
  await something;           ← f pauses here, control returns to the caller
  console.log('B');          ← resumes later as a microtask
}
f();
console.log('C');

Output: A  C  B
```

---
