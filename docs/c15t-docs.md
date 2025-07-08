# ai-tools-integrations.mdx

```mdx
---
title: AI Tools Integrations
description: Learn how to integrate Consent Management (c15t) with AI tools and language models through the standardized llms.txt file. This guide explains how to access and import the llms.txt file to enhance your development workflow with AI-powered tools like Cursor.
---
## Overview

The `llms.txt` file is a standardized resource designed to provide concise, LLM-friendly information about a website. By accessing this file, you can enhance your experience with tools that utilize language models, such as Cursor. This document will guide you on how to import the `llms.txt` file into your tools.

## Accessing the `llms.txt` or `llms-full.txt` File

To access the `llms.txt` or `llms-full.txt` file, simply navigate to the following URL in your web browser:

[https://c15t.com/llms.txt](https://c15t.com/llms.txt)
[https://c15t.com/llms-full.txt](https://c15t.com/llms-full.txt)

This file contains essential information structured in a way that is both human-readable and easily processed by language models. It includes:

- A brief overview of the project or website.
- Links to detailed documentation and resources.
- Additional context that can assist in understanding the content.

## Importing into Cursor

Once you have accessed the `llms.txt` file, you can import it into Cursor or similar tools by following these steps:

1. **Open Cursor**: Launch the Cursor application on your device.

2. **Navigate to Import Options**: Look for the import feature within the tool. This is typically found in the settings or tools menu.

3. **Enter the URL**: When prompted, enter the URL of the `llms.txt` file:
   \`\`\`
   https://c15t.com/llms.txt
   \`\`\`

4. **Confirm Import**: Follow any additional prompts to confirm the import. Cursor will fetch the content from the provided URL and integrate it into your workspace.

5. **Utilize the Information**: Once imported, you can leverage the structured information from the `llms.txt` file to enhance your queries, access relevant documentation, and improve your overall experience with the tool.

## Benefits of Using `llms.txt`

- **Concise Information**: Quickly access essential details without sifting through complex HTML pages.
- **Enhanced Context**: Get relevant links and descriptions that help you understand the content better.
- **Improved Workflow**: Streamline your development process by having all necessary information at your fingertips.
```

# backend/adapters/drizzle.mdx

```mdx
---
title: Drizzle Adapter
description: The Drizzle adapter integrates c15t Backend with Drizzle ORM, a lightweight, type-safe SQL query builder with schema declaration.
---
## Installation

Install Drizzle ORM and the appropriate database driver:

\`\`\`bash
# For PostgreSQL
npm install drizzle-orm pg @types/pg
# For MySQL
npm install drizzle-orm mysql2 @types/mysql2
# For SQLite
npm install drizzle-orm better-sqlite3 @types/better-sqlite3
\`\`\`

## Configuration

1. Define your schema using Drizzle's schema builder:

\`\`\`typescript
// schema.ts
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow()
});
\`\`\`

2. Configure the c15t instance with the Drizzle adapter:

\`\`\`typescript
import { c15tInstance } from '@c15t/backend';
import { drizzleAdapter } from '@c15t/backend/db/adapters/drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Create a PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Initialize Drizzle with the connection
const db = drizzle(pool);

// Create the c15t instance
const instance = c15tInstance({
  baseURL: 'http://localhost:3000',
  database: drizzleAdapter({
    client: db,
    // Optional: Pass your schema for type checking
    schema: { users }
  }),
});
\`\`\`

### MySQL Configuration

\`\`\`typescript
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'c15t'
});

const db = drizzle(connection);

const instance = c15tInstance({
  database: drizzleAdapter({ client: db }),
});
\`\`\`

### SQLite Configuration

\`\`\`typescript
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database('database.db');
const db = drizzle(sqlite);

const instance = c15tInstance({
  database: drizzleAdapter({ client: db }),
});
\`\`\`

## Usage Examples

### Basic CRUD Operations

\`\`\`typescript
// Create a new record
const user = await instance.database.create('users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// Find records
const users = await instance.database.find('users', {
  where: { email: 'john@example.com' },
  orderBy: { createdAt: 'desc' },
  limit: 10
});

// Update a record
const updatedUser = await instance.database.update(
  'users',
  { where: { id: user.id } },
  { name: 'John Smith' }
);

// Delete a record
await instance.database.delete('users', { where: { id: user.id } });
\`\`\`

### Transactions

\`\`\`typescript
await instance.database.transaction(async (trx) => {
  const user = await trx.create('users', {
    name: 'Alice',
    email: 'alice@example.com'
  });
  
  await trx.create('profiles', {
    userId: user.id,
    bio: 'Software engineer'
  });
});
\`\`\`

### Migrations

Use Drizzle Kit for schema migrations:

\`\`\`bash
npm install -D drizzle-kit

# Generate a migration
npx drizzle-kit generate:pg

# Apply migrations
npx drizzle-kit push:pg
\`\`\`

## Type Safety

The Drizzle adapter provides excellent type safety:

\`\`\`typescript
import { users } from './schema';
import { InferModel } from 'drizzle-orm';

// Infer types from your schema
type User = InferModel<typeof users>;

// Type-safe operations
const users = await instance.database.find<User>('users', {
  where: { email: 'john@example.com' }
});
\`\`\`

## Best Practices

- **Define schema using Drizzle's builders** - Leverage type safety and schema validation
- **Use prepared statements** - Drizzle uses prepared statements for all queries
- **Implement connection pooling** - Configure appropriate pool sizes for production
- **Use migrations for schema changes** - Manage schema changes with Drizzle Kit

## Limitations

- Some complex queries may require direct Drizzle client usage
- Table names must match schema definitions

## Related Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Database Adapter Interface](/backend/database-adapters)
- [Core Concepts](/backend/core-concepts)
```

# backend/adapters/index.mdx

```mdx
---
title: Database Adapters Overview
description: c15t Backend supports multiple database adapters, each offering different features and trade-offs. This guide helps you choose the right adapter for your needs.
---
## Comparison Table

| Feature | Memory | Kysely | Prisma | Drizzle |
|---------|--------|--------|--------|---------|
| **Best for** | Development | Production SQL | Full ORM | Lightweight ORM |
| **Type safety** | Basic | Good | Excellent | Excellent |
| **Schema management** | None | Manual | Automatic | Manual + Tools |
| **Migrations** | None | Manual | Automatic | CLI tools |
| **Query complexity** | Basic | Advanced | Advanced | Advanced |
| **Transaction support** | No | Yes | Yes | Yes |
| **Performance** | Fast (in-memory) | Fast | Moderate | Fast |
| **Bundle size** | Minimal | Moderate | Large | Small |
| **Database support** | N/A | PostgreSQL, MySQL, SQLite | Many | PostgreSQL, MySQL, SQLite |

## Choosing the Right Adapter

- **Memory Adapter**: Perfect for development, testing, and demos. Not suitable for production.
- **Kysely Adapter**: Great for applications that need direct SQL access with type safety and performance.
- **Prisma Adapter**: Ideal for applications that benefit from a full-featured ORM with schema management.
- **Drizzle Adapter**: Good balance between performance and features with a lightweight footprint.

## Migration Path

You can switch between adapters as your application needs evolve:

1. **Development → Production**: Start with Memory adapter, then migrate to Kysely, Prisma, or Drizzle
2. **Changing Adapters**: The common adapter interface makes it relatively easy to switch between implementations

## Next Steps

- [Memory Adapter Documentation](/backend/adapters/memory)
- [Kysely Adapter Documentation](/backend/adapters/kysely)
- [Prisma Adapter Documentation](/backend/adapters/prisma)
- [Drizzle Adapter Documentation](/backend/adapters/drizzle)
```

# backend/adapters/kysely.mdx

```mdx
---
title: Kysely Adapter
description: The Kysely adapter provides type-safe SQL query building with support for multiple databases including PostgreSQL, MySQL, and SQLite.
---
## Installation

First, install the Kysely package and the appropriate database driver:

\`\`\`bash
# For PostgreSQL
npm install kysely pg @types/pg
# For MySQL
npm install kysely mysql2 @types/mysql2
# For SQLite
npm install kysely better-sqlite3 @types/better-sqlite3
\`\`\`

## Configuration

Configure the Kysely adapter with your database connection:

\`\`\`typescript
import { c15tInstance } from '@c15t/backend';
import { kyselyAdapter } from '@c15t/backend/db/adapters/kysely';

// PostgreSQL configuration
const instance = c15tInstance({
  baseURL: 'http://localhost:3000',
  database: kyselyAdapter({
    dialect: 'postgres',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'c15t',
      user: 'postgres',
      password: 'password',
    },
    // Optional: Enable query logging
    debug: process.env.NODE_ENV !== 'production',
    // Optional: Connection pooling settings
    pool: {
      min: 2,
      max: 10
    }
  }),
});
\`\`\`

### MySQL Configuration

\`\`\`typescript
const instance = c15tInstance({
  database: kyselyAdapter({
    dialect: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      database: 'c15t',
      user: 'root',
      password: 'password',
    }
  }),
});
\`\`\`

### SQLite Configuration

\`\`\`typescript
const instance = c15tInstance({
  database: kyselyAdapter({
    dialect: 'sqlite',
    connection: {
      filename: ':memory:' // or path to file like './database.db'
    }
  }),
});
\`\`\`

## Usage Examples

### Basic CRUD Operations

\`\`\`typescript
// Create a new record
const user = await instance.database.create('users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// Find records with complex conditions
const users = await instance.database.find('users', {
  where: { 
    email: { $like: '%@example.com' },
    createdAt: { $gt: new Date('2023-01-01') }
  },
  orderBy: { createdAt: 'desc' },
  limit: 10
});

// Update records
const updatedUser = await instance.database.update(
  'users',
  { where: { id: user.id } },
  { name: 'John Smith' }
);

// Delete records
await instance.database.delete('users', { where: { id: user.id } });
\`\`\`

### Transactions

\`\`\`typescript
await instance.database.transaction(async (trx) => {
  // All operations inside this function use the same transaction
  const user = await trx.create('users', { name: 'Alice' });
  await trx.create('profiles', { userId: user.id });
  
  // Transaction automatically commits unless an error is thrown
  // If an error is thrown, the transaction is rolled back
});
\`\`\`

## Schema Management

\`\`\`typescript
import { sql } from 'kysely';

// Create tables programmatically
await instance.database.raw(sql`
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )
`);
\`\`\`

## Best Practices

- **Use prepared statements** - Kysely automatically uses prepared statements to prevent SQL injection
- **Configure connection pooling** - Set appropriate pool sizes based on your application needs
- **Implement retry logic** - Add retries for transient database errors
- **Monitor query performance** - Use the debug option to log slow queries during development

## Limitations

- Schema must be created separately or with raw SQL
- Complex joins require custom SQL or advanced Kysely usage

## Related Resources

- [Kysely Documentation](https://github.com/koskimas/kysely)
- [Database Adapter Interface](/backend/database-adapters)
- [Core Concepts](/backend/core-concepts)
```

# backend/adapters/memory.mdx

```mdx
---
title: Memory Adapter
description: The Memory adapter stores all data in-memory, making it perfect for development, testing, and prototyping. Data is lost when the application restarts.
---
## Installation

The Memory adapter is included in the core package and requires no additional dependencies:

\`\`\`typescript
import { memoryAdapter } from '@c15t/backend/db/adapters/memory';
\`\`\`

## Configuration

The Memory adapter accepts minimal configuration:

\`\`\`typescript
import { c15tInstance } from '@c15t/backend';
import { memoryAdapter } from '@c15t/backend/db/adapters/memory';

const instance = c15tInstance({
  baseURL: 'http://localhost:3000',
  database: memoryAdapter({
    // Optional: Pre-populate with initial data
    initialData: {
      users: [
        { id: '1', name: 'Admin User', email: 'admin@example.com' }
      ]
    },
    // Optional: Set persistence to localStorage in browser environments
    persistence: 'localStorage'
  }),
});
\`\`\`

## Usage Examples

### Basic CRUD Operations

\`\`\`typescript
// Create a new record
const user = await instance.database.create('users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// Find records
const users = await instance.database.find('users', {
  where: { email: 'john@example.com' }
});

// Update a record
const updatedUser = await instance.database.update(
  'users',
  { where: { id: user.id } },
  { name: 'John Smith' }
);

// Delete a record
await instance.database.delete('users', { where: { id: user.id } });
\`\`\`

## Best Practices

- **Use for development only** - The memory adapter is not suitable for production use as data is lost on restart
- **Test with realistic data volumes** - Pre-populate with a representative data set to test performance
- **Reset between tests** - Create a new instance for each test to ensure a clean environment

## Limitations

- No persistence across application restarts
- Not suitable for production environments
- Limited query capabilities compared to SQL-based adapters
- No support for complex joins or transactions

## When to Use

- During development and prototyping
- For automated testing
- For demos and examples
- When you need a lightweight, zero-configuration database

## Related Resources

- [Core Concepts](/backend/core-concepts)
- [Database Adapter Interface](/backend/database-adapters)
```

# backend/adapters/prisma.mdx

```mdx
---
title: Prisma Adapter
description: The Prisma adapter integrates c15t Backend with Prisma ORM, providing type-safe database access with migration support and automatic schema generation.
---
## Installation

First, install Prisma and initialize your project:

\`\`\`bash
npm install @prisma/client
npm install -D prisma
npx prisma init
\`\`\`

## Configuration

1. Define your Prisma schema in `prisma/schema.prisma`:

\`\`\`prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // or "mysql", "sqlite", etc.
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  createdAt DateTime @default(now()) @map("created_at")
}
\`\`\`

2. Generate the Prisma client:

\`\`\`bash
npx prisma generate
\`\`\`

3. Configure the c15t instance with the Prisma adapter:

\`\`\`typescript
import { c15tInstance } from '@c15t/backend';
import { prismaAdapter } from '@c15t/backend/db/adapters/prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const instance = c15tInstance({
  baseURL: 'http://localhost:3000',
  database: prismaAdapter({ 
    client: prisma,
    // Optional: Configure logging
    logging: process.env.NODE_ENV !== 'production'
  }),
});
\`\`\`

## Usage Examples

### Basic CRUD Operations

\`\`\`typescript
// Create a new record
const user = await instance.database.create('User', {
  name: 'John Doe',
  email: 'john@example.com'
});

// Find records
const users = await instance.database.find('User', {
  where: { email: 'john@example.com' },
  orderBy: { createdAt: 'desc' },
  limit: 10
});

// Update a record
const updatedUser = await instance.database.update(
  'User',
  { where: { id: user.id } },
  { name: 'John Smith' }
);

// Delete a record
await instance.database.delete('User', { where: { id: user.id } });
\`\`\`

### Transactions

\`\`\`typescript
await instance.database.transaction(async (trx) => {
  const user = await trx.create('User', { 
    name: 'Alice',
    email: 'alice@example.com'
  });
  
  await trx.create('Profile', { 
    userId: user.id,
    bio: 'Software engineer'
  });
});
\`\`\`

### Migrations

Run migrations using the Prisma CLI:

\`\`\`bash
# Create a migration
npx prisma migrate dev --name add-user-model

# Apply migrations in production
npx prisma migrate deploy
\`\`\`

## Type Safety

The Prisma adapter provides type safety when used with TypeScript:

\`\`\`typescript
// Define your types to match your Prisma schema
type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

// Type-safe operations
const users = await instance.database.find<User>('User', {
  where: { email: 'john@example.com' }
});
\`\`\`

## Best Practices

- **Define schema in Prisma format** - Use Prisma's schema format for auto-generated migration files
- **Use migrations for schema changes** - Let Prisma handle database schema migrations
- **Enable query logging in development** - Monitor query performance and debug issues
- **Consider connection pooling** - Configure connection pools for production performance

## Limitations

- Table names must match Prisma model names
- Some advanced query features may require direct Prisma client usage

## Related Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Database Adapter Interface](/backend/database-adapters)
- [Core Concepts](/backend/core-concepts)
```

# backend/core-concepts.mdx

```mdx
---
title: Core Concepts
description: Detailed explanation of the fundamental concepts and architecture of the c15t Backend package, including instance management, context system, and request handling.
---

This document covers the fundamental concepts and architecture of the c15t Backend package.

## Instance Management

### Creating an Instance

The c15t instance is the core of the system, managing all components and their interactions:

\`\`\`typescript
import { c15tInstance } from '@c15t/backend';
import { memoryAdapter } from '@c15t/backend/db/adapters/memory';

const instance = c15tInstance({
  baseURL: 'http://localhost:3000',
  database: memoryAdapter({}),
  plugins: [],
  context: {},
});
\`\`\`

For a quick start guide, see [Getting Started](./backend#basic-usage).

### Instance Configuration

The instance configuration includes:

\`\`\`typescript
interface C15TOptions {
  // Base URL for the API
  baseURL: string;
  
  // Database adapter
  database: DatabaseAdapter;
  
  // Optional base path for API routes
  basePath?: string;
  
  // Trusted origins for CORS
  trustedOrigins?: string[] | ((request: Request) => string[]);
  
  // Plugin configurations
  plugins?: C15TPlugin[];
  
  // Additional context data
  context?: Record<string, unknown>;
  
  // Authentication configuration
  auth?: AuthConfig;
  
  // Rate limiting configuration
  rateLimit?: RateLimitConfig;
}
\`\`\`

Learn more about database adapters in [Database Adapters](./backend/database-adapters).

## Context System

### Context Structure

The context is a shared state that persists throughout the request lifecycle:

\`\`\`typescript
interface C15TContext {
  // Request-specific data
  request: Request;
  response?: Response;
  
  // Database access
  database: DatabaseAdapter;
  
  // Authentication data
  auth?: {
    userId: string;
    roles: string[];
    metadata?: Record<string, unknown>;
  };
  
  // Plugin data
  plugins: Record<string, PluginData>;
  
  // Custom context data
  [key: string]: unknown;
}
\`\`\`

### Context Extensions

Plugins can extend the context with additional data:

\`\`\`typescript
const contextPlugin: C15TPlugin = {
  id: 'context-plugin',
  name: 'Context Plugin',
  type: 'core',
  init: () => ({
    context: {
      customData: {
        timestamp: Date.now(),
        requestId: generateId(),
      },
    },
  }),
};
\`\`\`

Learn more about plugins in [Plugin System](./backend/plugins#context-extensions).

## Request Handling

### Request Flow

1. **Request Reception**
   \`\`\`typescript
   const request = new Request('http://localhost:3000/api/c15t/status', {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Origin': 'http://localhost:3000',
     },
   });
   \`\`\`

2. **Request Processing**
   \`\`\`typescript
   const response = await instance.handler(request);
   \`\`\`

3. **Response Generation**
   \`\`\`typescript
   if (response.isOk()) {
     const data = await response.value.json();
     console.log(data);
   } else {
     console.error(response.error);
   }
   \`\`\`

For API endpoint details, see [API Endpoints](./backend/endpoints).

### Request Lifecycle

1. **Pre-processing**
   \`\`\`typescript
   const preProcessed = await instance.preProcess(request);
   \`\`\`

2. **Authentication**
   \`\`\`typescript
   const authenticated = await instance.authenticate(preProcessed);
   \`\`\`

3. **Authorization**
   \`\`\`typescript
   const authorized = await instance.authorize(authenticated);
   \`\`\`

4. **Handler Execution**
   \`\`\`typescript
   const result = await instance.executeHandler(authorized);
   \`\`\`

5. **Post-processing**
   \`\`\`typescript
   const response = await instance.postProcess(result);
   \`\`\`


## Response Processing

### Response Types

\`\`\`typescript
interface C15TResponse<T = unknown> {
  // Response data
  data?: T;
  
  // Response metadata
  metadata?: {
    timestamp: string;
    requestId: string;
    processingTime: number;
  };
  
  // Response status
  status: number;
  
  // Response headers
  headers: Headers;
}
\`\`\`

For API response formats, see [API Endpoints](./backend/endpoints#response-formats).

### Response Formatting

\`\`\`typescript
const formatResponse = (data: unknown): C15TResponse => ({
  data,
  metadata: {
    timestamp: new Date().toISOString(),
    requestId: generateId(),
    processingTime: Date.now() - startTime,
  },
  status: 200,
  headers: new Headers({
    'Content-Type': 'application/json',
  }),
});
\`\`\`

## Error Handling

### Error Types

\`\`\`typescript
// Authentication errors
class AuthenticationError extends DoubleTieError {
  constructor(message: string) {
    super(message, 401);
  }
}

// Authorization errors
class AuthorizationError extends DoubleTieError {
  constructor(message: string) {
    super(message, 403);
  }
}

// Validation errors
class ValidationError extends DoubleTieError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 400, details);
  }
}

// Database errors
class DatabaseError extends DoubleTieError {
  constructor(message: string) {
    super(message, 500);
  }
}
\`\`\`

For error handling in plugins, see [Plugin System](./backend/plugins#error-handling).

### Error Handling

\`\`\`typescript
try {
  const response = await instance.handler(request);
} catch (error) {
  if (error instanceof AuthenticationError) {
    // Handle authentication errors
  } else if (error instanceof AuthorizationError) {
    // Handle authorization errors
  } else if (error instanceof ValidationError) {
    // Handle validation errors
  } else if (error instanceof DatabaseError) {
    // Handle database errors
  } else {
    // Handle unexpected errors
  }
}
\`\`\`

## Middleware System

### Middleware Types

1. **Request Middleware**
   \`\`\`typescript
   const requestMiddleware = async (request: Request, ctx: C15TContext) => {
     // Modify request
     return { request };
   };
   \`\`\`

2. **Response Middleware**
   \`\`\`typescript
   const responseMiddleware = async (response: Response, ctx: C15TContext) => {
     // Modify response
     return { response };
   };
   \`\`\`

3. **Error Middleware**
   \`\`\`typescript
   const errorMiddleware = async (error: Error, ctx: C15TContext) => {
     // Handle error
     return { error };
   };
   \`\`\`

Learn more about middleware in [Plugin System](./backend/plugins#middleware-plugins).

### Middleware Chain

\`\`\`typescript
const middlewareChain = [
  requestMiddleware,
  authMiddleware,
  validationMiddleware,
  responseMiddleware,
];

const result = await middlewareChain.reduce(
  async (acc, middleware) => middleware(acc, ctx),
  request
);
\`\`\`

## Event System

### Event Types

\`\`\`typescript
interface C15TEvent {
  type: string;
  data: unknown;
  timestamp: string;
  metadata?: Record<string, unknown>;
}
\`\`\`

### Event Handling

\`\`\`typescript
const eventHandler = async (event: C15TEvent) => {
  switch (event.type) {
    case 'request.received':
      // Handle request received
      break;
    case 'response.sent':
      // Handle response sent
      break;
    case 'error.occurred':
      // Handle error occurred
      break;
  }
};
\`\`\`

### Event Emission

\`\`\`typescript
const emitEvent = async (type: string, data: unknown) => {
  const event: C15TEvent = {
    type,
    data,
    timestamp: new Date().toISOString(),
  };
  await eventHandler(event);
};
\`\`\`

## Testing

### Test Utilities

\`\`\`typescript
import { createTestInstance, createTestRequest } from '@c15t/backend/testing';

describe('Core Functionality', () => {
  it('should handle requests', async () => {
    const instance = createTestInstance();
    const request = createTestRequest({
      url: 'http://localhost:3000/api/c15t/status',
      method: 'GET',
    });
    
    const response = await instance.handler(request);
    expect(response.status).toBe(200);
  });
});
\`\`\`

### Mock Context

\`\`\`typescript
import { createMockContext } from '@c15t/backend/testing';

const ctx = createMockContext({
  database: mockDatabase,
  auth: {
    userId: 'test-user',
    roles: ['admin'],
  },
});
\`\`\`

## Performance Optimization

### Caching

\`\`\`typescript
const cache = new Map<string, unknown>();

const getCachedData = async (key: string) => {
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  const data = await fetchData();
  cache.set(key, data);
  return data;
};
\`\`\`

For database performance, see [Database Adapters](./backend/database-adapters#performance-considerations).

### Connection Pooling

\`\`\`typescript
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
});

const getConnection = async () => {
  return await pool.connect();
};
\`\`\`

### Request Batching

\`\`\`typescript
const batchRequests = async (requests: Request[]) => {
  return await Promise.all(
    requests.map(request => instance.handler(request))
  );
};
\`\`\`


```

# backend/database-adapters.mdx

```mdx
---
title: Database Adapters
description: Comprehensive guide to the database adapter system in c15t Backend, covering available adapters, query interface, and performance considerations.
---

The c15t Backend package provides a flexible database adapter system that allows you to use different database backends while maintaining a consistent interface.

## Overview

Database adapters provide a standardized way to interact with different database systems. Each adapter implements the `DatabaseAdapter` interface:

\`\`\`typescript
interface DatabaseAdapter {
  create: <T extends Record<string, unknown>>(table: string, data: T) => Promise<T>;
  find: <T extends Record<string, unknown>>(table: string, query: Query) => Promise<T[]>;
  update: <T extends Record<string, unknown>>(table: string, query: Query, data: Partial<T>) => Promise<T>;
  delete: (table: string, query: Query) => Promise<void>;
}
\`\`\`

## Available Adapters

### Memory Adapter

The memory adapter is perfect for development and testing. It stores data in memory and is reset when the application restarts.

\`\`\`typescript
import { memoryAdapter } from '@c15t/backend/db/adapters/memory';

const instance = c15tInstance({
  baseURL: 'http://localhost:3000',
  database: memoryAdapter({}),
});
\`\`\`

#### Features
- In-memory storage
- No persistence
- Fast for development
- Automatic cleanup

### Kysely Adapter

The Kysely adapter provides type-safe SQL query building with support for multiple databases.

\`\`\`typescript
import { kyselyAdapter } from '@c15t/backend/db/adapters/kysely';

const instance = c15tInstance({
  baseURL: 'http://localhost:3000',
  database: kyselyAdapter({
    dialect: 'postgres',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'c15t',
      user: 'postgres',
      password: 'password',
    },
  }),
});
\`\`\`

#### Supported Databases
- PostgreSQL
- MySQL
- SQLite
- Microsoft SQL Server

#### Features
- Type-safe queries
- Query building
- Transaction support
- Connection pooling

### Prisma Adapter

The Prisma adapter integrates with Prisma ORM for type-safe database access.

\`\`\`typescript
import { prismaAdapter } from '@c15t/backend/db/adapters/prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const instance = c15tInstance({
  baseURL: 'http://localhost:3000',
  database: prismaAdapter({ client: prisma }),
});
\`\`\`

#### Features
- Prisma ORM integration
- Type safety
- Schema management
- Migration support

### Drizzle Adapter

The Drizzle adapter provides integration with Drizzle ORM.

\`\`\`typescript
import { drizzleAdapter } from '@c15t/backend/db/adapters/drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgres://user:password@localhost:5432/c15t',
});

const db = drizzle(pool);

const instance = c15tInstance({
  baseURL: 'http://localhost:3000',
  database: drizzleAdapter({ client: db }),
});
\`\`\`

#### Features
- Drizzle ORM integration
- Type safety
- Schema management
- Query building

## Creating Custom Adapters

You can create custom adapters by implementing the `DatabaseAdapter` interface:

\`\`\`typescript
class CustomAdapter implements DatabaseAdapter {
  async create<T extends Record<string, unknown>>(
    table: string,
    data: T
  ): Promise<T> {
    // Implementation
  }

  async find<T extends Record<string, unknown>>(
    table: string,
    query: Query
  ): Promise<T[]> {
    // Implementation
  }

  async update<T extends Record<string, unknown>>(
    table: string,
    query: Query,
    data: Partial<T>
  ): Promise<T> {
    // Implementation
  }

  async delete(table: string, query: Query): Promise<void> {
    // Implementation
  }
}
\`\`\`

## Query Interface

The query interface is consistent across all adapters:

\`\`\`typescript
interface Query {
  where?: Record<string, unknown>;
  orderBy?: Record<string, 'asc' | 'desc'>;
  limit?: number;
  offset?: number;
  include?: Record<string, boolean>;
}
\`\`\`

### Example Queries

\`\`\`typescript
// Find with conditions
const users = await adapter.find('users', {
  where: { active: true },
  orderBy: { createdAt: 'desc' },
  limit: 10,
});

// Update with conditions
const updated = await adapter.update(
  'users',
  { where: { id: '123' } },
  { name: 'New Name' }
);

// Delete with conditions
await adapter.delete('users', { where: { id: '123' } });
\`\`\`

## Transaction Support

Some adapters support transactions:

\`\`\`typescript
// Kysely adapter example
const result = await adapter.transaction(async (trx) => {
  await trx.create('users', { name: 'John' });
  await trx.create('profiles', { userId: '123' });
  return 'success';
});
\`\`\`

## Error Handling

Adapters handle errors consistently:

\`\`\`typescript
try {
  const result = await adapter.create('users', data);
} catch (error) {
  if (error instanceof DatabaseError) {
    // Handle database-specific errors
  } else {
    // Handle other errors
  }
}
\`\`\`

## Best Practices

1. **Connection Management**
   \`\`\`typescript
   // Create a single connection pool
   const pool = new Pool({
     max: 20, // Maximum number of connections
     idleTimeoutMillis: 30000,
   });
   \`\`\`

2. **Error Handling**
   \`\`\`typescript
   const adapter = kyselyAdapter({
     dialect: 'postgres',
     connection: {
       // ... connection config
     },
     onError: (error) => {
       // Log errors
       console.error('Database error:', error);
     },
   });
   \`\`\`

3. **Query Optimization**
   \`\`\`typescript
   // Use indexes
   await adapter.create('users', {
     email: 'user@example.com',
     // Add indexed fields
   });

   // Use appropriate query conditions
   const users = await adapter.find('users', {
     where: { email: { $like: '%@example.com' } },
     limit: 100,
   });
   \`\`\`

## Migration Support

Adapters that support migrations provide methods for managing database schema:

\`\`\`typescript
// Kysely adapter example
const migrations = await adapter.getMigrations();
await adapter.runMigrations(migrations);
\`\`\`

## Performance Considerations

1. **Connection Pooling**
   - Configure appropriate pool size
   - Monitor connection usage
   - Handle connection errors

2. **Query Optimization**
   - Use indexes
   - Limit result sets
   - Optimize join operations

3. **Caching**
   - Implement caching where appropriate
   - Use appropriate cache invalidation
   - Monitor cache hit rates

## Security

1. **Input Validation**
   \`\`\`typescript
   // Validate input before database operations
   const validatedData = validateUserInput(data);
   await adapter.create('users', validatedData);
   \`\`\`

2. **SQL Injection Prevention**
   - Use parameterized queries
   - Validate input
   - Escape special characters

3. **Access Control**
   - Implement row-level security
   - Use appropriate database roles
   - Monitor access patterns

## Monitoring and Debugging

1. **Query Logging**
   \`\`\`typescript
   const adapter = kyselyAdapter({
     dialect: 'postgres',
     connection: {
       // ... connection config
     },
     debug: true, // Enable query logging
   });
   \`\`\`

2. **Performance Monitoring**
   - Track query execution time
   - Monitor connection pool usage
   - Log slow queries

3. **Error Tracking**
   - Log database errors
   - Track failed queries
   - Monitor connection issues 
```

