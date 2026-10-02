---
id: 4-modal-dialog
title: "4. Modal Dialog"
sidebar_label: "4. Modal Dialog"
sidebar_position: 3
description: "4. Modal Dialog — React Machine Coding interview notes."
---
**Requirements:** open/close, close on Escape and on backdrop click, don't scroll the page behind it, move focus into the modal.

```text
document.body
 ├─ #root  (your app)                  page scroll locked while open
 └─ portal ──► ┌──────── backdrop (click → close) ────────┐
               │      ┌──── dialog (click → ignored) ──┐   │
               │      │  Title                          │   │
               │      │  content          [Close]       │   │
               │      └─────────────────────────────────┘   │
               └────────────────────────────────────────────┘
               Escape key → close
```

```jsx
function Modal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title">{title}</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}
```

- **Portal** so the modal is not clipped by a parent's `overflow: hidden` or `z-index`.
- `stopPropagation` on the dialog stops inside clicks from reaching the backdrop.
- The cleanup restores the scroll lock and removes the listener.

**Follow-ups:** trap Tab focus inside the modal; return focus to the button that opened it. Mention that the native `<dialog>` element with `showModal()` gives Escape handling, focus trapping, and a backdrop for free.

---
