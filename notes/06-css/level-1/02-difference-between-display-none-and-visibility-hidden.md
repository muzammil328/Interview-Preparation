---
id: difference-between-display-none-and-visibility-hidden
title: "Difference Between display: none and visibility: hidden"
sidebar_label: "Difference Between display: none and visibility: hidden"
sidebar_position: 2
description: "Difference Between display: none and visibility: hidden — CSS interview notes."
---
| `display: none` | `visibility: hidden` | `opacity: 0` |
|---|---|---|
| Removes the element completely from the layout. | Hides the element but keeps its space. | Invisible but keeps space. |
| Element takes zero space. | Element still occupies space. | Element still occupies space. |
| Other elements move into its place. | Other elements do not move. | Other elements do not move. |
| Not clickable. | Not clickable. | **Still clickable.** |

```text
Original:            [ A ][ B ][ C ]
B display:none:      [ A ][ C ]          ← C moves left
B visibility:hidden: [ A ][   ][ C ]     ← gap stays
B opacity:0:         [ A ][   ][ C ]     ← gap stays, B still clickable
```

Example:

```css
.hidden {
  display: none;
}

.invisible {
  visibility: hidden;
}
```

---
