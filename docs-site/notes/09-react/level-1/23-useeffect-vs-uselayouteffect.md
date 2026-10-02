---
id: useeffect-vs-uselayouteffect
title: "useEffect vs useLayoutEffect"
sidebar_label: "useEffect vs useLayoutEffect"
sidebar_position: 23
description: "useEffect vs useLayoutEffect — React interview notes."
---
| useEffect                                  | useLayoutEffect                                       |
| ------------------------------------------ | ----------------------------------------------------- |
| Runs **after** the browser paints          | Runs **before** the browser paints                    |
| Does not block the screen update           | Blocks paint until it finishes                        |
| Default choice: fetching, subscriptions    | Measuring the DOM (size/position) to avoid a flicker  |

```text
render → commit DOM → useLayoutEffect → 🖌️ paint → useEffect
```

Use `useLayoutEffect` only when the user would otherwise see a flicker (for example, positioning a tooltip based on its measured size).

---
