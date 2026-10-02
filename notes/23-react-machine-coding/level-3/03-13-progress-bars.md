---
id: 13-progress-bars
title: "13. Progress Bars"
sidebar_label: "13. Progress Bars"
sidebar_position: 3
description: "13. Progress Bars — React Machine Coding interview notes."
---
**Requirements:** a reusable progress bar; an "Add" button that adds a new bar which fills from 0 to 100% in 2 seconds.

```text
[Add]
bar 1  ████████████████████ 100%
bar 2  ███████████░░░░░░░░░  55%
bar 3  ██░░░░░░░░░░░░░░░░░░  10%   each bar animates on its own
```

```jsx
function ProgressBar({ value }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="track"
    >
      <div className="fill" style={{ width: `${clamped}%` }} />
    </div>
  );
}

function FillingBar({ duration = 2000 }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame;
    function tick(now) {
      const pct = Math.min(100, ((now - start) / duration) * 100);
      setProgress(pct);
      if (pct < 100) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration]);

  return <ProgressBar value={progress} />;
}

function ProgressBars() {
  const [bars, setBars] = useState([]);
  return (
    <div>
      <button onClick={() => setBars((b) => [...b, crypto.randomUUID()])}>Add</button>
      {bars.map((id) => (
        <FillingBar key={id} />
      ))}
    </div>
  );
}
```

- Each bar owns its own animation state, so bars don't affect each other.
- `requestAnimationFrame` gives smooth updates and the cleanup cancels it on unmount.
- Clamping protects against values below 0 or above 100.

**Follow-up (often asked next):** "only 3 bars may fill at the same time; the rest wait in a queue." Keep the list of bars in the parent with a `status` per bar, and start the next waiting bar when one finishes.

---
