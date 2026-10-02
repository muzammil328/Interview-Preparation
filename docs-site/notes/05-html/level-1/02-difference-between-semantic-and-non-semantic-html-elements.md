---
id: difference-between-semantic-and-non-semantic-html-elements
title: "Difference Between Semantic and Non-Semantic HTML Elements"
sidebar_label: "Difference Between Semantic and Non-Semantic HTML Elements"
sidebar_position: 2
description: "Difference Between Semantic and Non-Semantic HTML Elements — HTML interview notes."
---
| Semantic Elements | Non-Semantic Elements |
|---|---|
| Describe the meaning and purpose of content. | Do not describe the meaning of content. |
| Improve accessibility, SEO, readability, and maintainability. | Mainly used for grouping and styling. |
| Help browsers and developers understand page structure. | Provide no information about the content. |
| Examples: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` | Examples: `<div>`, `<span>` |

```text
 Non-semantic                      Semantic
┌──────────────────────┐          ┌──────────────────────┐
│ <div class="top">    │          │ <header>             │
├──────────────────────┤          ├──────────────────────┤
│ <div class="menu">   │          │ <nav>                │
├──────────────────────┤          ├──────────────────────┤
│ <div class="content">│          │ <main>               │
│   <div class="post"> │          │   <article>          │
├──────────────────────┤          ├──────────────────────┤
│ <div class="bottom"> │          │ <footer>             │
└──────────────────────┘          └──────────────────────┘
 Screen reader: "group, group"     Screen reader: "navigation, main, article"
```

---
