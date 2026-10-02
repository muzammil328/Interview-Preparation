---
id: q6-how-would-you-let-users-upload-large-files-images-video
title: "Q6. How would you let users upload large files (images, videos)?"
sidebar_label: "Q6. How would you let users upload large files (images, videos)?"
sidebar_position: 2
description: "Q6. How would you let users upload large files (images, videos)? — System Design interview notes."
---

Don't stream big files through your API server. Let the client upload **directly to S3** with a **pre-signed URL**.

```mermaid
sequenceDiagram
    participant C as Client
    participant API
    participant S3
    participant W as Worker
    C->>API: POST /uploads (fileName, size, type)
    API->>API: validate type + size, auth user
    API-->>C: pre-signed PUT URL (expires in 5 min)
    C->>S3: PUT file directly
    S3-->>W: event: object created
    W->>W: virus scan, thumbnail, compress
    W->>API: mark upload READY
```

- API servers stay free — no 2GB file passing through Node.
- Use **multipart upload** for large files so a failed chunk can be retried.
- Serve files back through a **CDN**.

---
