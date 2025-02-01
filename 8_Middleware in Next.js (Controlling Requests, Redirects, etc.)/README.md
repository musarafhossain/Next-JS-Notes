# **Chapter 8: Middleware in Next.js (Controlling Requests, Redirects, etc.)**  

In this chapter, we will cover:  
1. **What is Middleware in Next.js?**  
2. **How Middleware Works**  
3. **Using Middleware for Redirects & Rewrites**  
4. **Protecting Routes with Middleware**  
5. **Handling API Authentication with Middleware**  
6. **Performance Considerations & Best Practices**  

---

## **8.1 What is Middleware in Next.js?**  
📌 **Middleware in Next.js allows us to run code before a request is completed.**  
- It helps **modify requests and responses** dynamically.  
- Can be used for **authentication, redirects, rate limiting, logging, etc.**  

✅ **Why use Middleware?**  
✔ Modify requests before they hit an API or page  
✔ Redirect users based on conditions  
✔ Restrict access to specific pages  
✔ Optimize page loading by controlling responses  

---

## **8.2 How Middleware Works**  
📌 **Middleware runs before a request is processed by Next.js.**  
- It can be added inside the `middleware.js` file in the root directory.  
- Uses the `NextRequest` and `NextResponse` objects.  

✅ **Basic Example:** Redirecting All Users to `/home`  
📂 `middleware.js`  
```jsx
import { NextResponse } from "next/server";

export function middleware(req) {
  return NextResponse.redirect(new URL("/home", req.url));
}
```
✅ **How it works:**  
- Every request is intercepted.  
- The user is **redirected** to `/home`.  

---

## **8.3 Using Middleware for Redirects & Rewrites**  
📌 **Middleware can change request paths dynamically.**  

✅ **Example: Redirect Users Based on Authentication**  
📂 `middleware.js`  
```jsx
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("auth-token");

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
```
✅ **How it works:**  
- If a user **tries to access `/dashboard` without authentication**, they are redirected to `/login`.  
- Other requests **continue as normal**.  

✅ **Example: Rewriting Requests Dynamically**  
📌 **Rewrites change URLs without changing the user-visible path.**  
📂 `middleware.js`  
```jsx
import { NextResponse } from "next/server";

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/old-blog")) {
    return NextResponse.rewrite(new URL("/new-blog", req.url));
  }

  return NextResponse.next();
}
```
✅ **How it works:**  
- Requests to `/old-blog` will be **rewritten to `/new-blog`** without changing the browser URL.  

---

## **8.4 Protecting Routes with Middleware**  
📌 **Middleware can restrict access to certain pages based on user roles.**  

✅ **Example: Restricting Admin Pages**  
📂 `middleware.js`  
```jsx
import { NextResponse } from "next/server";

export function middleware(req) {
  const userRole = req.cookies.get("role");

  if (req.nextUrl.pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}
```
✅ **How it works:**  
- If a **non-admin** user tries to access `/admin`, they are redirected to `/unauthorized`.  

📌 **Best For:**  
✔ Admin dashboards  
✔ Premium content access  

---

## **8.5 Handling API Authentication with Middleware**  
📌 **Middleware can secure API routes.**  

✅ **Example: Protecting API Endpoints**  
📂 `middleware.js`  
```jsx
import { NextResponse } from "next/server";

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/api/protected")) {
    const token = req.headers.get("authorization");
    
    if (!token || token !== "Bearer my-secret-token") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}
```
✅ **How it works:**  
- If a request **lacks a valid token**, it returns a `401 Unauthorized` response.  

📌 **Best For:**  
✔ Secure APIs  
✔ Preventing unauthorized access  

---

## **8.6 Performance Considerations & Best Practices**  
✅ **Use Middleware Only When Necessary** → Avoid overloading requests.  
✅ **Leverage Edge Middleware** → Runs closer to users for faster responses.  
✅ **Minimize Heavy Computations** → Middleware should be lightweight.  
✅ **Test Middleware Thoroughly** → Incorrect logic can break routing.  

