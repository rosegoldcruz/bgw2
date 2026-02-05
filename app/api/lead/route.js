import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  console.log("Lead captured", body);
  return NextResponse.json({ ok: true });
}
