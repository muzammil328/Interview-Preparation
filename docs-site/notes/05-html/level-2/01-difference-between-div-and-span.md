---
id: difference-between-div-and-span
title: "Difference Between div and span"
sidebar_label: "Difference Between div and span"
sidebar_position: 1
description: "Difference Between div and span — HTML interview notes."
---
| `div` | `span` |
|---|---|
| Block-level element. | Inline-level element. |
| Used for large content grouping. | Used for small text/content grouping. |
| Starts on a new line. | Does not start on a new line. |
| Takes full width. | Takes required width. |

Example:

```html
<div>
  <h1>Hello World</h1>
</div>

<p>
  This is a <span>highlighted</span> text.
</p>
```

```text
┌────────── div ───────────┐
│ Hello World              │
└──────────────────────────┘
This is a [highlighted] text.
          └── span ──┘
```

---
