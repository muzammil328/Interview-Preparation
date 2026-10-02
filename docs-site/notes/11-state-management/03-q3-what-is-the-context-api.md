---
id: q3-what-is-the-context-api
title: "Q3. What is the Context API?"
sidebar_label: "Q3. What is the Context API?"
sidebar_position: 3
description: "Q3. What is the Context API? — State Management interview notes."
---
Context lets you pass a value deep into the tree **without prop drilling**.

Used for theme, authentication, and other global values that **change rarely**.

```mermaid
flowchart TD
    P["ThemeContext.Provider value='dark'"] --> A["Header"]
    P --> B["Main"]
    A --> C["Button<br/>useContext(ThemeContext) ✓"]
    B --> D["Card<br/>(no context use)"]
    B --> E["Footer<br/>useContext(ThemeContext) ✓"]
```

```jsx
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={theme}>
      <Page />
    </ThemeContext.Provider>
  );
}

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}
```

**Note**: When the Context value changes, **every component that consumes that context** re-renders — even if it only uses one part of the value. Components that don't call `useContext` are not re-rendered by the context itself.

**Tip:** split large contexts (for example `AuthContext` and `ThemeContext` separately) and memoize the value object with `useMemo` to avoid unnecessary re-renders.

![Context API](https://media.geeksforgeeks.org/wp-content/uploads/20250823173319625050/context_api.webp)

---
