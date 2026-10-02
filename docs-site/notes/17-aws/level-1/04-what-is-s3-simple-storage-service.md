---
id: what-is-s3-simple-storage-service
title: "What is S3 (Simple Storage Service)?"
sidebar_label: "What is S3 (Simple Storage Service)?"
sidebar_position: 4
description: "What is S3 (Simple Storage Service)? — AWS interview notes."
---
1. An object storage used to store files such as images, videos, backups, logs, and static website content.
2. Files (objects) are stored in **buckets** and accessed by a **key** (path).
3. Highly durable (designed for 99.999999999%) and practically unlimited in size.

```text
Bucket: my-app-uploads
├── users/42/avatar.png      ← key = "users/42/avatar.png"
├── invoices/2026/01.pdf
└── backups/db-2026-10-01.sql
```

---
