---
id: passing-data-from-server-component-to-client-component
title: "Passing Data From Server Component to Client Component"
sidebar_label: "Passing Data From Server Component to Client Component"
sidebar_position: 3
description: "Passing Data From Server Component to Client Component — Next.js interview notes."
---
Data is passed using **props**. Props must be **serializable** (plain objects, strings, numbers, arrays, Dates) — you cannot pass functions, class instances, or DB connections.

Example:

```tsx
// Server Component

export default async function Page() {
  const data = await getData();

  return <ClientComponent data={data} />;
}
```

```tsx
// Client Component

"use client";

export default function ClientComponent({ data }: { data: { name: string } }) {
  return <div>{data.name}</div>;
}
```

```mermaid
flowchart LR
    A["Server: Page fetches data"] -->|"serializable props"| B["Client: ClientComponent"]
    A -.->|"functions, DB clients: not allowed"| B
```

---
