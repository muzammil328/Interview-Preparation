---
id: difference-between-dependencies-and-devdependencies
title: "Difference Between dependencies and devDependencies"
sidebar_label: "Difference Between dependencies and devDependencies"
sidebar_position: 4
description: "Difference Between dependencies and devDependencies — Node Package Manager (NPM) interview notes."
---
```text
                        Needed at runtime in production?
                         ┌───────────┴───────────┐
                        YES                       NO
                         │                        │
                  dependencies             devDependencies
              express, react, axios     jest, eslint, typescript,
                                         nodemon, vite
```

## dependencies

`dependencies` are packages required for the application to run in production.

Examples:

* `express`
* `react`
* `lodash`

Install using:

```bash
npm install package-name
```

---

## devDependencies

`devDependencies` are packages only needed during local development, testing, and building.

Examples:

* `jest`
* `eslint`
* `typescript`

Install using:

```bash
npm install package-name --save-dev
```

`npm install --omit=dev` (or `NODE_ENV=production npm install`) skips devDependencies — used in production servers and Docker images.

---
