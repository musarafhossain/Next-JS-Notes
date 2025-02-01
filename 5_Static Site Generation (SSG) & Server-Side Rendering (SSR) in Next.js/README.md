# **Chapter 5: Static Site Generation (SSG) & Server-Side Rendering (SSR) in Next.js**  

In this chapter, we will cover:  
1. **What is Pre-rendering in Next.js?**  
2. **Static Site Generation (SSG) with `getStaticProps`**  
3. **Incremental Static Regeneration (ISR) with `revalidate`**  
4. **Server-Side Rendering (SSR) with `getServerSideProps`**  
5. **Choosing Between SSG, ISR, and SSR**  

---

## **5.1 What is Pre-rendering in Next.js?**  
Next.js **pre-renders** pages before sending them to the browser for better performance and SEO.  
It supports two types of pre-rendering:  
- **Static Site Generation (SSG)** → Pre-builds the page at build time.  
- **Server-Side Rendering (SSR)** → Builds the page on each request.  

---

## **5.2 Static Site Generation (SSG) with `getStaticProps`**  
📌 **SSG generates static HTML files at build time** and serves them for all users. Best for blogs, documentation, and product listings.  

✅ **Example: Fetching and Pre-rendering Posts at Build Time**  
1. Create a file `pages/posts.js`  
2. Add this code:  
   ```jsx
   export async function getStaticProps() {
     const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
     const posts = await res.json();

     return {
       props: { posts }, // This will be passed to the page component
     };
   }

   export default function Posts({ posts }) {
     return (
       <div>
         <h1>Blog Posts (SSG)</h1>
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
- The data is **fetched at build time**.  
- The page is **pre-built as a static HTML file**.  
- Faster performance and **great for SEO**.  

✅ **Run the build process:**  
```bash
npm run build && npm start
```
- The `posts.js` page is now **statically generated**.  

📌 **SSG is Best for:**  
✔ Blogs  
✔ Product pages  
✔ Marketing sites  

---

## **5.3 Incremental Static Regeneration (ISR) with `revalidate`**  
📌 **ISR allows static pages to be updated without rebuilding the entire site.**  

✅ **Example: Enabling ISR with `revalidate`**  
Modify `pages/posts.js`:  
```jsx
export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts = await res.json();

  return {
    props: { posts },
    revalidate: 10, // Re-generate page every 10 seconds
  };
}

export default function Posts({ posts }) {
  return (
    <div>
      <h1>Blog Posts (ISR)</h1>
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
- The page is **generated at build time**.  
- If a new request comes **after 10 seconds**, Next.js **rebuilds the page in the background**.  

📌 **ISR is Best for:**  
✔ Large blogs (new content every few minutes)  
✔ Product catalogs (inventory updates)  

---

## **5.4 Server-Side Rendering (SSR) with `getServerSideProps`**  
📌 **SSR generates the page dynamically on each request.** Best for dashboards, real-time data, and user-specific pages.  

✅ **Example: Fetching Data on Each Request**  
Modify `pages/posts.js`:  
```jsx
export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts = await res.json();

  return { props: { posts } };
}

export default function Posts({ posts }) {
  return (
    <div>
      <h1>Blog Posts (SSR)</h1>
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
- The page is **generated on each request**.  
- **Slower than SSG** (because it runs the fetch function every time).  
- **Good for real-time data.**  

📌 **SSR is Best for:**  
✔ Dashboards  
✔ Live data (weather, stock prices)  
✔ User-specific content  

---

## **5.5 Choosing Between SSG, ISR, and SSR**  

| Feature | SSG (`getStaticProps`) | ISR (`getStaticProps + revalidate`) | SSR (`getServerSideProps`) |
|---------|----------------------|----------------------|----------------------|
| **Build Time** | At build time | At build time, but updates periodically | On every request |
| **Performance** | 🚀 Fastest (Static HTML) | ⚡ Fast (Partial updates) | 🐢 Slower (Computed on request) |
| **SEO-Friendly?** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Use Case** | Blogs, marketing sites | Product listings, inventory updates | Dashboards, real-time data |

📌 **Rule of Thumb:**  
✔ **Use SSG** if the content **doesn't change frequently**.  
✔ **Use ISR** if you **need updates but want fast performance**.  
✔ **Use SSR** if you **need fresh data on every request**.  

---

## **🔥 Next Steps (Chapter 6: Client-side Data Fetching & SWR in Next.js)**  
Now that you understand **pre-rendering** (SSG, ISR, and SSR), the next step is learning how to **fetch data dynamically on the client side using SWR.**  

Would you like to move on to **Chapter 6: Client-side Data Fetching in Next.js**? 🚀