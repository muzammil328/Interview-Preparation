---
id: what-is-the-difference-between-kms-and-secrets-manager
title: "What is the difference between KMS and Secrets Manager?"
sidebar_label: "What is the difference between KMS and Secrets Manager?"
sidebar_position: 2
description: "What is the difference between KMS and Secrets Manager? — AWS interview notes."
---
|               | KMS                               | Secrets Manager                            |
| ----------------------- | --------------------------------- | ------------------------------------------ |
| **What it protects**    | Cryptographic data keys           | Passwords, tokens, credentials             |
| **Data Storage**        | No (only holds mathematical keys) | Yes (stores strings/JSON payload)          |
| **Rotation Capability** | Rotates back-end key material     | Rotates actual application credentials     |
| **Cross-Region Sync**   | Multi-region keys available       | Built-in secret replication across regions |
