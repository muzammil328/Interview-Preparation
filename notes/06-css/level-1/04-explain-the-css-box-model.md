---
id: explain-the-css-box-model
title: "Explain the CSS Box Model"
sidebar_label: "Explain the CSS Box Model"
sidebar_position: 4
description: "Explain the CSS Box Model — CSS interview notes."
---
Every HTML element is a rectangular box made of four layers:

1. **Content** — text, image
2. **Padding** — space inside the border
3. **Border** — line around the padding
4. **Margin** — space outside the border, between elements

Diagram:

```text
+-----------------------+
|        Margin         |
|  +-----------------+  |
|  |     Border      |  |
|  | +-------------+ |  |
|  | |  Padding    | |  |
|  | | +---------+ | |  |
|  | | | Content | | |  |
|  | | +---------+ | |  |
|  | +-------------+ |  |
|  +-----------------+  |
+-----------------------+
```

**Margin collapse:** the vertical margins of two block elements touching each other merge into the larger one (`20px` + `30px` → `30px`, not `50px`). This does not happen in flex or grid containers.

---
