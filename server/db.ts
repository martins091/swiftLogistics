import { MongoClient, Db } from "mongodb";

let db: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      autoSelectFamily: false, // Fix for Node.js 18+ TLS issues
    });
    
    await client.connect();
    
    db = client.db("logistics");
    console.log("✅ Connected to MongoDB");
    
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    console.error("Please check:");
    console.error("1. MongoDB URI is correct");
    console.error("2. IP is whitelisted in MongoDB Atlas Network Access");
    console.error("3. Database credentials are valid");
    throw error;
  }
}

export function getDb(): Db {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDatabase first.");
  }
  return db;
}
