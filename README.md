# E-commerce Product Gallery

## This is a frontend development assessment project for a product gallery e-commerce application, built using **Next.js** and **TypeScript**. It features product listing with filtering, sorting, a shopping cart, and responsive design.

## Getting Started

### Prerequisites

- Node.js (>= 20)
- npm

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/proatik/product-gallery.git
   cd product-gallery
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. Open your browser at [http://localhost:3000](http://localhost:3000)

---

## Features Implemented

- ✅ Product listing with:
  - Filtering by category, price range, and availability
  - Sorting by price and alphabetically
- ✅ Responsive grid layout
- ✅ Shopping cart with:
  - Add/remove items
  - Update quantities
  - Discount calculation
  - Cart preview page
  - Cart persistence via localStorage
- ✅ API route simulation using `/api/products` and `/api/products/[id]`
- ✅ First three products include the word **"HuluLulu"** in their descriptions
- ✅ Responsive and mobile-first design
- ✅ Error handling for data loading and pages

---

## Technical Decisions & Reasoning

- **Framework:** Chose **Next.js** with **TypeScript** for built-in API support and type safety.
- **State Management:** Used **React Context API** to keep the setup lightweight and simple for global cart state.
- **Styling:** Utilized **Tailwind CSS** to maintain style consistency.
- **API Integration:** Mocked using Next.js API routes (`/api/products`) instead of fetching from an external service.
- **LocalStorage:** Used to persist cart state across page reloads for better user experience.

---

## Assumptions Made

- Product data is static and fetched from a local API route.
- Only in-stock products can be added to cart.
- No backend authentication or user profiles are required.

---

## Future Improvements

- Add product detail pages (`/products/[id]`)
- Add product search functionality

---

## Deployment

The application is deployed at:  
👉 [https://paoatik-product-gallery.vercel.app](https://proatik-product-gallery.vercel.app)

---
