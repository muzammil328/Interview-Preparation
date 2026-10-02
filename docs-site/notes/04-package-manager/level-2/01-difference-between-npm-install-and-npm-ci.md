---
id: difference-between-npm-install-and-npm-ci
title: "Difference Between npm install and npm ci"
sidebar_label: "Difference Between npm install and npm ci"
sidebar_position: 1
description: "Difference Between npm install and npm ci — Node Package Manager (NPM) interview notes."
---
| Command       | Description                                                                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm install` | Reads `package.json` and installs dependencies. It can update `package-lock.json` if newer compatible versions are available.                                    |
| `npm ci`      | Performs a clean installation using only `package-lock.json`. It removes the existing `node_modules` folder and is faster and more reliable for CI/CD pipelines. |

```text
npm install:  package.json ──► resolve ──► node_modules  (+ may rewrite lockfile)
npm ci:       delete node_modules ──► lockfile only ──► node_modules
              (fails if package.json and lockfile don't match)
```

## npm install

* Used during normal development
* Can modify `package-lock.json`
* Installs missing dependencies

## npm ci (Clean Install)

* Used in automated environments
* Strictly follows `package-lock.json`
* Deletes existing `node_modules`
* Never writes to `package-lock.json`; fails if it is out of sync with `package.json`
* Provides faster and predictable installations

---
