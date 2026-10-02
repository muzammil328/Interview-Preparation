---
id: global-vs-local-install
title: "Global vs Local Install"
sidebar_label: "Global vs Local Install"
sidebar_position: 2
description: "Global vs Local Install — Node Package Manager (NPM) interview notes."
---
| Local (default)                    | Global (`-g`)                            |
| ---------------------------------- | ---------------------------------------- |
| Installed in project `node_modules` | Installed once for the whole machine     |
| Listed in `package.json`           | Not listed in any project                |
| Version fixed per project          | Same version everywhere                  |
| Preferred for libraries and tools  | Only for CLIs you use everywhere         |

```bash
npm install express        # local
npm install -g nodemon     # global
```

---
