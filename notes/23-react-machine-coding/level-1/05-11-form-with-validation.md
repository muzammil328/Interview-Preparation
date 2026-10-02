---
id: 11-form-with-validation
title: "11. Form With Validation"
sidebar_label: "11. Form With Validation"
sidebar_position: 5
description: "11. Form With Validation — React Machine Coding interview notes."
---
**Requirements:** name, email, password; show errors next to fields after the user leaves a field or submits; prevent double submit; keep values if the server fails.

```text
State                      Derived during render
values:  { name, email, password }       errors  = validate(values)
touched: { email: true }                 isValid = no errors
submitting: false
serverError: ''

Show an error only when  touched[field] && errors[field]
```

```jsx
const INITIAL_VALUES = { name: '', email: '', password: '' };
const MIN_PASSWORD_LENGTH = 8;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required';
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Enter a valid email';
  if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `At least ${MIN_PASSWORD_LENGTH} characters`;
  }
  return errors;
}

function SignupForm({ onSubmit }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleBlur(e) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    if (!isValid || submitting) return;
    setSubmitting(true);
    setServerError('');
    try {
      await onSubmit(values);
      setValues(INITIAL_VALUES);
      setTouched({});
    } catch {
      setServerError('Could not sign up. Please try again.'); // values are kept
    } finally {
      setSubmitting(false);
    }
  }

  function renderField(name, label, type = 'text') {
    const error = touched[name] && errors[name];
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {error && <p id={`${name}-error`}>{error}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {renderField('name', 'Name')}
      {renderField('email', 'Email', 'email')}
      {renderField('password', 'Password', 'password')}
      {serverError && <p role="alert">{serverError}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Signing up…' : 'Sign up'}
      </button>
    </form>
  );
}
```

- `errors` is **derived**, never stored, so it can't get out of sync with `values`.
- `touched` stops errors from shouting at the user before they've typed anything.
- `renderField` is a plain function returning JSX, not a component defined inside a component (that would remount the inputs and lose focus on every keystroke).
- The real validation must be repeated on the server.

**Follow-ups:** confirm-password field; use React Hook Form + Zod and explain why (less re-rendering, schema shared with the API).

---
