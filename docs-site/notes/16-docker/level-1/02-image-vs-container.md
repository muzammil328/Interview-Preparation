---
id: image-vs-container
title: "Image vs Container"
sidebar_label: "Image vs Container"
sidebar_position: 2
description: "Image vs Container — Docker interview notes."
---
- **Image**: a read-only template (a blueprint). Built from a Dockerfile.
- **Container**: a running instance of an image. It adds a thin writable layer on top.

One image can start many containers — like one class creating many objects.

| Image                          | Container                          |
| ------------------------------ | ---------------------------------- |
| Read-only template             | Running (or stopped) instance      |
| Built with `docker build`      | Created with `docker run`          |
| Stored in a registry (Docker Hub, ECR) | Lives on a host machine    |
| Like a **class**               | Like an **object**                 |

```text
          ┌─────────────┐
          │    Image    │   (read-only)
          └──────┬──────┘
       ┌─────────┼─────────┐
       ▼         ▼         ▼
 ┌──────────┐┌──────────┐┌──────────┐
 │Container1││Container2││Container3│  (each has its own writable layer)
 └──────────┘└──────────┘└──────────┘
```

```bash
docker build -t my-app .        # image
docker run -d -p 3000:3000 my-app   # container
docker ps                        # list running containers
docker images                    # list images
```

---
