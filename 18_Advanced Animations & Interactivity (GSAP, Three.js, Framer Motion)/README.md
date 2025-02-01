# **Chapter 18: Advanced Animations & Interactivity (GSAP, Three.js, Framer Motion)**  

In this chapter, we will explore how to integrate powerful animations and interactivity in a Next.js application using:  
- **GSAP (GreenSock Animation Platform)** – For complex, timeline-based animations.  
- **Framer Motion** – For React-native smooth animations.  
- **Three.js** – For 3D graphics and WebGL animations.  

---

## **18.1 Setting Up Animations in Next.js**  

### ✅ **Installing the Required Libraries**  
```bash
npm install gsap framer-motion three @react-three/fiber @react-three/drei
```
- **GSAP** – For complex timeline-based animations.  
- **Framer Motion** – React-native declarative animations.  
- **Three.js + React Three Fiber** – For 3D models and WebGL effects.  

---

## **18.2 GSAP Animations in Next.js**  

GSAP (GreenSock Animation Platform) is perfect for **scroll-based animations, timeline effects, and SVG animations**.  

### ✅ **Simple GSAP Animation in Next.js**  
📂 `components/GsapAnimation.js`
```jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GsapAnimation() {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.to(boxRef.current, { x: 200, rotation: 360, duration: 2 });
  }, []);

  return (
    <div className="flex justify-center mt-10">
      <div ref={boxRef} className="w-20 h-20 bg-blue-500"></div>
    </div>
  );
}
```
### ✅ **Triggering Animations on Scroll with GSAP**  
📂 `components/GsapScroll.js`
```jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GsapScroll() {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 100,
      duration: 1.5,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      },
    });
  }, []);

  return (
    <div ref={sectionRef} className="h-screen flex items-center justify-center bg-gray-800 text-white text-2xl">
      Scroll to see me fade in!
    </div>
  );
}
```

✅ **Now, include these components in your Next.js page!**

---

## **18.3 Framer Motion for React Animations**  

Framer Motion is great for **simple and declarative animations in React**.

### ✅ **Basic Framer Motion Animation**  
📂 `components/FramerMotion.js`
```jsx
import { motion } from "framer-motion";

export default function FramerMotion() {
  return (
    <motion.div 
      className="w-20 h-20 bg-red-500 mx-auto mt-10"
      animate={{ x: [0, 100, 0], rotate: [0, 180, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
}
```

### ✅ **Animating Page Transitions in Next.js**  
📂 `pages/_app.js`
```jsx
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence mode="wait">
      <Component {...pageProps} />
    </AnimatePresence>
  );
}

export default MyApp;
```
📂 `pages/index.js`
```jsx
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-center text-3xl mt-10">Welcome to Next.js + Framer Motion</h1>
    </motion.div>
  );
}
```
🎯 **This will animate the transition between pages!**  

---

## **18.4 Creating 3D Graphics with Three.js & React Three Fiber**  

Three.js enables **3D objects, animations, and scenes** in the browser.

### ✅ **Basic 3D Scene in Next.js**  
📂 `components/ThreeScene.js`
```jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function ThreeScene() {
  return (
    <Canvas className="h-screen">
      <ambientLight intensity={0.5} />
      <OrbitControls enableZoom={false} />
      <Sphere args={[1, 100, 100]} position={[0, 0, 0]}>
        <MeshDistortMaterial color="royalblue" attach="material" distort={0.3} />
      </Sphere>
    </Canvas>
  );
}
```

📂 `pages/index.js`
```jsx
import ThreeScene from "../components/ThreeScene";

export default function Home() {
  return (
    <div>
      <ThreeScene />
      <h1 className="text-center text-white mt-10">Next.js + Three.js</h1>
    </div>
  );
}
```
🎯 **Now you have a 3D animated sphere inside your Next.js app!**  

---

## **18.5 Combining GSAP, Framer Motion & Three.js**  

✅ **Using GSAP to Animate a 3D Object**  
Modify `ThreeScene.js`:
```jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

function AnimatedSphere() {
  const sphereRef = useRef();

  useEffect(() => {
    gsap.to(sphereRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 2, yoyo: true, repeat: -1 });
  }, []);

  return (
    <Sphere ref={sphereRef} args={[1, 100, 100]} position={[0, 0, 0]}>
      <MeshDistortMaterial color="royalblue" attach="material" distort={0.3} />
    </Sphere>
  );
}

export default function ThreeScene() {
  return (
    <Canvas className="h-screen">
      <ambientLight intensity={0.5} />
      <OrbitControls enableZoom={false} />
      <AnimatedSphere />
    </Canvas>
  );
}
```
🎯 **Now your 3D sphere scales up and down using GSAP!**  

---

## **18.6 Best Practices for Animations in Next.js**  

✅ **Use GSAP for Scroll & Timeline Animations**  
✔ Best for SVGs, advanced sequences, and scroll effects.  

✅ **Use Framer Motion for Component-Based Animations**  
✔ Best for page transitions and UI animations.  

✅ **Use Three.js for WebGL & 3D Graphics**  
✔ Best for adding 3D interactive elements.  

✅ **Optimize Performance**  
✔ Use `useRef()` instead of `useState()` for animations.  
✔ Use `motion.div` instead of normal `<div>`.  
✔ Use **lazy loading** for heavy animations.  

---