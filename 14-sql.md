# SQL Interview

## SQL (Structured Query Language)

- **Relational database**: Data organized in tables with relationships
- Manage structured data
- Data stored in **Tables (Rows and Columns)**
- **Fixed schema** (predefined structure)
- **Vertical Scaling** (scale by adding more hardware resources)
- Examples: MySQL, PostgreSQL

## Composite Key

Multiple columns together as a unique identifier.

Example:

- Col 1: First Name
- Col 2: Last Name
- Composite Key: First Name + Last Name

## ACID

Properties ensuring reliable database transactions:

- **Atomicity**: All operations succeed or all fail (no partial updates)
- **Consistency**: Data remains valid after transactions
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed data is permanently saved

## SQL Query Example

Get only even number IDs for documents and limit to 10:

```sql
SELECT * FROM documents WHERE id % 2 = 0 LIMIT 10;
```
