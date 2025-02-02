## **Next.js App Router: A Complete Guide**  

Next.js **App Router** (introduced in Next.js 13) is the modern way to build **full-stack applications** in Next.js. It replaces the **old `pages/` directory** with a **new `app/` directory**, enabling features like **React Server Components (RSC), Server Actions, Layouts, Streaming, and Partial Rendering**.

---

# **📌 Key Features of the App Router**
1. **File-based Routing** 🗂️ → Routes are created inside the `app/` directory.  
2. **Server Components by Default** ⚡ → Improved performance and reduced client-side JavaScript.  
3. **Layouts & Nested Layouts** 📑 → Persistent UI elements (like navbar, sidebar).  
4. **Loading & Error Handling** 🚦 → Built-in `loading.js` and `error.js`.  
5. **API Routes as Server Functions** 🖥️ → No need for `pages/api/`.  
6. **Streaming & Suspense** ⏳ → Faster rendering with React Suspense.  
7. **Middleware & Authentication** 🔐 → Edge Functions for security & optimizations.  

---

## **📂 Project Structure (App Router)**
```
my-next-app/
 ├── app/
 │   ├── layout.js         # Root layout for all pages
 │   ├── page.js           # Home page
 │   ├── about/
 │   │   ├── page.js       # About page
 │   ├── blog/
 │   │   ├── [slug]/page.js  # Dynamic Route
 │   ├── api/
 │   │   ├── route.js      # API Route
 │   ├── loading.js        # Loading UI
 │   ├── error.js          # Error handling
 ├── components/          # Reusable components
 ├── public/              # Static assets
 ├── styles/              # CSS/SCSS files
 ├── next.config.js       # Next.js config
 ├── package.json         # Dependencies
 ├── .gitignore
 └── README.md
```

---

# **📌 1. Creating a Next.js App with App Router**
Run the following command to create a new Next.js app with the App Router:
```bash
npx create-next-app@latest my-next-app
cd my-next-app
npm install
```

Make sure to **select "Yes" for App Router"** when prompted.

---

# **📌 2. Understanding File-based Routing**
✅ **Static Route (Home Page)** → `app/page.js`
```jsx
export default function Home() {
  return <h1 className="text-3xl font-bold">Welcome to Next.js App Router 🚀</h1>;
}
```

✅ **Nested Route (About Page)** → `app/about/page.js`
```jsx
export default function About() {
  return <h1>About Us</h1>;
}
```

✅ **Dynamic Route (Blog Post)** → `app/blog/[slug]/page.js`
```jsx
export default function BlogPost({ params }) {
  return <h1>Blog Post: {params.slug}</h1>;
}
```

✅ **API Route (Server Function)** → `app/api/route.js`
```jsx
export async function GET() {
  return Response.json({ message: "Hello from API Route!" });
}
```

---

# **📌 3. Layouts & Nested Layouts**
The **layout.js** file acts as a wrapper for all pages in a directory.

📂 **Global Layout (`app/layout.js`)**
```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>My Navbar</nav>
        {children}
        <footer>My Footer</footer>
      </body>
    </html>
  );
}
```

📂 **Nested Layout for Blog (`app/blog/layout.js`)**
```jsx
export default function BlogLayout({ children }) {
  return (
    <section>
      <h2>Blog Header</h2>
      {children}
      <h3>Blog Footer</h3>
    </section>
  );
}
```

---

# **📌 4. Loading & Error Handling**
✅ **Loading UI (Skeleton Screen)**
📂 `app/loading.js`
```jsx
export default function Loading() {
  return <p>Loading content... ⏳</p>;
}
```

✅ **Error Handling (Try-Catch for Pages)**
📂 `app/error.js`
```jsx
"use client"; // Required for error components

export default function ErrorPage({ error, reset }) {
  return (
    <div>
      <h2>Oops! Something went wrong.</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
```

---

# **📌 5. Server & Client Components**
✅ **Server Component (default)**
```jsx
export default async function ServerComponent() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/1").then(res => res.json());
  return <h1>{data.title}</h1>;
}
```

✅ **Client Component (use "use client")**
```jsx
"use client"; 
import { useState } from "react";

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

---

# **📌 6. Fetching Data in Next.js App Router**
✅ **Server-side Fetching (Directly inside Component)**
```jsx
export default async function ServerData() {
  const data = await fetch("https://api.example.com/posts").then(res => res.json());
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

✅ **Client-side Fetching (Using `useEffect`)**
```jsx
"use client";
import { useEffect, useState } from "react";

export default function ClientData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/posts")
      .then(res => res.json())
      .then(setData);
  }, []);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

---

# **📌 7. Middleware (Edge Functions)**
✅ **Middleware in `middleware.js`**
```jsx
export function middleware(request) {
  const loggedIn = request.cookies.get("token");
  if (!loggedIn) return Response.redirect(new URL("/login", request.url));
}
```

✅ **Apply Middleware to Specific Routes**
📂 `middleware.js`
```js
export const config = {
  matcher: ["/dashboard/:path*"], // Protects all dashboard routes
};
```

---

# **📌 8. Deployment (Vercel)**
Deploy easily to **Vercel**:
```bash
vercel
```

---

# **🚀 Summary**
✅ **Next.js App Router is the Future!**  
✅ **File-based Routing (`app/` directory)**  
✅ **Server Components by default**  
✅ **Layouts, Loading & Error Handling**  
✅ **Server & Client Components**  
✅ **Data Fetching (SSR, CSR, API Routes)**  
✅ **Middleware for Security**  

---