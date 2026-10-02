---
id: what-is-a-presigned-url-in-s3
title: "What is a presigned URL in S3?"
sidebar_label: "What is a presigned URL in S3?"
sidebar_position: 3
description: "What is a presigned URL in S3? — AWS interview notes."
---
A **temporary URL** that lets someone upload or download a private S3 object **without AWS credentials**. It expires after a set time.

Common use: let the browser upload a file **directly to S3**, so the file never passes through your server.

```mermaid
sequenceDiagram
    participant B as Browser
    participant API as Your API
    participant S3 as S3
    B->>API: I want to upload avatar.png
    API->>API: Check auth, generate presigned PUT URL (expires in 5 min)
    API-->>B: presigned URL
    B->>S3: PUT file to presigned URL
    S3-->>B: 200 OK
    B->>API: Upload done, save key
```

```javascript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({ region: 'ap-south-1' });
const command = new PutObjectCommand({ Bucket: 'my-app-uploads', Key: 'users/42/avatar.png' });
const url = await getSignedUrl(s3, command, { expiresIn: 300 });
```

---
