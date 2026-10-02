---
id: 9-infinite-scroll
title: "9. Infinite Scroll"
sidebar_label: "9. Infinite Scroll"
sidebar_position: 5
description: "9. Infinite Scroll — React Machine Coding interview notes."
---
**Requirements:** load more posts when the user nears the bottom; stop when there are no more; show loading and errors with a retry.

```text
┌──────────────────────┐
│ post 1               │
│ post 2               │
│ ...                  │
│ post 20              │
│ ░░ sentinel div ░░   │ ◄── IntersectionObserver watches this
└──────────────────────┘
sentinel visible (200px early) ─► page + 1 ─► fetch ─► append 20 more posts
hasMore = false ─► stop watching, show "You're all caught up"
```

```jsx
function InfiniteFeed() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const sentinelRef = useRef(null);

  // Fetch the current page
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetch(`/api/posts?page=${page}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setItems((prev) => [...prev, ...data.items]);
        setHasMore(data.hasMore);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, [page, attempt]);

  // Watch the sentinel only when we are ready to load more
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore || loading || error) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPage((p) => p + 1);
      },
      { rootMargin: '200px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loading, error]);

  return (
    <div>
      <ul>
        {items.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      {loading && <p>Loading…</p>}
      {error && (
        <p role="alert">
          Couldn't load more. <button onClick={() => setAttempt((a) => a + 1)}>Retry</button>
        </p>
      )}
      {!hasMore && <p>You're all caught up.</p>}
      <div ref={sentinelRef} />
    </div>
  );
}
```

- **IntersectionObserver** instead of a `scroll` listener: no work on every scroll event.
- The observer is not attached while loading, so one scroll can't trigger the same page twice.
- The abort in cleanup also makes it safe under StrictMode's double-run of effects in development.

**Follow-ups:** virtualize the list once it gets very long (`09-react.md` Q105); restore the scroll position when navigating back.

---
