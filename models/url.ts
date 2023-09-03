import mongoose from "mongoose";
import { nanoid } from "nanoid";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      trim: true,
      required: [true, "URL is required."],
      minLength: [6, "URL must be longer than 5 characters"],
      maxLength: [
        1000,
        "Your URL is too big for our systems! Compensating much?",
      ],
      match: [
        /^(https?:\/\/)?(([\w\d]([\w\d-]*[\w\d])*\.)+[\w]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-\w\/\.]+)?\??([-+\w%&=.,;:_\s]*)?#?([-\/\w]+)?$/,
        "Invalid URL",
      ],
    },
    shortId: {
      type: String,
      unique: true,
      default: () => nanoid(6),
      minLength: [4, "Custom path must be longer than 3 characters"],
      // ~99 days or 2M IDs needed, in order to have a 1% probability of at least one collision.
      match: [
        /^[A-Za-z0-9\-._~:@!$&'()*+,;=\/]+$/,
        "Invalid custom text provided.",
      ],
    },
  },
  { timestamps: true }
);

export const Url = mongoose.models.Url || mongoose.model("Url", urlSchema);
