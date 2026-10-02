---
id: state-vs-props
title: "State vs Props"
sidebar_label: "State vs Props"
sidebar_position: 6
description: "State vs Props — React interview notes."
---
| State                                  | Props                                             |
| -------------------------------------- | ------------------------------------------------- |
| Data managed inside a component        | Data passed from parent → child                   |
| Can be updated by the component itself | Read-only (immutable) for the receiving component |

```mermaid
flowchart TD
    P["Parent: owns state count"] -->|"props: count"| C1["Child A (reads count)"]
    P -->|"props: onIncrement"| C2["Child B (button)"]
    C2 -.->|"calls onIncrement()"| P
```

Data flows **down** as props; changes flow **up** as callback calls.

## What is state?

State is component-local data that changes over time and triggers re-renders when updated.

```text
state changes → component re-renders → UI shows new value
```

## What are props?

Props are read-only inputs passed from parent to child components.

```text
<Greeting name="Ali" />   →   function Greeting({ name }) { ... }   // name = "Ali"
```

---
