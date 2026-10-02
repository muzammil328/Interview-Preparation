---
id: streaming-with-suspense
title: "Streaming with Suspense"
sidebar_label: "Streaming with Suspense"
sidebar_position: 6
description: "Streaming with Suspense — Next.js interview notes."
---
Instead of waiting for the slowest query before sending anything, Next.js can send the page shell first and **stream** slow parts in later.

```tsx
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading reviews...</p>}>
        <Reviews /> {/* slow async Server Component */}
      </Suspense>
    </>
  );
}
```

```text
Time ─────────────────────────────►
t=0   Header + "Loading reviews..."  sent
t=2s  Reviews HTML streamed in, replaces the fallback
```

---
