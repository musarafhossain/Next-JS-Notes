## **Routing in Next.js (App Router)**

**Next.js** uses a **file-system based routing system**.
This means the **URLs** you can access in the browser are automatically determined by how you organize your **files and folders** inside the `app/` (or `pages/` in older versions) directory.

---

### **Basic Routing Rules**

1. A **folder name** inside `app/` becomes the **route path**.
2. A `page.tsx` file inside that folder defines the content for that route.
3. The `page.tsx` file in the root `app/` folder is the **home page** (`/`).

---

### **Example:**

```
src/
 └── app/
      ├── page.tsx           // Home page → "/"
      ├── about/
      │     └── page.tsx     // About page → "/about"
      ├── contact/
      │     └── page.tsx     // Contact page → "/contact"
      └── products/
            └── page.tsx     // Products page → "/products"
```

**Browser Access:**

* `localhost:3000/` → Home
* `localhost:3000/about` → About
* `localhost:3000/contact` → Contact
* `localhost:3000/products` → Products

---

### **Code Example**

**`src/app/about/page.tsx`**

```tsx
export default function AboutPage() {
  return <h1>About Us</h1>;
}
```

**`src/app/contact/page.tsx`**

```tsx
export default function ContactPage() {
  return <h1>Contact Us</h1>;
}
```

---

### **Important Notes**

* File names **must** be `page.tsx` (or `page.jsx`) for routes.
* The folder name is **case-sensitive** and becomes the route name.
* You don’t need to configure anything manually — routing is automatic.
* You can create **nested routes** simply by adding more folders inside a route folder (covered in the next section).

---

### **Quick Summary Table**

| File Path                | Route Path   |
| ------------------------ | ------------ |
| `app/page.tsx`           | `/`          |
| `app/about/page.tsx`     | `/about`     |
| `app/products/page.tsx`  | `/products`  |
| `app/blog/post/page.tsx` | `/blog/post` |