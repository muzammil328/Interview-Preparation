---
id: what-is-z-index-and-stacking-context
title: "What is z-index and Stacking Context?"
sidebar_label: "What is z-index and Stacking Context?"
sidebar_position: 3
description: "What is z-index and Stacking Context? — CSS interview notes."
---
`z-index` controls which element appears on top when elements overlap. Higher values appear above lower values.

It only works on **positioned** elements (`relative`, `absolute`, `fixed`, `sticky`) and on **flex/grid items**.

Example:

```css
.modal {
  position: fixed;
  z-index: 1000;
}
```

### Stacking Context

A **stacking context** is a group whose children are stacked only inside it. A child can never escape its parent's layer, no matter how high its `z-index`.

Created by: `position` + `z-index` (not auto), `opacity < 1`, `transform`, `filter`, `position: fixed/sticky`, and others.

```text
<div A  z-index: 1>            <div B  z-index: 2>
   └── child  z-index: 9999

Result (top to bottom):
┌──────────── B (2) ────────────┐  ← on top
└───────────────────────────────┘
┌──────────── A (1) ────────────┐
│   child 9999 is stuck INSIDE  │  ← 9999 only counts inside A
└───────────────────────────────┘
```

**Classic bug:** "My modal has `z-index: 9999` but appears behind the header" → a parent created a stacking context with a lower `z-index`.

---
