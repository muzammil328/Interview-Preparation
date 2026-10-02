---
id: rarely-asked-lower-priority
title: "Rarely Asked (Lower Priority)"
sidebar_label: "Rarely Asked (Lower Priority)"
sidebar_position: 1
description: "Rarely Asked (Lower Priority) — Next.js interview notes."
---
## next.config.ts

`next.config.ts` is the configuration file for Next.js.

Used for:

* Environment variables
* Image configuration
* Redirects
* Rewrites
* Experimental features

Example (`images.domains` is deprecated — use `remotePatterns`):

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "example.com" }],
  },
};

export default nextConfig;
```
