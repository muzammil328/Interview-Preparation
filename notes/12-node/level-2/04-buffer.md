---
id: buffer
title: "Buffer"
sidebar_label: "Buffer"
sidebar_position: 4
description: "Buffer — Node.js interview notes."
---
Temporary storage for raw binary data when dealing with files, network data, streams. A Buffer is a fixed-size chunk of memory allocated outside the V8 heap.

### Why use Buffers instead of binary strings?

- **Memory Efficiency**: Buffers store raw bytes directly, strings require encoding/decoding
- **Performance**: Buffers work closer to system memory, faster for I/O operations
- **No Encoding Issues**: Strings depend on encoding (UTF-8, etc.), Buffers handle pure binary data
- **Fixed Size**: Buffers have fixed length → predictable memory usage

```javascript
const buf = Buffer.from('Hi');
console.log(buf);            // <Buffer 48 69>
console.log(buf.toString()); // "Hi"
```

```text
String "Hi"  ──encode UTF-8──>  Buffer [ 0x48 | 0x69 ]
                                         'H'    'i'
```

---
