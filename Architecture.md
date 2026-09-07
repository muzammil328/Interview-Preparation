# Deployment

## Monolith

**Monolith** means your entire application—the frontend, backend, database logic, and background jobs—is built, compiled, and deployed as **one single, massive unit**.

## Microservices

**Microservices** break a monolith down into a collection of **small, independent applications** that communicate with each other over the network using **HTTP, REST, or message queues**.

Each service typically handles a specific business feature, for example:

* **Auth Service**
* **Payment Service**
* **Inventory Service**
* **Notification Service**

---

# Code Management

## Monorepo

**Monorepo** means all projects, services, and shared packages live in **one single Git repository**.

### Example

```text
my-company/
├── apps/
│   ├── frontend/
│   ├── auth-service/
│   ├── payment-service/
│   └── inventory-service/
├── packages/
│   ├── ui/
│   └── shared/
└── package.json
```

## Polyrepo

**Polyrepo** means each project or service has its **own separate Git repository**.

### Example

```text
GitHub
├── frontend-repo
├── auth-service-repo
├── payment-service-repo
├── inventory-service-repo
└── shared-package-repo
```

## Management Tools

Popular tools for managing monorepos include:

* **Nx**
* **Turborepo**

---

# What is an API Gateway?

An **API Gateway** is a single server that acts as the **front door** for your entire backend system.

Instead of clients communicating directly with every individual microservice, they communicate with the **API Gateway**, which then routes requests to the appropriate service.

### Example

```text
                    ┌─────────────────┐
                    │     Client      │
                    │ Web / Mobile    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   API Gateway   │
                    └────────┬────────┘
                             │
             ┌───────────────┼───────────────┐
             │               │               │
             ▼               ▼               ▼
      ┌────────────┐  ┌────────────┐  ┌────────────┐
      │Auth Service│  │Payment     │  │Inventory   │
      │            │  │Service     │  │Service     │
      └────────────┘  └────────────┘  └────────────┘
```

## Common Responsibilities of an API Gateway

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
