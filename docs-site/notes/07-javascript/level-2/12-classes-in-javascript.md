---
id: classes-in-javascript
title: "Classes in JavaScript"
sidebar_label: "Classes in JavaScript"
sidebar_position: 12
description: "Classes in JavaScript — JavaScript interview notes."
---
Syntactic sugar for constructor functions and prototypes (ES6).

```javascript
// ES6 Class
class Student {
  constructor(name, rollNumber, grade, section) {
    this.name = name;
    this.rollNumber = rollNumber;
    this.grade = grade;
    this.section = section;
  }

  getDetails() {
    return `Name: ${this.name}, Roll no: ${this.rollNumber}`;
  }
}

let student = new Student('Vivek', 354, '6th', 'A');
student.getDetails();
```

**Key points:**

- Classes are hoisted but stay in the TDZ (you can't use them before the declaration)
- Can inherit using extends
- Strict mode by default

```javascript
class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }
}
class Dog extends Animal {
  speak() { return `${super.speak()} — woof`; }
}
new Dog('Rex').speak(); // "Rex makes a sound — woof"
```

```text
rex ──► Dog.prototype ──► Animal.prototype ──► Object.prototype
         { speak }         { speak }
```

---
