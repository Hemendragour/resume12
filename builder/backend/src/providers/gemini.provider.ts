import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env";

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export const generateContent = async (
  prompt: string
): Promise<string> => {
  const response = await ai.models.generateContent({
    model: env.GEMINI_MODEL,
    contents: prompt,
  });

  return response.text ?? "";
};

export const generateJSON = async <T>(
  prompt: string
): Promise<T> => {
  const response = await ai.models.generateContent({
    model: env.GEMINI_MODEL,

    contents: prompt,

    config: {
      responseMimeType: "application/json",
    },
  });

  const text = response.text ?? "{}";

  return JSON.parse(text) as T;
};