---
id: call-apply-bind
title: "call(), apply(), bind()"
sidebar_label: "call(), apply(), bind()"
sidebar_position: 7
description: "call(), apply(), bind() — JavaScript interview notes."
---
All three set `this` manually.

```text
fn.call(obj, a, b)      → runs NOW,  args one by one
fn.apply(obj, [a, b])   → runs NOW,  args as an array
fn.bind(obj, a, b)      → runs LATER, returns a new function
```

### call()

Invokes a method by specifying the owner object.

```javascript
function sayHello() {
  return 'Hello ' + this.name;
}
var obj = { name: 'Sandy' };
sayHello.call(obj); // "Hello Sandy"

// With arguments
var person = {
  getAge: function () {
    return this.age;
  },
};
var person2 = { age: 54 };
person.getAge.call(person2); // 54

function saySomething(message) {
  return this.name + ' is ' + message;
}
var person4 = { name: 'John' };
saySomething.call(person4, 'awesome'); // "John is awesome"
```

### apply()

Same as call() but takes arguments as an array.

```javascript
saySomething.apply(person4, ['awesome']); // "John is awesome"
```

### bind()

Returns a new function with bound value of "this".

```javascript
var bikeDetails = {
  displayDetails: function (registrationNumber, brandName) {
    return this.name + ', bike details: ' + registrationNumber + ', ' + brandName;
  },
};
var person1 = { name: 'Vivek' };
var detailsOfPerson1 = bikeDetails.displayDetails.bind(person1, 'TS0122', 'Bullet');
detailsOfPerson1(); // "Vivek, bike details: TS0122, Bullet"
```

### Polyfill for bind (common interview task)

```javascript
Function.prototype.myBind = function (context, ...boundArgs) {
  const fn = this; // the function myBind was called on
  return function (...args) {
    return fn.apply(context, [...boundArgs, ...args]);
  };
};
```

---
