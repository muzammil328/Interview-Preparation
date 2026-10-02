---
id: what-causes-hydration-errors
title: "What Causes Hydration Errors?"
sidebar_label: "What Causes Hydration Errors?"
sidebar_position: 6
description: "What Causes Hydration Errors? — Next.js interview notes."
---
**Hydration** is when React attaches event handlers to the HTML the server already sent. Hydration errors occur when the HTML generated on the server does not match what React renders on the first client render.

Common causes:

* Reading `window` / `localStorage` during render
* Reading `document` during render
* Using `new Date()` or `Date.now()` during render
* Random values (`Math.random()`) during render
* Invalid HTML nesting (e.g. `<div>` inside `<p>`)
* Browser extensions that modify the DOM

```text
Server render:  <p>10:00:01</p>
Client render:  <p>10:00:03</p>     ✗ mismatch → hydration error
```

---
