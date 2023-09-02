import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI not provided");
  }

  try {
    // If readyState === 0 then there is no connection
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to DB");
    }
  } catch (error) {
    console.log(error);
  }
};
