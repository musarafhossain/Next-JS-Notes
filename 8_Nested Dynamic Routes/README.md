## **Nested Dynamic Routes in Next.js**

**Nested Dynamic Routes** allow you to have **multiple dynamic segments** inside your URL path.
This is useful for resources that have a **parent-child relationship**, such as:

* Product → Review
* Blog Post → Comment
* Course → Lesson

---

### **How It Works**

* Each folder in the `app/` directory represents a **segment** of the URL.
* To make a segment dynamic, wrap it in square brackets `[ ]`.
* You can combine **multiple dynamic segments** by nesting them.

---

### **Example Structure**

```
src/
 └── app/
      └── products/
            └── [productId]/
                  └── reviews/
                        └── [reviewId]/
                              └── page.tsx   // "/products/:productId/reviews/:reviewId"
```

---

### **Code Example**

**`src/app/products/[productId]/reviews/[reviewId]/page.tsx`**

```tsx
import React from 'react';

type ParamsType = { productId: string; reviewId: string };

const ReviewPage = async ({ params }: { params: Promise<ParamsType> }) => {
  const { productId, reviewId } = await params;

  return (
    <div>
      <h1>Product ID: {productId}</h1>
      <h2>Review ID: {reviewId}</h2>
    </div>
  );
};

export default ReviewPage;
```

---

### **Browser Access**

* `/products/123/reviews/456`

  * `productId` = `"123"`
  * `reviewId` = `"456"`
* `/products/shoes/reviews/987`

  * `productId` = `"shoes"`
  * `reviewId` = `"987"`

---

### **Key Points**

* **Dynamic segments** can be nested infinitely.
* Each dynamic parameter is available via the **`params`** prop.
* This approach is **SEO-friendly** because each unique parameter combination gets its own page.
* Using **`async` with params** lets you fetch relevant data **server-side** before rendering.

---

### **Quick Summary Table**

| File Path                                              | Route Path Example            |
| ------------------------------------------------------ | ----------------------------- |
| `app/products/[productId]/reviews/[reviewId]/page.tsx` | `/products/123/reviews/456`   |
| `app/products/[productId]/reviews/[reviewId]/page.tsx` | `/products/shoes/reviews/987` |