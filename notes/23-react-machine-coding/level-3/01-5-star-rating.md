---
id: 5-star-rating
title: "5. Star Rating"
sidebar_label: "5. Star Rating"
sidebar_position: 1
description: "5. Star Rating — React Machine Coding interview notes."
---
**Requirements:** click to set 1–5 stars; hovering previews the rating.

```text
value = 3 (saved)     hover = 0        hover = 5 (mouse on 5th star)
★ ★ ★ ☆ ☆                              ★ ★ ★ ★ ★   preview only
                                       mouse leaves → back to ★ ★ ★ ☆ ☆
shown = hover || value
```

```jsx
function StarRating({ max = 5, value, onChange }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div role="radiogroup" aria-label="Rating" onMouseLeave={() => setHover(0)}>
      {Array.from({ length: max }, (_, i) => {
        const star = i + 1;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
          >
            {star <= shown ? '★' : '☆'}
          </button>
        );
      })}
    </div>
  );
}
```

- The saved value is **controlled** by the parent (`value` + `onChange`); only the temporary hover is local state.
- Buttons make it work with the keyboard and screen readers.

**Follow-ups:** half stars; a read-only mode; clicking the current star again clears the rating.

---
