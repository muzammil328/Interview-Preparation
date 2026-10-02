---
id: what-are-the-ways-to-add-css
title: "What are the Ways to Add CSS?"
sidebar_label: "What are the Ways to Add CSS?"
sidebar_position: 1
description: "What are the Ways to Add CSS? — CSS interview notes."
---
## What is CSS?

CSS (**Cascading Style Sheets**) is used to style and layout HTML elements. It controls the appearance, spacing, colors, fonts, and responsiveness of web pages.

```text
selector   property   value
   │          │         │
   p    {   color   :  blue;   }
        └────── declaration ──┘
└─────────────── rule ─────────┘
```

---

There are three ways to add CSS:

## 1. Inline CSS

CSS is written directly inside the HTML element.

```html
<h1 style="color: blue;">Hello World</h1>
```

## 2. Internal CSS

CSS is written inside the `<style>` tag.

```html
<style>
  h1 {
    color: blue;
  }
</style>
```

## 3. External CSS

CSS is written in a separate `.css` file. Best for real projects — one file is cached and reused by every page.

```html
<link rel="stylesheet" href="style.css">
```

```text
Priority when they conflict (same selector):

Inline  >  Internal / External
                │
                └── between these two, whichever comes LATER wins
```

---
