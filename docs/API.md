# API Reference

Base URL: `/api`

All endpoints return JSON. Authenticated endpoints require a valid JWT token in the `token` httpOnly cookie (set automatically on login).

## Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Create account |
| POST | `/auth/login` | No | Login, sets cookie |
| GET | `/auth/me` | Yes | Get current user |
| POST | `/auth/change-password` | Yes | Change password |
| POST | `/auth/forgot-password` | No | Request password reset |

### POST /auth/login

```json
// Request
{ "email": "user@example.com", "password": "secret123" }

// Response 200
{ "user": { "id": "...", "email": "...", "name": "...", "role": "USER" } }

// Response 401
{ "error": "Email hoặc mật khẩu không đúng" }
```

### POST /auth/register

```json
// Request
{ "email": "user@example.com", "password": "secret123", "name": "Nguyễn Văn A" }

// Response 201
{ "user": { "id": "...", "email": "...", "name": "..." } }
```

---

## Products

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/products` | No | List products (paginated) |
| GET | `/products/:id` | No | Product detail |
| GET | `/products/bestsellers` | No | Top selling products |
| GET | `/products/new-arrivals` | No | Latest products |
| GET | `/products/sale` | No | Products on sale |
| GET | `/products/search` | No | Full-text search |
| GET | `/products/filter` | No | Advanced filtering |
| GET | `/products/related` | No | Related products |

### GET /products

Query parameters:
- `category` — Filter by category slug
- `gender` — Filter by gender (male/female/unisex)
- `sort` — `newest` | `price-asc` | `price-desc` | `rating` | `bestseller`
- `q` — Search query
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 20)

```json
// Response 200
{
  "products": [
    {
      "id": "...",
      "name": "Áo thun basic",
      "slug": "ao-thun-basic",
      "price": 299000,
      "salePrice": 249000,
      "images": ["url1", "url2"],
      "category": { "id": "...", "name": "...", "slug": "..." },
      "variants": [{ "size": "M", "color": "Black", "stock": 10 }]
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 50, "totalPages": 3 }
}
```

---

## Cart

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/cart` | Yes | Get cart items |
| POST | `/cart` | Yes | Add item to cart |
| PATCH | `/cart` | Yes | Update item quantity |
| DELETE | `/cart` | Yes | Remove item(s) |

### POST /cart

```json
// Request
{ "productId": "...", "size": "M", "color": "Black", "quantity": 1 }

// Response 200
{ "success": true }
```

### PATCH /cart

```json
// Request (set quantity, 0 = remove)
{ "productId": "...", "size": "M", "color": "Black", "quantity": 2 }
```

### DELETE /cart

Query parameters:
- `productId` + `size` + `color` — Remove specific item
- No params — Clear entire cart

---

## Orders

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/orders` | Yes | List user's orders |
| GET | `/orders/:id` | Yes | Order detail |
| POST | `/orders` | Yes | Create order |
| POST | `/orders/cancel` | Yes | Cancel order |

### POST /orders

```json
// Request
{
  "items": [{ "productId": "...", "size": "M", "color": "Black", "quantity": 1 }],
  "address": {
    "fullName": "Nguyễn Văn A",
    "phone": "0901234567",
    "province": "TP.HCM",
    "district": "Quận 1",
    "ward": "Phường Bến Nghé",
    "street": "123 Lê Lợi"
  },
  "paymentMethod": "COD",
  "couponCode": "SALE10",
  "note": "Giao giờ hành chính"
}

// Response 201
{ "id": "...", "total": 519000, "shippingFee": 0, "discount": 50000, ... }
```

---

## Wishlist

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/wishlist` | Yes | Get wishlist |
| POST | `/wishlist` | Yes | Add/remove product |

---

## Categories

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/categories` | No | List all categories |

---

## Addresses

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/addresses` | Yes | List user addresses |
| POST | `/addresses` | Yes | Create address |
| PUT | `/addresses/:id` | Yes | Update address |
| DELETE | `/addresses/:id` | Yes | Delete address |

---

## Coupons

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/coupons/validate` | Yes | Validate coupon code |

```json
// Request
{ "code": "SALE10", "total": 500000 }

// Response 200
{ "valid": true, "discount": 50000, "type": "PERCENT" }
```

---

## Other

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | No | Health check |
| POST | `/contact` | No | Submit contact form |
| POST | `/newsletter` | No | Subscribe to newsletter |
| POST | `/chat` | No | Send chat message |
| GET | `/search` | No | Global search |
| GET | `/profile` | Yes | Get user profile |
| PUT | `/profile` | Yes | Update profile |

---

## Admin Endpoints

All admin endpoints require `role: "ADMIN"`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/stats` | Dashboard statistics |
| GET | `/admin/products` | List all products |
| POST | `/admin/products` | Create product |
| PUT | `/admin/products/:id` | Update product |
| DELETE | `/admin/products/:id` | Delete product |
| GET | `/admin/orders` | List all orders |
| GET | `/admin/orders/:id` | Order detail |
| PATCH | `/admin/orders/:id/status` | Update order status |

### PATCH /admin/orders/:id/status

```json
// Request
{ "status": "SHIPPED" }

// Statuses: PENDING → CONFIRMED → SHIPPED → DELIVERED | CANCELLED
```

---

## Error Responses

All errors follow this format:

```json
{ "error": "Human-readable message" }
```

| Status | Meaning |
|--------|---------|
| 400 | Invalid input (Zod validation failed) |
| 401 | Not authenticated |
| 403 | Not authorized (admin required) |
| 404 | Resource not found |
| 429 | Rate limited |
| 500 | Server error |

---

## Rate Limiting

All endpoints are rate-limited via middleware:
- General: 100 requests/minute per IP
- Auth endpoints: 10 requests/minute per IP
