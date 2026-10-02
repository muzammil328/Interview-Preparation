---
id: what-is-the-difference-between-sqs-and-sns
title: "What is the difference between SQS and SNS?"
sidebar_label: "What is the difference between SQS and SNS?"
sidebar_position: 10
description: "What is the difference between SQS and SNS? — AWS interview notes."
---
| **SQS** (Simple Queue Service)                  | **SNS** (Simple Notification Service)            |
| ----------------------------------------------- | ------------------------------------------------ |
| Queue — **pull** model                          | Pub/sub — **push** model                         |
| One message is processed by **one** consumer    | One message is delivered to **many** subscribers |
| Messages wait until a worker reads them         | Messages are pushed immediately                  |
| Good for background jobs, buffering spikes      | Good for fan-out, alerts, notifications          |

Common pattern — **fan-out**: SNS sends one event to several SQS queues, each processed independently.

```mermaid
flowchart LR
    O["Order service"] -->|"publish OrderPlaced"| SNS["SNS topic"]
    SNS --> Q1["SQS: email queue"] --> W1["Email worker"]
    SNS --> Q2["SQS: invoice queue"] --> W2["Invoice worker"]
    SNS --> Q3["SQS: analytics queue"] --> W3["Analytics worker"]
```

---
