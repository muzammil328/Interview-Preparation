---
id: what-are-semantic-tags
title: "What are Semantic Tags?"
sidebar_label: "What are Semantic Tags?"
sidebar_position: 3
description: "What are Semantic Tags? — HTML interview notes."
---
Semantic tags are HTML elements that clearly describe the purpose of their content.

Examples:

- `<header>` → Page header
- `<nav>` → Navigation links
- `<main>` → Main content (only one per page)
- `<section>` → Group of related content
- `<article>` → Independent content
- `<aside>` → Side content (sidebar)
- `<footer>` → Footer section

```text
┌──────────────────── <body> ────────────────────┐
│ <header>  logo, title                          │
│ <nav>     Home | Blog | About                  │
├──────────────────────────────┬─────────────────┤
│ <main>                       │ <aside>         │
│  ┌── <article> ────────────┐ │  related links  │
│  │ <h1> Post title         │ │                 │
│  │ <section> Intro         │ │                 │
│  │ <section> Details       │ │                 │
│  └─────────────────────────┘ │                 │
├──────────────────────────────┴─────────────────┤
│ <footer>  © 2026                               │
└────────────────────────────────────────────────┘
```

### Benefits:

- Improves accessibility.
- Improves SEO.
- Makes code easier to understand.
- Improves maintainability.

---
