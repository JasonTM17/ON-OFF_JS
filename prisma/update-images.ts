import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const CDN = "https://2885966831.e.cdneverest.net";

const EXTRA_IMAGES: Record<string, string[]> = {
  "brief-modal-sieu-nhe": [
    `${CDN}//catalog/product/cache/700_1050/1/8/18uq25a023-sa313-240326-1.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/8/18uq23a021-sa016-3d.webp`,
  ],
  "boxer-brief-sport": [
    `${CDN}//catalog/product/cache/700_1050/1/8/18uo25a415-sb969-3d.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/8/18uq25a414-sb207-3d.webp`,
  ],
  "boxer-cotton-premium": [
    `${CDN}//catalog/product/cache/700_1050/1/8/18uo25a024-sk001-3d-2.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/8/18uo23a022-sa016-3d.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/8/18uo24a126-fv002-3d.webp`,
  ],
  "trunk-bamboo-everyday": [
    `${CDN}//catalog/product/cache/700_1050/1/8/18uo25a417-sg266-3d.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/8/18uq25a416-sa028-3d.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/8/18uq24a127-fa003-3d.webp`,
  ],
  "ao-thun-lot-co-tron-nam": [
    `${CDN}//catalog/product/cache/700_1050/1/8/18an23a153-sa001-3d.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/8/18ap23a147-ck001-3d.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/8/18ul25a291-sk001-3d.webp`,
  ],
  "ao-ba-lo-cotton-nam": [
    `${CDN}//catalog/product/cache/700_1050/1/8/18ae23a155-sb001-3d.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/8/18uo23a035-sv001-3d.webp`,
  ],
  "pyjama-lua-dai-tay": [
    `${CDN}//catalog/product/cache/700_1050/1/8/18aq23a151-sa001-3d.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/8/18ar23a112-sk002-3d.webp`,
  ],
  "ao-thun-oversize-mac-nha": [
    `${CDN}//catalog/product/cache/700_1050/1/8/18ul25a291-sk001-3d.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/8/18up23a067-sa313-3d.webp`,
  ],
  "quan-short-mac-nha": [
    `${CDN}//catalog/product/cache/700_1050/1/8/18uz23a066-sa313-3d.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/8/18uq25a039-sv001-3d.webp`,
  ],
  "set-do-ngu-cotton": [
    `${CDN}//catalog/product/cache/700_1050/1/8/18uo25a490-sa313-ghep-3d.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/8/18uq25a492-sa313-ghep-3d.webp`,
  ],
  "ao-choang-tam-waffle": [
    `${CDN}//catalog/product/cache/700_1050/1/8/18uo25a491-sa313-ghep-3d.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/8/18uq25a493-sa313-ghep-3d.webp`,
  ],
  "bra-khong-gong-tshirt": [
    `${CDN}//catalog/product/cache/700_1050/1/6/16uc25a576-sn044-1.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/6/16uc25a576-sm220-1.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/6/16uc25a576-se078-1.webp`,
  ],
  "bralette-ren-thanh-lich": [
    `${CDN}//catalog/product/cache/700_1050/1/6/16uc26a574-sk124-1_1_1_1.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/6/16uc26a574-sw246-1_1_1.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/6/16uc26a574-sw246-1.webp`,
  ],
  "quan-lot-bikini-seamless": [
    `${CDN}//catalog/product/cache/700_1050/1/6/16uq26a575-sy306-1.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/6/16uc26a572-sy306-1_1_1.webp`,
  ],
  "quan-lot-hipster-cotton": [
    `${CDN}//catalog/product/cache/700_1050/1/6/16uc26a572-sk124-1_2.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/6/16uc26a572-sy306-1_1.webp`,
  ],
  "bodysuit-co-v": [
    `${CDN}//catalog/product/cache/700_1050/1/6/16uc25a586-se001-1.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/6/16uj25a579-sn044-1.webp`,
  ],
  "bra-the-thao-medium": [
    `${CDN}//catalog/product/cache/700_1050/1/6/16un25a578-se078-1.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/6/16uv25a577-se078-1.webp`,
  ],
  "set-bra-quan-lot-basic": [
    `${CDN}//catalog/product/cache/700_1050/1/6/16uc26a574-sw246-1_1.webp`,
    `${CDN}//catalog/product/cache/700_1050/1/6/16uc26a572-sy306-1.webp`,
  ],
};

async function main() {
  let count = 0;
  for (const [slug, images] of Object.entries(EXTRA_IMAGES)) {
    const product = await prisma.product.findFirst({ where: { slug } });
    if (product) {
      await prisma.product.update({
        where: { id: product.id },
        data: { images: JSON.stringify(images) },
      });
      count++;
    }
  }
  console.log(`Updated ${count} products with enhanced images`);
}
main().finally(() => prisma.$disconnect());
