---
id: nullish-coalescing
title: "Nullish Coalescing (??)"
sidebar_label: "Nullish Coalescing (??)"
sidebar_position: 16
description: "Nullish Coalescing (??) — JavaScript interview notes."
---
Returns right-hand side only if left is null/undefined.

```javascript
const name = null;
console.log(name ?? 'Guest'); // "Guest"

const config = { port: 0 };
console.log(config.port ?? 3000); // 0 (unlike || which returns 3000)
```

```text
value        value || 'default'      value ?? 'default'
0            'default'               0
''           'default'               ''
false        'default'               false
null         'default'               'default'
undefined    'default'               'default'
```

`||` falls back on any **falsy** value; `??` only on `null`/`undefined`.

---
