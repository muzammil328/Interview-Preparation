---
id: what-is-pm2
title: "What is PM2?"
sidebar_label: "What is PM2?"
sidebar_position: 3
description: "What is PM2? — VPS interview notes."
---

**PM2** is a process manager for Node.js in production.

- **Restarts** the app automatically if it crashes.
- **Starts on boot** after a server reboot.
- **Cluster mode** — runs one instance per CPU core.
- Logs and monitoring (`pm2 logs`, `pm2 monit`).
- **Zero-downtime reload** in cluster mode (`pm2 reload`).

```bash
pm2 start dist/server.js --name api -i max   # cluster mode, one per core
pm2 save                                     # remember the process list
pm2 startup                                  # start PM2 on boot
pm2 reload api                               # zero-downtime reload
pm2 logs api
```

```text
            PM2 (cluster mode, 4 cores)
   ┌──────────┬──────────┬──────────┬──────────┐
   │ worker 1 │ worker 2 │ worker 3 │ worker 4 │   all share port 3000
   └──────────┴──────────┴──────────┴──────────┘
   worker crashes → PM2 restarts it automatically
```

---
