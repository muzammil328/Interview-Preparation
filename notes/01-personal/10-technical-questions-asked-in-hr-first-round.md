---
id: technical-questions-asked-in-hr-first-round
title: "Technical Questions Asked in HR / First Round"
sidebar_label: "Technical Questions Asked in HR / First Round"
sidebar_position: 10
description: "Technical Questions Asked in HR / First Round — Personal interview notes."
---
## Difference Between Unidirectional vs Bidirectional Data Flow

| **Unidirectional Data Flow**                | **Bidirectional Data Flow**            |
| ------------------------------------------- | -------------------------------------- |
| Data flows in one direction only.           | Data can flow in both directions.      |
| Parent → Child                              | Parent ↔ Child                         |
| Easier to understand and debug.             | Can become harder to track and manage. |
| Provides better control over state changes. | State changes can be less predictable. |
| React mainly follows this approach.         | Common in some other frameworks.       |

```text
Unidirectional (React)             Bidirectional (e.g. Angular ngModel)

   Parent (state)                     Parent ◄──────┐
      │ props ▼                          │          │
   Child                              Child ────────┘
      │ calls onChange()                (child updates parent directly)
      └──► Parent updates state
```

**Example:**

* React JS uses **unidirectional data flow** where data is passed from parent components to child components through props. The child sends data back only by calling a function (callback) the parent passed down.

---

## How do you persist state in an application?

State can be persisted using:

1. **Browser Storage**

   * localStorage
   * sessionStorage

2. **Cookies**

3. **IndexedDB**

4. **Backend Database**

   * Store user/application data on the server and retrieve it when needed.

```text
Survives tab close?     sessionStorage ✗   localStorage ✓   cookies ✓   IndexedDB ✓
Shared across devices?  Only backend database ✓
Sent to server?         Only cookies (automatically with each request)
```

---

## Difference Between localStorage and sessionStorage

| **localStorage**                                                           | **sessionStorage**                                                    |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Stores data permanently until manually cleared by the user or application. | Stores data only for the current browser session.                     |
| Data remains available even after closing and reopening the browser.       | Data is removed when the browser tab is closed.                       |
| Shared across all tabs of the same origin.                                 | Separate for each tab.                                                |
| Maximum storage is usually around 5-10 MB depending on the browser.        | Maximum storage is usually similar but limited to the active session. |
| Commonly used for preferences and persistent settings.                     | Commonly used for temporary session-related data.                     |

```text
Tab A ─┐                       Tab A ──► sessionStorage A
Tab B ─┼──► one localStorage   Tab B ──► sessionStorage B
Tab C ─┘                       (close tab → its data is gone)
```

---

## Synchronous vs Asynchronous

| **Synchronous (readFileSync)**                       | **Asynchronous (readFile)**                                |
| ---------------------------------------------------- | ---------------------------------------------------------- |
| Executes one task at a time.                         | Can handle other tasks while waiting.                      |
| The next task waits until the current task finishes. | Does not block the execution flow.                         |
| Blocking operation.                                  | Non-blocking operation.                                    |
| Follows a linear execution flow.                     | Uses an event-driven approach.                             |
| Example: Normal function execution.                  | Examples: `setTimeout`, API requests, Promises, callbacks. |

```text
Synchronous:   [Task A ██████] [Task B ████] [Task C ██]      → total = A + B + C

Asynchronous:  [Start A]──waiting──[A done]
               [Task B ████]
               [Task C ██]                                    → B and C run while A waits
```

---
