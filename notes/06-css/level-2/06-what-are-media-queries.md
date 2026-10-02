---
id: what-are-media-queries
title: "What are Media Queries?"
sidebar_label: "What are Media Queries?"
sidebar_position: 6
description: "What are Media Queries? — CSS interview notes."
---
Media queries apply CSS styles based on device characteristics like screen width, orientation, or user preferences.

Example:

```css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}

@media (prefers-color-scheme: dark) {
  body { background: #111; color: #eee; }
}
```

```text
0px ─────────── 768px ─────────── 1024px ───────────►
     mobile    │      tablet      │     desktop
               └ @media (min-width: 768px)
                                  └ @media (min-width: 1024px)
```

---
