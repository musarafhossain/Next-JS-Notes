## **Before We Start — React Server Components (RSC)**

**React Server Components (RSC)** is a **new architecture** introduced by the React team and quickly adopted by Next.js (starting from version 13).
It changes how React components are built and used by dividing them into **two types**:

---

### **1. Server Components**

* **Default in Next.js** → Every component you create is a Server Component unless stated otherwise.
* Can perform **server-side tasks** such as:

  * Reading files from the file system
  * Fetching data directly from a database
  * Running secure backend code
* **Trade-offs**:

  * Cannot use **React hooks** like `useState`, `useEffect`, `useRef`, etc.
  * Cannot handle **user interactions** directly (e.g., `onClick` events).

---

### **2. Client Components**

* To make a component a **Client Component**, you must add the `"use client"` directive at the **very top** of the file:

  ```tsx
  "use client";

  export default function MyButton() {
    return <button onClick={() => alert("Clicked!")}>Click me</button>;
  }
  ```
* **Can**:

  * Use React hooks (`useState`, `useEffect`, etc.)
  * Handle user interactions (clicks, inputs, etc.)
* **Cannot**:

  * Perform server-only tasks like accessing the filesystem or making direct database calls.

---

## **React Server Components in Routing**

* When we start learning **routing**, you will see examples of **both** types.
* **Server Components** can wait for certain operations (e.g., fetching data) before rendering content.
* **Client Components** are used when you need **interactive UI** or **hooks from the routing module** (e.g., `useRouter`).

---

### **Quick Summary Table**

| Feature                 | Server Component | Client Component |
| ----------------------- | ---------------- | ---------------- |
| Default in Next.js      | ✅ Yes            | ❌ No             |
| Server-side tasks       | ✅ Yes            | ❌ No             |
| Use React hooks         | ❌ No             | ✅ Yes            |
| Handle user interaction | ❌ No             | ✅ Yes            |
| `"use client"` required | ❌ No             | ✅ Yes            |
