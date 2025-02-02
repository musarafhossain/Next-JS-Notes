# **Project 4: Real-time Chat App (Next.js + Firebase)**  

In this project, we'll build a **real-time chat application** using **Next.js** and **Firebase**.  

✅ **Firebase Authentication** (Google Sign-In)  
✅ **Firestore Database** (for real-time chat)  
✅ **Next.js API Routes** (for handling user authentication)  
✅ **React Hooks** (`useState`, `useEffect`)  
✅ **Tailwind CSS** (for styling)  

---

## **📂 Project Structure**
```
nextjs-chat-app/
 ├── pages/
 │   ├── index.js         # Chat UI
 │   ├── api/
 │   │   ├── auth.js      # API route for authentication
 ├── components/
 │   ├── ChatMessage.js   # Chat bubble component
 │   ├── Navbar.js        # Navigation bar with login/logout
 ├── lib/
 │   ├── firebase.js      # Firebase configuration
 ├── styles/              # Tailwind CSS styles
 ├── .env.local           # Environment variables
 ├── package.json
 ├── next.config.js
 ├── tailwind.config.js
```

---

## **🛠 Step 1: Setup Next.js & Tailwind CSS**  
```bash
npx create-next-app@latest nextjs-chat-app
cd nextjs-chat-app
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

## **🔥 Step 2: Setup Firebase**  

1️⃣ Go to **[Firebase Console](https://console.firebase.google.com/)**  
2️⃣ Create a new project.  
3️⃣ Enable **Firestore Database**.  
4️⃣ Enable **Authentication** (Google Sign-In).  
5️⃣ Get Firebase Config and add it to `.env.local`.  

Install Firebase SDK:  
```bash
npm install firebase
```

📂 **Firebase Configuration (`lib/firebase.js`):**  
```js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, signInWithPopup, signOut, db, collection, addDoc, query, orderBy, onSnapshot };
```

📂 **Add Firebase Config to `.env.local`:**  
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## **🔐 Step 3: Implement Google Authentication**  

📂 **Navbar Component (`components/Navbar.js`)**  
```jsx
import { auth, provider, signInWithPopup, signOut } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);

  async function handleSignIn() {
    await signInWithPopup(auth, provider);
  }

  async function handleSignOut() {
    await signOut(auth);
  }

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl font-bold">💬 Chat App</h1>
      {user ? (
        <div className="flex items-center gap-2">
          <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full" />
          <button onClick={handleSignOut} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={handleSignIn} className="bg-blue-500 px-3 py-1 rounded">
          Login with Google
        </button>
      )}
    </nav>
  );
}
```

---

## **💬 Step 4: Build the Chat UI**  

📂 **Chat Page (`pages/index.js`)**  
```jsx
import { useState, useEffect } from "react";
import { auth, db, collection, addDoc, query, orderBy, onSnapshot } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatMessage from "../components/ChatMessage";
import Navbar from "../components/Navbar";

export default function Home() {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  async function sendMessage() {
    if (!input.trim() || !user) return;

    await addDoc(collection(db, "messages"), {
      text: input,
      uid: user.uid,
      photoURL: user.photoURL,
      timestamp: new Date(),
    });

    setInput("");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Navbar />
      <div className="h-80 overflow-y-auto p-4 border rounded mt-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>
      {user && (
        <div className="mt-4 flex">
          <input
            type="text"
            className="border p-2 flex-grow rounded"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} className="ml-2 bg-green-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </div>
      )}
    </div>
  );
}
```

📂 **Chat Message Component (`components/ChatMessage.js`)**  
```jsx
export default function ChatMessage({ message }) {
  return (
    <div className={`p-2 my-2 flex ${message.uid === auth.currentUser?.uid ? "justify-end" : "justify-start"}`}>
      <div className="bg-gray-200 p-2 rounded flex items-center gap-2">
        <img src={message.photoURL} alt="Avatar" className="w-6 h-6 rounded-full" />
        <p>{message.text}</p>
      </div>
    </div>
  );
}
```

---

## **🚀 Step 5: Deploy to Vercel**  
```bash
vercel
```

---

## **📌 Summary**
✅ Built a **real-time chat app** using **Next.js** and **Firebase**.  
✅ Implemented **Google Authentication**.  
✅ Stored messages in **Firestore Database**.  
✅ Used **React Hooks** for state management.  
✅ Styled with **Tailwind CSS**.  
✅ Deployed on **Vercel**.  

---