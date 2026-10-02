---
id: debouncing
title: "Debouncing"
sidebar_label: "Debouncing"
sidebar_position: 12
description: "Debouncing — JavaScript interview notes."
---
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

---
