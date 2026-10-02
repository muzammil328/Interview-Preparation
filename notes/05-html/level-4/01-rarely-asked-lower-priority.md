---
id: rarely-asked-lower-priority
title: "Rarely Asked (Lower Priority)"
sidebar_label: "Rarely Asked (Lower Priority)"
sidebar_position: 1
description: "Rarely Asked (Lower Priority) — HTML interview notes."
---
## What is iframe?

An `iframe` is used to embed another webpage or document inside the current page.

Common uses:

- YouTube videos
- Google Maps
- External applications

```text
┌──────── your page ────────┐
│ text ...                  │
│ ┌──── <iframe> ────────┐  │
│ │ another website,     │  │
│ │ its own document     │  │
│ └──────────────────────┘  │
└───────────────────────────┘
```

Example:

```html
<iframe src="https://example.com" title="Example site"></iframe>
```

Give every iframe a `title` for screen readers.

---

## Void Elements in HTML

Void elements are HTML elements that cannot have content, so they have no closing tag.

Examples:

```html
<img>
<br>
<hr>
<meta>
<input>
<link>
```

Example:

```html
<img src="image.jpg" alt="Example image">

<input type="text">
```
