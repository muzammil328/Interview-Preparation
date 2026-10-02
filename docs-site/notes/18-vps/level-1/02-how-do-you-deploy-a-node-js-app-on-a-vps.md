---
id: how-do-you-deploy-a-node-js-app-on-a-vps
title: "How do you deploy a Node.js app on a VPS?"
sidebar_label: "How do you deploy a Node.js app on a VPS?"
sidebar_position: 2
description: "How do you deploy a Node.js app on a VPS? — VPS interview notes."
---

Typical production setup on a single VPS:

```mermaid
flowchart LR
    U["Browser"] -->|"HTTPS :443"| N["Nginx<br/>reverse proxy + SSL"]
    N -->|"http://localhost:3000"| P["PM2"]
    P --> A1["Node app instance 1"]
    P --> A2["Node app instance 2"]
    A1 --> DB[("Database")]
    A2 --> DB
    FW["UFW firewall<br/>allows 22, 80, 443 only"] -.-> N
```

Steps:

1. Create the VPS and log in with an **SSH key**.
2. Create a non-root user, update packages, enable the **firewall**.
3. Install Node.js, Git, Nginx, PM2.
4. Clone the repo, install dependencies, build, set environment variables.
5. Start the app with **PM2**.
6. Configure **Nginx** as a reverse proxy to the app's port.
7. Point the domain's DNS **A record** to the VPS IP.
8. Add **SSL** with Let's Encrypt (Certbot).

---
