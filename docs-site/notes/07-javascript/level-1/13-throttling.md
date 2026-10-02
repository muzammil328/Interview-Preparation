---
id: throttling
title: "Throttling"
sidebar_label: "Throttling"
sidebar_position: 13
description: "Throttling — JavaScript interview notes."
---
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

---
