---
id: docker-volumes
title: "Docker Volumes"
sidebar_label: "Docker Volumes"
sidebar_position: 3
description: "Docker Volumes — Docker interview notes."
---
A container's filesystem is **lost when the container is removed**. Volumes store data **outside** the container so it survives restarts and removal.

| Type          | Example                                   | Use for                          |
| ------------- | ----------------------------------------- | -------------------------------- |
| Named volume  | `-v pgdata:/var/lib/postgresql/data`      | Databases, persistent data (managed by Docker) |
| Bind mount    | `-v $(pwd):/app`                          | Local development (live code reload) |
| tmpfs         | `--tmpfs /tmp`                            | Temporary in-memory data         |

```mermaid
flowchart LR
    subgraph Host
        V[("Volume: pgdata")]
    end
    C1["postgres container v1"] -->|mounts| V
    C2["postgres container v2<br/>(after upgrade)"] -->|mounts same data| V
```

---
