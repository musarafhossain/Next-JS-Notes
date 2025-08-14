## **Nested Routes in Next.js**

**Nested routes** allow you to create **subpages** or **hierarchical URL structures** by nesting folders inside the `app/` directory.
This makes it easy to organize related pages together.

---

### **How It Works**

* Each **folder** inside `app/` represents a **segment** in the URL path.
* You can nest folders to create multi-level routes.
* Each folder should contain a `page.tsx` file to render content for that route.

---

### **Example Structure**

```
src/
 └── app/
      ├── dashboard/
      │     ├── page.tsx              // "/dashboard"
      │     ├── settings/
      │     │     └── page.tsx        // "/dashboard/settings"
      │     └── reports/
      │           └── page.tsx        // "/dashboard/reports"
      └── blog/
            ├── page.tsx              // "/blog"
            └── latest/
                  └── page.tsx        // "/blog/latest"
```

---

### **Browser Access**

* `localhost:3000/dashboard` → Dashboard page
* `localhost:3000/dashboard/settings` → Dashboard settings page
* `localhost:3000/dashboard/reports` → Dashboard reports page
* `localhost:3000/blog` → Blog page
* `localhost:3000/blog/latest` → Latest blog posts page

---

### **Code Example**

**`src/app/dashboard/page.tsx`**

```tsx
export default function DashboardPage() {
  return <h1>Dashboard</h1>;
}
```

**`src/app/dashboard/settings/page.tsx`**

```tsx
export default function SettingsPage() {
  return <h1>Dashboard Settings</h1>;
}
```

---

### **Key Points**

* Folder structure **directly maps** to the URL path.
* You can have **as many nesting levels** as needed.
* Parent routes and child routes can have **separate layouts** (covered later in Layouts section).

---

### **Quick Summary Table**

| File Path                         | Route Path            |
| --------------------------------- | --------------------- |
| `app/dashboard/page.tsx`          | `/dashboard`          |
| `app/dashboard/settings/page.tsx` | `/dashboard/settings` |
| `app/dashboard/reports/page.tsx`  | `/dashboard/reports`  |
| `app/blog/page.tsx`               | `/blog`               |
| `app/blog/latest/page.tsx`        | `/blog/latest`        |