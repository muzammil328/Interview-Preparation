---
id: promise-all-vs-allsettled-vs-race-vs-any
title: "Promise.all vs allSettled vs race vs any"
sidebar_label: "Promise.all vs allSettled vs race vs any"
sidebar_position: 20
description: "Promise.all vs allSettled vs race vs any — JavaScript interview notes."
---
Very common interview question.

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.reject('error');
const p3 = new Promise(r => setTimeout(() => r(3), 100));

Promise.all([p1, p3]);        // [1, 3] — waits for all
Promise.all([p1, p2, p3]);    // rejects with 'error' — fails fast
Promise.allSettled([p1, p2]); // [{status:'fulfilled',value:1}, {status:'rejected',reason:'error'}]
Promise.race([p1, p3]);       // 1 — first to SETTLE (success or failure)
Promise.any([p2, p3]);        // 3 — first to SUCCEED
```

```text
               p1 ✓(1)   p2 ✗(err)   p3 ✓(3, slow)

all          ─ waits all ─ ✗ rejects as soon as p2 fails
allSettled   ─ waits all ─ ✓ [ {✓1}, {✗err}, {✓3} ]  never rejects
race         ─ first to finish (either way) wins
any          ─ first SUCCESS wins; rejects only if ALL fail
```

| Method | Resolves when | Rejects when | Use for |
| ------ | ------------- | ------------ | ------- |
| `all` | All succeed | Any one fails | Load user + orders + settings together |
| `allSettled` | All finish | Never | Bulk jobs where some may fail |
| `race` | First settles | First settles with error | Timeouts |
| `any` | First success | All fail | Try several mirrors/servers |

### Polyfill for Promise.all (common interview task)

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let done = 0;
    if (promises.length === 0) return resolve(results);
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(value => {
          results[i] = value;          // keep the original order
          done++;
          if (done === promises.length) resolve(results);
        })
        .catch(reject);                // first failure rejects everything
    });
  });
}
```

---
