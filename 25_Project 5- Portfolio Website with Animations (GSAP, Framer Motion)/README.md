# **Project 5: Portfolio Website with Animations (GSAP, Framer Motion)**  

In this project, we'll build a **stunning portfolio website** using **Next.js**, **GSAP**, and **Framer Motion** for smooth animations and interactivity.  

✅ **Next.js for Performance & SEO**  
✅ **GSAP for Scroll & Page Animations**  
✅ **Framer Motion for Smooth UI Animations**  
✅ **Tailwind CSS for Styling**  
✅ **Fully Responsive Design**  

---

## **📂 Project Structure**
```
nextjs-portfolio/
 ├── pages/
 │   ├── index.js         # Home Page
 │   ├── about.js         # About Page
 │   ├── projects.js      # Projects Page
 │   ├── contact.js       # Contact Page
 ├── components/
 │   ├── Navbar.js        # Navigation Bar
 │   ├── Hero.js          # Hero Section with GSAP Animation
 │   ├── ProjectCard.js   # Project Cards with Framer Motion
 │   ├── Footer.js        # Footer
 ├── public/              # Images & Assets
 ├── styles/              # Tailwind CSS styles
 ├── .env.local           # Environment Variables (if needed)
 ├── package.json
 ├── next.config.js
 ├── tailwind.config.js
```

---

## **🛠 Step 1: Setup Next.js & Tailwind CSS**  
```bash
npx create-next-app@latest nextjs-portfolio
cd nextjs-portfolio
npm install tailwindcss postcss autoprefixer framer-motion gsap
npx tailwindcss init -p
```

📂 **Configure Tailwind in `tailwind.config.js`:**  
```js
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

📂 **Add Tailwind to `styles/globals.css`:**  
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## **🖥️ Step 2: Build the Layout & Navigation**  

📂 **Navbar Component (`components/Navbar.js`)**  
```jsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between">
      <h1 className="text-2xl font-bold">My Portfolio</h1>
      <div className="flex space-x-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
```

📂 **Footer Component (`components/Footer.js`)**  
```jsx
export default function Footer() {
  return (
    <footer className="p-4 bg-gray-800 text-white text-center mt-10">
      <p>&copy; 2025 My Portfolio. All rights reserved.</p>
    </footer>
  );
}
```

---

## **🚀 Step 3: Hero Section with GSAP Animation**  

📂 **Hero Section (`components/Hero.js`)**  
```jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, { opacity: 0, y: -50, duration: 1 });
    gsap.from(descRef.current, { opacity: 0, x: -50, duration: 1, delay: 0.5 });
  }, []);

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center">
      <h1 ref={titleRef} className="text-5xl font-bold">Welcome to My Portfolio</h1>
      <p ref={descRef} className="text-xl mt-4 text-gray-500">Building beautiful web experiences</p>
    </section>
  );
}
```

📂 **Home Page (`pages/index.js`)**  
```jsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
```

---

## **📸 Step 4: Projects Section with Framer Motion**  

📂 **Project Card Component (`components/ProjectCard.js`)**  
```jsx
import { motion } from "framer-motion";

export default function ProjectCard({ title, description, image }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-4 bg-gray-800 text-white rounded-lg shadow-lg"
    >
      <img src={image} alt={title} className="rounded-lg mb-4" />
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}
```

📂 **Projects Page (`pages/projects.js`)**  
```jsx
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";

export default function Projects() {
  const projects = [
    { title: "Next.js Blog", description: "A markdown-based blog", image: "/blog.jpg" },
    { title: "E-Commerce App", description: "A full-stack store with payments", image: "/store.jpg" },
  ];

  return (
    <div>
      <Navbar />
      <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj, index) => (
          <ProjectCard key={index} {...proj} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
```

---

## **📩 Step 5: Contact Page with Animated Form**  

📂 **Contact Page (`pages/contact.js`)**  
```jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-10 max-w-md mx-auto bg-gray-800 text-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
        <input type="text" placeholder="Your Name" className="w-full p-2 mb-4 rounded" />
        <input type="email" placeholder="Your Email" className="w-full p-2 mb-4 rounded" />
        <textarea placeholder="Your Message" className="w-full p-2 mb-4 rounded"></textarea>
        <button className="bg-blue-500 px-4 py-2 rounded">Send</button>
      </motion.div>
      <Footer />
    </div>
  );
}
```

---

## **🚀 Step 6: Deploy to Vercel**  
```bash
vercel
```

---

## **📌 Summary**
✅ Created a **Next.js portfolio website**.  
✅ Used **GSAP** for **scroll & text animations**.  
✅ Used **Framer Motion** for **interactive elements**.  
✅ Implemented **responsive design** with **Tailwind CSS**.  
✅ Built **pages for home, projects, and contact**.  
✅ Deployed on **Vercel**.  

---

### 🎯 **The End 📊** 🚀