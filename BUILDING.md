# Landing Backend — Developer Guide

Common Node.js + Express backend for all Truelite Estates landing pages.
Ek hi backend sab landing pages ke liye — sirf slug aur table naam alag hogi.

---

## Folder Structure

```
landing-backend/
├── src/
│   ├── controllers/
│   │   └── enquiryController.js   ← Request handle + validate
│   ├── services/
│   │   └── supabaseService.js     ← Supabase se baat karta hai
│   ├── routes/
│   │   └── enquiryRoutes.js       ← API endpoints define
│   ├── middleware/
│   │   └── errorHandler.js        ← Global error handling
│   └── app.js                     ← Express app setup (CORS, routes)
├── server.js                      ← Server start karta hai
├── .env                           ← Secret keys (git mein nahi)
├── .env.example                   ← Template — keys ki list
├── package.json
└── BUILDING.md                    ← Ye file
```

---

## Setup (Pehli Baar)

```bash
cd landing-backend
npm install

# .env file banao
cp .env.example .env
# .env mein apni Supabase keys daalo
```

**.env file:**
```
PORT=5000
SUPABASE_URL=https://zmpjoxnsavmeeoabsskb.supabase.co
SUPABASE_ANON_KEY=your-key-here
ALLOWED_ORIGINS=http://localhost:3000,https://truelitestates.com
```

---

## Server Chalana

```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

Server `http://localhost:5000` pe chalega.

---

## API Endpoint

### POST `/api/enquiry/:slug`

`:slug` = landing page ka identifier

| slug | Supabase Table |
|------|----------------|
| `gaurs-bento` | `Gaurs-Enquries` |

**Request Body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9711557670",
  "comment": "Interested in 2BHK",
  "source": "gaurs-bento-navbar-phone"
}
```

**Success Response:**
```json
{ "success": true, "message": "Enquiry saved successfully" }
```

**Error Response:**
```json
{ "success": false, "error": "Phone number is required" }
```

---

## Nayi Landing Page Kaise Add Karein

### Step 1 — Supabase mein nayi table banao
Columns: `id`, `created_at`, `full_name`, `email`, `phone`, `comment`, `source`

RLS policy add karo:
```sql
CREATE POLICY "Allow inserts" ON "NewTable"
FOR INSERT TO anon WITH CHECK (true);
```

### Step 2 — TABLE_MAP mein entry add karo
File: `src/controllers/enquiryController.js`

```js
const TABLE_MAP = {
  'gaurs-bento':    'Gaurs-Enquries',
  'new-project':    'NewProject-Enquiries',  // ← bas ye line add karo
}
```

### Step 3 — Landing page ke form ka URL update karo
```
POST https://your-backend.com/api/enquiry/new-project
```

**Bas! Koi aur change nahi karna.**

---

## MVC Architecture — Kya Kya Karta Hai

| Layer | File | Kaam |
|-------|------|------|
| **Route** | `routes/enquiryRoutes.js` | URL `/api/enquiry/:slug` define karta hai |
| **Controller** | `controllers/enquiryController.js` | Request validate karta hai, slug se table dhundta hai |
| **Service** | `services/supabaseService.js` | Supabase mein data insert karta hai |
| **Middleware** | `middleware/errorHandler.js` | Unexpected errors pakadta hai |

---

## Deployment (Railway / Render)

1. GitHub pe push karo
2. Railway/Render pe connect karo
3. Environment variables set karo (`.env` wali sab values)
4. Deploy — URL milega jaise `https://landing-backend-xyz.railway.app`
5. Frontend mein API URL update karo

---

## Current Landing Pages

| Landing Page | Slug | Supabase Table |
|---|---|---|
| Gaurs Codename Bento | `gaurs-bento` | `Gaurs-Enquries` |
| AU Cosmos Corner | `au-cosmos` | `Au-Enquiries` |