# backend/databases/mysql.mdx

```mdx
---
title: MySQL Adapter
description: The MySQL adapter provides integration with MySQL and MariaDB, widely-used relational database systems known for reliability, performance, and broad compatibility.
---
## Installation

Install the MySQL adapter and its dependencies:

\`\`\`package-install
@c15t/backend-mysql mysql2 @types/mysql2
\`\`\`

## Configuration

Configure the MySQL adapter with your connection details:

\`\`\`typescript
import { c15tInstance } from '@c15t/backend';
import { mysqlAdapter } from '@c15t/backend/db/adapters/mysql';

const instance = c15tInstance({
  baseURL: 'http://localhost:3000',
  database: mysqlAdapter({
    // Connection string approach
    connectionString: 'mysql://username:password@localhost:3306/c15t',
    
    // Or detailed configuration
    connection: {
      host: 'localhost',
      port: 3306,
      database: 'c15t',
      user: 'root',
      password: 'password',
      ssl: false, // Set to true for SSL connections
      charset: 'utf8mb4', // Full Unicode support
    },
    
    // Connection pool configuration
    pool: {
      min: 2,
      max: 10,
      idleTimeoutMillis: 30000
    },
    
    // Query logging (for development)
    debug: process.env.NODE_ENV !== 'production',
    
    // Use MySQL 8+ features (default: true)
    useModernFeatures: true,
  }),
});
\`\`\`

## Schema Management

Initialize your database schema:

\`\`\`typescript
const createSchema = async (db) => {
  await db.raw(`
    CREATE TABLE IF NOT EXISTS users (
      id CHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    
    CREATE TABLE IF NOT EXISTS consents (
      id CHAR(36) PRIMARY KEY,
      user_id CHAR(36) NOT NULL,
      purpose VARCHAR(255) NOT NULL,
      granted BOOLEAN NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      metadata JSON,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    
    CREATE INDEX idx_consents_user_id ON consents(user_id);
    CREATE INDEX idx_consents_purpose ON consents(purpose);
  `);
};

// Use in initialization
const instance = c15tInstance({
  database: mysqlAdapter({
    connection: {
      host: 'localhost',
      port: 3306,
      database: 'c15t',
      user: 'root',
      password: 'password',
    },
    onInit: createSchema,
  }),
});
\`\`\`

## Usage Examples

### Basic CRUD Operations

\`\`\`typescript
// Create a new record
const user = await instance.database.create('users', {
  id: crypto.randomUUID(),
  name: 'John Doe',
  email: 'john@example.com'
});

// Find records
const users = await instance.database.find('users', {
  where: { email: { $like: '%@example.com' } },
  orderBy: { created_at: 'desc' },
  limit: 10,
  offset: 20
});

// Update a record
const updatedUser = await instance.database.update(
  'users',
  { where: { id: user.id } },
  { name: 'John Smith' }
);

// Delete a record
await instance.database.delete('users', { where: { id: user.id } });
\`\`\`

### Transactions

\`\`\`typescript
await instance.database.transaction(async (trx) => {
  // All operations in this function use the same transaction
  const user = await trx.create('users', {
    id: crypto.randomUUID(),
    name: 'Alice Johnson',
    email: 'alice@example.com'
  });
  
  await trx.create('consents', {
    id: crypto.randomUUID(),
    user_id: user.id,
    purpose: 'marketing',
    granted: true,
    metadata: JSON.stringify({ source: 'website', campaign: 'summer2023' })
  });
  
  // Transaction automatically commits unless an error is thrown
});
\`\`\`

### Advanced Queries

\`\`\`typescript
// JSON filtering (MySQL 8+)
const users = await instance.database.find('consents', {
  where: {
    $raw: "JSON_EXTRACT(metadata, '$.source') = ?",
    $params: ['website']
  }
});

// Raw SQL for complex queries
const stats = await instance.database.raw(`
  SELECT 
    purpose, 
    COUNT(*) as total_count,
    SUM(IF(granted, 1, 0)) as granted_count
  FROM consents
  GROUP BY purpose
  ORDER BY total_count DESC
`);
\`\`\`

### Using MySQL-Specific Features

\`\`\`typescript
// JSON operations (MySQL 8+)
await instance.database.update(
  'consents',
  { where: { id: 'some-uuid' } },
  {
    metadata: {
      $raw: "JSON_SET(metadata, '$.preferences', ?)",
      $params: [JSON.stringify({ email: true, sms: false })]
    }
  }
);

// Full-text search (requires FULLTEXT index)
const searchResults = await instance.database.find('users', {
  where: {
    $raw: "MATCH(name, email) AGAINST(? IN BOOLEAN MODE)",
    $params: ['john email']
  }
});
\`\`\`

## Performance Optimization

\`\`\`typescript
// Create optimized indexes
await instance.database.raw(`
  -- Standard index for lookups
  CREATE INDEX idx_users_email ON users(email);
  
  -- Fulltext index for search
  CREATE FULLTEXT INDEX idx_users_fulltext ON users(name, email);
`);

// Set server variables
await instance.database.raw(`
  SET GLOBAL innodb_buffer_pool_size = 1073741824; -- 1GB
  SET GLOBAL max_connections = 200;
`);
\`\`\`

## Best Practices

- **Use InnoDB tables** for transactions and foreign key support
- **Set appropriate character sets** (utf8mb4 recommended for full Unicode support)
- **Configure connection pooling** for efficient resource management
- **Create proper indexes** on frequently queried columns
- **Use prepared statements** to prevent SQL injection (handled automatically)
- **Consider table partitioning** for very large tables
- **Regularly optimize tables** for performance maintenance

## Monitoring and Management

\`\`\`typescript
// Check database health
const health = await instance.database.raw(`
  SELECT 
    DATABASE() AS database,
    VERSION() AS version,
    @@character_set_database AS charset,
    @@collation_database AS collation
`);

// Monitoring query performance
const slowQueries = await instance.database.raw(`
  SELECT query, count_star, sum_timer_wait
  FROM performance_schema.events_statements_summary_by_digest
  ORDER BY sum_timer_wait DESC
  LIMIT 10
`);
\`\`\`

## Limitations

- JSON support is less powerful than PostgreSQL (especially in MySQL 5.7)
- Requires a running MySQL/MariaDB server
- Default isolation level may differ from other databases
- Some ALTER TABLE operations require table rebuilds

## Related Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [MariaDB Documentation](https://mariadb.com/kb/en/documentation/)
- [mysql2 GitHub Repository](https://github.com/sidorares/node-mysql2)
- [Database Adapter Interface](/backend/database-adapters)
- [Core Concepts](/backend/core-concepts)
```

# backend/databases/postgres.mdx

```mdx
---
title: PostgreSQL Adapter
description: The PostgreSQL adapter provides integration with PostgreSQL, a powerful, open-source relational database system known for reliability, feature robustness, and performance.
---
## Installation

Install the PostgreSQL adapter and its dependencies:

\`\`\`package-install
@c15t/backend-postgres pg @types/pg
\`\`\`

## Configuration

Configure the PostgreSQL adapter with your connection details:

\`\`\`typescript
import { c15tInstance } from '@c15t/backend';
import { postgresAdapter } from '@c15t/backend/db/adapters/postgres';

const instance = c15tInstance({
  baseURL: 'http://localhost:3000',
  database: postgresAdapter({
    // Connection string approach
    connectionString: 'postgresql://username:password@localhost:5432/c15t',
    
    // Or detailed configuration
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'c15t',
      user: 'postgres',
      password: 'password',
      ssl: false, // Set to true for SSL connections
    },
    
    // Connection pool configuration
    pool: {
      min: 2,
      max: 10,
      idleTimeoutMillis: 30000
    },
    
    // Query logging (for development)
    debug: process.env.NODE_ENV !== 'production',
    
    // Schema to use (default: public)
    schema: 'public',
  }),
});
\`\`\`

## Schema Management

Initialize your database schema:

\`\`\`typescript
const createSchema = async (db) => {
  await db.raw(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS consents (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      purpose TEXT NOT NULL,
      granted BOOLEAN NOT NULL,
      timestamp TIMESTAMPTZ DEFAULT NOW(),
      metadata JSONB
    );
    
    CREATE INDEX IF NOT EXISTS idx_consents_user_id ON consents(user_id);
    CREATE INDEX IF NOT EXISTS idx_consents_purpose ON consents(purpose);
  `);
};

// Use in initialization
const instance = c15tInstance({
  database: postgresAdapter({
    connectionString: 'postgresql://username:password@localhost:5432/c15t',
    onInit: createSchema,
  }),
});
\`\`\`

## Usage Examples

### Basic CRUD Operations

\`\`\`typescript
// Create a new record
const user = await instance.database.create('users', {
  name: 'John Doe',
  email: 'john@example.com'
  // id and created_at will be auto-generated
});

// Find records with powerful filtering
const users = await instance.database.find('users', {
  where: { email: { $like: '%@example.com' } },
  orderBy: { created_at: 'desc' },
  limit: 10,
  offset: 20
});

// Update a record
const updatedUser = await instance.database.update(
  'users',
  { where: { id: user.id } },
  { name: 'John Smith' }
);

// Delete a record
await instance.database.delete('users', { where: { id: user.id } });
\`\`\`

### Transactions

\`\`\`typescript
await instance.database.transaction(async (trx) => {
  // All operations in this function use the same transaction
  const user = await trx.create('users', {
    name: 'Alice Johnson',
    email: 'alice@example.com'
  });
  
  await trx.create('consents', {
    user_id: user.id,
    purpose: 'marketing',
    granted: true,
    metadata: { source: 'website', campaign: 'summer2023' }
  });
  
  // Transaction automatically commits unless an error is thrown
});
\`\`\`

### Advanced Queries

\`\`\`typescript
// JSON filtering (PostgreSQL specific)
const users = await instance.database.find('consents', {
  where: {
    'metadata->source': 'website',
    'metadata->campaign': 'summer2023'
  }
});

// Raw SQL for complex queries
const stats = await instance.database.raw(`
  SELECT 
    purpose, 
    COUNT(*) as total_count,
    SUM(CASE WHEN granted THEN 1 ELSE 0 END) as granted_count
  FROM consents
  GROUP BY purpose
  ORDER BY total_count DESC
`);
\`\`\`

### Using PostgreSQL-Specific Features

\`\`\`typescript
// JSONB operations
await instance.database.update(
  'consents',
  { where: { id: 'some-uuid' } },
  {
    metadata: {
      $query: 'jsonb_set(metadata, \'{preferences}\', $1)',
      $params: ['{"email":true,"sms":false}']
    }
  }
);

// Full-text search
const searchResults = await instance.database.find('users', {
  where: {
    $raw: 'to_tsvector(name || \' \' || email) @@ to_tsquery($1)',
    $params: ['john & email']
  }
});
\`\`\`

## Performance Optimization

\`\`\`typescript
// Create optimized indexes
await instance.database.raw(`
  -- B-tree index for exact lookups
  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  
  -- GIN index for JSONB
  CREATE INDEX IF NOT EXISTS idx_consents_metadata ON consents USING GIN (metadata);
  
  -- Partial index for active users
  CREATE INDEX IF NOT EXISTS idx_active_users ON users(created_at) 
  WHERE created_at > NOW() - INTERVAL '30 days';
`);
\`\`\`

## Best Practices

- **Use connection pooling** for efficient resource management
- **Implement database indexes** for frequently queried columns
- **Use transactions** for operations that must succeed or fail together
- **Consider using prepared statements** for repetitive queries (handled automatically)
- **Leverage PostgreSQL-specific features** like JSON/JSONB, array types, and full-text search
- **Regularly VACUUM and ANALYZE** your database for performance maintenance
- **Set appropriate statement timeouts** to prevent long-running queries

## Monitoring and Management

\`\`\`typescript
// Check database health
const health = await instance.database.raw(`
  SELECT 
    current_database() AS database,
    current_setting('server_version') AS version,
    pg_size_pretty(pg_database_size(current_database())) AS size
`);

// Monitoring query performance
const slowQueries = await instance.database.raw(`
  SELECT query, calls, total_time, mean_time
  FROM pg_stat_statements
  ORDER BY total_time DESC
  LIMIT 10
`);
\`\`\`

## Limitations

- Requires a running PostgreSQL server
- More complex setup compared to SQLite
- Connection management adds complexity

## Related Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [node-postgres Documentation](https://node-postgres.com/)
- [Database Adapter Interface](/backend/database-adapters)
- [Core Concepts](/backend/core-concepts)
```

# backend/databases/sqlite.mdx

```mdx
---
title: SQLite Adapter
description: The SQLite adapter provides a lightweight, file-based database solution perfect for small to medium applications, local development, and embedded systems.
---
## Installation

Install the SQLite adapter and its dependencies:

\`\`\`package-install
@c15t/backend-sqlite better-sqlite3 @types/better-sqlite3
\`\`\`

## Configuration

Configure the SQLite adapter with your database file path:

\`\`\`typescript
import { c15tInstance } from '@c15t/backend';
import { sqliteAdapter } from '@c15t/backend/db/adapters/sqlite';

const instance = c15tInstance({
  baseURL: 'http://localhost:3000',
  database: sqliteAdapter({
    // File path for the SQLite database (use :memory: for in-memory database)
    filename: './data/c15t.db',
    
    // Optional: Enable WAL mode for better concurrency (default: true)
    useWAL: true,
    
    // Optional: Set journal mode (default: 'wal')
    journalMode: 'wal', // 'delete', 'truncate', 'persist', 'memory', 'wal', 'off'
    
    // Optional: Enable foreign keys (default: true)
    foreignKeys: true,
    
    // Optional: Set busy timeout in milliseconds (default: 5000)
    busyTimeout: 5000,
    
    // Optional: Initialize schema if not exists
    initSchema: true,
  }),
});
\`\`\`

### In-Memory Database

For testing or development, you can use an in-memory database:

\`\`\`typescript
const instance = c15tInstance({
  database: sqliteAdapter({
    filename: ':memory:',
  }),
});
\`\`\`

## Schema Management

Initialize your database schema:

\`\`\`typescript
const createSchema = async (db) => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at INTEGER DEFAULT (unixepoch())
    );
    
    CREATE TABLE IF NOT EXISTS consents (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      purpose TEXT NOT NULL,
      granted BOOLEAN NOT NULL,
      timestamp INTEGER DEFAULT (unixepoch()),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_consents_user_id ON consents(user_id);
  `);
};

// Use in initialization
const instance = c15tInstance({
  database: sqliteAdapter({
    filename: './data/c15t.db',
    onInit: createSchema,
  }),
});
\`\`\`

## Usage Examples

### Basic CRUD Operations

\`\`\`typescript
// Create a new record
const user = await instance.database.create('users', {
  id: crypto.randomUUID(),
  name: 'John Doe',
  email: 'john@example.com'
});

// Find records
const users = await instance.database.find('users', {
  where: { email: 'john@example.com' },
  orderBy: { created_at: 'desc' },
  limit: 10
});

// Update a record
const updatedUser = await instance.database.update(
  'users',
  { where: { id: user.id } },
  { name: 'John Smith' }
);

// Delete a record
await instance.database.delete('users', { where: { id: user.id } });
\`\`\`

### Transactions

\`\`\`typescript
await instance.database.transaction(async (trx) => {
  // All operations inside use the same transaction
  const user = await trx.create('users', {
    id: crypto.randomUUID(),
    name: 'Alice Johnson',
    email: 'alice@example.com'
  });
  
  await trx.create('consents', {
    id: crypto.randomUUID(),
    user_id: user.id,
    purpose: 'marketing',
    granted: true
  });
  
  // Transaction automatically commits unless an error is thrown
});
\`\`\`

### Advanced Queries

\`\`\`typescript
// Complex where conditions
const users = await instance.database.find('users', {
  where: {
    $or: [
      { name: { $like: '%John%' } },
      { email: { $like: '%@example.com' } }
    ],
    created_at: { $gt: Date.now() - 86400000 } // Last 24 hours
  }
});

// Raw queries for specific needs
const stats = await instance.database.raw(`
  SELECT purpose, COUNT(*) as count
  FROM consents
  WHERE granted = true
  GROUP BY purpose
  ORDER BY count DESC
`);
\`\`\`

## Performance Optimization

\`\`\`typescript
// Enable pragmas for better performance
await instance.database.raw(`
  PRAGMA synchronous = NORMAL;
  PRAGMA cache_size = -64000; -- 64MB
  PRAGMA temp_store = MEMORY;
  PRAGMA mmap_size = 268435456; -- 256MB
`);
\`\`\`

## Backup and Maintenance

\`\`\`typescript
// Backup database
await instance.database.raw(`
  VACUUM INTO '/backup/c15t-backup.db';
`);

// Optimize database
await instance.database.raw(`
  PRAGMA optimize;
  VACUUM;
`);
\`\`\`

## Best Practices

- **Use WAL mode** for better concurrency and performance
- **Create proper indexes** on columns frequently used in WHERE clauses
- **Use transactions** for operations that must be atomic
- **Implement regular backups** using VACUUM INTO
- **Set busy timeout** to handle concurrent access conflicts
- **Use prepared statements** to prevent SQL injection (handled automatically by the adapter)

## Limitations

- Limited concurrency compared to client-server databases
- No built-in user management or access control
- Maximum database size limited to 281 TB (though practical limits are much lower)
- Limited support for ALTER TABLE operations

## Related Resources

- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Better-SQLite3 Documentation](https://github.com/WiseLibs/better-sqlite3)
- [Database Adapter Interface](/backend/database-adapters)
- [Core Concepts](/backend/core-concepts)
```

# backend/index.mdx

```mdx
---
title: Getting Started
description: Quick start guide for setting up and using the c15t Backend package, including installation, basic configuration, and common issues.
---

Welcome to c15t Backend! This guide will help you get started with the consent management system.

## Installation

Install the package using your preferred package manager:

\`\`\`package-install
@c15t/backend
\`\`\`

## Basic Usage

Create an instance of c15t:

\`\`\`typescript
import { c15tInstance } from '@c15t/backend';
import { memoryAdapter } from '@c15t/backend/db/adapters/memory';

const instance = c15tInstance({
  baseURL: 'http://localhost:3000',
  database: memoryAdapter({}),
});
\`\`\`

For more details on instance configuration, see [Core Concepts](./backend/core-concepts#instance-management).

## Configuration

### Basic Options

\`\`\`typescript
const instance = c15tInstance({
  baseURL: 'http://localhost:3000',
  database: memoryAdapter({}),
  plugins: [],
  context: {},
});
\`\`\`


### With Plugins

\`\`\`typescript
const instance = c15tInstance({
  baseURL: 'http://localhost:3000',
  database: memoryAdapter({}),
  plugins: [
    authPlugin,
    loggingPlugin,
  ],
});
\`\`\`

Learn more about plugins in the [Plugin System](./plugins) documentation.

## Database Setup

### Memory Adapter (Development)

\`\`\`typescript
import { memoryAdapter } from '@c15t/backend/db/adapters/memory';

const instance = c15tInstance({
  database: memoryAdapter({}),
});
\`\`\`

### Kysely Adapter (Production)

\`\`\`typescript
import { kyselyAdapter } from '@c15t/backend/db/adapters/kysely';

const instance = c15tInstance({
  database: kyselyAdapter({
    dialect: 'postgres',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'c15t',
      user: 'postgres',
      password: 'password',
    },
  }),
});
\`\`\`

For more database options and configuration, see [Database Adapters](./backend/database-adapters).

## Handling Requests

\`\`\`typescript
const request = new Request('http://localhost:3000/api/c15t/status', {
  method: 'GET',
});

const response = await instance.handler(request);
\`\`\`

Learn more about request handling in [Core Concepts](./backend/core-concepts#request-handling).

## Next Steps

1. Learn about [Core Concepts](./backend/core-concepts) to understand the system architecture
2. Explore [Database Adapters](./backend/database-adapters) for different storage options
3. Check out the [Plugin System](./backend/plugins) for extensibility
4. Review [API Endpoints](./backend/endpoints) for available functionality

## Common Issues

### Database Connection Issues

If you're having trouble connecting to the database:
1. Check your connection string
2. Verify database credentials
3. Ensure the database is running
4. Review [Database Adapters](./backend/database-adapters#error-handling) for more details

### Authentication Problems

For authentication issues:
1. Verify your JWT secret
2. Check token expiration
3. Review [Authentication](./backend/authentication#error-handling) documentation

### Plugin Loading

If plugins aren't loading:
1. Check plugin dependencies
2. Verify plugin order
3. Review [Plugin System](./backend/plugins#common-issues) documentation


```

# backend/plugins.mdx

```mdx
---
title: Plugin System
description: Complete guide to the plugin system in c15t Backend, including plugin types, lifecycle hooks, context extensions, and best practices.
---

The c15t Backend plugin system provides a powerful way to extend and customize the functionality of your consent management system. This guide covers everything you need to know about plugins, from basic usage to advanced features.

## Overview

Plugins are modular components that can:
- Extend the context with additional data
- Modify requests and responses
- Add new routes and endpoints
- Provide custom middleware
- Hook into the request lifecycle

## Plugin Types

### Core Plugins
Core plugins are essential system components that provide fundamental functionality:

\`\`\`typescript
const corePlugin: C15TPlugin = {
  id: 'core-plugin',
  name: 'Core Plugin',
  type: 'core',
  init: () => ({
    context: {
      systemInfo: {
        version: '1.0.0',
        environment: process.env.NODE_ENV,
      },
    },
  }),
};
\`\`\`

### Feature Plugins
Feature plugins add specific functionality to your system:

\`\`\`typescript
const featurePlugin: C15TPlugin = {
  id: 'feature-plugin',
  name: 'Feature Plugin',
  type: 'feature',
  init: () => ({
    routes: [
      {
        path: '/api/custom',
        method: 'GET',
        handler: async (request, ctx) => {
          return new Response(JSON.stringify({ message: 'Custom endpoint' }));
        },
      },
    ],
  }),
};
\`\`\`

### Middleware Plugins
Middleware plugins process requests and responses:

\`\`\`typescript
const middlewarePlugin: C15TPlugin = {
  id: 'middleware-plugin',
  name: 'Middleware Plugin',
  type: 'middleware',
  onRequest: async (request, ctx) => {
    // Add request processing
    return { request };
  },
  onResponse: async (response, ctx) => {
    // Add response processing
    return { response };
  },
};
\`\`\`

## Plugin Lifecycle

### Initialization
Plugins are initialized when the c15t instance is created:

\`\`\`typescript
const instance = c15tInstance({
  baseURL: 'http://localhost:3000',
  database: memoryAdapter({}),
  plugins: [
    corePlugin,
    featurePlugin,
    middlewarePlugin,
  ],
});
\`\`\`

### Request Lifecycle
Plugins can hook into various stages of request processing:

\`\`\`typescript
const lifecyclePlugin: C15TPlugin = {
  id: 'lifecycle-plugin',
  name: 'Lifecycle Plugin',
  type: 'middleware',
  onRequest: async (request, ctx) => {
    console.log('Request received');
    return { request };
  },
  onBeforeHandler: async (request, ctx) => {
    console.log('Before handler');
    return { request };
  },
  onAfterHandler: async (response, ctx) => {
    console.log('After handler');
    return { response };
  },
  onResponse: async (response, ctx) => {
    console.log('Response sent');
    return { response };
  },
};
\`\`\`

## Context Extensions

Plugins can extend the context with additional data:

\`\`\`typescript
const contextPlugin: C15TPlugin = {
  id: 'context-plugin',
  name: 'Context Plugin',
  type: 'core',
  init: () => ({
    context: {
      customData: {
        timestamp: Date.now(),
        requestId: generateId(),
      },
    },
  }),
};
\`\`\`

## Custom Routes

Plugins can add custom routes to your API:

\`\`\`typescript
const routePlugin: C15TPlugin = {
  id: 'route-plugin',
  name: 'Route Plugin',
  type: 'feature',
  init: () => ({
    routes: [
      {
        path: '/api/custom',
        method: 'GET',
        handler: async (request, ctx) => {
          const data = await ctx.database.find('custom', {});
          return new Response(JSON.stringify(data));
        },
      },
      {
        path: '/api/custom',
        method: 'POST',
        handler: async (request, ctx) => {
          const data = await request.json();
          const result = await ctx.database.create('custom', data);
          return new Response(JSON.stringify(result));
        },
      },
    ],
  }),
};
\`\`\`

## Error Handling

Plugins can handle errors at different levels:

\`\`\`typescript
const errorPlugin: C15TPlugin = {
  id: 'error-plugin',
  name: 'Error Plugin',
  type: 'middleware',
  onError: async (error, ctx) => {
    console.error('Plugin error:', error);
    return {
      response: new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500 }
      ),
    };
  },
};
\`\`\`

## Plugin Dependencies

Plugins can declare dependencies on other plugins:

\`\`\`typescript
const dependentPlugin: C15TPlugin = {
  id: 'dependent-plugin',
  name: 'Dependent Plugin',
  type: 'feature',
  dependencies: ['core-plugin', 'auth-plugin'],
  init: (ctx) => {
    // Access dependent plugin data
    const coreData = ctx.plugins['core-plugin'].data;
    const authData = ctx.plugins['auth-plugin'].data;
    
    return {
      context: {
        combinedData: {
          ...coreData,
          ...authData,
        },
      },
    };
  },
};
\`\`\`

## Best Practices

1. **Plugin Organization**
   \`\`\`typescript
   // plugins/index.ts
   export const plugins: C15TPlugin[] = [
     corePlugin,
     authPlugin,
     loggingPlugin,
     customPlugin,
   ];
   \`\`\`

2. **Error Handling**
   \`\`\`typescript
   const safePlugin: C15TPlugin = {
     id: 'safe-plugin',
     name: 'Safe Plugin',
     type: 'middleware',
     onRequest: async (request, ctx) => {
       try {
         // Plugin logic
         return { request };
       } catch (error) {
         console.error('Plugin error:', error);
         return { error };
       }
     },
   };
   \`\`\`

3. **Performance Optimization**
   \`\`\`typescript
   const optimizedPlugin: C15TPlugin = {
     id: 'optimized-plugin',
     name: 'Optimized Plugin',
     type: 'middleware',
     onRequest: async (request, ctx) => {
       // Cache expensive operations
       const cacheKey = request.url;
       const cached = await ctx.cache.get(cacheKey);
       if (cached) {
         return { request, cached };
       }
       
       // Perform operation
       const result = await expensiveOperation();
       await ctx.cache.set(cacheKey, result);
       
       return { request, result };
     },
   };
   \`\`\`

## Testing Plugins

### Unit Testing
\`\`\`typescript
describe('Custom Plugin', () => {
  it('should extend context', async () => {
    const plugin = customPlugin;
    const ctx = { context: {} };
    
    const result = await plugin.init(ctx);
    expect(result.context).toHaveProperty('customData');
  });
  
  it('should handle requests', async () => {
    const plugin = customPlugin;
    const request = new Request('http://localhost:3000');
    const ctx = { context: {} };
    
    const result = await plugin.onRequest(request, ctx);
    expect(result.request).toBeDefined();
  });
});
\`\`\`

### Integration Testing
\`\`\`typescript
describe('Plugin Integration', () => {
  it('should work with other plugins', async () => {
    const instance = c15tInstance({
      baseURL: 'http://localhost:3000',
      database: memoryAdapter({}),
      plugins: [plugin1, plugin2],
    });
    
    const request = new Request('http://localhost:3000/api/test');
    const response = await instance.handler(request);
    
    expect(response.status).toBe(200);
  });
});
\`\`\`

## Common Issues

1. **Plugin Order**
   - Plugins are executed in the order they are provided
   - Dependencies should be listed first
   - Core plugins should be initialized before feature plugins

2. **Context Access**
   - Always check for context existence
   - Use optional chaining for nested properties
   - Provide default values when needed

3. **Error Propagation**
   - Handle errors at the appropriate level
   - Log errors for debugging
   - Return appropriate error responses

```

