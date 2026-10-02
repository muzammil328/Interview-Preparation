---
id: what-is-terraform
title: "What is Terraform?"
sidebar_label: "What is Terraform?"
sidebar_position: 12
description: "What is Terraform? — AWS interview notes."
---
1. **Terraform** is an Infrastructure as Code tool used to create and manage cloud resources.
2. Unlike CloudFormation, Terraform supports multiple cloud providers, not only AWS.

```text
template.yaml / main.tf  ──apply──►  VPC + EC2 + RDS + S3 created
(versioned in Git)                   (same result every time)
```

---

# Quick Fire Questions

- **Region vs AZ?** Geographic area vs isolated data center inside it
- **Security Group stateful or stateless?** Stateful (NACL is stateless)
- **S3 vs EBS?** Object storage over HTTP vs disk attached to EC2
- **How to give EC2 access to S3?** Attach an IAM role, not access keys
- **Private subnet internet access?** Outbound only via NAT Gateway
- **Multi-AZ vs Read Replica?** Availability vs read scaling
- **Lambda max timeout?** 15 minutes
- **SQS vs SNS?** Queue (one consumer) vs pub/sub (many subscribers)
- **Upload large files from browser?** Presigned S3 URL
- **CloudWatch vs CloudTrail?** Monitoring vs auditing API calls

---
