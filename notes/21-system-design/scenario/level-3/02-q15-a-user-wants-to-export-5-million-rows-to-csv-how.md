---
id: q15-a-user-wants-to-export-5-million-rows-to-csv-how
title: "Q15. A user wants to export 5 million rows to CSV. How?"
sidebar_label: "Q15. A user wants to export 5 million rows to CSV. How?"
sidebar_position: 2
description: "Q15. A user wants to export 5 million rows to CSV. How? — System Design interview notes."
---

Never build it inside the HTTP request — it will time out and use up the server's memory.

```mermaid
sequenceDiagram
    participant U as User
    participant API
    participant Q as Queue
    participant W as Worker
    participant S3
    U->>API: POST /exports
    API->>Q: push export job
    API-->>U: 202 Accepted (jobId)
    W->>W: stream rows from DB in chunks → write CSV stream
    W->>S3: upload file
    W->>U: email / notification with download link
```

- **Stream** rows with a cursor — never load 5M rows into memory.
- The download link is a pre-signed S3 URL that expires.
- The UI can poll `GET /exports/:jobId` to show progress.

---
