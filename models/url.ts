import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    trim: true,
    required: [true, "URL is required."],
    minLength: [6, "URL must be longer than characters"],
    maxLength: [
      1000,
      "Your URL is too big for our systems! Compensating much?",
    ],
  },
  shortUrl: {},
});

const Url = mongoose.model("Url", urlSchema);
