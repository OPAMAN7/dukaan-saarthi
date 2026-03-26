# Dukaan Bright 🏪

AI-powered inventory and profit optimization app for small shop owners (kirana stores, local vendors).

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + custom design system
- **Charts**: Recharts
- **Icons**: Material Symbols Outlined
- **Font**: Manrope

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/login`.

## Environment Variables

Copy `.env.local` and fill in your values:

| Variable | Description |
|---|---|
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXTAUTH_SECRET` | Random secret for NextAuth sessions |
| `NEXTAUTH_URL` | Your app URL (e.g. `http://localhost:3000`) |
| `ANTHROPIC_API_KEY` | Anthropic API key for AI pricing suggestions |
| `DATABASE_URL` | Database connection string (optional) |

## Pages

| Route | Description |
|---|---|
| `/login` | Google + email sign-in |
| `/dashboard` | Profit overview, weekly chart, stock alerts |
| `/inventory` | Full product table with search & filters |
| `/insights` | AI recommendations with one-click apply |
| `/add-product` | Add product form with barcode scan |
| `/settings` | Shop info, expenses, notification toggles |

## Design System

Based on the **Teal Precision** editorial design system:

- **Primary**: `#004d5b` / `#006778` (teal)
- **Font**: Manrope (extrabold headlines, medium body)
- **Style**: No 1px borders · frosted glass cards · gradient CTAs · ambient shadows
- **Color signals**: 🟢 Green = healthy stock · 🟡 Yellow = low stock · 🔴 Red = critical/expiring

## Project Structure

```
src/
├── app/
│   ├── (app)/          # Authenticated routes (sidebar + topbar layout)
│   │   ├── dashboard/
│   │   ├── inventory/
│   │   ├── insights/
│   │   ├── add-product/
│   │   └── settings/
│   └── login/          # Public auth page
├── components/
│   ├── layout/         # Sidebar, TopBar
│   └── ui/             # StatCard, Badge, SectionHeading
├── lib/
│   ├── mockData.ts     # Sample products, expenses, insights
│   └── utils.ts        # formatCurrency, cn, color helpers
└── types/
    └── index.ts        # Product, AIInsight, Expense types
```
