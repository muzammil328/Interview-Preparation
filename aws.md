

AWS stands for **Amazon Web Services**. It is a cloud computing platform that provides services like servers, storage, databases, networking, security, monitoring, and machine learning.

| **EC2** | provides virtual servers to run your applications                                                 |
| ------- | ------------------------------------------------------------------------------------------------- |
| **VPC** | provides a private virtual network to control traffic, security, and isolation for those servers. |
| <br>    | <br>                                                                                              |

### What is EC2 (Elastic Compute Cloud)?

1. A service that provides virtual servers in the cloud. 
2. These servers are called **instances**.

#### What is a Security Group?

1. A **Security Group** acts like a virtual firewall for EC2 instances.
2. It controls inbound and outbound traffic. Security Groups are **stateful**, meaning return traffic is automatically allowed.

### What is S3 (Simple Storage Service)?

1. An object storage used to store files such as images, videos, backups, logs, and static website content.

### What is EBS (Elastic Block Store)?

1. A block storage used with EC2 instances. 
2. It works like a hard disk attached to a virtual server.

### What is the difference between S3 and EBS?

| **S3**                                      | **EBS**                   |
| ------------------------------------------- | ------------------------- |
| Object storage                              | Block storage             |
| used for files, backups, and static content | used like a disk drive    |
| independent storage                         | attached to EC2 instances |

### What is IAM (Identity and Access Management)?

1. used to manage users, roles, permissions, and access to AWS resources.

### What is Route 53?

**Route 53** is AWS’s DNS service. It is used to register domain names, route traffic, and manage DNS records.

### What is CloudFront?

1. **CloudFront** is a Content Delivery Network, or CDN.
2. It delivers content like images, videos, APIs, and websites faster by caching them at edge locations close to users.

### What is a VPC?

A **VPC**, or Virtual Private Cloud, is a private network inside AWS where you can launch resources like EC2 instances, databases, and load balancers.

### What is the difference between a public subnet and private subnet?

1. A **public subnet** has access to the internet through an Internet Gateway.
2. A **private subnet** does not have direct internet access. It is usually used for databases or backend servers.

### What is the difference between EC2 and VPC?

| <br>          | **Amazon EC2**                                     | **Amazon VPC**                                     |
| ------------- | -------------------------------------------------- | -------------------------------------------------- |
| What it is    | A virtual server (compute resource)                | A virtual network (networking resource)            |
| Primary Job   | Run applications, process data, and host websites. | Control network traffic, security, and isolation.  |
| Configuration | OS, CPU, memory, and storage type.                 | IP addresses, subnets, route tables, and gateways. |

### What is an AMI (Amazon Machine Image)?

1. A template used to launch EC2 instances.
2. It contains the operating system, software, configuration, and application setup.

### 9. What is the difference between stopping & terminating an EC2 instance?

1. When you **stop** an EC2 instance, it is shut down but can be started again later.
2. When you **terminate** an EC2 instance, it is permanently deleted.

### 12. What is a Load Balancer?

A **Load Balancer** distributes incoming traffic across multiple servers. It improves application availability, performance, and fault tolerance.
AWS provides mainly these load balancers:

1. **Application Load Balancer** — used for HTTP and HTTPS traffic.
2. **Network Load Balancer** — used for high-performance TCP/UDP traffic.
3. **Gateway Load Balancer** — used for security appliances like firewalls.

### 13. What is Auto Scaling?

**Auto Scaling** automatically increases or decreases the number of EC2 instances based on traffic or demand. It helps maintain performance and reduce cost.

### 17. What is RDS (Relational Database Service)?

1. managed database service.
2. It supports databases like MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, and Amazon Aurora.
3. AWS manages backups, patching, monitoring, and high availability.

### 18. What is DynamoDB?

1. **DynamoDB** is a fully managed NoSQL database service.
2. It is used for applications that need high performance, low latency, & automatic scaling.

### 19. What is the difference between RDS and DynamoDB?

| <br>      | **Amazon RDS**                    | **Amazon DynamoDB**                         |
| --------- | --------------------------------- | ------------------------------------------- |
| Type      | Relational (SQL)                  | Non-relational (NoSQL)                      |
| Structure | tables, rows, columns             | Schema-less JSON documents, key-value pairs |
| Scaling   | Vertical (bigger machine)         | Horizontal (more machines)                  |
| Use       | Complex queries and relationships | fast , scalable NOSQL performance           |

### 22. What is CloudWatch?

1. **CloudWatch** is a monitoring service in AWS.
2. It collects metrics, logs, alarms, and events from AWS resources and applications.

