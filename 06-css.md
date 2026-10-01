# CSS Interview Preparation

## What is CSS?

CSS (**Cascading Style Sheets**) is used to style and layout HTML elements. It controls the appearance, spacing, colors, fonts, and responsiveness of web pages.

```text
selector   property   value
   │          │         │
   p    {   color   :  blue;   }
        └────── declaration ──┘
└─────────────── rule ─────────┘
```

---

# What are the Ways to Add CSS?

There are three ways to add CSS:

## 1. Inline CSS

CSS is written directly inside the HTML element.

```html
<h1 style="color: blue;">Hello World</h1>
```

## 2. Internal CSS

CSS is written inside the `<style>` tag.

```html
<style>
  h1 {
    color: blue;
  }
</style>
```

## 3. External CSS

CSS is written in a separate `.css` file. Best for real projects — one file is cached and reused by every page.

```html
<link rel="stylesheet" href="style.css">
```

```text
Priority when they conflict (same selector):

Inline  >  Internal / External
                │
                └── between these two, whichever comes LATER wins
```

---

# What is CSS Specificity?

When two rules target the same element, the browser uses **specificity** to pick the winner. Each selector gets a score `(IDs, Classes, Elements)`.

| Selector type | Score | Example |
|---|---|---|
| Inline style | wins over all selectors | `style="..."` |
| ID | (1, 0, 0) | `#header` |
| Class, attribute, pseudo-class | (0, 1, 0) | `.btn`, `[type="text"]`, `:hover` |
| Element, pseudo-element | (0, 0, 1) | `p`, `::before` |
| Universal `*` | (0, 0, 0) | `*` |

```text
          IDs  Classes  Elements
p           0      0       1
.btn        0      1       0
p.btn       0      1       1
#nav .link  1      1       0      ← highest, wins

Compare left to right like a version number:
(1,0,0) beats (0,10,0) — one ID beats any number of classes.
```

```css
p          { color: red;   } /* (0,0,1) */
.text      { color: blue;  } /* (0,1,0) ← wins */
```

**Order of decision:**

```text
!important ──► Inline style ──► Specificity ──► Source order (last one wins)
```

---

# What is `!important`?

`!important` makes a declaration win over every normal declaration, regardless of specificity.

Example:

```css
p {
  color: red !important;
}
```

```text
#main p { color: blue; }        ← higher specificity
p       { color: red !important; } ← still wins
```

### Note:

Use `!important` carefully because it can make CSS harder to maintain. The only way to beat it is another `!important` with higher specificity.

---

# Difference Between `display: none` and `visibility: hidden`

| `display: none` | `visibility: hidden` | `opacity: 0` |
|---|---|---|
| Removes the element completely from the layout. | Hides the element but keeps its space. | Invisible but keeps space. |
| Element takes zero space. | Element still occupies space. | Element still occupies space. |
| Other elements move into its place. | Other elements do not move. | Other elements do not move. |
| Not clickable. | Not clickable. | **Still clickable.** |

```text
Original:            [ A ][ B ][ C ]
B display:none:      [ A ][ C ]          ← C moves left
B visibility:hidden: [ A ][   ][ C ]     ← gap stays
B opacity:0:         [ A ][   ][ C ]     ← gap stays, B still clickable
```

Example:

```css
.hidden {
  display: none;
}

.invisible {
  visibility: hidden;
}
```

---

# Difference Between CSS Positions

| Position | Description |
|---|---|
| `static` | Default position in normal document flow. `top/left` have no effect. |
| `relative` | Moves relative to its normal position; its original space is kept. |
| `absolute` | Removed from flow; positioned relative to the nearest positioned (non-static) ancestor. |
| `fixed` | Positioned relative to the viewport and stays fixed while scrolling. |
| `sticky` | Works like relative until a scroll threshold, then behaves like fixed (inside its parent). |

