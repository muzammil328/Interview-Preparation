---
id: parent-and-child-effect-order
title: "Parent and Child Effect Order"
sidebar_label: "Parent and Child Effect Order"
sidebar_position: 1
description: "Parent and Child Effect Order — Output Based interview notes."
---
```jsx
function Child() {
  console.log('Child render');
  useEffect(() => {
    console.log('Child effect');
  }, []);
  return null;
}

function Parent() {
  console.log('Parent render');
  useEffect(() => {
    console.log('Parent effect');
  }, []);
  return <Child />;
}
```

**Output:** `Parent render`, `Child render`, `Child effect`, `Parent effect`

Rendering goes **top-down**; effects run **bottom-up** after everything is committed to the DOM (the child must be ready before the parent).

```text
RENDER (top-down)          COMMIT to DOM          EFFECTS (bottom-up)
Parent render ──► Child render ──► DOM updated ──► Child effect ──► Parent effect
```
