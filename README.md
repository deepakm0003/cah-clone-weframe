# Cards Against Humanity Clone — Full Stack

A pixel-perfect recreation of the Cards Against Humanity website with a modern headless architecture.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router) + Tailwind CSS |
| CMS | Payload CMS 3 (headless) |
| Commerce | Medusa.js 2 |
| Frontend Hosting | Vercel |
| CMS Hosting | Vercel |
| Backend Hosting | Render (free tier) |

---

## Project Structure

```
WeFrame/
├── frontend/     # Next.js app (pages, components, hooks)
├── cms/          # Payload CMS (collections, globals, hooks)
└── backend/      # Medusa.js (seed, subscribers, config)
```

---

## Local Development Setup

### Prerequisites
- Node.js 20+
- PostgreSQL running locally (or use Neon.tech)
- npm

---

### 1. CMS — Payload CMS

```bash
cd cms

# Copy and fill in your DB url
cp .env .env.local

# Edit .env.local:
# DATABASE_URL=postgres://...
# PAYLOAD_SECRET=your-secret-key
# FRONTEND_URL=http://localhost:3000
# MEDUSA_URL=http://localhost:9000
# MEDUSA_API_KEY=your-medusa-admin-token

npm install
npm run dev        # Runs on http://localhost:3001
```

**First time: create admin user at http://localhost:3001/admin**

---

### 2. Backend — Medusa.js

```bash
cd backend

# Fill in .env:
# DATABASE_URL=postgres://...
# (separate DB from Payload)

npm install
npm run db:migrate   # Run migrations
npm run dev          # Runs on http://localhost:9000
```

**Seed test products:**
```bash
npm run seed
```

**Medusa admin panel:** http://localhost:9000/app

**Get admin token for CMS sync:**
In Medusa admin → Settings → API Keys → Create API Key → copy to CMS `.env` as `MEDUSA_API_KEY`

---

### 3. Frontend — Next.js

```bash
cd frontend

# Already has .env.local with localhost URLs
# Edit if needed:
# NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
# NEXT_PUBLIC_MEDUSA_URL=http://localhost:9000

npm install
npm run dev     # Runs on http://localhost:3000
```

---

## CMS Structure (Payload CMS)

### Collections
| Collection | Purpose |
|------------|---------|
| `products` | Product title, slug, description, prices, images, bullets |
| `media` | Image uploads used by products |
| `users` | CMS admin users |
| `faqs` | FAQ question & answer pairs |

### Globals
| Global | Purpose |
|--------|---------|
| `homepage` | Hero content, CTA links, featured products |
| `footer` | Shop, Info, Find Us, and legal links |

**Changing content in the Payload admin panel automatically reflects on the frontend** (60-second cache revalidation via `next: { revalidate: 60 }`).

---

## Commerce Flow (Medusa.js)

| Feature | Route/Hook |
|---------|-----------|
| Cart | `CartContext` → `lib/medusa.ts` |
| Add to Cart | `useCart().addItem(variantId)` |
| Auth (Login/Register) | `AuthModal` component |
| Checkout | `/checkout` page |
| Order creation | `completeCart()` |
| Payment | Manual/dummy provider |

---

## CMS ↔ Commerce Sync

### Payload → Medusa (automatic)
When a product is created/updated in Payload:
- `cms/src/hooks/syncToMedusa.ts` fires as an `afterChange` hook
- Calls Medusa Admin API to create/update the matching product
- Stores `medusaProductId` back on the Payload document

### Medusa → Payload (automatic)
When a product changes in Medusa:
- `backend/src/subscribers/product-updated.ts` listens to `product.updated` event
- Calls Payload REST API to update the matching document

---

## Deployment

### Frontend + CMS → Vercel
```bash
# In Vercel dashboard, add two projects:
# 1. Import WeFrame/frontend
# 2. Import WeFrame/cms

# Set env vars in each project's Vercel settings
```

### Backend → Render
```bash
# Create a new Web Service on render.com
# Connect WeFrame/backend repo
# Set DATABASE_URL to Neon.tech PostgreSQL
# Build command: npm run build
# Start command: npm run start
```

---

## Lighthouse Score
Target: **95+**
Check at: https://pagespeed.web.dev/

Optimizations already included:
- Next.js Image optimization
- `next: { revalidate: 60 }` ISR caching
- Font preloading via `next/font`
- Semantic HTML heading structure
- Meta descriptions on all pages
