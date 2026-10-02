---
id: event-delegation
title: "Event Delegation"
sidebar_label: "Event Delegation"
sidebar_position: 16
description: "Event Delegation — JavaScript interview notes."
---
Attach one listener to the parent instead of many children. It works **because of bubbling**.

```javascript
ul.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    console.log(e.target.textContent);
  }
});
```

```text
✗ Without delegation              ✓ With delegation

<ul>                              <ul>  ◄── 1 listener
  <li> 👂                           <li>  ─┐
  <li> 👂   1000 listeners          <li>  ─┼── clicks bubble up to <ul>
  <li> 👂                           <li>  ─┘   e.target tells which <li>
```

Benefits: less memory, and it works for `<li>` elements added **later** too.

---
