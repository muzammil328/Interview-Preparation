---
id: rest-vs-graphql
title: "REST vs GraphQL"
sidebar_label: "REST vs GraphQL"
sidebar_position: 1
description: "REST vs GraphQL — Architecture interview notes."
---
| REST                                              | GraphQL                                          |
| ------------------------------------------------- | ------------------------------------------------ |
| Many endpoints (`/users`, `/users/1/posts`)       | One endpoint (`/graphql`)                        |
| Server decides the response shape                 | Client asks for exactly the fields it needs      |
| Can **over-fetch** (too much data) or **under-fetch** (needs several calls) | One request, exact data           |
| Easy HTTP caching (GET + URL)                     | Caching is harder (usually POST to one URL)      |
| Simple, widely understood                         | Schema + types, more setup, N+1 risk in resolvers |

```text
REST — 3 requests:
  GET /users/1
  GET /users/1/posts
  GET /users/1/followers

GraphQL — 1 request:
  query {
    user(id: 1) {
      name
      posts { title }
      followers { name }
    }
  }
```

**When to choose:** REST for simple CRUD APIs and public APIs. GraphQL when many different clients (web, mobile) need different shapes of the same data.

---
