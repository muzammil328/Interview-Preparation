---
id: prop-drilling
title: "Prop Drilling"
sidebar_label: "Prop Drilling"
sidebar_position: 14
description: "Prop Drilling — React interview notes."
---
Passing data through multiple components that don't actually need the data themselves.

```mermaid
flowchart TD
    App["App (has user)"] -->|user| Layout["Layout (doesn't use it)"]
    Layout -->|user| Sidebar["Sidebar (doesn't use it)"]
    Sidebar -->|user| UserProfile["UserProfile (doesn't use it)"]
    UserProfile -->|user| User["User (finally uses it)"]
    Ctx["UserContext"] -.->|"useContext: skip the middle"| User
```

Solutions:

- Component composition (pass JSX as `children`)
- Context
- State-management libraries
- Better component architecture

**Note:** prop drilling isn't automatically bad. Passing props through one or two levels is often perfectly fine.

---
