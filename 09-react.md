# React Interview Questions and Answers

React is an open-source JavaScript library developed by Meta (Facebook) for building user interfaces, especially single-page applications (SPAs). It updates only the changed parts of the UI, which improves performance.

### Main Features

- **Virtual DOM** — efficiently updates the UI without reloading the whole page
- **JSX** — write HTML-like UI code inside JavaScript
- **Component-Based Architecture** — the UI is broken into small, isolated, reusable pieces
- **One-Way Data Binding** — unidirectional data flow, so updates are predictable
- **Hooks** — use state and lifecycle features in function components
- **Declarative UI** — describe what the UI should look like, not how to update it

## Core Concepts

### Virtual DOM

The Virtual DOM is a lightweight, in-memory copy of the actual DOM.

#### How It Works

On state change, React builds a new Virtual DOM tree and, during reconciliation (scheduled by Fiber), diffs it against the previous one to find exactly what changed. Then, in the commit phase, it applies only those minimal changes to the real DOM.

**1. Render Phase (Fiber Architecture)**

React builds a Virtual DOM tree from your component/JSX code. **Fiber** is React's internal reconciliation architecture that lets React schedule, prioritize, pause, and resume rendering work.

**2. Trigger Phase (State/Props Change)**

When state or props change, React does not mutate the existing Virtual DOM — it builds a **brand new** Virtual DOM tree representing the updated UI. At this point there are two trees: the previous one and the new one.

**3. Reconciliation (Diffing Engine)**

- **Reconciliation** = the overall process of comparing the previous and new trees to determine what changed, including figuring out component identity using `key`. It is scheduled and prioritized by Fiber.
- **Diffing** = the algorithm used _within_ reconciliation that compares the two trees node by node to find exactly what changed.

**4. Commit (Real DOM Updates)**

Once React knows what changed, it determines the minimal set of updates and applies only those specific changes to the real DOM, instead of re-rendering the entire UI.

#### Virtual DOM vs Real DOM

| Aspect              | Virtual DOM                                      | Real DOM                                           |
| ------------------- | ------------------------------------------------ | -------------------------------------------------- |
| What it is          | Lightweight JS object copy of the UI             | Actual browser DOM structure                       |
| Update speed        | Fast (in-memory)                                 | Slow (triggers layout / reflow / repaint)          |
| Update process      | Batches changes, then updates only what's needed | Updates immediately, re-renders whole tree section |
| Direct manipulation | Not visible to the user                          | Directly visible to the user                       |
| Cost                | Cheap to create and discard                      | Expensive to manipulate frequently                 |

#### Is the Virtual DOM always faster than direct DOM manipulation?

**No.** Hand-written, targeted DOM updates can beat it. The Virtual DOM's advantage shows up in complex UIs with frequent, unpredictable updates across many elements — and in developer experience, since you describe the result instead of the steps.

#### Does the Virtual DOM eliminate all DOM manipulation?

**No** — it minimizes it, but the final updates still touch the real DOM. It optimizes **how much** and **how often**, not **whether**.

---

### JSX

JSX stands for **JavaScript XML**. It lets you write HTML-like elements directly inside JavaScript.

Browsers cannot read JSX directly — a compiler like **Babel** transpiles it into `React.createElement()` calls (or the modern JSX runtime).

```jsx
const el = <h1 className="title">Hello</h1>;

// becomes roughly:
const el = React.createElement('h1', { className: 'title' }, 'Hello');
```

---

### Functional vs Class Components

**Functional Components**

- Plain JS functions
- Manage state with `useState` and handle lifecycle through `useEffect`
- Simpler to read, easier to test, smaller bundle size

**Class Components**

- ES6 class syntax, rely on the `this` keyword
- Require a `render()` method and separate lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`

---

### Controlled vs Uncontrolled Components

| Controlled                                           | Uncontrolled                            |
| ---------------------------------------------------- | --------------------------------------- |
| Data stored in React state                           | Data stored directly in the DOM         |
| Value read from a state variable                     | Value read via a ref (`useRef`)         |
| Re-renders on every keystroke                        | Renders only when the form is submitted |
| Enables real-time, character-by-character validation | Validation happens at submit time       |

```jsx
// Controlled
const [name, setName] = useState('');
<input value={name} onChange={(e) => setName(e.target.value)} />;

