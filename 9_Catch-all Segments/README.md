## **Catch-all and Optional Catch-all Segments in Next.js**

When you have **a lot of nested dynamic routes** (like multiple features and concepts), creating a separate file for each combination is inefficient.
Instead, **catch-all segments** let you handle an **unlimited number of nested parameters** with **one file**.

---

### **Catch-all Segment Syntax**

* Use `[...paramName]` in your folder name or file name.
* This will **capture all path segments** after the specified point in the URL.

---

### **Example Folder Structure**

```
src/
 └── app/
      └── docs/
            └── [featureId]/
                  └── [conceptId]/
                        └── page.tsx
```

✅ Handles:

```
/docs/feature1/concept1
/docs/feature2/concept1
/docs/feature2/concept2
...
```

---

### **Example with Third Level (exampleId)**

If you want to allow a **third level** like:

```
/docs/feature1/concept1/exampleA
```

You can use a **catch-all segment**:

**Folder Structure**

```
src/
 └── app/
      └── docs/
            └── [...slug]/
                  └── page.tsx
```

---

### **Code Example**

**`src/app/docs/[...slug]/page.tsx`**

```tsx
import React from 'react';

type ParamsType = { slug: string[] };

const DocsPage = async ({ params }: { params: Promise<ParamsType> }) => {
  const { slug } = await params;

  return (
    <div>
      <h1>Docs Page</h1>
      <p>Slug Array: {slug.join(' / ')}</p>
      {slug.length >= 1 && <p>Feature ID: {slug[0]}</p>}
      {slug.length >= 2 && <p>Concept ID: {slug[1]}</p>}
      {slug.length >= 3 && <p>Example ID: {slug[2]}</p>}
    </div>
  );
};

export default DocsPage;
```

---

### **How It Works**

* URL `/docs/feature1/concept1` → `slug = ["feature1", "concept1"]`
* URL `/docs/feature2/concept2` → `slug = ["feature2", "concept2"]`
* URL `/docs/feature1/concept1/exampleA` → `slug = ["feature1", "concept1", "exampleA"]`

---

### **Optional Catch-all Segment**

* Syntax: `[[...slug]]`
* This makes the parameter optional (works even if it’s missing).
* Useful if you want `/docs` to work without error.

---

### **Key Benefits**

* One file handles **hundreds or thousands** of route combinations.
* Great for hierarchical structures like:

  * `/category/subcategory/item`
  * `/country/state/city`
  * `/feature/concept/example`
* Still SEO-friendly because each path is a unique page.