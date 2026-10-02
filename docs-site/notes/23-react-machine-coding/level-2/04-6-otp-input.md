---
id: 6-otp-input
title: "6. OTP Input"
sidebar_label: "6. OTP Input"
sidebar_position: 4
description: "6. OTP Input — React Machine Coding interview notes."
---
**Requirements:** N boxes, one digit each; typing moves to the next box; Backspace goes back; pasting a full code fills all boxes.

```text
Type "4"    [4][_][_][_][_][_]   focus → box 2
Type "7"    [4][7][_][_][_][_]   focus → box 3
Backspace on empty box 3 → clear box 2, focus → box 2
Paste "123456" in box 1 → [1][2][3][4][5][6] → onComplete("123456")
```

```jsx
function OtpInput({ length = 6, onComplete }) {
  const [digits, setDigits] = useState(() => Array(length).fill(''));
  const inputsRef = useRef([]);

  function focus(i) {
    inputsRef.current[i]?.focus();
  }

  function handleChange(e, i) {
    const typed = e.target.value.replace(/\D/g, '');   // digits only
    if (!typed) return;
    const next = [...digits];
    typed.slice(0, length - i).split('').forEach((d, k) => {
      next[i + k] = d;                                  // handles paste too
    });
    setDigits(next);
    focus(Math.min(i + typed.length, length - 1));
    if (next.every(Boolean)) onComplete(next.join(''));
  }

  function handleKeyDown(e, i) {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = [...digits];
      if (next[i]) {
        next[i] = '';
      } else if (i > 0) {
        next[i - 1] = '';
        focus(i - 1);
      }
      setDigits(next);
    }
    if (e.key === 'ArrowLeft') focus(i - 1);
    if (e.key === 'ArrowRight') focus(i + 1);
  }

  return (
    <div>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          value={d}
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
  );
}
```

- An **array of refs** is the key idea — you need to focus specific boxes.
- `onFocus → select()` makes typing replace the existing digit instead of appending.
- The index is fine as a key here: the list has a fixed length and never reorders.
- `autoComplete="one-time-code"` lets phones auto-fill the SMS code.

---
