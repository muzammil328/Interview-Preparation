# VPS Interview

## VPS (Virtual Private Server)

A **VPS (Virtual Private Server)** is a virtual server created by dividing a physical server into multiple isolated virtual servers using **virtualization**.

### Key Points

* **Virtual Machine:** A software-based emulation of a physical computer.
* **Runs on Physical Servers:** A VPS runs on underlying physical server hardware.
* **Created by Virtualization:** A **hypervisor** partitions a physical server into multiple virtual servers.
* **Full Control:** You typically get **root access** to configure and manage the server.
* **Resources:** A VPS is allocated resources such as **CPU, RAM, and storage**.

### Simple Architecture

```text
┌──────────────────────────────────────────┐
│           Physical Server               │
│                                          │
│              Hypervisor                  │
│                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │   VPS 1  │ │   VPS 2  │ │   VPS 3  │ │
│  │          │ │          │ │          │ │
│  │ CPU/RAM  │ │ CPU/RAM  │ │ CPU/RAM  │ │
│  │ Storage  │ │ Storage  │ │ Storage  │ │
│  └──────────┘ └──────────┘ └──────────┘ │
│                                          │
└──────────────────────────────────────────┘
```

### Interview Answer

> **A VPS is a virtual server hosted on a physical server. A hypervisor divides the physical server's resources into multiple isolated virtual machines. Each VPS gets its own allocated CPU, RAM, and storage, and usually provides root access so you can install and configure your software and services.**
