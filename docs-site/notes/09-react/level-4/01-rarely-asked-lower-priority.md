---
id: rarely-asked-lower-priority
title: "Rarely Asked (Lower Priority)"
sidebar_label: "Rarely Asked (Lower Priority)"
sidebar_position: 1
description: "Rarely Asked (Lower Priority) — React interview notes."
---
## Q8. How do lists work in React?
Lists are rendered by mapping arrays to JSX elements. Each item should have a stable unique `key`. (Covered in [Lists and Keys](../level-1/11-lists-and-keys.md).)

## Q9. Why use keys in lists?
Keys help React track insertions, deletions, and reordering efficiently, preventing incorrect UI updates. (Covered in [Lists and Keys](../level-1/11-lists-and-keys.md).)

## Q12. What is the use of `render()` in React?
In class components, `render()` returns JSX and defines what appears in the UI.

## Q13. How can you embed multiple components in one?
Compose them in a parent component and return them under one parent wrapper.

## Q16. What are forms in ReactJS?
React forms manage user input, usually with controlled components where input values are tied to state.

## Q17. How do you create forms in React?
Use state to control input values, `onChange` to update state, and `onSubmit` to process data.

## Q19. How do you implement state in React?
Use `useState` in functional components or `this.state` and `setState` in class components.

## Q20. How do you update component state?
- Functional: state setter from `useState`
- Class: `this.setState(...)`

## Q22. How do you pass props between components?
Pass values as JSX attributes in parent and read them via `props` in child.

## Q25. What are synthetic events in React?
Cross-browser wrapper objects around native browser events.

## Q26. What is an arrow function and how is it used in React?
A concise function syntax often used for components and event handlers.

## Q27. How do we avoid binding in ReactJS?
Use functional components/hooks or class fields with arrow methods.

## Q28. What do the three dots (`...`) mean in React?
Spread syntax. In JSX, it spreads an object as props.

## Q30. State limitations of React.
React focuses on UI only, so full app architecture often needs additional tools (routing, state, data layers).

## Q35. Lifecycle methods in updating phase (class components)?
`getDerivedStateFromProps`, `shouldComponentUpdate`, `render`, `getSnapshotBeforeUpdate`, `componentDidUpdate`.

## Q38. What are React Hooks?
Functions that let functional components use state, lifecycle, refs, and other React features. (Covered in [Hooks](../level-1/19-hooks-and-rules-of-hooks.md).)

## Q39. Rules of React Hooks?
- Call hooks only at top level.
- Call hooks only in React components or custom hooks.

(Covered with a diagram in [Hooks](../level-1/19-hooks-and-rules-of-hooks.md).)

## Q47. Functions/uses of higher-order components?
Code reuse, cross-cutting concerns, conditional rendering, and prop enhancement.

## Q48. What is a dispatcher?
In Flux architecture, a central unit that dispatches actions to stores.

## Q52. What is Flux?
A unidirectional architecture: Action -> Dispatcher -> Store -> View.

## Q53. Redux vs Flux?
Redux simplifies Flux by using one store, pure reducers, and no explicit dispatcher.

## Q55. React vs React Native?
React targets web UI; React Native uses React concepts to build native mobile apps.

## Q56. React vs Angular?
React is a UI library with flexible tooling; Angular is a full framework with more built-in opinions.

## Q58. How to structure a large-scale React app?
Use feature-based folders, separation of concerns, strong state boundaries, shared UI packages, and code splitting. (Covered in Q87.)

## Q80. How does testing improve React application quality?
It catches regressions early, increases confidence in refactors, and stabilizes large codebases.

## Q82. How does TypeScript improve component development?
Typed props/state/interfaces create clear contracts and safer refactoring.

## Q83. How does TypeScript work with React hooks?
Type inference and explicit generics help ensure state/action correctness with hooks.

## Q90. How popular is React compared to other frontend frameworks today?
React remains one of the most adopted frontend technologies in industry hiring and production use, with broad ecosystem support and strong demand.
