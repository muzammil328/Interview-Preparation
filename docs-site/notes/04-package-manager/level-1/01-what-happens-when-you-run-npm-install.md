---
id: what-happens-when-you-run-npm-install
title: "What happens when you run npm install?"
sidebar_label: "What happens when you run npm install?"
sidebar_position: 1
description: "What happens when you run npm install? — Node Package Manager (NPM) interview notes."
---
## What is NPM?

**NPM (Node Package Manager)** is a package management tool for JavaScript and Node.js projects. It is used through the **CLI (Command Line Interface)** to:

* Install packages
* Update dependencies
* Remove packages
* Manage project dependencies

It also refers to the **npm registry** — the online database (npmjs.com) where packages are published.

```text
npmjs.com registry  ──npm install──►  node_modules/  (your project)
        ▲
        └────────── npm publish ────  your package
```

---

```mermaid
flowchart TD
    A["npm install"] --> B{"package-lock.json<br/>exists?"}
    B -- Yes --> C["Use exact versions<br/>from the lockfile"]
    B -- No --> D["Resolve versions from<br/>package.json ranges (^, ~)"]
    C --> E["Download from registry<br/>(or local cache)"]
    D --> E
    E --> F["Write node_modules/"]
    F --> G["Create / update<br/>package-lock.json"]
    G --> H["Run install scripts<br/>(postinstall)"]
```

---
