---
id: package-lock-json
title: "package-lock.json"
sidebar_label: "package-lock.json"
sidebar_position: 3
description: "package-lock.json — Node Package Manager (NPM) interview notes."
---
`package-lock.json` is an **automatically generated file** that records the exact versions of all installed packages and their sub-dependencies inside the `node_modules` folder.

```text
package.json         "express": "^4.19.2"     → a RANGE  (any 4.x.x ≥ 4.19.2)
package-lock.json    "express": "4.19.2"      → the EXACT version installed
                     + every sub-dependency, exact version + integrity hash
```

It ensures:

* Consistent installations across different environments
* Exact dependency versions
* Reliable builds in development and production

**Always commit the lockfile.** Never commit `node_modules`.

---
