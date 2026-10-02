---
id: difference-between-inline-block-and-inline-block
title: "Difference Between Inline, Block, and Inline-block"
sidebar_label: "Difference Between Inline, Block, and Inline-block"
sidebar_position: 7
description: "Difference Between Inline, Block, and Inline-block — CSS interview notes."
---
| Inline | Block | Inline-block |
|---|---|---|
| Does not start a new line. | Starts on a new line. | Stays inline but supports width/height. |
| Width and height ignored; vertical margin/padding does not push other lines. | Takes full available width. | Allows custom width, height, and margins. |
| Example: `<span>` | Example: `<div>` | Example: `<button>` |

```text
inline:        text [span] text [span] text

block:         ┌──────────── div ────────────┐
               └─────────────────────────────┘

inline-block:  text ┌──────┐ text ┌──────┐ text
                    │100x40│      │100x40│
                    └──────┘      └──────┘
```

---
