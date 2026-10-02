---
id: what-are-peerdependencies
title: "What are peerDependencies?"
sidebar_label: "What are peerDependencies?"
sidebar_position: 1
description: "What are peerDependencies? — Node Package Manager (NPM) interview notes."
---
A **peerDependency** says: "I need this package, but **the app that uses me** must install it — don't install a second copy."

Used by **plugins and libraries**, for example a React component library.

```text
Without peerDependencies:            With peerDependencies:

my-app                               my-app
├── react@18                         ├── react@18   ◄── one shared copy
└── ui-lib                           └── ui-lib
    └── react@17   ✗ two Reacts           (peer: react >=17) ✓ uses app's React
                     → bugs
```

```json
{
  "name": "ui-lib",
  "peerDependencies": {
    "react": ">=17"
  }
}
```

---
