---
id: q5-design-a-notification-system-email-sms-push
title: "Q5. Design a Notification System (Email, SMS, Push)"
sidebar_label: "Q5. Design a Notification System (Email, SMS, Push)"
sidebar_position: 9
description: "Q5. Design a Notification System (Email, SMS, Push) — System Design interview notes."
---

```mermaid
flowchart LR
    S["Services<br/>order, auth, chat"] --> N["Notification Service"]
    N --> P{"User preferences<br/>+ templates"}
    P --> QE[(Email Queue)]
    P --> QS[(SMS Queue)]
    P --> QP[(Push Queue)]
    QE --> WE[Email Workers] --> SES[SES / SendGrid]
    QS --> WS[SMS Workers] --> TW[Twilio]
    QP --> WP[Push Workers] --> FCM[FCM / APNs]
```

- **One queue per channel** — if SMS is slow, email is not affected.
- Check **user preferences** (opted out of SMS? quiet hours?) before queueing.
- Use **templates** with variables (`Hi {{name}}, your order {{id}} shipped`).
- Priority: OTP/security notifications get their own high-priority queue.
- Same retry, DLQ, and idempotency rules as Q1.

---
