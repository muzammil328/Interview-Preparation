---
id: semantic-versioning-caret-and-tilde
title: "Semantic Versioning — Caret (^) and Tilde (~)"
sidebar_label: "Semantic Versioning — Caret (^) and Tilde (~)"
sidebar_position: 5
description: "Semantic Versioning — Caret (^) and Tilde (~) — Node Package Manager (NPM) interview notes."
---
Versions follow **MAJOR.MINOR.PATCH**:

```text
     4   .   19   .   2
     │       │        └── PATCH: bug fix, safe
     │       └─────────── MINOR: new feature, backward compatible
     └─────────────────── MAJOR: breaking change
```

Version symbols control which package updates are allowed.

```text
"^1.2.3"  →  1.2.3  ✓  1.2.9  ✓  1.9.0  ✓  2.0.0  ✗     (lock MAJOR)
"~1.2.3"  →  1.2.3  ✓  1.2.9  ✓  1.3.0  ✗              (lock MAJOR.MINOR)
"1.2.3"   →  only 1.2.3                                (exact)
```

## Caret (^)

The **caret (`^`)** allows updates to **minor and patch versions**.

Example:

```json
"express": "^1.2.3"
```

Allows:

```text
1.2.4
1.3.0
```

Does not allow:

```text
2.0.0
```

**Exception for 0.x versions:** `^0.2.3` allows only `0.2.x` (not `0.3.0`), because in 0.x a minor bump can be breaking.

---

## Tilde (~)

The **tilde (`~`)** allows updates only to **patch versions**.

Example:

```json
"express": "~1.2.3"
```

Allows:

```text
1.2.4
```

Does not allow:

```text
1.3.0
```

---
