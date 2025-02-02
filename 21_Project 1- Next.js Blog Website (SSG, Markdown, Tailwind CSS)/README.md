# **Project 1: Next.js Blog Website (SSG, Markdown, Tailwind CSS)**  

In this project, we'll build a **modern blog website** using **Next.js** with **Static Site Generation (SSG)**, **Markdown for content**, and **Tailwind CSS for styling**.  

---

## **🚀 Features**
✅ **Markdown-based blog posts** stored in a local folder.  
✅ **Static Site Generation (SSG)** for fast performance.  
✅ **Dynamic routing for blog posts**.  
✅ **Tailwind CSS for styling**.  
✅ **SEO-friendly pages** using Next.js `<Head>` component.  

---

## **📂 Project Structure**
```
nextjs-blog/
 ├── pages/
 │   ├── index.js      # Home page
 │   ├── blog/
 │   │   ├── [slug].js # Dynamic blog page
 ├── posts/            # Markdown blog posts
 │   ├── post1.md
 │   ├── post2.md
 ├── components/
 │   ├── Layout.js     # Reusable layout
 ├── styles/           # Tailwind CSS styles
 ├── package.json
 ├── next.config.js
 ├── tailwind.config.js
```

---

## **🛠 Step 1: Setup Next.js & Tailwind CSS**  
First, create a Next.js app and set up Tailwind CSS.  

```bash
npx create-next-app@latest nextjs-blog
cd nextjs-blog
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

🔹 **Configure Tailwind in `tailwind.config.js`:**  
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

🔹 **Add Tailwind to `styles/globals.css`:**  
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## **📝 Step 2: Create Blog Posts in Markdown**  

Inside the `posts/` folder, create a file `post1.md`:
```
---
title: "My First Blog Post"
date: "2025-02-01"
---
This is my first blog post using Next.js and Markdown!
```

Create another file `post2.md`:
```
---
title: "Next.js Static Site Generation"
date: "2025-02-02"
---
Next.js supports Static Site Generation for lightning-fast blogs!
```

---

## **📜 Step 3: Parse Markdown in Next.js**  
Install **gray-matter** (for reading metadata from Markdown) and **remark** (for converting Markdown to HTML).  
```bash
npm install gray-matter remark remark-html
```

Create a helper function to fetch blog posts.  
📂 `lib/posts.js`
```js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPosts() {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    
    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date,
      content,
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
}
```

---

## **🏠 Step 4: Create the Home Page**  
📂 `pages/index.js`
```jsx
import Link from "next/link";
import { getSortedPosts } from "../lib/posts";

export default function Home({ posts }) {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold">Next.js Blog</h1>
      <p className="text-gray-600">A simple blog using Markdown & SSG.</p>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-2">
            <Link href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-400 text-sm">{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const posts = getSortedPosts();
  return {
    props: { posts },
  };
}
```

---

## **📖 Step 5: Create the Dynamic Blog Page**  
📂 `pages/blog/[slug].js`
```jsx
import { getSortedPosts } from "../../lib/posts";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default function BlogPost({ post }) {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500">{post.date}</p>
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.content }} />
      <a href="/" className="text-blue-500 hover:underline">← Back to home</a>
    </div>
  );
}

export async function getStaticPaths() {
  const posts = getSortedPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "posts", `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      post: {
        title: data.title,
        date: data.date,
        content: contentHtml,
      },
    },
  };
}
```

---

## **🎨 Step 6: Improve Styling with Tailwind CSS**  

Add global styles in `styles/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

h1 {
  @apply text-4xl font-bold;
}
p {
  @apply text-gray-700;
}
```

---

## **🚀 Step 7: Run & Test Your Blog**
Start the development server:
```bash
npm run dev
```
Open **http://localhost:3000/** and see your blog in action! 🎉  

---

## **🛠 Step 8: Deploy to Vercel**
```bash
npm install -g vercel
vercel
```

---

## **📌 Summary**
✅ Created a **Next.js blog** with **SSG**.  
✅ Used **Markdown** for blog posts.  
✅ Implemented **dynamic routing** for blogs.  
✅ Styled using **Tailwind CSS**.  
✅ Deployed on **Vercel**.  

**Next: Project 2 - Next.js E-Commerce Store with Stripe! 🛒** 🚀