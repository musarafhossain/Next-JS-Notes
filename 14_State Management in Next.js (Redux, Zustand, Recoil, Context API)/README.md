# **Chapter 14: State Management in Next.js (Redux, Zustand, Recoil, Context API)**  

In this chapter, we will cover:  
1. **Understanding State Management in Next.js**  
2. **Using the React Context API**  
3. **Managing State with Redux Toolkit**  
4. **Lightweight State Management with Zustand**  
5. **Recoil for Simpler Global State Management**  
6. **Choosing the Right State Management Approach**  

---

## **14.1 Understanding State Management in Next.js**  

📌 **What is State Management?**  
State management is the process of **handling application data** across components.  

✅ **Types of State in Next.js:**  
- **Local State** (useState, useReducer) → Exists within a single component  
- **Global State** (Context API, Redux, Zustand, Recoil) → Shared across multiple components  
- **Server State** (Fetching data from APIs) → Handled with SWR or React Query  
- **URL State** (query parameters, route state) → Managed via Next.js routing  

✅ **When to Use Global State Management?**  
✔ When **multiple components** need access to the same data  
✔ When handling **authentication state**  
✔ When managing **theme settings or UI preferences**  
✔ When dealing with **complex state updates**  

---

## **14.2 Using the React Context API**  

📌 **The Context API is a built-in way to manage global state in React apps, including Next.js.**  

✅ **Example: Creating a Theme Context**  

📂 `context/ThemeContext.js`
```jsx
import { createContext, useState, useContext } from "react";

// 1. Create Context
const ThemeContext = createContext();

// 2. Create Provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom Hook to Use Context
export function useTheme() {
  return useContext(ThemeContext);
}
```
✅ **Step 2: Wrap `_app.js` with the Provider**  
📂 `pages/_app.js`
```jsx
import { ThemeProvider } from "../context/ThemeContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
```
✅ **Step 3: Use Context in a Component**  
📂 `components/Navbar.js`
```jsx
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav style={{ background: theme === "light" ? "#fff" : "#333", color: theme === "light" ? "#000" : "#fff" }}>
      <h1>Next.js Theme</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </nav>
  );
}
```
✅ **What happens?**  
- Theme **persists across all pages**  
- Easy to **extend with more state**  

---

## **14.3 Managing State with Redux Toolkit**  

📌 **Redux is a predictable state container for managing complex app state.**  
✅ **Step 1: Install Redux Toolkit & React-Redux**  
```bash
npm install @reduxjs/toolkit react-redux
```
✅ **Step 2: Create a Redux Slice**  
📂 `store/counterSlice.js`
```jsx
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    reset: (state) => { state.value = 0; }
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
```
✅ **Step 3: Configure the Redux Store**  
📂 `store/store.js`
```jsx
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```
✅ **Step 4: Wrap `_app.js` with Redux Provider**  
📂 `pages/_app.js`
```jsx
import { Provider } from "react-redux";
import { store } from "../store/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
```
✅ **Step 5: Use Redux in a Component**  
📂 `components/Counter.js`
```jsx
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../store/counterSlice";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}
```
✅ **What happens?**  
- **Centralized state management**  
- **Scales well for large applications**  

---

## **14.4 Lightweight State Management with Zustand**  

📌 **Zustand is a fast, minimal alternative to Redux.**  
✅ **Step 1: Install Zustand**  
```bash
npm install zustand
```
✅ **Step 2: Create a Zustand Store**  
📂 `store/useStore.js`
```jsx
import create from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useStore;
```
✅ **Step 3: Use Zustand in a Component**  
📂 `components/Counter.js`
```jsx
import useStore from "../store/useStore";

export default function Counter() {
  const { count, increment, decrement, reset } = useStore();

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```
✅ **What happens?**  
- Simple **hook-based state management**  
- No need for context or reducers  

---

## **14.5 Recoil for Simpler Global State Management**  

📌 **Recoil is a lightweight state management library from Facebook.**  
✅ **Step 1: Install Recoil**  
```bash
npm install recoil
```
✅ **Step 2: Setup Recoil Root in `_app.js`**  
📂 `pages/_app.js`
```jsx
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
```
✅ **Step 3: Create a Recoil Atom**  
📂 `store/atoms.js`
```jsx
import { atom } from "recoil";

export const counterState = atom({
  key: "counterState",
  default: 0,
});
```
✅ **Step 4: Use Recoil in a Component**  
```jsx
import { useRecoilState } from "recoil";
import { counterState } from "../store/atoms";

export default function Counter() {
  const [count, setCount] = useRecoilState(counterState);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
```
✅ **What happens?**  
- Recoil makes **global state easy to use like local state**  
