import { NextResponse } from "next/server";
import { MongoServerError } from "mongodb";
import { db } from "@/lib/db";
import { Url } from "@/models/url";
import { nanoid } from "nanoid";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const { url, custom } = await req.json();

  const id = custom?.length ? custom : nanoid(10);

  try {
    await db();
    const response = await Url.create({ originalUrl: url, shortId: id });
    const { originalUrl, shortId } = response;

    return NextResponse.json({ originalUrl, shortId }, { status: 201 });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          error: {
            url: error.errors?.originalUrl?.message,
            custom: error.errors?.shortId?.message,
          },
        },
        { status: 400 }
      );
    }
    if (error instanceof MongoServerError && error.code === 11000) {
      return NextResponse.json(
        {
          error: {
            custom: "Given path is not available.",
          },
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
