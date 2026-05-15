import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const start = Date.now();

  try {
    await db.$queryRaw`SELECT 1`;
    const dbLatency = Date.now() - start;

    const [productCount, orderCount, userCount] = await Promise.all([
      db.product.count(),
      db.order.count(),
      db.user.count(),
    ]);

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        status: "connected",
        latency: `${dbLatency}ms`,
      },
      counts: {
        products: productCount,
        orders: orderCount,
        users: userCount,
      },
    });
  } catch (e) {
    console.error("[health]", e);
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: { status: "disconnected" },
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
