# **Chapter 15: Testing in Next.js (Jest, Cypress, Unit & E2E Testing)**  

In this chapter, we will cover:  
1. **Why Testing is Important in Next.js?**  
2. **Types of Testing in Next.js**  
3. **Setting Up Jest for Unit Testing**  
4. **Testing Components with React Testing Library**  
5. **Setting Up Cypress for End-to-End (E2E) Testing**  
6. **Writing E2E Tests with Cypress**  
7. **Best Practices for Testing in Next.js**  

---

## **15.1 Why Testing is Important in Next.js?**  
🚀 **Why should you test your Next.js app?**  
✔ Ensures components work correctly  
✔ Catches bugs before deployment  
✔ Improves code maintainability  
✔ Helps with refactoring safely  

✅ **Common Testing Methods in Next.js:**  
- **Unit Testing** → Tests individual functions or components  
- **Integration Testing** → Tests multiple components working together  
- **End-to-End (E2E) Testing** → Tests the full app flow (e.g., login, navigation)  

---

## **15.2 Types of Testing in Next.js**  

| Type of Test | Purpose | Tools Used |
|-------------|---------|------------|
| **Unit Testing** | Tests a single function or component | Jest, React Testing Library |
| **Integration Testing** | Ensures multiple components work together | Jest, React Testing Library |
| **End-to-End (E2E) Testing** | Simulates real user interactions | Cypress, Playwright |

---

## **15.3 Setting Up Jest for Unit Testing**  

📌 **Jest is a popular testing framework for JavaScript.**  

✅ **Step 1: Install Jest & Testing Libraries**  
```bash
npm install jest @testing-library/react @testing-library/jest-dom babel-jest @babel/preset-env @babel/preset-react -D
```
✅ **Step 2: Configure Jest in `package.json`**  
📂 `package.json`
```json
{
  "jest": {
    "testEnvironment": "jsdom"
  }
}
```
✅ **Step 3: Add Jest to Babel Config**  
📂 `.babelrc`
```json
{
  "presets": ["next/babel"]
}
```
✅ **Step 4: Add Jest Test Script**  
📂 `package.json`
```json
{
  "scripts": {
    "test": "jest"
  }
}
```
✅ **Step 5: Create a Sample Test File**  
📂 `__tests__/sum.test.js`
```javascript
function sum(a, b) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```
✅ **Run Tests:**  
```bash
npm test
```
✅ **What happens?**  
✔ Jest runs the test and verifies the function works correctly  

---

## **15.4 Testing Components with React Testing Library**  

📌 **React Testing Library helps test Next.js components.**  

✅ **Step 1: Create a Simple Component**  
📂 `components/Button.js`
```jsx
export default function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
```
✅ **Step 2: Write a Test for the Component**  
📂 `__tests__/Button.test.js`
```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/Button";

test("renders button with correct label", () => {
  render(<Button label="Click Me" onClick={() => {}} />);
  expect(screen.getByText("Click Me")).toBeInTheDocument();
});

test("calls onClick when button is clicked", () => {
  const mockOnClick = jest.fn();
  render(<Button label="Click Me" onClick={mockOnClick} />);
  fireEvent.click(screen.getByText("Click Me"));
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
```
✅ **Run Tests:**  
```bash
npm test
```
✅ **What happens?**  
✔ Verifies the button renders correctly  
✔ Ensures the `onClick` function is called  

---

## **15.5 Setting Up Cypress for End-to-End (E2E) Testing**  

📌 **Cypress is a modern E2E testing framework for Next.js apps.**  

✅ **Step 1: Install Cypress**  
```bash
npm install cypress -D
```
✅ **Step 2: Open Cypress Dashboard**  
```bash
npx cypress open
```
✅ **Step 3: Configure Cypress in `cypress.config.js`**  
📂 `cypress.config.js`
```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
  },
});
```
✅ **Step 4: Add Cypress Test Script**  
📂 `package.json`
```json
{
  "scripts": {
    "cypress": "cypress open"
  }
}
```
✅ **Step 5: Create a Cypress Test for Homepage**  
📂 `cypress/e2e/home.cy.js`
```javascript
describe("Homepage Test", () => {
  it("should load the homepage and display heading", () => {
    cy.visit("/");
    cy.contains("Welcome to Next.js").should("be.visible");
  });
});
```
✅ **Run Cypress:**  
```bash
npm run cypress
```
✅ **What happens?**  
✔ Cypress opens the browser  
✔ Visits the homepage and checks if the heading is visible  

---

## **15.6 Writing E2E Tests with Cypress**  

📌 **Let's test user login functionality in Next.js.**  

✅ **Step 1: Create a Login Page**  
📂 `pages/login.js`
```jsx
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (email === "test@example.com" && password === "password") {
      setMessage("Login successful!");
    } else {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
}
```
✅ **Step 2: Write Cypress E2E Test for Login Page**  
📂 `cypress/e2e/login.cy.js`
```javascript
describe("Login Page Test", () => {
  it("should login successfully with correct credentials", () => {
    cy.visit("/login");
    cy.get("input[placeholder='Email']").type("test@example.com");
    cy.get("input[placeholder='Password']").type("password");
    cy.get("button").click();
    cy.contains("Login successful!").should("be.visible");
  });

  it("should show error for invalid credentials", () => {
    cy.visit("/login");
    cy.get("input[placeholder='Email']").type("wrong@example.com");
    cy.get("input[placeholder='Password']").type("wrongpassword");
    cy.get("button").click();
    cy.contains("Invalid credentials").should("be.visible");
  });
});
```
✅ **Run Cypress Tests:**  
```bash
npm run cypress
```
✅ **What happens?**  
✔ Cypress simulates user login  
✔ Verifies correct behavior for valid & invalid logins  

---

## **15.7 Best Practices for Testing in Next.js**  

✅ **Use Jest for unit testing** components and logic  
✅ **Use Cypress for full end-to-end (E2E) tests**  
✅ **Mock API calls using `jest.mock()`**  
✅ **Ensure tests run in CI/CD pipelines**  
✅ **Write meaningful test cases (not just for coverage)**  