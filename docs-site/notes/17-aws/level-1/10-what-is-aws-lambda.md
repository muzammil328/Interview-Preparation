---
id: what-is-aws-lambda
title: "What is AWS Lambda?"
sidebar_label: "What is AWS Lambda?"
sidebar_position: 10
description: "What is AWS Lambda? — AWS interview notes."
---
1. **AWS Lambda** is a serverless compute service.
2. You upload code, and AWS runs it automatically when triggered. You do not need to manage servers.
3. You pay per request and per execution time. Max run time is **15 minutes** per invocation.

```mermaid
flowchart LR
    T1["API Gateway request"] --> L["Lambda function"]
    T2["S3 file uploaded"] --> L
    T3["SQS message"] --> L
    T4["Schedule (cron)"] --> L
    L --> D[("DynamoDB / RDS / S3")]
```

---
