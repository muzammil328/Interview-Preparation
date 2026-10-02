---
id: scope-and-scope-chain
title: "Scope and Scope Chain"
sidebar_label: "Scope and Scope Chain"
sidebar_position: 8
description: "Scope and Scope Chain — JavaScript interview notes."
---
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

When a variable is not found in local scope, JavaScript looks in outer scope, then global scope. It only looks **outward**, never inward.

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

```text
┌─ Global ───────────────────────────────────────┐
│ y = 24                                         │
│  ┌─ favFunction ─────────────────────────────┐ │
│  │ x = 667                                    │ │
│  │  ┌─ yetAnotherFavFunction ──────────────┐ │ │
│  │  │ console.log(y)                        │ │ │
│  │  │   1. look here      → not found       │ │ │
│  │  │   2. favFunction    → not found  ─────┼─┘ │
│  │  │   3. Global         → y = 24 ✓  ──────┼───┘
│  │  └───────────────────────────────────────┘
```

This lookup is decided by **where the code is written** (lexical scope), not where it is called.

---
