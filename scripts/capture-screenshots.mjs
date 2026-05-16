import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.join(__dirname, '..', 'docs', 'screenshots');
const BASE = 'http://localhost:3001';

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/mnt/c/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-gpu'],
  });

  // Desktop screenshots
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  // Homepage
  console.log('Capturing homepage...');
  const homePage = await desktop.newPage();
  await homePage.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
  await homePage.waitForTimeout(1000);
  await homePage.screenshot({ path: path.join(screenshotsDir, 'homepage.png'), fullPage: true });
  await homePage.close();

  // Products page
  console.log('Capturing products...');
  const productsPage = await desktop.newPage();
  await productsPage.goto(`${BASE}/products`, { waitUntil: 'networkidle', timeout: 30000 });
  await productsPage.waitForTimeout(1000);
  await productsPage.screenshot({ path: path.join(screenshotsDir, 'products.png') });
  await productsPage.close();

  // Product detail - find first product slug
  console.log('Capturing product detail...');
  const detailPage = await desktop.newPage();
  await detailPage.goto(`${BASE}/products`, { waitUntil: 'networkidle', timeout: 30000 });
  const firstProduct = await detailPage.locator('a[href^="/products/"]').first().getAttribute('href');
  if (firstProduct) {
    await detailPage.goto(`${BASE}${firstProduct}`, { waitUntil: 'networkidle', timeout: 30000 });
    await detailPage.waitForTimeout(1000);
    await detailPage.screenshot({ path: path.join(screenshotsDir, 'product-detail.png') });
  }
  await detailPage.close();

  // Checkout page
  console.log('Capturing checkout...');
  const checkoutPage = await desktop.newPage();
  await checkoutPage.goto(`${BASE}/checkout`, { waitUntil: 'networkidle', timeout: 30000 });
  await checkoutPage.waitForTimeout(500);
  await checkoutPage.screenshot({ path: path.join(screenshotsDir, 'checkout.png') });
  await checkoutPage.close();

  // Admin dashboard
  console.log('Capturing admin dashboard...');
  const adminPage = await desktop.newPage();
  await adminPage.goto(`${BASE}/admin`, { waitUntil: 'networkidle', timeout: 30000 });
  await adminPage.waitForTimeout(1000);
  await adminPage.screenshot({ path: path.join(screenshotsDir, 'admin-dashboard.png') });
  await adminPage.close();

  await desktop.close();

  // Mobile screenshot
  console.log('Capturing mobile view...');
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile.png') });
  await mobilePage.close();
  await mobile.close();

  await browser.close();
  console.log('All screenshots captured!');
}

main().catch((e) => { console.error(e); process.exit(1); });
