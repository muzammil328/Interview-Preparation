---
id: debouncing-and-throttling
title: "Debouncing & Throttling"
sidebar_label: "Debouncing & Throttling"
sidebar_position: 12
description: "Debouncing & Throttling — JavaScript interview notes."
---
Both control how often a function runs, especially for search, scroll, and resize events.

## Debouncing

Delays execution until the user **stops** triggering the event for a set time.

```javascript
function debounce(fn, delay) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
```

```text
delay = 300ms

Keystrokes:   j   a   v   a          (pause)
Time:         0  100 200 300 ────────────── 600
Timer:        ✗   ✗   ✗   ⏱ reset ──300ms──► fn("java")  ✓ one API call
              each key cancels the previous timer
```

## Throttling

Limits a function to run **at most once** per time interval.

```javascript
function throttle(fn, limit) {
  let inThrottle;
  return function () {
    const context = this;
    const args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

```text
limit = 200ms

Scroll events: ││││││││││││││││││││││││││││││
Time:          0      200     400     600
fn runs:       ✓       ✓       ✓       ✓       ← steady, once per 200ms
```

## Debouncing vs Throttling

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
