---
id: 3-tabs
title: "3. Tabs"
sidebar_label: "3. Tabs"
sidebar_position: 2
description: "3. Tabs — React Machine Coding interview notes."
---
**Requirements:** show one panel at a time; arrow keys move between tabs.

```text
┌───────┬────────┬─────────┐
│ Home* │ Profile│ Settings│   ← role="tablist", ←/→ moves focus + selection
├───────┴────────┴─────────┘
│ Home panel content        │   ← role="tabpanel", only the active one rendered
└───────────────────────────┘
active = 'home'
```

```jsx
function Tabs({ tabs }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const tabRefs = useRef({});

  function handleKeyDown(e, index) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const step = e.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(index + step + tabs.length) % tabs.length];
    setActive(next.id);
    tabRefs.current[next.id]?.focus();
  }

  const current = tabs.find((t) => t.id === active);

  return (
    <div>
      <div role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[tab.id] = el;
            }}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={tab.id === active}
            aria-controls={`panel-${tab.id}`}
            tabIndex={tab.id === active ? 0 : -1}
            onClick={() => setActive(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {current && (
        <div role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`}>
          {current.content}
        </div>
      )}
    </div>
  );
}
```

- `(index + step + length) % length` wraps around at both ends.
- Only the active tab is in the Tab order (`tabIndex 0`); arrows move between tabs — the standard keyboard pattern.

**Follow-up:** keep inactive panels mounted (to preserve their state) by rendering all panels with `hidden` instead of only the active one.

---
