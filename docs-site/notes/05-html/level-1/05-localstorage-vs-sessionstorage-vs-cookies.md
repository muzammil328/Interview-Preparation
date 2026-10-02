---
id: localstorage-vs-sessionstorage-vs-cookies
title: "localStorage vs sessionStorage vs Cookies"
sidebar_label: "localStorage vs sessionStorage vs Cookies"
sidebar_position: 5
description: "localStorage vs sessionStorage vs Cookies — HTML interview notes."
---
| | localStorage | sessionStorage | Cookies |
|---|---|---|---|
| Size | ~5-10MB | ~5MB | ~4KB |
| Expires | Never (until removed) | When the tab is closed | Set by `Expires` / `Max-Age` |
| Scope | All tabs of the same origin | Only that one tab | Sent per domain/path |
| Sent to server? | No | No | **Yes, with every request** |
| Readable by JS? | Yes | Yes | Yes, unless `HttpOnly` |
| Typical use | Theme, preferences | Multi-step form data | Session / auth token |

```text
              Browser
┌──────────────────────────────────────┐
│ Tab A            Tab B               │
│ sessionStorage   sessionStorage      │ ← separate per tab
│        └──── localStorage ────┘      │ ← shared by all tabs
│        └────── Cookies ───────┘      │
└──────────────────┬───────────────────┘
                   │ every request carries cookies
                   ▼
                 Server
```

Example:

```javascript
localStorage.setItem("theme", "dark");

sessionStorage.setItem("step", "2");

document.cookie = "lang=en; max-age=86400; path=/";
```

**Security note:** do not store auth tokens in localStorage — any XSS script can read it. Prefer an `HttpOnly`, `Secure`, `SameSite` cookie, which JavaScript cannot read.

---
