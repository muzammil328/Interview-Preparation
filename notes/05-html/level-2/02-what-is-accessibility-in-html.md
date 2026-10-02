---
id: what-is-accessibility-in-html
title: "What is Accessibility in HTML?"
sidebar_label: "What is Accessibility in HTML?"
sidebar_position: 2
description: "What is Accessibility in HTML? — HTML interview notes."
---
Accessibility (a11y) means creating websites that can be used by everyone, including users with disabilities (screen readers, keyboard-only users, low vision).

### Accessibility Practices:

- Use semantic HTML (`<button>`, not a clickable `<div>`).
- Add meaningful `alt` attributes (`alt=""` for decorative images).
- Use `<label>` for every form input.
- Support keyboard navigation (Tab, Enter, Space) with a visible focus style.
- Maintain proper heading structure (`h1` → `h2` → `h3`, no skipping).
- Use ARIA only when no native element does the job.

```text
Page ──► Browser builds Accessibility Tree ──► Screen reader speaks it

<button>Save</button>         →  "Save, button"          ✓
<div onclick="save()">Save</div> →  "Save"  (not focusable) ✗
<img src="cat.jpg" alt="Sleeping cat"> → "Sleeping cat, image" ✓
<img src="cat.jpg">           →  "cat.jpg, image"        ✗
```

Example:

```html
<img src="profile.jpg" alt="User profile image">

<label for="email">Email</label>
<input id="email" type="email">

<button aria-label="Close dialog">✕</button>
```

### What is ARIA?

**ARIA** (Accessible Rich Internet Applications) attributes add meaning that HTML alone cannot express:

- `aria-label` — gives a name to an element with no visible text (icon buttons).
- `aria-hidden="true"` — hides decorative elements from screen readers.
- `aria-expanded` — tells whether a menu/accordion is open.
- `role` — e.g. `role="dialog"`, `role="alert"`.

**First rule of ARIA:** if a native HTML element exists, use it instead of ARIA.

---
