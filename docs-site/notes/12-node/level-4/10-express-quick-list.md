---
id: express-quick-list
title: "Express Quick List"
sidebar_label: "Express Quick List"
sidebar_position: 10
description: "Express Quick List — Node.js interview notes."
---
- `process.env`: Environment variables
- `__dirname`: Current folder path (CommonJS only)
- `app.route()`: Chain handlers for one path: `app.route('/users').get(...).post(...)`
- `res.send()` vs `res.json()`: `send` handles strings/Buffers/objects; `json` always sends JSON
- Default port: 3000 (or `process.env.PORT`)
