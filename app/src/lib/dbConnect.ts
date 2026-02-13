import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env.local");
}

// ================= GLOBAL CACHE TYPE =================
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// ================= CREATE CACHE =================
const globalWithMongoose = global as typeof globalThis & {
  mongooseCache?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

const cached = globalWithMongoose.mongooseCache || {
  conn: null,
  promise: null,
};

globalWithMongoose.mongooseCache = cached;

// ================= CONNECT FUNCTION =================
async function dbConnect(): Promise<typeof mongoose> {
  // already connected
  if (cached.conn) return cached.conn;

  // create connection promise
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongooseInstance) => {
      console.log("✅ MongoDB Connected");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
