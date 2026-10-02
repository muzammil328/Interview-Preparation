---
id: async-vs-defer
title: "async vs defer"
sidebar_label: "async vs defer"
sidebar_position: 6
description: "async vs defer — HTML interview notes."
---
| async | defer |
|---|---|
| Downloads script while HTML is parsing. | Downloads script while HTML is parsing. |
| Executes immediately after downloading (pauses parsing). | Executes after HTML parsing completes. |
| Execution order is not guaranteed. | Maintains script order. |
| Used for independent scripts (analytics, ads). | Used for scripts that depend on DOM. |

```text
Normal <script>:
HTML  ████████░░░░░░░░░░░░░░████████   (parsing STOPS)
JS            ▓▓▓download▓▓ ▶run

async:
HTML  ██████████████░░░░░███████████
JS      ▓▓▓download▓▓▓ ▶run           (runs as soon as ready)

defer:
HTML  ██████████████████████████████
JS      ▓▓▓download▓▓▓               ▶run  (after parsing)

████ = HTML parsing   ▓▓ = download   ▶ = execute   ░░ = parsing paused
```

Example:

```html
<script async src="analytics.js"></script>

<script defer src="app.js"></script>
```

Modules (`<script type="module">`) are deferred by default.

---
