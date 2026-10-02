---
id: middleware-order
title: "Middleware Order"
sidebar_label: "Middleware Order"
sidebar_position: 1
description: "Middleware Order — Express.js interview notes."
---
Express runs middleware **in the order it was registered**, top to bottom. Order matters:

- Body parsers (`express.json()`) must come **before** routes that read `req.body`
- Auth middleware must come **before** the routes it protects
- The 404 handler goes **after** all routes
- The error handler goes **last**

```javascript
app.use(helmet());            // 1. security headers
app.use(cors());              // 2. CORS
app.use(express.json());      // 3. parse body
app.use(morgan('dev'));       // 4. logging
app.use('/api', apiRouter);   // 5. routes
app.use(notFound);            // 6. 404
app.use(errorHandler);        // 7. errors — always last
```

```text
Request ─> helmet ─> cors ─> json ─> morgan ─> /api routes ─> 404 ─> errorHandler
                                                   │                       ▲
                                                   └──── next(err) ────────┘
```

---
