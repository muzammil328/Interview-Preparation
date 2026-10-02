---
id: what-is-the-difference-between-s3-and-ebs
title: "What is the difference between S3 and EBS?"
sidebar_label: "What is the difference between S3 and EBS?"
sidebar_position: 2
description: "What is the difference between S3 and EBS? — AWS interview notes."
---
| **S3**                                      | **EBS**                   |
| ------------------------------------------- | ------------------------- |
| Object storage                              | Block storage             |
| Used for files, backups, and static content | Used like a disk drive    |
| Independent storage, accessed over HTTP     | Attached to EC2 instances |
| Regional, practically unlimited             | One AZ, fixed size you choose |

```mermaid
flowchart LR
    App["App on EC2"] -->|"HTTP API: PUT / GET"| S3[("S3 bucket")]
    App ---|"mounted as disk /dev/xvda"| EBS[("EBS volume")]
```

---
