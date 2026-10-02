---
id: navigation-link-userouter-and-prefetching
title: "Navigation: Link, useRouter, and Prefetching"
sidebar_label: "Navigation: Link, useRouter, and Prefetching"
sidebar_position: 2
description: "Navigation: Link, useRouter, and Prefetching — Next.js interview notes."
---
* `<Link href="/about">` — client-side navigation, no full page reload. Visible links are **prefetched** in production.
* `useRouter()` from `next/navigation` (App Router) — programmatic navigation in Client Components: `router.push("/home")`.
* `redirect("/login")` — redirect from a Server Component or Server Action.

```text
Full reload (<a>)                Client navigation (<Link>)
Browser ──► server ──► new HTML  Browser ──► fetch only new segment
everything re-downloads          layout + state are kept
```

**Common mistake:** importing `useRouter` from `next/router` in the App Router — that is the Pages Router API.

---
