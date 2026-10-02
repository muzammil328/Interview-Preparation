---
id: memory-leaks-in-javascript
title: "Memory Leaks in JavaScript"
sidebar_label: "Memory Leaks in JavaScript"
sidebar_position: 10
description: "Memory Leaks in JavaScript — JavaScript interview notes."
---
A memory leak is memory that is no longer needed but cannot be freed because something still references it.

**Common causes:**

- Global variables
- Forgotten timers/setInterval
- Event listeners not removed
- Detached DOM nodes (removed from the page but still referenced in JS)
- Closures holding large objects longer than needed

```text
setInterval(() => update(bigData), 1000)   // never cleared
      │
      └── keeps callback alive ──► keeps bigData alive ──► memory grows forever

Fix: const id = setInterval(...);  later → clearInterval(id)
```

**Detection:** Browser DevTools → Memory tab → compare heap snapshots.

---
