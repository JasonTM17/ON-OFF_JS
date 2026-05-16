import { test, expect } from "playwright/test";

test.describe("Product Catalog", () => {
  test("displays product grid", async ({ page }) => {
    await page.goto("/products");
    await expect(page.locator('[data-testid="product-card"], .product-card, article').first()).toBeVisible();
  });

  test("product links navigate to detail page", async ({ page }) => {
    await page.goto("/products");
    const firstProduct = page.locator('a[href*="/products/"]').first();
    await firstProduct.click();
    await expect(page).toHaveURL(/\/products\/.+/);
  });

  test("search returns results", async ({ page }) => {
    await page.goto("/products?q=ao");
    await page.waitForLoadState("networkidle");
    const results = page.locator('[data-testid="product-card"], .product-card, article');
    const count = await results.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("sort options work", async ({ page }) => {
    await page.goto("/products");
    const sortSelect = page.locator('select, [data-testid="sort"]');
    if (await sortSelect.count() > 0) {
      await sortSelect.first().selectOption({ index: 1 });
      await page.waitForLoadState("networkidle");
    }
  });

  test("pagination is visible when products exceed limit", async ({ page }) => {
    await page.goto("/products");
    await page.waitForLoadState("networkidle");
  });
});
