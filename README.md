# Birth Date Harmony — Ankshaastra Occult Experts LLP

C-Section baby date guidance website with integrated Razorpay payment gateway

---

## Tech Stack

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Payments:** Razorpay (order creation + HMAC signature verification)
- **Backend:** Vercel Serverless Functions (`/api` directory)
- **Deployment:** Vercel

---

## Project Structure

```
├── api/
│   ├── create-order.ts        # POST /api/create-order  — creates Razorpay order (server-side)
│   └── verify-payment.ts      # POST /api/verify-payment — verifies HMAC signature (server-side)
├── src/
│   ├── components/
│   │   ├── BookingFormModal.tsx   # Booking form + Razorpay checkout flow
│   │   └── ...
│   └── lib/
│       ├── razorpay.ts        # Razorpay JS SDK loader + type helpers
│       └── constants.ts       # WhatsApp number, links
├── .env.example               # Environment variable reference
├── vercel.json                # SPA rewrite rules + API routing
└── ...
```

---

## Payment Flow

```
Customer fills form
       │
       ▼
POST /api/create-order        ← server creates Razorpay order (KEY_SECRET stays safe)
       │
       ▼
Razorpay Checkout Modal opens (in browser)
       │
       ▼
Customer pays (card / UPI / netbanking / wallet)
       │
       ▼
POST /api/verify-payment      ← server verifies HMAC-SHA256 signature
       │
       ▼
Success screen shown + WhatsApp opens with booking details
```

---

## Environment Variables

Set these in **Vercel → Project → Settings → Environment Variables**.

| Variable | Where to get it | Exposed to browser? |
|---|---|---|
| `RAZORPAY_KEY_ID` | Razorpay Dashboard → Settings → API Keys | No (server only) |
| `RAZORPAY_KEY_SECRET` | Razorpay Dashboard → Settings → API Keys | **Never** |
| `VITE_RAZORPAY_KEY_ID` | Same value as RAZORPAY_KEY_ID | Yes (needed for checkout modal) |

> RAZORPAY_KEY_SECRET must NEVER be prefixed with VITE_ — doing so would expose it in the browser bundle.

### Test vs Live Keys

- Use `rzp_test_...` keys during development/testing
- Switch to `rzp_live_...` keys in Vercel Production environment only

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your Razorpay TEST keys
cp .env.example .env.local
# Edit .env.local with your rzp_test_* keys

# 3. Install Vercel CLI (needed to run serverless functions locally)
npm i -g vercel

# 4. Run with Vercel dev (runs both Vite + API functions)
vercel dev
```

> Use `vercel dev` instead of `npm run dev` when testing payments locally.
> Plain `vite` does not run the /api serverless functions.

---

## Deploying to Vercel

Push to your connected GitHub repo — Vercel auto-deploys on every push to main.

After deploy, add environment variables:
1. Vercel dashboard → your project → Settings → Environment Variables
2. Add all three variables from the table above
3. Redeploy once after adding variables

---

## Before Going Live Checklist

- [ ] Replace WHATSAPP_NUMBER in src/lib/constants.ts with the real number
- [ ] Switch Razorpay keys from rzp_test_* to rzp_live_* in Vercel env vars
- [ ] Activate your Razorpay account (KYC complete) so live payments are enabled
- [ ] Test a real payment end-to-end in production
- [ ] Verify payments appear in Razorpay Dashboard → Payments

---

## Razorpay Dashboard

- **Payments received:** dashboard.razorpay.com → Payments
- **Settlements to bank:** Razorpay settles automatically (T+2 days typically)
- **API Keys:** Dashboard → Settings → API Keys

---

## Customisation Notes

- **WhatsApp number:** `src/lib/constants.ts` → `WHATSAPP_NUMBER`
- **Package prices:** `src/components/Pricing.tsx`
- **Brand colours:** `tailwind.config.ts`
- **Company name in checkout:** `src/components/BookingFormModal.tsx` → name field

# ─────────────────────────────────────────────────────────────────────────────
# Razorpay Configuration
# Get these from: https://dashboard.razorpay.com → Settings → API Keys
# ─────────────────────────────────────────────────────────────────────────────

# Server-side only (used in /api/* serverless functions) — NEVER expose this
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx

# Public key — safe to expose in the browser (used by Razorpay checkout modal)
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxxxx

# ─────────────────────────────────────────────────────────────────────────────
# NOTE: For local development, copy this file to .env.local and fill in values.
# .env.local is git-ignored by default via .gitignore.
# On Vercel, set these directly in: Project → Settings → Environment Variables
# ─────────────────────────────────────────────────────────────────────────────

