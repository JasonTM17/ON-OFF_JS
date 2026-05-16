import { test, expect } from "playwright/test";

test.describe("Shopping Cart", () => {
  test("cart page loads", async ({ page }) => {
    await page.goto("/cart");
    await expect(page).toHaveURL(/\/cart/);
  });

  test("empty cart shows message", async ({ page }) => {
    await page.goto("/cart");
    const emptyState = page.getByText(/trống|empty|chưa có/i);
    await expect(emptyState).toBeVisible();
  });

  test("cart icon in header is clickable", async ({ page }) => {
    await page.goto("/");
    const cartLink = page.locator('a[href="/cart"]');
    await expect(cartLink).toBeVisible();
  });
});
