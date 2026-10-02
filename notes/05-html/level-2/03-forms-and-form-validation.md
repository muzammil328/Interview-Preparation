---
id: forms-and-form-validation
title: "Forms and Form Validation"
sidebar_label: "Forms and Form Validation"
sidebar_position: 3
description: "Forms and Form Validation — HTML interview notes."
---
A form collects user input and sends it to a server.

```html
<form action="/signup" method="POST">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>

  <label for="age">Age</label>
  <input id="age" name="age" type="number" min="18" max="99">

  <label for="pass">Password</label>
  <input id="pass" name="password" type="password" minlength="8" required>

  <button type="submit">Sign up</button>
</form>
```

### Built-in Validation Attributes

| Attribute | Meaning |
|---|---|
| `required` | Field must not be empty. |
| `type="email"` / `"url"` / `"number"` | Checks the format. |
| `min` / `max` | Number or date range. |
| `minlength` / `maxlength` | Text length. |
| `pattern` | Must match a regular expression. |

```text
User clicks Submit
       │
       ▼
Browser checks required / type / pattern
       │
   ┌───┴────┐
 invalid   valid
   │         │
   ▼         ▼
Show error  Send request to server
 message           │
                   ▼
           Server validates AGAIN
           (client validation can be bypassed)
```

**Important:** client-side validation is for user experience only. Always validate on the server too.

---
