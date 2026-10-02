---
id: what-is-box-sizing-border-box
title: "What is box-sizing: border-box?"
sidebar_label: "What is box-sizing: border-box?"
sidebar_position: 1
description: "What is box-sizing: border-box? — CSS interview notes."
---
`box-sizing: border-box` includes padding and border inside the defined width and height.

## content-box (Default)

```text
Total Width = width + padding + border
```

## border-box

```text
Total Width = width
```

Example:

```css
.box {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
}
```

```text
width: 300px; padding: 20px; border: 5px

content-box:                      border-box:
|5|20|──── 300 ────|20|5|          |5|20|── 250 ──|20|5|
└──────── 350px ────────┘          └────── 300px ──────┘
 box grows                          box stays 300px,
                                    content shrinks
```

Common reset:

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

---
