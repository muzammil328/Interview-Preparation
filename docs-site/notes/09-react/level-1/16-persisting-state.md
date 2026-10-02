---
id: persisting-state
title: "Persisting State"
sidebar_label: "Persisting State"
sidebar_position: 16
description: "Persisting State — React interview notes."
---
- Browser storage (`localStorage`, `sessionStorage`)
- Cookies
- IndexedDB
- URL / query params (good for filters and pagination)

```mermaid
flowchart LR
    S["React state"] -->|"save on change"| L["localStorage / URL / cookie"]
    L -->|"read on mount / refresh"| S
```

---
