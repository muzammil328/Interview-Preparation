# JavaScript Interview Questions

---

## What is JavaScript?

JavaScript is a high-level, versatile programming language that adds interactivity, logic, and dynamic behaviors to websites. 

## What are the different data types present in javascript?
JavaScript has two types of data:

### 1. Primitive Types

- **String**: A series of characters
- **Number**: Can be written with or without decimals
- **BigInt**: For large integers (add "n" to the end)
- **Boolean**: true or false
- **Undefined**: Declared but not assigned
- **Null**: Non-existent or invalid value
- **Symbol**: Unique value (ES6)

### 2. Non-Primitive Types

- **Object**: Collection of data in key-value pairs
- **Array**: Ordered list of values

## Hoisting

- Hoisting is the default behavior where all variable and function declarations are moved to the top of the scope.
- Variable initializations are not hoisted, only declarations
- To avoid hoisting, use strict mode: `"use strict";`
- let and const are hoisted but in "temporal dead zone"

## var vs let vs const

| Feature        | var | let       | const     |
| -------------- | --- | --------- | --------- |
| Global Scope   | yes | no        | no        |
| Function Scope | yes | yes       | yes       |
| Block Scope    | no  | yes       | yes       |
| Reassigned     | yes | yes       | no        |
| Redeclared     | yes | no        | no        |
| Hoisted        | yes | yes (TDZ) | yes (TDZ) |

## Coercion
Automatic conversion of value from one data type to another.It handles type coercion in two distinct ways.

- **Implicit coercion:** done automatically by the engine
- **Explicit coercion:** done intentionally by the developer

### String Coercion
Occurs most often with the + operator. If any operand is a string, JavaScript converts the others to strings and concatenates them.

```javascript
var x = 3;
var y = '3';
x + y; // Returns "33"
```

### Number Coercion
- Occurs with arithmetic operators like -, *, /, and comparison operators like >. 
- JavaScript attempts to convert strings or booleans into numbers.
- Example: "5" - 2 results in 3.

### Boolean Coercion
- Occurs in logical contexts like if statements or logical operators (&&, ||). 
- Values are coerced to either "truthy" or "falsy".

```javascript
var x = 0;
var y = 23;
if (x) {
  console.log(x);
} // Not run (Falsy)
if (y) {
  console.log(y);
} // Runs (Truthy)

// Logical operators
x || y; // Returns 220 (first truthy)
x && y; // Returns "Hello" (both truthy)
```

### Equality Coercion

```javascript
var a = 12;
var b = '12';
a == b;  // Returns true (coercion happens)
a === b; // Returns false (no coercion)
```

- `==`: Compares values (type coercion)
- `===`: Compares values AND types

## NaN Property

NaN = "Not-a-Number"

```javascript
typeof NaN; // Returns "Number"

isNaN('Hello'); // Returns true
isNaN(345); // Returns false
isNaN('1'); // Returns false (converted to 1)
isNaN(true); // Returns false (converted to 1)
isNaN(undefined); // Returns true
```

## Passed by Value vs Passed by Reference
- **Primitive types**: Passed by value (copy of actual data)
- **Non-primitive types**: Passed by reference (memory address of original data)

```javascript
// Primitive - passed by value
var y = 234;
var z = y;
z = 5411; // new address
y = 23;
console.log(z); // Returns 234

// Non-primitive - passed by reference
var obj = { name: 'Vivek' };
var obj2 = obj;
obj.name = 'Akki';
console.log(obj2); // Returns {name: "Akki"}
```

---

## Immediately Invoked Function (IIFE)

A function that runs as soon as it is defined.

```javascript
(function () {
  // Do something;
})();
```

**How it works:**

1. First set of parentheses: Tells compiler it's a function expression, not declaration
2. Second set of parentheses: Invokes the function

---

## Strict Mode

In ECMAScript 5, strict mode makes JavaScript throw errors for silent failures.

```javascript
'use strict';
// x = 23; // Error: x is not defined
var x;
```

**Characteristics:**

- No duplicate arguments allowed
- Cannot use JavaScript keyword as parameter/function name
- Cannot create global variables
- Makes debugging easier

---

## Higher Order Functions

Functions that operate on other functions (take them as arguments or return them).

```javascript
function higherOrder(fn) {
  fn();
}
higherOrder(function () {
  console.log('Hello world');
});

function higherOrder2() {
  return function () {
    return 'Do something';
  };
}
var x = higherOrder2();
x(); // Returns "Do something"
```

---

## "this" Keyword

Refers to the object that the function is a property of.

```javascript
function doSomething() {
  console.log(this);
}
doSomething(); // Returns global object (window in browser)
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
```

---

## call(), apply(), bind()

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

---

## exec() vs test()

