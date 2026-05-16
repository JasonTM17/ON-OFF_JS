import { test, expect } from "playwright/test";

test.describe("Homepage", () => {
  test("loads and displays hero section", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/ON\/OFF/);
    await expect(page.locator("header")).toBeVisible();
  });

  test("navigation links work", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/products"]');
    await expect(page).toHaveURL(/\/products/);
  });

  test("displays product categories", async ({ page }) => {
    await page.goto("/");
    const categories = page.locator('[data-testid="categories"], section');
    await expect(categories.first()).toBeVisible();
  });

  test("footer is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer")).toBeVisible();
  });
});
