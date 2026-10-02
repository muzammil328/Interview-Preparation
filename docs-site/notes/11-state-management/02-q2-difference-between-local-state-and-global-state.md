---
id: q2-difference-between-local-state-and-global-state
title: "Q2. Difference between local state and global state?"
sidebar_label: "Q2. Difference between local state and global state?"
sidebar_position: 2
description: "Q2. Difference between local state and global state? — State Management interview notes."
---
| Local State                                   | Global State                             |
| --------------------------------------------- | ---------------------------------------- |
| Used by one component or a small part of the UI | Shared across many components            |
| Usually managed with `useState` / `useReducer` | Usually managed with Redux, Zustand, Context, etc. |
| Example: input value, modal open/close        | Example: logged-in user, theme, cart     |
| Easier to manage                              | More complex to manage                   |

**Rule:** start with local state. Lift it up to the nearest common parent when two siblings need it. Use global state only when many distant components need it.

```mermaid
flowchart TD
    A["New piece of state"] --> B{"Comes from<br/>the server?"}
    B -- Yes --> S["Server state<br/>TanStack Query / SWR"]
    B -- No --> C{"Used by one<br/>component?"}
    C -- Yes --> L["useState / useReducer"]
    C -- No --> D{"Used by a few<br/>nearby components?"}
    D -- Yes --> U["Lift state up<br/>to common parent"]
    D -- No --> E{"Changes rarely?<br/>(theme, auth, locale)"}
    E -- Yes --> CTX["Context API"]
    E -- No --> G["Redux Toolkit / Zustand"]
```

---
