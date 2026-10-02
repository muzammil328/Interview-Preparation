---
id: css-units
title: "CSS Units"
sidebar_label: "CSS Units"
sidebar_position: 2
description: "CSS Units — CSS interview notes."
---
CSS units are divided into two categories:

## Relative Units

Adapt according to context.

| Unit | Description |
|---|---|
| `em` | Relative to the element's own font size (for `font-size` itself, relative to the parent's). |
| `rem` | Relative to root (`html`) font size. |
| `%` | Relative to the parent / containing block (depends on property). |
| `vw` | 1% of viewport width. |
| `vh` | 1% of viewport height. |

```text
html { font-size: 16px }
 └── .parent { font-size: 20px }
       └── .child
             font-size: 2em   → 40px  (2 × parent 20px)
             font-size: 2rem  → 32px  (2 × root 16px)

em compounds when nested:
1.5em inside 1.5em inside 16px = 16 × 1.5 × 1.5 = 36px
rem never compounds → predictable
```

**When to use:** `rem` for font sizes and spacing, `%` / `fr` for layout widths, `vw/vh` for full-screen sections, `px` for borders.

## Absolute Units

Fixed size units.

Examples:

- `px`
- `cm`
- `mm`
- `in`

---
