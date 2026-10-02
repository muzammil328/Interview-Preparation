---
id: debouncing-vs-throttling
title: "Debouncing vs Throttling"
sidebar_label: "Debouncing vs Throttling"
sidebar_position: 14
description: "Debouncing vs Throttling — JavaScript interview notes."
---
Both control how often a function runs, especially for search, scroll, and resize events.

| Debouncing                                | Throttling                          |
| ----------------------------------------- | ----------------------------------- |
| Runs after the user stops triggering the event | Runs at most once in a fixed time |
| Waits until the activity stops            | Runs at regular intervals           |
| Good for search input                     | Good for scrolling                  |
| User types → wait → one API call          | User scrolls → runs every 200ms     |

```text
Events:     ● ● ● ● ● ● ● ●           ● ● ●
Debounce:                     ✓                  ✓      (only after the pause)
Throttle:   ✓       ✓       ✓         ✓     ✓          (regular beats)
```

---
