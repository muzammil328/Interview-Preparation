---
id: client-component
title: "Client Component"
sidebar_label: "Client Component"
sidebar_position: 2
description: "Client Component — Next.js interview notes."
---
Used when a component needs:

* User interaction
* Browser APIs
* React hooks
* State management

Example:

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

```text
Server: pre-render HTML "<button>0</button>" ──► Browser shows it
Browser: download Counter JS ──► hydrate ──► click works
```

---
