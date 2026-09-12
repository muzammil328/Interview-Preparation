# Node.js & Express Interview

## What is Node.js?

- **Runtime environment** that allows JavaScript to run outside the browser (typically on a server)
- Built on Chrome's **V8 engine** to execute JavaScript
- **Event-driven, non-blocking** architecture (handles multiple simultaneous connections)
- Fast due to event loop + non-blocking I/O

### Node.js adds server-side capabilities

- File system access (`fs`)
- Networking (`http`, `net`)
- Process management (`process`)
- Modules and package management via npm

---

## What is the V8 engine?

- Open-source JavaScript engine developed by Google
- Used in Google Chrome and Node.js
- Converts JavaScript into machine code that the processor can execute directly

### Can Node.js work without V8?

No, Node.js cannot work without V8 (by default). Node.js is built on the V8 engine - V8 executes JavaScript code inside Node.js. Without V8, Node.js would not understand or run JS.

However, there have been experimental efforts to use other engines, but official Node.js is tightly coupled with V8.

### Can Node.js use engines other than V8?

Officially: No. But some experimental runtimes exist (e.g., ChakraCore). In production, Node.js always uses V8.

### What is the relationship between Node.js and V8?

- **Node.js** = runtime environment
- **V8** = JavaScript engine inside Node.js

Node.js uses V8 to execute JavaScript outside the browser. Node adds file system (fs), networking (http), and OS-level features.

So: V8 executes JS, Node.js provides environment + APIs.

### How V8 works

1. **Parsing**: JS code → Abstract Syntax Tree (AST)
2. **Ignition (Interpreter)**: Converts AST → Bytecode
3. **Execution**: Runs bytecode
4. **TurboFan (Optimizer)**: Converts hot (frequently used) code → optimized machine code

### How V8 compiles JavaScript

V8 uses Just-In-Time (JIT) compilation:

1. Parse JS → AST
2. AST → Bytecode (Ignition)
3. Bytecode executed
4. Frequently used code → optimized by TurboFan

Not precompiled like C++ - compiled during execution (runtime).

### What are Hidden Classes in V8?

Hidden classes are internal structures used by V8 to optimize object property access.

JavaScript objects are dynamic:

```javascript
let obj = {};
obj.name = 'Ali';
obj.age = 25;
```

V8 creates hidden classes to track object shape. Objects with same structure share the same hidden class. This enables faster property access (like C++ objects) and optimization.

### How V8 optimizes JavaScript

1. **JIT Compilation**: Converts hot code into machine code
2. **Inline Caching**: Remembers object property access patterns
3. **Hidden Classes**: Makes dynamic objects behave like static ones
4. **Garbage Collection**: Automatically frees memory
5. **TurboFan Optimizer**: Aggressively optimizes frequently used functions

### Key V8 concepts

- **JIT Compilation**: Compiles during execution (runtime)
- **Hidden Classes**: Internal structures to optimize object property access
- **Inline Caching**: Remembers object property access patterns
- **Garbage Collection**: Automatically frees memory

---

## Node.js vs Browser Runtime

| Feature       | Browser Runtime                        | Node.js Runtime                    |
| ------------- | -------------------------------------- | ---------------------------------- |
| Environment   | Runs JS in browser, interacts with DOM | Runs JS on server, no DOM          |
| APIs          | document, window, fetch, localStorage  | fs, http, path, process, Buffer    |
| Global object | window                                 | global                             |
| Use case      | Frontend, UI, client-side logic        | Backend services, servers, scripts |

---

## Why Node.js is single-threaded?

- Node.js uses a **single main thread** (event loop thread) to run JavaScript
- Uses **event loop + callback queue** to handle concurrency

### Why not for CPU-heavy tasks?

- Blocks the single thread and event loop

---

## What is the Event Loop?
The event loop is a core mechanism that allows JS to perform non-blocking, asynchronous operations despite being single-threaded.

- Mechanism that handles async operations in Node.js
- Handles non-blocking operations using callbacks, promises, async/await
- Continuously checks call stack and callback queue

### 3. How it works
- **First,** synchronous code executes line-by-line in the Call Stack.
- **Second,** asynchronous tasks—like setTimeout or fetch—are handed off to Web APIs in the background.
- **Third,** when those background tasks finish, their callbacks enter a queue.
- **Finally,** the Event Loop constantly monitors the Call Stack. The exact moment the stack becomes empty, it pushes the next callback from the queue into the stack to execute.

