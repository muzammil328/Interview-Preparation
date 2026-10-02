---
id: what-is-dom
title: "What is DOM?"
sidebar_label: "What is DOM?"
sidebar_position: 7
description: "What is DOM? — HTML interview notes."
---
DOM (**Document Object Model**) represents an HTML document as a tree of objects that JavaScript can read and change.

```html
<html>
  <body>
    <h1 id="title">Hi</h1>
    <ul><li>One</li></ul>
  </body>
</html>
```

```text
document
  └── html
       └── body
            ├── h1#title
            │    └── "Hi"   (text node)
            └── ul
                 └── li
                      └── "One"
```

JavaScript can use DOM to:

- Change HTML content.
- Modify CSS.
- Add/remove elements.
- Handle events.

Example:

```javascript
document.getElementById("title").textContent = "Hello World";
```

Prefer `textContent` for plain text. `innerHTML` parses HTML and can cause XSS if the value comes from a user.

---
