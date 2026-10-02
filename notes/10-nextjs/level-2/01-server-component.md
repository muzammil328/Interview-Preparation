---
id: server-component
title: "Server Component"
sidebar_label: "Server Component"
sidebar_position: 1
description: "Server Component — Next.js interview notes."
---
Features:

* Runs only on the server
* Fetches data securely
* Sends HTML plus a serialized **RSC payload** to the browser — its own code never reaches the browser
* Cannot use:

  * `useState`
  * `useEffect`
  * Event handlers

Example:

```tsx
async function UsersPage() {
  const res = await fetch("https://api.example.com/users");
  const users: { id: string; name: string }[] = await res.json();

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

```text
Server: run component ──► fetch data ──► render ──► HTML + RSC payload ──► Browser
                                                     (0 KB of this component's JS)
```

---
