# **Chapter 19: Building & Integrating a CMS (Content Management System) in Next.js**  

A Content Management System (CMS) allows non-technical users to manage content dynamically. In this chapter, we will explore how to build and integrate a CMS with **Next.js** using headless CMS solutions like **Strapi, Sanity, and Contentful**, and also how to build a simple custom CMS with **Next.js + MongoDB**.

---

## **19.1 Understanding Headless CMS & Why Use It?**  

A **headless CMS** provides an API for managing content without dictating how it is displayed. The frontend (Next.js) fetches content dynamically from the CMS.

### ✅ **Benefits of a Headless CMS:**
- **Flexibility:** Frontend and backend are independent.
- **API-Driven:** Works seamlessly with GraphQL or REST.
- **Better Performance:** Faster than traditional CMS solutions like WordPress.

---

## **19.2 Integrating a Headless CMS in Next.js**  

We will explore three popular **headless CMS** solutions:
1. **Strapi** – Open-source and self-hosted.  
2. **Sanity** – Real-time content editing.  
3. **Contentful** – Scalable and cloud-based.

---

### **1️⃣ Setting Up Strapi with Next.js**  
📌 **Strapi** is an open-source CMS with a powerful REST & GraphQL API.

#### ✅ **Installing Strapi**
```bash
npx create-strapi-app@latest cms --quickstart
```
- This creates a CMS at `http://localhost:1337/admin`.

#### ✅ **Creating an API Endpoint in Strapi**
1. Go to **Content-Type Builder** and create a collection named `posts`.  
2. Add fields:  
   - `title` (Text)  
   - `content` (Rich Text)  
   - `image` (Media)  
3. Click **Save** and **Publish**.  

#### ✅ **Fetching Strapi Content in Next.js**  
📂 `pages/index.js`
```jsx
export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/api/posts?populate=*");
  const data = await res.json();

  return {
    props: { posts: data.data },
  };
}

export default function Home({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.attributes.title}</h2>
          <p>{post.attributes.content}</p>
          <img src={post.attributes.image.data.attributes.url} alt={post.attributes.title} />
        </div>
      ))}
    </div>
  );
}
```
✅ **This fetches blog posts from Strapi dynamically!**  

---

### **2️⃣ Using Sanity CMS with Next.js**  
📌 **Sanity** provides real-time editing and a flexible API.

#### ✅ **Install Sanity CLI & Create a Project**
```bash
npm install -g @sanity/cli
sanity init --dataset production
sanity start
```
- Visit **http://localhost:3333** for the admin panel.

#### ✅ **Creating a Schema in Sanity**
📂 `schemas/post.js`
```js
export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "content", type: "text", title: "Content" },
    { name: "image", type: "image", title: "Image" },
  ],
};
```
- Deploy it with:  
  ```bash
  sanity deploy
  ```

#### ✅ **Fetching Sanity Content in Next.js**
📂 `pages/index.js`
```jsx
import { createClient } from "next-sanity";

const client = createClient({
  projectId: "your_project_id",
  dataset: "production",
  useCdn: false,
});

export async function getStaticProps() {
  const posts = await client.fetch('*[_type == "post"]');
  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
```
✅ **Sanity provides real-time content updates without rebuilding your app!**  

---

### **3️⃣ Using Contentful CMS with Next.js**  
📌 **Contentful** is a cloud-based CMS with an intuitive UI.

#### ✅ **Setup Contentful**
1. Create an account at [Contentful](https://www.contentful.com/).  
2. Create a **new space** and add a **content model** named `Post`.  
3. Add fields:  
   - `title` (Text)  
   - `content` (Rich Text)  

#### ✅ **Fetching Contentful Data in Next.js**
📂 `lib/contentful.js`
```js
import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});
```
📂 `pages/index.js`
```jsx
import { client } from "../lib/contentful";

export async function getStaticProps() {
  const res = await client.getEntries({ content_type: "post" });
  return { props: { posts: res.items } };
}

export default function Home({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.sys.id}>
          <h2>{post.fields.title}</h2>
          <p>{post.fields.content}</p>
        </div>
      ))}
    </div>
  );
}
```
✅ **This pulls content from Contentful dynamically!**  

---

## **19.3 Building a Custom CMS with Next.js + MongoDB**  

📌 **For full control, we can build a CMS with Next.js, MongoDB, and TailwindCSS.**  

### ✅ **Create MongoDB Database**
- Use **MongoDB Atlas** or a local database.  
- Store blog posts in a `posts` collection.

### ✅ **Next.js API for CRUD Operations**
📂 `pages/api/posts.js`
```js
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "GET") {
    const posts = await db.collection("posts").find({}).toArray();
    res.status(200).json(posts);
  }

  if (req.method === "POST") {
    const post = await db.collection("posts").insertOne(req.body);
    res.status(201).json(post);
  }
}
```

### ✅ **Frontend to Fetch and Display Posts**
📂 `pages/index.js`
```jsx
import { useState, useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
```
✅ **Now you have a custom CMS with Next.js & MongoDB!**  

---

## **19.4 Choosing the Right CMS for Your Next.js App**  

| Feature           | Strapi | Sanity | Contentful | Custom (MongoDB) |
|------------------|--------|--------|------------|-------------------|
| **Self-hosted** | ✅ | ❌ | ❌ | ✅ |
| **Real-time Editing** | ❌ | ✅ | ✅ | ❌ |
| **GraphQL Support** | ✅ | ✅ | ✅ | ❌ |
| **Ease of Use** | Medium | Hard | Easy | Hard |
| **Best For** | APIs | Realtime Editing | Enterprise | Full Control |

---