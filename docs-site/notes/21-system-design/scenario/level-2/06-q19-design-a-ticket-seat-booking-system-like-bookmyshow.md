---
id: q19-design-a-ticket-seat-booking-system-like-bookmyshow
title: "Q19. Design a Ticket / Seat Booking System (like BookMyShow)"
sidebar_label: "Q19. Design a Ticket / Seat Booking System (like BookMyShow)"
sidebar_position: 6
description: "Q19. Design a Ticket / Seat Booking System (like BookMyShow) — System Design interview notes."
---

**Requirements:** users pick seats, have 10 minutes to pay, and no seat is ever sold twice.

```text
Seat states

AVAILABLE ──select──► HELD (10 min, userId) ──pay ✓──► BOOKED
    ▲                        │
    └──── timeout / cancel ──┘
```

```mermaid
sequenceDiagram
    participant U as User
    participant API
    participant R as Redis
    participant DB
    U->>API: hold seats A5, A6
    API->>R: SET seat:show9:A5 userId NX EX 600
    R-->>API: OK (or null = someone else has it)
    API-->>U: held, pay within 10 min
    U->>API: pay
    API->>DB: UPDATE seats SET status='BOOKED'<br/>WHERE id IN (A5, A6) AND status='AVAILABLE'
    API->>R: DEL holds
    API-->>U: booking confirmed
```

- The **hold** uses Redis `SET NX EX`: only one user gets it, and it expires on its own if they leave.
- The **final booking** is still protected in the DB (conditional `UPDATE` or a unique constraint on `(show_id, seat_id)`), because Redis is not the source of truth.
- Hold **all seats or none**: if A6 fails, release A5.
- Popular shows: put users in a **virtual waiting room** queue so the booking service isn't flooded.

---
