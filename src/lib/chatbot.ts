import { db } from "@/lib/db";
import type { Product } from "@/types";

// ─── Intent Detection ────────────────────────────────────────────────────────

type Intent =
  | "greeting"
  | "product_query"
  | "size_advice"
  | "order_status"
  | "faq_shipping"
  | "faq_returns"
  | "faq_payment"
  | "recommendation"
  | "unknown";

const PATTERNS: Record<Intent, RegExp[]> = {
  greeting: [
    /^(xin chào|hello|hi|chào|hey|alo|helo)/i,
    /^(chào bạn|chào shop|xin chào shop)/i,
  ],
  size_advice: [
    /size|cỡ|kích thước|số đo|cm|kg|cân nặng|chiều cao|mặc size nào|chọn size/i,
    /tư vấn.*(size|cỡ|áo|quần)|hướng dẫn.*(size|cỡ)/i,
    /tư vấn/i,
  ],
  recommendation: [
    /gợi ý|đề xuất|recommend|nên mua|phù hợp|cho (nam|nữ)|bộ sưu tập|mới nhất|bán chạy/i,
    /sản phẩm.*(hot|nổi bật|tốt)|có gì.*mới|xem.*gì/i,
  ],
  product_query: [
    /tìm|tìm kiếm|có bán|có không|sản phẩm|áo|quần|đồ lót|bra|brief|boxer|legging|tất|vớ/i,
    /giá|bao nhiêu tiền|mua|order/i,
  ],
  order_status: [
    /đơn hàng|đơn của tôi|theo dõi đơn|trạng thái đơn|mã đơn|order.*id|kiểm tra đơn/i,
  ],
  faq_shipping: [
    /giao hàng|vận chuyển|ship|shipping|bao lâu|mấy ngày|phí ship|phí giao/i,
  ],
  faq_returns: [
    /đổi trả|hoàn hàng|trả hàng|đổi hàng|return|refund|hoàn tiền/i,
  ],
  faq_payment: [
    /thanh toán|payment|cod|chuyển khoản|bank|thẻ|momo|zalopay|phương thức/i,
  ],
  unknown: [],
};

function detectIntent(message: string): Intent {
  const lower = message.toLowerCase().trim();
  for (const [intent, patterns] of Object.entries(PATTERNS) as [Intent, RegExp[]][]) {
    if (intent === "unknown") continue;
    if (patterns.some((p) => p.test(lower))) return intent;
  }
  return "unknown";
}

// ─── Size Guide ───────────────────────────────────────────────────────────────

const SIZE_GUIDE = {
  general: `📏 **Hướng dẫn chọn size ONFIT:**

| Size | Chiều cao | Cân nặng |
|------|-----------|----------|
| XS   | 150-155cm | 40-45kg  |
| S    | 155-160cm | 45-52kg  |
| M    | 160-165cm | 52-60kg  |
| L    | 165-170cm | 60-68kg  |
| XL   | 170-175cm | 68-75kg  |
| XXL  | 175-180cm | 75-85kg  |

💡 Nếu bạn ở giữa 2 size, hãy chọn size lớn hơn để thoải mái hơn.`,

  bra: `📏 **Hướng dẫn chọn size áo ngực:**

Đo vòng ngực (cm) ngay dưới ngực:
- 68-72cm → Size 32 / XS
- 73-77cm → Size 34 / S
- 78-82cm → Size 36 / M
- 83-87cm → Size 38 / L
- 88-92cm → Size 40 / XL

💡 Mẹo: Đo vào buổi sáng khi cơ thể chưa bị ảnh hưởng bởi hoạt động.`,
};

// ─── FAQ Answers ──────────────────────────────────────────────────────────────

const FAQ = {
  shipping: `🚚 **Thông tin giao hàng:**

- Thời gian giao hàng: **2-5 ngày làm việc**
- Nội thành TP.HCM & Hà Nội: 1-2 ngày
- Tỉnh thành khác: 3-5 ngày
- **Miễn phí ship** cho đơn hàng từ **500.000đ**
- Phí ship tiêu chuẩn: 30.000đ`,

  returns: `🔄 **Chính sách đổi trả:**

- Thời gian đổi trả: **30 ngày** kể từ ngày nhận hàng
- Điều kiện: Sản phẩm còn nguyên tem, chưa qua sử dụng
- Lý do chấp nhận: Lỗi sản xuất, sai size, sai màu
- Liên hệ: Nhắn tin fanpage hoặc gọi hotline **1800-xxxx**
- Hoàn tiền trong vòng **3-5 ngày làm việc**`,

  payment: `💳 **Phương thức thanh toán:**

- 💵 **COD** - Thanh toán khi nhận hàng
- 🏦 **Chuyển khoản ngân hàng** - Vietcombank, Techcombank, MB Bank
- 📱 **Ví điện tử** - MoMo, ZaloPay, VNPay
- 💳 **Thẻ tín dụng/ghi nợ** - Visa, Mastercard

Tất cả giao dịch đều được bảo mật SSL 256-bit.`,
};

