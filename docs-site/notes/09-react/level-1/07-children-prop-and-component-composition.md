---
id: children-prop-and-component-composition
title: "Children Prop & Component Composition"
sidebar_label: "Children Prop & Component Composition"
sidebar_position: 7
description: "Children Prop & Component Composition — React interview notes."
---
`children` is whatever you put between a component's opening and closing tags. Composition (passing components as children) is a common way to avoid prop drilling.

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

<Card>
  <h2>Title</h2>
  <p>Body</p>
</Card>
```

```mermaid
flowchart TD
    Card["Card (layout only)"] --> Ch["children"]
    Ch --> H["h2 Title"]
    Ch --> P["p Body"]
```

---
