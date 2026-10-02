---
id: strictmode-in-development
title: "StrictMode in Development"
sidebar_label: "StrictMode in Development"
sidebar_position: 3
description: "StrictMode in Development — Output Based interview notes."
---
```jsx
<StrictMode>
  <Profile id={1} />
</StrictMode>
```

**Output on mount (dev only):** `effect 1`, `cleanup 1`, `effect 1`

In development, StrictMode mounts, unmounts, and re-mounts each component once, to show you effects that are missing a cleanup. Components also render twice. This does **not** happen in production.

```text
DEV + StrictMode:   mount → effect 1 → (simulated unmount) cleanup 1 → mount again → effect 1
Production:         mount → effect 1
```
