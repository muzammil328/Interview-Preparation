---
id: q5-what-is-redux-toolkit-rtk-and-why-use-it
title: "Q5. What is Redux Toolkit (RTK) and why use it?"
sidebar_label: "Q5. What is Redux Toolkit (RTK) and why use it?"
sidebar_position: 5
description: "Q5. What is Redux Toolkit (RTK) and why use it? — State Management interview notes."
---
Redux Toolkit is the **official, recommended** way to write Redux. It removes the boilerplate of classic Redux.

```text
Classic Redux:  action types + action creators + switch reducer + store setup + thunk setup
Redux Toolkit:  createSlice()  ──► actions + reducer generated together
                configureStore() ──► DevTools + thunk included
```

```js
import { createSlice, configureStore } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload); // safe: Immer makes it immutable
    },
  },
});

export const { addItem } = cartSlice.actions;
export const store = configureStore({ reducer: { cart: cartSlice.reducer } });

// In a component
const items = useSelector((state) => state.cart.items);
const dispatch = useDispatch();
dispatch(addItem({ id: 1, name: 'Shoes' }));
```

---
