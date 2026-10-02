---
id: q16-polling-vs-long-polling-vs-sse-vs-websockets
title: "Q16. Polling vs Long Polling vs SSE vs WebSockets"
sidebar_label: "Q16. Polling vs Long Polling vs SSE vs WebSockets"
sidebar_position: 8
description: "Q16. Polling vs Long Polling vs SSE vs WebSockets — System Design interview notes."
---

How does the server push live updates (scores, notifications, chat) to the browser?

```text
Short polling     Client: any news? ─► No.   (every 5s, mostly wasted)
Long polling      Client: any news? ─► server HOLDS the request until news, then replies
SSE               Client opens one connection ◄── server streams events (one way)
WebSocket         Client ◄──────────────────► Server (two-way, persistent)
```

| | Direction | Use for |
| - | --------- | ------- |
| Short polling | Client → Server | Simple, low-frequency updates |
| Long polling | Client → Server | Fallback when WebSockets are blocked |
| SSE | Server → Client | Live feeds, notifications, AI token streaming |
| WebSocket | Both | Chat, multiplayer games, collaborative editing |

---
