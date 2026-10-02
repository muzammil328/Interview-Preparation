---
id: commonjs-vs-es-modules
title: "CommonJS vs ES Modules"
sidebar_label: "CommonJS vs ES Modules"
sidebar_position: 7
description: "CommonJS vs ES Modules — Node.js interview notes."
---
| Feature       | CommonJS                        | ES Modules                         |
| ------------- | ------------------------------- | ---------------------------------- |
| Syntax        | `require()`                     | `import/export`                    |
| Export        | `module.exports`                | `export` / `export default`        |
| Loading       | Synchronous, at runtime         | Asynchronous, statically analyzed  |
| File type     | `.js` (default) or `.cjs`       | `.mjs` or `"type": "module"`       |
| Top-level await | No                            | Yes                                |
| `__dirname`   | Available                       | Not available (use `import.meta.dirname` / `import.meta.url`) |
| Tree-shaking  | Hard                            | Easy (static imports)              |

```javascript
// CommonJS
const { add } = require('./math');
module.exports = { add };

// ES Modules
import { add } from './math.js'; // extension required
export { add };
```

```mermaid
flowchart TB
    PKG{"package.json type?"}
    PKG -->|"module"| ESM[".js files = ES Modules"]
    PKG -->|"commonjs or missing"| CJS[".js files = CommonJS"]
    M[".mjs"] --> ESM2["Always ESM"]
    C[".cjs"] --> CJS2["Always CommonJS"]
```

---