// ─── Product Search ───────────────────────────────────────────────────────────

async function searchProducts(query: string): Promise<Product[]> {
  const keywords = query
    .toLowerCase()
    .replace(/tìm|kiếm|có bán|có không|mua|giá|bao nhiêu/gi, "")
    .trim();

  if (!keywords) return [];

  const results = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: keywords } },
        { description: { contains: keywords } },
        { category: { name: { contains: keywords } } },
      ],
    },
    include: { category: true, variants: true },
    take: 4,
    orderBy: { isBestseller: "desc" },
  });

  return results.map((p) => ({ ...p, images: JSON.parse(p.images) })) as Product[];
}

// ─── Recommendations ──────────────────────────────────────────────────────────

async function getRecommendations(message: string): Promise<Product[]> {
  const isNam = /nam|men|boy/i.test(message);
  const isNu = /nữ|women|girl|lady/i.test(message);
  const isNew = /mới nhất|new/i.test(message);
  const isBestseller = /bán chạy|bestseller|phổ biến/i.test(message);

  const where: Record<string, unknown> = {};
  if (isNam) where.category = { gender: "NAM" };
  else if (isNu) where.category = { gender: "NU" };
  if (isNew) where.isNew = true;
  if (isBestseller) where.isBestseller = true;
  if (!isNew && !isBestseller) where.isFeatured = true;

  let products = await db.product.findMany({
    where,
    include: { category: true, variants: true },
    take: 4,
    orderBy: { rating: "desc" },
  });

  if (!products.length) {
    const fallback: Record<string, unknown> = {};
    if (isNam) fallback.category = { gender: "NAM" };
    else if (isNu) fallback.category = { gender: "NU" };
    products = await db.product.findMany({
      where: fallback,
      include: { category: true, variants: true },
      take: 4,
      orderBy: { createdAt: "desc" },
    });
  }

  return products.map((p) => ({ ...p, images: JSON.parse(p.images) })) as Product[];
}

// ─── Order Lookup ─────────────────────────────────────────────────────────────

