---
id: metadata-and-seo
title: "Metadata and SEO"
sidebar_label: "Metadata and SEO"
sidebar_position: 5
description: "Metadata and SEO — Next.js interview notes."
---
Export `metadata` (static) or `generateMetadata` (dynamic) from a `page.tsx` or `layout.tsx`.

```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  return { title: post.title, description: post.summary };
}
```

```text
generateMetadata() ──► <head>
                         ├── <title>Post title</title>
                         └── <meta name="description" ...>
```

---
