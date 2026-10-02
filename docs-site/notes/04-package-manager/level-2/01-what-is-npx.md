---
id: what-is-npx
title: "What is npx?"
sidebar_label: "What is npx?"
sidebar_position: 1
description: "What is npx? — Node Package Manager (NPM) interview notes."
---
`npx` **runs** a package's command without installing it globally.

```text
npm  → installs packages
npx  → executes a package binary (downloads temporarily if not installed)
```

```bash
npx create-next-app@latest my-app   # run once, no global install
npx eslint .                        # run the project's local eslint
```

---
