---
id: automatic-code-splitting
title: "Automatic Code Splitting"
sidebar_label: "Automatic Code Splitting"
sidebar_position: 7
description: "Automatic Code Splitting — Next.js interview notes."
---
Next.js automatically splits JavaScript bundles.

Benefits:

* Each page loads only required JavaScript
* Faster page loading
* Better performance

```text
Visit /about  ──► shared.js + about.js
Visit /blog   ──► shared.js (cached) + blog.js
(dashboard.js is never downloaded unless you visit /dashboard)
```

---
