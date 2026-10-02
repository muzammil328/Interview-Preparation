---
id: cmd-vs-entrypoint
title: "CMD vs ENTRYPOINT"
sidebar_label: "CMD vs ENTRYPOINT"
sidebar_position: 3
description: "CMD vs ENTRYPOINT — Docker interview notes."
---
| CMD                                          | ENTRYPOINT                                   |
| -------------------------------------------- | -------------------------------------------- |
| Default command, **easily overridden**       | Fixed executable, **not overridden** by args |
| `docker run img npm test` replaces it        | `docker run img --flag` appends `--flag`     |

When both are used, `CMD` becomes the **default arguments** to `ENTRYPOINT`.

```dockerfile
ENTRYPOINT ["node"]
CMD ["server.js"]
# docker run img            → node server.js
# docker run img worker.js  → node worker.js
```

```text
docker run img [args]
        │
        ▼
ENTRYPOINT  +  (args  OR  CMD if no args)
```

Also: `RUN` executes at **build time**; `CMD`/`ENTRYPOINT` execute at **run time**.

---