### Event Loop Phases

1. Timers
2. Pending callbacks
3. Idle, prepare
4. Poll
5. Check
6. Close callbacks

Microtasks (like Promise callbacks) always take priority and run before Macrotasks (like setTimeout).

---

### What is npm?

Package manager to install and manage dependencies.

### What are modules in Node.js?

Reusable blocks of code - each file is treated as a module.

### Types of Modules

- **Built-in**: fs, http, path, os, events, stream, util, net, dgram
- **Custom**: Your local files
- **Third-party**: Installed via npm

### CommonJS vs ES Modules

| Feature   | CommonJS         | ES Modules                   |
| --------- | ---------------- | ---------------------------- |
| Syntax    | `require()`      | `import/export`              |
| Export    | `module.exports` | `export`                     |
| Loading   | Synchronous      | Asynchronous                 |
| File type | `.js`            | `.mjs` or `"type": "module"` |

### Key Functions

- `require()`: Import modules (synchronous). Loads module, executes it, returns exported object.
- `module.exports`: Export data from a module. Whatever you assign to module.exports is what gets returned by require().
- `require.resolve()`: Returns the full path of a module without loading it. Useful for debugging module paths.

### Core Modules of Node.js

Built-in modules (no installation needed):

- **fs**: File system operations
- **http**: Create HTTP servers/clients
- **path**: File path manipulation
- **os**: Operating system information
- **events**: Event handling
- **stream**: Data streaming
- **util**: Utility functions
- **net**: TCP networking
- **dgram**: UDP networking
- **Buffer**: Binary data handling
- **process**: Process management
- **crypto**: Cryptographic operations

### net vs dgram modules

- **net module**: Used for TCP (Transmission Control Protocol) networking. Create TCP servers/clients. Used for chat apps, low-level networking.
- **dgram module**: Used for UDP (User Datagram Protocol). Used for fast communication where delivery isn't guaranteed (games, streaming).

---

## Streams

Objects used to handle data piece-by-piece instead of loading everything into memory.

### Types of Streams

1. **Readable**: Read data (e.g., `fs.createReadStream`)
2. **Writable**: Write data (e.g., `fs.createWriteStream`)
3. **Duplex**: Read + write (e.g., TCP sockets)
4. **Transform**: Modify data while reading/writing (e.g., compression)

### Stream Events

Streams are based on EventEmitter, emitting events:

- **Readable**: `data` (chunk available), `end` (no more data), `error` (error occurs), `close` (stream closed)
- **Writable**: `finish` (writing completed), `error` (error occurs), `close` (stream closed)

### Piping

Connect streams together - data flows automatically from one stream to another:

```javascript
const fs = require('fs');
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');
readStream.pipe(writeStream);
```

Data flows: input.txt → readStream → writeStream → output.txt

---

## Buffer

Temporary storage for raw binary data when dealing with files, network data, streams. Buffer is a fixed-size memory space for binary data.

### What is the Buffer class?

The Buffer class in Node.js is used to create and manipulate binary data directly. It is a global class built on top of raw memory (similar to arrays of bytes).

### Why use Buffers instead of binary strings?

- **Memory Efficiency**: Buffers store raw bytes directly, strings require encoding/decoding
- **Performance**: Buffers work closer to system memory (C++ level), faster for I/O operations
- **No Encoding Issues**: Strings depend on encoding (UTF-8, etc.), Buffers handle pure binary data
- **Fixed Size**: Buffers have fixed length → predictable memory usage
- **Best for Streams & Files**: Streams use buffers internally, ideal for large data processing

### Buffer Methods

- `Buffer.from()`: Create buffer from string/array
- `Buffer.alloc()`: Allocate memory
- `Buffer.allocUnsafe()`: Allocate memory without initialization (faster)
- `buf.toString()`: Convert to string
- `buf.write()`: Write string to buffer
- `buf.slice()`: Return portion of buffer

---

## Clustering & Scaling

### Clustering

Use multiple CPU cores:

```javascript
const cluster = require('cluster');
```

### Scaling

- **Horizontal**: Multiple servers
- **Vertical**: Increase server power

---

# Express.js

## What is Express.js?

Web framework for Node.js to build APIs and web apps.

```javascript
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello');
});
```

### Key Features of Express.js

