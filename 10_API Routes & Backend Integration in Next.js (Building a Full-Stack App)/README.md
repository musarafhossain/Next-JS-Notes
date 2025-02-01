
# **Chapter 10: API Routes & Backend Integration in Next.js (Building a Full-Stack App)**  

In this chapter, we will cover:  
1. **Understanding API Routes in Next.js**  
2. **Creating RESTful API Endpoints**  
3. **Connecting Next.js to a Database (MongoDB with Mongoose)**  
4. **CRUD Operations (Create, Read, Update, Delete) – Backend**  
5. **Building a Full-Stack CRUD App – Frontend**  
6. **Using External APIs in Next.js**  

---

## **10.1 Understanding API Routes in Next.js**  
📌 **Next.js API routes allow you to create backend endpoints inside your project.**  
✅ **Why use API routes?**  
✔ No need for a separate backend server  
✔ Fully integrated with Next.js  
✔ Can handle authentication, database queries, and more  

✅ **Example API Route**  
📂 `pages/api/hello.js`
```jsx
export default function handler(req, res) {
  res.status(200).json({ message: "Hello, Next.js API!" });
}
```
✅ **How it works:**  
- When you visit `http://localhost:3000/api/hello`, it returns:  
  ```json
  { "message": "Hello, Next.js API!" }
  ```

---

## **10.2 Creating RESTful API Endpoints**  
📌 **We can handle different request types (GET, POST, PUT, DELETE) inside API routes.**  

✅ **Example: Handling Multiple HTTP Methods**  
📂 `pages/api/users.js`
```jsx
let users = [{ id: 1, name: "John Doe" }];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const { name } = req.body;
    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```
✅ **How it works:**  
- **GET `/api/users`** → Returns all users  
- **POST `/api/users`** → Adds a new user  

---

## **10.3 Connecting Next.js to a Database (MongoDB with Mongoose)**  

### **Step 1: Install Dependencies**  
```bash
npm install mongoose dotenv
```

### **Step 2: Configure MongoDB Connection**  
📂 `lib/mongodb.js`
```jsx
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

let cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
```

---

## **10.4 CRUD Operations (Create, Read, Update, Delete) – Backend**  

📌 **Create API routes for CRUD operations with MongoDB.**  

### **Step 1: Create a User Model**  
📂 `models/User.js`
```jsx
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
```

### **Step 2: CRUD API Routes**
📂 `pages/api/users.js`
```jsx
import connectDB from "../../lib/mongodb";
import User from "../../models/User";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const users = await User.find();
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });
    return res.status(201).json(newUser);
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
```

---

## **10.5 Building a Full-Stack CRUD App – Frontend**  

📌 **Create a simple UI to manage users (Create, Read, Update, Delete).**  

### **Step 1: Install Axios for API Calls**  
```bash
npm install axios
```

### **Step 2: Create the Frontend UI**  
📂 `pages/index.js`
```jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("/api/users");
    setUsers(res.data);
  };

  const addUser = async () => {
    if (editingUser) {
      await axios.put(`/api/users/${editingUser._id}`, { name, email });
      setEditingUser(null);
    } else {
      await axios.post("/api/users", { name, email });
    }
    setName("");
    setEmail("");
    fetchUsers();
  };

  const editUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditingUser(user);
  };

  const deleteUser = async (id) => {
    await axios.delete(`/api/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={addUser}>{editingUser ? "Update" : "Add"} User</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => editUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

✅ **Features:**  
✔ Fetches users from the database  
✔ Adds a new user  
✔ Updates user details  
✔ Deletes a user  

---

## **10.6 Using External APIs in Next.js**  
📌 **Next.js can fetch data from external APIs using `fetch()` or `axios`.**  

✅ **Example: Fetching Data from an API**  
📂 `pages/external.js`
```jsx
export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return { props: { posts } };
}

export default function ExternalAPI({ posts }) {
  return (
    <div>
      <h1>External API Data</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```