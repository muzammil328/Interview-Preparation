---
id: pseudo-classes-vs-pseudo-elements
title: "Pseudo-classes vs Pseudo-elements"
sidebar_label: "Pseudo-classes vs Pseudo-elements"
sidebar_position: 4
description: "Pseudo-classes vs Pseudo-elements — CSS interview notes."
---
| Pseudo-class | Pseudo-element |
|---|---|
| Selects an element in a certain **state**. | Styles a specific **part** of an element. |
| Uses single colon `:`. | Uses double colon `::` (single `:` still works for old ones). |
| Examples: `:hover`, `:focus`, `:nth-child()` | Examples: `::before`, `::after`, `::first-letter`, `::placeholder` |

```text
Pseudo-class (state)           Pseudo-element (part)
┌────────────┐                 ┌──────────────────────────┐
│  Button    │ ← :hover        │ ::before  Text  ::after  │
└────────────┘   when mouse    │ ▲                        │
                 is over it    │ ::first-letter           │
                               └──────────────────────────┘
```

Example:

```css
button:hover {
  background: blue;
}

p::first-letter {
  font-size: 30px;
}

.required::after {
  content: " *";
  color: red;
}
```

`::before` and `::after` need the `content` property, or they do not render.

---
