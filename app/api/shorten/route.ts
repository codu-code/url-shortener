import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Url } from "@/models/url";
import { nanoid } from "nanoid";
import mongoose from "mongoose";

export async function POST(req: Request) {
  console.log("HERE");
  const { url, custom } = await req.json();

  console.log({ url, custom });

  const id = custom?.length ? custom : nanoid(10);

  try {
    await db();
    const response = await Url.create({ originalUrl: url, shortId: id });
    return NextResponse.json({ response }, { status: 201 });
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    console.log({ error });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
