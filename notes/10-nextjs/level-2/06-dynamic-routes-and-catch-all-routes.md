---
id: dynamic-routes-and-catch-all-routes
title: "Dynamic Routes and Catch-All Routes"
sidebar_label: "Dynamic Routes and Catch-All Routes"
sidebar_position: 6
description: "Dynamic Routes and Catch-All Routes — Next.js interview notes."
---
## Dynamic Routes

Dynamic routes use square brackets.

Example:

```text
app/blog/[slug]/page.tsx
```

Routes:

```text
/blog/hello-world
/blog/nextjs-guide
```

The value is available as a parameter. **From Next.js 15, `params` and `searchParams` are Promises and must be awaited.**

```tsx
// app/blog/[slug]/page.tsx
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <h1>{slug}</h1>;
}
```

```text
URL: /blog/hello-world
         │      │
         │      └──► params = Promise<{ slug: "hello-world" }>
         └─────────► app/blog/[slug]/page.tsx
```

---

## Catch-All Routes

Catch-all routes use three dots.

Example:

```text
app/docs/[...slug]/page.tsx
```

Matches:

```text
/docs/react                   → slug = ["react"]
/docs/react/hooks             → slug = ["react", "hooks"]
/docs/react/hooks/use-state   → slug = ["react", "hooks", "use-state"]
```

The value is received as an array. An **optional** catch-all `[[...slug]]` also matches `/docs` itself.

---
