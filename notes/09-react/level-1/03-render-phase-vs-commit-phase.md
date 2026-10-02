---
id: render-phase-vs-commit-phase
title: "Render Phase vs Commit Phase"
sidebar_label: "Render Phase vs Commit Phase"
sidebar_position: 3
description: "Render Phase vs Commit Phase — React interview notes."
---
React does its work in two phases. Only the commit phase touches the real DOM.

| Render Phase                                   | Commit Phase                                   |
| ---------------------------------------------- | ---------------------------------------------- |
| Calls your component functions                 | Applies changes to the real DOM                |
| Pure — no side effects allowed                 | Side effects are allowed here (refs, effects)  |
| Can be paused, restarted, or thrown away       | Runs synchronously, cannot be interrupted      |
| May run more than once (Strict Mode, concurrent) | Runs once per update                          |

```text
setState()
   │
   ▼
┌──────────── RENDER PHASE (pure, interruptible) ────────────┐
│  call App() → call Child() → build new virtual tree → diff │
└────────────────────────────────────────────────────────────┘
   │
   ▼
┌──────────── COMMIT PHASE (sync, touches DOM) ──────────────┐
│  update DOM → attach refs → useLayoutEffect → paint        │
└────────────────────────────────────────────────────────────┘
   │
   ▼
useEffect runs (after paint)
```

**Why it matters:** because render can run more than once, never put side effects (API calls, subscriptions, mutations) directly in the component body — put them in `useEffect` or event handlers.

---
