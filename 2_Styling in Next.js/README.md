## **Chapter 2: Styling in Next.js**  
Next.js provides multiple ways to style your applications. In this chapter, we will explore:  

1. **CSS Modules** – Scoped styles for components  
2. **Global CSS** – Application-wide styles  
3. **SASS/SCSS** – Advanced styling features  
4. **Styled Components** – CSS-in-JS approach  
5. **Tailwind CSS** – Utility-first framework for styling  

---

### **2.1 Using Global CSS in Next.js**
Next.js allows global styles using standard CSS files.  
✅ **Global styles must be imported inside `_app.js`** because Next.js doesn’t allow global CSS imports in individual components.

#### **Steps to Add Global CSS:**
1. Create a `styles` folder inside your project.  
2. Inside `styles`, create a `globals.css` file.  
3. Add some CSS styles:

   ```css
   /* styles/globals.css */
   body {
     font-family: Arial, sans-serif;
     background-color: #f5f5f5;
     color: #333;
     margin: 0;
     padding: 0;
   }
   ```

4. Import this file in `_app.js`:

   ```jsx
   // pages/_app.js
   import '../styles/globals.css';

   function MyApp({ Component, pageProps }) {
     return <Component {...pageProps} />;
   }

   export default MyApp;
   ```

✅ **Now, your entire application will use this global styling.**

---

### **2.2 Using CSS Modules (Scoped Styles)**
CSS Modules allow you to **scope styles per component**, avoiding class name conflicts.

#### **Steps to Use CSS Modules:**
1. Create a CSS file ending in `.module.css` inside `styles/` (e.g., `home.module.css`).
2. Define styles:

   ```css
   /* styles/home.module.css */
   .container {
     background-color: white;
     padding: 20px;
     border-radius: 10px;
     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
   }
   ```

3. Import and use the styles in a component:

   ```jsx
   // pages/index.js
   import styles from '../styles/home.module.css';

   export default function Home() {
     return (
       <div className={styles.container}>
         <h1>Welcome to Next.js</h1>
         <p>This is styled using CSS Modules.</p>
       </div>
     );
   }
   ```

✅ **CSS Modules ensure that styles are scoped and won't affect other components.**

---

### **2.3 Using SASS/SCSS for Advanced Styling**
SASS extends CSS with **variables, mixins, nesting**, and other powerful features.

#### **Install SASS in Next.js:**
```bash
npm install sass
```

#### **Create an SCSS file:**
```scss
/* styles/global.scss */
$primary-color: #0070f3;

body {
  background: $primary-color;
  color: white;
}
```

#### **Import SCSS in `_app.js`:**
```jsx
import '../styles/global.scss';
```

✅ **Now, your application supports SASS/SCSS with features like nesting and variables.**

---

### **2.4 Using Styled Components (CSS-in-JS)**
Styled Components allow you to write CSS directly inside JavaScript.

#### **Install Styled Components:**
```bash
npm install styled-components
```

#### **Create a Styled Component:**
```jsx
// components/Button.js
import styled from 'styled-components';

const Button = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export default function MyButton() {
  return <Button>Click Me</Button>;
}
```

✅ **Now, you can use `<MyButton />` anywhere in your app.**

---

### **2.5 Using Tailwind CSS in Next.js**
Tailwind CSS is a **utility-first CSS framework** that allows rapid styling without writing custom CSS.

#### **Install Tailwind CSS:**
```bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### **Configure Tailwind:**
Edit `tailwind.config.js` to enable Next.js support:
```js
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### **Import Tailwind into `_app.js`:**
```jsx
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
```

#### **Use Tailwind Classes:**
```jsx
export default function Home() {
  return (
    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold">Hello, Next.js with Tailwind!</h1>
    </div>
  );
}
```

✅ **Now, your Next.js project has Tailwind for fast and responsive styling!**

---

### **📌 Chapter Summary**
| Styling Method | Advantages | Use Case |
|---------------|------------|----------|
| **Global CSS** | Simple, global styles | General styles like fonts, backgrounds |
| **CSS Modules** | Scoped styles, avoids conflicts | Component-specific styles |
| **SASS/SCSS** | Advanced features, variables, nesting | Large applications |
| **Styled Components** | Dynamic styling, scoped styles | Custom UI components |
| **Tailwind CSS** | Utility-first, no need for custom CSS | Rapid development, responsive designs |

---

### **🔥 Next Steps (Chapter 3: Pages & Routing)**
Now that you know how to style a Next.js app, the next step is **understanding Pages & Routing** (Static & Dynamic Routing, API Routes).  

Would you like to move on to **Chapter 3**? 🚀