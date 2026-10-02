---
id: how-do-you-add-ssl-https-with-let-s-encrypt
title: "How do you add SSL (HTTPS) with Let's Encrypt?"
sidebar_label: "How do you add SSL (HTTPS) with Let's Encrypt?"
sidebar_position: 2
description: "How do you add SSL (HTTPS) with Let's Encrypt? — VPS interview notes."
---

**Let's Encrypt** is a free certificate authority. **Certbot** gets the certificate, edits the Nginx config, and sets up automatic renewal (certificates last **90 days**).

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d myapp.com -d www.myapp.com
sudo certbot renew --dry-run   # test auto-renewal
```

```mermaid
sequenceDiagram
    participant C as Certbot (on VPS)
    participant LE as Let's Encrypt
    C->>LE: Request certificate for myapp.com
    LE->>C: Prove you control myapp.com (HTTP challenge)
    C->>C: Serve challenge file via Nginx
    LE->>C: GET http://myapp.com/.well-known/acme-challenge/...
    LE-->>C: Certificate issued (valid 90 days)
    C->>C: Update Nginx to listen on 443, redirect 80 → 443
```

The domain's DNS must already point to the VPS, and port 80 must be open, for the HTTP challenge to work.

---
