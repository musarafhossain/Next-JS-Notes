## **2. Hello World in Next.js**

### **Step 1: Create a New Next.js Project**

You can use **npm**, **yarn**, or **pnpm**.

Using npm:

```bash
npx create-next-app@latest
```

It will ask:

* Project name → `my-app`
* TypeScript? → your choice (`Yes` recommended)
* ESLint? → `Yes`
* Tailwind? → optional
* `src/` directory? → `Yes`
* App Router? → `Yes` (for new Next.js 13+ projects)
* Turbopack for `next dev`? → `No`
* Import alias? → optional

Go into the project:

```bash
cd my-app
npm run dev
```

---

### **Step 2: Default Project Structure**

When you choose **App Router**, you’ll get:

```
my-app/
  src/
    app/
        page.tsx   ← Default home page
        globals.css
        layout.tsx ← Root layout
  public/      ← Public static files (images, etc.)
  package.json
  next.config.js
```

---

### **Step 3: Editing the First Page**

`app/page.tsx` is your home page.
Example:

```tsx
export default function Home() {
  return (
    <h1>Hello World from Next.js 🚀</h1>
  );
}
```

When you run:

```bash
npm run dev
```

You’ll see the app at:

```
http://localhost:3000
```

---

### **Step 4: How it Works**

* `page.tsx` → Rendered as `/` route.
* Everything in `app/` is **server-rendered by default** (unless marked `"use client"`).

---

### **Quick Notes**

* No need for `react-router-dom` → Next.js routing is automatic.
* You can create a page by making a folder and adding a `page.tsx` inside it.