---
id: event-bubbling-vs-capturing
title: "Event Bubbling vs Capturing"
sidebar_label: "Event Bubbling vs Capturing"
sidebar_position: 15
description: "Event Bubbling vs Capturing — JavaScript interview notes."
---
When you click an element, the event travels in **three phases**:

```text
            window
              │  ▲
   1. CAPTURE │  │ 3. BUBBLE
     (down)   ▼  │   (up)
           document
              │  ▲
              ▼  │
            <div>
              │  ▲
              ▼  │
           <button>  ◄── 2. TARGET (you clicked here)
```

- **Bubbling**: Event propagates from child to parent (default)
- **Capturing**: Event propagates from parent to child

```javascript
// Bubbling (default)
element.addEventListener('click', handler);

// Capturing
element.addEventListener('click', handler, true);

// Stop the event from travelling further
element.addEventListener('click', e => e.stopPropagation());
```

| Method | What it does |
| ------ | ------------ |
| `e.stopPropagation()` | Stops bubbling/capturing to other elements |
| `e.preventDefault()` | Stops the browser's default action (form submit, link navigation) |

---
