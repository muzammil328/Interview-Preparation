---
id: blocking-vs-non-blocking
title: "Blocking vs Non-Blocking"
sidebar_label: "Blocking vs Non-Blocking"
sidebar_position: 4
description: "Blocking vs Non-Blocking — Node.js interview notes."
---
- **Blocking**: the main thread waits until the operation finishes. Nothing else runs.
- **Non-blocking**: the operation is handed off; the thread keeps serving other work and a callback/promise handles the result later.

| Blocking                     | Non-Blocking                               |
| ---------------------------- | ------------------------------------------ |
| Stops execution              | Runs in background                         |
| `fs.readFileSync()`          | `fs.readFile()` / `fs.promises.readFile()` |
| OK in startup scripts / CLIs | Use inside request handlers                |

```javascript
// Blocking
const data = fs.readFileSync('big.txt');
console.log('after read'); // waits for the file

// Non-blocking
fs.readFile('big.txt', (err, data) => console.log('file ready'));
console.log('after read'); // prints first
```

```text
Blocking (sync)                     Non-blocking (async)
Thread: [read file.......][next]    Thread: [start read][next][other req][callback]
                                    Pool:          [read file.......]
```

---
