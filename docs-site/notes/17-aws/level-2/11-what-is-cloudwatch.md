---
id: what-is-cloudwatch
title: "What is CloudWatch?"
sidebar_label: "What is CloudWatch?"
sidebar_position: 11
description: "What is CloudWatch? — AWS interview notes."
---
1. **CloudWatch** is a monitoring service in AWS.
2. It collects metrics, logs, alarms, and events from AWS resources and applications.

```text
EC2 CPU metric ──► CloudWatch ──► Alarm (CPU > 80%) ──► SNS email / Auto Scaling
App logs       ──► CloudWatch Logs ──► search & dashboards
```

---
