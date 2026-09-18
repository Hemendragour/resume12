import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
GEMINI_MODEL: process.env.GEMINI_MODEL || "gemini-2.5-flash",
  GEMINI_TTS_MODEL:
    process.env.GEMINI_TTS_MODEL || "gemini-2.5-flash-preview-tts",
  GEMINI_TTS_VOICE: process.env.GEMINI_TTS_VOICE || "Kore",
};