---
id: what-is-a-dockerfile
title: "What is a Dockerfile?"
sidebar_label: "What is a Dockerfile?"
sidebar_position: 4
description: "What is a Dockerfile? — Docker interview notes."
---
A text file with step-by-step instructions to build an image.

```dockerfile
FROM node:20-alpine          # base image
WORKDIR /app                 # working directory inside the container
COPY package*.json ./        # copy dependency files first (for caching)
RUN npm ci                   # install dependencies
COPY . .                     # copy the rest of the source code
EXPOSE 3000                  # document the port
CMD ["node", "server.js"]    # default command when the container starts
```

| Instruction | Purpose                                     |
| ----------- | ------------------------------------------- |
| `FROM`      | Base image                                  |
| `WORKDIR`   | Set the working directory                   |
| `COPY`      | Copy files from host into the image         |
| `RUN`       | Run a command **at build time**             |
| `ENV`       | Set an environment variable                 |
| `EXPOSE`    | Document which port the app listens on (does not publish it) |
| `CMD`       | Default command **at run time**             |

---
