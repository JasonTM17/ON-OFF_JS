import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PRODUCT_IMAGES: Record<string, string[]> = {
  "boxer-cotton-premium": [
    "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
  ],
  "brief-modal-sieu-nhe": [
    "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=600&h=800&fit=crop",
  ],
  "trunk-bamboo-everyday": [
    "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=600&h=800&fit=crop",
  ],
  "boxer-brief-sport": [
    "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=600&h=800&fit=crop",
  ],
  "ao-thun-lot-co-tron-nam": [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop",
  ],
  "ao-ba-lo-cotton-nam": [
    "https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=600&h=800&fit=crop",
  ],
  "bra-khong-gong-tshirt": [
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=600&h=800&fit=crop",
  ],
  "bralette-ren-thanh-lich": [
    "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=800&fit=crop",
  ],
  "quan-lot-bikini-seamless": [
    "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=600&h=800&fit=crop",
  ],
  "quan-lot-hipster-cotton": [
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&h=800&fit=crop",
  ],
  "bodysuit-co-v": [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop",
  ],
  "bra-the-thao-medium": [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&h=800&fit=crop",
  ],
  "set-bra-quan-lot-basic": [
    "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=600&h=800&fit=crop",
  ],
  "pyjama-lua-dai-tay": [
    "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1631947430066-48c30d57b943?w=600&h=800&fit=crop",
  ],
  "ao-thun-oversize-mac-nha": [
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop",
  ],
  "quan-short-mac-nha": [
    "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=800&fit=crop",
  ],
  "set-do-ngu-cotton": [
    "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&h=800&fit=crop",
  ],
  "ao-choang-tam-waffle": [
    "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=600&h=800&fit=crop",
  ],
  "set-3-doi-tat-co-ngan": [
    "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&h=800&fit=crop",
  ],
  "tui-giat-do-lot": [
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=800&fit=crop",
  ],
  "set-5-doi-tat-cong-so": [
    "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&h=800&fit=crop",
  ],
  "hop-qua-tang-onfit": [
    "https://images.unsplash.com/photo-1549465220-1a8b9238f4e1?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&h=800&fit=crop",
  ],
};

async function main() {
  for (const [slug, images] of Object.entries(PRODUCT_IMAGES)) {
    await prisma.product.updateMany({
      where: { slug },
      data: { images: JSON.stringify(images) },
    });
  }
  console.log(`Updated images for ${Object.keys(PRODUCT_IMAGES).length} products`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
