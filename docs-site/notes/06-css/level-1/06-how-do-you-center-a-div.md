---
id: how-do-you-center-a-div
title: "How Do You Center a div?"
sidebar_label: "How Do You Center a div?"
sidebar_position: 6
description: "How Do You Center a div? — CSS interview notes."
---
The most common practical CSS question.

```css
/* 1. Flexbox (most common) */
.parent {
  display: flex;
  justify-content: center; /* horizontal */
  align-items: center;     /* vertical */
}

/* 2. Grid (shortest) */
.parent {
  display: grid;
  place-items: center;
}

/* 3. Absolute + transform */
.parent { position: relative; }
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 4. Horizontal only (block with width) */
.child {
  width: 300px;
  margin: 0 auto;
}
```

```text
Absolute + transform explained:

top:50%; left:50%              translate(-50%, -50%)
┌──────────────────┐           ┌──────────────────┐
│                  │           │                  │
│         ┌─────┐  │           │      ┌─────┐     │
│         │child│  │   ──►     │      │child│     │
│         └─────┘  │           │      └─────┘     │
│                  │           │                  │
└──────────────────┘           └──────────────────┘
 top-left corner is             child moved back by half
 at the center                  its own size → truly centered
```

---
