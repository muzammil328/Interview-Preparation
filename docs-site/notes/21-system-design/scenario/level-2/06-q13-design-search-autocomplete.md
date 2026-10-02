---
id: q13-design-search-autocomplete
title: "Q13. Design Search Autocomplete"
sidebar_label: "Q13. Design Search Autocomplete"
sidebar_position: 6
description: "Q13. Design Search Autocomplete — System Design interview notes."
---

```mermaid
flowchart LR
    C["Client<br/>debounce 300ms"] -->|"GET /suggest?q=jav"| API
    API --> R[("Redis: prefix → top 10")]
    R -->|miss| S[("Search index<br/>Elasticsearch / trie")]
    L["Search logs"] -->|"hourly job: count popular queries"| S
```

```text
Trie for "ja"
        (root)
          │
          j
          │
          a ──► top: [java, javascript, jamaica]
         / \
        v   m
```

- **Debounce** on the client so typing "javascript" isn't 10 requests.
- Pre-compute the top suggestions per prefix and cache them, rather than ranking on every keystroke.

---