// Uncontrolled
const inputRef = useRef(null);
<input ref={inputRef} defaultValue="" />;
```

---

### Conditional Rendering

Rendering different UI depending on a condition.

```jsx
// if / else
if (loading) return <Spinner />;

// Ternary
{isLoggedIn ? <Dashboard /> : <Login />}

// Logical &&
{hasError && <ErrorMessage />}
```

**Careful with `&&`:** a number like `0` renders as `0` instead of nothing. Use `count > 0 && <List />` rather than `count && <List />`.

---

### State vs Props

| State                                  | Props                                             |
| -------------------------------------- | ------------------------------------------------- |
| Data managed inside a component        | Data passed from parent → child                   |
| Can be updated by the component itself | Read-only (immutable) for the receiving component |

---

### Lifting State Up

Moving local state from child components up to their closest common parent, so multiple children can share, sync, and update the same data.

---

### Prop Drilling

Passing data through multiple components that don't actually need the data themselves.

```text
App
 ↓
Layout
 ↓
Sidebar
 ↓
UserProfile
 ↓
User
```

Solutions:

- Component composition (pass JSX as `children`)
- Context
- State-management libraries
- Better component architecture

**Note:** prop drilling isn't automatically bad. Passing props through one or two levels is often perfectly fine.

---

### Client State vs Server State

| Client State (UI State)                      | Server State (Remote State)                                 |
| -------------------------------------------- | ----------------------------------------------------------- |
| Lives in the UI / browser                    | Lives in the database / backend API                         |
| Synchronous and predictable                  | Asynchronous and unpredictable                              |
| Lost on page refresh                         | Persistent across sessions and devices                      |
| Concerns: scoping, re-renders, prop drilling | Concerns: caching, deduplication, revalidation, concurrency |
| `useState`, Zustand, Redux, Jotai            | TanStack Query, SWR, RTK Query                              |

---

### Persisting State

- Browser storage (`localStorage`, `sessionStorage`)
- Cookies
- IndexedDB
- URL / query params (good for filters and pagination)

---

### What Happens When a Component Re-renders?

1. The component function runs again (or `render()` for class components)
2. React generates a new Virtual DOM tree
3. React diffs it against the previous tree
4. React calculates the minimal set of changes (reconciliation)
5. Only the changed nodes are updated in the real DOM (commit phase)

**A re-render doesn't always mean the real DOM changes.** If the output is identical, React skips the DOM update.

#### Does a state change always update the real DOM?

**No.**

- State change → triggers a re-render (Virtual DOM recalculated)
- The real DOM is updated **only if** diffing detects an actual difference

React also **bails out entirely** if you set state to the same value it already has (compared with `Object.is`), so sometimes not even the re-render happens.

---

## Hooks

### useState

Lets a function component store state.

```jsx
const [count, setCount] = useState(0);
```

For updates based on the previous state, prefer the updater form:

```jsx
setCount((prev) => prev + 1);
```

This matters because state updates are batched — calling `setCount(count + 1)` twice in a row only increments once.

### useEffect

Lets a component synchronize with external systems: API subscriptions, event listeners, timers, browser APIs, WebSocket connections.

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

#### Dependency Array

```jsx
useEffect(() => {
  // after every render
});

useEffect(() => {
  // after the initial mount only
}, []);

