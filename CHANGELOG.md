# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