# callbacks.mdx

```mdx
---
title: "Callbacks"
description: "Learn how to use callbacks to respond to consent management events in both JavaScript and React applications."
---

## Overview

Callbacks allow you to execute custom code in response to various consent management events. They provide a way to integrate consent management with your application's logic, analytics, and other features.

## Available Callbacks

The following callbacks are available your the c15t config.

### Callback Reference

- `onError`: Called when an API request fails.
- `onConsentBannerFetched`: Called after successfully fetching the consent banner information.
- `onConsentSet`: Called after successfully setting consent preferences.
- `onConsentVerified`: Called after successfully verifying consent.

### Offline Mode Callbacks

Some callbacks require a call to an endpoint meaning they will not work fully in offline mode.

- `onConsentBannerFetched`: Will always return a simulated response of true, unless consent is in local storage.
- `onConsentSet`: Stores consent in local storage.
- `onConsentVerified`: Will always return a simulated response of true, unless consent is in local storage.



## Usage Examples

\`\`\`typescript
import { configureConsentManager, type ConsentManagerOptions } from 'c15t';

const c15tConfig: ConsentManagerOptions = {
  // ...
  callbacks: {
    onConsentSet: ({ data }) => {
      if (data.preferences.measurement) {
        // Add your scripts here to enable analytics
      }
    }
  }
};
\`\`\`

## Callback Response Types

Callback responses are always of type `ResponseContext<T>`. 

<auto-type-table path="../node_modules/c15t/src/client/types.ts" name="ResponseContext" />

### onConsentSet Data

The `onConsentSet` callback receives consent preference details:

<auto-type-table path="../node_modules/c15t/src/client/client-interface.ts" name="ConsentSetCallbackPayload" />

### onConsentVerified Data

The `onConsentVerified` callback receives verification results:

<auto-type-table path="../node_modules/c15t/src/client/client-interface.ts" name="ConsentVerifiedCallbackPayload" />

### onConsentBannerFetched Data

The `onConsentBannerFetched` callback receives banner information:

<auto-type-table path="../node_modules/c15t/src/client/client-interface.ts" name="ConsentBannerFetchedCallbackPayload" />

```

# components/react/consent-manager-dialog.mdx

```mdx
---
title: Consent Manager Dialog
description: An accessible, animated modal interface that wraps the Consent Manager Widget for a focused privacy customization experience.
---
import { LayersIcon, CookieIcon, ToggleRightIcon } from 'lucide-react';
import DialogExample from '~/examples/react/dialog';

The Consent Manager Dialog provides a clean, focused way for users to customize their privacy preferences. Think of it as a spotlight that dims the rest of your application while users make important privacy decisions. When users click "Customize" on your cookie banner, this dialog smoothly appears with detailed privacy controls.

<DialogExample  />

## How It Works

The dialog acts as a wrapper around the Consent Manager Widget, adding several key features:
1. A smooth fade-in animation that draws attention to privacy settings
2. An overlay that dims the rest of the application
3. Proper focus management for accessibility
4. Automatic portal rendering to avoid layout issues
5. Smart handling of mounting and unmounting

Let's explore how to implement this in your application.

## Quick Start

First, install the package if you haven't already:

{/* \`\`\`package-install
@c15t/react
\`\`\` */}

Then add the dialog to your application:

\`\`\`tsx
import {
	ConsentManagerDialog,
	ConsentManagerProvider,
} from "@c15t/react";

function App() {
  return (
    <ConsentManagerProvider>
      <YourApp />
      <ConsentManagerDialog />
    </ConsentManagerProvider>
  )
}
\`\`\`

The dialog will automatically:
- Mount itself correctly in the DOM
- Handle animations smoothly
- Manage focus when opened
- Maintain accessibility standards

## Understanding Animations

The dialog uses thoughtful animations to create a polished user experience. When opened, it:
1. Fades in an overlay to dim the background
2. Scales and fades in the dialog content
3. Smoothly reverses these animations when closing

You can control this behavior with the `disableAnimation` prop:

\`\`\`tsx
// Disable animations if needed
<ConsentManagerDialog disableAnimation />
\`\`\`

## Customizing Appearance

The dialog supports two main approaches to styling:

### Using Themes

Apply custom styles through the theme prop:

\`\`\`tsx
<ConsentManagerDialog
  theme={{
    "widget.root": "",
	  "widget.branding": "",
	  "widget.footer": "",
	  "widget.footer.sub-group": "",
		"widget.footer.reject-button": "",
		"widget.footer.accept-button": "",
		"widget.footer.customize-button": "",
		"widget.footer.save-button": "",
		"widget.accordion": "",
		"widget.accordion.trigger": "",
		"widget.accordion.trigger-inner": "",
		"widget.accordion.item": "",
		"widget.accordion.icon": "",
		"widget.accordion.arrow.open": "",
		"widget.accordion.arrow.close": "",
		"widget.accordion.content": "",
		"widget.accordion.content-inner": "",
		"widget.switch": "",
		"widget.switch.track": "",
		"widget.switch.thumb": "",
		"widget.dialog": "",
		"widget.dialog.root": "",
		"widget.dialog.header": "",
		"widget.dialog.title": "",
		"widget.dialog.description": "",
		"widget.dialog.content": "",
		"widget.dialog.footer": "",
		"widget.overlay": "",
  }}
/>
\`\`\`

### Removing Default Styles

For complete styling control, disable the default styles:

\`\`\`tsx
<ConsentManagerDialog noStyle />
\`\`\`

This gives you a blank canvas to build upon while maintaining the dialog's functionality.

## Integration Examples

### With Custom Trigger Button

\`\`\`tsx
function PrivacyCenter() {
  const consentManager = useConsentManager()
  
  return (
    <button
      onClick={() => consentManager.setIsPrivacyDialogOpen(true)}
      className="privacy-button"
    >
      Privacy Settings
    </button>
  )
}
\`\`\`

## Accessibility Features

The dialog implements several accessibility best practices:

### Focus Management
When the dialog opens, it:
1. Traps focus within the dialog
2. Sets initial focus on the first interactive element
3. Remembers and restores the previous focus position when closed

### Focus Trapping

The dialog implements focus trapping to ensure keyboard navigation remains within the dialog while it's open. This is crucial for:

- **Keyboard users**: Prevents users from accidentally interacting with content hidden behind the modal
- **Screen reader users**: Maintains proper context and prevents confusion
- **WCAG compliance**: Supports 2.4.3 Focus Order and provides proper modal functionality

#### How Focus Trapping Works

The `ConsentManagerDialog` uses the `useFocusTrap` hook internally to:

1. Capture the element that had focus before the dialog opened
2. Set initial focus to the first interactive element inside the dialog
3. Keep focus cycling within the dialog when users press Tab or Shift+Tab
4. Restore focus to the original element when the dialog closes

You can control focus trapping with the `trapFocus` prop:

\`\`\`tsx
// Default behavior (recommended for accessibility)
<ConsentManagerDialog trapFocus={true} />

// Disable focus trapping (not recommended)
<ConsentManagerDialog trapFocus={false} />
\`\`\`

<Callout type="info">
  Focus trapping is enabled by default and is recommended for WCAG compliance. Only disable it if you have a specific reason and are implementing alternative accessibility measures.
</Callout>

### Keyboard Navigation
Users can:
- Close the dialog with the Escape key
- Navigate controls with Tab
- Interact with all elements using only the keyboard

### Screen Readers
The dialog announces itself appropriately with:
- Proper ARIA roles and attributes
- Clear labeling of controls
- Status updates when opened/closed

## Technical Details

### Portal Rendering

The dialog uses React's createPortal to render outside your main application hierarchy. This ensures:
- No CSS specificity conflicts
- Proper stacking context
- Clean DOM structure

### Client-side Only

To prevent hydration issues, the dialog only renders on the client side. This is handled automatically through the `isMounted` state.

## API Reference

### Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| theme | ConsentManagerWidgetTheme | Theme configuration | {} |
| disableAnimation | boolean | Turns off animations | false |
| noStyle | boolean | Removes default styles | false |

### Theme Properties

| Property | Purpose | Example Value |
|----------|---------|---------------|
| dialog | Main dialog container | "fixed inset-0" |
| overlay | Background overlay | "bg-black/50" |
| content | Dialog content wrapper | "bg-white p-4" |

## Best Practices

1. **Performance**
   - Only import the dialog where needed
   - Consider lazy loading if not immediately required
   - Use the disableAnimation prop on lower-end devices

2. **User Experience**
   - Keep the dialog focused on privacy settings
   - Provide clear save/cancel actions
   - Maintain consistent styling with your application

3. **Accessibility**
   - Test with keyboard navigation
   - Verify screen reader announcements
   - Ensure sufficient color contrast

## Related Components

<Cards>
  <Card 
    icon={<CookieIcon />}
    title="Cookie Banner"
    description="The friendly first-touch privacy notice that greets users. Customizable, accessible, and designed to get out of the way."
    href="/docs/components/react/cookie-banner"
  />
  <Card 
    icon={<ToggleRightIcon />}
    title="Consent Manager Widget"
    description="The engine that powers granular consent management. Easily embed detailed privacy controls anywhere in your app."
    href="/docs/components/react/consent-manager-widget"
  />
</Cards>

```

# components/react/consent-manager-widget.mdx

```mdx
---
title: Consent Manager Widget
description: A flexible, composable widget for building custom privacy consent interfaces. The widget provides granular control over privacy preferences while handling all the compliance requirements for you.
---
import { LayersIcon, CookieIcon } from 'lucide-react';
import WidgetExample from '~/examples/react/widget';

The Consent Manager Widget serves as the core interface for detailed privacy consent management in your application. While the Cookie Banner handles initial consent, this widget enables users to fine-tune their privacy preferences through an intuitive accordion interface.

<WidgetExample />

## Understanding the Widget

Think of the Consent Manager Widget as a highly customizable form that gives users control over their privacy choices. It organizes different types of data collection and processing into collapsible sections, making it easy for users to understand and manage their consent preferences.

For example, a typical widget might include sections for:
- Essential cookies that keep your site running
- Analytics that help improve user experience
- Marketing features that enable personalized content
- Third-party integrations that enhance functionality

The widget automatically handles the complex task of tracking and storing these preferences while maintaining compliance with privacy regulations.

## Quick Start

First, install the package:

{/* \`\`\`package-install
@c15t/react
\`\`\` */}

Then add the widget to your application:

\`\`\`tsx
import * as ConsentManagerWidget from '@c15t/react/consent-manager-widget'

function PrivacyPreferences() {
  return (
    <ConsentManagerWidget>
      <ConsentManagerWidget.AccordionItems />
      <ConsentManagerWidget.Footer>
        <ConsentManagerWidget.RejectButton>
          Reject All
        </ConsentManagerWidget.RejectButton>
        <ConsentManagerWidget.AcceptAllButton>
          Accept All
        </ConsentManagerWidget.AcceptAllButton>
      </ConsentManagerWidget.Footer>
    </ConsentManagerWidget>
  )
}
\`\`\`

## Component Architecture

The Consent Manager Widget uses a compound component pattern, which means it's built from smaller, specialized components that work together. This approach gives you complete control over the widget's structure and appearance.

Let's break down the main building blocks:

### Root Component
The `ConsentManagerWidget` serves as the container and context provider for all other components:

\`\`\`tsx
<ConsentManagerWidget theme={yourTheme}>
  {/* Child components go here */}
</ConsentManagerWidget>
\`\`\`

### Accordion Interface
The accordion interface organizes privacy preferences into expandable sections:

\`\`\`tsx
<ConsentManagerWidget>
  <ConsentManagerWidget.Accordion>
    <ConsentManagerWidget.AccordionItems />
  </ConsentManagerWidget.Accordion>
</ConsentManagerWidget>
\`\`\`

### Custom Accordion Items
You can create custom sections for specific types of consent:

\`\`\`tsx
<ConsentManagerWidget.Accordion>
  <ConsentManagerWidget.AccordionItem value="analytics">
    <ConsentManagerWidget.AccordionTrigger>
      Analytics Cookies
      <ConsentManagerWidget.AccordionArrow />
    </ConsentManagerWidget.AccordionTrigger>
    <ConsentManagerWidget.AccordionContent>
      <ConsentManagerWidget.Switch name="analytics" />
      We use analytics cookies to understand how you use our website.
    </ConsentManagerWidget.AccordionContent>
  </ConsentManagerWidget.AccordionItem>
</ConsentManagerWidget.Accordion>
\`\`\`

### Action Buttons
The widget includes several pre-built buttons for common actions:

\`\`\`tsx
<ConsentManagerWidget.Footer>
  <ConsentManagerWidget.FooterSubGroup>
    <ConsentManagerWidget.RejectButton>
      Reject All
    </ConsentManagerWidget.RejectButton>
    <ConsentManagerWidget.AcceptAllButton>
      Accept All
    </ConsentManagerWidget.AcceptAllButton>
  </ConsentManagerWidget.FooterSubGroup>
  <ConsentManagerWidget.SaveButton>
    Save Preferences
  </ConsentManagerWidget.SaveButton>
</ConsentManagerWidget.Footer>
\`\`\`

## Customization

The widget supports several ways to customize its appearance and behavior:

### Theme Customization
Apply custom styles using the theme prop:

\`\`\`tsx
<ConsentManagerWidget
  theme={{
    "widget.root": "",
	  "widget.branding": "",
	  "widget.footer": "",
	  "widget.footer.sub-group": "",
		"widget.footer.reject-button": "",
		"widget.footer.accept-button": "",
		"widget.footer.customize-button": "",
		"widget.footer.save-button": "",
		"widget.accordion": "",
		"widget.accordion.trigger": "",
    "widget.accordion.trigger-inner": "",
		"widget.accordion.item": "",
		"widget.accordion.icon": "",
		"widget.accordion.arrow.open": "",
		"widget.accordion.arrow.close": "",
		"widget.accordion.content": "",
		"widget.accordion.content-inner": "",
		"widget.switch": "",
		"widget.switch.track": "",
		"widget.switch.thumb": "",
  }}
/>
\`\`\`

### Custom Layouts
Create completely custom layouts while maintaining functionality:

\`\`\`tsx
<ConsentManagerWidget>
  <YourCustomHeader />
  <ConsentManagerWidget.AccordionItems />
  <YourCustomFooter>
    <ConsentManagerWidget.SaveButton asChild>
      <YourButton variant="primary" />
    </ConsentManagerWidget.SaveButton>
  </YourCustomFooter>
</ConsentManagerWidget>
\`\`\`

### Branding
Control the visibility of c15t.com branding:

\`\`\`tsx
<ConsentManagerWidget hideBranding={true} />
\`\`\`

## Accessibility

The Consent Manager Widget is built with accessibility in mind:

- Proper ARIA attributes for accordion sections
- Keyboard navigation support
- Focus management within the widget
- Screen reader announcements for state changes
- High contrast support for all interactive elements

All these accessibility features work automatically, ensuring all users can effectively manage their privacy preferences.

## API Reference

### Main Component Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| theme | ConsentManagerWidgetTheme | Theme configuration object | {} |
| hideBranding | boolean | Controls c15t.com branding visibility | false |

### Available Sub-components

Each sub-component inherits theme support and provides specific functionality:

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| Accordion | Container for consent options | type, value, onValueChange |
| AccordionItems | Pre-built consent sections | - |
| Switch | Toggle for individual consents | name, value, onChange |
| Footer | Action button container | className, children |
| SaveButton | Saves current preferences | onClick, disabled |

## Integration Examples

### With Custom Components

\`\`\`tsx
import { Button } from 'your-ui-library'

function CustomConsentManager() {
  return (
    <ConsentManagerWidget>
      <YourHeader>Privacy Preferences</YourHeader>
      <ConsentManagerWidget.AccordionItems />
      <ConsentManagerWidget.Footer>
        <ConsentManagerWidget.SaveButton asChild>
          <Button>Update Preferences</Button>
        </ConsentManagerWidget.SaveButton>
      </ConsentManagerWidget.Footer>
    </ConsentManagerWidget>
  )
}
\`\`\`

### With Consent Manager Dialog

\`\`\`tsx
import { ConsentManagerDialog } from '@c15t/react/consent-manager'

function PrivacyCenter() {
  return (
    <ConsentManagerDialog>
      <ConsentManagerWidget theme={dialogTheme} />
    </ConsentManagerDialog>
  )
}
\`\`\`

## Best Practices

1. Place the widget in a dedicated privacy preferences page or dialog
2. Use clear, concise labels for consent options
3. Maintain consistent styling with your application
4. Test the widget across different screen sizes
5. Ensure all interactive elements are keyboard accessible

## Related Components
<Cards>
  <Card 
    icon={<CookieIcon />}
    title="Cookie Banner"
    description="The friendly first-touch privacy notice that greets users. Customizable, accessible, and designed to get out of the way."
    href="/docs/components/react/cookie-banner"
  />
  <Card 
   icon={<LayersIcon />}
    title="Consent Manager Dialog"
    description="A detailed privacy preferences interface that lets users fine-tune their choices. Built with accessibility and usability in mind."
    href="/docs/components/react/consent-manager-dialog"
  />
</Cards>

```

# components/react/cookie-banner.mdx

```mdx
---
title: Cookie Banner
description: A customizable cookie consent banner that handles privacy compliance with zero configuration required.
---
import CookieBannerExample from '~/examples/react/cookie-banner';
import { LayersIcon, ToggleRightIcon } from 'lucide-react';

The Cookie Banner component provides an elegant way to obtain and manage cookie consent from your users. It handles all the complexity of privacy regulations while providing a smooth user experience that integrates naturally with your application.

<CookieBannerExample/>

## Understanding Cookie Consent

Before diving into implementation, let's understand what makes a cookie banner effective. A good cookie banner needs to:

- Inform users about data collection clearly and concisely
- Obtain explicit consent before setting non-essential cookies
- Provide easy ways to accept, reject, or customize preferences
- Remember user choices across sessions
- Meet legal requirements across different jurisdictions

Our Cookie Banner component handles all of these requirements automatically, while remaining fully customizable to match your application's design.

## Quick Start

Let's add a basic cookie banner to your application. First, install the package: 
\`\`\`package-install
@c15t/react
\`\`\`

Then add the banner to your root component:

\`\`\`tsx
import {
	ConsentManagerProvider,
	CookieBanner,
} from "@c15t/react";

function App() {
  return (
    <ConsentManagerProvider>
      <YourApp />
      <CookieBanner />
    </ConsentManagerProvider>
  );
}
\`\`\`

That's it! The banner will automatically:

- Appear on first visit
- Remember user choices
- Handle consent management
- Stay compliant with privacy laws

## Component Architecture

The Cookie Banner uses a compound component pattern, giving you complete control over its structure when needed. Think of it like building blocks – you can use the pre-assembled version, or arrange the pieces yourself for custom layouts.

<Tabs groupId="Version" items={["Recommended", "Expanded"]}>
  <Tab value="Recommended">
  \`\`\`tsx 
import { CookieBanner } from "@c15t/react";

const Banner = () => {
	return (
		<CookieBanner
			title="We value your privacy"
			description="We use cookies to enhance your experience"
		/>
	);
};

\`\`\``
</Tab>
<Tab value="expanded">
\`\`\`tsx
import * as CookieBanner from "@c15t/react/cookie-banner";

const Banner = () => {
	return (
		<CookieBanner.Root>
			<CookieBanner.Card>
				<CookieBanner.Header>
					<CookieBanner.Title>Custom Title</CookieBanner.Title>
					<CookieBanner.Description>Your detailed description here</CookieBanner.Description>
				</CookieBanner.Header>
				<CookieBanner.Footer>
					<CookieBanner.FooterSubGroup>
						<CookieBanner.RejectButton>Decline All</CookieBanner.RejectButton>
						<CookieBanner.CustomizeButton>Preferences</CookieBanner.CustomizeButton>
					</CookieBanner.FooterSubGroup>
					<CookieBanner.AcceptButton>Accept All</CookieBanner.AcceptButton>
				</CookieBanner.Footer>
			</CookieBanner.Card>
		</CookieBanner.Root>
	);
};
\`\`\``

  </Tab>
</Tabs>

## Customization

The Cookie Banner is designed to adapt to your application's visual style. Here are the main ways to customize its appearance:

### Using Themes

Here are the available theme variables:

<auto-type-table path="../../../node_modules/@c15t/react/src/components/cookie-banner/theme.ts" name="CookieBannerTheme" />

The theme prop provides a straightforward way to customize the banner's appearance:

\`\`\`tsx
import { CookieBanner } from "@c15t/react";

const CustomCookieBanner = () => {
  return (
    <CookieBanner
      theme={{
        "banner.root": "",
        "banner.title": "",
        "banner.description": "",
        "banner.footer": "",
        "banner.root": "",
        "banner.card": "",
        "banner.header.root": "",
        "banner.header.title": "",
        "banner.header.description": "",
        "banner.footer": "",
        "banner.footer.sub-group": "",
        "banner.overlay": "",
        "banner.footer.reject-button": "",
        "banner.footer.customize-button": "",
        "banner.footer.accept-button": "",
      }}
    />
  );
};
\`\`\`

### Using CSS Modules

For more traditional styling approaches, you can use CSS modules:

\`\`\`tsx
import { CookieBanner } from "@c15t/react";
import styles from "./cookie-banner.module.css";

const CSSModuleCookieBanner = () => {
  return (
    <CookieBanner
      theme={{
        "banner.root": styles.banner,
        "banner.title": styles.title,
        "banner.description": styles.description,
      }}
    />
  );
};
\`\`\`

### Using Existing Components

You can integrate your own component library using the `asChild` prop:

\`\`\`tsx
import * as CookieBanner from "@c15t/react/cookie-banner";
import { Button } from "./your-components";

const CustomAcceptButton = () => {
  return (
    <CookieBanner.AcceptButton asChild>
      <Button variant="primary">Accept All Cookies</Button>
    </CookieBanner.AcceptButton>
  );
};
\`\`\`

## Scroll Locking

The Cookie Banner supports scroll locking, a technique that prevents users from interacting with your website until they've made a cookie consent choice.

\`\`\`tsx
<CookieBanner 
  lockScroll={true}
/>
\`\`\`

When enabled, scroll locking:
- Prevents page scrolling and interaction
- Displays a background overlay
- Ensures users must make a privacy choice before accessing content

For best results, use scroll locking together with [focus trapping](#focus-trapping) to ensure complete keyboard accessibility.

<Callout>
  For detailed implementation guides, best practices, and compliance considerations, see our [Scroll Locking Guide](/docs/framework/react/guides/scroll-locking).
</Callout>

## Accessibility

The Cookie Banner is built with accessibility in mind:

- Proper ARIA roles and labels (role="dialog", aria-modal="true")
- Keyboard navigation and interaction support
- Focus management and trapping
- Screen reader announcements
- Semantic HTML structure

These features work automatically, ensuring all users can interact with your privacy controls effectively.

### Focus Trapping

The Cookie Banner implements focus trapping when it's displayed, which is an essential accessibility feature that prevents keyboard focus from moving outside the banner. This behavior:

- **Ensures users complete the consent flow** before interacting with other page elements
- **Prevents accidental interaction** with content that shouldn't be accessible yet
- **Helps compliance** with accessibility guidelines like WCAG 2.4.3 (Focus Order)

#### Implementation Details

Focus trapping in the Cookie Banner works through the `CookieBannerCard` component, which:

1. Uses the [`useFocusTrap`](/docs/framework/react/hooks/use-focus-trap) hook internally
2. Automatically sets `tabIndex={0}` on the container
3. Applies proper ARIA attributes (`role="dialog"` and `aria-modal="true"`)
4. Remembers the previously focused element and restores it when closed
5. Cycles focus between interactive elements when Tab is pressed

You can control focus trapping with the `trapFocus` prop:

\`\`\`tsx
// Default behavior (recommended)
<CookieBanner trapFocus={true} />

// Disable focus trapping (use with caution)
<CookieBanner trapFocus={false} />
\`\`\`

<Callout>
  Focus trapping is enabled by default and recommended for accessibility compliance. For more details on implementation and best practices, see our [useFocusTrap hook documentation](/docs/hooks/use-focus-trap).
</Callout>

## Best Practices

Follow these guidelines for optimal implementation:

1. Place the banner at the root level of your application
2. Keep the title and description clear and concise
3. Use the pre-assembled version unless you need custom layouts
4. Test the banner across different screen sizes
5. Ensure your theme maintains sufficient contrast ratios
6. Consider [scroll locking](#scroll-locking) for strict compliance scenarios
7. Test with keyboard navigation to ensure accessibility

## Common Pitfalls

## API Reference

### CookieBanner

The main component accepts these props:

<auto-type-table path="../../../node_modules/@c15t/react/src/components/cookie-banner/cookie-banner.tsx" name="CookieBannerProps" />

### Compound Components

Each compound component is designed for specific functionality:
| Component | Description |
| --- | --- |
| `CookieBanner.Root` | The container component |
| `CookieBanner.Card` | Wrapper for banner content |
| `CookieBanner.Header` | Groups title and description |
| `CookieBanner.Footer` | Contains action buttons |
| `CookieBanner.AcceptButton` | Accepts all cookies |
| `CookieBanner.RejectButton` | Rejects optional cookies |
| `CookieBanner.CustomizeButton` | Opens preference dialog |


## Related Components
<Cards>
  <Card 
   icon={<LayersIcon />}
    title="Consent Manager Dialog"
    description="A detailed privacy preferences interface that lets users fine-tune their choices. Built with accessibility and usability in mind."
    href="/docs/components/react/consent-manager-dialog"
  />
  <Card 
    icon={<ToggleRightIcon />}
    title="Consent Manager Widget"
    description="The engine that powers granular consent management. Easily embed detailed privacy controls anywhere in your app."
    href="/docs/components/react/consent-manager-widget"
  />
</Cards>

```

# components/react/dev-tool.mdx

```mdx
---
title: Dev Tool
description: Monitor and debug your privacy consent management with our development tools, designed to help you build with confidence.
---

Development tools provide real-time insight into how users interact with your privacy consent management system. With live state monitoring, intuitive debugging features, and customizable visualization options, you can ensure your privacy implementation works exactly as intended.

## Understanding Dev Tools

When building privacy-compliant applications, you need visibility into how consent is being managed. Our dev tools let you:

- Watch consent changes in real-time as users interact with your privacy controls
- Inspect the complete consent state at any point in time
- Debug issues by tracking consent management flow
- Validate that your privacy implementation works correctly

Think of it like having a privacy-focused browser dev tools panel - but specifically designed for consent management.

## Adding Dev Tools to Your Project

First, install the development tools package:

{/* \`\`\`package-install
@c15t/dev-tools
\`\`\` */}


Then add the development tools to your application:

\`\`\`tsx
import { C15TDevTools } from '@c15t/dev-tools';

function App() {
  return (
    <>
      <YourApp />
      {process.env.NODE_ENV === 'development' && <C15TDevTools />}
    </>
  )
}
\`\`\`

The dev tools will automatically appear in your application during development. They're designed to be unobtrusive while still providing quick access to important information.


## API Reference

### PrivacyDevTools

The main development tools component accepts these props:

<auto-type-table path="../../../node_modules/@c15t/dev-tools/src/dev-tool.tsx" name="ConsentManagerProviderProps" />


## Development Best Practices

To get the most out of the development tools:

1. Keep dev tools enabled during development and testing
   - They help catch issues early
   - Make debugging more efficient
   - Provide insights into user behavior

2. Use the inspection APIs to validate consent handling
   - Verify consents are saved correctly
   - Check that preferences persist properly
   - Ensure privacy choices are respected

3. Monitor consent flow during testing
   - Track the user journey through consent management
   - Identify potential UX improvements
   - Validate compliance requirements

4. Remove dev tools in production
   \`\`\`tsx
   // Automatically removed in production builds
   {process.env.NODE_ENV === 'development' && <C15TDevTools />}
   \`\`\`

## Security Considerations

When using the development tools, keep in mind:

- Dev tools may expose sensitive user preferences
- Always remove dev tools before deploying to production
- Be cautious when logging consent state
- Consider privacy implications when sharing debug information


## Troubleshooting Common Issues

If you encounter problems:

1. Verify the dev tools are only running in development
2. Check that your privacy components are properly initialized
3. Ensure the consent state namespace matches your configuration
4. Look for error messages in the browser console

Remember, the development tools are here to help you build better privacy experiences. Use them to understand, debug, and improve your consent management implementation.
```

# hooks/use-consent-manager.mdx

```mdx
---
title: useConsentManager
description: The useConsentManager hook provides access to the complete consent management API, allowing you to interact with and control the consent state throughout your application.
---
import UseConsentManagerExample from '~/examples/react/use-consent-manager';

## Usage `useConsentManager`

This example shows the hook being used to re-open the cookie banner once it has been closed. This could be used to re-open the banner after a certain amount of time has passed, or when a user wishes to update their consents for example.

<UseConsentManagerExample/>

## Returns

The hook returns an object containing both state properties and methods for managing consent:

<auto-type-table path="../../node_modules/c15t/src/index.ts" name="PrivacyConsentState" />

## Notes

- The hook must be used within a `ConsentManagerProvider` component
- Throws an error if used outside of a `ConsentManagerProvider`
- All methods are memoized and safe to use in effects or callbacks
- Changes to consent state are automatically persisted
- Supports TypeScript with full type safety

```

