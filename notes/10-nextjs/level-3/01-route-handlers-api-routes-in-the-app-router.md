---
id: route-handlers-api-routes-in-the-app-router
title: "Route Handlers (API Routes in the App Router)"
sidebar_label: "Route Handlers (API Routes in the App Router)"
sidebar_position: 1
description: "Route Handlers (API Routes in the App Router) — Next.js interview notes."
---
A `route.ts` file exports functions named after HTTP methods. Use them when something **outside** your React UI calls you: webhooks, mobile apps, third-party clients.

```ts
// app/api/users/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await createUser(body);
  return NextResponse.json(user, { status: 201 });
}
```

```text
GET  /api/users  ──► app/api/users/route.ts → GET()
POST /api/users  ──► app/api/users/route.ts → POST()
```

| Server Action                      | Route Handler                         |
| ---------------------------------- | ------------------------------------- |
| Called from your own forms/components | Called over HTTP by anyone         |
| No URL you design                  | You design the URL and method         |
| Best for mutations from the UI     | Best for webhooks, public APIs, mobile |

---
