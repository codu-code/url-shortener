import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Url } from "@/models/url";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await db();
    const response = await Url.findOne({ shortId: id });

    if (!response) {
      throw new Error("Not found.");
    }

    return NextResponse.redirect(response.originalUrl);
  } catch (error) {
    const url = new URL("/404", req.url);
    return NextResponse.redirect(url);
  }
}
