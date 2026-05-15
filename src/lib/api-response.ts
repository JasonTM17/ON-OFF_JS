import { NextResponse } from "next/server";

export function success<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json({ success: true, data }, { status });
}

export function error(message: string, status: number = 500): NextResponse {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function paginated<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}