- **Minimalist & Flexible**: Lightweight with minimal core features
- **Routing**: Simple and powerful URL routing
- **Middleware**: Request/response processing pipeline
- **Template Engines**: Support for dynamic HTML rendering (EJS, Pug, Handlebars)
- **RESTful API**: Easy creation of REST APIs
- **Error Handling**: Built-in error handling mechanism
- **HTTP Helpers**: Easy methods for HTTP operations

### How to Create a Simple Express Server

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

---

## Middleware in Express.js

Functions that run between request and response.

```javascript
app.use((req, res, next) => {
  console.log('Middleware');
  next();
});
```

### Middleware Parameters

- `req`: Request object (data from client)
- `res`: Response object (send data to client)
- `next()`: Pass control to next middleware

### Role of next() in Express Middleware

- `next()` passes control to the next middleware in the chain
- If `next()` is not called, the request will hang and never complete
- `next('route')` skips remaining middleware for current route
- `next(err)` passes error to error-handling middleware

### Types of Middleware

- **Built-in**: express.json(), express.static(), express.urlencoded()
- **Custom**: Your own middleware functions
- **Third-party**: cors, morgan, helmet, multer
- **Error-handling**: For handling errors (has 4 parameters: err, req, res, next)

### app.use() vs app.METHOD()

- `app.use()`: Applies middleware globally to all routes (runs on every request)
- `app.METHOD()`: Applies to specific HTTP method routes (GET, POST, PUT, DELETE)

---

### HTTP Methods

- GET → fetch data
- POST → create data
- PUT → update data (replace entirely)
- PATCH → update data (partially)
- DELETE → remove data

### Difference between app.get() and app.post()

- `app.get()`: Handle GET requests (read/fetch data)
- `app.post()`: Handle POST requests (create data)

### Route Parameters

- `req.params`: URL parameters (e.g., /users/:id)
- `req.query`: Query strings (e.g., /users?page=1)
- `req.body`: POST data (requires express.json() middleware)

### Request (req)

- `req.headers`: Request headers
- `req.method`: HTTP method
- `req.url`: URL path

### Response (res)

- `res.send()`: Send response (auto sets Content-Type)
- `res.json()`: Send JSON response
- `res.status()`: Set HTTP status code
- `res.redirect()`: Redirect to another URL
- `res.render()`: Render template
- `res.download()`: Send file for download

---

## Handling 404 Errors

```javascript
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});
```

---

## Custom Error Handling

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});
```

---

## Blocking vs Non-Blocking

| Blocking            | Non-Blocking       |
| ------------------- | ------------------ |
| Stops execution     | Runs in background |
| `fs.readFileSync()` | `fs.readFile()`    |

---

## MVC Pattern in Express

- **Model**: Data (database schemas)
- **View**: UI (templates)
- **Controller**: Logic (route handlers)

---

## Key Express Concepts

- `process.env`: Environment variables
- `__dirname`: Current folder path
- `app.use()`: Apply middleware globally
- `app.route()`: Chain routes
- `res.send()` vs `res.json()`: Send text vs JSON
- `res.redirect()`: Redirect requests
- `res.status()`: Set HTTP status
- Default port: 3000 (or process.env.PORT)

---

## Common Third-Party Middleware

| Middleware  | Purpose               |
| ----------- | --------------------- |
| cors        | Enable CORS           |
| helmet      | Secure HTTP headers   |
| morgan      | Logging               |
| multer      | File upload           |
| dotenv      | Environment variables |
| body-parser | Request body parsing  |

---

# JWT

JSON Web Token for secure login:

1. User logs in
2. Server sends token
3. Client stores token
4. Client sends token in requests

---

## Rate Limiting

Prevents too many requests from a client.

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests',
});

app.use('/api', limiter);
```

---

## Error Handling

```javascript
// Sync error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Async error handling (wrap with try-catch or use catch)
app.get('/async', async (req, res, next) => {
  try {
    const data = await someAsyncOperation();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
```

---

## Security Best Practices

- Helmet (secure HTTP headers)
- JWT authentication
- Rate limiting
- Input validation (Joi, Zod)
- HTTPS/SSL
- CORS configuration
- Sanitize inputs (prevent XSS)
- Use security headers

---

## Performance Optimization

- Caching (Redis)
- Clustering (multiple CPU cores)
- Load balancing
- Use streams for large files
- Database connection pooling
- Compression (gzip)
- Minimize middleware
- Use CDN for static files
