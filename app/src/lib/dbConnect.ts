import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// ===== GLOBAL TYPE =====
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// ===== CACHE =====
const cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

// ===== CONNECT FUNCTION =====
async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((m) => {
        console.log("MongoDB Connected");
        return m;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
