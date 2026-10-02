---
id: http-methods-and-status-codes
title: "HTTP Methods and Status Codes"
sidebar_label: "HTTP Methods and Status Codes"
sidebar_position: 7
description: "HTTP Methods and Status Codes — Express.js interview notes."
---
### HTTP Methods

| Method | Purpose                      | Idempotent? |
| ------ | ---------------------------- | ----------- |
| GET    | Fetch data                   | Yes         |
| POST   | Create data                  | No          |
| PUT    | Replace a resource entirely  | Yes         |
| PATCH  | Update part of a resource    | Not guaranteed |
| DELETE | Remove data                  | Yes         |

### Common Status Codes

| Code | Meaning                                 |
| ---- | --------------------------------------- |
| 200  | OK                                      |
| 201  | Created                                 |
| 204  | No Content                              |
| 400  | Bad Request (validation failed)         |
| 401  | Unauthorized (not logged in)            |
| 403  | Forbidden (logged in, but not allowed)  |
| 404  | Not Found                               |
| 409  | Conflict (e.g. duplicate email)         |
| 429  | Too Many Requests                       |
| 500  | Internal Server Error                   |

```text
2xx = success   3xx = redirect   4xx = client's fault   5xx = server's fault
```

---
