---
id: fragments
title: "Fragments"
sidebar_label: "Fragments"
sidebar_position: 12
description: "Fragments — React interview notes."
---
Fragments group several elements without adding an extra DOM node.

```jsx
return (
  <>
    <td>Name</td>
    <td>Age</td>
  </>
);

// Use the long form when you need a key
<React.Fragment key={item.id}>...</React.Fragment>
```

```text
With <div> wrapper:          With Fragment:
<tr>                         <tr>
  <div>   ← invalid in a table <td>Name</td>
    <td>Name</td>              <td>Age</td>
    <td>Age</td>             </tr>
  </div>
</tr>
```

---
