---
id: react-security-interview-questions-xss-and-sanitization
title: "React Security Interview Questions (XSS and Sanitization)"
sidebar_label: "React Security Interview Questions (XSS and Sanitization)"
sidebar_position: 5
description: "React Security Interview Questions (XSS and Sanitization) — React interview notes."
---
### Q84. How does React protect applications from XSS attacks?
React escapes interpolated JSX content by default.

```text
const name = '<img src=x onerror=alert(1)>';
<p>{name}</p>   →  shown as plain text, not executed ✅
```

### Q85. What is `dangerouslySetInnerHTML`, and why is it risky?
It injects raw HTML and can introduce XSS unless content is strictly sanitized (for example with DOMPurify).

```mermaid
flowchart LR
    U["Untrusted HTML"] --> S["Sanitize (DOMPurify)"] --> D["dangerouslySetInnerHTML"]
    U -.->|"skip sanitizing"| X["XSS 💥"]
```

### Q86. Best practices for securing React apps?
Sanitize untrusted input, avoid raw HTML injection, secure auth flows, and keep dependencies updated.

---