```text
relative                   absolute
┌───────────────────┐      ┌── parent (position: relative) ──┐
│ [A]               │      │                       ┌───────┐ │
│    ┌───┐          │      │                       │ child │ │ top:0; right:0
│    │ B │ moved    │      │                       └───────┘ │
│  ┌ ┴ ─ ┘ ┐        │      │ other content flows as if       │
│    gap kept       │      │ child does not exist            │
│  └ ─ ─ ─ ┘        │      └─────────────────────────────────┘
└───────────────────┘

fixed                       sticky
┌── viewport ──┐            ┌── viewport ──┐
│ [ navbar ]   │ ← stays    │ [ header ]   │ ← scrolls normally, then
│  content ↑   │   while    │  content ↑   │   sticks at top: 0
│  scrolls     │   page     │              │
└──────────────┘   scrolls  └──────────────┘
```

Example:

```css
.box {
  position: relative;
}

.child {
  position: absolute;
  top: 0;
  right: 0;
}
```

**Gotcha:** `fixed` becomes relative to an ancestor instead of the viewport if that ancestor has `transform`, `filter`, or `perspective` set.

---

# Explain the CSS Box Model

Every HTML element is a rectangular box made of four layers:

1. **Content** — text, image
2. **Padding** — space inside the border
3. **Border** — line around the padding
4. **Margin** — space outside the border, between elements

Diagram:

```text
+-----------------------+
|        Margin         |
|  +-----------------+  |
|  |     Border      |  |
|  | +-------------+ |  |
|  | |  Padding    | |  |
|  | | +---------+ | |  |
|  | | | Content | | |  |
|  | | +---------+ | |  |
|  | +-------------+ |  |
|  +-----------------+  |
+-----------------------+
```

**Margin collapse:** the vertical margins of two block elements touching each other merge into the larger one (`20px` + `30px` → `30px`, not `50px`). This does not happen in flex or grid containers.

---

# What is `box-sizing: border-box`?

`box-sizing: border-box` includes padding and border inside the defined width and height.

## content-box (Default)

```text
Total Width = width + padding + border
```

## border-box

```text
Total Width = width
```

Example:

```css
.box {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
}
```

```text
width: 300px; padding: 20px; border: 5px

content-box:                      border-box:
|5|20|──── 300 ────|20|5|          |5|20|── 250 ──|20|5|
└──────── 350px ────────┘          └────── 300px ──────┘
 box grows                          box stays 300px,
                                    content shrinks
```

Common reset:

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

---

# CSS Units

CSS units are divided into two categories:

## Relative Units

Adapt according to context.

| Unit | Description |
|---|---|
| `em` | Relative to the element's own font size (for `font-size` itself, relative to the parent's). |
| `rem` | Relative to root (`html`) font size. |
| `%` | Relative to the parent / containing block (depends on property). |
| `vw` | 1% of viewport width. |
| `vh` | 1% of viewport height. |

```text
html { font-size: 16px }
 └── .parent { font-size: 20px }
       └── .child
             font-size: 2em   → 40px  (2 × parent 20px)
             font-size: 2rem  → 32px  (2 × root 16px)

em compounds when nested:
1.5em inside 1.5em inside 16px = 16 × 1.5 × 1.5 = 36px
rem never compounds → predictable
```

**When to use:** `rem` for font sizes and spacing, `%` / `fr` for layout widths, `vw/vh` for full-screen sections, `px` for borders.

## Absolute Units

Fixed size units.

Examples:

- `px`
- `cm`
- `mm`
- `in`

---

# Flexbox vs Grid

| Flexbox | Grid |
|---|---|
| One-dimensional layout system. | Two-dimensional layout system. |
| Works with rows OR columns. | Works with rows AND columns. |
| Content-first: items decide their size. | Layout-first: the grid decides where items go. |
| Example: Navbar, button groups. | Example: Dashboard layouts, page layouts. |

```text
Flexbox (one direction)              Grid (two directions)
main axis ───────────────►          ┌──────┬──────┬──────┐
┌─────┐┌─────────┐┌───┐             │  1   │  2   │  3   │
│  1  ││    2    ││ 3 │  ↕ cross    ├──────┼──────┼──────┤
└─────┘└─────────┘└───┘    axis     │  4   │  5   │  6   │
                                    └──────┴──────┴──────┘
justify-content → main axis          grid-template-columns
align-items     → cross axis         grid-template-rows
```

Example:

