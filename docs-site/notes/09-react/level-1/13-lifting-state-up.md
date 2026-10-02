---
id: lifting-state-up
title: "Lifting State Up"
sidebar_label: "Lifting State Up"
sidebar_position: 13
description: "Lifting State Up — React interview notes."
---
Moving local state from child components up to their closest common parent, so multiple children can share, sync, and update the same data.

```jsx
function Parent() {
  const [value, setValue] = useState('');
  return (
    <>
      <SearchInput value={value} onChange={setValue} />
      <ResultsList query={value} />
    </>
  );
}
```

```mermaid
flowchart TD
    subgraph Before["Before: siblings can't share"]
        A1["SearchInput (own state)"]
        B1["ResultsList (needs the query)"]
    end
    subgraph After["After: state lifted to Parent"]
        P["Parent: value, setValue"] -->|"value, onChange"| A2["SearchInput"]
        P -->|"query"| B2["ResultsList"]
    end
```

---
