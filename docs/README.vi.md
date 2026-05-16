<p align="center">
  🌐 <a href="../README.md">English</a> | <strong>Tiếng Việt</strong>
</p>

---

<p align="center">
  <img src="../public/icons/icon-192x192.svg" width="80" alt="ON/OFF Logo" />
</p>

<h1 align="center">ON/OFF</h1>

<p align="center">
  <strong>Nền tảng thương mại điện tử thời trang</strong><br/>
  Fashion E-commerce Platform
</p>

<p align="center">
  <a href="#tính-năng">Tính năng</a> •
  <a href="#công-nghệ">Công nghệ</a> •
  <a href="#bắt-đầu">Bắt đầu</a> •
  <a href="#triển-khai">Triển khai</a> •
  <a href="#đóng-góp">Đóng góp</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker" alt="Docker" />
  <img src="https://github.com/JasonTM17/ON-OFF_JS/actions/workflows/ci.yml/badge.svg" alt="CI" />
</p>

---

## Ảnh chụp màn hình

<p align="center">
  <img src="screenshots/homepage-scroll.gif" alt="Demo cuộn trang chủ" width="720"/>
  <br/><em>Trải nghiệm cuộn trang chủ</em>
</p>

<table>
  <tr>
    <td><img src="screenshots/homepage.png" alt="Trang chủ" width="400"/></td>
    <td><img src="screenshots/products.png" alt="Danh mục sản phẩm" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><em>Trang chủ với showcase thương hiệu</em></td>
    <td align="center"><em>Danh mục sản phẩm với bộ lọc</em></td>
  </tr>
  <tr>
    <td><img src="screenshots/product-detail.png" alt="Chi tiết sản phẩm" width="400"/></td>
    <td><img src="screenshots/checkout.png" alt="Giỏ hàng" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><em>Chi tiết sản phẩm với chọn size/màu sắc</em></td>
    <td align="center"><em>Giỏ hàng với tóm tắt đơn hàng</em></td>
  </tr>
  <tr>
    <td><img src="screenshots/admin-dashboard.png" alt="Đăng nhập" width="400"/></td>
    <td><img src="screenshots/mobile.png" alt="Giao diện di động" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><em>Xác thực & truy cập tài khoản</em></td>
    <td align="center"><em>Thiết kế responsive trên di động</em></td>
  </tr>
</table>

---

## Tổng quan

ON/OFF là nền tảng thương mại điện tử thời trang chuyên về đồ lót, đồ mặc nhà và phụ kiện thời trang. Được xây dựng bằng các công nghệ web hiện đại, tối ưu hóa hiệu suất, khả năng tiếp cận và mang lại trải nghiệm mua sắm cao cấp.

## Tính năng

- **Danh mục sản phẩm** — Duyệt theo danh mục, lọc theo size/màu sắc/giá, tìm kiếm toàn văn
- **Giỏ hàng** — Giỏ hàng lưu trữ bền vững với cập nhật thời gian thực, hỗ trợ mã giảm giá
- **Yêu thích & So sánh** — Lưu sản phẩm yêu thích, so sánh sản phẩm song song
- **Tài khoản người dùng** — Đăng ký, đăng nhập, lịch sử đơn hàng, quản lý địa chỉ
- **Thanh toán** — Quy trình thanh toán nhiều bước với xác nhận đơn hàng
- **Bảng điều khiển Admin** — Quản lý sản phẩm/đơn hàng/người dùng kèm phân tích dữ liệu
- **Chat trực tiếp** — Widget chat tích hợp với câu trả lời nhanh
- **PWA** — Ứng dụng web tiến bộ có thể cài đặt với hỗ trợ offline
- **SEO** — Dữ liệu có cấu trúc JSON-LD, thẻ meta, sitemap
- **Bảo mật** — Giới hạn tốc độ, tiêu đề CSP, HSTS, xác thực đầu vào

## Công nghệ

| Tầng | Công nghệ |
|------|-----------|
| Framework | Next.js 15 (App Router, Server Components) |
| Ngôn ngữ | TypeScript 5 (strict mode) |
| Giao diện | Tailwind CSS 4 |
| Cơ sở dữ liệu | SQLite + Prisma ORM |
| Xác thực | JWT (jose) + httpOnly cookies |
| Trạng thái | Zustand |
| Hoạt ảnh | Framer Motion |
| Triển khai | Docker + Nginx |

## Bắt đầu

### Yêu cầu

- Node.js 20+
- npm 9+

### Cài đặt

```bash
git clone https://github.com/JasonTM17/ON-OFF_JS.git
cd ON-OFF_JS
npm install
```

### Thiết lập cơ sở dữ liệu

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### Phát triển

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

### Biến môi trường

Tạo file `.env` tại thư mục gốc của dự án:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-minimum-32-characters"
```

Tùy chọn:

```env
N8N_WEBHOOK_URL="https://your-n8n-instance/webhook/chat"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

## Lệnh

| Lệnh | Mô tả |
|------|-------|
| `npm run dev` | Khởi động server phát triển |
| `npm run build` | Build production |
| `npm start` | Khởi động server production |
| `npm run lint` | Chạy ESLint |
| `npx prisma studio` | Mở giao diện quản lý cơ sở dữ liệu |
| `npx prisma db seed` | Nạp dữ liệu mẫu |

## Triển khai

### Docker Compose

```bash
docker compose up -d
```

Lệnh này khởi động ứng dụng trên cổng `3000` phía sau Nginx reverse proxy trên cổng `80`.

### Docker Hub

```bash
# Frontend (Next.js UI)
docker pull nguyenson1710/onoff-frontend:latest

# Backend (API + Database)
docker pull nguyenson1710/onoff-backend:latest

# Nginx (Reverse Proxy)
docker pull nguyenson1710/onoff-nginx:latest
```

### Thủ công

```bash
npm run build
npm start
```

## Cấu trúc dự án

```
src/
├── app/                    # Trang & API routes (App Router)
│   ├── (shop)/            # Trang cửa hàng (sản phẩm, giỏ hàng, thanh toán)
│   ├── (account)/         # Trang tài khoản (hồ sơ, đơn hàng)
│   ├── (auth)/            # Xác thực (đăng nhập, đăng ký)
│   ├── admin/             # Bảng điều khiển admin
│   └── api/               # REST API endpoints
├── components/            # React components
│   ├── ui/               # Các thành phần hệ thống thiết kế
│   ├── layout/           # Header, Footer, Navigation
│   ├── product/          # Card sản phẩm, thư viện ảnh
│   └── home/             # Các section trang chủ
├── hooks/                # Custom React hooks
├── lib/                  # Tiện ích (auth, db, helpers)
├── store/                # Zustand state stores
└── types/                # Định nghĩa kiểu TypeScript
```

## Tài khoản demo

Nạp dữ liệu trước: `npx prisma db seed`

| Vai trò | Email |
|---------|-------|
| Admin | admin@onoff.vn |
| Người dùng | user@onoff.vn |

Mật khẩu mặc định được thiết lập trong `prisma/seed.ts`.

## Đóng góp

Xem [CONTRIBUTING.md](../CONTRIBUTING.md) để biết hướng dẫn phát triển.

## Bảo mật

Xem [SECURITY.md](../SECURITY.md) để biết cách báo cáo lỗ hổng bảo mật.

## Giấy phép

Dự án này được cấp phép theo Giấy phép MIT — xem [LICENSE](../LICENSE) để biết chi tiết.

## Tác giả

**Nguyễn Sơn** — [@JasonTM17](https://github.com/JasonTM17)

---

<p align="center">
  Được làm với tâm huyết tại Việt Nam 🇻🇳
</p>
