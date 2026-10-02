---
id: stale-closure-in-setinterval
title: "Stale Closure in setInterval"
sidebar_label: "Stale Closure in setInterval"
sidebar_position: 2
description: "Stale Closure in setInterval — Output Based interview notes."
---
```jsx
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>{count}</p>;
}
```

**Output:** shows `1` after one second, then **stays at `1` forever**.

The effect runs once (`[]`), so the interval callback closes over the **first** render's `count = 0`. Every tick sets `0 + 1`.

```text
Render #1: count = 0
  effect creates interval ──► callback remembers count = 0 (forever)
tick 1: setCount(0 + 1) → 1
tick 2: setCount(0 + 1) → 1   ← still sees 0
tick 3: setCount(0 + 1) → 1
```

**Fix:** `setCount((c) => c + 1)`, which doesn't need `count` from the closure.

---

# Rarely Asked (Lower Priority)
