---
id: what-is-the-difference-between-ec2-and-lambda
title: "What is the difference between EC2 and Lambda?"
sidebar_label: "What is the difference between EC2 and Lambda?"
sidebar_position: 9
description: "What is the difference between EC2 and Lambda? — AWS interview notes."
---
|               | **EC2**                                  | **Lambda**                                         |
| -------- | ---------------------------------------- | -------------------------------------------------- |
| Type     | Virtual Machines (IaaS)                  | Serverless Functions (FaaS)                        |
| Control  | Full root access to OS                   | No OS access (code-only)                           |
| Running  | Always on (you pay while it runs)        | Runs only when triggered (pay per use)             |
| Duration | Unlimited                                | Max 15 minutes per invocation                      |
| State    | Disk persists on EBS                     | Stateless — don't rely on local data between calls (`/tmp` is temporary) |

---
