---
id: string-methods
title: "String Methods"
sidebar_label: "String Methods"
sidebar_position: 12
description: "String Methods — JavaScript interview notes."
---
```javascript
'Hello'.toUpperCase(); // "HELLO"
'Hello'.toLowerCase(); // "hello"
'Hello'.indexOf('l'); // 2
'Hello'.slice(1, 4); // "ell"
'Hello'.split(''); // ["H", "e", "l", "l", "o"]
'  Hello  '.trim(); // "Hello"
'Hello'.includes('ell'); // true
'a-b-c'.replaceAll('-', '+'); // "a+b+c"

// Reverse a string — very common
'hello'.split('').reverse().join(''); // "olleh"
```

```text
'hello' ─split('')─► ['h','e','l','l','o'] ─reverse()─► ['o','l','l','e','h'] ─join('')─► 'olleh'
```
