---
id: custom-hooks-asked-in-live-coding
title: "Custom Hooks Asked in Live Coding"
sidebar_label: "Custom Hooks Asked in Live Coding"
sidebar_position: 6
description: "Custom Hooks Asked in Live Coding — React interview notes."
---
### Q114. Write `useDebounce`

```jsx
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);           // new keystroke cancels the old timer
  }, [value, delay]);

  return debounced;
}

// Usage
const [query, setQuery] = useState('');
const debouncedQuery = useDebounce(query, 400);
useEffect(() => {
  if (debouncedQuery) searchApi(debouncedQuery);
}, [debouncedQuery]);
```

```text
query:      r   re  rea reac react ........(400ms quiet)
timer:      ✗   ✗   ✗   ✗    ⏱────────────► debounced = "react" → 1 API call
            each change clears the previous timer (cleanup)
```

---

### Q115. Write `useFetch` (with loading, error, and abort)

```jsx
function useFetch(url) {
  const [state, setState] = useState({ data: null, error: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, error: null, loading: true });

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ data: null, error, loading: false });
        }
      });

    return () => controller.abort();          // url changed or unmounted
  }, [url]);

  return state;
}
```

```text
url = /users/1 ─► fetch A started
url = /users/2 ─► cleanup: abort A ✗   fetch B started
B resolves     ─► data for user 2 ✓   (A can never overwrite it)
```

Follow-ups interviewers ask: "`fetch` doesn't reject on 404 — how do you handle it?" (check `res.ok`), and "how would you add caching?" (a Map keyed by URL, or use TanStack Query).

---

### Q116. Write `useLocalStorage`

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;          // storage blocked or bad JSON
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or blocked — keep working in memory
    }
  }, [key, value]);

  return [value, setValue];
}

// Usage — same API as useState
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

```text
first render ─► lazy init: read localStorage "theme" → 'dark'   (only once)
setTheme('light') ─► state = 'light' ─► effect writes localStorage
page refresh ─► reads 'light' ✓ persisted
```

The **lazy initializer** `useState(() => ...)` matters: reading storage on every render would be wasted work.

---

### Q117. Write `usePrevious`

```jsx
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;      // runs AFTER render, so during render ref holds the old value
  }, [value]);
  return ref.current;
}

// Usage
const prevCount = usePrevious(count);   // count = 5, prevCount = 4
```

```text
render (count = 5)  return ref.current → 4   ─► commit ─► effect: ref.current = 5
render (count = 6)  return ref.current → 5   ─► commit ─► effect: ref.current = 6
```

Good answer to mention: the React docs prefer storing the previous value in **state** when you need to react to a change, because reading refs during render can be unreliable in concurrent rendering. This ref version is still the one most interviewers expect.

---

### Q118. Write `useOnClickOutside` (close a dropdown/modal)

```jsx
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    function listener(event) {
      if (!ref.current || ref.current.contains(event.target)) return; // click inside
      handler(event);
    }
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// Usage
const menuRef = useRef(null);
useOnClickOutside(menuRef, () => setOpen(false));
```

```text
document ──listens for mousedown──┐
 ┌───────────────────────────┐    │
 │  <div ref={menuRef}> menu │ ◄──┼─ click inside → contains(target) = true → ignore
 └───────────────────────────┘    │
   click anywhere else ───────────┘─► handler() → close menu
```

Pass a stable `handler` (wrap it in `useCallback`), or the listener is re-attached every render.

---
