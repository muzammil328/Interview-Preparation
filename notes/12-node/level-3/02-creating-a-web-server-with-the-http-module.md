---
id: creating-a-web-server-with-the-http-module
title: "Creating a Web Server with the HTTP Module"
sidebar_label: "Creating a Web Server with the HTTP Module"
sidebar_position: 2
description: "Creating a Web Server with the HTTP Module — Node.js interview notes."
---
Use `http.createServer()` to create the server and `server.listen()` to start it on a port.

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello' }));
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Node http server
    C->>S: GET /
    Note over S: callback(req, res) runs
    S-->>C: 200 JSON message Hello
```

---
