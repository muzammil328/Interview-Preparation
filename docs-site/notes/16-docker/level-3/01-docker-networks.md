---
id: docker-networks
title: "Docker Networks"
sidebar_label: "Docker Networks"
sidebar_position: 1
description: "Docker Networks — Docker interview notes."
---
Containers on the same user-defined network can reach each other **by container/service name** (built-in DNS).

| Driver   | Meaning                                             |
| -------- | --------------------------------------------------- |
| `bridge` | Default. Private network on one host.               |
| `host`   | Container uses the host's network directly.         |
| `none`   | No networking.                                      |
| `overlay`| Network across multiple hosts (Swarm).              |

```text
          my-network (bridge)
 ┌─────────────────────────────────┐
 │  ┌─────────┐       ┌─────────┐  │
 │  │   api   │──────►│   db    │  │   api connects to "db:5432"
 │  └────┬────┘       └─────────┘  │
 └───────┼─────────────────────────┘
         │ -p 3000:3000
         ▼
   Host port 3000  ◄── browser
```

**Port mapping** `-p 3000:3000` means `hostPort:containerPort`.

---
