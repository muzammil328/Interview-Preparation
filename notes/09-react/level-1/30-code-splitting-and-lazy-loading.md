---
id: code-splitting-and-lazy-loading
title: "Code Splitting / Lazy Loading"
sidebar_label: "Code Splitting / Lazy Loading"
sidebar_position: 30
description: "Code Splitting / Lazy Loading — React interview notes."
---
Loading JavaScript only when it's needed, instead of shipping the whole app up front.

```jsx
const Dashboard = lazy(() => import('./Dashboard'));

<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>;
```

This reduces the initial bundle and improves first load.

```mermaid
sequenceDiagram
    participant U as User
    participant A as App (main bundle)
    participant N as Network
    U->>A: opens /dashboard
    A->>A: show Suspense fallback (Loading...)
    A->>N: download Dashboard chunk
    N-->>A: Dashboard.js
    A->>U: render Dashboard
```

---
