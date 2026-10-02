---
id: react-typescript-interview-questions
title: "React TypeScript Interview Questions"
sidebar_label: "React TypeScript Interview Questions"
sidebar_position: 4
description: "React TypeScript Interview Questions — React interview notes."
---
### Q81. Why is TypeScript used with React?
It adds static typing, catches errors early, and improves maintainability/team collaboration.

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

<Button label="Save" />; // ❌ compile error: onClick is missing
```

---
