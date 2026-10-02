---
id: q26-design-analytics-event-ingestion-millions-of-clicks-pe
title: "Q26. Design Analytics Event Ingestion (millions of clicks per minute)"
sidebar_label: "Q26. Design Analytics Event Ingestion (millions of clicks per minute)"
sidebar_position: 2
description: "Q26. Design Analytics Event Ingestion (millions of clicks per minute) — System Design interview notes."
---

```mermaid
flowchart LR
    B["Browsers / apps"] -->|"batch of events"| C["Collector API<br/>(stateless, validates)"]
    C --> K[("Kafka / Kinesis<br/>event log")]
    K --> S["Stream processor<br/>real-time counts"]
    K --> L["Loader"] --> W[("Data warehouse<br/>BigQuery / ClickHouse")]
    S --> D["Live dashboard"]
    W --> R["Reports / SQL queries"]
```

- The client **batches** events (send every 10 sec or every 50 events), not one request per click.
- The collector only validates and appends to the log — no heavy work in the request.
- **Kafka** keeps events for days, so you can replay them if a consumer had a bug.
- Store raw events in a **column-oriented warehouse**, which is fast for "count by day by country".
- Analytics is not your main DB — never run these heavy queries on the production database.

---