async function lookupOrder(message: string, userId?: string) {
  if (!userId) {
    return {
      reply: "🔐 Bạn cần **đăng nhập** để tra cứu đơn hàng. Vui lòng đăng nhập và thử lại.",
      quickReplies: ["Đăng nhập", "Quay lại"],
    };
  }

  // Try to extract order ID from message
  const idMatch = message.match(/[a-z0-9]{20,}/i);

  if (idMatch) {
    const order = await db.order.findFirst({
      where: { id: idMatch[0], userId },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      return {
        reply: `❌ Không tìm thấy đơn hàng **${idMatch[0]}**. Vui lòng kiểm tra lại mã đơn hàng.`,
        quickReplies: ["Xem tất cả đơn hàng", "Liên hệ hỗ trợ"],
      };
    }

    const statusMap: Record<string, string> = {
      PENDING: "⏳ Chờ xác nhận",
      CONFIRMED: "✅ Đã xác nhận",
      SHIPPING: "🚚 Đang giao hàng",
      DELIVERED: "📦 Đã giao hàng",
      CANCELLED: "❌ Đã hủy",
    };

    return {
      reply: `📋 **Đơn hàng #${order.id.slice(-8).toUpperCase()}**\n\n` +
        `Trạng thái: ${statusMap[order.status] || order.status}\n` +
        `Tổng tiền: **${order.total.toLocaleString("vi-VN")}đ**\n` +
        `Ngày đặt: ${new Date(order.createdAt).toLocaleDateString("vi-VN")}`,
      quickReplies: ["Xem chi tiết", "Đơn hàng khác"],
    };
  }

  // Show recent orders
  const orders = await db.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  if (!orders.length) {
    return {
      reply: "📭 Bạn chưa có đơn hàng nào. Hãy khám phá sản phẩm của chúng tôi nhé!",
      quickReplies: ["Xem sản phẩm", "Gợi ý cho tôi"],
    };
  }

  const statusMap: Record<string, string> = {
    PENDING: "⏳ Chờ xác nhận",
    CONFIRMED: "✅ Đã xác nhận",
    SHIPPING: "🚚 Đang giao",
    DELIVERED: "📦 Đã giao",
    CANCELLED: "❌ Đã hủy",
  };

  const list = orders
    .map((o) => `• #${o.id.slice(-8).toUpperCase()} — ${statusMap[o.status] || o.status} — ${o.total.toLocaleString("vi-VN")}đ`)
    .join("\n");

  return {
    reply: `📋 **Đơn hàng gần đây của bạn:**\n\n${list}`,
    quickReplies: ["Tra cứu theo mã", "Liên hệ hỗ trợ"],
  };
}

// ─── Main Chatbot Handler ─────────────────────────────────────────────────────

export interface ChatResponse {
  reply: string;
  products?: Product[];
  quickReplies?: string[];
}

export async function handleChat(
  message: string,
  userId?: string
): Promise<ChatResponse> {
  const intent = detectIntent(message);

  switch (intent) {
    case "greeting":
      return {
        reply: `👋 Xin chào! Tôi là trợ lý ảo của **ONFIT**.\n\nTôi có thể giúp bạn:\n• Tìm kiếm sản phẩm\n• Tư vấn chọn size\n• Tra cứu đơn hàng\n• Giải đáp thắc mắc về giao hàng, đổi trả`,
        quickReplies: ["Tìm sản phẩm", "Tư vấn size", "Tra cứu đơn hàng", "Chính sách giao hàng"],
      };

    case "product_query": {
      const products = await searchProducts(message);
      if (products.length) {
        return {
          reply: `🛍️ Tìm thấy **${products.length} sản phẩm** phù hợp với yêu cầu của bạn:`,
          products,
          quickReplies: ["Xem thêm", "Lọc theo giá", "Gợi ý cho tôi"],
        };
      }
      return {
        reply: "😔 Xin lỗi, tôi không tìm thấy sản phẩm phù hợp. Bạn có thể mô tả chi tiết hơn không?",
        quickReplies: ["Đồ lót nam", "Đồ lót nữ", "Đồ mặc nhà", "Xem tất cả"],
      };
    }

    case "size_advice": {
      const isBra = /bra|áo ngực|áo lót/i.test(message);
      return {
        reply: isBra ? SIZE_GUIDE.bra : SIZE_GUIDE.general,
        quickReplies: ["Tìm sản phẩm", "Đổi trả nếu sai size?", "Liên hệ tư vấn"],
      };
    }

    case "order_status": {
      const result = await lookupOrder(message, userId);
      return result;
    }

    case "faq_shipping":
      return {
        reply: FAQ.shipping,
        quickReplies: ["Chính sách đổi trả", "Phương thức thanh toán", "Tìm sản phẩm"],
      };

    case "faq_returns":
      return {
        reply: FAQ.returns,
        quickReplies: ["Chính sách giao hàng", "Liên hệ hỗ trợ", "Tìm sản phẩm"],
      };

    case "faq_payment":
      return {
        reply: FAQ.payment,
        quickReplies: ["Chính sách giao hàng", "Chính sách đổi trả", "Tìm sản phẩm"],
      };

    case "recommendation": {
      const products = await getRecommendations(message);
      if (products.length) {
        return {
          reply: "✨ Đây là những sản phẩm tôi gợi ý cho bạn:",
          products,
          quickReplies: ["Xem thêm", "Lọc theo giá", "Tư vấn size"],
        };
      }
      return {
        reply: "😊 Hãy cho tôi biết bạn đang tìm kiếm gì (nam/nữ, loại sản phẩm...) để tôi gợi ý phù hợp hơn!",
        quickReplies: ["Gợi ý cho nam", "Gợi ý cho nữ", "Sản phẩm mới", "Bán chạy nhất"],
      };
    }

    default:
      return {
        reply: "🤔 Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Bạn có thể hỏi tôi về:\n• Sản phẩm và giá cả\n• Hướng dẫn chọn size\n• Chính sách giao hàng & đổi trả\n• Tra cứu đơn hàng",
        quickReplies: ["Tìm sản phẩm", "Tư vấn size", "Chính sách giao hàng", "Tra cứu đơn hàng"],
      };
  }
}
