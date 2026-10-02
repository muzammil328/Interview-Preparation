---
id: rarely-asked-lower-priority
title: "Rarely Asked (Lower Priority)"
sidebar_label: "Rarely Asked (Lower Priority)"
sidebar_position: 1
description: "Rarely Asked (Lower Priority) — Git interview notes."
---
## Essential First-Time Git Setup

### Set Your Name

```bash
git config user.name "Your Name"
```

Set globally:

```bash
git config --global user.name "Your Name"
```

### Set Your Email

```bash
git config user.email "your.email@example.com"
```

Set globally:

```bash
git config --global user.email "your.email@example.com"
```

```text
--global  → saved in ~/.gitconfig, applies to all repos
(no flag) → saved in this repo's .git/config, overrides global
```

---

## Remove Old GitHub Saved Login (Windows)

Run this command in terminal:

```bash
cmdkey /delete:LegacyGeneric:target=git:https://github.com
```