useEffect(() => {
  // whenever userId changes
}, [userId]);
```

React compares dependencies between renders and re-runs the effect when one changes.

#### Cleanup

Effects can return a cleanup function.

```jsx
useEffect(() => {
  const handleResize = () => console.log(window.innerWidth);

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

Cleanup runs when:

- The component unmounts
- Before the effect runs again because a dependency changed

It prevents memory leaks, duplicate subscriptions, stray listeners, and timers that keep firing after unmount.

**Note:** in Strict Mode during development, React mounts, unmounts, and remounts components once — so effects run twice. This is intentional, to surface missing cleanup.

### useMemo vs useCallback

```jsx
// useMemo → memoize a VALUE
const expensiveValue = useMemo(() => calculateSomething(data), [data]);

// useCallback → memoize a FUNCTION reference
const handleClick = useCallback(() => doSomething(id), [id]);
```

`useCallback(fn, deps)` is just shorthand for `useMemo(() => fn, deps)`.

### useRef

Stores a mutable value that persists between renders **without** causing a re-render when changed.

```jsx
const inputRef = useRef(null);

<input ref={inputRef} />;

inputRef.current.focus();
```

Unlike state, `ref.current = value` does not trigger a render. Use it for DOM nodes, timer IDs, and previous values.

### useContext

Lets a component consume data from React Context without passing props through every intermediate level.

Common use cases: theme, authentication info, locale, app configuration.

### useReducer

Useful for more complex state transitions.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
```

Think: **State + Action → Reducer → New State**

### Custom Hooks

A reusable function that uses React Hooks to share **stateful logic** between components.

```jsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  // synchronization logic...
  return isOnline;
}
```

Custom hooks share logic, **not state** — each component that calls one gets its own independent state.

---

## Performance

### React.memo

Prevents a component from re-rendering when its props haven't changed, according to a shallow comparison.

```jsx
const UserCard = React.memo(function UserCard({ user }) {
  return <div>{user.name}</div>;
});
```

It can still re-render when:

- Its own state changes
- A consumed context value changes
- Its parent passes a different prop value (a new object or inline function counts as different)

Don't use it everywhere — it's an optimization tool, and the comparison itself has a cost.

### Re-renders and Optimization

A component re-renders when:

- Its state changes
- Its parent renders and passes changed props
- A consumed context value changes

Optimization techniques:

- `React.memo`, `useMemo`, `useCallback`
- Proper component structure
- Avoiding unnecessary state
- Keeping state close to where it's used
- Virtualizing very large lists
- Code splitting
- Avoiding unnecessary effects

**Profile first, then optimize.** Identify the actual bottleneck with React DevTools before adding memoization.

### Code Splitting / Lazy Loading

Loading JavaScript only when it's needed, instead of shipping the whole app up front.

```jsx
const Dashboard = lazy(() => import('./Dashboard'));

<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>;
```

This reduces the initial bundle and improves first load.

---

## Patterns and APIs

### Higher-Order Components (HOC)

A function that takes a component and returns an enhanced component.

```jsx
function withAuth(Component) {
  return function ProtectedComponent(props) {
    if (!isAuthenticated) {
      return <Login />;
    }
    return <Component {...props} />;
  };
}
```

HOCs were common before Hooks. Today most use cases are better handled with custom hooks, composition, or context.

### Component Lifecycle

Three conceptual phases:

- **Mount** — the component is added to the UI
- **Update** — props or state change and React renders again
- **Unmount** — the component is removed from the UI

In function components this is handled with hooks, mainly `useEffect`.

### Event Bubbling

An event triggered on a child propagates upward through its ancestors.

```jsx
<div onClick={() => console.log('parent')}>
  <button onClick={() => console.log('button')}>Click</button>
</div>
```

Clicking the button logs `button` then `parent`. Stop it with:

```jsx
event.stopPropagation();
```

### Context API

Makes data available to a component subtree without passing props through every level.

```jsx
const ThemeContext = createContext('light');

// Provide (React 19+)
<ThemeContext value="dark">
  <App />
</ThemeContext>;

// React 18 and earlier
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>;

// Consume
const theme = useContext(ThemeContext);
```

The Context API is the overall mechanism of creating, providing, and consuming context. `useContext()` is how function components consume it.

**Caveat:** when the context value changes, every consumer re-renders. Split contexts or memoize the value object to limit this.

### Error Boundaries

Catch errors during rendering and show fallback UI instead of crashing the whole tree.

```jsx
<ErrorBoundary fallback={<ErrorPage />}>
  <Dashboard />
</ErrorBoundary>
```

They catch errors in rendering, lifecycle methods, and constructors of descendant components.

They do **not** catch errors in event handlers, async code, or the boundary itself. Error boundaries must be class components (or use a library like `react-error-boundary`).

### Client-Side vs Server-Side Routing

**Client-Side Routing** — navigation happens in the browser without a full page reload.

- Fast navigation
- Preserves client state
- More app-like experience

**Server-Side Routing** — the browser requests a URL from the server.

```text
Browser
   ↓
Server
   ↓
HTML response
```

The server decides what to return for that route.

---

## Interview Questions

### Q2. Why is ReactJS used?
React is used to build fast, interactive UIs with reusable components, predictable one-way data flow, and efficient rendering through Virtual DOM.


### Q6. What are the advantages of ReactJS?
- Fast updates
- Reusable components
- Clean declarative code
- Strong ecosystem and tooling
- Easy integration with other libraries

### Q8. How do lists work in React?
Lists are rendered by mapping arrays to JSX elements. Each item should have a stable unique `key`.

### Q9. Why use keys in lists?
Keys help React track insertions, deletions, and reordering efficiently, preventing incorrect UI updates.


### Q12. What is the use of `render()` in React?
In class components, `render()` returns JSX and defines what appears in the UI.

### Q13. How can you embed multiple components in one?
Compose them in a parent component and return them under one parent wrapper.

### Q15. Explain React Fragments.
Fragments group elements without adding extra DOM nodes.

### Q16. What are forms in ReactJS?
React forms manage user input, usually with controlled components where input values are tied to state.

### Q17. How do you create forms in React?
Use state to control input values, `onChange` to update state, and `onSubmit` to process data.

### Q18. What is state in React?
State is component-local data that changes over time and triggers re-renders when updated.

### Q19. How do you implement state in React?
Use `useState` in functional components or `this.state` and `setState` in class components.

### Q20. How do you update component state?
- Functional: state setter from `useState`
- Class: `this.setState(...)`

### Q21. What are props in React?
Props are read-only inputs passed from parent to child components.

### Q22. How do you pass props between components?
Pass values as JSX attributes in parent and read them via `props` in child.


---

## React.js Interview Questions for Intermediate

### A. Events, Functions, and Syntax

### Q25. What are synthetic events in React?
Cross-browser wrapper objects around native browser events.

### Q26. What is an arrow function and how is it used in React?
A concise function syntax often used for components and event handlers.

### Q27. How do we avoid binding in ReactJS?
Use functional components/hooks or class fields with arrow methods.

### Q28. What do the three dots (`...`) mean in React?
Spread syntax. In JSX, it spreads an object as props.

### B. DOM, Side Effects, and Lifecycle


### Q30. State limitations of React.
React focuses on UI only, so full app architecture often needs additional tools (routing, state, data layers).


### Q32. Common side effects in React components?
Data fetching, subscriptions, timers, DOM operations, analytics, and storage interactions.


### Q35. Lifecycle methods in updating phase (class components)?
`getDerivedStateFromProps`, `shouldComponentUpdate`, `render`, `getSnapshotBeforeUpdate`, `componentDidUpdate`.

### Q36. What is Strict Mode in React?
A development-only helper that surfaces unsafe patterns and side effects.

### C. Hooks and Modern React


### Q38. What are React Hooks?
Functions that let functional components use state, lifecycle, refs, and other React features.

### Q39. Rules of React Hooks?
- Call hooks only at top level.
- Call hooks only in React components or custom hooks.


### Q45. Types of React hooks?
Core hooks include `useState`, `useEffect`, `useContext`, `useRef`, `useMemo`, `useCallback`, `useReducer`, and more advanced concurrent hooks.

---

## React.js Interview Questions for Experienced Professionals

### A. Advanced Component Patterns


### Q47. Functions/uses of higher-order components?
Code reuse, cross-cutting concerns, conditional rendering, and prop enhancement.

### Q48. What is a dispatcher?
In Flux architecture, a central unit that dispatches actions to stores.

### B. Routing and State Management

### Q49. Components of React Router?
`BrowserRouter`, `HashRouter`, `Routes`, `Route`, `Link`, `NavLink`, `Outlet`, and hooks like `useNavigate`, `useParams`, `useLocation`, `useSearchParams`.

### Q50. What is Redux?
A predictable state management library using store, actions, reducers, and immutable updates.

### Q51. Components of Redux?
Store, actions, reducers, dispatch, and subscribers/selectors.

### Q52. What is Flux?
A unidirectional architecture: Action -> Dispatcher -> Store -> View.

### Q53. Redux vs Flux?
Redux simplifies Flux by using one store, pure reducers, and no explicit dispatcher.

### Q54. Context API vs Redux?
Context is lightweight for shared state; Redux is stronger for complex large-scale workflows.

---

## React.js Interview Questions on Advanced Concepts

### A. Architecture, Performance, and Concurrent React

### Q55. React vs React Native?
React targets web UI; React Native uses React concepts to build native mobile apps.

### Q56. React vs Angular?
React is a UI library with flexible tooling; Angular is a full framework with more built-in opinions.


### Q58. How to structure a large-scale React app?
Use feature-based folders, separation of concerns, strong state boundaries, shared UI packages, and code splitting.

### Q59. SSR vs CSR vs React Server Components?
- SSR: HTML generated on server, better SEO and initial load.
- CSR: UI rendered in browser, strong SPA experience.
- RSC: Some components run on server to reduce client bundle and improve performance.


### Q61. Common performance bottlenecks and mitigations?
- Unnecessary re-renders -> memoization
- Large bundles -> code splitting
- Long lists -> virtualization
- Heavy sync work -> offload/chunk tasks

### Q62. How to implement optimistic UI updates, and trade-offs?
Update UI immediately, rollback on error, and refetch to sync. Trade-off: complexity around rollback and conflict handling.

### Q63. React Server Components vs client components?
RSC run on server (lighter client bundles), while client components handle interactivity in the browser.

### Q64. Explain concurrent rendering.
React can prioritize urgent updates and pause/resume lower-priority rendering work.

### Q65. What is `useDeferredValue` and when to use it?
Defers non-urgent updates to keep typing/search UI responsive.

### Q66. How does Suspense work for data fetching and code splitting?
Suspense shows fallback UI while async code/data resolves, then renders the target subtree.


### Q68. How does automatic batching improve performance?
React groups multiple updates in one render cycle, reducing render count and DOM work.

### Q69. What are React Portals and what do they solve?
Portals render outside parent DOM hierarchy, useful for modals/tooltips and z-index/overflow issues.

---

## React State Management Interview Questions (Zustand)

### Q70. What is Zustand and why is it used?
A lightweight React state library for simple global state with low boilerplate.

### Q71. Zustand vs Context API vs Redux?
Zustand offers simpler setup than Redux and finer subscriptions than basic Context in many cases.

### Q72. When should you choose Zustand?
When you need shared state beyond local component scope but want minimal setup and good performance.

---


## Next.js vs React Interview Questions

### Q76. Main difference between React and Next.js?
React is a UI library; Next.js is a React framework with routing, SSR/SSG, APIs, and production features.

### Q77. When should you use Next.js instead of React?
Use Next.js for SEO-sensitive, content-heavy, or full-stack apps requiring SSR/SSG.

---

## React Testing Interview Questions (Jest and React Testing Library)

### Q78. What is Jest and how is it used?
A test runner/framework for unit, integration, mocking, and snapshot testing.

### Q79. What is React Testing Library and why is it preferred?
It tests user-visible behavior rather than implementation details, producing more resilient tests.

### Q80. How does testing improve React application quality?
It catches regressions early, increases confidence in refactors, and stabilizes large codebases.

---

## React TypeScript Interview Questions

### Q81. Why is TypeScript used with React?
It adds static typing, catches errors early, and improves maintainability/team collaboration.

### Q82. How does TypeScript improve component development?
Typed props/state/interfaces create clear contracts and safer refactoring.

### Q83. How does TypeScript work with React hooks?
Type inference and explicit generics help ensure state/action correctness with hooks.

---

## React Security Interview Questions (XSS and Sanitization)

### Q84. How does React protect applications from XSS attacks?
React escapes interpolated JSX content by default.

### Q85. What is `dangerouslySetInnerHTML`, and why is it risky?
It injects raw HTML and can introduce XSS unless content is strictly sanitized.

### Q86. Best practices for securing React apps?
Sanitize untrusted input, avoid raw HTML injection, secure auth flows, and keep dependencies updated.

---

## React System Design Interview Questions (Large Applications)

### Q87. How do you structure a large-scale React app?
Use feature modules, shared packages, strict boundaries, testing, and scalable state architecture.

### Q88. How do you handle performance in large React apps?
Profile first, reduce unnecessary renders, split bundles, virtualize lists, and optimize data/state flow.

### Q89. How do you choose state management for large apps?
Use local state first, Context for light sharing, Zustand for medium complexity, Redux Toolkit for complex workflows.

### Q90. How popular is React compared to other frontend frameworks today?
React remains one of the most adopted frontend technologies in industry hiring and production use, with broad ecosystem support and strong demand.

---

## Quick Revision (TL;DR)

- Learn core React + hooks + reconciliation first.
- Practice forms, routing, memoization, and error boundaries.
- Understand SSR/CSR/RSC and performance optimization.
- Know when to use Context, Zustand, and Redux.
- Write user-focused tests with Jest + React Testing Library.
