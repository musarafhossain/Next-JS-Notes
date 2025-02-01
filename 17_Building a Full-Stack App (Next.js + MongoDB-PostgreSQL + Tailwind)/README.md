# **Chapter 17: Building a Full-Stack App (Next.js + MongoDB/PostgreSQL + Tailwind)**  

In this chapter, we will build a full-stack **CRUD (Create, Read, Update, Delete) application** using:  
- **Frontend:** Next.js + Tailwind CSS  
- **Backend:** Next.js API Routes  
- **Database:** MongoDB (using Mongoose) or PostgreSQL (using Prisma)  

---

## **17.1 Project Overview**  

We will build a **Task Management App**, where users can:  
✅ Add tasks  
✅ View tasks  
✅ Update tasks  
✅ Delete tasks  

🔹 **Tech Stack:**  
- **Frontend:** Next.js (React) + Tailwind CSS  
- **Backend:** Next.js API Routes  
- **Database:** MongoDB (Mongoose) or PostgreSQL (Prisma)  

---

## **17.2 Setting Up Next.js & Tailwind CSS**  

### ✅ **Step 1: Create a Next.js App**  
```bash
npx create-next-app@latest next-fullstack-app
cd next-fullstack-app
```
### ✅ **Step 2: Install Tailwind CSS**  
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
### ✅ **Step 3: Configure Tailwind**  
📂 `tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```
📂 `styles/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
✅ **Run the App:**  
```bash
npm run dev
```
Your **Next.js + Tailwind setup** is now complete! 🎉  

---

## **17.3 Connecting Next.js with a Database**  

### **Option 1: MongoDB + Mongoose**  
✅ **Install Mongoose:**  
```bash
npm install mongoose
```
✅ **Create a MongoDB Database on MongoDB Atlas**  
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)  
2. Create a cluster & database  
3. Get the connection string  

✅ **Create a Mongoose Connection**  
📂 `lib/mongodb.js`
```js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(mongoose => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
```
✅ **Set up `.env.local`**  
```bash
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/myDatabase?retryWrites=true&w=majority
```

---

### **Option 2: PostgreSQL + Prisma**  
✅ **Install Prisma & PostgreSQL Client:**  
```bash
npm install prisma @prisma/client
npx prisma init
```
✅ **Configure PostgreSQL in `.env`**  
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
```
✅ **Define Prisma Schema**  
📂 `prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Task {
  id        String   @id @default(uuid())
  title     String
  completed Boolean  @default(false)
}
```
✅ **Run Prisma Migrations:**  
```bash
npx prisma migrate dev --name init
```
✅ **Create Prisma Client**  
📂 `lib/prisma.js`
```js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default prisma;
```

---

## **17.4 Creating Next.js API Routes**  

✅ **Create Task Model (For MongoDB Users)**  
📂 `models/Task.js`
```js
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
```
✅ **Create API Routes**  
📂 `pages/api/tasks/index.js`
```js
import { connectDB } from "../../../lib/mongodb";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  await connectDB();
  if (req.method === "GET") {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } else if (req.method === "POST") {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  }
}
```
📂 `pages/api/tasks/[id].js`
```js
import { connectDB } from "../../../lib/mongodb";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === "PUT") {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } else if (req.method === "DELETE") {
    await Task.findByIdAndDelete(id);
    res.status(204).end();
  }
}
```

---

## **17.5 Creating the Frontend (CRUD UI)**  

✅ **Task Component**  
📂 `components/Task.js`
```jsx
export default function Task({ task, onDelete, onToggle }) {
  return (
    <div className="flex justify-between p-4 bg-gray-200 rounded">
      <span className={task.completed ? "line-through" : ""}>{task.title}</span>
      <div>
        <button onClick={() => onToggle(task._id)} className="bg-green-500 text-white px-2">✓</button>
        <button onClick={() => onDelete(task._id)} className="bg-red-500 text-white px-2 ml-2">✗</button>
      </div>
    </div>
  );
}
```
✅ **Task List Component**  
📂 `pages/index.js`
```jsx
import { useState, useEffect } from "react";
import Task from "../components/Task";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = async () => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask, completed: false }),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
    setNewTask("");
  };

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <input value={newTask} onChange={e => setNewTask(e.target.value)} className="border p-2 w-full" />
      <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 mt-2">Add Task</button>
      {tasks.map(task => (
        <Task key={task._id} task={task} onDelete={deleteTask} />
      ))}
    </div>
  );
}
```

🎯 **Congratulations! You’ve built a full-stack Next.js CRUD app!** 🚀