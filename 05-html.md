# HTML Interview Preparation

## What is HTML?

HTML (**HyperText Markup Language**) is the standard markup language used to structure web pages. It defines the structure of content using elements and tags.

---

# Difference Between Semantic and Non-Semantic HTML Elements

| Semantic Elements | Non-Semantic Elements |
|---|---|
| Describe the meaning and purpose of content. | Do not describe the meaning of content. |
| Improve accessibility, SEO, readability, and maintainability. | Mainly used for grouping and styling. |
| Help browsers and developers understand page structure. | Provide no information about the content. |
| Examples: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` | Examples: `<div>`, `<span>` |

---

# What are Semantic Tags?

Semantic tags are HTML elements that clearly describe the purpose of their content.

Examples:

- `<header>` → Page header
- `<nav>` → Navigation links
- `<main>` → Main content
- `<section>` → Group of related content
- `<article>` → Independent content
- `<footer>` → Footer section

### Benefits:

- Improves accessibility.
- Improves SEO.
- Makes code easier to understand.
- Improves maintainability.

---

# Block vs Inline Elements

| Block Elements | Inline Elements |
|---|---|
| Start from a new line. | Stay in the same line. |
| Take full available width. | Take only required width. |
| Can contain other elements. | Usually contain text or inline elements. |
| Examples: `<div>`, `<section>`, `<p>`, `<h1>` | Examples: `<span>`, `<a>`, `<strong>`, `<img>` |

---

# Difference Between `div` and `span`

| `div` | `span` |
|---|---|
| Block-level element. | Inline-level element. |
| Used for large content grouping. | Used for small text/content grouping. |
| Starts on a new line. | Does not start on a new line. |
| Takes full width. | Takes required width. |

Example:

```html
<div>
  <h1>Hello World</h1>
</div>

<p>
  This is a <span>highlighted</span> text.
</p>
```

---

# Difference Between `section` and `article`

| `section` | `article` |
|---|---|
| Used to group related content. | Used for independent content. |
| Part of a larger page structure. | Can exist independently. |
| Example: Services section. | Example: Blog post or news article. |

Example:

```html
<section>
  <h2>Our Services</h2>
  <p>We provide web development services.</p>
</section>
```

```html
<article>
  <h2>How to Learn React</h2>
  <p>React is a JavaScript library.</p>
</article>
```

---

# What is Accessibility in HTML?

Accessibility means creating websites that can be used by everyone, including users with disabilities.

### Accessibility Practices:

- Use semantic HTML.
- Add meaningful `alt` attributes.
- Use labels for form inputs.
- Support keyboard navigation.
- Maintain proper heading structure.

Example:

```html
<img src="profile.jpg" alt="User profile image">
```

---

# localStorage vs sessionStorage

| localStorage | sessionStorage |
|---|---|
| Data remains until manually removed. | Data exists only during the browser session. |
| Data remains after browser restart. | Data is removed when the tab is closed. |
| Used for permanent client-side storage. | Used for temporary storage. |

Example:

```javascript
localStorage.setItem("name", "Muhammad");

sessionStorage.setItem("token", "12345");
```

---

# What is iframe?

An `iframe` is used to embed another webpage or document inside the current page.

Common uses:

- YouTube videos
- Google Maps
- External applications

Example:

```html
<iframe src="https://example.com"></iframe>
```

---

# Void Elements in HTML

Void elements are HTML elements that do not have closing tags.

Examples:

```html
<img>
<br>
<hr>
<meta>
<input>
<link>
```

Example:

```html
<img src="image.jpg" alt="Example image">

<input type="text">
```

---

# async vs defer

| async | defer |
|---|---|
| Downloads script while HTML is parsing. | Downloads script while HTML is parsing. |
| Executes immediately after downloading. | Executes after HTML parsing completes. |
| Execution order is not guaranteed. | Maintains script order. |
| Used for independent scripts. | Used for scripts that depend on DOM. |

Example:

```html
<script async src="script.js"></script>

<script defer src="script.js"></script>
```

---

# GET vs POST

| GET | POST |
|---|---|
| Used to retrieve data. | Used to send data. |
| Data is visible in URL. | Data is sent in request body. |
| Less secure for sensitive data. | Better for sensitive data. |
| Can be cached. | Usually not cached. |
| Example: Search query. | Example: Login form. |

---

# Cookies vs localStorage

| Cookies | localStorage |
|---|---|
| Small storage (~4KB). | Larger storage (~5-10MB). |
| Sent automatically with HTTP requests. | Not sent automatically. |
| Can have expiration dates. | Remains until manually removed. |
| Commonly used for authentication. | Used for client-side data storage. |

---

# What is DOM?

DOM (**Document Object Model**) represents an HTML document as a tree structure.

JavaScript can use DOM to:

- Change HTML content.
- Modify CSS.
- Add/remove elements.
- Handle events.

Example:

```javascript
document.getElementById("title").innerHTML = "Hello World";
```

---

# HTML vs HTML5

| HTML | HTML5 |
|---|---|
| Older version of HTML. | Modern version of HTML. |
| Limited multimedia support. | Built-in audio and video support. |
| Fewer semantic elements. | New semantic elements introduced. |
| Requires plugins for some features. | Provides modern browser APIs. |

### HTML5 Features:

- Semantic tags
- Audio and video
- Canvas
- Local Storage
- Geolocation API
- Web Workers

---

# Best Practices for Clean HTML

- Use semantic elements.
- Maintain proper indentation.
- Use correct nesting.
- Add meaningful `alt` text.
- Use labels for forms.
- Avoid unnecessary wrappers.
- Follow heading hierarchy.
- Keep markup simple and readable.
- Validate HTML regularly.

---

# HTML Interview Topics Checklist

- Semantic vs Non-Semantic HTML
- Block vs Inline Elements
- div vs span
- section vs article
- HTML5 Features
- DOM
- Accessibility
- Forms
- Cookies vs localStorage
- iframe
- Void Elements
- async vs defer
- GET vs POST
- Clean HTML Practices