### 23. What is CloudTrail?

1. **CloudTrail** records AWS account activity and API calls.
2. It is mainly used for auditing, compliance, and security investigation.

### 24. What is the difference between CloudWatch and CloudTrail?

**CloudWatch** is used for monitoring performance, logs, and alarms.
**CloudTrail** is used for tracking user activity and API calls in an AWS account.

### 20. What is Multi-AZ in RDS?

1. **Multi-AZ** means the database has a standby copy in another Availability Zone.
2. If the primary database fails, AWS automatically fails over to the standby database.
3. It is used for high availability.

### 21. What is a Read Replica?

1. A **Read Replica** is a copy of a database used to handle read traffic.
2. It improves performance by reducing load on the primary database.

### 25. What is AWS Lambda?

1. **AWS Lambda** is a serverless compute service.
2. You upload code, and AWS runs it automatically when triggered. You do not need to manage servers.

### 26. What is the difference between EC2 and Lambda?

| <br>    | **EC2**                        | **Lambda**                        |
| ------- | ------------------------------ | --------------------------------- |
| Type    | Virtual Machines (IaaS)        | Serverless Functions (FaaS)       |
| Control | Full root access to OS         | No OS access (code-only)          |
| State   | Stateful (data stays on drive) | Stateless (wipes clean after run) |

### 27. What are Lambda cold starts?

1. A **cold start** happens when Lambda takes extra time to initialize a new execution environment before running the function.
2. It usually happens when the function has not been used recently or when scaling up.

### 30. What is the difference between horizontal and vertical scaling?

**Horizontal scaling** means adding more servers.
Example: Adding more EC2 instances behind a Load Balancer.
**Vertical scaling** means increasing the size of one server.
Example: Changing an EC2 instance from t3.medium to t3.large.

---

### 31. What is disaster recovery in AWS?

Disaster recovery means designing systems so they can recover after failure.
Common AWS disaster recovery strategies include:

1. Backup and restore
2. Pilot light
3. Warm standby
4. Multi-site active-active

---

### 32. What are RTO and RPO?

**RTO**, or Recovery Time Objective, is the maximum acceptable downtime after a failure.
**RPO**, or Recovery Point Objective, is the maximum acceptable data loss measured in time.
Example: If RPO is 15 minutes, the business can tolerate losing up to 15 minutes of data.

---

### 33. What is KMS?

1. **KMS**, or Key Management Service, is used to create and manage encryption keys.
2. It helps encrypt data stored in services like S3, EBS, RDS, and Secrets Manager.

---

### 34. What is a Secrets Manager?

1. **AWS Secrets Manager** stores and manages sensitive information like database passwords, API keys, and credentials.
2. It can also rotate secrets automatically.

---

### 35. What is the difference between KMS and Secrets Manager?

| <br>                    | KMS                               | Secrets Manager                            |
| ----------------------- | --------------------------------- | ------------------------------------------ |
| **What it protects**    | Cryptographic data keys           | Passwords, tokens, credentials             |
| **Data Storage**        | No (only holds mathematical keys) | Yes (stores strings/JSON payload)          |
| **Rotation Capability** | Rotates back-end key material     | Rotates actual application credentials     |
| **Cross-Region Sync**   | Multi-region keys available       | Built-in secret replication across regions |

### 41. What is CodePipeline?

1. **CodePipeline** is a CI/CD service used to automate software release pipelines.
2. It can connect source code, build, test, and deployment stages.

### 42. What is CodeBuild?

1. **CodeBuild** is a managed build service.
2. It compiles source code, runs tests, and creates deployable artifacts.

---

### 43. What is CodeDeploy?

**CodeDeploy** automates application deployment to EC2, Lambda, ECS, or on-premises servers.
It supports deployment strategies like rolling and blue-green deployments.

---

### 44. What is CloudFormation?

**CloudFormation** is an Infrastructure as Code service.
It allows you to define AWS resources using YAML or JSON templates.

---

### 45. What is Terraform?

1. **Terraform** is an Infrastructure as Code tool used to create and manage cloud resources.
2. Unlike CloudFormation, Terraform supports multiple cloud providers, not only AWS.

---

### 46. How do you manage secrets in AWS?

1. Secrets should be stored in **AWS Secrets Manager** or **Systems Manager Parameter Store**.
2. They should not be hardcoded in code or stored in plain text.

---

### 47. What is blue-green deployment?

Blue-green deployment uses two environments:

- **Blue** is the current production environment.
- **Green** is the new version.

Traffic is shifted from blue to green after testing. This reduces downtime and rollback risk.
