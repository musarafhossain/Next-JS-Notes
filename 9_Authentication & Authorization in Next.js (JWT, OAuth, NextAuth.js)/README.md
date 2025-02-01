# **Chapter 9: Authentication & Authorization in Next.js (JWT, OAuth, NextAuth.js)**  

In this chapter, we will cover:  
1. **Understanding Authentication vs. Authorization**  
2. **Implementing JWT Authentication**  
3. **Using OAuth for Third-Party Login**  
4. **Setting Up NextAuth.js for Authentication**  
5. **Role-Based Authorization in Next.js**  
6. **Best Practices for Secure Authentication**  

---

## **9.1 Understanding Authentication vs. Authorization**  
📌 **Authentication** → Verifies **who** the user is (Login process).  
📌 **Authorization** → Determines **what** a user can access (Role-based access).  

✅ **Example:**  
- **Authentication:** Logging in with email & password.  
- **Authorization:** Only "admin" users can access the dashboard.  

---

## **9.2 Implementing JWT Authentication (JSON Web Token)**  
📌 **JWT (JSON Web Token)** is a stateless authentication method using signed tokens.  
✅ **Why JWT?**  
✔ Secure & scalable authentication method  
✔ No need to store sessions on the server  

### **Step 1: Install Dependencies**  
Run the following command:  
```bash
npm install jsonwebtoken bcryptjs
```

### **Step 2: Create API Route for Login (`/api/auth/login.js`)**  
📂 `pages/api/auth/login.js`
```jsx
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const users = [
  { id: 1, email: "user@example.com", password: "$2a$10$hashedpassword", role: "user" }, // Use hashed passwords in production
];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
}
```
✅ **How it works:**  
- Finds the user from the database.  
- **Checks password using bcrypt.**  
- Generates a **JWT token** valid for 1 hour.  

### **Step 3: Protect API Routes with JWT (`/api/protected.js`)**  
📂 `pages/api/protected.js`
```jsx
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Protected data", user: decoded });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
```
✅ **How it works:**  
- Extracts JWT token from `Authorization` header.  
- **Verifies the token** and allows access if valid.  

---

## **9.3 Using OAuth for Third-Party Login**  
📌 **OAuth allows users to log in with Google, GitHub, Facebook, etc.**  
✅ **Why use OAuth?**  
✔ No need to store user passwords  
✔ Secure and widely adopted  

### **Step 1: Create a Google OAuth App**  
1. Go to **Google Developer Console** → Create a new project.  
2. Enable **OAuth consent screen** & get **Client ID & Client Secret**.  

### **Step 2: Install `next-auth`**  
```bash
npm install next-auth
```

### **Step 3: Configure NextAuth.js (`/api/auth/[...nextauth].js`)**  
📂 `pages/api/auth/[...nextauth].js`
```jsx
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
});
```
✅ **How it works:**  
- Uses **Google as an authentication provider**.  
- Stores user session in a secure way.  

### **Step 4: Add Login & Logout Buttons**  
📂 `components/Login.js`
```jsx
import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div>
          <p>Welcome, {session.user.name}!</p>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      ) : (
        <button onClick={() => signIn("google")}>Login with Google</button>
      )}
    </div>
  );
}
```
✅ **How it works:**  
- **Logs in with Google**.  
- Displays the user name when logged in.  
- Allows users to **log out**.  

---

## **9.4 Role-Based Authorization in Next.js**  
📌 **Restrict pages based on user roles (Admin, User, etc.).**  

### **Step 1: Create Protected Route Middleware**  
📂 `middleware.js`
```jsx
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("next-auth.session-token");

  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
```
✅ **How it works:**  
- **Checks if the user has a valid session token** before accessing `/admin`.  

### **Step 2: Protect Pages Using `useSession`**  
📂 `pages/admin.js`
```jsx
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();

  if (!session) return <p>Access Denied</p>;

  return <h1>Welcome Admin!</h1>;
}
```
✅ **How it works:**  
- If a user is **not logged in**, they **can't access** the page.  

📌 **Best For:**  
✔ Admin dashboards  
✔ Premium content  

---

## **9.5 Best Practices for Secure Authentication**  
✅ **Always hash passwords** before storing in the database.  
✅ **Use HTTPS** to prevent man-in-the-middle attacks.  
✅ **Keep JWT expiration short** (e.g., 1 hour).  
✅ **Store sensitive keys in `.env` files**.  
✅ **Use NextAuth.js for built-in security** if possible.  
