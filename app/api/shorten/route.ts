import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  return NextResponse.json({ newUrl: "www.fuck.you" });
}
