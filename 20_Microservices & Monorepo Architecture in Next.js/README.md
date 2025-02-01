# **Chapter 20: Microservices & Monorepo Architecture in Next.js**  

Modern applications often require **scalability, modularity, and performance optimization**. This chapter explores **Microservices Architecture** and **Monorepo Setup** in Next.js using tools like **Turborepo, Nx, and GraphQL**.

---

## **20.1 Understanding Microservices Architecture**  

### ✅ **What is Microservices Architecture?**  
Microservices architecture is a **modular approach** to building applications, where different services (auth, user management, payments, etc.) operate **independently** and communicate via APIs.

### ✅ **Benefits of Microservices:**
- **Scalability:** Each service scales independently.
- **Flexibility:** Can use different tech stacks (Next.js + Express + NestJS).
- **Faster Deployment:** Deploy and update specific services without affecting others.

### ✅ **Example of Microservices Architecture in Next.js**
| Service        | Description                     | Tech Stack |
|---------------|---------------------------------|------------|
| **Auth Service** | Handles user authentication (JWT, OAuth) | Next.js API Routes, NextAuth.js |
| **User Service** | Manages user profiles & settings | Express.js + MongoDB |
| **Payment Service** | Processes transactions via Stripe | NestJS + PostgreSQL |
| **Notification Service** | Sends emails & push notifications | Node.js + Redis |

---

## **20.2 Understanding Monorepo Architecture**  

### ✅ **What is a Monorepo?**  
A **Monorepo (Monolithic Repository)** is a single repository that contains **multiple projects** (services) while keeping dependencies and configurations **centralized**.

### ✅ **Why Use a Monorepo for Microservices?**
- **Code Sharing:** Common utilities & types are shared.
- **Consistent Tooling:** One package.json, eslint, TypeScript config.
- **Faster Development:** Run multiple services with a single command.

### ✅ **Monorepo vs Polyrepo**
| Feature       | Monorepo        | Polyrepo       |
|--------------|----------------|---------------|
| **Repository** | Single repo for all services | Separate repo per service |
| **Code Sharing** | Easy (shared packages) | Hard (requires duplication) |
| **Tooling** | Centralized (ESLint, TypeScript, etc.) | Decentralized |
| **Best For** | Startups, Small teams | Large, distributed teams |

---

## **20.3 Setting Up a Monorepo with Turborepo**  

📌 **Turborepo** is a high-performance build system for managing monorepos in Next.js.

### ✅ **Install Turborepo**
```bash
npx create-turbo@latest my-monorepo
cd my-monorepo
```

### ✅ **Monorepo Folder Structure**
```
/my-monorepo
 ├── /apps
 │    ├── web          # Next.js frontend
 │    ├── auth-service # Auth microservice (Next.js API)
 │    ├── user-service # User management (Express.js)
 │    ├── payment-service # Payments (NestJS)
 ├── /packages
 │    ├── eslint-config # Shared ESLint rules
 │    ├── ui-library # Shared UI components (React)
 ├── turbo.json        # Turborepo configuration
 ├── package.json      # Root dependencies
```

### ✅ **Configure Turborepo**
📂 `turbo.json`
```json
{
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "dev": { "cache": false },
    "lint": {},
    "test": {}
  }
}
```

### ✅ **Run Multiple Microservices Concurrently**
```bash
turbo run dev
```
This starts the **Next.js frontend, Express API, and NestJS services** in parallel.

---

## **20.4 Monorepo with Nx (Alternative to Turborepo)**  

📌 **Nx** is another popular monorepo tool that supports **Next.js, NestJS, React, and GraphQL**.

### ✅ **Install Nx & Create a Monorepo**
```bash
npx create-nx-workspace@latest my-nx-monorepo
cd my-nx-monorepo
```

### ✅ **Generate a Next.js App inside Nx**
```bash
npx nx g @nrwl/next:app web
```

### ✅ **Generate an API Service (NestJS)**
```bash
npx nx g @nrwl/nest:app auth-service
```

### ✅ **Run the Monorepo**
```bash
npx nx run-many --target=serve --all
```
✅ **This runs all microservices together!**  

---

## **20.5 GraphQL for Microservices Communication**  

📌 **GraphQL** helps microservices communicate efficiently with a **single API endpoint**.

### ✅ **Install GraphQL in a Next.js API Route**
```bash
npm install apollo-server-micro graphql
```

### ✅ **Create a GraphQL API in Next.js**
📂 `pages/api/graphql.js`
```js
import { ApolloServer, gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello from Next.js GraphQL API!",
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export default apolloServer.createHandler({ path: "/api/graphql" });
export const config = { api: { bodyParser: false } };
```

### ✅ **Query the GraphQL API**
📂 `pages/index.js`
```jsx
import { useQuery, gql } from "@apollo/client";

const HELLO_QUERY = gql`
  query {
    hello
  }
`;

export default function Home() {
  const { data, loading } = useQuery(HELLO_QUERY);

  if (loading) return <p>Loading...</p>;
  return <h1>{data.hello}</h1>;
}
```
✅ **Now the Next.js frontend communicates with microservices via GraphQL!**  

---

## **20.6 Best Practices for Microservices & Monorepo**  

### **✅ Best Practices for Microservices**
1. **Separate Concerns:** Each microservice should handle one function (Auth, Payments, etc.).
2. **Use API Gateways:** Tools like **GraphQL Gateway** or **Express Gateway** manage requests.
3. **Secure Communication:** Use **JWT, OAuth, and API Keys** for secure service communication.
4. **Logging & Monitoring:** Use **Datadog, Prometheus,