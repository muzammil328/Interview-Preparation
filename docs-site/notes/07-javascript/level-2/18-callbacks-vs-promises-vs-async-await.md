---
id: callbacks-vs-promises-vs-async-await
title: "Callbacks vs Promises vs Async/Await"
sidebar_label: "Callbacks vs Promises vs Async/Await"
sidebar_position: 18
description: "Callbacks vs Promises vs Async/Await — JavaScript interview notes."
---
Async/await is built on Promises — it is syntax, not a different mechanism.

| Callback                       | Promise                   | Async/Await                          |
| ------------------------------ | ------------------------- | ------------------------------------ |
| Can become deeply nested       | Chained with `.then()`    | Looks like normal synchronous code   |
| Can cause callback hell        | Cleaner than callbacks    | Usually the easiest to read          |
| Error handling is awkward      | `.catch()`                | `try` / `catch`                      |
| Least readable for complex flows | More readable           | Most readable                        |

```javascript
// Callback
getUser(function (user) {
  getOrders(user, function (orders) {
    console.log(orders);
  });
});

// Promise
getUser()
  .then((user) => getOrders(user))
  .then((orders) => console.log(orders))
  .catch((error) => console.log(error));

// Async/Await
async function getData() {
  try {
    const user = await getUser();
    const orders = await getOrders(user);
    console.log(orders);
  } catch (error) {
    console.log(error);
  }
}
```

**Tip:** independent `await` calls run one after another. Use `Promise.all()` to run them in parallel.

```text
Sequential (await one by one)          Parallel (Promise.all)

getUser   ███                          getUser   ███
getPosts     ███                       getPosts  ███
getFriends      ███                    getFriends███
          ─────────── 3s                         ───── 1s
```

```javascript
// ✗ 3 seconds
const user = await getUser();
const posts = await getPosts();

// ✓ 1 second
const [user2, posts2] = await Promise.all([getUser(), getPosts()]);
```

---
