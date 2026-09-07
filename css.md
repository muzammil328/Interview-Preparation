# CSS Interview Preparation

## What is CSS?

CSS (**Cascading Style Sheets**) is used to style and layout HTML elements. It controls the appearance, spacing, colors, fonts, and responsiveness of web pages.

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

CSS is written in a separate `.css` file.

```html
<link rel="stylesheet" href="style.css">
```

---

# What is `!important`?

`!important` is used to give a CSS rule higher priority than normal specificity rules.

Example:

```css
p {
  color: red !important;
}
```

### Note:

Use `!important` carefully because it can make CSS harder to maintain.

---

# Difference Between `display: none` and `visibility: hidden`

| `display: none` | `visibility: hidden` |
|---|---|
| Removes the element completely from the layout. | Hides the element but keeps its space. |
| Element takes zero space. | Element still occupies space. |
| Other elements move into its place. | Other elements do not move. |

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
| `static` | Default position in normal document flow. |
| `relative` | Positioned relative to its normal position. |
| `absolute` | Positioned relative to the nearest positioned ancestor. |
| `fixed` | Positioned relative to the viewport and stays fixed while scrolling. |
| `sticky` | Works like relative until a scroll threshold, then behaves like fixed. |

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

---

# Explain the CSS Box Model

Every HTML element follows the CSS box model.

It consists of four layers:

1. **Content**
2. **Padding**
3. **Border**
4. **Margin**

Diagram:

```
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

---

# What is `box-sizing: border-box`?

`box-sizing: border-box` includes padding and border inside the defined width and height.

## content-box (Default)

```
Total Width = width + padding + border
```

## border-box

```
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

---

# CSS Units

CSS units are divided into two categories:

## Relative Units

Adapt according to context.

Examples:

| Unit | Description |
|---|---|
| `em` | Relative to parent font size. |
| `rem` | Relative to root (`html`) font size. |
| `%` | Relative to parent element. |
| `vw` | Percentage of viewport width. |
| `vh` | Percentage of viewport height. |

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
| Used for component-level layouts. | Used for complete page layouts. |
| Example: Navbar, button groups. | Example: Dashboard layouts. |

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
}
```

---

# What is z-index?

`z-index` controls the stacking order of positioned elements.

Higher `z-index` values appear above lower values.

Example:

```css
.modal {
  position: fixed;
  z-index: 1000;
}
```

---

# Pseudo-classes vs Pseudo-elements

| Pseudo-class | Pseudo-element |
|---|---|
| Defines an element state. | Defines a specific part of an element. |
| Uses single colon `:`. | Uses double colon `::`. |
| Examples: `:hover`, `:focus`, `:nth-child()` | Examples: `::before`, `::after`, `::first-letter` |

Example:

```css
button:hover {
  background: blue;
}

p::first-letter {
  font-size: 30px;
}
```

---

# What is Responsive Design?

Responsive design means creating layouts that adapt to different screen sizes and devices.

Examples:

- Desktop
- Tablet
- Mobile

Techniques:

- Flexible layouts
- Media queries
- Relative units
- Responsive images

---

# What are Media Queries?

Media queries apply CSS styles based on device characteristics like screen width.

Example:

```css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```

---

# What is Mobile-First CSS?

Mobile-first CSS means writing styles for smaller screens first, then adding enhancements for larger screens.

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

---

# Difference Between Inline, Block, and Inline-block

| Inline | Block | Inline-block |
|---|---|---|
| Does not start a new line. | Starts on a new line. | Stays inline but supports width/height. |
| Width and height mostly ignored. | Takes full available width. | Allows custom width and height. |
| Example: `<span>` | Example: `<div>` | Example: `<button>` |

---

# Best Practices for Clean CSS

- Use meaningful class names.
- Keep selectors simple.
- Avoid deep nesting.
- Reuse variables and utilities.
- Follow mobile-first approach.
- Organize CSS properly.
- Avoid unnecessary `!important`.
- Use consistent naming conventions.

---

# CSS Interview Topics Checklist

- CSS types
- CSS specificity
- !important
- Box model
- box-sizing
- Flexbox
- Grid
- Position properties
- z-index
- Pseudo-classes
- Pseudo-elements
- Responsive design
- Media queries
- CSS units
- Display properties
- Mobile-first design
- Clean CSS practices
