---
id: jsx
title: "JSX"
sidebar_label: "JSX"
sidebar_position: 4
description: "JSX — React interview notes."
---
JSX stands for **JavaScript XML**. It lets you write HTML-like elements directly inside JavaScript.

Browsers cannot read JSX directly — a compiler like **Babel** transpiles it into `React.createElement()` calls (or the modern JSX runtime).

```jsx
const el = <h1 className="title">Hello</h1>;

// becomes roughly:
const el = React.createElement('h1', { className: 'title' }, 'Hello');
```

```mermaid
flowchart LR
    A["JSX: h1 className='title'"] --> B["Babel / compiler"]
    B --> C["React.createElement('h1', props, 'Hello')"]
    C --> D["Plain JS object (React element)"]
    D --> E["React renders it to the DOM"]
```

---
