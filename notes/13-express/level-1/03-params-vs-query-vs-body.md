---
id: params-vs-query-vs-body
title: "req.params vs req.query vs req.body"
sidebar_label: "req.params vs req.query vs req.body"
sidebar_position: 3
description: "req.params vs req.query vs req.body — Express.js interview notes."
---
- `req.params`: URL path parameters (e.g., `/users/:id`)
- `req.query`: Query strings (e.g., `/users?page=1`)
- `req.body`: Request body data (requires `express.json()`)
- `req.headers`, `req.method`, `req.url`: headers, HTTP method, URL

```javascript
// PUT /users/42?notify=true   body: { "name": "Ali" }
app.put('/users/:id', (req, res) => {
  req.params.id;     // "42"
  req.query.notify;  // "true"  (always a string)
  req.body.name;     // "Ali"
});
```

```text
PUT  /users/42  ?notify=true        { "name": "Ali" }
           │          │                    │
     req.params.id  req.query.notify   req.body.name
```

### Response (res)

- `res.send()`: Send a response (string, Buffer, or object; sets Content-Type)
- `res.json()`: Send a JSON response
- `res.status()`: Set HTTP status code (chainable: `res.status(201).json(...)`)
- `res.redirect()`: Redirect to another URL
- `res.render()`: Render a template
- `res.download()`: Send file for download

---