# hooks/use-focus-trap.mdx

```mdx
---
title: useFocusTrap
description: The useFocusTrap hook provides accessibility-focused keyboard navigation management, keeping focus trapped within modal components for better user experience.
---
import UseFocusTrapExample from '~/examples/react/use-focus-trap';

The `useFocusTrap` hook creates an accessible experience by preventing keyboard focus from leaving a specific container element (like a dialog or modal) until it's dismissed. This is essential for users navigating with keyboards or screen readers.

## Usage

This example shows how to implement focus trapping in a simple modal component:

<UseFocusTrapExample/>

## Parameters

The hook accepts two parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| shouldTrap | boolean | Controls whether focus should be trapped within the container |
| containerRef | RefObject\<HTMLElement\> \| null | Reference to the DOM element that should contain the focus |

## Returns

This hook doesn't return any values. It works by managing the focus behavior of the DOM through side effects.

## How It Works

When activated, the `useFocusTrap` hook:

1. Stores the element that was focused before trapping began
2. Finds all focusable elements within the container
3. Sets initial focus to the first focusable element (or the container itself)
4. Captures Tab and Shift+Tab keystrokes to cycle focus within the container
5. Restores focus to the original element when the component unmounts or `shouldTrap` becomes false

## Notes

- Hook must be called with a valid element reference that contains focusable elements
- Adding `tabIndex={0}` to the container ensures it can receive focus if no focusable children exist
- Always include proper ARIA attributes (`role="dialog"` and `aria-modal="true"`) for screen reader accessibility
- The hook automatically restores focus to the previously focused element when the component unmounts
- Set `shouldTrap` to false when you want to disable focus trapping temporarily

## Accessibility Compliance

Using this hook helps your application comply with these WCAG 2.1 requirements:

- [2.1.2: No Keyboard Trap](https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html) - While this criterion warns against trapping keyboard focus, modal dialogs are an exception when implemented properly
- [2.4.3: Focus Order](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html) - Ensures focus moves in a meaningful sequence

## Usage with c15t Components

Many c15t components like `CookieBannerCard` and `ConsentManagerDialog` use this hook internally, so you don't need to implement it yourself when using these components. The `trapFocus` prop can be used to control this behavior:

\`\`\`tsx
// The dialog will automatically trap focus when open
<ConsentManagerDialog trapFocus={true} />

// Focus trapping can be disabled if needed
<CookieBannerCard trapFocus={false}>
  {/* Content */}
</CookieBannerCard>
\`\`\`

## Implementation Example

Here's how focus trapping is implemented in the `CookieBannerCard` component:

\`\`\`tsx
const CookieBannerCard = forwardRef(({ children, ...props }, ref) => {
  const { trapFocus } = useTheme();
  const localRef = useRef(null);
  const cardRef = (ref || localRef);
  
  // Convert to boolean and enable focus trapping
  const shouldTrapFocus = Boolean(trapFocus);
  useFocusTrap(shouldTrapFocus, cardRef);
  
  return (
    <Box
      ref={ref}
      tabIndex={0}
      aria-modal={shouldTrapFocus ? 'true' : undefined}
      role={shouldTrapFocus ? 'dialog' : undefined}
      {...props}
    >
      {children}
    </Box>
  );
});
\`\`\` 
```

# index.mdx

```mdx
---
title: Welcome to c15t Docs
description: Find all the guides and resources you need to build your application
---
import { IndexBlock } from "~/components/blocks/index-block";

<IndexBlock/>
```

# introduction.mdx

```mdx
---
title: Introduction to Consent Management (c15t)
description: Transform privacy consent from a compliance checkbox into a fully observable system. Built for modern development teams, c15t unifies analytics, consent tracking, and privacy controls into a single performant solution - no more slow cookie banners or blind spots in user privacy choices.
---

## What is Consent Management?

Consent Management (c15t) is an open-source platform that transforms privacy consent from a compliance checkbox into a fully observable system. Built for modern development teams, it provides a unified solution for:

- Analytics integration
- Consent management
- Privacy controls
- Complete consent state visibility

Gone are the days of:
- Cookie banners slowing down your site
- Blind spots in consent tracking
- Complex multi-vendor implementations 
- Uncertainty about privacy policy changes
- Poor visibility into consent states


## Core Principles

### 1. Open Source First
Building in public isn't just about transparency - it's about creating better tools through community collaboration. Our open-source foundation means you can:

- Inspect and understand the code handling user consent
- Contribute improvements and fixes
- Self-host for complete control
- Trust through transparency

### 2. Developer Experience 
Privacy management should feel natural in your development workflow:

- TypeScript-first APIs with full type safety
- Modern React patterns and hooks
- Intuitive state management
- Comprehensive documentation

### 3. Performance as Standard
Every byte matters. c15t is built with performance in mind:

- Minimal bundle impact
- Efficient state management
- Optimized server/client patterns
- Smart code splitting

### 4. Privacy by Design
Privacy isn't an afterthought - it's a core part of modern web development:

- GDPR-compliant by default
- Granular consent controls
- Complete audit trail
- Privacy-first architecture

## Get Started

Ready to modernize your privacy infrastructure? Choose your path:

<Cards>
  <Card 
    title="Quick Start Guide" 
    description="Set up c15t in your project in under 5 minutes"
    href="/docs/react/quickstart" 
  />
  <Card 
    title="Open Source" 
    description="Contribute to c15t and help build a better privacy infrastructure"
    href="/docs/open-source" 
  />
</Cards>
```

# javascript/api-reference.mdx

```mdx
---
title: API Reference
description: Comprehensive guide to using the c15t package for managing privacy consents.
---

# Core Package API Reference

The core package (`c15t`) provides the fundamental functionality for managing privacy consents in your application. This reference documents the main types, interfaces, and functions available in the package.

## Store API

The core package implements a robust state management system for handling privacy consents. The store provides methods for:

- Managing consent states
- Persisting consent data
- Validating consent configurations

For detailed implementation examples, refer to the [Getting Started](/docs/javascript/quickstart) guide.

## Privacy Consent State

The `PrivacyConsentState` type represents the current state of privacy consents in your application. It contains information about user preferences, consent categories, and their respective settings.

<auto-type-table path="../../node_modules/c15t/src/index.ts" name="PrivacyConsentState" />

## Consent Types

The `ConsentType` type defines the structure of individual consent categories and their properties.

<auto-type-table path="../../node_modules/c15t/src/index.ts" name="ConsentType" />

 ## Translation Configuration

The `defaultTranslationConfig` provides the default translation settings for the consent management interface.

<auto-type-table path="../../node_modules/c15t/src/index.ts" name="TranslationConfig" /> 

## Tracking Blocker Configuration

The `TrackingBlockerConfig` type defines the configuration options for the tracking blocker functionality.

<auto-type-table path="../../node_modules/c15t/src/index.ts" name="TrackingBlockerConfig" />

## Additional Types

### Consent State
<auto-type-table path="../../node_modules/c15t/src/index.ts" name="ConsentState" />

### Compliance Settings
<auto-type-table path="../../node_modules/c15t/src/index.ts" name="ComplianceSettings" />

### Privacy Settings
<auto-type-table path="../../node_modules/c15t/src/index.ts" name="PrivacySettings" />

### Translation Types
<auto-type-table path="../../node_modules/c15t/src/index.ts" name="TranslationConfig" />
<auto-type-table path="../../node_modules/c15t/src/index.ts" name="Translations" />


```

# javascript/meta.json

```json
{
	"title": "JavaScript",
	"icon": "js",
	"root": true,
	"pages": [
		"../introduction",
		"../ai-tools-integrations",
		"--- JavaScript ---",
		"quickstart",
		"../callbacks",
		"api-reference",
		"--- Storing Consent ---",
		"./storing-consent/overview",
		"./storing-consent/hosted-c15t",
		"./storing-consent/offline-mode",
		"./storing-consent/self-hosting",
		"--- Contributing ---",
		"../oss/contributing",
		"../oss/license",
		"../oss/why-open-source"
	]
}

```

# javascript/quickstart.mdx

```mdx
---
title: JavaScript Quickstart
description: Learn how to integrate c15t into your Javacript application with this step-by-step guide. We'll cover installation, configuration, and basic usage.
---

## CLI Setup (Recommended)
<Steps>
<Step>
### Generate Schema + Code

<RunCommand command="@c15t/cli generate" />

</Step>

<Step>
### Run Database Migrations (Optional)

<Callout type="note">
This is only required if you are self hosting c15t.
</Callout>

<RunCommand command="@c15t/cli migrate" />

</Step>
</Steps>

## Manual Setup
<Steps>
<Step>
### Install `c15t` Package
 \`\`\`package-install
 c15t
 \`\`\`
</Step>
 
<Step>
 
### Add to Your JavaScript Application

\`\`\`tsx
import { configureConsentManager, type ConsentManagerOptions } from 'c15t';

export const c15tConfig = {
	mode: 'offline',

	// Optional: Add callback functions for various events
	callbacks: {
		onConsentSet: (response: any) => {
			console.log('Consent has been saved locally');
		},
	},
} satisfies ConsentManagerOptions;

export const consentManager = configureConsentManager(c15tConfig);

\`\`\`

The consent manager is now ready to use. For example: 

\`\`\`tsx
consentManager.setConsent({
  body: {
    type: 'cookie_banner',
    domain: 'localhost',
    preferences: {
      necessary: true,
      marketing: true,
    },
  },
});
\`\`\`

<Callout type="tip">
You can create an instance at [consent.io](https://consent.io) (recommended) or use c15t offline by setting `mode: 'offline'`.
</Callout>
</Step>
</Steps>

--- 

## Hosting Options

### Creating a consent.io Instance (Recommended)

<Callout type="info">
Using consent.io is the recommended method as it is the easiest way to get started and requires little maintenance.
</Callout>

[consent.io](https://consent.io) provides a fully managed consent management service. This is the recommended method as it is the easiest way to get started and requires little maintenance.

<Steps>

<Step>
Sign up for a [consent.io](https://consent.io) account.
</Step>

<Step>
After signing up, create a new instance, located in the top-right corner.

<Callout>
When creating an instance it is important to list all the trusted origins for your application such as "localhost", your production domain, etc.
</Callout>

</Step>

<Step>
After the instance is created, you will be given a backendURL, which you can add to your `ConsentManagerOptions`.

A backend URL might look like this: `https://<my-instance>.c15t.dev/`.
</Step>

</Steps>

### Alternative Storage Options

<Callout type="note">
For more advanced setup options, choose the approach that best suits your requirements.
</Callout>

For more advanced setup options, please refer to:
- [Overview](/docs/storing-consent/overview) - Compare different approaches to storing consent decisions in your application
- [Hosted c15t](/docs/storing-consent/hosted-c15t) - Complete guide to using consent.io
- [Offline Mode](/docs/storing-consent/offline-mode) - Complete guide to using c15t without a backend
- [Custom Client](/docs/storing-consent/custom-client) - Advanced implementation with custom handlers for full control

## Decision Guide

<Callout>
Use this flowchart to determine which c15t configuration is best for your needs.
</Callout>

<Mermaid chart={`
flowchart TD
    Start([Start here]) --> StoreConsent
    
    StoreConsent{Need to store\nconsent choices?}
    StoreConsent -->|Yes| ManagedService
    StoreConsent -->|No| OfflineMode
    
    ManagedService{Want a managed\nservice?}
    ManagedService -->|Yes| ConsentIO
    ManagedService -->|No| CustomClient
    
    OfflineMode([c15t Offline Mode]):::optionStyle
    OfflineMode -.-> OfflineNote[Client-side only\nStores in localStorage]:::noteStyle
    
    ConsentIO([consent.io]):::recommendStyle
    ConsentIO -.-> ConsentIONote[Fully managed\nSimplest setup]:::noteStyle
    
    CustomClient([Custom Client]):::optionStyle
    CustomClient -.-> CustomNote[Full control\nRequires implementation]:::noteStyle
    
    %% Styling
    classDef recommendStyle fill:#4caf50,stroke:#388e3c,color:white,stroke-width:2px;
    classDef optionStyle fill:#37474f,stroke:#263238,color:white,stroke-width:1px;
    classDef noteStyle fill:#424242,stroke:none,color:#aaa,font-size:12px;
`} />

## Next Steps

<Callout type="tip">
Choose your next step based on your specific implementation needs.
</Callout>

<div className="mt-6">
  <CompactCard 
    href="/docs/javascript/storing-consent/hosted-c15t" 
    icon={
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    }
  >
    Learn more about <code>Hosted c15t (consent.io)</code>
  </CompactCard>

  <CompactCard 
    href="/docs/javascript/storing-consent/self-hosting"
    icon={
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
      </svg>
    }
  >
    Learn more about <code>Self-Hosting</code>
  </CompactCard>

  <CompactCard 
    href="/docs/javascript/storing-consent/offline-mode"
    icon={
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L10 10" />
      </svg>
    }
  >
    Learn more about <code>Offline Mode</code>
  </CompactCard>
</div>


```

# javascript/storing-consent/hosted-c15t.mdx

```mdx
---
title: 'Hosted Solution'
description: 'Use consent.io for an easy, managed consent storage solution with minimal setup'
---
import { RiFlashlightLine, RiTimerLine, RiServerLine, RiSettings4Line } from '@remixicon/react';

<Callout type="default">
  <h3>Congratulations, you've chosen the best way to deploy to production!</h3>
  
  consent.io provides a fully managed service that removes all the infrastructure complexity. You can focus on your application while we handle scaling, updates, and compliance monitoring. For organizations with specific requirements, we also offer [self-hosting](/docs/storing-consent/self-hosting) options.
</Callout>

