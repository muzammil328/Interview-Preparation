---
id: react-testing-interview-questions-jest-and-react-testing-l
title: "React Testing Interview Questions (Jest and React Testing Library)"
sidebar_label: "React Testing Interview Questions (Jest and React Testing Library)"
sidebar_position: 3
description: "React Testing Interview Questions (Jest and React Testing Library) — React interview notes."
---
### Q78. What is Jest and how is it used?
A test runner/framework for unit, integration, mocking, and snapshot testing.

### Q79. What is React Testing Library and why is it preferred?
It tests user-visible behavior rather than implementation details, producing more resilient tests.

```jsx
render(<Counter />);
await userEvent.click(screen.getByRole('button', { name: /increment/i }));
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

```text
render component → find by role/text (like a user) → interact → assert what the user sees
```

---
