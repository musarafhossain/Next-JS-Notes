# **Chapter 16: Deploying Next.js Applications (Vercel, Netlify, DigitalOcean, Docker)**  

In this chapter, we will cover:  
1. **Understanding Deployment in Next.js**  
2. **Deploying Next.js on Vercel**  
3. **Deploying Next.js on Netlify**  
4. **Deploying Next.js on DigitalOcean**  
5. **Deploying Next.js with Docker**  
6. **Best Practices for Next.js Deployment**  

---

## **16.1 Understanding Deployment in Next.js**  

🚀 **Why is Deployment Important?**  
Once your Next.js app is built, you need to deploy it so users can access it online. Next.js offers multiple ways to deploy, including **serverless, static, and traditional servers.**  

✅ **Deployment Strategies in Next.js**  

| Deployment Type | Description | Suitable For |
|----------------|-------------|--------------|
| **Static Export (`next export`)** | Generates static HTML | Blogs, landing pages |
| **Serverless Deployment** | Functions run on demand | API-driven apps |
| **Custom Server Deployment** | Hosted on a server | Complex applications |

---

## **16.2 Deploying Next.js on Vercel**  

📌 **Vercel is the easiest way to deploy Next.js apps (created by the same team!).**  

### ✅ **Step 1: Install Vercel CLI**  
```bash
npm install -g vercel
```
### ✅ **Step 2: Login to Vercel**  
```bash
vercel login
```
### ✅ **Step 3: Deploy the Next.js App**  
In the project folder, run:  
```bash
vercel
```
✔ Vercel detects your Next.js app and deploys it  
✔ The deployed URL is provided after the process completes  

### ✅ **Step 4: Configure a Custom Domain (Optional)**  
In the **Vercel Dashboard**, go to:  
**Project > Settings > Domains > Add Custom Domain**  

🎯 **Done! Your Next.js app is now live on Vercel!**  

---

## **16.3 Deploying Next.js on Netlify**  

📌 **Netlify is great for static & serverless deployments.**  

### ✅ **Step 1: Install Netlify CLI**  
```bash
npm install -g netlify-cli
```
### ✅ **Step 2: Login to Netlify**  
```bash
netlify login
```
### ✅ **Step 3: Deploy the Next.js App**  
```bash
netlify deploy
```
✔ Netlify builds & deploys your Next.js app  

### ✅ **Step 4: Configure a Custom Domain (Optional)**  
In **Netlify Dashboard**, go to:  
**Site Settings > Custom Domains**  

🎯 **Your app is now live on Netlify!**  

---

## **16.4 Deploying Next.js on DigitalOcean**  

📌 **DigitalOcean provides cloud hosting for Next.js apps.**  

### ✅ **Step 1: Create a Droplet (Virtual Server)**  
1. Go to [DigitalOcean](https://www.digitalocean.com)  
2. Create a **Ubuntu Droplet**  
3. Choose **Node.js** as the stack  
4. Connect via SSH  

### ✅ **Step 2: Install Node.js & PM2**  
```bash
sudo apt update && sudo apt install nodejs npm -y
npm install -g pm2
```
### ✅ **Step 3: Clone & Start Your Next.js App**  
```bash
git clone your-repository-url
cd your-nextjs-app
npm install
npm run build
pm2 start npm --name "next-app" -- start
```
✔ Your Next.js app is running on the server  

### ✅ **Step 4: Set Up a Reverse Proxy with Nginx**  
```bash
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/nextjs
```
Add the following config:  
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Enable the Nginx config:  
```bash
sudo ln -s /etc/nginx/sites-available/nextjs /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```
🎯 **Your app is now live on DigitalOcean!**  

---

## **16.5 Deploying Next.js with Docker**  

📌 **Docker allows you to containerize and deploy Next.js anywhere.**  

### ✅ **Step 1: Create a `Dockerfile` in the Project Root**  
```dockerfile
# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 and start the app
EXPOSE 3000
CMD ["npm", "start"]
```
### ✅ **Step 2: Create a `.dockerignore` File**  
```
node_modules
.next
.env.local
```
### ✅ **Step 3: Build & Run the Docker Image**  
```bash
docker build -t nextjs-app .
docker run -p 3000:3000 nextjs-app
```
🎯 **Your app is now running inside Docker!**  

---

## **16.6 Best Practices for Next.js Deployment**  

✅ **Use Environment Variables (`.env` file)**  
✔ Store secrets like API keys securely  

✅ **Enable Caching & Code Splitting**  
✔ Use **automatic static optimization**  

✅ **Use a CDN for Static Assets**  
✔ Next.js can serve assets from **Vercel, Cloudflare, Netlify**  

✅ **Use Monitoring & Logging Tools**  
✔ Tools like **Sentry, LogRocket, or Datadog** help debug errors  

---