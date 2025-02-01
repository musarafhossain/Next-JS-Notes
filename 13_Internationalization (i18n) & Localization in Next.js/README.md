# **Chapter 13: Internationalization (i18n) & Localization in Next.js**  

In this chapter, we will cover:  
1. **Understanding Internationalization (i18n) & Localization**  
2. **Configuring i18n in Next.js**  
3. **Routing & Automatic Locale Detection**  
4. **Translating Static Content (JSON-based translations)**  
5. **Translating Dynamic Content (Using Libraries like next-intl & react-intl)**  
6. **Best Practices for i18n in Next.js**  

---

## **13.1 Understanding Internationalization (i18n) & Localization**  
📌 **Why is i18n important?**  
✔ Expands your audience globally  
✔ Improves user experience for non-English speakers  
✔ Enhances accessibility & inclusivity  

✅ **Difference Between Internationalization & Localization**  

| Feature | Internationalization (i18n) | Localization (L10n) |
|---------|----------------------------|----------------------|
| **Definition** | Preparing an app to support multiple languages | Adapting content for a specific locale |
| **Scope** | Structure, architecture, routing | Text translation, currency, date formats |
| **Example** | Defining language routes (`/en`, `/fr`) | Translating “Home” to “Accueil” in French |

---

## **13.2 Configuring i18n in Next.js**  
📌 **Next.js has built-in support for i18n routing.**  

✅ **Step 1: Enable i18n in `next.config.js`**  
📂 `next.config.js`
```javascript
module.exports = {
  i18n: {
    locales: ["en", "fr", "es"], // Define supported languages
    defaultLocale: "en", // Set default language
  },
};
```
✅ **What happens?**  
- Next.js **automatically generates locale-based routes**:  
  - `/en` → English version  
  - `/fr` → French version  
  - `/es` → Spanish version  

---

## **13.3 Routing & Automatic Locale Detection**  
📌 **Next.js automatically detects the user's preferred language and redirects them.**  

✅ **How does it work?**  
- Uses the browser’s **Accept-Language** header  
- Redirects users to their preferred locale  

✅ **Example: Using `useRouter` to Detect Locale**  
📂 `pages/index.js`
```jsx
import { useRouter } from "next/router";

export default function Home() {
  const { locale } = useRouter();

  return <h1>Current Language: {locale}</h1>;
}
```
✅ **What happens?**  
- Displays the **current language** dynamically.  
- Changes when navigating to `/fr` or `/es`.  

---

## **13.4 Translating Static Content (JSON-based translations)**  
📌 **The easiest way to manage translations is using JSON files.**  

✅ **Step 1: Create Translation Files**  
📂 `locales/en.json`
```json
{
  "title": "Welcome to our Website!",
  "description": "Explore our products and services."
}
```
📂 `locales/fr.json`
```json
{
  "title": "Bienvenue sur notre site Web!",
  "description": "Découvrez nos produits et services."
}
```
✅ **Step 2: Load Translations Dynamically**  
📂 `pages/index.js`
```jsx
import { useRouter } from "next/router";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export default function Home() {
  const { locale } = useRouter();
  const t = locale === "fr" ? fr : en; // Select language file

  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.description}</p>
    </div>
  );
}
```
✅ **What happens?**  
- Loads **English content** at `/en`.  
- Loads **French content** at `/fr`.  

---

## **13.5 Translating Dynamic Content (Using `next-intl` & `react-intl`)**  
📌 **For dynamic text formatting, libraries like `next-intl` and `react-intl` are useful.**  

✅ **Step 1: Install `next-intl`**  
```bash
npm install next-intl
```
✅ **Step 2: Create Translation Files**  
📂 `locales/en.json`
```json
{
  "greeting": "Hello, {name}!"
}
```
📂 `locales/fr.json`
```json
{
  "greeting": "Bonjour, {name}!"
}
```
✅ **Step 3: Use `next-intl` in Your Component**  
📂 `pages/index.js`
```jsx
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

export default function Home() {
  const { locale } = useRouter();
  const t = useTranslations();

  return <h1>{t("greeting", { name: "John" })}</h1>;
}
```
✅ **What happens?**  
- Dynamically **inserts the user's name**.  
- Supports **pluralization & date formatting**.  

---

## **13.6 Best Practices for i18n in Next.js**  
🚀 **Top tips for better internationalization:**  
✅ **Use JSON files** for static translations  
✅ **Use `next-intl` or `react-intl`** for dynamic translations  
✅ **Enable automatic locale detection** for better UX  
✅ **Ensure URLs follow locale-based routing (`/en`, `/fr`)**  
✅ **Format numbers & dates dynamically using `Intl.DateTimeFormat`**  
✅ **Lazy-load language packs** to improve performance  