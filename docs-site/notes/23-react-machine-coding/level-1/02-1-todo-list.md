---
id: 1-todo-list
title: "1. Todo List"
sidebar_label: "1. Todo List"
sidebar_position: 2
description: "1. Todo List — React Machine Coding interview notes."
---
**Requirements:** add a task, mark it done, delete it, filter by all / active / done, show how many are left.

```text
State (minimal)                      Derived (computed in render, NOT state)
todos:  [{ id, text, done }]          visibleTodos = todos filtered by filter
text:   ''        (input)             remaining    = todos where !done
filter: 'all' | 'active' | 'done'
```

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text: trimmed, done: false }]);
    setText('');
  }

  function toggle(id) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function remove(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  const visible = todos.filter((t) =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  );
  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">New task</label>
        <input id="new-todo" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <div role="group" aria-label="Filter tasks">
        {['all', 'active', 'done'].map((f) => (
          <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p>No tasks here.</p>
      ) : (
        <ul>
          {visible.map((t) => (
            <li key={t.id}>
              <label>
                <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
                {t.text}
              </label>
              <button onClick={() => remove(t.id)} aria-label={`Delete ${t.text}`}>✕</button>
            </li>
          ))}
        </ul>
      )}
      <p>{remaining} left</p>
    </div>
  );
}
```

**Points that score well:**

- Immutable updates (`map` / `filter` / spread), never `push` or mutate.
- A stable `id` as the key, not the index (items get deleted and filtered).
- `remaining` and `visible` are **derived**, not stored in state.
- Using a `<form>` means pressing Enter works for free.

**Follow-ups:** edit a task inline; persist to `localStorage` (use `useLocalStorage` from `09-react.md` Q116); "clear completed" button.

---
