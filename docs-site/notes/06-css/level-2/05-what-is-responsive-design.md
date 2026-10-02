---
id: what-is-responsive-design
title: "What is Responsive Design?"
sidebar_label: "What is Responsive Design?"
sidebar_position: 5
description: "What is Responsive Design? — CSS interview notes."
---
Responsive design means creating layouts that adapt to different screen sizes and devices.

```text
Desktop                    Tablet              Mobile
┌──────┬──────┬──────┐     ┌──────┬──────┐     ┌──────┐
│  1   │  2   │  3   │     │  1   │  2   │     │  1   │
└──────┴──────┴──────┘     ├──────┼──────┘     ├──────┤
                           │  3   │            │  2   │
                           └──────┘            ├──────┤
                                               │  3   │
                                               └──────┘
```

Techniques:

- Viewport meta tag
- Flexible layouts (flex, grid, `%`, `fr`)
- Media queries
- Relative units
- Responsive images (`max-width: 100%`, `srcset`)

---
