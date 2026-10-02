---
id: how-do-you-fetch-data-in-the-app-router
title: "How Do You Fetch Data in the App Router?"
sidebar_label: "How Do You Fetch Data in the App Router?"
sidebar_position: 7
description: "How Do You Fetch Data in the App Router? — Next.js interview notes."
---
Make the Server Component `async` and fetch directly — no `useEffect`, no API route needed.

```tsx
async function getData() {
  const res = await fetch("https://api.example.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

Run independent requests in parallel:

```tsx
const [user, posts] = await Promise.all([getUser(), getPosts()]);
```

```text
Sequential (slow)          Parallel (fast)
getUser  ████              getUser  ████
getPosts     ████          getPosts ████
total    ████████          total    ████
```

---
