---
id: image-and-font-optimization
title: "Image and Font Optimization"
sidebar_label: "Image and Font Optimization"
sidebar_position: 3
description: "Image and Font Optimization — Next.js interview notes."
---
### `next/image`

* Resizes and serves modern formats (WebP/AVIF)
* Lazy-loads by default
* Requires `width`/`height` (or `fill`) so the space is reserved → **no layout shift (CLS)**
* Use `priority` for the above-the-fold hero image (LCP)

```tsx
import Image from "next/image";

<Image src="/hero.png" alt="Hero" width={1200} height={600} priority />
```

### `next/font`

* Downloads Google fonts at **build time** and self-hosts them — no request to Google from the browser
* Prevents layout shift from font swapping

```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

<body className={inter.className}>...</body>
```

```text
<img src="big.png">              <Image ...>
4 MB PNG, full size              resized → 80 KB WebP
loads immediately                lazy-loaded
page jumps when it loads         space reserved, no jump
```

---
