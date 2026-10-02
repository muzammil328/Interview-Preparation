---
id: difference-between-section-and-article
title: "Difference Between section and article"
sidebar_label: "Difference Between section and article"
sidebar_position: 1
description: "Difference Between section and article — HTML interview notes."
---
| `section` | `article` |
|---|---|
| Used to group related content. | Used for independent content. |
| Part of a larger page structure. | Can exist independently. |
| Example: Services section. | Example: Blog post or news article. |

**Quick test:** "Could this be shared or shown on its own (e.g. in an RSS feed)?" Yes → `article`. No → `section`.

```text
<main>
 ├── <section> Our Services   ← part of this page only
 └── <section> Latest Posts
       ├── <article> Post 1   ← makes sense on its own
       └── <article> Post 2
```

Example:

```html
<section>
  <h2>Our Services</h2>
  <p>We provide web development services.</p>
</section>
```

```html
<article>
  <h2>How to Learn React</h2>
  <p>React is a JavaScript library.</p>
</article>
```

---
