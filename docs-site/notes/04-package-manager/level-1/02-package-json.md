---
id: package-json
title: "package.json"
sidebar_label: "package.json"
sidebar_position: 2
description: "package.json — Node Package Manager (NPM) interview notes."
---
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
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.19.2"
  },
  "devDependencies": {
    "jest": "^29.7.0"
  }
}
```

Run a script with `npm run dev`. (`start` and `test` also work without `run`: `npm start`, `npm test`.)

---
