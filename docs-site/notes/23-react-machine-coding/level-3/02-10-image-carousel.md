---
id: 10-image-carousel
title: "10. Image Carousel"
sidebar_label: "10. Image Carousel"
sidebar_position: 2
description: "10. Image Carousel — React Machine Coding interview notes."
---
**Requirements:** next / previous buttons that wrap around, dots to jump to a slide, autoplay that pauses on hover.

```text
images: [A, B, C, D]      index = 3 (D)
Next  → (3 + 1) % 4 = 0  → A        wraps to the start
Prev  → (0 - 1 + 4) % 4 = 3 → D     wraps to the end
dots:  ○ ○ ○ ●
```

```jsx
function Carousel({ images, interval = 3000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [paused, next, interval, count]);

  if (count === 0) return <p>No images.</p>;

  return (
    <div
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <img src={images[index].src} alt={images[index].alt} />
      <button onClick={prev} aria-label="Previous slide">‹</button>
      <button onClick={next} aria-label="Next slide">›</button>
      <div>
        {images.map((img, i) => (
          <button
            key={img.src}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
          >
            {i === index ? '●' : '○'}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- Hooks are all called **before** the early `return` — required by the Rules of Hooks.
- The interval is cleared on cleanup, so pausing or unmounting doesn't leak timers.

**Follow-ups:** swipe on mobile (touch start/end X difference); preload the next image; respect `prefers-reduced-motion` by turning autoplay off.

---