- **exec()**: Searches for pattern, returns pattern or null
- **test()**: Tests for pattern match, returns true/false

```javascript
var regex = /hello/;
regex.exec('hello world'); // Returns ["hello"]
regex.test('hello world'); // Returns true
```

---

## Currying

Transforms a function of n arguments to n functions of one or fewer arguments.

```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}
add(3)(4); // Returns 7

// Converting multiply(a,b) to curried form
function multiply(a, b) {
  return a * b;
}
function currying(fn) {
  return function (a) {
    return function (b) {
      return fn(a, b);
    };
  };
}
var curriedMultiply = currying(multiply);
curriedMultiply(4)(3); // Returns 12
```

---

## External JavaScript

JavaScript code in a separate file with .js extension, linked in HTML.

**Advantages:**

- Collaboration between designers and developers
- Code reusability
- Better code readability

---

## Scope and Scope Chain

### Types of Scope:

1. **Global Scope**: Variables declared in global namespace

   ```javascript
   var globalVariable = 'Hello world';
   function sendMessage() {
     return globalVariable;
   }
   ```

2. **Function/Local Scope**: Variables declared inside a function

   ```javascript
   function awesomeFunction() {
     var a = 2;
     var multiplyBy2 = function () {
       console.log(a * 2);
     };
   }
   // console.log(a); // Reference error
   ```

3. **Block Scope**: Variables declared with let/const inside {}
   ```javascript
   {
     let x = 45;
   }
   // console.log(x); // Reference error
   ```

### Scope Chain

When a variable is not found in local scope, JavaScript looks in outer scope, then global scope.

```javascript
var y = 24;
function favFunction() {
  var x = 667;
  var anotherFavFunction = function () {
    console.log(x); // 667
  };
  var yetAnotherFavFunction = function () {
    console.log(y); // 24 (from global)
  };
  anotherFavFunction();
  yetAnotherFavFunction();
}
```

---

## Closures

An ability of a function to remember variables from its outer scope even after execution.

```javascript
function randomFunc() {
  var obj1 = { name: 'Vivian', age: 45 };
  return function () {
    console.log(obj1.name + ' is awesome');
  };
}
var initialiseClosure = randomFunc();
initialiseClosure(); // "Vivian is awesome"
```

---

## Advantages of JavaScript

- Runs on client-side AND server-side (Node.js)
- Simple language to learn
- Fast execution
- Rich interfaces
- Versatile (web, mobile, servers, games)

---

## Object Prototypes

All JavaScript objects inherit properties from a prototype.

```javascript
var arr = [];
arr.push(2);
console.log(arr); // [2]
```

Array objects inherit from Array prototype. The JavaScript engine looks for methods in the prototype chain.

**Prototype Chain:**
Array → Array Prototype → Object Prototype

---

## Callbacks

A function passed as an argument to another function.

```javascript
function divideByHalf(sum) {
  console.log(Math.floor(sum / 2));
}

function multiplyBy2(sum) {
  console.log(sum * 2);
}

function operationOnSum(num1, num2, operation) {
  var sum = num1 + num2;
  operation(sum);
}

operationOnSum(3, 3, divideByHalf); // 3
operationOnSum(5, 5, multiplyBy2); // 20
```

---

## Types of Errors in JavaScript

1. **Syntax Error**: Mistakes in code that stop execution
2. **Logical Error**: Syntax is correct but logic is wrong (no error messages)

---

## Memoization

Caching return values based on parameters.

```javascript
function memoizedAddTo256() {
  var cache = {};
  return function (num) {
    if (num in cache) {
      console.log('cached value');
      return cache[num];
    } else {
      cache[num] = num + 256;
      return cache[num];
    }
  };
}
var memoizedFunc = memoizedAddTo256();
memoizedFunc(20); // Normal return
memoizedFunc(20); // Cached return
```

---

## Recursion

A technique where a function calls itself until it arrives at a result.

```javascript
function add(number) {
  if (number <= 0) {
    return 0;
  } else {
    return number + add(number - 1);
  }
}
add(3); // 3 + 2 + 1 + 0 = 6
```

---

## Constructor Function

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

---

## DOM (Document Object Model)

A programming interface for HTML and XML documents. DOM represents the document as nodes and objects.

---

## charAt()

Retrieves a character at a certain index.

```javascript
var str = 'Hello World';
str.charAt(0); // "H"
str.charAt(4); // "o"
```

---

## BOM (Browser Object Model)

Allows interaction with the browser. The initial object is `window`.

```javascript
window.document;
window.history;
window.screen;
window.navigator;
window.location;
```

---

## Client-Side vs Server-Side JavaScript

- **Client-side**: JavaScript runs in the browser (in HTML pages)
- **Server-side**: JavaScript runs on the server (Node.js)

