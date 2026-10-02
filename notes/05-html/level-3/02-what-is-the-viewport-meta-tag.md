---
id: what-is-the-viewport-meta-tag
title: "What is the Viewport Meta Tag?"
sidebar_label: "What is the Viewport Meta Tag?"
sidebar_position: 2
description: "What is the Viewport Meta Tag? — HTML interview notes."
---
It tells mobile browsers to use the device width instead of a fake 980px desktop width. Without it, responsive CSS / media queries do not work properly on phones.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

```text
Without viewport meta           With viewport meta
┌───────────┐                   ┌───────────┐
│ tiny tiny │  page rendered    │  Readable │  page width =
│ tiny text │  at 980px, then   │  text and │  device width
│ zoomed out│  shrunk to fit    │  layout   │  (e.g. 390px)
└───────────┘                   └───────────┘
```

---
