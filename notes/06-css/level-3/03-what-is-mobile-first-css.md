---
id: what-is-mobile-first-css
title: "What is Mobile-First CSS?"
sidebar_label: "What is Mobile-First CSS?"
sidebar_position: 3
description: "What is Mobile-First CSS? — CSS interview notes."
---
Mobile-first CSS means writing styles for smaller screens first, then adding enhancements for larger screens with `min-width` media queries.

Example:

```css
.container {
  display: block;
}

@media (min-width: 768px) {
  .container {
    display: flex;
  }
}
```

```text
Mobile-first (min-width)          Desktop-first (max-width)
base styles = mobile              base styles = desktop
   │ + add for ≥768px                │ − undo for ≤768px
   ▼                                 ▼
 tablet                            tablet
   │ + add for ≥1024px               │ − undo for ≤480px
   ▼                                 ▼
 desktop                           mobile
```

**Why:** phones load less CSS, and adding is simpler than overriding.

---
