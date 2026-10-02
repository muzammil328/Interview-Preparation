---
id: constructor-function
title: "Constructor Function"
sidebar_label: "Constructor Function"
sidebar_position: 6
description: "Constructor Function — JavaScript interview notes."
---
Used to create multiple objects with similar properties.

```javascript
function Person(name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;
}

var person1 = new Person('Vivek', 76, 'male');
var person2 = new Person('Courtney', 34, 'female');
```

What `new` does:

```text
new Person('Vivek', 76, 'male')
  1. create an empty object             {}
  2. link its prototype                 {}.__proto__ = Person.prototype
  3. run Person with this = new object  { name, age, gender }
  4. return the object (automatically)
```

---