---

# JavaScript ES6+ Features

## Arrow Functions

Introduced in ES6, provides shorter syntax.

```javascript
// Traditional
var add = function (a, b) {
  return a + b;
};

// Arrow
var arrowAdd = (a, b) => a + b;

// Single parameter
var arrowMultiplyBy2 = num => num * 2;
```

**Key difference: `this` binding**

```javascript
var obj1 = {
  valueOfThis: function () {
    return this;
  },
};
var obj2 = {
  valueOfThis: () => {
    return this;
  },
};
obj1.valueOfThis(); // Returns obj1
obj2.valueOfThis(); // Returns window/global object
```

---

## Rest Parameter

Collects multiple arguments into an array.

```javascript
function extractingArgs(...args) {
  return args[1];
}
extractingArgs(8, 9, 1); // Returns 9

function addAllArgs(...args) {
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum += args[i];
  }
  return sum;
}
addAllArgs(6, 5, 7, 99); // Returns 117
```

**Note:** Must be the last parameter.

---

## Spread Operator

Spreads an array or object literals.

```javascript
function addFourNumbers(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4;
}
let fourNumbers = [5, 6, 7, 8];
addFourNumbers(...fourNumbers); // Spreads as 5,6,7,8

// Clone array
let array1 = [3, 4, 5, 6];
let clonedArray1 = [...array1];

// Merge objects
let obj1 = { x: 'Hello', y: 'Bye' };
let obj2 = { z: 'Yes', a: 'No' };
let mergedObj = { ...obj1, ...obj2 };
```

---

## Classes in JavaScript

Syntactic sugar for constructor functions (ES6).

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

- Classes are not hoisted
- Can inherit using extends
- Strict mode by default

---

## Generator Functions

Can be stopped midway and continue from where they stopped.

```javascript
function* genFunc() {
  yield 3;
  yield 4;
}
genFunc(); // Returns Object [Generator] {}

var iterator = genFunc();
iterator.next(); // {value: 3, done: false}
iterator.next(); // {value: 4, done: false}
iterator.next(); // {value: undefined, done: true}
```

---

## WeakSet

Collection of unique objects with weak references.

```javascript
let obj1 = { message: 'Hello world' };
const newSet = new WeakSet([obj1]);
newSet.has(obj1); // true

// Only objects, no primitives
// Methods: add(), delete(), has()
```

---

## WeakMap

Similar to Map but keys must be objects.

```javascript
let obj = { name: 'Vivek' };
const map = new WeakMap();
map.set(obj, { age: 23 });
map.get(obj); // { age: 23 }
```

---

## Object Destructuring

Extract elements from objects.

```javascript
const classDetails = {
  strength: 78,
  benches: 39,
  blackBoard: 1,
};

// Before ES6
const strength = classDetails.strength;

// ES6 Destructuring
const { strength, benches, blackBoard } = classDetails;
const { strength: classStrength } = classDetails; // Rename
```

---

## Array Destructuring

```javascript
const arr = [1, 2, 3, 4];
const [first, second, third, fourth] = arr;
```

---

## Template Literals

Strings using backticks.

```javascript
const name = 'Justin';
console.log(`Hello, ${name}`);

// Multi-line
const text = `This is line one
This is line two`;
```

---

## Tagged Templates

Function that processes template literals.

```javascript
function tag(strings, ...values) {
  console.log(strings); // parts
  console.log(values); // interpolated values
}
tag`Hello ${'Justin'}, you have ${3} messages`;
```

---

## ES Modules

Official standard for packaging JavaScript code.

```javascript
// utils.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export default function greet(name) {
  return `Hello, ${name}`;
}

// app.js
import greet, { add, multiply } from './utils.js';
add(2, 3); // 5
greet('Jasmin'); // "Hello, Jasmin"
```

---

## Optional Chaining (?.)

Safely access nested properties.

```javascript
const user = {
  profile: {
    address: {
      city: 'Mumbai',
    },
  },
};
console.log(user.profile.address?.city); // "Mumbai"
console.log(user.profile.address?.country); // undefined
```

---

## Nullish Coalescing (??)

Returns right-hand side only if left is null/undefined.

```javascript
const name = null;
console.log(name ?? 'Guest'); // "Guest"

const config = { port: 0 };
console.log(config.port ?? 3000); // 0 (unlike || which returns 3000)
```

---

## Async/Await

Cleaner way to handle promises.

```javascript
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('Error:', error);
  }
}
```

---

## Promises

Handle asynchronous operations.

