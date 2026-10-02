---
id: automatic-batching
title: "Automatic Batching"
sidebar_label: "Automatic Batching"
sidebar_position: 21
description: "Automatic Batching — React interview notes."
---
React groups multiple state updates into **one re-render**. Since React 18 this happens everywhere — event handlers, `setTimeout`, promises, and native event handlers.

```jsx
function handleClick() {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  setName('Ali');
  // → only ONE re-render, not three
}
```

```text
Without batching:  setCount → render   setFlag → render   setName → render   (3 renders)
With batching:     setCount ┐
                   setFlag  ├─► one render
                   setName  ┘
```

---
