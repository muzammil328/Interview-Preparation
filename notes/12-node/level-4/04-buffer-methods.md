---
id: buffer-methods
title: "Buffer Methods"
sidebar_label: "Buffer Methods"
sidebar_position: 4
description: "Buffer Methods — Node.js interview notes."
---
- `Buffer.from()`: Create buffer from string/array
- `Buffer.alloc()`: Allocate zero-filled memory
- `Buffer.allocUnsafe()`: Allocate memory without initialization (faster, may contain old data)
- `buf.toString()`: Convert to string
- `buf.write()`: Write string to buffer
- `buf.subarray()`: Return a portion of the buffer that **shares the same memory** (`buf.slice()` does the same but is deprecated)

---