### Flexbox

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### Grid

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
```

**Tip:** they work well together — Grid for the page, Flexbox inside each card.

---

# How Do You Center a div?

The most common practical CSS question.

```css
/* 1. Flexbox (most common) */
.parent {
  display: flex;
  justify-content: center; /* horizontal */
  align-items: center;     /* vertical */
}

/* 2. Grid (shortest) */
.parent {
  display: grid;
  place-items: center;
}

/* 3. Absolute + transform */
.parent { position: relative; }
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 4. Horizontal only (block with width) */
.child {
  width: 300px;
  margin: 0 auto;
}
```

```text
Absolute + transform explained:

top:50%; left:50%              translate(-50%, -50%)
┌──────────────────┐           ┌──────────────────┐
│                  │           │                  │
│         ┌─────┐  │           │      ┌─────┐     │
│         │child│  │   ──►     │      │child│     │
│         └─────┘  │           │      └─────┘     │
│                  │           │                  │
└──────────────────┘           └──────────────────┘
 top-left corner is             child moved back by half
 at the center                  its own size → truly centered
```

---

# What is z-index and Stacking Context?

`z-index` controls which element appears on top when elements overlap. Higher values appear above lower values.

It only works on **positioned** elements (`relative`, `absolute`, `fixed`, `sticky`) and on **flex/grid items**.

Example:

```css
.modal {
  position: fixed;
  z-index: 1000;
}
```

### Stacking Context

A **stacking context** is a group whose children are stacked only inside it. A child can never escape its parent's layer, no matter how high its `z-index`.

Created by: `position` + `z-index` (not auto), `opacity < 1`, `transform`, `filter`, `position: fixed/sticky`, and others.

```text
<div A  z-index: 1>            <div B  z-index: 2>
   └── child  z-index: 9999

Result (top to bottom):
┌──────────── B (2) ────────────┐  ← on top
└───────────────────────────────┘
┌──────────── A (1) ────────────┐
│   child 9999 is stuck INSIDE  │  ← 9999 only counts inside A
└───────────────────────────────┘
```

**Classic bug:** "My modal has `z-index: 9999` but appears behind the header" → a parent created a stacking context with a lower `z-index`.

---

# Pseudo-classes vs Pseudo-elements

| Pseudo-class | Pseudo-element |
|---|---|
| Selects an element in a certain **state**. | Styles a specific **part** of an element. |
| Uses single colon `:`. | Uses double colon `::` (single `:` still works for old ones). |
| Examples: `:hover`, `:focus`, `:nth-child()` | Examples: `::before`, `::after`, `::first-letter`, `::placeholder` |

```text
Pseudo-class (state)           Pseudo-element (part)
┌────────────┐                 ┌──────────────────────────┐
│  Button    │ ← :hover        │ ::before  Text  ::after  │
└────────────┘   when mouse    │ ▲                        │
                 is over it    │ ::first-letter           │
                               └──────────────────────────┘
```

Example:

```css
button:hover {
  background: blue;
}

p::first-letter {
  font-size: 30px;
}

.required::after {
  content: " *";
  color: red;
}
```

`::before` and `::after` need the `content` property, or they do not render.

---

# What is Responsive Design?

Responsive design means creating layouts that adapt to different screen sizes and devices.

```text
Desktop                    Tablet              Mobile
┌──────┬──────┬──────┐     ┌──────┬──────┐     ┌──────┐
│  1   │  2   │  3   │     │  1   │  2   │     │  1   │
└──────┴──────┴──────┘     ├──────┼──────┘     ├──────┤
                           │  3   │            │  2   │
                           └──────┘            ├──────┤
                                               │  3   │
                                               └──────┘
```

Techniques:

- Viewport meta tag
- Flexible layouts (flex, grid, `%`, `fr`)
- Media queries
- Relative units
- Responsive images (`max-width: 100%`, `srcset`)

---

# What are Media Queries?

Media queries apply CSS styles based on device characteristics like screen width, orientation, or user preferences.

Example:

```css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}

