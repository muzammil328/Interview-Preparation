---
id: what-is-codedeploy
title: "What is CodeDeploy?"
sidebar_label: "What is CodeDeploy?"
sidebar_position: 7
description: "What is CodeDeploy? — AWS interview notes."
---
**CodeDeploy** automates application deployment to EC2, Lambda, ECS, or on-premises servers.
It supports deployment strategies like rolling and blue-green deployments.

```text
GitHub ──► CodePipeline ──► CodeBuild (build + test) ──► CodeDeploy ──► EC2 / ECS / Lambda
```
