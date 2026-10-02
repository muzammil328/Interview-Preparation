---
id: how-do-you-manage-secrets-in-aws
title: "How do you manage secrets in AWS?"
sidebar_label: "How do you manage secrets in AWS?"
sidebar_position: 12
description: "How do you manage secrets in AWS? — AWS interview notes."
---
1. Secrets should be stored in **AWS Secrets Manager** or **Systems Manager Parameter Store**.
2. They should not be hardcoded in code or stored in plain text.
3. **AWS Secrets Manager** stores and manages sensitive information like database passwords, API keys, and credentials. It can also rotate secrets automatically.

```mermaid
flowchart LR
    App["App on EC2 / Lambda"] -->|"IAM role allows GetSecretValue"| SM["Secrets Manager"]
    SM -->|"DB password"| App
    App --> DB[("Database")]
```

---
