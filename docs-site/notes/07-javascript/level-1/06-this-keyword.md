---
id: this-keyword
title: "\"this\" Keyword"
sidebar_label: "\"this\" Keyword"
sidebar_position: 6
description: "\"this\" Keyword — JavaScript interview notes."
---
`this` is decided by **how a function is called**, not where it is written (except arrow functions).

```mermaid
flowchart TD
    A["How is the function called?"] --> B{"Arrow function?"}
    B -->|yes| B1["this = this of the<br/>surrounding scope"]
    B -->|no| C{"Called with new?"}
    C -->|yes| C1["this = the new object"]
    C -->|no| D{"call / apply / bind?"}
    D -->|yes| D1["this = the object passed in"]
    D -->|no| E{"obj.method() ?"}
    E -->|yes| E1["this = obj<br/>(object before the dot)"]
    E -->|no| F["Plain call f()<br/>window — or undefined in strict mode"]
```

```javascript
function doSomething() {
  console.log(this);
}
doSomething(); // window in a browser (undefined in strict mode)
```

**Rule:** Check the object before the dot.

```javascript
var obj = {
  name: 'vivek',
  getName: function () {
    console.log(this.name);
  },
};
obj.getName(); // "vivek"

var getName = obj.getName;
var obj2 = { name: 'akshay', getName };
obj2.getName(); // "akshay"

getName(); // undefined — no object before the dot, `this` is lost
```

---
