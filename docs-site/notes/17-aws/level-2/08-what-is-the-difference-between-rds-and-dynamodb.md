---
id: what-is-the-difference-between-rds-and-dynamodb
title: "What is the difference between RDS and DynamoDB?"
sidebar_label: "What is the difference between RDS and DynamoDB?"
sidebar_position: 8
description: "What is the difference between RDS and DynamoDB? — AWS interview notes."
---
|               | **Amazon RDS**                                | **Amazon DynamoDB**                                      |
| --------- | --------------------------------------------- | -------------------------------------------------------- |
| Type      | Relational (SQL)                              | Non-relational (NoSQL)                                   |
| Structure | Tables, rows, columns with a fixed schema     | Items with a required primary key; other attributes are flexible |
| Scaling   | Mostly vertical, plus read replicas           | Horizontal, automatic                                    |
| Queries   | Joins, complex queries, transactions          | Fast lookups by key; no joins                            |
| Use       | Complex queries and relationships             | Fast, scalable key-based access at any scale             |

```text
Need joins / reports / strong relations?   → RDS
Known access patterns, huge scale, low ms? → DynamoDB
```

---
