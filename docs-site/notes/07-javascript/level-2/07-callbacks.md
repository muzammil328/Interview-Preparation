---
id: callbacks
title: "Callbacks"
sidebar_label: "Callbacks"
sidebar_position: 7
description: "Callbacks — JavaScript interview notes."
---
A function passed as an argument to another function, to be called later.

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

### Callback Hell

```text
getUser(id, user =>
  getOrders(user, orders =>
    getItems(orders, items =>
      getPrice(items, price =>
        console.log(price)       ◄── "pyramid of doom"
      )
    )
  )
)
```

Hard to read, and error handling must be repeated at every level. Promises and async/await fix this.

---
