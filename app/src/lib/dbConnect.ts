import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// ===== CACHE TYPE =====
type MongooseCache = {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined;
}










// ===== CACHE =====
const cached: MongooseCache = global._mongoose ?? {
  conn: null,
  promise: null,
};

global._mongoose = cached;

// ===== CONNECT FUNCTION =====
export default async function dbConnect(): Promise<mongoose.Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;

  if (process.env.NODE_ENV !== "production") {
    console.log("✅ MongoDB Connected");
  }

  return cached.conn;
}
