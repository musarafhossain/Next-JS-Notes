# **Project 2: E-Commerce App (Payments, Auth, Backend API)**  

In this project, we'll build a **modern e-commerce application** using **Next.js** with:  
✅ **Authentication** (NextAuth.js)  
✅ **Payments** (Stripe)  
✅ **Backend API** (Next.js API routes)  
✅ **MongoDB Database** (for storing products & orders)  
✅ **Tailwind CSS** (for styling)  

---

## **📂 Project Structure**
```
nextjs-ecommerce/
 ├── pages/
 │   ├── index.js         # Home page
 │   ├── product/[id].js  # Product details
 │   ├── cart.js          # Shopping cart
 │   ├── checkout.js      # Checkout page
 │   ├── api/
 │   │   ├── products.js  # API to fetch products
 │   │   ├── auth/        # NextAuth.js authentication
 │   │   ├── stripe.js    # Stripe payment
 ├── components/
 │   ├── Navbar.js        # Navigation bar
 │   ├── ProductCard.js   # Display products
 ├── lib/
 │   ├── db.js            # MongoDB connection
 ├── models/
 │   ├── Product.js       # Product model
 ├── styles/              # Tailwind CSS styles
 ├── .env.local           # Environment variables
 ├── package.json
 ├── next.config.js
 ├── tailwind.config.js
```

---

## **🛠 Step 1: Setup Next.js & Tailwind CSS**  
```bash
npx create-next-app@latest nextjs-ecommerce
cd nextjs-ecommerce
npm install tailwindcss postcss autoprefixer
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

## **🛍 Step 2: Setup MongoDB & Mongoose**  
Install MongoDB dependencies:  
```bash
npm install mongoose dotenv
```

📂 **Connect to MongoDB in `lib/db.js`:**  
```js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}
```

📂 **Define Product Model in `models/Product.js`:**  
```js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
```

---

## **🛒 Step 3: Create API for Products**  
📂 **API Route in `pages/api/products.js`:**  
```js
import { connectDB } from "../../lib/db";
import Product from "../../models/Product";

export default async function handler(req, res) {
  await connectDB();
  if (req.method === "GET") {
    const products = await Product.find();
    return res.json(products);
  }
}
```

---

## **🏠 Step 4: Display Products on Home Page**  
📂 **`pages/index.js`**  
```jsx
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold">E-Commerce Store</h1>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

📂 **Reusable Product Component `components/ProductCard.js`:**  
```jsx
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-500">${product.price}</p>
      <Link href={`/product/${product._id}`}>
        <button className="bg-blue-500 text-white p-2 rounded mt-2 w-full">View</button>
      </Link>
    </div>
  );
}
```

---

## **🛍 Step 5: Implement Shopping Cart**  
📂 **Cart Page in `pages/cart.js`:**  
```jsx
import { useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="flex justify-between p-2 border-b">
            <span>{item.name}</span>
            <span>${item.price}</span>
          </div>
        ))
      )}
    </div>
  );
}
```

---

## **💳 Step 6: Integrate Stripe Payments**  
Install Stripe:  
```bash
npm install stripe
```

📂 **Stripe Checkout API in `pages/api/stripe.js`:**  
```js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { items } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    })),
    mode: "payment",
    success_url: `${req.headers.origin}/success`,
    cancel_url: `${req.headers.origin}/cancel`,
  });

  res.json({ id: session.id });
}
```

📂 **Checkout Button in `pages/checkout.js`:**  
```jsx
export default function Checkout({ cart }) {
  async function handleCheckout() {
    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });
    const { id } = await res.json();
    window.location.href = `https://checkout.stripe.com/pay/${id}`;
  }

  return (
    <button onClick={handleCheckout} className="bg-green-500 text-white p-2 rounded">
      Checkout
    </button>
  );
}
```

---

## **🔐 Step 7: Add Authentication with NextAuth.js**  
Install NextAuth.js:  
```bash
npm install next-auth
```

📂 **API Route in `pages/api/auth/[...nextauth].js`:**  
```js
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
```

---

## **🚀 Step 8: Deploy to Vercel**  
```bash
vercel
```

---

## **📌 Summary**  
✅ Built an **E-Commerce Store** with **Next.js**.  
✅ Implemented **Authentication (NextAuth.js)**.  
✅ Created **Product API (MongoDB)**.  
✅ Integrated **Stripe Payments**.  
✅ Deployed the app to **Vercel**.  

**Next: Project 3 - Next.js Dashboard with Charts & Analytics! 📊** 🚀