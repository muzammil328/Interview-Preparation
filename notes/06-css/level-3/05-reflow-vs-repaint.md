---
id: reflow-vs-repaint
title: "Reflow vs Repaint"
sidebar_label: "Reflow vs Repaint"
sidebar_position: 5
description: "Reflow vs Repaint — CSS interview notes."
---
| Reflow (Layout) | Repaint |
|---|---|
| Browser recalculates sizes and positions. | Browser redraws pixels without changing layout. |
| Triggered by: `width`, `height`, `margin`, `top`, adding/removing elements, font change. | Triggered by: `color`, `background`, `visibility`, `box-shadow`. |
| Expensive — can affect parent and children. | Cheaper. |
| Always followed by a repaint. | Does not cause a reflow. |

```text
Rendering pipeline:

Style ──► Layout ──► Paint ──► Composite
           │          │           │
  change width:  ✓        ✓          ✓     (reflow — most expensive)
  change color:            ✓          ✓     (repaint)
  change transform/opacity:           ✓     (composite only — cheapest)
```

**How to reduce reflows:**

- Animate `transform` / `opacity` instead of `top` / `left` / `width`.
- Batch DOM changes (change a class once, not many inline styles).
- Avoid reading layout (`offsetHeight`) right after writing styles in a loop — causes "layout thrashing".

---
