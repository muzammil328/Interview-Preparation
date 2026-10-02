---
id: difference-between-css-positions
title: "Difference Between CSS Positions"
sidebar_label: "Difference Between CSS Positions"
sidebar_position: 3
description: "Difference Between CSS Positions — CSS interview notes."
---
| Position | Description |
|---|---|
| `static` | Default position in normal document flow. `top/left` have no effect. |
| `relative` | Moves relative to its normal position; its original space is kept. |
| `absolute` | Removed from flow; positioned relative to the nearest positioned (non-static) ancestor. |
| `fixed` | Positioned relative to the viewport and stays fixed while scrolling. |
| `sticky` | Works like relative until a scroll threshold, then behaves like fixed (inside its parent). |

```text
relative                   absolute
┌───────────────────┐      ┌── parent (position: relative) ──┐
│ [A]               │      │                       ┌───────┐ │
│    ┌───┐          │      │                       │ child │ │ top:0; right:0
│    │ B │ moved    │      │                       └───────┘ │
│  ┌ ┴ ─ ┘ ┐        │      │ other content flows as if       │
│    gap kept       │      │ child does not exist            │
│  └ ─ ─ ─ ┘        │      └─────────────────────────────────┘
└───────────────────┘

fixed                       sticky
┌── viewport ──┐            ┌── viewport ──┐
│ [ navbar ]   │ ← stays    │ [ header ]   │ ← scrolls normally, then
│  content ↑   │   while    │  content ↑   │   sticks at top: 0
│  scrolls     │   page     │              │
└──────────────┘   scrolls  └──────────────┘
```

Example:

```css
.box {
  position: relative;
}

.child {
  position: absolute;
  top: 0;
  right: 0;
}
```

**Gotcha:** `fixed` becomes relative to an ancestor instead of the viewport if that ancestor has `transform`, `filter`, or `perspective` set.

---