[consent.io](https://consent.io) provides a fully managed consent management service, offering the easiest way to implement robust server-based consent storage with minimal setup and maintenance.

## Key Benefits

- **Zero Backend Maintenance** - No server setup or management required
- **Automatic Updates** - Always running the latest version
- **Built-in Scaling** - Handles traffic spikes without configuration
- **Geographic Detection** - Built-in jurisdiction detection for compliance
- **Analytics Dashboard** - Insights into consent patterns and compliance
- **Cross-Device Sync** - Users maintain consistent consent status across all devices

## Getting Started

<Steps>
<Step>
### Create a consent.io Instance

1. Sign up for a [consent.io](https://consent.io) account
2. Create a new instance in the dashboard
3. Configure your trusted origins (domains that can connect to your instance)
4. Copy the provided backendURL (e.g., `https://your-instance.c15t.dev`)
</Step>

<Step>
### Configure Your Client

Set up your frontend to use the consent.io instance:

\`\`\`tsx
import { configureConsentManager, type ConsentManagerOptions } from 'c15t';

export const c15tConfig = {
	mode: 'c15t',
	backendURL: 'https://your-instance.c15t.dev',
} satisfies ConsentManagerOptions;

export const consentManager = configureConsentManager(c15tConfig);

const showConsentBanner = consentManager.showConsentBanner();
\`\`\`
</Step>

<Step>
### Test Your Integration

1. Run your application
2. Verify the showConsentBanner function returns a response
3. Check the consent.io dashboard to confirm data is being recorded
</Step>
</Steps>

<CompactCard 
  href="/docs/nextjs/quickstart" 
  icon={<RiFlashlightLine size={18} />}
>
  See the <code>Next.js Quickstart Guide</code> for more frontend integration details
</CompactCard>

## Alternative: Self-Hosting

If you need complete control over your consent management infrastructure, you can self-host a c15t instance instead of using consent.io.

<Callout type="warning">
Self-hosting requires more setup and maintenance effort but gives you complete control over your data and infrastructure.
</Callout>

<CompactCard 
  href="/docs/storing-consent/self-hosting" 
  icon={<RiServerLine size={18} />}
>
  See the <code>Self-Hosting Guide</code> for detailed setup instructions
</CompactCard>

## Deployment Options

### Docker Support

<Callout type="warning">
Docker support for c15t is not currently available out-of-the-box. We're interested in adding this feature and would welcome community contributions.
</Callout>

If you're interested in containerizing c15t for Docker deployments:

- We don't currently provide official Docker images or Dockerfiles
- This is on our roadmap but doesn't have a specific timeline
- Community contributions for Docker support would be greatly appreciated
- You can propose Docker implementations through our [GitHub issue](https://github.com/c15t/c15t/issues/162)

Until official Docker support is available, we recommend using one of our existing deployment options:

1. **consent.io (hosted)** - Zero setup, fully managed service
2. **Self-hosting with Next.js API routes** - Integrated into your existing application
3. **Standalone server** - Standard Node.js deployment

## When to Use Hosted c15t

Choose consent.io (hosted c15t) when:

- You want the simplest implementation with minimal backend configuration
- You prefer not to manage database setup and maintenance
- You need geographic jurisdiction detection built-in
- You want automatic updates and scaling

Consider [Offline Mode](/nextjs/storing-consent/offline-mode) for simple applications without cross-device needs, or [Self-Hosting](/nextjs/storing-consent/self-hosting) for complete control.

## Next Steps

<div className="mt-6">
  <CompactCard 
    href="/docs/javascript/storing-consent/offline-mode" 
    icon={<RiTimerLine size={18} />}
  >
    Configure <code>Offline Mode</code>
  </CompactCard>

  <CompactCard 
    href="/docs/javascript/storing-consent/self-hosting" 
    icon={<RiServerLine size={18} />}
  >
    Explore <code>Self-Hosting</code> options
  </CompactCard>


</div>
```

# javascript/storing-consent/offline-mode.mdx

```mdx
---
title: 'Offline Mode'
description: 'Store consent decisions in the browser with offline mode, perfect for sites without backend requirements'
---
import { RiServerLine, RiGlobalLine, RiSettings4Line } from '@remixicon/react';

The offline mode provides a simple, browser-based approach to storing user consent decisions without requiring a backend server.

## Key Characteristics

- **No backend required** - Everything is stored locally in the browser
- **Simplified setup** - Get started quickly with minimal configuration
- **Independence** - Works without external services or APIs
- **Fast implementation** - Ideal for prototyping and simpler sites

## Implementation

<Steps>
<Step>
### Install the Package

\`\`\`package-install
c15t
\`\`\`
</Step>

<Step>
### Configure the Client (Svelte/JavaScript)

Set up the c15t client with offline mode in your Svelte or JavaScript project:

\`\`\`ts
// src/lib/c15t.client.ts
import { configureConsentManager, type ConsentManagerOptions } from 'c15t';

export const c15tConfig = {
  mode: 'offline',
  // Optional: Add callback functions for various events
  callbacks: {
    onConsentSet: (response) => {
      console.log('Consent has been saved locally');
    },
    onConsentBannerFetched: (response) => {
      console.log('Banner state retrieved:', response.data);
    },
    onConsentVerified: (response) => {
      console.log('Consent verification complete');
    },
    onError: (error, endpoint) => {
      console.error(`Error in ${endpoint}:`, error);
    }
  }
} satisfies ConsentManagerOptions;

export const consentManager = configureConsentManager(c15tConfig);
\`\`\`
</Step>

<Step>
### Use the Consent Manager in Your App

You can now use the `consentManager` instance in your Svelte components or JavaScript code:

\`\`\`ts
<script lang="ts">
  import { consentManager } from '../lib/c15t.client';

  // Example: Show the consent banner if needed
  let showBanner = false;

  consentManager.showConsentBanner().then((result) => {
    showBanner = result;
  });
</script>

{#if showBanner}
  <ConsentBanner />
{/if}
\`\`\`
</Step>
</Steps>

## How It Works

<Callout type="note">
Offline mode provides the same API interface as the standard client but operates completely client-side.
</Callout>

The offline mode implements the same interface as the standard client, but with the following differences:

1. **Storage**: All consent preferences are stored in the browser's localStorage using the configured key
2. **Network**: No network requests are made, all operations happen locally
3. **Consent Banner**: The banner visibility is determined by checking if a value exists in localStorage
4. **Consent Verification**: Always returns a successful response

## Configuration Options

The offline mode accepts the following configuration options:

\`\`\`ts
const options = {
  mode: 'offline',
  // Optional: Add callback functions for various events
  callbacks: {
    onConsentBannerFetched: (response) => {
      console.log('Banner state retrieved:', response.data);
    },
    onConsentSet: (response) => {
      console.log('Consent preferences saved');
    },
    onConsentVerified: (response) => {
      console.log('Consent verification complete');
    },
    onError: (error, endpoint) => {
      console.error(`Error in ${endpoint}:`, error);
    }
  }
};
\`\`\`

## Storage Mechanisms

In offline mode, consent decisions are stored in the browser using:

### LocalStorage

By default, c15t uses the browser's localStorage to persist consent decisions:

\`\`\`ts
// Default implementation
import { configureConsentManager } from 'c15t';

export const consentManager = configureConsentManager({
  mode: 'offline',
  storage: 'localStorage' // This is the default, so can be omitted
});
\`\`\`

### SessionStorage

For session-based consent that's cleared when the browser is closed:

\`\`\`ts
import { configureConsentManager } from 'c15t';

export const consentManager = configureConsentManager({
  mode: 'offline',
  storage: 'sessionStorage'
});
\`\`\`

### Memory Only

For applications where persistence isn't needed:

\`\`\`ts
import { configureConsentManager } from 'c15t';

export const consentManager = configureConsentManager({
  mode: 'offline',
  storage: 'memory'
});
\`\`\`

## Browser Compatibility

<Callout type="warning">
Some browser environments like private browsing modes may have localStorage restrictions.
</Callout>

The offline mode relies on localStorage, which is supported in all modern browsers. However, it includes fallbacks for environments where localStorage might be unavailable or restricted:

- Private browsing modes in some browsers
- Cookie-blocking browser extensions
- Browsers with storage permissions disabled

In these cases, the client will log a warning and continue functioning with defaults.

## Use Cases

### Development and Testing

Offline mode is perfect for development and testing environments where you don't want to set up a backend:

\`\`\`ts
const options = {
  mode: import.meta.env.MODE === 'development' 
    ? 'offline' 
    : 'c15t',
  backendURL: import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_C15T_URL
    : undefined
};
\`\`\`

### Static Sites

<Callout type="tip">
Offline mode is an excellent choice for static sites deployed on platforms like Vercel, Netlify, or GitHub Pages.
</Callout>

For static sites without backend integration, offline mode provides a simple solution:

\`\`\`ts
const options = {
  mode: 'offline',
};
\`\`\`

### Fallback Mode

You can use offline mode as a fallback when the backend is unavailable:

\`\`\`ts
import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import { configureConsentManager } from 'c15t';

const mode = writable<'c15t' | 'offline'>('c15t');

onMount(() => {
  fetch('/api/c15t/status')
    .catch(() => {
      console.warn('c15t backend unavailable, switching to offline mode');
      mode.set('offline');
    });
});

const options = {
  mode,
  backendURL: $mode === 'c15t' ? '/api/c15t' : undefined
};

export const consentManager = configureConsentManager(options);
\`\`\`

## Limitations

<Callout type="important">
Understand these limitations when deciding if offline mode is right for your application.
</Callout>

While offline mode provides a functional consent management solution, it has some limitations:

1. **No Centralized Reporting**: Since all data is stored locally, you can't generate reports or analytics
2. **Device-Specific**: Consent preferences don't transfer between devices or browsers
3. **Storage Limits**: localStorage has size limitations (typically 5-10MB per domain)
4. **No Server-Side Logic**: Custom server-side processing of consent isn't possible

## When to Use Offline Mode

Consider using offline mode when:

- You're building a prototype or MVP
- Your site doesn't have a backend
- You want the simplest possible implementation
- Cross-device synchronization isn't a requirement
- You have limited compliance needs

For more complex applications or those with stricter compliance requirements, consider [hosted c15t](/docs/storing-consent/hosted-c15t) instead.

## Next Steps

<div className="mt-6">
  <CompactCard 
    href="/docs/javascript/storing-consent/self-hosting" 
    icon={<RiServerLine size={18} />}
  >
    Configure <code>Self-Hosting</code>
  </CompactCard>

  <CompactCard 
    href="/docs/javascript/storing-consent/hosted-c15t" 
    icon={<RiGlobalLine size={18} />}
  >
    Use <code>Hosted c15t</code>
  </CompactCard>
</div> 
```

# javascript/storing-consent/overview.mdx

```mdx
---
title: 'Overview'
description: 'Compare different approaches to storing consent decisions in your application'
---

c15t provides multiple approaches for storing consent decisions in your application. Each approach has different tradeoffs in terms of:

- Server requirements
- Data persistence
- Implementation complexity
- User experience

## Available Storage Options

| Storage Option | Description | Best For |
|--------------|-------------|----------|
| **Hosted c15t** | Using consent.io managed service | Production apps with minimal backend maintenance |
| **Self-Hosting** | Running your own c15t backend | Organizations requiring complete data control |
| **Offline Mode** | Browser-based storage with no server | Simple implementations or dev environments |

<Callout type="tip">
  For most applications, we recommend starting with Hosted c15t (consent.io) for the simplest setup with the most features.
</Callout>

## Choosing the Right Approach

### Hosted c15t (Recommended)

[consent.io](https://consent.io) provides a fully managed consent management backend with:

- Zero backend maintenance
- Built-in scaling and automatic updates
- Geographic jurisdiction detection
- Analytics dashboard

<CompactCard 
  href="/docs/javascript/storing-consent/hosted-c15t" 
  icon={
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  }
>
  Learn more about <code>Hosted c15t</code>
</CompactCard>

### Self-Hosting

Run your own c15t instance to maintain complete control over your data and infrastructure:

- Full control over data storage and security
- Integration with your existing database systems
- Customizable configuration
- No external service dependencies

<CompactCard 
  href="/docs/javascript/storing-consent/self-hosting" 
  icon={
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
    </svg>
  }
>
  Learn more about <code>Self-Hosting</code>
</CompactCard>

### Offline Mode

Store consent decisions entirely in the browser without any server:

- Zero backend requirements
- Simplest implementation
- Works offline and in statically-hosted sites
- Perfect for development or simple use cases

## Decision Guide

<Callout>
Use this decision tree to determine which storage option best fits your needs.
</Callout>

1. **Do you need consent data to persist across devices?**
   - No → Consider **Offline Mode**
   - Yes → Continue to question 2

2. **Do you need complete control over your consent data?**
   - No → Use **Hosted c15t** (consent.io)
   - Yes → Continue to question 3

3. **Do you have an existing consent management system?**
   - No → Use **Self-Hosting**
   - Yes → Consider **Custom Client**

## Creating a Client

The main factory function `configureConsentManager` creates the appropriate client implementation based on the provided options:

\`\`\`tsx
import { configureConsentManager, type ConsentManagerOptions } from 'c15t';

export const c15tConfig = {
	mode: 'c15t',
	backendURL: 'https://your-instance.c15t.dev',
} satisfies ConsentManagerOptions;

const consentManager = configureConsentManager(c15tConfig);
\`\`\`

## Global Callback Events

All client modes support the following callback events:

\`\`\`tsx
const callbacks = {
  // Called when any request fails
  onError: (response, path) => {
    console.error(`Request to ${path} failed:`, response.error);
  },
  
  // Called after successfully fetching consent banner information
  onConsentBannerFetched: (response) => {
    console.log('Banner info fetched:', response.data);
  },
  
  // Called after successfully setting consent preferences
  onConsentSet: (response) => {
    console.log('Consent set successfully:', response.data);
  },
  
  // Called after successfully verifying consent
  onConsentVerified: (response) => {
    console.log('Consent verified:', response.data);
  }
};
\`\`\`

## When to Use Each Mode

<Callout>
  Choosing the right mode depends on your specific requirements and constraints.
</Callout>

- **c15t Mode**: For production applications with a real c15t backend
- **Offline Mode**: For production applications with your own backend systems, or when you want to eliminate external service dependencies
- **Custom Mode**: When you need to integrate with an existing consent system but still want to implement custom HTTP request handling

## What's Next

Choose the storage approach that best fits your needs:

- [Hosted c15t](/docs/javascript/storing-consent/hosted-c15t) - Use consent.io for a managed solution
- [Self-Hosting](/docs/javascript/storing-consent/self-hosting) - Run your own c15t instance
- [Offline Mode](/docs/javascript/storing-consent/offline-mode) - Store consent in the browser

```

# javascript/storing-consent/self-hosting.mdx

```mdx
---
title: 'Self-Hosting Guide'
description: 'Set up and maintain your own c15t instance for full control over your consent management backend'
---

import { RiGlobalLine, RiTimerLine, RiSettings4Line, RiDatabase2Line, RiCodeLine } from '@remixicon/react';

This guide shows you how to set up a self-hosted c15t instance, giving you complete control over your consent management system.

<Callout type="info">
Looking for an easier way? [consent.io](https://consent.io) offers a fully managed c15t backend with minimal setup. See the [hosted c15t](/docs/storing-consent/hosted-c15t) page for details.
</Callout>


<Steps>

<Step>
### Install `@c15t/backend` Package
 
\`\`\`package-install
@c15t/backend
\`\`\`
</Step>

<Step>
### Create a c15t instance

<Callout type="tip">
Separating your configuration from the API route handler makes it easier to manage and update your c15t instance.
</Callout>

First, create a separate file for your c15t instance configuration:

<Tabs items={['Memory', 'Kysely', 'Prisma', 'Drizzle']}>
<Tab value="Memory">
\`\`\`tsx title="c15t.ts"
import { c15tInstance } from '@c15t/backend';
import { memoryAdapter } from '@c15t/backend/pkgs/db-adapters/adapters/memory-adapter';

export const instance = c15tInstance({
	appName: 'Example App',
	basePath: '/api/c15t',
	database: memoryAdapter({}),
	trustedOrigins: ['http://localhost:3000', 'http://localhost:8787'],
});
\`\`\`
This example uses the Memory Adapter for simple in-memory storage that's perfect for development and testing. Data is stored in RAM and doesn't persist when the server restarts.
</Tab>

<Tab value="Kysely">
\`\`\`tsx title="c15t.ts"
import { c15tInstance } from '@c15t/backend';
import { kyselyAdapter } from '@c15t/backend/pkgs/db-adapters/adapters/kysely-adapter';
import { PostgresDialect } from 'kysely';
import pg from 'pg';

export const instance = c15tInstance({
	appName: 'Example App',
	basePath: '/api/c15t',
	database: kyselyAdapter({
		dialect: new PostgresDialect({
			pool: new pg.Pool({
				host: process.env.DB_HOST || 'localhost',
				port: parseInt(process.env.DB_PORT || '5432'),
				database: process.env.DB_NAME || 'c15t',
				user: process.env.DB_USER || 'postgres',
				password: process.env.DB_PASSWORD || '',
			}),
		}),
	}),
	trustedOrigins: ['http://localhost:3000', 'http://localhost:8787'],
});
\`\`\`

This configuration uses the Kysely adapter with PostgreSQL. The Kysely adapter provides a type-safe SQL query builder that works with PostgreSQL, MySQL, and SQLite, offering excellent performance with minimal overhead.
</Tab>

<Tab value="Prisma">
\`\`\`tsx title="c15t.ts"
import { c15tInstance } from '@c15t/backend';
import { prismaAdapter } from '@c15t/backend/pkgs/db-adapters/adapters/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const instance = c15tInstance({
	appName: 'Example App',
	basePath: '/api/c15t',
	database: prismaAdapter({
		client: prisma,
	}),
	trustedOrigins: ['http://localhost:3000', 'http://localhost:8787'],
});
\`\`\`

This setup integrates Prisma ORM to provide a feature-rich database interface with automatic migrations, relationship handling, and excellent TypeScript integration.
</Tab>

<Tab value="Drizzle">
\`\`\`tsx title="c15t.ts"
import { c15tInstance } from '@c15t/backend';
import { drizzleAdapter } from '@c15t/backend/pkgs/db-adapters/adapters/drizzle-adapter';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(`postgres://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '5432'}/${process.env.DB_NAME || 'c15t'}`);
const db = drizzle(client);

export const instance = c15tInstance({
	appName: 'Example App',
	basePath: '/api/c15t',
	database: drizzleAdapter({
		client: db,
	}),
	trustedOrigins: ['http://localhost:3000', 'http://localhost:8787'],
});
\`\`\`

This example uses the lightweight Drizzle ORM that focuses on performance and type safety with minimal abstractions. It's ideal for projects that need direct SQL access with TypeScript support.
</Tab>
</Tabs>

Then, create a catch-all API route that imports and uses this instance:

\`\`\`tsx title="app/api/c15t/[...all]/route.ts"
import { toNextHandler } from '@c15t/backend/integrations/next';
import { instance } from '../c15t';

export const { GET, POST, OPTIONS } = toNextHandler(instance);
\`\`\`

<Tabs items={['Next.js', 'Cloudflare']}>
<Tab value="Next.js">
\`\`\`tsx title="app/api/c15t/[...all]/route.ts"
import { toNextHandler } from '@c15t/backend/integrations/next';
import { instance } from '../c15t';

export const { GET, POST, OPTIONS } = toNextHandler(instance);
\`\`\`
</Tab>
<Tab value="Cloudflare">
\`\`\`tsx title="src/index.ts"
import { toCloudflareHandler } from '@c15t/backend/integrations/cloudflare';
import { instance } from './c15t';

const handler = toCloudflareHandler(instance);

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return handler(env)(request);
	},
};
\`\`\`
</Tab>
</Tabs>

This approach separates your instance configuration from the route handler, making it easier for CLI tools and migration utilities to locate and work with your c15t instance.
</Step>

<Step>
### Configure Your App to Use the API Route

Update your ConsentManagerOptions to point to your new API route:

\`\`\`tsx title="app/layout.tsx"
const options: ConsentManagerOptions = {
	mode: 'c15t',
	backendURL: 'http://localhost:8787', // Allows partial paths e.g. /api/c15t
};
\`\`\`
</Step>

</Steps>

## Database Options

<Callout type="warning">
For production use, the Memory Adapter is not recommended as data is lost when the server restarts.
</Callout>

For production use, you should consider using a persistent database. c15t supports several database adapters:

<div className="mt-6">
  <CompactCard 
    href="/docs/backend/adapters/memory" 
    icon={<RiDatabase2Line size={18} />}
  >
    <code>Memory Adapter</code> - Simple in-memory storage (development only)
  </CompactCard>

  <CompactCard 
    href="/docs/backend/adapters/kysely" 
    icon={<RiDatabase2Line size={18} />}
  >
    <code>Kysely Adapter</code> - Type-safe SQL query builder
  </CompactCard>

  <CompactCard 
    href="/docs/backend/adapters/prisma" 
    icon={<RiDatabase2Line size={18} />}
  >
    <code>Prisma Adapter</code> - Feature-rich ORM with migrations
  </CompactCard>

  <CompactCard 
    href="/docs/backend/adapters/drizzle" 
    icon={<RiDatabase2Line size={18} />}
  >
    <code>Drizzle Adapter</code> - Lightweight TypeScript ORM
  </CompactCard>
</div>

These adapters can connect to various database backends:

<div className="mt-6">
  <CompactCard 
    href="/docs/backend/databases/postgres" 
    icon={<RiCodeLine size={18} />}
  >
    <code>PostgreSQL</code> - Recommended for production deployments
  </CompactCard>

  <CompactCard 
    href="/docs/backend/databases/mysql" 
    icon={<RiCodeLine size={18} />}
  >
    <code>MySQL/MariaDB</code> - Popular open-source database
  </CompactCard>

  <CompactCard 
    href="/docs/backend/databases/sqlite" 
    icon={<RiCodeLine size={18} />}
  >
    <code>SQLite</code> - File-based database for simpler deployments
  </CompactCard>
</div>

<Callout type="tip">
**PostgreSQL** is recommended for production deployments due to its robust feature set and reliability.
</Callout>

See the [Database Adapters documentation](/docs/backend/database-adapters) for complete implementation details.


## Next Steps

<div className="mt-6">
  <CompactCard 
    href="/docs/javascript/storing-consent/hosted-c15t" 
    icon={<RiGlobalLine size={18} />}
  >
    Use <code>Hosted c15t</code>
  </CompactCard>

  <CompactCard 
    href="/docs/javascript/storing-consent/offline-mode" 
    icon={<RiTimerLine size={18} />}
  >
    Configure <code>Offline Mode</code>
  </CompactCard>
</div> 
```

# legals/cookie-policy.mdx

```mdx
---
title: Cookie Policy
---

## Introduction

This Cookie Policy explains how and why Consent Management Inc (“we,” “us,” “our”) uses cookies and similar tracking technologies on our Website, [c15t.com](https://c15t.com) (“Website”). By using our Website, you consent to our use of cookies in accordance with this policy.

## What Are Cookies?

Cookies are small data files placed on your device when you visit a Website. They help the Website remember your actions and preferences (such as login details or language settings) over a period of time, so you do not have to re-enter them during each visit.

## Types of Cookies We Use

### 1. Essential Cookies

- These cookies are necessary for the Website to function and cannot be disabled. They include cookies that enable you to log in securely.

### 2. Analytics Cookies

- We use analytics cookies, including those deployed by PostHog, to collect data on how you interact with our Website. This non-personally identifiable data is used to improve the Website’s functionality and user experience.

### 3. Functionality and Preference Cookies

- These cookies allow the Website to remember choices you make (such as your preferred language) and provide a more personalized experience.

## Managing Cookies

Most browsers allow you to control cookies through their settings. You can:

- Block or delete cookies via your browser settings.
- Opt-out of specific cookies or tracking technologies when such options are provided on the Website.

Please note that disabling cookies may affect the functionality of this Website and your overall user experience.

## Third-Party Cookies

We may allow third parties (for example, analytics providers like PostHog) to place cookies on our Website. These third parties have their own privacy policies and we do not control the cookies they may use.

## Changes to This Cookie Policy

We may update the Cookie Policy periodically to reflect changes in our practices or for operational, legal, or regulatory reasons. The current version will always be posted on our Website with an updated effective date.

## Contact Us

For questions about this Cookie Policy, please contact us at:

> **Consent Management Inc**  
> 2261 Market Street STE 86311 
> San Francisco, CA 94114  
> Email: support@c15t.com  

```

# legals/meta.json

```json
{
	"title": "Legals",
	"root": false,
	"pages": ["cookie-policy", "privacy-policy"]
}

```

# legals/privacy-policy.mdx

```mdx
---
title:  Privacy Policy
---

## Introduction

Consent Management Inc (“we,” “us,” “our”) operates the website [c15t.com](https://c15t.com) (“Website”). This Privacy Policy describes how we collect, use, disclose, and protect your personal information. By accessing or using the Website, you agree to the practices described in this policy. If you do not agree with these practices, please do not use our Website.

## Applicable Laws and Scope

This policy is designed for a Delaware-based company and informs users worldwide. When you are located in jurisdictions with additional privacy requirements (for example, under the GDPR or CCPA), certain rights and protections may apply. Please refer to the relevant sections below and consult applicable laws for your jurisdiction.

## Information We Collect

### 1. Personal Data

- We may collect personal data that you voluntarily provide when interacting with our Website (for example, your name, email address, and telephone number).

### 2. Automatically Collected Data

- We automatically collect non-personally identifiable information through technologies like cookies and web beacons. This may include IP addresses, browser types, and device identifiers.

### 3. Analytics Data

- We use PostHog to track analytics on our Website. PostHog may collect information such as usage behavior, page views, and interaction data. This information is used solely for enhancing website performance and user experience. For more details, please review PostHog’s own privacy practices on their website.

## How We Use Your Information

We use your personal information to:

- Provide and improve our Website and services.
- Analyze website traffic and usage trends.
- Communicate with you regarding inquiries and updates (subject to your consent where applicable).
- Comply with legal and regulatory requirements.

## Legal Basis for Processing (For Users in Jurisdictions Requiring It)

Where required by law (for example, under the GDPR), our processing is based on:

- Your consent for analytics and marketing purposes.
- Our legitimate interests in operating and improving our Website.
- Any contractual obligations you have with us.

## Information Sharing and Disclosure

We do not sell or rent your personal information. We may share your personal data with:

- **Third-party service providers:** for example, analytics providers like PostHog, who process data on our behalf. These service providers are contractually obligated to maintain the confidentiality and security of your data.
- **Legal authorities:** if required by law or to protect our rights and interests.
- **Other parties:** only with your explicit consent.

## International Data Transfers

Since we serve a worldwide audience, your personal data may be transferred to—and maintained on—servers located outside your state, country, or other jurisdiction (including the United States). We take appropriate steps to ensure that your data is treated securely in accordance with this Privacy Policy and applicable laws.

## Data Retention and Security

- **Data Retention:** We retain personal data only as long as necessary to fulfill its intended purposes or as required by applicable law.
- **Security Measures:** We implement reasonable administrative, technical, and physical safeguards to protect your personal information.

## Your Rights

Depending on your jurisdiction, you may have the right to:

- Access, correct, or delete your personal data.
- Object to or restrict certain processing.
- Withdraw consent.

To exercise these rights, please contact us using the details provided below.

## Children's Privacy

Our Website is not directed to children under 13 years of age. We do not knowingly collect personal information from children. If you believe that we have inadvertently collected such information, please contact us immediately.

## Policy Updates

We may update this Privacy Policy occasionally. If we make material changes, we will update the effective date at the top of the policy and notify you by any required means.

## Contact Us

For questions or concerns regarding this Privacy Policy or our practices, please contact us at:

> **Consent Management Inc**  
> 2261 Market Street STE 86311 
> San Francisco, CA 94114  
> Email: support@c15t.com  
```

# nextjs/google-tag-manager.mdx

```mdx
---
title: Google Tag Manager (Unstable)
description: Learn how to integrate c15t with Google Tag Manager (GTM).
---

We're working on a beta version of the Google Tag Manager integration.
c15t will automatically inject the GTM script into your page.

<Steps> 
<Step>
### Creating a Tag Manager Container

<Callout type="note">
This step is optional if you already have a Tag Manager container. Ensure your container has consent overview enabled.
</Callout>

After signing into Google Tag Manager, you can create a new container.
[Continue to Google Tag Manager](https://tagmanager.google.com/)

1. In Tag Manager, click Admin > Container Settings.
2. Under Additional Settings, select "Enable consent overview".

![Enable consent overview](../react/assets/container-settings.png)
</Step>

<Step>
### Setting up c15t with Google Tag Manager

After creating your container, you can set up c15t with Google Tag Manager.

All you need to do copy and paste your container ID into the `unstable_googleTagManager.id` property.

This begins with "GTM-". 

\`\`\`tsx
<ConsentManagerProvider
  options={{
    mode: 'c15t',
    backendURL: 'https://your-instance.c15t.dev',
    unstable_googleTagManager: {
      id: 'GTM-XXXXXXX',
    },
  }}
>
\`\`\`

If you have GTM in your site already, you can remove the GTM script from your head section.

</Step>
</Steps>

### All Done!

c15t will automatically inject the GTM script into your page and update the consent state in GTM.








```

# nextjs/meta.json

```json
{
	"title": "NextJS",
	"root": true,
	"icon": "next",
	"pages": [
		"../introduction",
		"../ai-tools-integrations",
		"quickstart",
		"google-tag-manager",
		"../callbacks",
		"--- React Components ---",
		"../components/react/cookie-banner",
		"../components/react/consent-manager-dialog",
		"../components/react/consent-manager-widget",
		"../components/react/dev-tools",
		"--- Storing Consent ---",
		"../storing-consent/overview",
		"../storing-consent/hosted-c15t",
		"../storing-consent/self-hosting",
		"../storing-consent/offline-mode",
		"../storing-consent/custom-client",
		"--- Hooks ---",
		"../hooks/use-consent-manager",
		"../hooks/use-focus-trap",
		"--- Styling the components ---",
		"../styling/index",
		"../styling/color-scheme",
		"../styling/classnames",
		"../styling/tailwind",
		"../styling/css-variables",
		"../styling/inline-styles",
		"--- Self-Hosting ---",
		"../backend/index",
		"../backend/core-concepts",
		"../backend/database-adapters",
		"../backend/plugins",
		"--- Databases ---",
		"../backend/databases/postgres",
		"../backend/databases/mysql",
		"../backend/databases/sqlite",
		"--- Database Adapters ---",
		"../backend/adapters/memory",
		"../backend/adapters/kysely",
		"../backend/adapters/prisma",
		"../backend/adapters/drizzle",
		"--- Contributing ---",
		"../oss/contributing",
		"../oss/license",
		"../oss/why-open-source"
	]
}

```

# nextjs/quickstart.mdx

```mdx
---
title: Next.js Quickstart
description: Learn how to integrate c15t into your Next.js application with this step-by-step guide. We'll cover installation, configuration, and basic usage.
---
import { RiFileCopyLine, RiFlashlightLine, RiServerLine, RiWifiOffLine, RiSettings4Line } from '@remixicon/react';

## CLI Setup (Recommended)
<Steps>

<Step>
### Generate Schema + Code

<RunCommand command="@c15t/cli generate" />

</Step>

<Step>
### Run Database Migrations (Optional)

<Callout type="note">
This is only required if you are self hosting c15t.
</Callout>

<RunCommand command="@c15t/cli migrate" />

</Step>
</Steps>

## Manual Setup
<Steps>
<Step>
 
### Install `@c15t/nextjs` Package
 \`\`\`package-install
 @c15t/nextjs
 \`\`\`
</Step>

<Step>
 
### Next.js Rewrites (Optional)

<Callout type="tip">
You can use Next.js Rewrites to redirect requests to the c15t backend. This is useful if you want to hide the c15t backend url from your users.
[Learn more about Next.js Rewrites](https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites).
</Callout>

\`\`\`ts title="next.config.ts"
import type { NextConfig } from 'next';

const config: NextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/c15t/:path*',
				destination: `${process.env.NEXT_PUBLIC_C15T_URL}/:path*`,
			},
		];
	},
};

export default config;
\`\`\`
</Step>
 
<Step>
 
### Adding it to your Next Application

\`\`\`tsx title="app/layout.tsx"
import { 
  ConsentManagerDialog,
  ConsentManagerProvider,
  CookieBanner,
} from '@c15t/nextjs';

export default function Layout ({ children }: { children: ReactNode }) => {
	return (
      <ConsentManagerProvider
        options={{
          mode: 'c15t',
          backendURL: '/api/c15t',
          consentCategories: ['necessary', 'marketing'], // Optional: Specify which consent categories to show in the banner.
          ignoreGeoLocation: true, // Useful for development to always view the banner.
        }}
      >
        <CookieBanner />
        <ConsentManagerDialog />   
        {children}
      </ConsentManagerProvider>
  );
};
\`\`\`

<Callout type="tip">
You can create an instance at [consent.io](https://consent.io) or self-host your own instance. Otherwise, you can use c15t offline by setting `mode: 'offline'`.
</Callout>

<Callout type="tip">
  If you're using Next.js Rewrites, you can use the `backendURL` option to redirect requests to the c15t backend by setting it to `/api/c15t`.
</Callout>
</Step>
</Steps>

--- 

## Hosting Options

### Creating a consent.io Instance (Recommended)

<Callout type="info">
Using consent.io is the recommended method as it is the easiest way to get started and requires little maintenance.
</Callout>

Instead of self-hosting your own c15t instance, you can use a [consent.io](https://consent.io) instance. This is the recommended method as it is the easiest way to get started and requires little maintenance.

<Steps>

<Step>
Sign up for a [consent.io](https://consent.io) account.
</Step>

<Step>
After signing up, create a new instance, located in the top-right corner.

<Callout>
When creating an instance it is important to list all the trusted origins for your application such as "localhost", "vercel.app", "c15t.com" etc.
</Callout>

</Step>

<Step>
After the instance is created, you will be given a backendURL, which you can add to your `ConsentManagerOptions`.


A backend URL might look like this: `https://<my-instance>.c15t.dev/`.
</Step>

</Steps>

### Alternative Hosting Options

<Callout type="note">
For more advanced setup options, choose the approach that best suits your infrastructure and requirements.
</Callout>

For more advanced setup options, please refer to:
- [Overview](/docs/storing-consent/overview) - Compare different approaches to storing consent decisions in your application
- [Hosted c15t](/docs/storing-consent/hosted-c15t) - Complete guide to using consent.io
- [Self-Hosting](/docs/storing-consent/self-hosting) - Run your own c15t instance 
- [Offline Mode](/docs/storing-consent/offline-mode) - Complete guide to using c15t without a backend
- [Custom Client](/docs/storing-consent/custom-client) - Advanced implementation with custom handlers for full control


## Decision Guide

<Callout>
Use this flowchart to determine which c15t configuration is best for your needs.
</Callout>

Use this flowchart to determine which c15t configuration is best for your needs:

<Mermaid chart={`
flowchart TD
    Start([Start here]) --> StoreConsent
    
    StoreConsent{Need to store\nconsent choices?}
    StoreConsent -->|Yes| ManagedService
    StoreConsent -->|No| OfflineMode
    
    ManagedService{Want a managed\nservice?}
    ManagedService -->|Yes| ConsentIO
    ManagedService -->|No| SelfHosted
    
    OfflineMode([c15t Offline Mode]):::optionStyle
    OfflineMode -.-> OfflineNote[Client-side only\nStores in localStorage]:::noteStyle
    
    ConsentIO([consent.io]):::recommendStyle
    ConsentIO -.-> ConsentIONote[Fully managed\nSimplest setup]:::noteStyle
    
    SelfHosted([Self-Hosted Instance]):::optionStyle
    SelfHosted -.-> SelfHostedNote[Full control\nRequires maintenance]:::noteStyle
    
    %% Styling
    classDef recommendStyle fill:#4caf50,stroke:#388e3c,color:white,stroke-width:2px;
    classDef optionStyle fill:#37474f,stroke:#263238,color:white,stroke-width:1px;
    classDef noteStyle fill:#424242,stroke:none,color:#aaa,font-size:12px;
`} />

## Next Steps in This Guide

<Callout type="tip">
Choose your next step based on your specific implementation needs.
</Callout>

<div className="mt-6">
  <CompactCard 
    href="/docs/storing-consent/overview" 
    icon={<RiFileCopyLine size={16} />}
  >
Learn more about <code>Client Configuration Options</code>
  </CompactCard>

  <CompactCard 
    href="/docs/storing-consent/hosted-c15t"
    icon={<RiFlashlightLine size={16} />}
  >
    Learn more about <code>Hosted c15t</code>
  </CompactCard>

  <CompactCard 
    href="/docs/storing-consent/self-hosting"
    icon={<RiServerLine size={16} />}
  >
    Learn more about <code>Self-Hosting</code>
  </CompactCard>

  <CompactCard 
    href="/docs/storing-consent/offline-mode"
    icon={<RiWifiOffLine size={16} />}
  >
    Learn more about <code>Offline Mode</code>
  </CompactCard>

  <CompactCard 
    href="/docs/storing-consent/custom-client"
    icon={<RiSettings4Line size={16} />}
  >
    Learn more about <code>Custom Client</code>
  </CompactCard>
</div>


```

# oss/contributing.mdx

```mdx
---
title: Contributing to c15t.com
---

We love your input! We want to make contributing to c15t.com as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## 📜 License

By contributing to Consent Management (c15t), you agree that your contributions will be licensed under the GNU General Public License v3.0 (GPL-3.0). This is a copyleft license that ensures the software and all derivatives remain free and open source.

[Read the full license here](/docs/open-source/license)

## 🏠 House Rules

### Before You Start

- Check existing [issues](https://github.com/c15t/c15t/issues) and [PRs](https://github.com/c15t/c15t/pulls) first
- **Always create an issue before starting development**
- Follow our PR template carefully

### Issue Approval Process

We use the `needs-approval` label to manage contributions:

#### For Contributors

- 🚫 **Needs Approval First:**
  - New features
  - Large-scale refactoring
  - Architecture changes
  - *Wait for a c15t.com team member to remove the `needs-approval` label*

- ✅ **Can Start Immediately:**
  - Bug fixes
  - Documentation updates
  - Performance improvements
  - Security fixes
  - Tests

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### 🤖 Automated Workflows

We leverage several automated workflows to ensure code quality:

1. **Code Quality**
   - Formatting: Biome automatically formats code
   - Types: TypeScript checks run on every PR
   - Tests: Vitest runs the test suite
   - Build: Turbo ensures everything builds correctly

2. **Dependencies**
   - Renovate keeps dependencies up to date
   - PNPM manages our packages
   - Changesets handles our versioning

3. **Pull Requests**
   - PR titles are checked for semantic versioning
   - Automated code review for common issues
   - Required checks must pass before merging

## Getting Started

1. Fork the repo and create your branch from `main`:

   \`\`\`sh
   git clone https://github.com/your-username/c15t.git
   cd c15t
   git switch -c my-feature
   \`\`\`

2. Install dependencies:

   \`\`\`sh
   corepack enable  # Sets up PNPM
   pnpm install     # Installs dependencies
   \`\`\`

3. Make your changes and ensure the following pass:

   \`\`\`sh
   pnpm fmt         # Format code
   pnpm test        # Run tests
   pnpm build       # Build packages
   \`\`\`

## Pull Request Process

1. **Create an Issue First**
   - For features/refactoring: Wait for approval (needs-approval label)
   - For bugs/docs: Can start work immediately

2. **Make Your Changes**
   - Follow our coding standards (enforced by Biome)
   - Add tests for new functionality
   - Update documentation as needed

3. **Create Pull Request**
   - Use our PR template
   - Link the related issue
   - Add screenshots for UI changes
   - Describe your changes clearly

4. **Automated Checks**
   The following will run automatically:
   - Code formatting (Biome)
   - Type checking (TypeScript)
   - Tests (Vitest)
   - Build verification (Turbo)
   - Dependency checks (Renovate)
   - PR title format
   - Issue linking

5. **Review Process**
   - Maintainers will review your code
   - Address any requested changes
   - Once approved, it will be merged

## Release Process

Releases are automated through our CI/CD pipeline:

1. Merge to `main` triggers version check
2. Changesets determines version bump
3. New version is published to npm
4. GitHub release is created
5. Documentation is updated

## Development Guidelines

### Code Style

We use Biome for formatting and linting. Configuration is in `biome.jsonc`.

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `chore:` Maintenance
- `refactor:` Code changes
- `test:` Test changes

### Testing

- Write tests for new features
- Update tests for changes
- Run `pnpm test` locally

### Documentation

- Update docs with new features
- Include code examples
- Update README if needed

## Questions?

Don't hesitate to:

- Open an issue
- Start a discussion
- Ask in comments

## Important License Note

c15t.com is licensed under the GNU General Public License v3.0 (GPL-3.0). By contributing to this project, you agree to license your contributions under the same license. This means:

- ✅ You can use the code commercially
- ✅ You can modify the code
- ✅ You can distribute the code
- ✅ You can use the code privately
- ✅ You can use the code for patent purposes

But you must:

- 📢 Disclose source
- 📄 Include original license
- 📝 State changes
- 🔄 Use same license
- 📋 Include copyright notice

[Learn more about GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
```

# oss/license.mdx

```mdx
---
title: Licence
---
c15t.com is licensed under the GNU General Public License v3.0 (GPL-3.0). By contributing to this project, you agree to license your contributions under the same license. This means:

- ✅ You can use the code commercially
- ✅ You can modify the code
- ✅ You can distribute the code
- ✅ You can use the code privately

But you must:

- 📢 Disclose source
- 📄 Include original license
- 📝 State changes
- 🔄 Use same license
- 📋 Include copyright notice

---

## Full License

_Version 3, 29 June 2007_  
_Copyright © 2007 Free Software Foundation, Inc. [fsf.org](http://fsf.org/)_

Everyone is permitted to copy and distribute verbatim copies of this license
document, but changing it is not allowed.

## Preamble

The GNU General Public License is a free, copyleft license for software and other
kinds of works.

The licenses for most software and other practical works are designed to take away
your freedom to share and change the works. By contrast, the GNU General Public
License is intended to guarantee your freedom to share and change all versions of a
program--to make sure it remains free software for all its users. We, the Free
Software Foundation, use the GNU General Public License for most of our software; it
applies also to any other work released this way by its authors. You can apply it to
your programs, too.

When we speak of free software, we are referring to freedom, not price. Our General
Public Licenses are designed to make sure that you have the freedom to distribute
copies of free software (and charge for them if you wish), that you receive source
code or can get it if you want it, that you can change the software or use pieces of
it in new free programs, and that you know you can do these things.

To protect your rights, we need to prevent others from denying you these rights or
asking you to surrender the rights. Therefore, you have certain responsibilities if
you distribute copies of the software, or if you modify it: responsibilities to
respect the freedom of others.

For example, if you distribute copies of such a program, whether gratis or for a fee,
you must pass on to the recipients the same freedoms that you received. You must make
sure that they, too, receive or can get the source code. And you must show them these
terms so they know their rights.

Developers that use the GNU GPL protect your rights with two steps: **(1)** assert
copyright on the software, and **(2)** offer you this License giving you legal permission
to copy, distribute and/or modify it.

For the developers' and authors' protection, the GPL clearly explains that there is
no warranty for this free software. For both users' and authors' sake, the GPL
requires that modified versions be marked as changed, so that their problems will not
be attributed erroneously to authors of previous versions.

Some devices are designed to deny users access to install or run modified versions of
the software inside them, although the manufacturer can do so. This is fundamentally
incompatible with the aim of protecting users' freedom to change the software. The
systematic pattern of such abuse occurs in the area of products for individuals to
use, which is precisely where it is most unacceptable. Therefore, we have designed
this version of the GPL to prohibit the practice for those products. If such problems
arise substantially in other domains, we stand ready to extend this provision to
those domains in future versions of the GPL, as needed to protect the freedom of
users.

Finally, every program is threatened constantly by software patents. States should
not allow patents to restrict development and use of software on general-purpose
computers, but in those that do, we wish to avoid the special danger that patents
applied to a free program could make it effectively proprietary. To prevent this, the
GPL assures that patents cannot be used to render the program non-free.

The precise terms and conditions for copying, distribution and modification follow.

## TERMS AND CONDITIONS

### 0. Definitions

"This License" refers to version 3 of the GNU General Public License.

"Copyright" also means copyright-like laws that apply to other kinds of
works, such as semiconductor masks.

"The Program" refers to any copyrightable work licensed under this
License. Each licensee is addressed as "you". "Licensees" and
"recipients" may be individuals or organizations.

To "modify" a work means to copy from or adapt all or part of the work in
a fashion requiring copyright permission, other than the making of an exact copy. The
resulting work is called a "modified version" of the earlier work or a
work "based on" the earlier work.

A "covered work" means either the unmodified Program or a work based on
the Program.

To "propagate" a work means to do anything with it that, without
permission, would make you directly or secondarily liable for infringement under
applicable copyright law, except executing it on a computer or modifying a private
copy. Propagation includes copying, distribution (with or without modification),
making available to the public, and in some countries other activities as well.

To "convey" a work means any kind of propagation that enables other
parties to make or receive copies. Mere interaction with a user through a computer
network, with no transfer of a copy, is not conveying.

An interactive user interface displays "Appropriate Legal Notices" to the
extent that it includes a convenient and prominently visible feature that **(1)**
displays an appropriate copyright notice, and **(2)** tells the user that there is no
warranty for the work (except to the extent that warranties are provided), that
licensees may convey the work under this License, and how to view a copy of this
License. If the interface presents a list of user commands or options, such as a
menu, a prominent item in the list meets this criterion.

### 1. Source Code

The "source code" for a work means the preferred form of the work for
making modifications to it. "Object code" means any non-source form of a
work.

A "Standard Interface" means an interface that either is an official
standard defined by a recognized standards body, or, in the case of interfaces
specified for a particular programming language, one that is widely used among
developers working in that language.

The "System Libraries" of an executable work include anything, other than
the work as a whole, that **(a)** is included in the normal form of packaging a Major
Component, but which is not part of that Major Component, and **(b)** serves only to
enable use of the work with that Major Component, or to implement a Standard
Interface for which an implementation is available to the public in source code form.
A "Major Component", in this context, means a major essential component
(kernel, window system, and so on) of the specific operating system (if any) on which
the executable work runs, or a compiler used to produce the work, or an object code
interpreter used to run it.

The "Corresponding Source" for a work in object code form means all the
source code needed to generate, install, and (for an executable work) run the object
code and to modify the work, including scripts to control those activities. However,
it does not include the work's System Libraries, or general-purpose tools or
generally available free programs which are used unmodified in performing those
activities but which are not part of the work. For example, Corresponding Source
includes interface definition files associated with source files for the work, and
the source code for shared libraries and dynamically linked subprograms that the work
is specifically designed to require, such as by intimate data communication or
control flow between those subprograms and other parts of the work.

The Corresponding Source need not include anything that users can regenerate
automatically from other parts of the Corresponding Source.

The Corresponding Source for a work in source code form is that same work.

### 2. Basic Permissions

All rights granted under this License are granted for the term of copyright on the
Program, and are irrevocable provided the stated conditions are met. This License
explicitly affirms your unlimited permission to run the unmodified Program. The
output from running a covered work is covered by this License only if the output,
given its content, constitutes a covered work. This License acknowledges your rights
of fair use or other equivalent, as provided by copyright law.

You may make, run and propagate covered works that you do not convey, without
conditions so long as your license otherwise remains in force. You may convey covered
works to others for the sole purpose of having them make modifications exclusively
for you, or provide you with facilities for running those works, provided that you
comply with the terms of this License in conveying all material for which you do not
control copyright. Those thus making or running the covered works for you must do so
exclusively on your behalf, under your direction and control, on terms that prohibit
them from making any copies of your copyrighted material outside their relationship
with you.

Conveying under any other circumstances is permitted solely under the conditions
stated below. Sublicensing is not allowed; section 10 makes it unnecessary.

### 3. Protecting Users' Legal Rights From Anti-Circumvention Law

No covered work shall be deemed part of an effective technological measure under any
applicable law fulfilling obligations under article 11 of the WIPO copyright treaty
adopted on 20 December 1996, or similar laws prohibiting or restricting circumvention
of such measures.

When you convey a covered work, you waive any legal power to forbid circumvention of
technological measures to the extent such circumvention is effected by exercising
rights under this License with respect to the covered work, and you disclaim any
intention to limit operation or modification of the work as a means of enforcing,
against the work's users, your or third parties' legal rights to forbid circumvention
of technological measures.

### 4. Conveying Verbatim Copies

You may convey verbatim copies of the Program's source code as you receive it, in any
medium, provided that you conspicuously and appropriately publish on each copy an
appropriate copyright notice; keep intact all notices stating that this License and
any non-permissive terms added in accord with section 7 apply to the code; keep
intact all notices of the absence of any warranty; and give all recipients a copy of
this License along with the Program.

You may charge any price or no price for each copy that you convey, and you may offer
support or warranty protection for a fee.

### 5. Conveying Modified Source Versions

You may convey a work based on the Program, or the modifications to produce it from
the Program, in the form of source code under the terms of section 4, provided that
you also meet all of these conditions:

* **a)** The work must carry prominent notices stating that you modified it, and giving a
relevant date.
* **b)** The work must carry prominent notices stating that it is released under this
License and any conditions added under section 7. This requirement modifies the
requirement in section 4 to "keep intact all notices".
* **c)** You must license the entire work, as a whole, under this License to anyone who
comes into possession of a copy. This License will therefore apply, along with any
applicable section 7 additional terms, to the whole of the work, and all its parts,
regardless of how they are packaged. This License gives no permission to license the
work in any other way, but it does not invalidate such permission if you have
separately received it.
* **d)** If the work has interactive user interfaces, each must display Appropriate Legal
Notices; however, if the Program has interactive interfaces that do not display
Appropriate Legal Notices, your work need not make them do so.

A compilation of a covered work with other separate and independent works, which are
not by their nature extensions of the covered work, and which are not combined with
it such as to form a larger program, in or on a volume of a storage or distribution
medium, is called an "aggregate" if the compilation and its resulting
copyright are not used to limit the access or legal rights of the compilation's users
beyond what the individual works permit. Inclusion of a covered work in an aggregate
does not cause this License to apply to the other parts of the aggregate.

### 6. Conveying Non-Source Forms

You may convey a covered work in object code form under the terms of sections 4 and
5, provided that you also convey the machine-readable Corresponding Source under the
terms of this License, in one of these ways:

* **a)** Convey the object code in, or embodied in, a physical product (including a
physical distribution medium), accompanied by the Corresponding Source fixed on a
durable physical medium customarily used for software interchange.
* **b)** Convey the object code in, or embodied in, a physical product (including a
physical distribution medium), accompanied by a written offer, valid for at least
three years and valid for as long as you offer spare parts or customer support for
that product model, to give anyone who possesses the object code either **(1)** a copy of
the Corresponding Source for all the software in the product that is covered by this
License, on a durable physical medium customarily used for software interchange, for
a price no more than your reasonable cost of physically performing this conveying of
source, or **(2)** access to copy the Corresponding Source from a network server at no
charge.
* **c)** Convey individual copies of the object code with a copy of the written offer to
provide the Corresponding Source. This alternative is allowed only occasionally and
noncommercially, and only if you received the object code with such an offer, in
accord with subsection 6b.
* **d)** Convey the object code by offering access from a designated place (gratis or for
a charge), and offer equivalent access to the Corresponding Source in the same way
through the same place at no further charge. You need not require recipients to copy
the Corresponding Source along with the object code. If the place to copy the object
code is a network server, the Corresponding Source may be on a different server
(operated by you or a third party) that supports equivalent copying facilities,
provided you maintain clear directions next to the object code saying where to find
the Corresponding Source. Regardless of what server hosts the Corresponding Source,
you remain obligated to ensure that it is available for as long as needed to satisfy
these requirements.
* **e)** Convey the object code using peer-to-peer transmission, provided you inform
other peers where the object code and Corresponding Source of the work are being
offered to the general public at no charge under subsection 6d.

A separable portion of the object code, whose source code is excluded from the
Corresponding Source as a System Library, need not be included in conveying the
object code work.

A "User Product" is either **(1)** a "consumer product", which
means any tangible personal property which is normally used for personal, family, or
household purposes, or **(2)** anything designed or sold for incorporation into a
dwelling. In determining whether a product is a consumer product, doubtful cases
shall be resolved in favor of coverage. For a particular product received by a
particular user, "normally used" refers to a typical or common use of
that class of product, regardless of the status of the particular user or of the way
in which the particular user actually uses, or expects or is expected to use, the
product. A product is a consumer product regardless of whether the product has
substantial commercial, industrial or non-consumer uses, unless such uses represent
the only significant mode of use of the product.

"Installation Information" for a User Product means any methods,
procedures, authorization keys, or other information required to install and execute
modified versions of a covered work in that User Product from a modified version of
its Corresponding Source. The information must suffice to ensure that the continued
functioning of the modified object code is in no case prevented or interfered with
solely because modification has been made.

If you convey an object code work under this section in, or with, or specifically for
use in, a User Product, and the conveying occurs as part of a transaction in which
the right of possession and use of the User Product is transferred to the recipient
in perpetuity or for a fixed term (regardless of how the transaction is
characterized), the Corresponding Source conveyed under this section must be
accompanied by the Installation Information. But this requirement does not apply if
neither you nor any third party retains the ability to install modified object code
on the User Product (for example, the work has been installed in ROM).

The requirement to provide Installation Information does not include a requirement to
continue to provide support service, warranty, or updates for a work that has been
modified or installed by the recipient, or for the User Product in which it has been
modified or installed. Access to a network may be denied when the modification itself
materially and adversely affects the operation of the network or violates the rules
and protocols for communication across the network.

Corresponding Source conveyed, and Installation Information provided, in accord with
this section must be in a format that is publicly documented (and with an
implementation available to the public in source code form), and must require no
special password or key for unpacking, reading or copying.

### 7. Additional Terms

"Additional permissions" are terms that supplement the terms of this
License by making exceptions from one or more of its conditions. Additional
permissions that are applicable to the entire Program shall be treated as though they
were included in this License, to the extent that they are valid under applicable
law. If additional permissions apply only to part of the Program, that part may be
used separately under those permissions, but the entire Program remains governed by
this License without regard to the additional permissions.

When you convey a copy of a covered work, you may at your option remove any
additional permissions from that copy, or from any part of it. (Additional
permissions may be written to require their own removal in certain cases when you
modify the work.) You may place additional permissions on material, added by you to a
covered work, for which you have or can give appropriate copyright permission.

Notwithstanding any other provision of this License, for material you add to a
covered work, you may (if authorized by the copyright holders of that material)
supplement the terms of this License with terms:

* **a)** Disclaiming warranty or limiting liability differently from the terms of
sections 15 and 16 of this License; or
* **b)** Requiring preservation of specified reasonable legal notices or author
attributions in that material or in the Appropriate Legal Notices displayed by works
containing it; or
* **c)** Prohibiting misrepresentation of the origin of that material, or requiring that
modified versions of such material be marked in reasonable ways as different from the
original version; or
* **d)** Limiting the use for publicity purposes of names of licensors or authors of the
material; or
* **e)** Declining to grant rights under trademark law for use of some trade names,
trademarks, or service marks; or
* **f)** Requiring indemnification of licensors and authors of that material by anyone
who conveys the material (or modified versions of it) with contractual assumptions of
liability to the recipient, for any liability that these contractual assumptions
directly impose on those licensors and authors.

All other non-permissive additional terms are considered "further
restrictions" within the meaning of section 10. If the Program as you received
it, or any part of it, contains a notice stating that it is governed by this License
along with a term that is a further restriction, you may remove that term. If a
license document contains a further restriction but permits relicensing or conveying
under this License, you may add to a covered work material governed by the terms of
that license document, provided that the further restriction does not survive such
relicensing or conveying.

If you add terms to a covered work in accord with this section, you must place, in
the relevant source files, a statement of the additional terms that apply to those
files, or a notice indicating where to find the applicable terms.

Additional terms, permissive or non-permissive, may be stated in the form of a
separately written license, or stated as exceptions; the above requirements apply
either way.

### 8. Termination

You may not propagate or modify a covered work except as expressly provided under
this License. Any attempt otherwise to propagate or modify it is void, and will
automatically terminate your rights under this License (including any patent licenses
granted under the third paragraph of section 11).

However, if you cease all violation of this License, then your license from a
particular copyright holder is reinstated **(a)** provisionally, unless and until the
copyright holder explicitly and finally terminates your license, and **(b)** permanently,
if the copyright holder fails to notify you of the violation by some reasonable means
prior to 60 days after the cessation.

Moreover, your license from a particular copyright holder is reinstated permanently
if the copyright holder notifies you of the violation by some reasonable means, this
is the first time you have received notice of violation of this License (for any
work) from that copyright holder, and you cure the violation prior to 30 days after
your receipt of the notice.

Termination of your rights under this section does not terminate the licenses of
parties who have received copies or rights from you under this License. If your
rights have been terminated and not permanently reinstated, you do not qualify to
receive new licenses for the same material under section 10.

### 9. Acceptance Not Required for Having Copies

You are not required to accept this License in order to receive or run a copy of the
Program. Ancillary propagation of a covered work occurring solely as a consequence of
using peer-to-peer transmission to receive a copy likewise does not require
acceptance. However, nothing other than this License grants you permission to
propagate or modify any covered work. These actions infringe copyright if you do not
accept this License. Therefore, by modifying or propagating a covered work, you
indicate your acceptance of this License to do so.

### 10. Automatic Licensing of Downstream Recipients

Each time you convey a covered work, the recipient automatically receives a license
from the original licensors, to run, modify and propagate that work, subject to this
License. You are not responsible for enforcing compliance by third parties with this
License.

An "entity transaction" is a transaction transferring control of an
organization, or substantially all assets of one, or subdividing an organization, or
merging organizations. If propagation of a covered work results from an entity
transaction, each party to that transaction who receives a copy of the work also
receives whatever licenses to the work the party's predecessor in interest had or
could give under the previous paragraph, plus a right to possession of the
Corresponding Source of the work from the predecessor in interest, if the predecessor
has it or can get it with reasonable efforts.

You may not impose any further restrictions on the exercise of the rights granted or
affirmed under this License. For example, you may not impose a license fee, royalty,
or other charge for exercise of rights granted under this License, and you may not
initiate litigation (including a cross-claim or counterclaim in a lawsuit) alleging
that any patent claim is infringed by making, using, selling, offering for sale, or
importing the Program or any portion of it.

### 11. Patents

A "contributor" is a copyright holder who authorizes use under this
License of the Program or a work on which the Program is based. The work thus
licensed is called the contributor's "contributor version".

A contributor's "essential patent claims" are all patent claims owned or
controlled by the contributor, whether already acquired or hereafter acquired, that
would be infringed by some manner, permitted by this License, of making, using, or
selling its contributor version, but do not include claims that would be infringed
only as a consequence of further modification of the contributor version. For
purposes of this definition, "control" includes the right to grant patent
sublicenses in a manner consistent with the requirements of this License.

Each contributor grants you a non-exclusive, worldwide, royalty-free patent license
under the contributor's essential patent claims, to make, use, sell, offer for sale,
import and otherwise run, modify and propagate the contents of its contributor
version.

In the following three paragraphs, a "patent license" is any express
agreement or commitment, however denominated, not to enforce a patent (such as an
express permission to practice a patent or covenant not to sue for patent
infringement). To "grant" such a patent license to a party means to make
such an agreement or commitment not to enforce a patent against the party.

If you convey a covered work, knowingly relying on a patent license, and the
Corresponding Source of the work is not available for anyone to copy, free of charge
and under the terms of this License, through a publicly available network server or
other readily accessible means, then you must either **(1)** cause the Corresponding
Source to be so available, or **(2)** arrange to deprive yourself of the benefit of the
patent license for this particular work, or **(3)** arrange, in a manner consistent with
the requirements of this License, to extend the patent license to downstream
recipients. "Knowingly relying" means you have actual knowledge that, but
for the patent license, your conveying the covered work in a country, or your
recipient's use of the covered work in a country, would infringe one or more
identifiable patents in that country that you have reason to believe are valid.

If, pursuant to or in connection with a single transaction or arrangement, you
convey, or propagate by procuring conveyance of, a covered work, and grant a patent
license to some of the parties receiving the covered work authorizing them to use,
propagate, modify or convey a specific copy of the covered work, then the patent
license you grant is automatically extended to all recipients of the covered work and
works based on it.

A patent license is "discriminatory" if it does not include within the
scope of its coverage, prohibits the exercise of, or is conditioned on the
non-exercise of one or more of the rights that are specifically granted under this
License. You may not convey a covered work if you are a party to an arrangement with
a third party that is in the business of distributing software, under which you make
payment to the third party based on the extent of your activity of conveying the
work, and under which the third party grants, to any of the parties who would receive
the covered work from you, a discriminatory patent license **(a)** in connection with
copies of the covered work conveyed by you (or copies made from those copies), or **(b)**
primarily for and in connection with specific products or compilations that contain
the covered work, unless you entered into that arrangement, or that patent license
was granted, prior to 28 March 2007.

Nothing in this License shall be construed as excluding or limiting any implied
license or other defenses to infringement that may otherwise be available to you
under applicable patent law.

### 12. No Surrender of Others' Freedom

If conditions are imposed on you (whether by court order, agreement or otherwise)
that contradict the conditions of this License, they do not excuse you from the
conditions of this License. If you cannot convey a covered work so as to satisfy
simultaneously your obligations under this License and any other pertinent
obligations, then as a consequence you may not convey it at all. For example, if you
agree to terms that obligate you to collect a royalty for further conveying from
those to whom you convey the Program, the only way you could satisfy both those terms
and this License would be to refrain entirely from conveying the Program.

### 13. Use with the GNU Affero General Public License

Notwithstanding any other provision of this License, you have permission to link or
combine any covered work with a work licensed under version 3 of the GNU Affero
General Public License into a single combined work, and to convey the resulting work.
The terms of this License will continue to apply to the part which is the covered
work, but the special requirements of the GNU Affero General Public License, section
13, concerning interaction through a network will apply to the combination as such.

### 14. Revised Versions of this License

The Free Software Foundation may publish revised and/or new versions of the GNU
General Public License from time to time. Such new versions will be similar in spirit
to the present version, but may differ in detail to address new problems or concerns.

Each version is given a distinguishing version number. If the Program specifies that
a certain numbered version of the GNU General Public License "or any later
version" applies to it, you have the option of following the terms and
conditions either of that numbered version or of any later version published by the
Free Software Foundation. If the Program does not specify a version number of the GNU
General Public License, you may choose any version ever published by the Free
Software Foundation.

If the Program specifies that a proxy can decide which future versions of the GNU
General Public License can be used, that proxy's public statement of acceptance of a
version permanently authorizes you to choose that version for the Program.

Later license versions may give you additional or different permissions. However, no
additional obligations are imposed on any author or copyright holder as a result of
your choosing to follow a later version.

### 15. Disclaimer of Warranty

THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY APPLICABLE LAW.
EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES
PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER
EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE
QUALITY AND PERFORMANCE OF THE PROGRAM IS WITH YOU. SHOULD THE PROGRAM PROVE
DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

### 16. Limitation of Liability

IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL ANY
COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS THE PROGRAM AS
PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
OR LOSSES SUSTAINED BY YOU OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE
WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE
POSSIBILITY OF SUCH DAMAGES.

### 17. Interpretation of Sections 15 and 16

If the disclaimer of warranty and limitation of liability provided above cannot be
given local legal effect according to their terms, reviewing courts shall apply local
law that most closely approximates an absolute waiver of all civil liability in
connection with the Program, unless a warranty or assumption of liability accompanies
a copy of the Program in return for a fee.

_END OF TERMS AND CONDITIONS_

## How to Apply These Terms to Your New Programs

If you develop a new program, and you want it to be of the greatest possible use to
the public, the best way to achieve this is to make it free software which everyone
can redistribute and change under these terms.

To do so, attach the following notices to the program. It is safest to attach them
to the start of each source file to most effectively state the exclusion of warranty;
and each file should have at least the "copyright" line and a pointer to
where the full notice is found.

    {`<program>`}  Copyright (C) {`<year>`}  {`<name of author>`}

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see [http://www.gnu.org/licenses/](http://www.gnu.org/licenses/).

Also add information on how to contact you by electronic and paper mail.

If the program does terminal interaction, make it output a short notice like this
when it starts in an interactive mode:

    {`<program>`}  Copyright (C) {`<year>`}  {`<name of author>`}
    This program comes with ABSOLUTELY NO WARRANTY; for details type 'show w'.
    This is free software, and you are welcome to redistribute it
    under certain conditions; type 'show c' for details.

The hypothetical commands `show w` and `show c` should show the appropriate parts of
the General Public License. Of course, your program's commands might be different;
for a GUI interface, you would use an "about box".

You should also get your employer (if you work as a programmer) or school, if any, to
sign a "copyright disclaimer" for the program, if necessary. For more
information on this, and how to apply and follow the GNU GPL, see
[http://www.gnu.org/licenses/](http://www.gnu.org/licenses/).

The GNU General Public License does not permit incorporating your program into
proprietary programs. If your program is a subroutine library, you may consider it
more useful to permit linking proprietary applications with the library. If this is
what you want to do, use the GNU Lesser General Public License instead of this
License. But first, please read
[http://www.gnu.org/philosophy/why-not-lgpl.html](http://www.gnu.org/philosophy/why-not-lgpl.html).
```

# oss/why-open-source.mdx

```mdx
---
title: Building Privacy Tools in the Open
description: We believe great developer tools should be built in the open, with transparency and community collaboration at their core. This philosophy guides how we're building modern privacy infrastructure.
---

## Open Source Foundation

Consent Management (c15t) is built with a strong open source foundation:

- **Core Platform**: GNU3 licensed, ensuring your privacy tools remain free and open
- **UI Components**: Built on shadcn/ui, giving you complete customization control
- **Server Components**: Full Next.js app directory support for modern applications
- **Cloud Platform**: Optional managed service coming soon (while keeping core open source)

## Why We Chose Open Source

Privacy infrastructure should be:

1. **Transparent**
   - See exactly how user consent is managed
   - Audit the code handling sensitive data
   - Understand the complete data flow

2. **Community-Driven**
   - Benefit from collective expertise
   - Shape the future of privacy tools
   - Share best practices globally

3. **Trustworthy**
   - No black boxes in privacy management
   - Full visibility into data handling
   - Community-verified security

4. **Flexible**
   - Self-host for complete control
   - Customize to your exact needs
   - Integrate with your existing stack

## Following Giants

We're inspired by transformative developer platforms:

- **Vercel**: Revolutionized deployment workflows
- **Clerk**: Simplified authentication
- **Resend**: Modernized email infrastructure
- **Unkey**: Streamlined API key management

Just as these platforms brought developer experience to the forefront, we're bringing that same level of excellence and simplicity to privacy management.

## Our Commitment

By choosing open source, we commit to:

- **Transparency**: All core code is public and auditable
- **Community**: Decisions made with community input
- **Quality**: Enterprise-grade while remaining open
- **Longevity**: Sustainable open source development

## Get Started

Join us in building the future of privacy management:

<Cards>
  <Card 
    title="Contributing to c15t.com" 
    description="Learn how to contribute and join our community"
    href="/docs/open-source/contributing" 
  />
  <Card 
    title="License" 
    description="Understanding the GNU3 license and your rights"
    href="/docs/open-source/license" 
  />
</Cards>
```

# react/assets/container-settings.png

This is a binary file of the type: Image

# react/assets/new-tag.png

This is a binary file of the type: Image

# react/google-tag-manager.mdx

```mdx
---
title: Google Tag Manager (Unstable)
description: Learn how to integrate c15t with Google Tag Manager (GTM).
---

We're working on a beta version of the Google Tag Manager integration.
c15t will automatically inject the GTM script into your page.

<Steps> 
<Step>
### Creating a Tag Manager Container

<Callout type="note">
This step is optional if you already have a Tag Manager container. Ensure your container has consent overview enabled.
</Callout>

After signing into Google Tag Manager, you can create a new container.
[Continue to Google Tag Manager](https://tagmanager.google.com/)

1. In Tag Manager, click Admin > Container Settings.
2. Under Additional Settings, select "Enable consent overview".

![Enable consent overview](./assets/container-settings.png)
</Step>

<Step>
### Setting up c15t with Google Tag Manager

After creating your container, you can set up c15t with Google Tag Manager.

All you need to do copy and paste your container ID into the `unstable_googleTagManager.id` property.

This begins with "GTM-". 

\`\`\`tsx
<ConsentManagerProvider
  options={{
    mode: 'c15t',
    backendURL: 'https://your-instance.c15t.dev',
    unstable_googleTagManager: {
      id: 'GTM-XXXXXXX',
    },
  }}
>
\`\`\`

If you have GTM in your site already, you can remove the GTM script from your head section.

</Step>
</Steps>

### All Done!

c15t will automatically inject the GTM script into your page and update the consent state in GTM.








```

# react/meta.json

```json
{
	"title": "React",
	"root": true,
	"icon": "react",
	"pages": [
		"../introduction",
		"../ai-tools-integrations",
		"quickstart",
		"google-tag-manager",
		"../callbacks",
		"--- React Components ---",
		"../components/react/cookie-banner",
		"../components/react/consent-manager-dialog",
		"../components/react/consent-manager-widget",
		"../components/react/dev-tools",
		"--- Storing Consent ---",
		"../storing-consent/overview",
		"../storing-consent/hosted-c15t",
		"../storing-consent/offline-mode",
		"../storing-consent/custom-client",
		"--- Hooks ---",
		"../hooks/use-consent-manager",
		"../hooks/use-focus-trap",
		"--- Styles ---",
		"../styling/index",
		"../styling/color-scheme",
		"../styling/classnames",
		"../styling/tailwind",
		"../styling/css-variables",
		"../styling/inline-styles",
		"--- Contributing ---",
		"../oss/contributing",
		"../oss/license",
		"../oss/why-open-source"
	]
}

```

# react/quickstart.mdx

```mdx
---
title: React Quickstart
description: Learn how to integrate c15t into your React application with this step-by-step guide. We'll cover installation, configuration, and basic usage.
---

## CLI Setup (Recommended)
<Steps>
<Step>
### Generate Schema + Code

<RunCommand command="@c15t/cli generate" />

</Step>

<Step>
### Run Database Migrations (Optional)

<Callout type="note">
This is only required if you are self hosting c15t.
</Callout>

<RunCommand command="@c15t/cli migrate" />

</Step>
</Steps>

## Manual Setup
<Steps>
<Step>
### Install `@c15t/react` Package
 \`\`\`package-install
 @c15t/react
 \`\`\`
</Step>
 
<Step>
 
### Add to Your React Application

\`\`\`tsx title="src/App.jsx"
import { 
  ConsentManagerDialog,
  ConsentManagerProvider,
  CookieBanner,
  type ConsentManagerOptions
} from '@c15t/react';

function App() {
  const options = {
    mode: 'c15t', 
    backendURL: process.env.REACT_APP_C15T_URL,
    consentCategories: ['necessary', 'marketing'], // Optional: Specify which consent categories to show in the banner. 
    ignoreGeoLocation: true, // Useful for development to always view the banner.
  };

  return (
    <ConsentManagerProvider options={options}>
      <div className="App">
        {/* Your application content */}
      </div>
      <CookieBanner />
      <ConsentManagerDialog />
    </ConsentManagerProvider>
  );
}

export default App;
\`\`\`

<Callout type="tip">
You can create an instance at [consent.io](https://consent.io) (recommended) or use c15t offline by setting `mode: 'offline'`.
</Callout>
</Step>
</Steps>

--- 

## Hosting Options

### Creating a consent.io Instance (Recommended)

<Callout type="info">
Using consent.io is the recommended method as it is the easiest way to get started and requires little maintenance.
</Callout>

[consent.io](https://consent.io) provides a fully managed consent management service. This is the recommended method as it is the easiest way to get started and requires little maintenance.

<Steps>

<Step>
Sign up for a [consent.io](https://consent.io) account.
</Step>

<Step>
After signing up, create a new instance, located in the top-right corner.

<Callout>
When creating an instance it is important to list all the trusted origins for your application such as "localhost", your production domain, etc.
</Callout>

</Step>

<Step>
After the instance is created, you will be given a backendURL, which you can add to your `ConsentManagerOptions`.

A backend URL might look like this: `https://<my-instance>.c15t.dev/`.
</Step>

</Steps>

### Alternative Storage Options

<Callout type="note">
For more advanced setup options, choose the approach that best suits your requirements.
</Callout>

For more advanced setup options, please refer to:
- [Overview](/docs/storing-consent/overview) - Compare different approaches to storing consent decisions in your application
- [Hosted c15t](/docs/storing-consent/hosted-c15t) - Complete guide to using consent.io
- [Offline Mode](/docs/storing-consent/offline-mode) - Complete guide to using c15t without a backend
- [Custom Client](/docs/storing-consent/custom-client) - Advanced implementation with custom handlers for full control

## Decision Guide

<Callout>
Use this flowchart to determine which c15t configuration is best for your needs.
</Callout>

<Mermaid chart={`
flowchart TD
    Start([Start here]) --> StoreConsent
    
    StoreConsent{Need to store\nconsent choices?}
    StoreConsent -->|Yes| ManagedService
    StoreConsent -->|No| OfflineMode
    
    ManagedService{Want a managed\nservice?}
    ManagedService -->|Yes| ConsentIO
    ManagedService -->|No| CustomClient
    
    OfflineMode([c15t Offline Mode]):::optionStyle
    OfflineMode -.-> OfflineNote[Client-side only\nStores in localStorage]:::noteStyle
    
    ConsentIO([consent.io]):::recommendStyle
    ConsentIO -.-> ConsentIONote[Fully managed\nSimplest setup]:::noteStyle
    
    CustomClient([Custom Client]):::optionStyle
    CustomClient -.-> CustomNote[Full control\nRequires implementation]:::noteStyle
    
    %% Styling
    classDef recommendStyle fill:#4caf50,stroke:#388e3c,color:white,stroke-width:2px;
    classDef optionStyle fill:#37474f,stroke:#263238,color:white,stroke-width:1px;
    classDef noteStyle fill:#424242,stroke:none,color:#aaa,font-size:12px;
`} />

## Next Steps

<Callout type="tip">
Choose your next step based on your specific implementation needs.
</Callout>

<div className="mt-6">
  <CompactCard 
    href="/docs/storing-consent/hosted-c15t" 
    icon={
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    }
  >
    Learn more about <code>Hosted c15t (consent.io)</code>
  </CompactCard>

  <CompactCard 
    href="/docs/storing-consent/self-hosting"
    icon={
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
      </svg>
    }
  >
    Learn more about <code>Self-Hosting</code>
  </CompactCard>

  <CompactCard 
    href="/docs/storing-consent/offline-mode"
    icon={
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L10 10" />
      </svg>
    }
  >
    Learn more about <code>Offline Mode</code>
  </CompactCard>

  <CompactCard 
    href="/docs/storing-consent/custom-client"
    icon={
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    }
  >
    Learn more about <code>Custom Client</code>
  </CompactCard>
</div>


```

# storing-consent/custom-client.mdx

```mdx
---
title: 'Custom Client'
description: 'Implement your own consent storage solution with a custom client for ultimate flexibility and control'
---
import { RiServerLine, RiTimerLine, RiGlobalLine } from '@remixicon/react';

The custom client mode gives you complete control over how consent decisions are stored and retrieved, allowing for integration with any storage backend or custom logic.

## Key Characteristics

- **Maximum flexibility** - Design a storage solution that meets your specific requirements
- **Full integration** - Connect with existing user data systems or authentication services
- **Complete control** - Implement custom caching, batching, or synchronization mechanisms
- **Advanced use cases** - Support for complex scenarios like multi-tenant applications

<Callout type="warning">
The custom client mode is the most flexible but also the most complex implementation option. Only use it if you need complete control over consent handling.
</Callout>

## Implementation

<Steps>
<Step>
### Install the Package

\`\`\`package-install
@c15t/react
\`\`\`
</Step>

<Step>
### Create Custom Endpoint Handlers

<Callout type="note">
You must implement all three core handlers: `showConsentBanner`, `setConsent`, and `verifyConsent`.
</Callout>

First, create handlers for the required endpoints:

\`\`\`tsx title="lib/consent-handlers.ts"
import type {
  SetConsentRequestBody,
  SetConsentResponse,
  ShowConsentBannerResponse,
  VerifyConsentRequestBody,
  VerifyConsentResponse,
} from '@c15t/backend';
import type { EndpointHandlers } from '@c15t/react';

// Custom storage implementation (could be localStorage, IndexedDB, etc.)
const consentStorage = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
  }
};

export const createCustomHandlers = (): EndpointHandlers => {
  return {
    // Handler for checking if banner should be shown
    showConsentBanner: async () => {
      const hasConsent = Boolean(consentStorage.getItem('custom-consent'));
      
      return {
        data: {
          showConsentBanner: !hasConsent,
          jurisdiction: { code: 'EU', message: 'European Union' },
          location: { countryCode: 'DE', regionCode: null }
        },
        error: null,
        ok: true,
        response: null
      };
    },
    
    // Handler for saving consent preferences
    setConsent: async (options) => {
      const body = options?.body as SetConsentRequestBody;
      
      // Store the consent preferences
      consentStorage.setItem(
        'custom-consent',
        JSON.stringify({
          timestamp: new Date().toISOString(),
          preferences: body?.preferences || {},
        })
      );
      
      return {
        data: { success: true },
        error: null,
        ok: true,
        response: null
      };
    },
    
    // Handler for verifying consent
    verifyConsent: async (options) => {
      const body = options?.body as VerifyConsentRequestBody;
      const storedConsent = consentStorage.getItem('custom-consent');
      
      // Parse stored consent or create default response
      let response: VerifyConsentResponse = {
        valid: false,
        requiredConsent: body?.requiredConsent || [],
        missingConsent: body?.requiredConsent || []
      };
      
      if (storedConsent) {
        const parsedConsent = JSON.parse(storedConsent);
        const preferences = parsedConsent.preferences || {};
        
        // Check if all required consent items are present and accepted
        const missingConsent = (body?.requiredConsent || []).filter(
          item => !preferences[item] || preferences[item] !== true
        );
        
        response = {
          valid: missingConsent.length === 0,
          requiredConsent: body?.requiredConsent || [],
          missingConsent
        };
      }
      
      return {
        data: response,
        error: null,
        ok: true,
        response: null
      };
    }
  };
};
\`\`\`
</Step>

<Step>
### Configure the Provider with Custom Client

\`\`\`tsx title="app/layout.tsx"
import { 
  ConsentManagerDialog,
  ConsentManagerProvider,
  CookieBanner,
  type ConsentManagerOptions
} from '@c15t/react';
import { createCustomHandlers } from '../lib/consent-handlers';

export default function Layout({ children }: { children: React.ReactNode }) {
  const options: ConsentManagerOptions = {
    mode: 'custom',
    endpointHandlers: createCustomHandlers(),
    // Optional event callbacks
    callbacks: {
      onConsentSet: (response) => {
        console.log('Consent has been saved');
      }
    }
  };

  return (
    <ConsentManagerProvider options={options}>
      {children}
      <CookieBanner />
      <ConsentManagerDialog />
    </ConsentManagerProvider>
  );
}
\`\`\`
</Step>
</Steps>

## Custom Handler Interface

<Callout type="tip">
Each handler must return a Promise that resolves to a `ResponseContext` object with the appropriate data structure.
</Callout>

Each handler function must implement the `EndpointHandler` interface, which returns a Promise resolving to a `ResponseContext` object:

\`\`\`tsx
type EndpointHandler<ResponseType, BodyType, QueryType> = (
  options?: FetchOptions<ResponseType, BodyType, QueryType>
) => Promise<ResponseContext<ResponseType>>;

interface ResponseContext<T> {
  data: T | null;
  error: {
    message: string;
    status: number;
    code: string;
    cause?: unknown;
  } | null;
  ok: boolean;
  response: Response | null;
}
\`\`\`

## Required Endpoint Handlers

Your custom client must implement three core endpoint handlers:

### 1. showConsentBanner

Determines if the consent banner should be displayed to the user.

\`\`\`tsx
showConsentBanner: EndpointHandler<ShowConsentBannerResponse>;

// Return type structure
interface ShowConsentBannerResponse {
  showConsentBanner: boolean;
  jurisdiction: {
    code: string;
    message: string;
  };
  location: {
    countryCode: string;
    regionCode: string | null;
  };
}
\`\`\`

### 2. setConsent

Saves user consent preferences.

\`\`\`tsx
setConsent: EndpointHandler<SetConsentResponse, SetConsentRequestBody>;

// Request body structure
interface SetConsentRequestBody {
  preferences: Record<string, boolean>;
  // Additional custom fields can be included
}

// Response structure
interface SetConsentResponse {
  success: boolean;
}
\`\`\`

### 3. verifyConsent

Checks if existing consent meets required criteria.

\`\`\`tsx
verifyConsent: EndpointHandler<VerifyConsentResponse, VerifyConsentRequestBody>;

// Request body structure
interface VerifyConsentRequestBody {
  requiredConsent: string[];
}

// Response structure
interface VerifyConsentResponse {
  valid: boolean;
  requiredConsent: string[];
  missingConsent: string[];
}
\`\`\`

## Advanced Features

### Dynamic Handlers

<Callout>
Dynamic handlers allow you to extend the client's functionality beyond the core consent operations.
</Callout>

You can register additional custom endpoint handlers for specialized functionality:

\`\`\`tsx
import { useConsentManager } from '@c15t/react';

function MyComponent() {
  const { client } = useConsentManager();
  
  useEffect(() => {
    if (client && 'registerHandler' in client) {
      // Register a custom endpoint handler
      client.registerHandler('customEndpoint', async (options) => {
        // Custom implementation
        return {
          data: { customData: 'example' },
          error: null,
          ok: true,
          response: null
        };
      });
    }
  }, [client]);
  
  return <div>My component</div>;
}
\`\`\`

### Error Handling

<Callout type="important">
Proper error handling is essential for custom clients to ensure your application behaves predictably.
</Callout>

Custom handlers should handle errors and return appropriate response contexts:

\`\`\`tsx
const errorHandler: EndpointHandler = async () => {
  try {
    // Operation that might fail
    throw new Error('Something went wrong');
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : String(error),
        status: 500,
        code: 'CUSTOM_ERROR',
        cause: error
      },
      ok: false,
      response: null
    };
  }
};
\`\`\`

### Integration with External Systems

Custom clients can seamlessly integrate with third-party consent management systems:

\`\`\`tsx
const createThirdPartyHandlers = (): EndpointHandlers => {
  return {
    showConsentBanner: async () => {
      // Call third-party API to check if banner should be shown
      const response = await thirdPartyClient.checkConsentStatus();
      
      return {
        data: {
          showConsentBanner: response.needsConsent,
          jurisdiction: { code: response.region, message: response.regionName },
          location: { countryCode: response.country, regionCode: null }
        },
        error: null,
        ok: true,
        response: null
      };
    },
    
    // Other handlers...
  };
};
\`\`\`

## Use Cases

### Integration with Existing Systems

<Callout type="note">
If your organization already has a consent management system, custom handlers provide a bridge between it and c15t's UI components.
</Callout>

\`\`\`tsx
// Integrate with an existing in-house consent system
const createIntegrationHandlers = (): EndpointHandlers => {
  return {
    showConsentBanner: async () => {
      const consentStatus = await existingConsentSystem.getStatus();
      return {
        data: {
          showConsentBanner: consentStatus.requiresBanner,
          jurisdiction: consentStatus.jurisdiction,
          location: consentStatus.location
        },
        error: null,
        ok: true,
        response: null
      };
    },
    
    // Other handlers
  };
};
\`\`\`

### A/B Testing Consent Flows

\`\`\`tsx
// Create handlers for A/B testing different consent UIs
const createABTestHandlers = (): EndpointHandlers => {
  // Randomly assign user to test group
  const testGroup = Math.random() > 0.5 ? 'A' : 'B';
  
  return {
    showConsentBanner: async () => {
      // Log the test group for analytics
      analytics.logGroup(testGroup);
      
      return {
        data: {
          showConsentBanner: true,
          jurisdiction: { code: 'EU', message: 'European Union' },
          location: { countryCode: 'DE', regionCode: null },
          // Include test group in the response data
          testGroup
        },
        error: null,
        ok: true,
        response: null
      };
    },
    
    // Other handlers
  };
};
\`\`\`

### Hybrid Storage Approach

<Callout type="tip">
A hybrid approach can give you the best of both worlds: local storage for reliability and remote storage for analytics.
</Callout>

\`\`\`tsx
// Store data both locally and remotely when connection is available
const createHybridHandlers = (): EndpointHandlers => {
  return {
    setConsent: async (options) => {
      const body = options?.body;
      
      // Always save locally first
      localStorage.setItem('hybrid-consent', JSON.stringify({
        timestamp: new Date().toISOString(),
        preferences: body?.preferences
      }));
      
      // Try to save remotely if online
      if (navigator.onLine) {
        try {
          await fetch('/api/external-consent', {
            method: 'POST',
            body: JSON.stringify(body)
          });
        } catch (error) {
          // Queue for retry later
          const queue = JSON.parse(localStorage.getItem('sync-queue') || '[]');
          queue.push({ type: 'setConsent', data: body });
          localStorage.setItem('sync-queue', JSON.stringify(queue));
        }
      }
      
      return {
        data: { success: true },
        error: null,
        ok: true,
        response: null
      };
    },
    
    // Other handlers
  };
};
\`\`\`

### With External Consent Management Platform

\`\`\`tsx
export const externalCMPStorage = {
  async getConsent(consentId) {
    // Map to your CMP's purpose ID if needed
    const purposeId = mapToPurposeId(consentId);
    return externalCMP.getPurposeConsent(purposeId);
  },
  
  async getConsents() {
    // Get all consents from external CMP
    const purposes = await externalCMP.getAllPurposeConsents();
    
    // Transform to c15t format
    return purposes.map(purpose => ({
      id: mapFromPurposeId(purpose.id),
      status: purpose.consent,
      timestamp: purpose.timestamp
    }));
  },
  
  async setConsent(consentId, value) {
    const purposeId = mapToPurposeId(consentId);
    await externalCMP.setPurposeConsent(purposeId, value.status);
    return { success: true };
  }
};

function mapToPurposeId(c15tId) {
  const mapping = {
    'marketing': 'purpose-1',
    'analytics': 'purpose-2',
    // Add your mappings
  };
  return mapping[c15tId] || c15tId;
}

function mapFromPurposeId(purposeId) {
  const mapping = {
    'purpose-1': 'marketing',
    'purpose-2': 'analytics',
    // Add your mappings
  };
  return mapping[purposeId] || purposeId;
}
\`\`\`

## When to Use Custom Client

Consider using the custom client mode when:

- You need to integrate with an existing user data system
- You have complex consent storage requirements
- You want to implement advanced features like batching or caching
- You're integrating with an external consent management platform
- You need to support multi-tenant applications
- You're implementing a hybrid online/offline strategy

For simpler use cases, consider [Hosted Solution](/docs/storing-consent/hosted-c15t) or [Offline Mode](/nextjs/storing-consent/offline-mode) instead.

## Next Steps

<div className="mt-6">
  <CompactCard 
    href="/docs/storing-consent/offline-mode" 
    icon={<RiTimerLine size={18} />}
  >
    Explore <code>Offline Mode</code>
  </CompactCard>

  <CompactCard 
    href="/docs/storing-consent/hosted-c15t" 
    icon={<RiGlobalLine size={18} />}
  >
    Use <code>Hosted c15t</code>
  </CompactCard>
</div> 
```

# storing-consent/hosted-c15t.mdx

```mdx
---
title: 'Hosted Solution'
description: 'Use consent.io for an easy, managed consent storage solution with minimal setup'
---
import { RiFlashlightLine, RiTimerLine, RiServerLine, RiSettings4Line } from '@remixicon/react';

<Callout type="default">
  <h3>Congratulations, you've chosen the best way to deploy to production!</h3>
  
  consent.io provides a fully managed service that removes all the infrastructure complexity. You can focus on your application while we handle scaling, updates, and compliance monitoring. For organizations with specific requirements, we also offer [self-hosting](/docs/storing-consent/self-hosting) options.
</Callout>

[consent.io](https://consent.io) provides a fully managed consent management service, offering the easiest way to implement robust server-based consent storage with minimal setup and maintenance.

## Key Benefits

- **Zero Backend Maintenance** - No server setup or management required
- **Automatic Updates** - Always running the latest version
- **Built-in Scaling** - Handles traffic spikes without configuration
- **Geographic Detection** - Built-in jurisdiction detection for compliance
- **Analytics Dashboard** - Insights into consent patterns and compliance
- **Cross-Device Sync** - Users maintain consistent consent status across all devices

## Getting Started

<Steps>
<Step>
### Create a consent.io Instance

1. Sign up for a [consent.io](https://consent.io) account
2. Create a new instance in the dashboard
3. Configure your trusted origins (domains that can connect to your instance)
4. Copy the provided backendURL (e.g., `https://your-instance.c15t.dev`)
</Step>

<Step>
### Configure Your Client

Set up your frontend to use the consent.io instance:

\`\`\`tsx
// app/layout.tsx
import { 
  ConsentManagerDialog,
  ConsentManagerProvider,
  CookieBanner
} from '@c15t/react';

export default function RootLayout({ children }) {
  const options = {
    mode: 'c15t',
    backendURL: 'https://your-instance.c15t.dev',
  };

  return (
    <ConsentManagerProvider options={options}>
      {children}
      <CookieBanner />
      <ConsentManagerDialog />
    </ConsentManagerProvider>
  );
}
\`\`\`
</Step>

<Step>
### Test Your Integration

1. Run your application
2. Verify the consent banner appears 
3. Check the consent.io dashboard to confirm data is being recorded
</Step>
</Steps>

## Client Configuration

Configure your frontend to connect to consent.io:

\`\`\`tsx
const options = {
  // Required: Set to 'c15t' mode for hosted services
  mode: 'c15t',

  // Required: URL to your consent.io instance
  backendURL: 'https://your-instance.c15t.dev',
  
  
  // Optional: Global event callbacks
  callbacks: {
    onError: (response, path) => {
      console.error(`Request to ${path} failed:`, response.error);
    },
    onConsentSet: (response) => {
      console.log('Consent set successfully');
    }
  }
};
\`\`\`

<CompactCard 
  href="/docs/nextjs/quickstart" 
  icon={<RiFlashlightLine size={18} />}
>
  See the <code>Next.js Quickstart Guide</code> for more frontend integration details
</CompactCard>

## Alternative: Self-Hosting

If you need complete control over your consent management infrastructure, you can self-host a c15t instance instead of using consent.io.

<Callout type="warning">
Self-hosting requires more setup and maintenance effort but gives you complete control over your data and infrastructure.
</Callout>

<CompactCard 
  href="/docs/storing-consent/self-hosting" 
  icon={<RiServerLine size={18} />}
>
  See the <code>Self-Hosting Guide</code> for detailed setup instructions
</CompactCard>

## Deployment Options

### Docker Support

<Callout type="warning">
Docker support for c15t is not currently available out-of-the-box. We're interested in adding this feature and would welcome community contributions.
</Callout>

If you're interested in containerizing c15t for Docker deployments:

- We don't currently provide official Docker images or Dockerfiles
- This is on our roadmap but doesn't have a specific timeline
- Community contributions for Docker support would be greatly appreciated
- You can propose Docker implementations through our [GitHub issue](https://github.com/c15t/c15t/issues/162)

Until official Docker support is available, we recommend using one of our existing deployment options:

1. **consent.io (hosted)** - Zero setup, fully managed service
2. **Self-hosting with Next.js API routes** - Integrated into your existing application
3. **Standalone server** - Standard Node.js deployment

## When to Use Hosted c15t

Choose consent.io (hosted c15t) when:

- You want the simplest implementation with minimal backend configuration
- You prefer not to manage database setup and maintenance
- You need geographic jurisdiction detection built-in
- You want automatic updates and scaling

Consider [Offline Mode](/nextjs/storing-consent/offline-mode) for simple applications without cross-device needs, or [Self-Hosting](/nextjs/storing-consent/self-hosting) for complete control.

## Next Steps

<div className="mt-6">
  <CompactCard 
    href="/docs/storing-consent/offline-mode" 
    icon={<RiTimerLine size={18} />}
  >
    Configure <code>Offline Mode</code>
  </CompactCard>

  <CompactCard 
    href="/docs/storing-consent/self-hosting" 
    icon={<RiServerLine size={18} />}
  >
    Explore <code>Self-Hosting</code> options
  </CompactCard>

  <CompactCard 
    href="/docs/storing-consent/custom-client" 
    icon={<RiSettings4Line size={18} />}
  >
    Create a <code>Custom Client</code>
  </CompactCard>
</div>
```

# storing-consent/offline-mode.mdx

```mdx
---
title: 'Offline Mode'
description: 'Store consent decisions in the browser with offline mode, perfect for sites without backend requirements'
---
import { RiServerLine, RiGlobalLine, RiSettings4Line } from '@remixicon/react';

The offline mode provides a simple, browser-based approach to storing user consent decisions without requiring a backend server.

## Key Characteristics

- **No backend required** - Everything is stored locally in the browser
- **Simplified setup** - Get started quickly with minimal configuration
- **Independence** - Works without external services or APIs
- **Fast implementation** - Ideal for prototyping and simpler sites

## Implementation

<Steps>
<Step>
### Install the Package

\`\`\`package-install
@c15t/react
\`\`\`
</Step>

<Step>
### Configure the Client

Set up the c15t client with offline mode:

\`\`\`jsx
// lib/c15tClient.js
import { createClient } from '@c15t/react'

export const c15tClient = createClient({
  mode: 'offline',
})
\`\`\`
</Step>

<Step>
### Add the Provider

Wrap your application with the ConsentManagerProvider:

\`\`\`jsx
import { ConsentManagerProvider } from '@c15t/react'
import { c15tClient } from '../lib/c15tClient'

function MyApp({ Component, pageProps }) {
  return (
    <ConsentManagerProvider options={c15tClient}>
      <Component {...pageProps} />
    </ConsentManagerProvider>
  )
}

export default MyApp
\`\`\`
</Step>
</Steps>

## How It Works

<Callout type="note">
Offline mode provides the same API interface as the standard client but operates completely client-side.
</Callout>

The offline mode implements the same interface as the standard client, but with the following differences:

1. **Storage**: All consent preferences are stored in the browser's localStorage using the configured key
2. **Network**: No network requests are made, all operations happen locally
3. **Consent Banner**: The banner visibility is determined by checking if a value exists in localStorage
4. **Consent Verification**: Always returns a successful response

## Configuration Options

The offline mode accepts the following configuration options:

\`\`\`jsx
const options = {
  mode: 'offline',
  // Optional: Add callback functions for various events
  callbacks: {
    onConsentBannerFetched: (response) => {
      console.log('Banner state retrieved:', response.data);
    },
    onConsentSet: (response) => {
      console.log('Consent preferences saved');
    },
    onConsentVerified: (response) => {
      console.log('Consent verification complete');
    },
    onError: (error, endpoint) => {
      console.error(`Error in ${endpoint}:`, error);
    }
  }
};
\`\`\`

## Storage Mechanisms

In offline mode, consent decisions are stored in the browser using:

### LocalStorage

By default, c15t uses the browser's localStorage to persist consent decisions:

\`\`\`jsx
// Default implementation
export const c15tClient = createClient({
  mode: 'offline',
  storage: 'localStorage' // This is the default, so can be omitted
})
\`\`\`

### SessionStorage

For session-based consent that's cleared when the browser is closed:

\`\`\`jsx
export const c15tClient = createClient({
  mode: 'offline',
  storage: 'sessionStorage'
})
\`\`\`

### Memory Only

For applications where persistence isn't needed:

\`\`\`jsx
export const c15tClient = createClient({
  mode: 'offline',
  storage: 'memory'
})
\`\`\`

## Browser Compatibility

<Callout type="warning">
Some browser environments like private browsing modes may have localStorage restrictions.
</Callout>

The offline mode relies on localStorage, which is supported in all modern browsers. However, it includes fallbacks for environments where localStorage might be unavailable or restricted:

- Private browsing modes in some browsers
- Cookie-blocking browser extensions
- Browsers with storage permissions disabled

In these cases, the client will log a warning and continue functioning with defaults.

## Use Cases

### Development and Testing

Offline mode is perfect for development and testing environments where you don't want to set up a backend:

\`\`\`jsx
// Development configuration
const options = {
  mode: process.env.NODE_ENV === 'development' 
    ? 'offline' 
    : 'c15t',
  backendURL: process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_C15T_URL
    : undefined
};
\`\`\`

### Static Sites

<Callout type="tip">
Offline mode is an excellent choice for static sites deployed on platforms like Vercel, Netlify, or GitHub Pages.
</Callout>

For static sites without backend integration, offline mode provides a simple solution:

\`\`\`jsx
const options = {
  mode: 'offline',
};
\`\`\`

### Fallback Mode

You can use offline mode as a fallback when the backend is unavailable:

\`\`\`jsx
import { useState, useEffect } from 'react';

function ConsentProvider({ children }) {
  const [mode, setMode] = useState('c15t');
  
  useEffect(() => {
    // Check if backend is available
    fetch('/api/c15t/status')
      .catch(() => {
        console.warn('c15t backend unavailable, switching to offline mode');
        setMode('offline');
      });
  }, []);
  
  const options = {
    mode,
    backendURL: mode === 'c15t' ? '/api/c15t' : undefined
  };
  
  return (
    <ConsentManagerProvider options={options}>
      {children}
    </ConsentManagerProvider>
  );
}
\`\`\`

## Limitations

<Callout type="important">
Understand these limitations when deciding if offline mode is right for your application.
</Callout>

While offline mode provides a functional consent management solution, it has some limitations:

1. **No Centralized Reporting**: Since all data is stored locally, you can't generate reports or analytics
2. **Device-Specific**: Consent preferences don't transfer between devices or browsers
3. **Storage Limits**: localStorage has size limitations (typically 5-10MB per domain)
4. **No Server-Side Logic**: Custom server-side processing of consent isn't possible

## When to Use Offline Mode

Consider using offline mode when:

- You're building a prototype or MVP
- Your site doesn't have a backend
- You want the simplest possible implementation
- Cross-device synchronization isn't a requirement
- You have limited compliance needs

For more complex applications or those with stricter compliance requirements, consider [Hosted c15t](/docs/storing-consent/hosted-c15t) instead.

## Next Steps

<div className="mt-6">
  <CompactCard 
    href="/docs/storing-consent/self-hosting" 
    icon={<RiServerLine size={18} />}
  >
    Configure <code>Self-Hosting</code>
  </CompactCard>

  <CompactCard 
    href="/docs/storing-consent/hosted-c15t" 
    icon={<RiGlobalLine size={18} />}
  >
    Use <code>Hosted c15t</code>
  </CompactCard>

  <CompactCard 
    href="/docs/storing-consent/custom-client" 
    icon={<RiSettings4Line size={18} />}
  >
    Create a <code>Custom Client</code>
  </CompactCard>
</div> 
```

# storing-consent/overview.mdx

```mdx
---
title: 'Overview'
description: 'Compare different approaches to storing consent decisions in your application'
---

c15t provides multiple approaches for storing consent decisions in your application. Each approach has different tradeoffs in terms of:

- Server requirements
- Data persistence
- Implementation complexity
- User experience

## Available Storage Options

| Storage Option | Description | Best For |
|--------------|-------------|----------|
| **Hosted c15t** | Using consent.io managed service | Production apps with minimal backend maintenance |
| **Self-Hosting** | Running your own c15t backend | Organizations requiring complete data control |
| **Offline Mode** | Browser-based storage with no server | Simple implementations or dev environments |
| **Custom Client** | Fully customized storage implementation | Complex integrations with existing systems |

<Callout type="tip">
  For most applications, we recommend starting with Hosted c15t (consent.io) for the simplest setup with the most features.
</Callout>

## Choosing the Right Approach

### Hosted c15t (Recommended)

[consent.io](https://consent.io) provides a fully managed consent management backend with:

- Zero backend maintenance
- Built-in scaling and automatic updates
- Geographic jurisdiction detection
- Analytics dashboard

<CompactCard 
  href="/docs/storing-consent/hosted-c15t" 
  icon={
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  }
>
  Learn more about <code>Hosted c15t</code>
</CompactCard>

### Self-Hosting

Run your own c15t instance to maintain complete control over your data and infrastructure:

- Full control over data storage and security
- Integration with your existing database systems
- Customizable configuration
- No external service dependencies

<CompactCard 
  href="/docs/storing-consent/self-hosting" 
  icon={
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
    </svg>
  }
>
  Learn more about <code>Self-Hosting</code>
</CompactCard>

### Offline Mode

Store consent decisions entirely in the browser without any server:

- Zero backend requirements
- Simplest implementation
- Works offline and in statically-hosted sites
- Perfect for development or simple use cases

<CompactCard 
  href="/docs/storing-consent/offline-mode" 
  icon={
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L10 10" />
    </svg>
  }
>
  Learn more about <code>Offline Mode</code>
</CompactCard>

### Custom Client

Implement your own storage logic for complete control:

- Integration with existing consent management systems
- Fully customized storage mechanism
- Advanced caching and batching capabilities
- Complex multi-tenant scenarios

<CompactCard 
  href="/docs/storing-consent/custom-client" 
  icon={
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  }
>
  Learn more about <code>Custom Client</code>
</CompactCard>

## Decision Guide

<Callout>
Use this decision tree to determine which storage option best fits your needs.
</Callout>

1. **Do you need consent data to persist across devices?**
   - No → Consider **Offline Mode**
   - Yes → Continue to question 2

2. **Do you need complete control over your consent data?**
   - No → Use **Hosted c15t** (consent.io)
   - Yes → Continue to question 3

3. **Do you have an existing consent management system?**
   - No → Use **Self-Hosting**
   - Yes → Consider **Custom Client**

## Creating a Client

The main factory function `configureConsentManager` creates the appropriate client implementation based on the provided options:

\`\`\`tsx
import { ConsentManagerProvider, configureConsentManager } from '@c15t/react';

// Create a client instance
const options = {
  mode: 'c15t', // 'c15t', 'offline', or 'custom'
  backendURL: '/api/c15t',
  // Other options based on the mode...
};

// Use in a React component
function App() {
  return (
    <ConsentManagerProvider options={options}>
      {/* Your app content */}
    </ConsentManagerProvider>
  );
}
\`\`\`

## Global Callback Events

All client modes support the following callback events:

\`\`\`tsx
const callbacks = {
  // Called when any request fails
  onError: (response, path) => {
    console.error(`Request to ${path} failed:`, response.error);
  },
  
  // Called after successfully fetching consent banner information
  onConsentBannerFetched: (response) => {
    console.log('Banner info fetched:', response.data);
  },
  
  // Called after successfully setting consent preferences
  onConsentSet: (response) => {
    console.log('Consent set successfully:', response.data);
  },
  
  // Called after successfully verifying consent
  onConsentVerified: (response) => {
    console.log('Consent verified:', response.data);
  }
};
\`\`\`

## When to Use Each Mode

<Callout>
  Choosing the right mode depends on your specific requirements and constraints.
</Callout>

- **c15t Mode**: For production applications with a real c15t backend
- **Offline Mode**: For production applications with your own backend systems, or when you want to eliminate external service dependencies
- **Custom Mode**: When you need to integrate with an existing consent system but still want to implement custom HTTP request handling

## What's Next

Choose the storage approach that best fits your needs:

- [Hosted c15t](/docs/storing-consent/hosted-c15t) - Use consent.io for a managed solution
- [Self-Hosting](/docs/storing-consent/self-hosting) - Run your own c15t instance
- [Offline Mode](/docs/storing-consent/offline-mode) - Store consent in the browser
- [Custom Client](/docs/storing-consent/custom-client) - Implement your own storage logic 
```

# storing-consent/self-hosting.mdx

```mdx
---
title: 'Self-Hosting Guide'
description: 'Set up and maintain your own c15t instance for full control over your consent management backend'
---

import { RiGlobalLine, RiTimerLine, RiSettings4Line, RiDatabase2Line, RiCodeLine } from '@remixicon/react';

This guide shows you how to set up a self-hosted c15t instance using Next.js API routes, giving you complete control over your consent management system.

<Callout type="info">
Looking for an easier way? [consent.io](https://consent.io) offers a fully managed c15t backend with minimal setup. See the [Hosted c15t](/docs/storing-consent/hosted-c15t) page for details.
</Callout>

## Prerequisites

- A working Next.js application
- Basic understanding of Next.js API routes

<Steps>

<Step>
### Install `@c15t/backend` Package
 
\`\`\`package-install
@c15t/backend
\`\`\`
</Step>

<Step>
### Create Next.js API Handler

<Callout type="tip">
Separating your configuration from the API route handler makes it easier to manage and update your c15t instance.
</Callout>

First, create a separate file for your c15t instance configuration:

<Tabs items={['Memory', 'Kysely', 'Prisma', 'Drizzle']}>
<Tab value="Memory">
\`\`\`tsx title="c15t.ts"
import { c15tInstance } from '@c15t/backend';
import { memoryAdapter } from '@c15t/backend/pkgs/db-adapters/adapters/memory-adapter';

export const instance = c15tInstance({
	appName: 'Next.js Example App',
	basePath: '/api/c15t',
	database: memoryAdapter({}),
	trustedOrigins: ['http://localhost:3000', 'http://localhost:8787'],
});
\`\`\`
This example uses the Memory Adapter for simple in-memory storage that's perfect for development and testing. Data is stored in RAM and doesn't persist when the server restarts.
</Tab>

<Tab value="Kysely">
\`\`\`tsx title="c15t.ts"
import { c15tInstance } from '@c15t/backend';
import { kyselyAdapter } from '@c15t/backend/pkgs/db-adapters/adapters/kysely-adapter';
import { PostgresDialect } from 'kysely';
import pg from 'pg';

export const instance = c15tInstance({
	appName: 'Next.js Example App',
	basePath: '/api/c15t',
	database: kyselyAdapter({
		dialect: new PostgresDialect({
			pool: new pg.Pool({
				host: process.env.DB_HOST || 'localhost',
				port: parseInt(process.env.DB_PORT || '5432'),
				database: process.env.DB_NAME || 'c15t',
				user: process.env.DB_USER || 'postgres',
				password: process.env.DB_PASSWORD || '',
			}),
		}),
	}),
	trustedOrigins: ['http://localhost:3000', 'http://localhost:8787'],
});
\`\`\`

This configuration uses the Kysely adapter with PostgreSQL. The Kysely adapter provides a type-safe SQL query builder that works with PostgreSQL, MySQL, and SQLite, offering excellent performance with minimal overhead.
</Tab>

<Tab value="Prisma">
\`\`\`tsx title="c15t.ts"
import { c15tInstance } from '@c15t/backend';
import { prismaAdapter } from '@c15t/backend/pkgs/db-adapters/adapters/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const instance = c15tInstance({
	appName: 'Next.js Example App',
	basePath: '/api/c15t',
	database: prismaAdapter({
		client: prisma,
	}),
	trustedOrigins: ['http://localhost:3000', 'http://localhost:8787'],
});
\`\`\`

This setup integrates Prisma ORM to provide a feature-rich database interface with automatic migrations, relationship handling, and excellent TypeScript integration.
</Tab>

<Tab value="Drizzle">
\`\`\`tsx title="c15t.ts"
import { c15tInstance } from '@c15t/backend';
import { drizzleAdapter } from '@c15t/backend/pkgs/db-adapters/adapters/drizzle-adapter';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(`postgres://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '5432'}/${process.env.DB_NAME || 'c15t'}`);
const db = drizzle(client);

export const instance = c15tInstance({
	appName: 'Next.js Example App',
	basePath: '/api/c15t',
	database: drizzleAdapter({
		client: db,
	}),
	trustedOrigins: ['http://localhost:3000', 'http://localhost:8787'],
});
\`\`\`

This example uses the lightweight Drizzle ORM that focuses on performance and type safety with minimal abstractions. It's ideal for projects that need direct SQL access with TypeScript support.
</Tab>
</Tabs>

Then, create a catch-all API route that imports and uses this instance:

\`\`\`tsx title="app/api/c15t/[...all]/route.ts"
import { toNextHandler } from '@c15t/backend/integrations/next';
import { instance } from '../c15t';

export const { GET, POST, OPTIONS } = toNextHandler(instance);
\`\`\`

This approach separates your instance configuration from the route handler, making it easier for CLI tools and migration utilities to locate and work with your c15t instance.
</Step>

<Step>
### Configure Your App to Use the API Route

Update your ConsentManagerOptions to point to your new API route:

\`\`\`tsx title="app/layout.tsx"
const options: ConsentManagerOptions = {
	mode: 'c15t',
	backendURL: '/api/c15t',
};
\`\`\`

This tells the ConsentManagerProvider to use your self-hosted instance instead of an external one.
</Step>

</Steps>

## Database Options

<Callout type="warning">
For production use, the Memory Adapter is not recommended as data is lost when the server restarts.
</Callout>

For production use, you should consider using a persistent database. c15t supports several database adapters:

<div className="mt-6">
  <CompactCard 
    href="/docs/backend/adapters/memory" 
    icon={<RiDatabase2Line size={18} />}
  >
    <code>Memory Adapter</code> - Simple in-memory storage (development only)
  </CompactCard>

  <CompactCard 
    href="/docs/backend/adapters/kysely" 
    icon={<RiDatabase2Line size={18} />}
  >
    <code>Kysely Adapter</code> - Type-safe SQL query builder
  </CompactCard>

  <CompactCard 
    href="/docs/backend/adapters/prisma" 
    icon={<RiDatabase2Line size={18} />}
  >
    <code>Prisma Adapter</code> - Feature-rich ORM with migrations
  </CompactCard>

  <CompactCard 
    href="/docs/backend/adapters/drizzle" 
    icon={<RiDatabase2Line size={18} />}
  >
    <code>Drizzle Adapter</code> - Lightweight TypeScript ORM
  </CompactCard>
</div>

These adapters can connect to various database backends:

<div className="mt-6">
  <CompactCard 
    href="/docs/backend/databases/postgres" 
    icon={<RiCodeLine size={18} />}
  >
    <code>PostgreSQL</code> - Recommended for production deployments
  </CompactCard>

  <CompactCard 
    href="/docs/backend/databases/mysql" 
    icon={<RiCodeLine size={18} />}
  >
    <code>MySQL/MariaDB</code> - Popular open-source database
  </CompactCard>

  <CompactCard 
    href="/docs/backend/databases/sqlite" 
    icon={<RiCodeLine size={18} />}
  >
    <code>SQLite</code> - File-based database for simpler deployments
  </CompactCard>
</div>

<Callout type="tip">
**PostgreSQL** is recommended for production deployments due to its robust feature set and reliability.
</Callout>

See the [Database Adapters documentation](/docs/backend/database-adapters) for complete implementation details.


## Next Steps

<div className="mt-6">
  <CompactCard 
    href="/docs/storing-consent/hosted-c15t" 
    icon={<RiGlobalLine size={18} />}
  >
    Use <code>Hosted c15t</code>
  </CompactCard>

  <CompactCard 
    href="/docs/storing-consent/offline-mode" 
    icon={<RiTimerLine size={18} />}
  >
    Configure <code>Offline Mode</code>
  </CompactCard>

  <CompactCard 
    href="/docs/storing-consent/custom-client" 
    icon={<RiSettings4Line size={18} />}
  >
    Create a <code>Custom Client</code>
  </CompactCard>
</div> 
```

# styling/classnames.mdx

```mdx
---
title: Styling with CSS Classes
description: Learn how to customize @c15t/react components using CSS class names and class-based styling.
---

CSS classes provide a powerful and flexible way to style @c15t/react components. This approach works well with any CSS methodology, including custom CSS, utility classes, or CSS modules.

## Basic Class-Based Styling

The simplest way to style a component is by providing class names directly to theme keys:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': 'my-banner-container',
    'banner.header.title': 'banner-title',
    'banner.header.description': 'banner-description',
    'banner.footer': 'banner-footer'
  }}
/>
\`\`\`

This approach allows you to:
- Use your own custom CSS classes
- Apply multiple classes to the same element
- Create reusable styling patterns

## Object Syntax for Classes

You can also use the object syntax with the `className` property:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': {
      className: 'my-banner-container'
    },
    'banner.header.title': {
      className: 'banner-title'
    }
  }}
/>
\`\`\`

This syntax is especially useful when you need to combine class names with inline styles:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': {
      className: 'my-banner-container',
      style: {
        borderColor: dynamicBorderColor
      }
    }
  }}
/>
\`\`\`

## Combining Class Names

You can provide multiple class names as a space-separated string:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': 'container mx-auto p-4 rounded-lg'
  }}
/>
\`\`\`

## Using CSS Modules

CSS Modules work perfectly with our theming system:

\`\`\`tsx
import styles from './Banner.module.css';

<CookieBanner 
  theme={{
    'banner.root': styles.container,
    'banner.header.title': styles.title,
    'banner.header.description': styles.description
  }}
/>
\`\`\`

## Dynamic Class Names

You can use conditional logic to apply classes dynamically:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': `
      container 
      ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
    `,
    'banner.footer': `
      mt-4 
      ${isCompact ? 'flex-col gap-2' : 'flex-row gap-4'}
    `
  }}
/>
\`\`\`

## Creating Reusable Themes with Class Names

You can create reusable themes by defining class name configurations:

\`\`\`tsx
const lightTheme = {
  'banner.root': 'bg-white text-gray-900 shadow-lg',
  'banner.header.title': 'text-xl font-bold',
  'banner.header.description': 'text-gray-600 mt-2',
  'banner.footer': 'mt-4 flex justify-end gap-2'
};

const darkTheme = {
  'banner.root': 'bg-gray-900 text-white shadow-lg border border-gray-800',
  'banner.header.title': 'text-xl font-bold text-white',
  'banner.header.description': 'text-gray-300 mt-2',
  'banner.footer': 'mt-4 flex justify-end gap-2'
};

// Use the appropriate theme
<CookieBanner theme={isDarkMode ? darkTheme : lightTheme} />
\`\`\`

## Best Practices for Class-Based Styling

1. **Consistent Naming Conventions**
   - Use a consistent naming methodology (BEM, SMACSS, etc.)
   - Keep class names descriptive and purpose-driven

2. **Avoid Collisions**
   - Use namespacing or CSS Modules to prevent class name collisions
   - Consider component-specific prefixes for custom classes

3. **Separation of Concerns**
   - Use classes for styling and not for functionality
   - Keep component structure and styling separate

4. **Performance**
   - Minimize the number of classes applied to an element
   - Use CSS custom properties for values that change frequently 
```

# styling/color-scheme.mdx

```mdx
---
title: Color Scheme (Light/Dark Mode)
description: Learn how to manage light, dark, and system color schemes in your application using c15t's color scheme utilities.
---

## Overview

@c15t/react provides built-in support for managing color schemes for your components, allowing you to implement light mode, dark mode, or system-based preferences with minimal configuration.

## Usage

You can control the color scheme through two main approaches:

1. Setting the `colorScheme` prop in `ConsentManagerOptions`
2. Using the `useColorScheme` hook directly

### Available Options

The color scheme can be set to one of the following values:

- `'light'`: Forces light mode
- `'dark'`: Forces dark mode
- `'system'`: Automatically matches the system preference
- `null`: Falls back to default behavior (respects `.dark` class on root element)

By default, if this prop is not set, it will default to `null`.

### Provider Configuration

You can also configure the color scheme through the `ConsentManagerProvider`:

\`\`\`tsx
import { ConsentManagerProvider } from '@c15t/react';

function App({ children }) {
  return (
    <ConsentManagerProvider
      options={{
        react: {
          // Components will only be light mode
          colorScheme: 'light'
        }
      }}
    >
      {children}
    </ConsentManagerProvider>
  );
}
\`\`\`

### Using the Hook

The `useColorScheme` hook provides a simple way to manage color scheme preferences:

\`\`\`tsx
import { useColorScheme } from '@c15t/react';

function App() {
  useColorScheme('system'); // Options: 'light' | 'dark' | 'system' | null
  return <div>Your content</div>;
}
\`\`\`

## CSS Classes

The color scheme system manages two CSS classes:

- `.dark`: The default class for dark mode detection
- `.c15t-dark`: An internal class used by c15t components

When using the system color scheme:
- The `.c15t-dark` class is automatically added/removed based on system preferences
- Components will respond to changes in system color scheme preferences
- The change is immediate and doesn't require a page reload

## Related

- [Theming](/styling/theming) - Learn about c15t's theming system
- [CSS Variables](/styling/css-variables) - Understanding CSS variable usage
```

# styling/css-variables.mdx

```mdx
---
title: Styling with CSS Variables
description: Learn how to use CSS custom properties (CSS variables) to create flexible and dynamic themes for @c15t/react components.
---
import CSSVariablesCookieBannerExample from '~/examples/react/css-variables/index';



CSS Variables (also known as CSS Custom Properties) provide a powerful way to create dynamic, maintainable themes for @c15t/react components. This approach is particularly useful for dark mode, theming, and responsive design.

## Basic Usage

Each @c15t/react component has a set of predefined CSS variables that you can override:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': {
      style: {
        '--banner-background-color': 'white',
        '--banner-text-color': '#333',
        '--banner-border-radius': '0.5rem',
        '--banner-box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
      }
    }
  }}
/>
\`\`\`

This approach allows you to:
- Apply consistent theming across components
- Create dynamic themes that respond to user preferences
- Implement dark mode with minimal code duplication

## Example

Here's a live example of CSS variables in action:

<CSSVariablesCookieBannerExample />

## Available CSS Variables

Each component in @c15t/react has its own set of CSS variables. Common patterns include:

- `--{component}-background-color`: Background color of the component
- `--{component}-text-color`: Text color of the component
- `--{component}-border-radius`: Border radius of the component
- `--{component}-border-color`: Border color of the component
- `--{component}-padding`: Padding of the component

Check each component's reference documentation for a complete list of available CSS variables.

## Implementing Dark Mode

CSS Variables are particularly effective for implementing dark mode:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': {
      style: {
        '--banner-background-color': isDarkMode ? '#1f2937' : 'white',
        '--banner-text-color': isDarkMode ? 'white' : '#333',
        '--banner-border-color': isDarkMode ? '#374151' : '#e5e7eb',
        '--banner-button-background': isDarkMode ? '#4b5563' : '#f3f4f6'
      }
    }
  }}
/>
\`\`\`

## Nested CSS Variables

You can target nested elements with their specific CSS variables:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': {
      style: {
        '--banner-background-color': 'white',
        '--banner-border-radius': '0.5rem'
      }
    },
    'banner.header.title': {
      style: {
        '--banner-title-font-size': '1.25rem',
        '--banner-title-font-weight': '600'
      }
    },
    'banner.footer.accept-button': {
      style: {
        '--banner-button-background': 'blue',
        '--banner-button-text-color': 'white'
      }
    }
  }}
/>
\`\`\`

## Responsive Design with CSS Variables

CSS Variables work well with media queries for responsive design:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': {
      style: {
        '--banner-padding': '1rem',
        '--banner-font-size': '0.875rem',
        '@media (min-width: 768px)': {
          '--banner-padding': '1.5rem',
          '--banner-font-size': '1rem'
        },
        '@media (min-width: 1024px)': {
          '--banner-padding': '2rem',
          '--banner-font-size': '1.125rem'
        }
      }
    }
  }}
/>
\`\`\`

## Creating a Theme System with CSS Variables

You can create a comprehensive theme system using CSS variables:

\`\`\`tsx
// Theme variables for light and dark modes
const themes = {
  light: {
    '--color-background': 'white',
    '--color-text': '#333',
    '--color-primary': '#3b82f6',
    '--color-secondary': '#6b7280',
    '--color-border': '#e5e7eb',
    '--shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
    '--shadow-md': '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  dark: {
    '--color-background': '#1f2937',
    '--color-text': 'white',
    '--color-primary': '#60a5fa',
    '--color-secondary': '#9ca3af',
    '--color-border': '#374151',
    '--shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
    '--shadow-md': '0 4px 6px rgba(0, 0, 0, 0.4)'
  }
};

// Apply the current theme to components
<CookieBanner 
  theme={{
    'banner.root': {
      style: {
        '--banner-background-color': 'var(--color-background)',
        '--banner-text-color': 'var(--color-text)',
        '--banner-border-color': 'var(--color-border)',
        '--banner-box-shadow': 'var(--shadow-md)'
      }
    }
  }}
/>
\`\`\`

## Best Practices for CSS Variables

1. **Naming Convention**
   - Use a consistent naming pattern: `--component-property-state`
   - Use kebab-case for variable names

2. **Fallback Values**
   - Always provide fallback values for critical styling
   - Use the `var()` function's second parameter for fallbacks

3. **Scoping**
   - Scope variables appropriately to avoid leakage
   - Consider organizing variables by component or feature

4. **Performance**
   - Minimize the number of CSS variable changes during runtime
   - Batch variable updates when possible
```

# styling/index.mdx

```mdx
---
title: General Styling
description: Learn the core concepts of the @c15t/react theming system and how it enables flexible component styling.
---

## Understanding the Theming System

Think of our theming system as a set of style instructions that cascade through your components, similar to CSS but with more structure and type safety. Each component has specific customizable areas, called theme keys, that you can target for styling.

The theming system provides a structured way to customize the appearance of components while maintaining their functionality and accessibility. It allows you to:

- Target specific elements within a component
- Apply consistent styling across your application
- Ensure type safety and prevent styling errors

## Theme Key Structure

Every theme key in our system follows a predictable pattern that makes it easy to target specific elements within a component:

\`\`\`
'componentName.elementPath.subElement'
\`\`\`

1. **Component Name**: The base name of the component (e.g., `banner`, `widget`, `dialog`)
2. **Element Path**: The path to the element within the component (e.g., `header.title`, `footer.accept-button`)
3. **State Variations**: Optional state indicators (e.g., `switch.thumb.checked`, `button.hover`)

### Component Hierarchies

Components are structured in a hierarchical manner, which is reflected in their theme keys:

\`\`\`tsx
// Example of nested component styling
const theme = {
  'widget.root': 'container mx-auto',
  'widget.accordion': 'space-y-2',
  'widget.accordion.item': 'border rounded-sm',
  'widget.accordion.trigger': 'p-4 hover:bg-gray-50',
  'widget.accordion.trigger-inner': '',
  'widget.accordion.content': 'p-4 bg-gray-50'
}
\`\`\`

Each level in the hierarchy can be styled independently, giving you fine-grained control over the appearance.

### Visualizing the Hierarchy

Here's a simplified visualization of a typical accordion component:

\`\`\`
widget.root
└── widget.accordion
    └── widget.accordion.item
        ├── widget.accordion.trigger
        │   └── widget.accordion.trigger-inner
        └── widget.accordion.content
\`\`\`

## Using Theme Context

For consistent styling across your application, you can use the `ThemeProvider` component to apply a global theme:

\`\`\`tsx
import { ThemeProvider } from '@c15t/react'

const globalTheme = {
  'banner.root': 'bg-white rounded-lg shadow-lg',
  'dialog.root': 'bg-white rounded-lg shadow-xl',
  'widget.root': 'bg-gray-50 rounded border'
}

function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <YourApp />
    </ThemeProvider>
  )
}
\`\`\`

### Theme Inheritance

Components can still define their own themes, which will merge with and override the global theme:

\`\`\`tsx
<ThemeProvider theme={globalTheme}>
  {/* Uses the global theme */}
  <CookieBanner />
  
  {/* Overrides parts of the global theme */}
  <CookieBanner 
    theme={{
      'banner.root': 'bg-blue-50 p-4 rounded-lg'
    }}
  />
</ThemeProvider>
\`\`\`

## Type-Safe Styling

Our theming system includes TypeScript support to help prevent errors:

\`\`\`tsx
import type { CookieBannerTheme } from '@c15t/react'

// TypeScript will catch invalid theme keys
const theme: CookieBannerTheme = {
  'banner.root': 'bg-white p-4 rounded-lg shadow-lg',
  'banner.invalid': 'TypeScript error!' // Error: invalid key
}
\`\`\`

## Disabling Default Styles

Sometimes you might want to start from scratch. Use the `noStyle` prop to remove all default styling:

\`\`\`tsx
<CookieBanner noStyle theme={yourCustomTheme} />
\`\`\`

## Best Practices

1. **Maintain Accessibility**
   - Ensure sufficient color contrast
   - Keep interactive elements visually distinct
   - Test your styles with screen readers

2. **Consider Responsive Design**
   - Start with mobile-first styles
   - Use flexible units (rem, em) over fixed pixels
   - Test across different screen sizes

3. **Performance**
   - Group related styles together
   - Avoid unnecessary style overrides
   - Use CSS classes over inline styles when possible

4. **Maintainability**
   - Keep theme configurations organized
   - Document custom styles
   - Use consistent naming conventions 
```

# styling/inline-styles.mdx

```mdx
---
title: Styling with Inline Styles
description: Learn how to use inline style objects to customize @c15t/react components for dynamic and programmatic styling.
---
import CSSCookieBannerExample from '~/examples/react/css/index';

Inline styles provide a direct way to style @c15t/react components using JavaScript objects. This approach is particularly useful for dynamic styles that need to be calculated at runtime or when you need to apply styles programmatically.

## Basic Usage

You can apply inline styles to components using the style object:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': {
      style: {
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }
    },
    'banner.header.title': {
      style: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: '#333'
      }
    }
  }}
/>
\`\`\`

This approach allows you to:
- Apply styles directly without external CSS
- Calculate style values dynamically at runtime
- Maintain all styling within your JavaScript code

## Example

Here's a live example of inline styles in action:

<CSSCookieBannerExample />

## Style Property Names

When using inline styles, CSS property names are written in camelCase rather than kebab-case:

| CSS Property | JavaScript Style Property |
|------------|------------------------|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-radius` | `borderRadius` |
| `padding-top` | `paddingTop` |

## Dynamic Styling

Inline styles excel at dynamic styling based on component state or props:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': {
      style: {
        backgroundColor: isImportant ? '#fff8e6' : 'white',
        borderColor: isPending ? '#d97706' : '#e5e7eb',
        borderWidth: hasError ? '2px' : '1px',
        opacity: isDisabled ? 0.7 : 1
      }
    }
  }}
