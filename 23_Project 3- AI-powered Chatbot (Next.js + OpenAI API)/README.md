# **Project 3: AI-powered Chatbot (Next.js + OpenAI API)**  

In this project, we'll build an **AI-powered chatbot** using **Next.js** and **OpenAI's GPT API**. The chatbot will be able to generate responses based on user queries.  

✅ **Next.js API Routes** (for handling OpenAI API requests)  
✅ **React Hooks** (`useState`, `useEffect`)  
✅ **Tailwind CSS** (for UI styling)  
✅ **OpenAI API** (GPT-4 for chatbot responses)  

---

## **📂 Project Structure**
```
nextjs-chatbot/
 ├── pages/
 │   ├── index.js         # Chat UI
 │   ├── api/
 │   │   ├── chat.js      # API route for OpenAI requests
 ├── components/
 │   ├── ChatMessage.js   # Chat bubble component
 ├── styles/              # Tailwind CSS styles
 ├── .env.local           # Environment variables
 ├── package.json
 ├── next.config.js
 ├── tailwind.config.js
```

---

## **🛠 Step 1: Setup Next.js & Tailwind CSS**  
```bash
npx create-next-app@latest nextjs-chatbot
cd nextjs-chatbot
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

## **💡 Step 2: Setup OpenAI API in Next.js**
Install OpenAI SDK:  
```bash
npm install openai
```

📂 **Create API Route `pages/api/chat.js`:**  
```js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Store in .env.local
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { message } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });

    res.status(200).json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch response from OpenAI" });
  }
}
```

🔑 **Add OpenAI API Key in `.env.local`:**  
```
OPENAI_API_KEY=your_openai_api_key_here
```

---

## **💬 Step 3: Build the Chat UI**
📂 **Chat Page (`pages/index.js`)**
```jsx
import { useState } from "react";
import ChatMessage from "../components/ChatMessage";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages([...messages, userMessage, { text: data.reply, sender: "bot" }]);
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">AI Chatbot 🤖</h1>
      <div className="mt-6 border p-4 rounded h-80 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {loading && <p className="text-gray-500">Thinking...</p>}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
```

📂 **Chat Message Component (`components/ChatMessage.js`)**
```jsx
export default function ChatMessage({ message }) {
  return (
    <div className={`p-2 my-2 rounded ${message.sender === "user" ? "bg-blue-200 text-right" : "bg-gray-200 text-left"}`}>
      <p>{message.text}</p>
    </div>
  );
}
```

---

## **🚀 Step 4: Deploy to Vercel**
```bash
vercel
```

---

## **📌 Summary**
✅ Built an **AI-powered chatbot** using **Next.js**.  
✅ Integrated **OpenAI API** for chatbot responses.  
✅ Implemented **React state management** for conversation handling.  
✅ Styled with **Tailwind CSS** for a clean UI.  
✅ Deployed on **Vercel**.  
