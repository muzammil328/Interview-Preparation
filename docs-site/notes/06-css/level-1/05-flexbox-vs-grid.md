---
id: flexbox-vs-grid
title: "Flexbox vs Grid"
sidebar_label: "Flexbox vs Grid"
sidebar_position: 5
description: "Flexbox vs Grid — CSS interview notes."
---
| Flexbox | Grid |
|---|---|
| One-dimensional layout system. | Two-dimensional layout system. |
| Works with rows OR columns. | Works with rows AND columns. |
| Content-first: items decide their size. | Layout-first: the grid decides where items go. |
| Example: Navbar, button groups. | Example: Dashboard layouts, page layouts. |

```text
Flexbox (one direction)              Grid (two directions)
main axis ───────────────►          ┌──────┬──────┬──────┐
┌─────┐┌─────────┐┌───┐             │  1   │  2   │  3   │
│  1  ││    2    ││ 3 │  ↕ cross    ├──────┼──────┼──────┤
└─────┘└─────────┘└───┘    axis     │  4   │  5   │  6   │
                                    └──────┴──────┴──────┘
justify-content → main axis          grid-template-columns
align-items     → cross axis         grid-template-rows
```

Example:

### Flexbox

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### Grid

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
```

**Tip:** they work well together — Grid for the page, Flexbox inside each card.

---