/>
\`\`\`

## Combining with Other Styling Methods

You can combine inline styles with class names for maximum flexibility:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': {
      className: 'banner-container',
      style: {
        backgroundColor: theme === 'light' ? 'white' : '#1f2937'
      }
    },
    'banner.header.title': {
      className: 'banner-title',
      style: {
        color: theme === 'light' ? '#111827' : 'white'
      }
    }
  }}
/>
\`\`\`

## Nested Styles

You can target nested elements with their own style objects:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': {
      style: {
        padding: '1.5rem',
        backgroundColor: 'white'
      }
    },
    'banner.header': {
      style: {
        marginBottom: '1rem'
      }
    },
    'banner.header.title': {
      style: {
        fontSize: '1.25rem',
        fontWeight: 600
      }
    },
    'banner.footer.accept-button': {
      style: {
        backgroundColor: 'blue',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem'
      }
    }
  }}
/>
\`\`\`

## Units and Values

When specifying dimensions in inline styles:

- Pixel values can be provided as numbers: `width: 100` (becomes `width: 100px`)
- Other units must be strings: `fontSize: '1.25rem'`, `width: '50%'`
- Unitless values like `fontWeight` and `opacity` are provided as numbers

## Best Practices for Inline Styles

1. **Performance Considerations**
   - Prefer CSS classes for static styles
   - Use inline styles for truly dynamic values

2. **Readability and Maintenance**
   - Group related styles together
   - Use descriptive variable names for complex style calculations

3. **Browser Compatibility**
   - Be aware that some CSS features like media queries can't be used directly in inline styles
   - Consider CSS Variables or class-based styling for more complex responsive designs

4. **Avoid Overuse**
   - Inline styles don't benefit from CSS cascading and inheritance
   - Use sparingly for specific dynamic styling needs 
```

