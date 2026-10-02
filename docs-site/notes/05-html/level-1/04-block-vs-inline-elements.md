---
id: block-vs-inline-elements
title: "Block vs Inline Elements"
sidebar_label: "Block vs Inline Elements"
sidebar_position: 4
description: "Block vs Inline Elements — HTML interview notes."
---
| Block Elements | Inline Elements |
|---|---|
| Start from a new line. | Stay in the same line. |
| Take full available width. | Take only required width. |
| Width and height can be set. | Width and height are ignored (except replaced elements like `<img>`). |
| Examples: `<div>`, `<section>`, `<p>`, `<h1>` | Examples: `<span>`, `<a>`, `<strong>`, `<img>` |

```text
Block:
┌──────────────────────────────────────────┐
│ <div> takes the full width               │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│ <p> starts on a new line                 │
└──────────────────────────────────────────┘

Inline:
Some text [<span>] more text [<a>] and [<strong>] on the same line
```

---
