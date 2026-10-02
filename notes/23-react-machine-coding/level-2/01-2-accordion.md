---
id: 2-accordion
title: "2. Accordion"
sidebar_label: "2. Accordion"
sidebar_position: 1
description: "2. Accordion — React Machine Coding interview notes."
---
**Requirements:** clicking a header opens its panel. Support "only one open" and "many open" modes.

```text
allowMultiple = false              allowMultiple = true
openIds = [2]                      openIds = [1, 3]
▸ Section 1                        ▾ Section 1
▾ Section 2                          content 1
  content 2                        ▸ Section 2
▸ Section 3                        ▾ Section 3
                                     content 3
click Section 3 → openIds = [3]    click Section 1 → openIds = [3]
```

```jsx
function Accordion({ items, allowMultiple = false }) {
  const [openIds, setOpenIds] = useState([]);

  function toggle(id) {
    setOpenIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : allowMultiple
          ? [...prev, id]
          : [id]
    );
  }

  return (
    <div>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id}>
            <h3>
              <button
                aria-expanded={isOpen}
                aria-controls={`panel-${item.id}`}
                onClick={() => toggle(item.id)}
              >
                {item.title} {isOpen ? '−' : '+'}
              </button>
            </h3>
            <div id={`panel-${item.id}`} role="region" hidden={!isOpen}>
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

- Headers are real `<button>`s, so Enter and Space work, and `aria-expanded` tells screen readers the state.
- Storing **ids** of open items (not booleans on each item) keeps both modes to one line of logic.

**Follow-ups:** animate the height; open the first section by default (`useState([items[0]?.id])`).

---
