---
id: dom-document-object-model
title: "DOM (Document Object Model)"
sidebar_label: "DOM (Document Object Model)"
sidebar_position: 9
description: "DOM (Document Object Model) — JavaScript interview notes."
---
A programming interface for HTML and XML documents. The DOM represents the page as a **tree** of nodes that JavaScript can read and change.

```text
<html>                         document
  <body>                          │
    <h1>Hi</h1>                 <html>
    <ul>                          │
      <li>A</li>                <body>
      <li>B</li>              ┌───┴───┐
    </ul>                    <h1>    <ul>
  </body>                     │     ┌──┴──┐
</html>                     "Hi"  <li>  <li>
```

```javascript
const title = document.querySelector('h1');
title.textContent = 'Hello';
document.querySelector('ul').append(document.createElement('li'));
```

---
