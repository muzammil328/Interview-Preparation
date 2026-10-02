---
id: delete-vs-truncate-vs-drop
title: "DELETE vs TRUNCATE vs DROP"
sidebar_label: "DELETE vs TRUNCATE vs DROP"
sidebar_position: 5
description: "DELETE vs TRUNCATE vs DROP — SQL interview notes."
---
| Command    | Removes                      | WHERE allowed | Speed   | Table structure |
| ---------- | ---------------------------- | ------------- | ------- | --------------- |
| `DELETE`   | Selected rows (or all)       | ✔             | Slower (row by row, fires triggers) | Kept |
| `TRUNCATE` | All rows                     | ✘             | Very fast | Kept          |
| `DROP`     | The whole table              | ✘             | Fast    | **Removed**     |

```text
DELETE FROM users WHERE id=3   →  table ✔  some rows gone
TRUNCATE users                 →  table ✔  all rows gone (empty table)
DROP TABLE users               →  table ✘  gone completely
```

**Note:** in PostgreSQL `TRUNCATE` is transactional and can be rolled back inside `BEGIN ... ROLLBACK`. In MySQL it commits implicitly and cannot be rolled back.
