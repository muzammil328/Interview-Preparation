---
id: q30-design-product-search-with-filters-typos-ranking
title: "Q30. Design Product Search (with filters, typos, ranking)"
sidebar_label: "Q30. Design Product Search (with filters, typos, ranking)"
sidebar_position: 4
description: "Q30. Design Product Search (with filters, typos, ranking) — System Design interview notes."
---

SQL `LIKE '%phone%'` can't use an index and has no relevance ranking or typo tolerance. Use a **search engine** next to your DB.

```mermaid
flowchart LR
    ADM["Admin edits product"] --> DB[("PostgreSQL<br/>source of truth")]
    DB -->|"change event / CDC"| Q[(Queue)]
    Q --> IDX["Indexer"] --> ES[("Elasticsearch /<br/>OpenSearch / Meilisearch")]
    U["User searches<br/>'iphne 15 case'"] --> API --> ES
    ES -->|"ranked IDs + facets"| API
```

**Inverted index** — why it's fast:

```text
Docs                         Inverted index
1: "red iphone case"         red     → [1]
2: "iphone charger"          iphone  → [1, 2]
3: "red charger"             case    → [1]
                             charger → [2, 3]
Search "red charger" → intersect → doc 3 first (matches both), then 1, 2
```

- The DB stays the source of truth; the search index is a **copy**, updated asynchronously (may lag by seconds).
- Supports fuzzy matching (typos), synonyms, filters (brand, price range), and facets ("Apple (42)").

---
