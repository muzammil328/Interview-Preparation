---
id: 8-pagination
title: "8. Pagination"
sidebar_label: "8. Pagination"
sidebar_position: 4
description: "8. Pagination — React Machine Coding interview notes."
---
**Requirements:** load one page of users at a time; previous / next buttons; page numbers with "…" for big page counts.

```text
total = 20 pages, current = 10
[‹ Prev]  1  …  9  [10]  11  …  20  [Next ›]
          │  │  └──┬───┘   │  │
       first gap  current±1 gap last
```

```jsx
const PAGE_SIZE = 10;

function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push('…');
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push('…');
  pages.push(total);
  return pages;
}
// getPageNumbers(10, 20) → [1, '…', 9, 10, 11, '…', 20]

function UserPages() {
  const [page, setPage] = useState(1);
  const { data, error, loading } = useFetch(`/api/users?page=${page}&limit=${PAGE_SIZE}`); // 09-react.md Q115
  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 1;

  return (
    <div>
      {loading && <p>Loading…</p>}
      {error && <p role="alert">Couldn't load users.</p>}
      {data && data.items.length === 0 && <p>No users.</p>}
      {data && (
        <ul>
          {data.items.map((u) => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      )}

      <nav aria-label="Pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>‹ Prev</button>
        {getPageNumbers(page, totalPages).map((p, i) =>
          p === '…' ? (
            <span key={`gap-${i}`}>…</span>
          ) : (
            <button key={p} aria-current={p === page ? 'page' : undefined} onClick={() => setPage(p)}>
              {p}
            </button>
          )
        )}
        <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next ›</button>
      </nav>
    </div>
  );
}
```

- The server does the paging (`page` and `limit`), so you never download everything.
- `aria-current="page"` marks the current page for screen readers.

**Follow-ups:** keep the old page visible while the next loads (TanStack Query `placeholderData: keepPreviousData`); store `page` in the URL (`?page=3`) so refresh and sharing work; client-side pagination with `items.slice((page - 1) * size, page * size)`.

---
