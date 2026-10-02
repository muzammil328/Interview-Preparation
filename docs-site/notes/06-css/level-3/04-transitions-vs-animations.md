---
id: transitions-vs-animations
title: "Transitions vs Animations"
sidebar_label: "Transitions vs Animations"
sidebar_position: 4
description: "Transitions vs Animations — CSS interview notes."
---
| Transition | Animation |
|---|---|
| Goes from state A to state B. | Can have many steps with `@keyframes`. |
| Needs a trigger (`:hover`, class change). | Can run automatically on page load. |
| Runs once per trigger. | Can loop (`infinite`), reverse, pause. |
| Good for hover effects. | Good for loaders, attention effects. |

```css
/* Transition */
.btn {
  background: blue;
  transition: background 0.3s ease;
}
.btn:hover {
  background: green;
}

/* Animation */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.loader {
  animation: spin 1s linear infinite;
}
```

```text
Transition:   A ───────────► B          (trigger: hover)

Animation:    0% ──► 50% ──► 100% ──┐   (keyframes, can loop)
              ▲                     │
              └─────── infinite ────┘
```

**Performance tip:** animate `transform` and `opacity` only — they skip layout and paint (see next question).

---
