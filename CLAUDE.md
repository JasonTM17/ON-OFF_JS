# ON/OFF Project Context

This file provides context for developers (and AI assistants) working on this project.

## Architecture

- **Next.js 15 App Router** with standalone output for Docker
- **TypeScript strict** — no `any` without justification
- **Tailwind CSS 4** with custom theme tokens (foreground, background, muted, accent, card, border)
- **Prisma ORM + SQLite** — named export `db` from `@/lib/db`
- **JWT auth** via `jose` + httpOnly cookies
  - `getSession()` from `@/lib/auth` returns `{ userId, role } | null`
  - `requireAdmin()` throws on failure — always wrap in try/catch
  - `requireAuth()` for user-only routes
- **Zustand** for client state (cart, wishlist, chat, compare, notifications, recently-viewed)
- **Framer Motion** for animations
- **Docker** multi-stage build + nginx reverse proxy

## Key Patterns

### API Routes
- Always validate input with Zod
- Use `db` (not `prisma`) for database queries
- Return `{ data }` on success, `{ error }` on failure
- Rate limiting is handled in middleware — no need to add per-route

### Components
- Server Components by default
- `"use client"` only when using hooks, event handlers, or browser APIs
- Dynamic imports with `ssr: false` must be in a Client Component wrapper
- Font: `font-serif` (Playfair Display) for headings, `font-sans` (Inter) for body

### State
- Server state: fetch in Server Components
- Client state: Zustand stores in `src/store/`
- Never prop-drill — use stores or composition

### Styling
- Mobile-first responsive design
- Custom theme via CSS variables in `src/app/globals.css`
- Use Tailwind utilities, avoid inline styles

## Common Pitfalls

1. **`session.id` doesn't exist** — use `session.userId`
2. **`ssr: false` in Server Components** — wrap dynamic imports in a Client Component
3. **Prisma import** — use `import { db } from "@/lib/db"`, not `import prisma`
4. **Admin routes** — `requireAdmin()` throws, must be in try/catch
5. **Cookie secure flag** — must check `process.env.NODE_ENV === "production"`
6. **CDN images** — use `2885966831.e.cdneverest.net` domain

## Build & Test

```bash
npm run build          # Production build (checks types)
npm run dev            # Development server
npx prisma studio     # Database GUI
npx prisma db seed    # Reset sample data
```

## Environment

Required:
- `DATABASE_URL` — Prisma connection string
- `JWT_SECRET` — Must be set in production (throws if missing)

Optional:
- `N8N_WEBHOOK_URL` — Chat webhook (skipped if not set)
- `NEXT_PUBLIC_SITE_URL` — Canonical URL for SEO
