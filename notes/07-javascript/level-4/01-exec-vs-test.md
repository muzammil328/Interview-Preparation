---
id: exec-vs-test
title: "exec() vs test()"
sidebar_label: "exec() vs test()"
sidebar_position: 1
description: "exec() vs test() — JavaScript interview notes."
---
- **exec()**: Searches for pattern, returns a match array or null
- **test()**: Tests for pattern match, returns true/false

```javascript
var regex = /hello/;
regex.exec('hello world'); // Returns ["hello"]
regex.test('hello world'); // Returns true
```

---
