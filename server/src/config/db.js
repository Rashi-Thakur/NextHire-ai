import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is missing in environment variables");
  }

  await mongoose.connect(mongoUri, {
    dbName: undefined,
  });
  // eslint-disable-next-line no-console
  console.log("MongoDB connected");
};
