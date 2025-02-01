# **Chapter 4: Layouts & Global Components in Next.js**  
In this chapter, we will cover:  
1. **What is `_app.js`?** (Customizing global app behavior)  
2. **What is `_document.js`?** (Customizing HTML structure)  
3. **Creating Layout Components** (Reusable layout structure)  
4. **Using Layouts in Pages** (Applying layouts dynamically)  
5. **Creating Global Components** (Header, Footer, Sidebar)  

---

## **4.1 What is `_app.js`?**  
Next.js uses a special file called **`_app.js`** inside the `pages/` directory.  
📌 **It is used to wrap all pages with global styles, providers, and layouts.**  

✅ **Example: Adding global styles in `_app.js`**  
1. Open `pages/_app.js` and modify it like this:  
   ```jsx
   import '../styles/globals.css';

   function MyApp({ Component, pageProps }) {
     return <Component {...pageProps} />;
   }

   export default MyApp;
   ```
2. **Now, global styles are applied to all pages.**  

✅ **Use `_app.js` for:**  
✔ Global styles (CSS, Tailwind)  
✔ Wrapping pages with a layout  
✔ Adding providers (Redux, Context API)  

---

## **4.2 What is `_document.js`?**  
📌 **`_document.js` is used to customize the overall HTML structure** (e.g., adding `<meta>` tags, fonts).  

✅ **Example: Custom `_document.js`**
1. Create a file: `pages/_document.js`  
2. Add the following code:  
   ```jsx
   import { Html, Head, Main, NextScript } from 'next/document';

   export default function Document() {
     return (
       <Html lang="en">
         <Head>
           <meta charSet="UTF-8" />
           <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter&display=swap" />
         </Head>
         <body>
           <Main />
           <NextScript />
         </body>
       </Html>
     );
   }
   ```
✅ **Now, all pages will include these meta tags and styles globally.**  

---

## **4.3 Creating a Layout Component**  
📌 **A Layout Component is a wrapper that adds a Header, Footer, or Sidebar to all pages.**  

✅ **Example: Creating a Basic Layout**  
1. Create a folder `components/`  
2. Inside `components/`, create `Layout.js`  
3. Add this code:  
   ```jsx
   // components/Layout.js
   export default function Layout({ children }) {
     return (
       <div>
         <header style={{ background: "#0070f3", padding: "10px", color: "white" }}>
           <h1>My Website</h1>
         </header>
         <main>{children}</main>
         <footer style={{ background: "#222", padding: "10px", color: "white", marginTop: "20px" }}>
           <p>&copy; 2025 My Website</p>
         </footer>
       </div>
     );
   }
   ```

---

## **4.4 Using Layouts in Pages**  
📌 **To use the layout, wrap each page inside the `Layout` component.**  

✅ **Example: Applying Layout in `index.js`**  
Modify `pages/index.js`:  
```jsx
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <h1>Welcome to Next.js</h1>
      <p>This page uses a shared layout.</p>
    </Layout>
  );
}
```
✅ **Now, the Header and Footer appear on every page that uses `Layout`.**  

---

## **4.5 Applying Layout to All Pages Automatically**  
Instead of adding `<Layout>` manually to every page, we can **wrap it in `_app.js`**.

✅ **Modify `_app.js` to include Layout globally**  
```jsx
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
```
✅ **Now, all pages automatically use the Layout!**  

---

## **4.6 Creating Global Components (Header, Footer, Sidebar)**  
📌 **Instead of a single layout, you can create reusable components like `Header`, `Footer`, and `Sidebar`.**

✅ **Example: Creating a `Header.js` component**  
1. Create `components/Header.js`  
2. Add this code:  
   ```jsx
   import Link from 'next/link';

   export default function Header() {
     return (
       <header style={{ background: "#0070f3", padding: "10px", color: "white" }}>
         <nav>
           <Link href="/">Home</Link> | <Link href="/about">About</Link> | <Link href="/contact">Contact</Link>
         </nav>
       </header>
     );
   }
   ```

✅ **Example: Creating a `Footer.js` component**  
```jsx
export default function Footer() {
  return (
    <footer style={{ background: "#222", padding: "10px", color: "white", marginTop: "20px" }}>
      <p>&copy; 2025 My Website</p>
    </footer>
  );
}
```

✅ **Example: Creating a `Sidebar.js` component**  
```jsx
export default function Sidebar() {
  return (
    <aside style={{ width: "200px", background: "#f5f5f5", padding: "10px" }}>
      <h3>Sidebar</h3>
      <p>Some sidebar content</p>
    </aside>
  );
}
```

✅ **Modify `Layout.js` to include Header, Footer, and Sidebar**  
```jsx
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ marginLeft: "220px", padding: "20px" }}>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
```
✅ **Now, every page will have a header, sidebar, and footer.**  

---

## **📌 Chapter Summary**
| Feature | Description | Example |
|---------|------------|---------|
| **`_app.js`** | Customizes the global app structure | Wrapping all pages in Layout |
| **`_document.js`** | Customizes HTML structure | Adding `<meta>`, fonts, etc. |
| **Layouts** | Reusable structure (Header, Footer) | `<Layout><Component /></Layout>` |
| **Global Components** | Common components (Header, Sidebar) | `<Header />`, `<Footer />` |

---

## **🔥 Next Steps (Chapter 5: SSG & SSR)**
Now that we have a structured layout, the next step is **understanding Static Site Generation (SSG) & Server-Side Rendering (SSR).**  

Would you like to move on to **Chapter 5: SSG & SSR in Next.js**? 🚀