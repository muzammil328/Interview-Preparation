---
id: controlled-vs-uncontrolled-components
title: "Controlled vs Uncontrolled Components"
sidebar_label: "Controlled vs Uncontrolled Components"
sidebar_position: 9
description: "Controlled vs Uncontrolled Components — React interview notes."
---
| Controlled                                           | Uncontrolled                                 |
| ---------------------------------------------------- | -------------------------------------------- |
| Data stored in React state                           | Data stored directly in the DOM              |
| Value read from a state variable                     | Value read via a ref (`useRef`) when needed  |
| Re-renders on every keystroke                        | Typing does not re-render the component      |
| Enables real-time, character-by-character validation | Validation usually happens at submit time    |

```jsx
// Controlled
const [name, setName] = useState('');
<input value={name} onChange={(e) => setName(e.target.value)} />;

// Uncontrolled
const inputRef = useRef(null);
<input ref={inputRef} defaultValue="" />;
```

```mermaid
flowchart LR
    subgraph Controlled
        U1["User types"] --> O1["onChange"] --> S1["setName"] --> R1["Re-render"] --> I1["input value = name"]
    end
    subgraph Uncontrolled
        U2["User types"] --> D2["DOM keeps the value"]
        D2 -.->|"on submit"| Ref["inputRef.current.value"]
    end
```

---
