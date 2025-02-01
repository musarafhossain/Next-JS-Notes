# **Chapter 6: Client-Side Data Fetching in Next.js**  

In this chapter, we will cover:  
1. **What is Client-Side Data Fetching?**  
2. **Fetching Data with `useEffect` and `fetch`**  
3. **Using SWR (Stale-While-Revalidate) for Efficient Fetching**  
4. **Comparison: SSR, SSG, ISR vs. Client-side Fetching**  
5. **Best Practices for Client-Side Fetching**  

---

## **6.1 What is Client-Side Data Fetching?**  
📌 In Next.js, some data can be **fetched on the client-side after the page has loaded.**  
- Unlike **SSG** or **SSR**, client-side fetching **does not pre-render data**.  
- Used for **user-specific content**, real-time updates, and interactive data.  

✅ **When to use Client-Side Fetching?**  
✔ User-specific content (profile, dashboard)  
✔ Real-time updates (stock prices, chat messages)  
✔ Large datasets (load more functionality)  

---

## **6.2 Fetching Data with `useEffect` and `fetch`**  
📌 **React's `useEffect` can be used to fetch data when the component loads.**  

✅ **Example: Fetching Posts Using `useEffect`**  
1. Create a file `pages/client-fetch.js`  
2. Add this code:  
   ```jsx
   import { useState, useEffect } from "react";

   export default function ClientFetch() {
     const [posts, setPosts] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       async function fetchData() {
         const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
         const data = await res.json();
         setPosts(data);
         setLoading(false);
       }
       fetchData();
     }, []);

     if (loading) return <p>Loading...</p>;

     return (
       <div>
         <h1>Client-Side Fetched Posts</h1>
         <ul>
           {posts.map((post) => (
             <li key={post.id}>{post.title}</li>
           ))}
         </ul>
       </div>
     );
   }
   ```

✅ **How it works:**  
- The data **fetches only after the page loads**.  
- The **loading state** ensures a smooth experience.  
- The **component updates dynamically** when data arrives.  

---

## **6.3 Using SWR (Stale-While-Revalidate) for Efficient Fetching**  
📌 **SWR (Stale-While-Revalidate)** is a React hook for **fast and efficient data fetching**.  
- ✅ Caches data for faster reloads.  
- ✅ Auto-updates stale data in the background.  
- ✅ Reduces server load.  

🔹 **Install SWR:**  
```bash
npm install swr
```

✅ **Example: Fetching Data Using SWR**  
Modify `pages/client-fetch.js` to use SWR:  
```jsx
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ClientFetch() {
  const { data: posts, error } = useSWR("https://jsonplaceholder.typicode.com/posts?_limit=5", fetcher);

  if (error) return <p>Error loading data...</p>;
  if (!posts) return <p>Loading...</p>;

  return (
    <div>
      <h1>Client-Side Fetched Posts (SWR)</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

✅ **Why Use SWR Instead of `useEffect`?**  
✔ Faster: Uses caching to avoid unnecessary re-fetching.  
✔ Auto-refresh: Updates the data automatically.  
✔ Easier to use: No need to handle `useState` and `useEffect`.  

📌 **When to Use SWR?**  
- Real-time data (chat apps, notifications)  
- Cached data that needs periodic updates  
- API data that doesn’t need SSR  

---

## **6.4 Comparison: SSR, SSG, ISR vs. Client-side Fetching**  

| Feature | SSG (`getStaticProps`) | ISR (`getStaticProps + revalidate`) | SSR (`getServerSideProps`) | Client-side (`useEffect`, SWR) |
|---------|----------------------|----------------------|----------------------|---------------------------|
| **When does it run?** | At build time | At build + revalidate time | On every request | After page load |
| **Speed** | 🚀 Fastest (Static HTML) | ⚡ Fast (Partial updates) | 🐢 Slower (Computed on request) | 🔄 Fast (uses cache) |
| **SEO-Friendly?** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No (since content loads after page load) |
| **Use Case** | Blogs, docs, product pages | Product pages with updates | Dashboards, real-time data | User-specific data, live updates |

📌 **Use SWR for:**  
✔ Live updates (stock prices, news feeds)  
✔ Caching frequently accessed data  
✔ Pages that don’t need pre-rendering  

---

## **6.5 Best Practices for Client-Side Fetching**  
✅ **Use SWR** for performance (caching, revalidation).  
✅ **Show loading states** to improve user experience.  
✅ **Avoid unnecessary re-fetching** by using `useEffect` dependencies.  
✅ **Use a global state (like Redux or Context API)** if data is shared across components.  

