---
id: monorepo-vs-polyrepo
title: "Monorepo vs Polyrepo"
sidebar_label: "Monorepo vs Polyrepo"
sidebar_position: 3
description: "Monorepo vs Polyrepo — Architecture interview notes."
---
| Monorepo                                         | Polyrepo                                       |
| ------------------------------------------------ | ---------------------------------------------- |
| Shared code is imported directly                 | Shared code is published as a package and versioned |
| One PR can change several apps at once           | A cross-project change needs several PRs       |
| Needs tooling to build only what changed         | Each repo has its own simple CI                |
| Consistent tooling and versions                  | Each team picks its own setup                  |
