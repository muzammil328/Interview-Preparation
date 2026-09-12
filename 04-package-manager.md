# Node Package Manager (NPM)

## Major NPM Alternatives

Four major and widely used package managers are:

1. **npm**
2. **Yarn**
3. **pnpm**
4. **Bun**

## What is NPM?

**NPM (Node Package Manager)** is a package management tool for JavaScript and Node.js projects. It is used through the **CLI (Command Line Interface)** to:

* Install packages
* Update dependencies
* Remove packages
* Manage project dependencies

---

# package.json

`package.json` is the project's **manifest file** that stores metadata and configuration information about the application.

It contains:

* Project name
* Version
* Scripts
* Dependencies
* DevDependencies
* Other project settings

Example:

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js"
  }
}
```

---

# package-lock.json

`package-lock.json` is an **automatically generated file** that records the exact versions of all installed packages and their sub-dependencies inside the `node_modules` folder.

It ensures:

* Consistent installations across different environments
* Exact dependency versions
* Reliable builds in development and production

---

# Difference Between dependencies and devDependencies

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

---

# Difference Between npm install and npm ci

| Command       | Description                                                                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm install` | Reads `package.json` and installs dependencies. It can update `package-lock.json` if newer compatible versions are available.                                    |
| `npm ci`      | Performs a clean installation using only `package-lock.json`. It removes the existing `node_modules` folder and is faster and more reliable for CI/CD pipelines. |

## npm install

* Used during normal development
* Can modify `package-lock.json`
* Installs missing dependencies

## npm ci (Clean Install)

* Used in automated environments
* Strictly follows `package-lock.json`
* Deletes existing `node_modules`
* Provides faster and predictable installations

---

# Caret (^) and Tilde (~) Symbols in package.json

Version symbols control which package updates are allowed.

## Caret (^)

The **caret (`^`)** allows updates to **minor and patch versions**.

Example:

```json
"express": "^1.2.3"
```

Allows:

```text
1.2.4
1.3.0
```

Does not allow:

```text
2.0.0
```

---

## Tilde (~)

The **tilde (`~`)** allows updates only to **patch versions**.

Example:

```json
"express": "~1.2.3"
```

Allows:

```text
1.2.4
```

Does not allow:

```text
1.3.0
```

---

# Summary

| Concept           | Purpose                                                     |
| ----------------- | ----------------------------------------------------------- |
| npm               | Package manager used to install and manage Node.js packages |
| package.json      | Stores project metadata, scripts, and dependencies          |
| package-lock.json | Locks exact dependency versions                             |
| dependencies      | Packages required in production                             |
| devDependencies   | Packages required only for development                      |
| npm install       | Flexible dependency installation                            |
| npm ci            | Clean and exact installation for CI/CD                      |
| ^                 | Allows minor and patch updates                              |
| ~                 | Allows only patch updates                                   |
