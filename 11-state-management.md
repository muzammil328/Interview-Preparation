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
