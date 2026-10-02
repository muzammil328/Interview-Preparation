---
id: npm-vs-yarn-vs-pnpm-vs-bun
title: "npm vs Yarn vs pnpm vs Bun"
sidebar_label: "npm vs Yarn vs pnpm vs Bun"
sidebar_position: 2
description: "npm vs Yarn vs pnpm vs Bun — Node Package Manager (NPM) interview notes."
---
Four major and widely used package managers are **npm, Yarn, pnpm, and Bun**.

| Feature           | npm                   | Yarn                    | pnpm                                   | Bun                          |
| ----------------- | --------------------- | ----------------------- | -------------------------------------- | ---------------------------- |
| Comes with Node   | Yes                   | No                      | No                                     | No (separate runtime)        |
| Lockfile          | `package-lock.json`   | `yarn.lock`             | `pnpm-lock.yaml`                       | `bun.lock`                   |
| Disk usage        | Copy per project      | Copy per project (v1)   | One global store + links (saves space) | Copy per project             |
| Speed             | Good                  | Good                    | Fast                                   | Very fast                    |
| Strict deps       | No (flat hoisting)    | No (v1)                 | Yes — can't import undeclared packages | No                           |
| Workspaces        | Yes                   | Yes                     | Yes                                    | Yes                          |

```text
npm / yarn:                         pnpm:

project-A/node_modules/react  ┐     ~/.pnpm-store/react@18  ◄── stored once
project-B/node_modules/react  ┤          ▲         ▲
project-C/node_modules/react  ┘          │ link    │ link
   (3 copies on disk)              project-A    project-B
```

**Rule:** use one package manager per project — don't mix lockfiles.

---
