/**
 * MongoDB bağlantı yönetimi.
 * Next.js hot-reload sırasında çoklu bağlantı oluşmasını önler.
 */

import mongoose from "mongoose";
import { env } from "@/core/config/env";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
if (!global.mongoose) {
  global.mongoose = cached;
}

export async function dbConnect(): Promise<typeof mongoose> {
  const currentCache = cached!;
  
  if (currentCache.conn) {
    return currentCache.conn;
  }

  if (!currentCache.promise) {
    currentCache.promise = mongoose
      .connect(env.MONGODB_URI(), { bufferCommands: false })
      .then((m) => m);
  }

  try {
    currentCache.conn = await currentCache.promise;
  } catch (e) {
    currentCache.promise = null;
    throw e;
  }

  return currentCache.conn;
}