@media (prefers-color-scheme: dark) {
  body { background: #111; color: #eee; }
}
```

```text
0px ─────────── 768px ─────────── 1024px ───────────►
     mobile    │      tablet      │     desktop
               └ @media (min-width: 768px)
                                  └ @media (min-width: 1024px)
```

---

# What is Mobile-First CSS?

Mobile-first CSS means writing styles for smaller screens first, then adding enhancements for larger screens with `min-width` media queries.

Example:

```css
.container {
  display: block;
}

@media (min-width: 768px) {
  .container {
    display: flex;
  }
}
```

```text
Mobile-first (min-width)          Desktop-first (max-width)
base styles = mobile              base styles = desktop
   │ + add for ≥768px                │ − undo for ≤768px
   ▼                                 ▼
 tablet                            tablet
   │ + add for ≥1024px               │ − undo for ≤480px
   ▼                                 ▼
 desktop                           mobile
```

**Why:** phones load less CSS, and adding is simpler than overriding.

---

# Difference Between Inline, Block, and Inline-block

| Inline | Block | Inline-block |
|---|---|---|
| Does not start a new line. | Starts on a new line. | Stays inline but supports width/height. |
| Width and height ignored; vertical margin/padding does not push other lines. | Takes full available width. | Allows custom width, height, and margins. |
| Example: `<span>` | Example: `<div>` | Example: `<button>` |

```text
inline:        text [span] text [span] text

block:         ┌──────────── div ────────────┐
               └─────────────────────────────┘

inline-block:  text ┌──────┐ text ┌──────┐ text
                    │100x40│      │100x40│
                    └──────┘      └──────┘
```

---

# Transitions vs Animations

| Transition | Animation |
|---|---|
| Goes from state A to state B. | Can have many steps with `@keyframes`. |
| Needs a trigger (`:hover`, class change). | Can run automatically on page load. |
| Runs once per trigger. | Can loop (`infinite`), reverse, pause. |
| Good for hover effects. | Good for loaders, attention effects. |

```css
/* Transition */
.btn {
  background: blue;
  transition: background 0.3s ease;
}
.btn:hover {
  background: green;
}

/* Animation */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.loader {
  animation: spin 1s linear infinite;
}
```

```text
Transition:   A ───────────► B          (trigger: hover)

Animation:    0% ──► 50% ──► 100% ──┐   (keyframes, can loop)
              ▲                     │
              └─────── infinite ────┘
```

**Performance tip:** animate `transform` and `opacity` only — they skip layout and paint (see next question).

---

# Reflow vs Repaint

| Reflow (Layout) | Repaint |
|---|---|
| Browser recalculates sizes and positions. | Browser redraws pixels without changing layout. |
| Triggered by: `width`, `height`, `margin`, `top`, adding/removing elements, font change. | Triggered by: `color`, `background`, `visibility`, `box-shadow`. |
| Expensive — can affect parent and children. | Cheaper. |
| Always followed by a repaint. | Does not cause a reflow. |

```text
Rendering pipeline:

Style ──► Layout ──► Paint ──► Composite
           │          │           │
  change width:  ✓        ✓          ✓     (reflow — most expensive)
  change color:            ✓          ✓     (repaint)
  change transform/opacity:           ✓     (composite only — cheapest)
```

**How to reduce reflows:**

- Animate `transform` / `opacity` instead of `top` / `left` / `width`.
- Batch DOM changes (change a class once, not many inline styles).
- Avoid reading layout (`offsetHeight`) right after writing styles in a loop — causes "layout thrashing".

---

# Best Practices for Clean CSS

- Use meaningful class names.
- Keep selectors simple (low specificity).
- Avoid deep nesting.
- Reuse variables (`--primary-color`) and utilities.
- Follow mobile-first approach.
- Organize CSS properly.
- Avoid unnecessary `!important`.
- Use consistent naming conventions (e.g. BEM).

---

# CSS Interview Topics Checklist

- CSS types
- CSS specificity
- !important
- Box model and margin collapse
- box-sizing
- Flexbox
- Grid
- Centering a div
- Position properties
- z-index and stacking context
- Pseudo-classes
- Pseudo-elements
- Responsive design
- Media queries
- CSS units
- Display properties
- Mobile-first design
- Transitions vs animations
- Reflow vs repaint
- Clean CSS practices
