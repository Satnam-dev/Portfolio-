import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: parseInt(process.env.PORT || "6000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri:
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/satnam_portfolio",
  useMemoryDb: process.env.USE_MEMORY_DB === "true",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  groqApiKey: process.env.GROQ_API_KEY || "",
  mailHost: process.env.MAIL_HOST || "smtp.gmail.com",
  mailUser: process.env.MAIL_USER || "",
  mailPass: process.env.MAIL_PASS || "",
  jwtSecret: process.env.JWT_SECRET || "",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
};