# styling/tailwind.mdx

```mdx
---
title: Styling with Tailwind CSS
description: Learn how to use Tailwind CSS utility classes with @c15t/react components for rapid and consistent styling.
---
import TailwindCookieBannerExample from '~/examples/react/tailwind/index';

Tailwind CSS is perfectly suited for styling @c15t/react components. Our theming system allows you to apply Tailwind's utility classes directly to components, providing a powerful and efficient styling workflow.

## Basic Usage

You can apply Tailwind utility classes directly to component theme keys:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': 'bg-white p-4 rounded-lg shadow-lg',
    'banner.header.title': 'text-xl font-bold text-gray-900',
    'banner.header.description': 'text-sm text-gray-600 mt-2',
    'banner.footer': 'mt-4 flex justify-end gap-2'
  }}
/>
\`\`\`

This approach allows you to:
- Style components without writing custom CSS
- Maintain a consistent design system
- Make quick adjustments with immediate visual feedback

## Example

Here's a live example of Tailwind CSS styling:

<TailwindCookieBannerExample />

## Responsive Design

Tailwind's responsive utilities work seamlessly with our theming system:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': 'p-4 md:p-6 lg:p-8 w-full md:w-auto',
    'banner.header.title': 'text-lg md:text-xl lg:text-2xl',
    'banner.header.description': 'text-sm md:text-base',
    'banner.footer': 'flex flex-col md:flex-row gap-2'
  }}
/>
\`\`\`

## Dark Mode

If you've configured Tailwind's dark mode, you can use dark variants:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': 'bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg',
    'banner.header.title': 'text-gray-900 dark:text-white font-bold',
    'banner.header.description': 'text-gray-600 dark:text-gray-300 mt-2'
  }}
/>
\`\`\`

## Creating Reusable Themes

You can define reusable Tailwind-based themes for consistent styling:

\`\`\`tsx
const bannerTheme = {
  'banner.root': 'bg-white p-4 rounded-lg shadow-lg',
  'banner.header.title': 'text-xl font-bold text-gray-900',
  'banner.header.description': 'text-sm text-gray-600 mt-2',
  'banner.footer': 'mt-4 flex justify-end gap-2',
  'banner.footer.accept-button': 'btn btn-primary',
  'banner.footer.reject-button': 'btn btn-secondary'
};

<CookieBanner theme={bannerTheme} />
\`\`\`

## Combining with Custom CSS

You can combine Tailwind utilities with custom CSS when needed:

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': {
      className: 'bg-white p-4 rounded-lg shadow-lg',
      style: {
        borderColor: dynamicBorderColor
      }
    }
  }}
/>
\`\`\`

## Common UI Patterns with Tailwind

### Creating a Modern Card-Like Component

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': 'bg-white rounded-xl shadow-lg p-6 max-w-lg mx-auto',
    'banner.header.title': 'text-xl font-semibold text-gray-900',
    'banner.header.description': 'text-gray-500 mt-2',
    'banner.footer': 'mt-6 flex justify-end space-x-4'
  }}
/>
\`\`\`

### Creating a Minimalist Style

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': 'border border-gray-200 p-4',
    'banner.header.title': 'text-gray-900 font-medium',
    'banner.header.description': 'text-gray-500 text-sm',
    'banner.footer': 'mt-4 flex justify-end gap-2'
  }}
/>
\`\`\`

### Creating a Colorful, Bold Style

\`\`\`tsx
<CookieBanner 
  theme={{
    'banner.root': 'bg-indigo-600 text-white p-6 rounded-lg shadow-lg',
    'banner.header.title': 'text-2xl font-bold',
    'banner.header.description': 'text-indigo-100 mt-2',
    'banner.footer': 'mt-6 flex justify-end gap-4'
  }}
/>
\`\`\`

## Best Practices with Tailwind

1. **Keep It Consistent**
   - Create a design system with consistent spacing, colors, and typography
   - Use Tailwind's configuration to define your design tokens

2. **Responsive Design**
   - Start with mobile styling, then add responsive modifiers
   - Test your components at different viewport sizes

3. **Reuse Patterns**
   - Extract common utility combinations into reusable themes
   - Consider using Tailwind's `@apply` in CSS for frequently used patterns

4. **Accessibility**
   - Ensure sufficient color contrast (use Tailwind's accessibility tools)
   - Don't rely solely on color to convey information

5. **Performance**
   - Use Tailwind's JIT mode to keep CSS bundle size small
   - Be mindful of utility combination complexity
```

