---
id: effect-cleanup-order-when-a-dependency-changes
title: "Effect Cleanup Order When a Dependency Changes"
sidebar_label: "Effect Cleanup Order When a Dependency Changes"
sidebar_position: 2
description: "Effect Cleanup Order When a Dependency Changes — Output Based interview notes."
---
```jsx
function Profile({ id }) {
  useEffect(() => {
    console.log('effect', id);
    return () => console.log('cleanup', id);
  }, [id]);
  return null;
}
// id changes 1 → 2, then the component unmounts
```

**Output:** `effect 1`, `cleanup 1`, `effect 2`, `cleanup 2`

The cleanup sees the **old** `id`, because it belongs to the old effect.

```text
mount (id=1)      → effect 1
id changes to 2   → cleanup 1  (old effect's closure)
                  → effect 2
unmount           → cleanup 2
```
