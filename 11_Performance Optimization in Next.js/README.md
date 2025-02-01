# **Chapter 11: Performance Optimization in Next.js**  

In this chapter, we will cover:  
1. **Automatic Code-Splitting**  
2. **Lazy Loading Components & Images**  
3. **Optimizing API Requests with Caching**  
4. **Using ISR (Incremental Static Regeneration) for Faster Updates**  
5. **Optimizing Fonts and External Resources**  
6. **Performance Best Practices in Next.js**  

---

## **11.1 Automatic Code-Splitting**  
📌 **Next.js automatically splits your JavaScript bundle, only loading what's needed for each page.**  
✅ **Why it matters?**  
✔ Reduces initial page load time  
✔ Avoids unnecessary JavaScript execution  
✔ Improves user experience  

✅ **How Next.js Handles Code-Splitting**  
- Each page gets its own **JavaScript bundle**.  
- Only the necessary JavaScript is loaded when the user navigates.  

✅ **Example: Page-Based Code-Splitting**  
📂 `pages/index.js`
```jsx
export default function Home() {
  return <h1>Home Page</h1>;
}
```
📂 `pages/about.js`
```jsx
export default function About() {
  return <h1>About Page</h1>;
}
```
✅ **What happens?**  
- Visiting `/` loads only `index.js` JavaScript.  
- Navigating to `/about` loads only `about.js` JavaScript.  
- No unnecessary scripts are loaded.  

---

## **11.2 Lazy Loading Components & Images**  
📌 **Lazy loading defers the loading of non-essential components and images until needed.**  

### **Lazy Loading Components with `next/dynamic`**  
✅ **Why use it?**  
✔ Reduces initial JavaScript load  
✔ Improves First Contentful Paint (FCP)  

✅ **Example: Lazy Loading a Component**  
📂 `components/HeavyComponent.js`
```jsx
export default function HeavyComponent() {
  return <h1>This is a heavy component</h1>;
}
```
📂 `pages/index.js`
```jsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("../components/HeavyComponent"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <HeavyComponent />
    </div>
  );
}
```
✅ **What happens?**  
- The **HeavyComponent** is only loaded when needed.  
- A **loading message** appears until it's loaded.  

---

### **Lazy Loading Images with `next/image`**  
📌 **Next.js provides an optimized `Image` component for automatic lazy loading.**  
✅ **Why use `next/image`?**  
✔ Automatic lazy loading  
✔ Optimized image resizing & formats  
✔ Better performance  

✅ **Example: Optimized Image Loading**  
📂 `pages/index.js`
```jsx
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Image src="/example.jpg" width={500} height={300} alt="Example Image" />
    </div>
  );
}
```
✅ **What happens?**  
- The image is **automatically lazy loaded**.  
- It **loads only when in view**, improving performance.  

---

## **11.3 Optimizing API Requests with Caching**  
📌 **API requests can slow down your app. Caching improves performance by reducing duplicate requests.**  

✅ **Using SWR (Stale-While-Revalidate) for Caching**  
📌 **SWR is a React hook for data fetching with caching & revalidation.**  
✅ **Install SWR**  
```bash
npm install swr
```
✅ **Example: Caching API Data with SWR**  
📂 `pages/users.js`
```jsx
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Users() {
  const { data, error } = useSWR("/api/users", fetcher, { refreshInterval: 5000 });

  if (error) return <p>Error loading users</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```
✅ **What happens?**  
- Users are fetched from `/api/users`.  
- Data is cached and **automatically updated every 5 seconds**.  
- No need for manual refreshing.  

---

## **11.4 Using ISR (Incremental Static Regeneration) for Faster Updates**  
📌 **ISR allows static pages to be updated without rebuilding the whole app.**  
✅ **Why use ISR?**  
✔ Fast static pages with real-time updates  
✔ No need to redeploy for content changes  

✅ **Example: ISR in Next.js**  
📂 `pages/posts.js`
```jsx
export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return {
    props: { posts },
    revalidate: 10, // Rebuilds every 10 seconds
  };
}

export default function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```
✅ **What happens?**  
- The page is **statically generated**.  
- Every **10 seconds**, it fetches new posts.  
- No need to manually refresh or redeploy.  

---

## **11.5 Optimizing Fonts and External Resources**  
📌 **Next.js provides optimized font loading with Google Fonts.**  

✅ **Example: Optimizing Google Fonts**  
📂 `pages/_app.js`
```jsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}
```
✅ **Why use this?**  
✔ Loads fonts **only when needed**  
✔ No render-blocking  

---

## **11.6 Performance Best Practices in Next.js**  
🚀 **Top tips to improve performance:**  
✅ **Use Static Generation (SSG) whenever possible**  
✅ **Use Lazy Loading for Components and Images**  
✅ **Cache API Requests using SWR**  
✅ **Use ISR for Real-Time Content Updates**  
✅ **Minimize Third-Party Scripts (Google Analytics, Ads)**  
✅ **Optimize Fonts using Next.js font loader**  
✅ **Use `next/image` for optimized image handling**  