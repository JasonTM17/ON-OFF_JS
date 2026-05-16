# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-05-16

### Added

- Centered logo with 3-column header layout matching official onoff.vn brand
- Mega menu with brand tabs (ONOFF / BASICON / RE:ON)
- Payment selector component with 4 methods (COD, Bank Transfer, MoMo, Card)
- Coupon system with server-side validation
- Floating widgets (back-to-top button, "Mới về" new arrivals pill)
- Brand showcase section on homepage (3-column lifestyle photos)
- Footer QR code, ĐKKD business registration badge, payment SVG icons
- Wishlist button on product cards with heart animation
- Quick-add to cart button with hover slide-up animation
- Order success page with order ID and payment method display

### Changed

- All images converted to `next/image` with proper `sizes` and `priority`
- Product cards redesigned: removed quick-view modal, added quick-add button
- Color swatches enlarged to 20px (w-5 h-5) for better touch targets
- All hardcoded hex colors replaced with theme tokens
- Free shipping threshold unified to 500.000đ across all pages
- Demo credentials gated behind `NODE_ENV=development`
- Package version bumped to 2.0.0

### Removed

- Quick-view modal (not present on official onoff.vn)
- 8 unused homepage section components
- Console.log statements from production code
- Unused imports across 20+ files

### Fixed

- Hero slider `priority` prop using undefined variable
- Checkout page broken state after partial refactor
- Expired coupon seed dates (updated to 2026-12-31)
- Product detail page hardcoded colors replaced with theme tokens

---

## [1.0.0] - 2026-05-16

### Added

- Full product catalog with categories, filtering, and search
- Shopping cart with persistent state and coupon support
- User authentication (register, login, forgot password)
- User account management (profile, addresses, order history)
- Multi-step checkout flow with order confirmation
- Wishlist and product comparison features
- Admin dashboard (products, orders, users, analytics)
- Live chat widget with quick replies
- PWA support with installable app and offline capability
- SEO optimization with JSON-LD structured data
- Docker deployment with Nginx reverse proxy
- Rate limiting on all API endpoints
- Security headers (CSP, HSTS, X-Frame-Options)
- Responsive design (mobile-first)
- Dark/light theme support
- Newsletter subscription
- Product image zoom and gallery

### Security

- JWT authentication with httpOnly cookies
- Bcrypt password hashing
- Zod input validation on API routes
- Role-based access control
- Content Security Policy headers
- Per-IP rate limiting

## [Unreleased]

### Planned

- Payment gateway integration (VNPay, MoMo)
- Email notifications (order confirmation, shipping updates)
- Inventory management
- Multi-language support (i18n)
- Advanced analytics dashboard
