# Advanced Product Showcase

A fully featured **Next.js (App Router + TypeScript)** application demonstrating advanced rendering strategies, authentication, API routing, SEO optimization, structured data, middleware protection, and dynamic UI components.

This project was built as part of a senior-level technical assessment and showcases production‑grade patterns using **Next.js 14**, **App Router**, **ISR**, **SSR**, **SSG**, and **TailwindCSS**.

---

## 🚀 Features

### Product Pages

* **Products List** (`/products`)

  * Uses **SSG + ISR** (revalidate every 5 minutes)
  * Displays product cards with images, prices, and names
* **Product Details** (`/products/[id]`)

  * Generated using **generateStaticParams**
  * Dynamic metadata per product
  * **JSON‑LD structured data** for SEO
  * ISR-enabled product details

### Search Page (`/search`)

* Full **Server-Side Rendering (SSR)** using `dynamic = "force-dynamic"`
* Fresh results on every request

### Admin Dashboard (`/admin`)

* Protected route using **Next.js Middleware**
* Displays simple analytics (total products, total comments)
* Accessible only when authenticated

### Authentication

* Simple login system using cookies
* Sidebar updates based on user role
* Includes **Logout** route (removes token cookie and redirects)

### API Routes

* `/api/reviews` – POST endpoint with validation:

  * Required fields: `productId`, `userName`, `rating`, `comment`
  * Rating must be between 1 and 5
  * Comment cannot be empty

### UI & Navigation

* Global **Sidebar Layout**
* Links to main pages
* Admin info block when logged in

### Performance

* Uses `next/image` for optimized images
* Lazy loading enabled

### SEO

* Dynamic **metadata**
* **OpenGraph** integration
* **JSON-LD** product schema

---

## 🛠️ Tech Stack

* **Next.js 14** (App Router)
* **React 18**
* **TypeScript**
* **Tailwind CSS**
* **DummyJSON API** for data

---

## 📁 Project Structure

```
app/
 ├─ layout.tsx
 ├─ page.tsx
 ├─ products/
 │    ├─ page.tsx
 │    └─ [id]/page.tsx
 ├─ search/page.tsx
 ├─ admin/page.tsx
 ├─ login/page.tsx
 ├─ api/
 │    ├─ reviews/route.ts
 │    └─ ...
 ├─ logout/route.ts

middleware.ts
styles/globals.css
components/
lib/
```

---

## ▶️ Running the Project Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Open your browser

```
http://localhost:3000
```

The app will automatically redirect to `/products`.

---

## ⚙️ Important Architectural Decisions

### Why App Router?

App Router provides more modern patterns:

* File‑based nested layouts
* Built‑in SEO metadata system
* Server Components by default
* Cleaner data fetching patterns

### Why SSG / ISR for Product Pages?

* Products rarely change rapidly
* ISR offers the perfect balance between freshness and performance
* High Lighthouse scores due to static output

### Why SSR for Search?

Search results must **always** be up to date – SSR ensures real‑time data.

### Why Middleware for Admin Protection?

* Zero client‑side flicker
* Protects backend routes as well
* Enforced at the **edge** before rendering

---

## 🧪 Improvements & Future Work

* Full authentication system (JWT / OAuth / Credentials Provider)
* Storing reviews in a real database
* Pagination & filtering
* Dark mode
* E2E tests using Playwright
* Unit tests using Jest + React Testing Library

---

## ✔️ Summary

This project demonstrates advanced usage of **Next.js App Router**, optimal rendering strategies, secure middleware‑based authentication, a clean UI, and high‑level SEO practices – all required in a senior‑level production application.

Feel free to extend, improve, or integrate with a real backend or database.
