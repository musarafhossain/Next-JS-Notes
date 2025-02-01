## **Chapter 3: Understanding Pages & Routing in Next.js**  
Next.js provides a **file-based routing** system, which means the structure of your files inside the `pages/` directory automatically defines the routes of your application.  

In this chapter, we will cover:  
1. **File-based Routing** (Creating static pages)  
2. **Dynamic Routing** (Creating dynamic pages with parameters)  
3. **Nested Routing** (Organizing routes inside folders)  
4. **API Routes** (Building backend APIs inside Next.js)  
5. **Navigation in Next.js** (Using `next/link` and `next/router`)  

---

## **3.1 File-based Routing (Static Routes)**
In Next.js, every file inside the `pages/` directory automatically becomes a route.  

✅ **Example:**  
If you create the following files inside `pages/`:

```
pages/
├── index.js        →   (Accessible at `/`)
├── about.js        →   (Accessible at `/about`)
├── contact.js      →   (Accessible at `/contact`)
```

### **Creating Static Pages**
1. **Create `about.js` inside `pages/`**
2. **Add the following code:**
   ```jsx
   export default function About() {
     return (
       <div>
         <h1>About Us</h1>
         <p>This is the About page.</p>
       </div>
     );
   }
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Visit `http://localhost:3000/about`** in your browser.

✅ **Done! Your `/about` route is ready.**  

---

## **3.2 Dynamic Routing (Using Parameters)**
Sometimes, you need **dynamic routes** (e.g., `/blog/post-1`, `/blog/post-2`).  
Next.js handles this with **square brackets `[param]`** inside the `pages/` directory.

✅ **Example: Creating a Blog with Dynamic Routes**  
1. **Create a folder inside `pages/` named `blog/`**  
2. **Inside `blog/`, create `[slug].js`**  

📌 **Folder structure:**
```
pages/
└── blog/
    └── [slug].js  →  (Handles `/blog/:slug`)
```

3. **Add this code inside `[slug].js`:**
   ```jsx
   import { useRouter } from 'next/router';

   export default function BlogPost() {
     const router = useRouter();
     const { slug } = router.query;

     return (
       <div>
         <h1>Blog Post: {slug}</h1>
         <p>This is a dynamic blog post page.</p>
       </div>
     );
   }
   ```

4. **Now, visit:**  
   - `http://localhost:3000/blog/nextjs-routing`  
   - `http://localhost:3000/blog/react-hooks`  

✅ **Each blog post dynamically renders based on the URL.**

---

## **3.3 Nested Routing (Organizing Routes)**
You can create nested folders to organize routes better.

✅ **Example: Creating a `users` section**  
```
pages/
└── users/
    ├── index.js      →  (Accessible at `/users`)
    ├── profile.js    →  (Accessible at `/users/profile`)
```

### **Creating `users/index.js`**
```jsx
export default function Users() {
  return <h1>Users List</h1>;
}
```

### **Creating `users/profile.js`**
```jsx
export default function UserProfile() {
  return <h1>User Profile Page</h1>;
}
```

✅ **Now, visit `/users` and `/users/profile`**

---

## **3.4 API Routes (Creating Backend in Next.js)**
Next.js allows you to create **backend APIs inside `pages/api/`**.

✅ **Example: Creating an API that returns user data**
1. **Create `pages/api/users.js`**
2. **Add the following code:**
   ```jsx
   export default function handler(req, res) {
     res.status(200).json({ users: ["Alice", "Bob", "Charlie"] });
   }
   ```
3. **Start the server and visit:**  
   🔗 `http://localhost:3000/api/users`  

✅ **You will see:**  
```json
{
  "users": ["Alice", "Bob", "Charlie"]
}
```

📌 **API routes can handle:**  
✔ Fetching data  
✔ Handling POST requests  
✔ Connecting to databases  
✔ Processing authentication  

---

## **3.5 Navigation in Next.js**
To navigate between pages, use **`next/link`** and **`next/router`**.

### **Using `next/link` (Best for Static Links)**
```jsx
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/about">Go to About Page</Link>
    </div>
  );
}
```

✅ **Clicking the link will take you to `/about` without a full page reload!**

---

### **Using `next/router` (Best for Programmatic Navigation)**
```jsx
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => router.push('/about')}>Go to About</button>
    </div>
  );
}
```

✅ **Clicking the button will navigate to `/about`.**

---

## **📌 Chapter Summary**
| Feature | Description | Example |
|---------|------------|---------|
| **Static Routing** | Each file in `pages/` becomes a route | `/about`, `/contact` |
| **Dynamic Routing** | Routes with parameters using `[param].js` | `/blog/post-1`, `/blog/post-2` |
| **Nested Routing** | Organizing routes in folders | `/users/profile` |
| **API Routes** | Backend APIs inside `pages/api/` | `/api/users` |
| **Navigation** | Using `next/link` and `next/router` | `<Link href="/about">About</Link>` |

---

## **🔥 Next Steps (Chapter 4: Layouts & Global Components)**
Now that you understand routing, the next step is **building reusable layouts** for your app.

Would you like to move on to **Chapter 4: Layouts and Global Components**? 🚀