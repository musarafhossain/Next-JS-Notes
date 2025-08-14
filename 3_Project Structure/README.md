Alright — I’ll format **Project Structure** notes in exactly that style so it matches what you’re asking for.

---

## **Folder Structure**

Next.js folder structure is based on a **file-based routing system**, meaning the structure inside the `/pages` or `/app` directory determines the application’s routes automatically.
When using the **App Router** (Next.js 13+), the basic structure looks like:

```
nextjs-app-router/
    src/                        // Optional folder for source code
       app/                     // Root folder for App Router
          counter/              // Folder for Counter Page
             page.tsx
          page.tsx
       components/              // Reusable components
       styles/                   // Global and module CSS files
    public/                      // Static assets (images, fonts, etc.)
    next.config.js               // Next.js configuration
    package.json                 // Dependencies & scripts
    tsconfig.json                // TypeScript configuration
    middleware.ts                // Middleware logic
    .env                         // Environment variables
    .env.local                   // Local environment variables
    .gitignore                   // Files ignored by git
```

---

### **Example Routes**

* `src/app/page.tsx` → Home page → **`localhost:3000/`**
* `src/app/counter/page.tsx` → Counter page → **`localhost:3000/counter`**

---

## **Top Level Folders**

* **`/app`** → Root folder for the **App Router**. Contains routes, layouts, templates, and route handlers.
* **`/pages`** → Root folder for the **Page Router** (older routing system, optional in new projects).
* **`/public`** → Stores static files accessible directly via the browser.
* **`/src`** → Optional; used to keep all source code organized and separate from config files.
* **`/components`** → (Inside `src/`) Stores reusable UI components.
* **`/styles`** → (Inside `src/`) Stores global styles and CSS modules.

---

## **Top Level Files**

* **`next.config.js`** → Next.js configuration file.
* **`package.json`** → Contains project dependencies, scripts, and metadata.
* **`tsconfig.json`** → TypeScript configuration file.
* **`middleware.ts`** → Used to define middleware for handling requests.
* **`.env`** → Environment variables for all environments.
* **`.env.local`** → Environment variables for local development.
* **`.gitignore`** → Files/folders ignored by Git.

---

## **Routing Files** (inside `/app` or `/pages`)

* **`page.tsx`** → Defines the UI for a specific route.
* **`layout.tsx`** → Shared layout (navbar, header, footer, etc.) for all nested pages.
* **`loading.tsx`** → Loading UI for route transitions.
* **`error.tsx`** → Error boundary for that route.
* **`not-found.tsx`** → 404 page for missing routes.
* **`template.tsx`** → Creates a new instance of the UI tree on navigation.
* **`route.ts`** → API route handler (GET, POST, etc.) for backend logic.