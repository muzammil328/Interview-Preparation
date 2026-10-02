---
id: what-is-important
title: "What is !important?"
sidebar_label: "What is !important?"
sidebar_position: 2
description: "What is !important? — CSS interview notes."
---
`!important` makes a declaration win over every normal declaration, regardless of specificity.

Example:

```css
p {
  color: red !important;
}
```

```text
#main p { color: blue; }        ← higher specificity
p       { color: red !important; } ← still wins
```

### Note:

Use `!important` carefully because it can make CSS harder to maintain. The only way to beat it is another `!important` with higher specificity.

---
