## **3. Project Structure in Next.js (App Router)**

When you create a Next.js project using the **App Router**, you’ll see something like this:

```
my-app/
│
├── app/                # All your routes, layouts, pages, templates
│   ├── page.tsx         # Home page route ("/")
│   ├── layout.tsx       # Root layout (shared across all pages)
│   ├── globals.css      # Global styles
│   └── (other folders)  # Additional routes or route groups
│
├── public/              # Publicly accessible static files
│   └── favicon.ico
│
├── node_modules/        # Installed packages
│
├── package.json         # Dependencies + scripts
├── next.config.js       # Next.js configuration file
├── tsconfig.json        # TypeScript configuration (if using TS)
└── README.md
```

---

### **Important Folders & Files**

#### **1. `app/`**

* **Main routing folder** (App Router introduced in Next.js 13+).
* Every folder inside represents a route.
* A `page.tsx` file = the actual page content.
* A `layout.tsx` file = shared UI wrapper for pages inside that folder.
* Can also contain:

  * `loading.tsx` → Loading state
  * `error.tsx` → Error UI
  * `template.tsx` → A fresh instance for each navigation
  * `route.ts` → API endpoints

#### **2. `public/`**

* Stores static assets: images, icons, PDFs, etc.
* Accessible via `/filename` in browser.
* Example: `public/logo.png` → `/logo.png`.

#### **3. `package.json`**

* Lists dependencies (`next`, `react`, `react-dom`, etc.).
* Contains scripts like:

  ```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
  ```

#### **4. `next.config.js`**

* Customize Next.js settings.
* Example:

  ```js
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    images: {
      domains: ['example.com']
    }
  };
  module.exports = nextConfig;
  ```

---

### **Routing Example**

If you have:

```
app/
 ├── page.tsx         → "/"
 ├── about/
 │    └── page.tsx    → "/about"
 └── blog/
      └── page.tsx    → "/blog"
```

Next.js automatically creates routes:

* `/` → Home
* `/about`
* `/blog`
