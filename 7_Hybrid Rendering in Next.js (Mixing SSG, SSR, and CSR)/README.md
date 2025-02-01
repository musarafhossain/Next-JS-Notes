# **Chapter 7: Hybrid Rendering in Next.js (Mixing SSG, SSR, and CSR)**  

In this chapter, we will cover:  
1. **What is Hybrid Rendering?**  
2. **Combining SSG & CSR**  
3. **Combining SSR & CSR**  
4. **Mixing SSG, SSR, and CSR**  
5. **Real-world Use Cases & Best Practices**  

---

## **7.1 What is Hybrid Rendering?**  
📌 **Hybrid Rendering** means using multiple rendering strategies (SSG, ISR, SSR, and CSR) within the same Next.js application.  
- Allows developers to **optimize performance** while keeping content **dynamic**.  
- Example: A blog can have **static posts (SSG)** but fetch **user comments dynamically (CSR)**.  

✅ **Why use Hybrid Rendering?**  
✔ **Better Performance** → Use **SSG** for fast loading & **CSR** for interactivity.  
✔ **SEO Optimization** → Use **SSR or SSG** where SEO is needed.  
✔ **Efficient Data Fetching** → Avoid unnecessary SSR where static content is enough.  

---

## **7.2 Combining SSG & CSR (Static Site Generation + Client-side Fetching)**  
📌 **SSG pre-renders the page at build time, and CSR fetches dynamic data on the client side.**  

✅ **Example: Pre-rendering Blog Posts (SSG) & Fetching Comments (CSR)**  
1. **Generate static blog posts at build time using `getStaticProps`.**  
2. **Fetch user comments dynamically using SWR (`useSWR`).**  

📂 `pages/blog/[id].js`
```jsx
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export async function getStaticProps({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post = await res.json();

  return {
    props: { post },
    revalidate: 10, // ISR enabled
  };
}

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  const posts = await res.json();

  return {
    paths: posts.map((post) => ({ params: { id: post.id.toString() } })),
    fallback: true,
  };
}

export default function BlogPost({ post }) {
  const router = useRouter();
  const { data: comments, error } = useSWR(
    `https://jsonplaceholder.typicode.com/comments?postId=${post?.id}`,
    fetcher
  );

  if (router.isFallback) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <h2>Comments (CSR)</h2>
      {error && <p>Error loading comments.</p>}
      {!comments ? <p>Loading comments...</p> : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.body}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```
✅ **How it works:**  
- **SSG** pre-renders the blog post at **build time** for SEO & performance.  
- **ISR (`revalidate: 10`)** allows updates without rebuilding the whole site.  
- **CSR (`useSWR`) fetches user comments dynamically** without needing SSR.  

📌 **Best For:**  
✔ Blogs  
✔ Product pages (static details + live reviews)  

---

## **7.3 Combining SSR & CSR (Server-Side Rendering + Client-side Fetching)**  
📌 **SSR renders the page on each request, while CSR updates parts of the page dynamically.**  

✅ **Example: Real-time Crypto Prices**  
1. **Fetch the initial cryptocurrency data with `getServerSideProps` (SSR).**  
2. **Use SWR to update the price every 5 seconds (CSR).**  

📂 `pages/crypto.js`
```jsx
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export async function getServerSideProps() {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd");
  const prices = await res.json();

  return { props: { initialPrices: prices } };
}

export default function Crypto({ initialPrices }) {
  const { data: prices, error } = useSWR(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd",
    fetcher,
    { refreshInterval: 5000 } // Auto refresh every 5 seconds
  );

  if (error) return <p>Error loading data...</p>;

  return (
    <div>
      <h1>Crypto Prices</h1>
      <p>Bitcoin: ${prices?.bitcoin?.usd || initialPrices.bitcoin.usd}</p>
      <p>Ethereum: ${prices?.ethereum?.usd || initialPrices.ethereum.usd}</p>
    </div>
  );
}
```
✅ **How it works:**  
- **SSR (`getServerSideProps`)** fetches initial crypto prices on each request.  
- **CSR (`useSWR`)** auto-refreshes prices every 5 seconds.  

📌 **Best For:**  
✔ Dashboards  
✔ Live stock market updates  

---

## **7.4 Mixing SSG, SSR, and CSR**  
📌 **Use SSG for static content, SSR for dynamic data, and CSR for real-time updates.**  

✅ **Example: E-commerce Product Page**  
| Feature | Rendering Method |
|---------|----------------|
| **Product Details (Title, Description, Price)** | **SSG (`getStaticProps`)** |
| **Inventory Stock Count (Changes Frequently)** | **SSR (`getServerSideProps`)** |
| **User Reviews (Live Updates on Load More Click)** | **CSR (`useEffect` or `SWR`)** |

📂 `pages/product/[id].js`
```jsx
import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export async function getStaticProps({ params }) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const product = await res.json();

  return { props: { product }, revalidate: 60 };
}

export async function getStaticPaths() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    paths: products.map((product) => ({ params: { id: product.id.toString() } })),
    fallback: true,
  };
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`https://api.example.com/stock/${params.id}`);
  const stock = await res.json();

  return { props: { stock } };
}

export default function Product({ product, stock }) {
  const { data: reviews } = useSWR(`https://api.example.com/reviews/${product.id}`, fetcher);

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {stock.count}</p>

      <h2>Customer Reviews</h2>
      {reviews ? (
        <ul>{reviews.map((review) => <li key={review.id}>{review.comment}</li>)}</ul>
      ) : (
        <p>Loading reviews...</p>
      )}
    </div>
  );
}
```
📌 **How it works:**  
- **SSG** → Product details pre-rendered at build time.  
- **SSR** → Stock data fetched live on every request.  
- **CSR** → Reviews update dynamically in the browser.  

📌 **Best For:**  
✔ E-commerce websites  
✔ News & content-heavy platforms  
