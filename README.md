# ON/OFF — Thương mại điện tử thời trang

Website thương mại điện tử bán đồ lót, đồ mặc nhà và phụ kiện thời trang. Thiết kế tối giản, sang trọng, lấy cảm hứng từ phong cách ON/OFF.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** SQLite + Prisma ORM
- **Auth:** JWT (jose) + httpOnly cookies
- **State:** Zustand (cart, wishlist, compare, notifications)
- **Animation:** Framer Motion
- **Deployment:** Docker + Nginx

## Cài đặt

```bash
# Clone repo
git clone https://github.com/JasonTM17/ON-OFF_JS.git
cd ON-OFF_JS

# Cài dependencies
npm install

# Tạo database và seed data
npx prisma generate
npx prisma db push
npx prisma db seed

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem website.

## Biến môi trường

Tạo file `.env` tại root:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here"
```

## Scripts

| Lệnh | Mô tả |
|-------|--------|
| `npm run dev` | Chạy development server |
| `npm run build` | Build production |
| `npm start` | Chạy production server |
| `npm run lint` | Kiểm tra linting |
| `npx prisma studio` | Mở Prisma Studio |

## Cấu trúc thư mục

```
src/
├── app/                    # Pages (App Router)
│   ├── (shop)/            # Trang shop (products, cart, checkout...)
│   ├── (account)/         # Trang tài khoản
│   ├── (auth)/            # Đăng nhập, đăng ký
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # UI primitives
│   ├── layout/           # Header, Footer, Navigation
│   ├── product/          # Product-related components
│   ├── cart/             # Cart components
│   ├── checkout/         # Checkout components
│   ├── account/          # Account components
│   ├── auth/             # Auth components
│   └── home/            # Homepage sections
├── hooks/                # Custom React hooks
├── lib/                  # Utilities, helpers, config
├── store/                # Zustand stores
└── types/                # TypeScript types
```

## Tính năng

- Trang chủ với hero banner, danh mục, sản phẩm nổi bật
- Danh mục sản phẩm với filter, sort, search, pagination
- Chi tiết sản phẩm với gallery, chọn size/màu, sản phẩm liên quan
- Giỏ hàng với mã giảm giá, tính phí vận chuyển
- Checkout với form địa chỉ, chọn thanh toán
- Trang đặt hàng thành công
- Tài khoản: đăng nhập/đăng ký, đơn hàng, địa chỉ, wishlist
- Admin: quản lý sản phẩm, đơn hàng, khách hàng, thống kê
- Responsive hoàn chỉnh (mobile/tablet/desktop)
- PWA support (offline caching)
- SEO tối ưu (sitemap, robots.txt, metadata)

## Docker

```bash
# Build và chạy với Docker Compose
docker compose up --build
```

Website sẽ chạy tại [http://localhost](http://localhost) (port 80).

## Tài khoản demo

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@onoff.vn | admin123 |
| User | user@onoff.vn | user123 |
