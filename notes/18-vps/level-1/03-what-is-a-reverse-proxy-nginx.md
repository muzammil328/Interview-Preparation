---
id: what-is-a-reverse-proxy-nginx
title: "What is a Reverse Proxy (Nginx)?"
sidebar_label: "What is a Reverse Proxy (Nginx)?"
sidebar_position: 3
description: "What is a Reverse Proxy (Nginx)? — VPS interview notes."
---

A **reverse proxy** sits in front of your app servers and forwards client requests to them. The client only talks to Nginx; it never sees the app directly.

**Why use Nginx in front of Node:**

- **SSL termination** — handles HTTPS so the app stays on plain HTTP internally.
- **Serve static files** fast.
- **Load balancing** across multiple app instances.
- **Hide internal ports** — the app on port 3000 is not exposed to the internet.
- Gzip compression, caching, request size limits, rate limiting.

```nginx
server {
    listen 80;
    server_name myapp.com www.myapp.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

```text
Forward proxy:  Client ──► Proxy ──► Internet      (hides the CLIENT, e.g. VPN)
Reverse proxy:  Internet ──► Proxy ──► App servers (hides the SERVERS, e.g. Nginx)
```

---
