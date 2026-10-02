---
id: how-do-you-secure-a-vps
title: "How do you secure a VPS?"
sidebar_label: "How do you secure a VPS?"
sidebar_position: 1
description: "How do you secure a VPS? — VPS interview notes."
---

1. **SSH keys only** — disable password login and root login.
2. **Firewall** — allow only the ports you need (22, 80, 443).
3. Use a **non-root user** with `sudo`.
4. Keep packages **updated** (enable unattended security upgrades).
5. **Fail2ban** — bans IPs after repeated failed logins.
6. Don't expose the database port publicly; bind it to `localhost` or a private network.
7. Store secrets in environment variables or a `.env` file outside the repo, with strict file permissions.

```bash
# /etc/ssh/sshd_config
PasswordAuthentication no
PermitRootLogin no

# Firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'   # 80 + 443
sudo ufw enable
```

```text
Internet
   │
   ▼
┌──────────── UFW firewall ────────────┐
│  22  ✅ (SSH key only)                │
│  80  ✅ → redirect to 443             │
│  443 ✅ → Nginx                        │
│  3000 ❌  5432 ❌  27017 ❌            │
└──────────────────────────────────────┘
```

**How SSH key login works:** you keep the **private key** on your machine; the **public key** is placed in `~/.ssh/authorized_keys` on the server. The server checks that you own the matching private key — no password is sent.

---
