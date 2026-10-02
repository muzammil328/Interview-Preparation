---
id: f4-stateless-servers-and-sessions
title: "F4. Stateless Servers and Sessions"
sidebar_label: "F4. Stateless Servers and Sessions"
sidebar_position: 1
description: "F4. Stateless Servers and Sessions — System Design interview notes."
---

To scale horizontally, **any** server must be able to handle **any** request. So the server must not keep user data in its own memory.

```text
✗ Stateful                          ✓ Stateless

Request 1 → Server A (saves session in RAM)    Request 1 → Server A ─┐
Request 2 → Server B (session not found!)      Request 2 → Server B ─┤
                                                                      ▼
                                                        Redis / DB / JWT
                                                       (shared session)
```

Store sessions in **Redis**, or use a **JWT** the client sends on every request.

---
