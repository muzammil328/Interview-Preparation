---
id: common-responsibilities-of-an-api-gateway
title: "Common Responsibilities of an API Gateway"
sidebar_label: "Common Responsibilities of an API Gateway"
sidebar_position: 4
description: "Common Responsibilities of an API Gateway — Architecture interview notes."
---
An API Gateway can handle:

* **Request routing** — sends requests to the correct service.
* **Authentication** — verifies users or access tokens.
* **Authorization** — determines what the user is allowed to access.
* **Rate limiting** — prevents clients from sending too many requests.
* **Load balancing** — distributes traffic across service instances.
* **Logging and monitoring** — tracks requests and errors.
* **Response aggregation** — combines data from multiple services into one response.
* **Caching** — stores frequently requested data to improve performance.

### Simple Example

Without an API Gateway:

```text
Frontend ──► Auth Service
Frontend ──► Payment Service
Frontend ──► Inventory Service
Frontend ──► Notification Service
```

With an API Gateway:

```text
Frontend
   │
   ▼
API Gateway
   │
   ├──► Auth Service
   ├──► Payment Service
   ├──► Inventory Service
   └──► Notification Service
```
