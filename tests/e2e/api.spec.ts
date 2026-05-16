import { test, expect } from "playwright/test";

test.describe("API Endpoints", () => {
  test("GET /api/health returns 200", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.status()).toBe(200);
  });

  test("GET /api/products returns paginated list", async ({ request }) => {
    const response = await request.get("/api/products");
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("products");
    expect(data).toHaveProperty("pagination");
    expect(data.pagination).toHaveProperty("total");
    expect(data.pagination).toHaveProperty("totalPages");
  });

  test("GET /api/products supports search", async ({ request }) => {
    const response = await request.get("/api/products?q=ao");
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("products");
  });

  test("GET /api/categories returns list", async ({ request }) => {
    const response = await request.get("/api/categories");
    expect(response.status()).toBe(200);
  });

  test("GET /api/products/bestsellers returns list", async ({ request }) => {
    const response = await request.get("/api/products/bestsellers");
    expect(response.status()).toBe(200);
  });

  test("GET /api/cart without auth returns empty", async ({ request }) => {
    const response = await request.get("/api/cart");
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("items");
    expect(data.items).toHaveLength(0);
  });

  test("POST /api/auth/login with invalid data returns 400", async ({ request }) => {
    const response = await request.post("/api/auth/login", {
      data: { email: "not-email", password: "" },
    });
    expect(response.status()).toBe(400);
  });

  test("POST /api/cart without auth returns 401", async ({ request }) => {
    const response = await request.post("/api/cart", {
      data: { productId: "test", size: "M", color: "Black", quantity: 1 },
    });
    expect(response.status()).toBe(401);
  });
});
