---
id: what-is-css-specificity
title: "What is CSS Specificity?"
sidebar_label: "What is CSS Specificity?"
sidebar_position: 1
description: "What is CSS Specificity? — CSS interview notes."
---
When two rules target the same element, the browser uses **specificity** to pick the winner. Each selector gets a score `(IDs, Classes, Elements)`.

| Selector type | Score | Example |
|---|---|---|
| Inline style | wins over all selectors | `style="..."` |
| ID | (1, 0, 0) | `#header` |
| Class, attribute, pseudo-class | (0, 1, 0) | `.btn`, `[type="text"]`, `:hover` |
| Element, pseudo-element | (0, 0, 1) | `p`, `::before` |
| Universal `*` | (0, 0, 0) | `*` |

```text
          IDs  Classes  Elements
p           0      0       1
.btn        0      1       0
p.btn       0      1       1
#nav .link  1      1       0      ← highest, wins

Compare left to right like a version number:
(1,0,0) beats (0,10,0) — one ID beats any number of classes.
```

```css
p          { color: red;   } /* (0,0,1) */
.text      { color: blue;  } /* (0,1,0) ← wins */
```

**Order of decision:**

```text
!important ──► Inline style ──► Specificity ──► Source order (last one wins)
```

---
