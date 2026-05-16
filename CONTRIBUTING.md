# Contributing to ON/OFF

Thank you for your interest in contributing to ON/OFF. This guide will help you get started.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Set up the database: `npx prisma db push && npx prisma db seed`
4. Start the dev server: `npm run dev`

## Code Standards

- **TypeScript** — Strict mode enabled. No `any` types without justification.
- **Formatting** — Follow existing code style. Use Prettier defaults.
- **Components** — Server Components by default. Use `"use client"` only when needed.
- **Naming** — kebab-case for files, PascalCase for components, camelCase for functions/variables.
- **Imports** — Use `@/` path alias. Group: external → internal → relative.

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(cart): add quantity selector
fix(auth): handle expired tokens gracefully
docs: update deployment guide
chore(deps): bump next to 15.1
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

## Pull Requests

1. Create a feature branch from `main`
2. Make your changes with clear, focused commits
3. Ensure `npm run build` passes without errors
4. Fill out the PR template
5. Request review

## Project Conventions

### API Routes

- Use Zod for request validation
- Return consistent JSON responses: `{ data }` or `{ error }`
- Protect admin routes with `requireAdmin()`
- Protect user routes with `requireAuth()`

### State Management

- Server state: fetch in Server Components or API routes
- Client state: Zustand stores in `src/store/`
- No prop drilling — use stores or composition

### Styling

- Tailwind CSS utility classes
- Custom theme tokens: `foreground`, `background`, `muted`, `accent`, `card`, `border`
- Font: Playfair Display (headings), Inter (body)
- Responsive: mobile-first approach

## Reporting Issues

Use [GitHub Issues](https://github.com/JasonTM17/ON-OFF_JS/issues) with:

- Clear title describing the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information if relevant

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
