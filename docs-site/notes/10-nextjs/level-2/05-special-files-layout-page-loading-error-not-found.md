---
id: special-files-layout-page-loading-error-not-found
title: "Special Files: layout, page, loading, error, not-found"
sidebar_label: "Special Files: layout, page, loading, error, not-found"
sidebar_position: 5
description: "Special Files: layout, page, loading, error, not-found — Next.js interview notes."
---
| File            | Purpose                                                   |
| --------------- | --------------------------------------------------------- |
| `layout.tsx`    | Shared UI that wraps child pages and **keeps state** across navigation |
| `page.tsx`      | The unique UI of a route                                  |
| `loading.tsx`   | Instant loading UI (wraps the page in a `<Suspense>`)     |
| `error.tsx`     | Error boundary for the segment (must be a Client Component) |
| `not-found.tsx` | UI for `notFound()` or unknown URLs                       |
| `template.tsx`  | Like layout, but re-mounts on every navigation            |

```text
<Layout>
  <ErrorBoundary fallback={<Error />}>
    <Suspense fallback={<Loading />}>
      <Page />
    </Suspense>
  </ErrorBoundary>
</Layout>
```

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav>Sidebar</nav>
      {children}
    </section>
  );
}
```

```tsx
// app/dashboard/error.tsx
"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <p>Something went wrong.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

---
