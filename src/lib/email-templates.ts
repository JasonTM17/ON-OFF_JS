type OrderItem = {
  name?: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
};

type OrderEmailData = {
  id: string;
  items: OrderItem[];
  total: number;
  shippingFee: number;
  address?: {
    fullName: string;
    phone: string;
    street: string;
    ward: string;
    district: string;
    province: string;
  } | null;
};

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
}

const baseStyle = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
`;

const containerStyle = `
  max-width: 600px;
  margin: 32px auto;
  background: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
`;

const headerStyle = `
  background-color: #111111;
  padding: 28px 40px;
  text-align: center;
`;

const logoStyle = `
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 4px;
  text-decoration: none;
  text-transform: uppercase;
`;

const bodyStyle = `
  padding: 40px;
  color: #333333;
  line-height: 1.6;
`;

const headingStyle = `
  font-size: 20px;
  font-weight: 600;
  color: #111111;
  margin: 0 0 16px;
`;

const textStyle = `
  font-size: 14px;
  color: #555555;
  margin: 0 0 12px;
`;

const dividerStyle = `
  border: none;
  border-top: 1px solid #eeeeee;
  margin: 24px 0;
`;

const tableStyle = `
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const thStyle = `
  text-align: left;
  padding: 8px 0;
  border-bottom: 1px solid #eeeeee;
  color: #888888;
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const tdStyle = `
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  color: #333333;
  vertical-align: top;
`;

const totalRowStyle = `
  font-weight: 600;
  color: #111111;
  font-size: 15px;
`;

const buttonStyle = `
  display: inline-block;
  background-color: #111111;
  color: #ffffff;
  text-decoration: none;
  padding: 12px 28px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const footerStyle = `
  background-color: #f9f9f9;
  padding: 24px 40px;
  text-align: center;
  font-size: 12px;
  color: #aaaaaa;
  border-top: 1px solid #eeeeee;
`;

function wrapEmail(content: string): string {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ON/OFF</title>
</head>
<body style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${headerStyle}">
      <span style="${logoStyle}">ON/OFF</span>
    </div>
    <div style="${bodyStyle}">
      ${content}
    </div>
    <div style="${footerStyle}">
      <p style="margin: 0 0 4px;">© 2026 ON/OFF. Tất cả quyền được bảo lưu.</p>
      <p style="margin: 0;">Hà Nội, Việt Nam · onoff.vn</p>
    </div>
  </div>
</body>
</html>`;
}

export function orderConfirmation(order: OrderEmailData): string {
  const itemRows = order.items
    .map(
      (item) => `
      <tr>
        <td style="${tdStyle}">${item.name ?? "Sản phẩm"}<br/>
          <span style="color:#888;font-size:12px;">${item.size} / ${item.color}</span>
        </td>
        <td style="${tdStyle} text-align:center;">${item.quantity}</td>
        <td style="${tdStyle} text-align:right;">${formatPrice(item.price)}</td>
      </tr>`
    )
    .join("");

  const addressBlock = order.address
    ? `<p style="${textStyle}">
        <strong>Địa chỉ giao hàng:</strong><br/>
        ${order.address.fullName} · ${order.address.phone}<br/>
        ${order.address.street}, ${order.address.ward},<br/>
        ${order.address.district}, ${order.address.province}
      </p>`
    : "";

  const content = `
    <h1 style="${headingStyle}">Đặt hàng thành công!</h1>
    <p style="${textStyle}">Cảm ơn bạn đã mua sắm tại ON/OFF. Đơn hàng của bạn đã được xác nhận.</p>
    <p style="${textStyle}">Mã đơn hàng: <strong>#${order.id.slice(-8).toUpperCase()}</strong></p>
    <hr style="${dividerStyle}" />
    <table style="${tableStyle}">
      <thead>
        <tr>
          <th style="${thStyle}">Sản phẩm</th>
          <th style="${thStyle} text-align:center;">SL</th>
          <th style="${thStyle} text-align:right;">Giá</th>
        </tr>
      </thead>
      <tbody>
        ${itemRows}
      </tbody>
    </table>
    <hr style="${dividerStyle}" />
    <table style="${tableStyle}">
      <tr>
        <td style="padding:4px 0; color:#555; font-size:14px;">Phí vận chuyển</td>
        <td style="padding:4px 0; text-align:right; font-size:14px; color:#555;">
          ${order.shippingFee === 0 ? "Miễn phí" : formatPrice(order.shippingFee)}
        </td>
      </tr>
      <tr style="${totalRowStyle}">
        <td style="padding:8px 0;">Tổng cộng</td>
        <td style="padding:8px 0; text-align:right;">${formatPrice(order.total)}</td>
      </tr>
    </table>
    <hr style="${dividerStyle}" />
    ${addressBlock}
    <p style="${textStyle}">Chúng tôi sẽ thông báo khi đơn hàng được giao cho đơn vị vận chuyển.</p>
  `;

  return wrapEmail(content);
}

export function welcomeEmail(name: string): string {
  const content = `
    <h1 style="${headingStyle}">Chào mừng đến với ON/OFF, ${name}!</h1>
    <p style="${textStyle}">
      Tài khoản của bạn đã được tạo thành công. Khám phá bộ sưu tập thời trang mới nhất
      và tận hưởng trải nghiệm mua sắm tuyệt vời tại ON/OFF.
    </p>
    <hr style="${dividerStyle}" />
    <p style="${textStyle}">Với tài khoản ON/OFF, bạn có thể:</p>
    <ul style="font-size:14px; color:#555555; padding-left:20px; margin:0 0 20px;">
      <li style="margin-bottom:6px;">Theo dõi đơn hàng theo thời gian thực</li>
      <li style="margin-bottom:6px;">Lưu địa chỉ giao hàng yêu thích</li>
      <li style="margin-bottom:6px;">Quản lý danh sách yêu thích</li>
      <li style="margin-bottom:6px;">Nhận ưu đãi độc quyền dành cho thành viên</li>
    </ul>
    <p style="margin: 0 0 24px;">
      <a href="https://onoff.vn/products" style="${buttonStyle}">Khám phá ngay</a>
    </p>
    <p style="${textStyle}">Nếu bạn cần hỗ trợ, hãy liên hệ với chúng tôi qua email support@onoff.vn.</p>
  `;

  return wrapEmail(content);
}

export function passwordReset(resetUrl: string): string {
  const content = `
    <h1 style="${headingStyle}">Đặt lại mật khẩu</h1>
    <p style="${textStyle}">
      Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.
      Nhấn vào nút bên dưới để tạo mật khẩu mới.
    </p>
    <p style="margin: 24px 0;">
      <a href="${resetUrl}" style="${buttonStyle}">Đặt lại mật khẩu</a>
    </p>
    <hr style="${dividerStyle}" />
    <p style="${textStyle}">
      Liên kết này sẽ hết hạn sau <strong>1 giờ</strong>.
    </p>
    <p style="${textStyle}">
      Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.
      Tài khoản của bạn vẫn an toàn.
    </p>
    <p style="font-size:12px; color:#aaaaaa; margin-top:16px;">
      Hoặc sao chép đường dẫn sau vào trình duyệt:<br/>
      <span style="word-break:break-all;">${resetUrl}</span>
    </p>
  `;

  return wrapEmail(content);
}
