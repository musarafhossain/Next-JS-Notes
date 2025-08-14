## **1. Introduction to Next.js**

**What is Next.js?**

* **Next.js** is a **React framework** for building full-stack web applications.
* It adds **server-side rendering (SSR)**, **static site generation (SSG)**, and a **file-based routing system** on top of React.
* Created by **Vercel**.

**Key Features:**

1. **File-based routing** → Pages are created from the folder structure.
2. **Hybrid rendering** → You can mix CSR, SSR, and SSG in the same app.
3. **API routes** → Build backend endpoints directly in your Next.js app.
4. **Image optimization** → `<Image>` component for faster loading.
5. **Automatic code splitting** → Only loads JavaScript needed for the page.
6. **Built-in CSS & SCSS support** → Import styles without config.
7. **TypeScript ready** → Built-in TypeScript support.
8. **App Router** → New file structure (`app/`) with **React Server Components**.

**Why use Next.js instead of plain React?**

* React is **UI-focused only** — you handle routing, SSR, API manually.
* Next.js gives you **routing, rendering, and backend** out of the box.
* Next.js have SEO support

**Example architecture:**

```
Frontend (React) + Backend (API routes) → in one Next.js project.
```

**Quick mental model:**
Next.js = React + Routing + Server/Backend + Rendering options.

