import mongoose from "mongoose";
import type { MongoMemoryServer } from "mongodb-memory-server";
import { env } from "./env";

let memoryServer: MongoMemoryServer | null = null;

export const isUsingMemoryDb = (): boolean => memoryServer !== null;

const LOCAL_MONGO_URI = "mongodb://127.0.0.1:27017/satnam_portfolio";
const CONNECT_TIMEOUT_MS = 2000;

const isLocalMongoUri = (uri: string): boolean =>
  uri.includes("127.0.0.1") || uri.includes("localhost");

const isAtlasUri = (uri: string): boolean => uri.includes("mongodb+srv://");

const tryConnect = async (uri: string): Promise<boolean> => {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: CONNECT_TIMEOUT_MS });
    console.log("MongoDB connected successfully");
    return true;
  } catch {
    await mongoose.disconnect().catch(() => undefined);
    return false;
  }
};

export const connectDB = async (): Promise<void> => {
  if (env.useMemoryDb) {
    await startMemoryDb();
    return;
  }

  const primaryUri = env.mongoUri;
  const fallbackUris = isLocalMongoUri(primaryUri)
    ? [primaryUri]
    : [primaryUri, LOCAL_MONGO_URI];

  for (const uri of fallbackUris) {
    const connected = await tryConnect(uri);
    if (connected) return;
  }

  if (env.nodeEnv === "development") {
    if (isAtlasUri(primaryUri)) {
      console.warn(
        "MongoDB Atlas is unreachable (check IP whitelist / network access)."
      );
      console.warn(
        "Atlas fix: Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)"
      );
      console.warn(
        "Falling back to in-memory database for local development."
      );
    } else if (isLocalMongoUri(primaryUri)) {
      console.warn(
        "Local MongoDB is not running. Starting an in-memory database for development."
      );
    } else {
      console.warn(
        "MongoDB connection failed. Starting an in-memory database for development."
      );
    }

    await startMemoryDb();
    return;
  }

  console.error("MongoDB connection error: all connection attempts failed");
  if (isAtlasUri(primaryUri)) {
    console.error(
      "\nAtlas fix: MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0) or your current IP.\n"
    );
  }
  process.exit(1);
};

const startMemoryDb = async (): Promise<void> => {
  const { MongoMemoryServer } = await import("mongodb-memory-server");
  memoryServer = await MongoMemoryServer.create();
  await mongoose.connect(memoryServer.getUri());
  console.log("In-memory MongoDB connected successfully");
};
