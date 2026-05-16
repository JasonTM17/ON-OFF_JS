# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 2.x     | ✅        |
| 1.x     | ⚠️ Security fixes only |
| < 1.0   | ❌        |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do not** open a public issue
2. Email: security@onoff.vn
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

You will receive a response within 48 hours. Critical issues will be patched within 7 days.

## Security Measures

This project implements:

- **Authentication** — JWT tokens with httpOnly cookies, bcrypt password hashing
- **Authorization** — Role-based access control (user/admin)
- **Input Validation** — Zod schemas on all API endpoints
- **Rate Limiting** — Per-IP rate limits on sensitive endpoints
- **Headers** — CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- **SQL Injection** — Prisma ORM with parameterized queries
- **XSS** — React's built-in escaping + Content Security Policy
- **CSRF** — SameSite cookies + origin validation

## Responsible Disclosure

We follow a 90-day disclosure policy. After reporting, we will:

1. Confirm receipt within 48 hours
2. Provide an estimated timeline for a fix
3. Notify you when the fix is released
4. Credit you in the release notes (unless you prefer anonymity)
