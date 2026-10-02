---
id: f11-consistent-hashing
title: "F11. Consistent Hashing"
sidebar_label: "F11. Consistent Hashing"
sidebar_position: 2
description: "F11. Consistent Hashing — System Design interview notes."
---

Problem: you spread keys across cache servers with `hash(key) % N`. Add one server and **almost every key moves**, so the cache is suddenly empty.

```text
hash % 3 (3 servers)      hash % 4 (4 servers)
key 10 → server 1         key 10 → server 2   moved ✗
key 11 → server 2         key 11 → server 3   moved ✗
key 12 → server 0         key 12 → server 0   same
                          ~75% of keys move → cache miss storm
```

**Consistent hashing** puts servers and keys on a ring. A key goes to the next server clockwise.

```text
                 Server A
                 ●
          k1 ·       · k2
       ·                 ·
Server D ●                 ● Server B
       ·                 ·
          k4 ·       · k3
                 ●
                 Server C

Add Server E between A and B → only keys between A and E move to E.
Everything else stays where it was.
```

- Only about `1/N` of the keys move when a server is added or removed.
- **Virtual nodes** (each server appears many times on the ring) spread load evenly.
- Used by: DynamoDB, Cassandra, Redis Cluster–style sharding, CDNs, load balancers.

---
