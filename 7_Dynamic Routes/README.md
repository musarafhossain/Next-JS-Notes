## **Dynamic Routes in Next.js**

Dynamic routes allow you to create pages where part of the URL is **variable** (a parameter).
This is useful for pages like product details, blog posts, user profiles, etc.

---

### **How It Works**

* You create a folder or file with its name wrapped in **square brackets** (`[param]`).
* The value in the brackets becomes a **URL parameter** available to your page.
* You can then use this parameter to fetch data or display dynamic content.

---

### **Example Structure**

```
src/
 └── app/
      └── blog/
            ├── page.tsx            // "/blog"
            └── [slug]/
                  └── page.tsx      // "/blog/:slug"
```

---

### **Browser Access**

* `localhost:3000/blog/hello-world` → Renders post with slug = `hello-world`
* `localhost:3000/blog/nextjs-tips` → Renders post with slug = `nextjs-tips`

---

### **Code Example**

**`src/app/blog/[slug]/page.tsx`**

```tsx
import React from 'react'

type paramsType = { slug: string };

const BlogPostPage = async ({ params }: { params: Promise<paramsType> }) => {
    const { slug } = await params;
    return (
        <div>Slug : {slug}</div>
    )
}

export default BlogPostPage
```

**How it works:**

* `params.slug` will contain the value from the URL.
* For `/blog/hello-world` → `params.slug` = `"hello-world"`

---

### **Another Example: User Profile**

```
src/
 └── app/
      └── user/
            └── [id]/
                  └── page.tsx     // "/user/:id"
```

**`src/app/user/[id]/page.tsx`**

```tsx
import React from "react";

type userParams = {
    id: string
}

export default async function UserPage({ params }: { params: Promise<userParams> }) {
    const { id } = await params;
    return <h1>User ID: {id}</h1>;
}
```

---

### **Quick Summary Table**

| File Path                  | Route Path Example  | Param Value     |
| -------------------------- | ------------------- | --------------- |
| `app/blog/[slug]/page.tsx` | `/blog/hello-world` | `"hello-world"` |
| `app/user/[id]/page.tsx`   | `/user/42`          | `"42"`          |