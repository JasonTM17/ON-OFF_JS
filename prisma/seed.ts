import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clean
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.user.deleteMany();

  // Users
  const adminPass = await bcrypt.hash("admin123", 10);
  const userPass = await bcrypt.hash("user123", 10);

  await prisma.user.create({
    data: { email: "admin@onoff.vn", password: adminPass, name: "Admin ON/OFF", role: "ADMIN" },
  });
  await prisma.user.create({
    data: { email: "user@onoff.vn", password: userPass, name: "Nguyễn Văn A", role: "USER" },
  });

  // Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: "Đồ lót nam", slug: "do-lot-nam", gender: "nam", sortOrder: 1, description: "Boxer, brief, trunk cho nam giới" } }),
    prisma.category.create({ data: { name: "Đồ lót nữ", slug: "do-lot-nu", gender: "nu", sortOrder: 2, description: "Bra, panty, bodysuit cho nữ" } }),
    prisma.category.create({ data: { name: "Đồ mặc nhà", slug: "do-mac-nha", gender: "unisex", sortOrder: 3, description: "Pyjama, áo thun, quần short mặc nhà" } }),
    prisma.category.create({ data: { name: "Phụ kiện", slug: "phu-kien", gender: "unisex", sortOrder: 4, description: "Tất, khăn, túi giặt" } }),
  ]);

  const [catNam, catNu, catNha, catPK] = categories;

  const COLORS = [
    { name: "Đen", hex: "#1a1a1a" },
    { name: "Trắng", hex: "#f5f5f5" },
    { name: "Be", hex: "#d4b896" },
    { name: "Xám", hex: "#6b7280" },
    { name: "Xanh navy", hex: "#1e3a5f" },
  ];
  const SIZES = ["S", "M", "L", "XL"];

  const IMG_NAM    = ["https://2885966831.e.cdneverest.net/catalog/product/cache/700_1050/1/8/18uo25a024-sk001-3d-2.webp", "https://2885966831.e.cdneverest.net/catalog/product/cache/700_1050/1/8/18uq25a023-sa313-240326-1.webp"];
  const IMG_NU_AO  = ["https://2885966831.e.cdneverest.net/catalog/product/cache/700_1050/1/6/16uc25a576-sn044-1.webp", "https://2885966831.e.cdneverest.net/catalog/product/cache/700_1050/1/6/16uc25a576-sm220-1.webp"];
  const IMG_NU_LOT = ["https://2885966831.e.cdneverest.net/catalog/product/cache/700_1050/1/6/16uq26a575-sy306-1.webp", "https://2885966831.e.cdneverest.net/catalog/product/cache/700_1050/1/6/16uc26a574-sk124-1_1_1_1.webp"];
  const IMG_NHA    = ["https://2885966831.e.cdneverest.net/catalog/product/cache/700_1050/1/6/16it25w006-sa079.webp", "https://2885966831.e.cdneverest.net/catalog/product/cache/700_1050/1/6/16ia25s020-se091-1.webp"];
  const IMG_PK     = ["https://2885966831.e.cdneverest.net/catalog/product/cache/700_1050/1/8/18ar23a112-sk002-3d.webp", "https://2885966831.e.cdneverest.net/catalog/product/cache/700_1050/1/8/18aq23a151-sa001-3d.webp"];

  interface ProductSeed {
    name: string;
    slug: string;
    description: string;
    material: string;
    price: number;
    salePrice: number | null;
    categoryId: string;
    isFeatured: boolean;
    isNew: boolean;
    isBestseller: boolean;
    rating: number;
    reviewCount: number;
    colors: { name: string; hex: string }[];
    images?: string[];
  }

  const productData: ProductSeed[] = [
    // Nam - 6 sản phẩm
    { name: "Boxer Cotton Premium", slug: "boxer-cotton-premium", description: "Boxer cotton co giãn 4 chiều, đường may phẳng không gây khó chịu. Lưng thun mềm mại, thoáng khí suốt ngày dài.", material: "95% Cotton, 5% Spandex", price: 189000, salePrice: null, categoryId: catNam.id, isFeatured: true, isNew: false, isBestseller: true, rating: 4.8, reviewCount: 234, colors: [COLORS[0], COLORS[1], COLORS[3]], images: IMG_NAM },
    { name: "Brief Modal Siêu Nhẹ", slug: "brief-modal-sieu-nhe", description: "Brief modal mềm mịn như lụa, trọng lượng siêu nhẹ. Thiết kế ôm vừa vặn, không hằn viền.", material: "92% Modal, 8% Elastane", price: 159000, salePrice: 129000, categoryId: catNam.id, isFeatured: false, isNew: true, isBestseller: false, rating: 4.6, reviewCount: 89, colors: [COLORS[0], COLORS[2], COLORS[4]], images: IMG_NAM },
    { name: "Trunk Bamboo Everyday", slug: "trunk-bamboo-everyday", description: "Trunk từ sợi tre tự nhiên, kháng khuẩn và thấm hút tốt. Phom dáng vừa vặn, phù hợp mọi hoạt động.", material: "70% Bamboo, 25% Cotton, 5% Spandex", price: 219000, salePrice: null, categoryId: catNam.id, isFeatured: true, isNew: false, isBestseller: true, rating: 4.9, reviewCount: 312, colors: [COLORS[0], COLORS[1], COLORS[2], COLORS[3], COLORS[4]], images: IMG_NAM },
    { name: "Boxer Brief Sport", slug: "boxer-brief-sport", description: "Boxer brief thể thao với công nghệ quick-dry. Đường may flatlock giảm ma sát khi vận động.", material: "88% Polyester, 12% Spandex", price: 249000, salePrice: 199000, categoryId: catNam.id, isFeatured: false, isNew: true, isBestseller: false, rating: 4.7, reviewCount: 156, colors: [COLORS[0], COLORS[3], COLORS[4]], images: IMG_NAM },
    { name: "Áo thun lót cổ tròn", slug: "ao-thun-lot-co-tron-nam", description: "Áo thun lót cotton mịn, cổ tròn vừa vặn. Mặc trong áo sơ mi hoặc mặc nhà đều thoải mái.", material: "100% Cotton Combed", price: 149000, salePrice: null, categoryId: catNam.id, isFeatured: false, isNew: false, isBestseller: true, rating: 4.5, reviewCount: 445, colors: [COLORS[0], COLORS[1], COLORS[3]], images: IMG_NAM },
    { name: "Áo ba lỗ Cotton", slug: "ao-ba-lo-cotton-nam", description: "Áo ba lỗ cotton thoáng mát, phom rộng thoải mái. Lý tưởng cho mùa hè hoặc mặc khi tập gym.", material: "100% Cotton", price: 129000, salePrice: null, categoryId: catNam.id, isFeatured: false, isNew: false, isBestseller: false, rating: 4.4, reviewCount: 78, colors: [COLORS[0], COLORS[1]], images: IMG_NAM },

    // Nữ - 7 sản phẩm
    { name: "Bra Không Gọng T-Shirt", slug: "bra-khong-gong-tshirt", description: "Bra không gọng với cup mỏng nhẹ, form tự nhiên. Mặc với áo T-shirt không lộ đường viền.", material: "85% Nylon, 15% Spandex", price: 329000, salePrice: null, categoryId: catNu.id, isFeatured: true, isNew: false, isBestseller: true, rating: 4.8, reviewCount: 567, colors: [COLORS[0], COLORS[1], COLORS[2]], images: IMG_NU_AO },
    { name: "Bralette Ren Thanh Lịch", slug: "bralette-ren-thanh-lich", description: "Bralette ren mềm mại, thiết kế thanh lịch có thể mix với áo khoác. Không đệm, tôn dáng tự nhiên.", material: "80% Nylon, 20% Elastane", price: 289000, salePrice: 239000, categoryId: catNu.id, isFeatured: true, isNew: true, isBestseller: false, rating: 4.7, reviewCount: 198, colors: [COLORS[0], COLORS[1], COLORS[2]], images: IMG_NU_AO },
    { name: "Quần lót Bikini Seamless", slug: "quan-lot-bikini-seamless", description: "Quần lót bikini không đường may, siêu mỏng nhẹ. Mặc với váy bó hay quần legging đều không lộ.", material: "90% Nylon, 10% Spandex", price: 139000, salePrice: null, categoryId: catNu.id, isFeatured: false, isNew: false, isBestseller: true, rating: 4.6, reviewCount: 890, colors: [COLORS[0], COLORS[1], COLORS[2], COLORS[3]], images: IMG_NU_LOT },
    { name: "Quần lót Hipster Cotton", slug: "quan-lot-hipster-cotton", description: "Quần lót hipster cotton organic, lưng thun mềm không hằn. Thoáng khí, phù hợp mặc hàng ngày.", material: "95% Organic Cotton, 5% Elastane", price: 119000, salePrice: null, categoryId: catNu.id, isFeatured: false, isNew: false, isBestseller: false, rating: 4.5, reviewCount: 234, colors: [COLORS[0], COLORS[1], COLORS[2], COLORS[3], COLORS[4]], images: IMG_NU_LOT },
    { name: "Bodysuit Cổ V", slug: "bodysuit-co-v", description: "Bodysuit cổ V thanh lịch, chất liệu mềm mịn ôm body. Phù hợp mặc đi làm hoặc đi chơi.", material: "75% Modal, 25% Spandex", price: 399000, salePrice: 349000, categoryId: catNu.id, isFeatured: true, isNew: true, isBestseller: false, rating: 4.8, reviewCount: 67, colors: [COLORS[0], COLORS[1], COLORS[2]], images: IMG_NU_AO },
    { name: "Bra Thể Thao Medium Support", slug: "bra-the-thao-medium", description: "Bra thể thao hỗ trợ vừa, phù hợp yoga và pilates. Dây lưng rộng không đau vai.", material: "78% Polyester, 22% Spandex", price: 359000, salePrice: null, categoryId: catNu.id, isFeatured: false, isNew: false, isBestseller: true, rating: 4.7, reviewCount: 345, colors: [COLORS[0], COLORS[3], COLORS[4]], images: IMG_NU_AO },
    { name: "Set Bra + Quần Lót Basic", slug: "set-bra-quan-lot-basic", description: "Set đồ lót cơ bản gồm bra không gọng và quần bikini cùng tông. Tiết kiệm hơn mua lẻ.", material: "85% Cotton, 15% Spandex", price: 429000, salePrice: 379000, categoryId: catNu.id, isFeatured: true, isNew: false, isBestseller: true, rating: 4.9, reviewCount: 456, colors: [COLORS[0], COLORS[1], COLORS[2]], images: IMG_NU_LOT },

    // Đồ mặc nhà - 5 sản phẩm
    { name: "Pyjama Lụa Dài Tay", slug: "pyjama-lua-dai-tay", description: "Bộ pyjama lụa satin mềm mại, thiết kế cổ áo thanh lịch. Mặc ngủ hay mặc nhà đều sang trọng.", material: "100% Satin Silk", price: 699000, salePrice: 599000, categoryId: catNha.id, isFeatured: true, isNew: true, isBestseller: false, rating: 4.9, reviewCount: 123, colors: [COLORS[0], COLORS[1], COLORS[2]], images: IMG_NHA },
    { name: "Áo Thun Oversize Mặc Nhà", slug: "ao-thun-oversize-mac-nha", description: "Áo thun oversize cotton dày dặn, mặc nhà cực thoải mái. Phom rộng, tay lỡ, dài vừa đủ.", material: "100% Cotton 220gsm", price: 249000, salePrice: null, categoryId: catNha.id, isFeatured: false, isNew: false, isBestseller: true, rating: 4.6, reviewCount: 567, colors: [COLORS[0], COLORS[1], COLORS[3]], images: IMG_NHA },
    { name: "Quần Short Mặc Nhà", slug: "quan-short-mac-nha", description: "Quần short cotton mềm, lưng thun co giãn. Có túi hai bên tiện lợi.", material: "95% Cotton, 5% Spandex", price: 179000, salePrice: null, categoryId: catNha.id, isFeatured: false, isNew: false, isBestseller: false, rating: 4.4, reviewCount: 234, colors: [COLORS[0], COLORS[3], COLORS[4]], images: IMG_NHA },
    { name: "Set Đồ Ngủ Cotton", slug: "set-do-ngu-cotton", description: "Set đồ ngủ cotton gồm áo cộc tay và quần dài. Chất vải mềm, thoáng, phù hợp cả 4 mùa.", material: "100% Cotton Combed", price: 459000, salePrice: 399000, categoryId: catNha.id, isFeatured: true, isNew: false, isBestseller: true, rating: 4.7, reviewCount: 289, colors: [COLORS[0], COLORS[1], COLORS[3]], images: IMG_NHA },
    { name: "Áo Choàng Tắm Waffle", slug: "ao-choang-tam-waffle", description: "Áo choàng tắm vải waffle nhẹ, thấm hút nhanh. Thiết kế unisex, có dây thắt và túi.", material: "100% Cotton Waffle", price: 549000, salePrice: null, categoryId: catNha.id, isFeatured: false, isNew: true, isBestseller: false, rating: 4.5, reviewCount: 45, colors: [COLORS[1], COLORS[2]], images: IMG_NHA },

    // Phụ kiện - 4 sản phẩm
    { name: "Set 3 Đôi Tất Cổ Ngắn", slug: "set-3-doi-tat-co-ngan", description: "Set 3 đôi tất cổ ngắn cotton, đệm gót êm. Phù hợp mang giày sneaker hàng ngày.", material: "80% Cotton, 18% Polyester, 2% Spandex", price: 129000, salePrice: null, categoryId: catPK.id, isFeatured: false, isNew: false, isBestseller: true, rating: 4.5, reviewCount: 678, colors: [COLORS[0], COLORS[1], COLORS[3]], images: IMG_PK },
    { name: "Túi Giặt Đồ Lót", slug: "tui-giat-do-lot", description: "Túi lưới giặt đồ lót, bảo vệ quần áo khi giặt máy. Set 2 túi size khác nhau.", material: "Polyester Mesh", price: 89000, salePrice: null, categoryId: catPK.id, isFeatured: false, isNew: false, isBestseller: false, rating: 4.3, reviewCount: 123, colors: [COLORS[1]], images: IMG_PK },
    { name: "Set 5 Đôi Tất Công Sở", slug: "set-5-doi-tat-cong-so", description: "Set 5 đôi tất cổ cao cotton mịn, phù hợp mang giày tây. Đường may phẳng, không bí chân.", material: "75% Cotton, 23% Polyester, 2% Elastane", price: 199000, salePrice: 169000, categoryId: catPK.id, isFeatured: false, isNew: true, isBestseller: false, rating: 4.6, reviewCount: 234, colors: [COLORS[0], COLORS[3], COLORS[4]], images: IMG_PK },
    { name: "Hộp Quà Tặng ON/OFF", slug: "hop-qua-tang-onoff", description: "Hộp quà tặng cao cấp kèm thiệp. Phù hợp làm quà sinh nhật, kỷ niệm. Chọn sản phẩm bên trong tùy ý.", material: "Hộp giấy cao cấp", price: 59000, salePrice: null, categoryId: catPK.id, isFeatured: false, isNew: false, isBestseller: false, rating: 4.8, reviewCount: 89, colors: [COLORS[0], COLORS[1]], images: IMG_PK },
  ];

  for (const p of productData) {
    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        material: p.material,
        price: p.price,
        salePrice: p.salePrice,
        images: JSON.stringify(p.images ?? []),
        categoryId: p.categoryId,
        isFeatured: p.isFeatured,
        isNew: p.isNew,
        isBestseller: p.isBestseller,
        rating: p.rating,
        reviewCount: p.reviewCount,
      },
    });

    // Create variants
    for (const color of p.colors) {
      for (const size of SIZES) {
        await prisma.productVariant.create({
          data: {
            productId: product.id,
            size,
            color: color.name,
            colorHex: color.hex,
            stock: Math.floor(Math.random() * 50) + 10,
          },
        });
      }
    }
  }

  // Coupons
  await prisma.coupon.create({
    data: {
      code: "WELCOME10",
      discount: 10,
      type: "PERCENT",
      minOrder: 300000,
      maxDiscount: 100000,
      usageLimit: 1000,
      expiresAt: new Date("2025-12-31"),
    },
  });
  await prisma.coupon.create({
    data: {
      code: "FREESHIP",
      discount: 30000,
      type: "FIXED",
      minOrder: 500000,
      usageLimit: 500,
      expiresAt: new Date("2025-12-31"),
    },
  });

  console.log("Seed completed successfully!");
  console.log(`- ${productData.length} products`);
  console.log(`- ${categories.length} categories`);
  console.log(`- 2 users (admin@onoff.vn / admin123, user@onoff.vn / user123)`);
  console.log(`- 2 coupons (WELCOME10, FREESHIP)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
