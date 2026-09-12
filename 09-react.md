# React Interview Questions and Answers

ReactJS is a JS library for building UI using reusable components. It updates only changed UI parts and improves app performance.

### Q2. Why is ReactJS used?
React is used to build fast, interactive UIs with reusable components, predictable one-way data flow, and efficient rendering through Virtual DOM.

### Q3. How does ReactJS work?
React builds a Virtual DOM tree, compares old and new trees using diffing, then applies minimal real DOM updates through reconciliation.

### Q4. What are key features of ReactJS?
- JSX is a syntax extension that lets you write HTML-like UI code in JavaScript. 
- Virtual DOM: A lightweight copy of the real DOM that tracks changes.
- Component-based architecture:
- One-way Data Binding: Ensures predictable UI updates by passing data from parent to child via props.
- Hooks
- Declarative UI

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

### Q11. What are components in React?
Components are reusable UI building blocks with their own logic and rendering behavior. You can create components as functional components (preferred) or class components. Functional components are simpler and use hooks. Class components rely on lifecycle methods and `this`.

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

### Q23. Difference between state and props?
- State is mutable and owned by the component.
- Props are immutable and passed from parent.

### Q24. What is lifting state up?
Move shared state to the nearest common parent so sibling components stay synchronized.

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

### Q29. Real DOM vs Virtual DOM?
Real DOM updates are heavier; Virtual DOM enables minimal updates for better performance.

### Q30. State limitations of React.
React focuses on UI only, so full app architecture often needs additional tools (routing, state, data layers).

### Q31. Controlled vs uncontrolled components?
Controlled components are state-driven; uncontrolled components store values in the DOM (usually with refs).

### Q32. Common side effects in React components?
Data fetching, subscriptions, timers, DOM operations, analytics, and storage interactions.

### Q33. Lifecycle steps in React.
Mounting, Updating, and Unmounting.

### Q34. What are Error Boundaries?
Components that catch render/lifecycle errors in child trees and show fallback UI.

### Q35. Lifecycle methods in updating phase (class components)?
`getDerivedStateFromProps`, `shouldComponentUpdate`, `render`, `getSnapshotBeforeUpdate`, `componentDidUpdate`.

### Q36. What is Strict Mode in React?
A development-only helper that surfaces unsafe patterns and side effects.

### C. Hooks and Modern React

### Q37. What are custom hooks?
Reusable functions that encapsulate stateful React logic and start with `use`.

### Q38. What are React Hooks?
Functions that let functional components use state, lifecycle, refs, and other React features.

### Q39. Rules of React Hooks?
- Call hooks only at top level.
- Call hooks only in React components or custom hooks.

### Q40. What is `useState`?
Hook for local state in functional components.

### Q41. What is `useEffect`?
Hook for side effects after render; supports cleanup.

### Q42. What is memoization in React?
Caching results or component renders to avoid unnecessary work (`React.memo`, `useMemo`, `useCallback`).

### Q43. What is prop drilling and how to avoid it?
Passing props through many levels unnecessarily; avoid with Context, composition, or state libraries.

### Q44. When should you use `useMemo()`?
When expensive calculations or derived values should only recompute on dependency change.

### Q45. Types of React hooks?
Core hooks include `useState`, `useEffect`, `useContext`, `useRef`, `useMemo`, `useCallback`, `useReducer`, and more advanced concurrent hooks.

---

## React.js Interview Questions for Experienced Professionals

### A. Advanced Component Patterns

### Q46. What is a higher-order component (HOC)?
A function that takes a component and returns an enhanced component for logic reuse.

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

### Q57. Explain React Fiber.
Fiber is React's modern reconciliation engine that supports priority-based and interruptible rendering.

### Q58. How to structure a large-scale React app?
Use feature-based folders, separation of concerns, strong state boundaries, shared UI packages, and code splitting.

### Q59. SSR vs CSR vs React Server Components?
- SSR: HTML generated on server, better SEO and initial load.
- CSR: UI rendered in browser, strong SPA experience.
- RSC: Some components run on server to reduce client bundle and improve performance.

### Q60. What is lazy loading in React and how to implement it?
Load components on demand using `React.lazy` with `Suspense` fallback.

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

### Q67. `useMemo` vs `useCallback`?
- `useMemo` memoizes values.
- `useCallback` memoizes function references.

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

## React Rendering and Reconciliation Interview Questions

### Q73. What is rendering in React?
Transforming component logic into UI output and updating when state/props/context change.

### Q74. What is reconciliation in React?
Diffing previous and next virtual trees to compute minimal real DOM updates.

### Q75. Why are keys important in React lists?
Keys provide stable identity so React can reconcile list changes correctly.

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
