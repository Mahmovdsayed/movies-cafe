"use server";

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI || "";

if (!MONGO_URI) {
  throw new Error("⚠️ MONGODB_URI environment variable is not set.");
}

let cached = global.mongoose as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ Connected to MongoDB");
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
}

export async function disconnectFromDatabase() {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log("🔌 Disconnected from MongoDB");
  }
}
