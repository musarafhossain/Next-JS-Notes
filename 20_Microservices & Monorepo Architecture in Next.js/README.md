# **Chapter 20: Microservices & Monorepo Architecture in Next.js**  

Modern applications often require **scalability, modularity, and performance**. In this chapter, we’ll explore:  

✅ **Microservices Architecture** – Building independent services for scalability.  
✅ **Monorepo Architecture** – Managing multiple projects in a single repository.  
✅ **Tools for Monorepos** – **Turborepo & Nx** for optimized builds.  
✅ **GraphQL in Microservices** – Efficient data fetching across services.  

---

# **20.1 Understanding Microservices Architecture**  

A **Microservices Architecture** divides an application into **small, independent services**, each handling a specific task.  

### ✅ **Benefits of Microservices**  
- **Scalability** – Services can be scaled independently.  
- **Fault Isolation** – Failure in one service doesn’t crash the entire app.  
- **Technology Flexibility** – Services can be written in different languages.  
- **Faster Development** – Teams work on separate services in parallel.  

### ✅ **Example: E-commerce Microservices**  
- **Auth Service** – Manages authentication (JWT, OAuth, NextAuth.js).  
- **Product Service** – Handles product catalog & inventory.  
- **Order Service** – Manages orders & payments.  
- **User Service** – Stores user profiles.  

Each microservice runs independently and communicates via **REST APIs** or **GraphQL**.  

---

# **20.2 Monorepo Architecture in Next.js**  

A **Monorepo** (Monolithic Repository) is a single repository containing multiple projects. It improves **code sharing, dependency management, and CI/CD workflows**.  

### ✅ **Benefits of Monorepos**  
- **Shared Dependencies** – One package.json for multiple projects.  
- **Faster Builds** – Tools like **Turborepo & Nx** optimize builds.  
- **Easier Refactoring** – Code is centralized, making maintenance easier.  

---

# **20.3 Setting Up a Monorepo with Turborepo**  

[Turborepo](https://turbo.build/) is a tool for managing monorepos efficiently.  

### ✅ **1. Install Turborepo**  
```bash
npx create-turbo@latest my-monorepo
cd my-monorepo
```

📂 **Project Structure**  
```
my-monorepo/
│── apps/
│   ├── web/         # Next.js Frontend
│   ├── admin/       # Admin Dashboard
│── packages/
│   ├── ui/          # Shared UI Components
│   ├── config/      # Shared Configurations
│── turbo.json       # Turborepo Config
│── package.json     # Root package.json
```

### ✅ **2. Create Next.js Apps Inside Monorepo**  
```bash
cd apps
npx create-next-app web
npx create-next-app admin
```

### ✅ **3. Configure Turborepo (turbo.json)**  
📂 `turbo.json`
```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**"]
    },
    "dev": {
      "cache": false
    }
  }
}
```
This **caches builds**, speeding up development.  

### ✅ **4. Run Both Apps Concurrently**  
```bash
turbo run dev
```
Now, both `web` and `admin` run in parallel! 🚀  

---

# **20.4 Managing a Monorepo with Nx**  

[Nx](https://nx.dev/) is another tool for Monorepos with **better dependency tracking and caching**.  

### ✅ **1. Install Nx & Create a Monorepo**  
```bash
npx create-nx-workspace my-monorepo --preset=next
```
This initializes a Next.js monorepo with **Nx optimizations**.  

### ✅ **2. Add Multiple Applications**  
```bash
npx nx generate @nrwl/next:app web
npx nx generate @nrwl/next:app admin
```

### ✅ **3. Run Both Apps with Nx**  
```bash
npx nx run-many --target=serve --all
```
Nx **efficiently builds and serves multiple projects** in parallel.  

---

# **20.5 GraphQL for Microservices in Next.js**  

[GraphQL](https://graphql.org/) is perfect for microservices because it:  
✅ Reduces Over-fetching  
✅ Allows Multiple Data Sources  
✅ Optimizes API Calls  

### ✅ **1. Install Apollo Server for GraphQL**  
```bash
npm install apollo-server-micro graphql
```

### ✅ **2. Create a GraphQL API in Next.js**  
📂 `pages/api/graphql.js`
```js
import { ApolloServer, gql } from "apollo-server-micro";

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
  }
  type Query {
    products: [Product]
  }
`;

const resolvers = {
  Query: {
    products: () => [
      { id: "1", name: "Laptop", price: 999.99 },
      { id: "2", name: "Phone", price: 599.99 },
    ],
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export default server.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};
```

### ✅ **3. Query GraphQL API**  
📂 `pages/index.js`
```jsx
import { useQuery, gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```
✅ **Now, we have a GraphQL-powered microservice inside our Monorepo!**  

---

# **20.6 Microservices vs Monorepo: Which One to Choose?**  

| Feature            | Microservices | Monorepo |
|--------------------|--------------|----------|
| **Independent Services** | ✅ Yes | ❌ No |
| **Code Sharing**   | ❌ Hard | ✅ Easy |
| **Scalability**    | ✅ High | 🚀 Optimized |
| **Setup Complexity** | ❌ High | ✅ Moderate |
| **Best For**       | Large-Scale Apps | Teams with Shared Code |

📌 **Monorepo is great for a single team, while Microservices suit large-scale distributed teams.**  

---

# **20.7 Next Steps: Building a Full Microservices & Monorepo Project**  

✅ **Set up a Turborepo or Nx-based Monorepo**  
✅ **Create Microservices for Authentication, Products, and Orders**  
✅ **Use GraphQL to Connect Microservices**  
✅ **Deploy with Docker, Kubernetes, or Vercel**  

---
