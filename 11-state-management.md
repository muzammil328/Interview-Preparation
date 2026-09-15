# State Management Interview

Used for passing global data across components.

## Redux

Used for complex, frequent updates and middleware support.

- **Store**: Central container holding all states in a single store
- **Action**: Dispatched to modify the state
- **Reducer**: Takes current state + action = returns new state
- **Component**: Read state and dispatch actions

When any slice changes, only reload specific components that use it.

![Redux Flow](https://miro.medium.com/1*T7dpCTgsMvaf9LKxpSdtXA.png)

## Context API

Used for theme, authentication, and other global values.

**Note**: When any state changes in Context, all wrapped children re-render because they are wrapped in the provider.

![Context API](https://media.geeksforgeeks.org/wp-content/uploads/20250823173319625050/context_api.webp)

## Difference Between Redux and Context API

| Feature     | Redux                        | Context API                        |
| ----------- | ---------------------------- | ---------------------------------- |
| Use Case    | Complex, frequent updates    | Simple global values (theme, auth) |
| Performance | Optimized, selective updates | Re-renders all consumers on change |
| Middleware  | Supports middleware          | No middleware support              |
| Boilerplate | More setup code              | Simpler, less code                 |
| DevTools    | Redux DevTools for debugging | No built-in debugging tools        |
| Scalability | Scales well for large apps   | Best for small-medium apps         |

## Common Questions

### Q1. What is state management, and why do we need it in React apps?

State management is the way we store, update, and share data in a React application. We need it to keep application data organized and make it easier for different components to access and update shared data.

### Q2. Difference between local state and global state?

| Local State                                   | Global State                             |
| --------------------------------------------- | ---------------------------------------- |
| Used by one component or a small part of the UI | Shared across many components            |
| Usually managed with `useState` / `useReducer` | Usually managed with Redux, Zustand, Context, etc. |
| Example: input value, modal open/close        | Example: logged-in user, theme, cart     |
| Easier to manage                              | More complex to manage                   |

### Q3. Difference between Context API and Redux?

Context is good for simple shared data. But when the Context value changes, many components using that Context can re-render.

Redux lets components subscribe to only the data they need, so fewer components re-render. That's why Redux is better for large and complex applications.

See the full comparison table above.

### Q4. How does Redux manage state, and what are its core concepts?

Redux stores shared state in a central store. A component dispatches an action, the reducer handles that action and updates the state, and the component gets the updated state through a selector.

| Concept  | Simple Meaning                    |
| -------- | --------------------------------- |
| Store    | Holds the application state       |
| Action   | Describes what happened           |
| Reducer  | Decides how the state should change |
| Dispatch | Sends an action to Redux          |
| Selector | Reads data from the store         |