```javascript
function sumOfThreeElements(...elements) {
  return new Promise((resolve, reject) => {
    if (elements.length > 3) {
      reject('Only three elements or less');
    } else {
      let sum = 0;
      elements.forEach(e => (sum += e));
      resolve('Sum: ' + sum);
    }
  });
}

sumOfThreeElements(4, 5, 6)
  .then(result => console.log(result))
  .catch(error => console.log(error));
```

---

# JavaScript Advanced Concepts

## Event Loop

1. Call Stack executes synchronous code
2. Web APIs handle async operations
3. Callback Queue holds macrotasks
4. Microtask Queue holds promises
5. Event loop moves tasks to call stack

**Important:** Microtasks run before macrotasks.

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
```

---

## Debouncing

Delays execution until user stops triggering event.

```javascript
function debounce(fn, delay) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
```

---

## Throttling

Limits function execution frequency.

```javascript
function throttle(fn, limit) {
  let inThrottle;
  return function () {
    const context = this;
    const args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

---

## Event Bubbling vs Capturing

- **Bubbling**: Event propagates from child to parent (default)
- **Capturing**: Event propagates from parent to child

```javascript
// Bubbling (default)
element.addEventListener('click', handler);

// Capturing
element.addEventListener('click', handler, true);
```

---

## Event Delegation

Attach one listener to parent instead of many children.

```javascript
ul.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    console.log(e.target.textContent);
  }
});
```

---

## Shallow Copy vs Deep Copy

### Shallow Copy

Only top-level properties are copied.

```javascript
const user = { name: 'Alice', address: { city: 'Mumbai' } };
const copy = { ...user };
copy.address.city = 'Delhi';
// Both user and copy show "Delhi" (shared nested object)
```

### Deep Copy

Completely independent clone.

```javascript
const user = { name: 'Alice', address: { city: 'Mumbai' } };
const deepCopy = structuredClone(user);
// Or: JSON.parse(JSON.stringify(user))

deepCopy.address.city = 'Delhi';
// Original user unchanged
```

---

## Memory Leaks in JavaScript

**Common causes:**

- Global variables
- Forgotten timers/setInterval
- Event listeners not removed
- Detached DOM nodes

**Detection:** Browser DevTools memory snapshots

---

## Garbage Collection in V8

Uses mark-and-sweep algorithm:

1. Marks all reachable objects from roots
2. Sweeps unmarked objects
3. Compacts memory

---

## JavaScript Design Patterns

### Creational

- Constructor
- Factory
- Singleton

### Structural

- Adapter
- Decorator

### Behavioral

- Observer
- Module
- Iterator

---

# Common JavaScript Methods

## Array Methods

```javascript
// map() - transform each element
[1, 2, 3].map(x => x * 2); // [2, 4, 6]

// filter() - keep elements passing condition
[1, 2, 3, 4].filter(x => x % 2 === 0); // [2, 4]

// reduce() - reduce to single value
[1, 2, 3, 4].reduce((acc, x) => acc + x, 0); // 10

// forEach() - iterate (no return)
[1, 2, 3].forEach(x => console.log(x));

// find() - first matching element
[1, 2, 3].find(x => x > 1); // 2

// some() / every() - check conditions
[1, 2, 3].some(x => x > 2); // true
[1, 2, 3].every(x => x > 0); // true
```

## String Methods

```javascript
'Hello'.toUpperCase(); // "HELLO"
'Hello'.toLowerCase(); // "hello"
'Hello'.charAt(0); // "H"
'Hello'.indexOf('l'); // 2
'Hello'.slice(1, 4); // "ell"
'Hello'.split(''); // ["H", "e", "l", "l", "o"]
'Hello'.trim(); // "Hello"
```

## Object Methods

```javascript
Object.keys(obj); // ["name", "age"]
Object.values(obj); // ["John", 30]
Object.entries(obj); // [["name", "John"], ["age", 30]]
Object.assign({}, obj); // Clone object
```

---

# JavaScript MCQ Quick Review

| Question          | Answer                       |
| ----------------- | ---------------------------- |
| typeof null       | "object"                     |
| typeof undefined  | "undefined"                  |
| 0.1 + 0.2 === 0.3 | false                        |
| [] == []          | false (different references) |
| [] === []         | false                        |
| {} == {}          | false                        |
| NaN === NaN       | false (use isNaN())          |

---

# Quick Fire Questions

- **Is JavaScript single-threaded?** Yes, but async operations use Web APIs
- **What is closure?** Function that remembers its outer scope
- **What is hoisting?** Moving declarations to top of scope
- **Difference between let and var?** Block scope vs function scope
- **What is Promise?** Object representing async operation
- **What is async/await?** Syntactic sugar for promises
- **What is DOM?** Document Object Model
- **What is event delegation?** Single listener for multiple children
- **What is memoization?** Caching function results
- **What is currying?** Converting multi-arg function to unary chain
