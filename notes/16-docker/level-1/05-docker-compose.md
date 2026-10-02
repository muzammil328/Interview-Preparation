---
id: docker-compose
title: "Docker Compose"
sidebar_label: "Docker Compose"
sidebar_position: 5
description: "Docker Compose — Docker interview notes."
---
A tool to define and run **multi-container** apps from one YAML file.

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://postgres:secret@db:5432/app
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

```bash
docker compose up -d     # start everything
docker compose logs -f   # follow logs
docker compose down      # stop and remove containers
```

```mermaid
flowchart LR
    U["Browser"] -->|":3000"| API["api service"]
    API -->|"db:5432"| DB[("db service: postgres")]
    DB --- V[("pgdata volume")]
```

**Note:** `depends_on` only controls **start order**, not "database is ready". Use a healthcheck or retry logic for that.

---
