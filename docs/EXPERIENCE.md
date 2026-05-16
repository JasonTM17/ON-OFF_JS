# Project Experience & Lessons Learned

This document captures patterns, decisions, and lessons from building the ON/OFF e-commerce platform. Useful for future projects or AI-assisted development sessions.

## Architecture Decisions

### Why Next.js App Router
- Server Components reduce client bundle size significantly
- Built-in API routes eliminate need for separate backend
- Streaming and Suspense for progressive loading
- File-based routing scales well for e-commerce (products, categories, admin)

### Why SQLite + Prisma
- Zero infrastructure for development and small deployments
- Prisma provides type-safe queries and migrations
- Easy to swap to PostgreSQL later (just change provider + connection string)
- Named export `db` keeps imports clean across the project

### Why Zustand over Redux/Context
- Minimal boilerplate — one file per store
- No provider wrapping needed
- Works seamlessly with Next.js Server Components
- Persist middleware for cart/wishlist across sessions

### Why JWT + httpOnly Cookies
- Stateless auth scales without session storage
- httpOnly prevents XSS token theft
- SameSite=Strict prevents CSRF
- jose library works in Edge Runtime (unlike jsonwebtoken)

## Patterns That Worked

### API Route Structure
```
src/app/api/[resource]/route.ts        → GET (list), POST (create)
src/app/api/[resource]/[id]/route.ts   → GET (detail), PUT (update), DELETE
src/app/api/admin/[resource]/route.ts  → Admin-only endpoints
```

### Error Handling
- `requireAdmin()` / `requireAuth()` throw on failure → wrap in try/catch
- API routes return `{ error: string }` with appropriate status codes
- Client uses error boundaries per route group (`(shop)/error.tsx`, `(account)/error.tsx`)

### Security Layers
1. Middleware: rate limiting + security headers (runs on every request)
2. API routes: auth check + Zod validation (per endpoint)
3. Database: Prisma parameterized queries (prevents SQL injection)
4. Client: React escaping + CSP (prevents XSS)

### Component Organization
- `ui/` — Reusable primitives (Button, Input, Modal)
- `layout/` — App shell (Header, Footer, Navigation)
- `product/` — Domain-specific (ProductCard, ProductGallery)
- `home/` — Homepage sections (Hero, Categories, Bestsellers)

## Common Mistakes to Avoid

1. **Don't use `prisma` directly** — import `db` from `@/lib/db`
2. **Don't use `session.id`** — it's `session.userId`
3. **Don't put `ssr: false` in Server Components** — wrap in a Client Component
4. **Don't hardcode cookie secure flag** — check `NODE_ENV === "production"`
5. **Don't log sensitive data** — no tokens, passwords, or PII in console
6. **Don't trust client-side prices** — always calculate server-side
7. **Don't use `git add .`** — stage specific files to avoid committing secrets

## Performance Optimizations Applied

- Lazy-load heavy client components (chat widget, comparison tool)
- `font-display: swap` for web fonts
- Image optimization via Next.js `<Image>` component
- Standalone output for minimal Docker image
- Security headers cached at middleware level (not per-route)

## Docker Setup

- Multi-stage build: deps → build → runtime (reduces image from ~1GB to ~200MB)
- Nginx reverse proxy handles SSL termination and static file caching
- `standalone` output mode copies only necessary files

## Development Workflow

1. `npm run dev` — hot reload development
2. `npx prisma studio` — visual database editor
3. `npm run build` — catches type errors before deploy
4. `docker compose up` — full production simulation locally

## What I'd Do Differently

- Start with PostgreSQL if expecting >1000 concurrent users
- Add i18n from day one (retrofitting is painful)
- Set up E2E tests (Playwright) earlier in development
- Use a component library (Radix UI) for accessible primitives from the start
