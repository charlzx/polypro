# PolyPro

Prediction Market Intelligence Platform

Track odds, detect arbitrage opportunities, and analyze market sentiment across Polymarket, Kalshi, and more. All in real-time.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Phosphor Icons
- **Animations**: Framer Motion
- **State Management**: TanStack Query
- **Theme**: next-themes
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 20+ 
- pnpm 10+

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── theme-provider.tsx
├── data/                # Mock data (until API integration)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── public/              # Static assets
├── beta/                # Previous Vite version (will be removed)
└── docs/                # Documentation
```

## Development

- **Dev Server**: `pnpm dev` (with Turbopack)
- **Type Check**: `pnpm type-check`
- **Lint**: `pnpm lint`
- **Build**: `pnpm build`

## Migration Status

**Phase 1: Foundation Setup** ✅ Complete

Current features:
- Next.js 15 App Router initialized
- Design system fully configured
- All shadcn/ui components migrated
- Theme switching (dark/light mode)
- TypeScript strict mode enabled

Next up: Landing page migration

---

**Note**: This project is currently being migrated from Vite to Next.js. The `/beta` folder contains the original Vite app and will be removed once migration is complete.
