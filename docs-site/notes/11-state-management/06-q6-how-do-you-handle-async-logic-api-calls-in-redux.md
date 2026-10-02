---
id: q6-how-do-you-handle-async-logic-api-calls-in-redux
title: "Q6. How do you handle async logic (API calls) in Redux?"
sidebar_label: "Q6. How do you handle async logic (API calls) in Redux?"
sidebar_position: 6
description: "Q6. How do you handle async logic (API calls) in Redux? — State Management interview notes."
---
Reducers must be pure, so async work goes in **middleware** — usually `createAsyncThunk`.

```mermaid
sequenceDiagram
    participant C as Component
    participant T as Thunk
    participant API as Server
    participant R as Reducer
    C->>T: dispatch(fetchUsers())
    T->>R: pending → loading = true
    T->>API: GET /users
    API-->>T: data
    T->>R: fulfilled → users = data, loading = false
    R-->>C: re-render with users
```

```js
export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const res = await fetch('/api/users');
  return res.json();
});
```

For API data, many teams now use **RTK Query** or **TanStack Query** instead of writing thunks by hand (see Q8).

---
