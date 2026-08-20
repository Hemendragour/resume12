// import { GoogleGenAI } from "@google/genai";
// import { env } from "../config/env";

// const ai = new GoogleGenAI({
//   apiKey: env.GEMINI_API_KEY,
// });

// export const generateContent = async (
//   prompt: string
// ): Promise<string> => {
//   const response = await ai.models.generateContent({
//     model: env.GEMINI_MODEL,
//     contents: prompt,
//   });

//   return response.text ?? "";
// };

// // export const generateJSON = async <T>(
// //   prompt: string
// // ): Promise<T> => {
// //   const response = await ai.models.generateContent({
// //     model: env.GEMINI_MODEL,
// //     contents: prompt,
// //     config: {
// //       responseMimeType: "application/json",
// //     },
// //   });

// //   const text = response.text ?? "{}";

// //   try {
// //     return JSON.parse(text) as T;
// //   } catch (err) {
// //     console.error("Gemini returned invalid JSON:", text);
// //     throw new Error("AI response could not be parsed. Please try again.");
// //   }
// // };


// export const generateJSON = async <T>(
//   prompt: string
// ): Promise<T> => {
//   const response = await ai.models.generateContent({
//     model: env.GEMINI_MODEL,
//     contents: prompt,
//     config: {
//       responseMimeType: "application/json",
//       maxOutputTokens: 4000,
//       temperature: 0.2,
//     },
//   });

//   const text = response.text ?? "{}";

//   try {
//     return JSON.parse(text) as T;
//   } catch (err) {
//     console.error(
//       "Gemini returned invalid JSON:",
//       text
//     );

//     throw new Error(
//       "AI response could not be parsed. Please try again."
//     );
//   }
// };



import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env";

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

// ============================================================
// GENERATE TEXT
// ============================================================

export const generateContent = async (
  prompt: string
): Promise<string> => {
  const response = await ai.models.generateContent({
    model: env.GEMINI_MODEL,
    contents: prompt,
  });

  return response.text ?? "";
};

// ============================================================
// GENERATE JSON
// ============================================================

export const generateJSON = async <T>(
  prompt: string
): Promise<T> => {
  const response = await ai.models.generateContent({
    model: env.GEMINI_MODEL,
    contents: prompt,

    config: {
      responseMimeType: "application/json",
      maxOutputTokens: 8000,
      temperature: 0.1,
    },
  });

  const rawText = response.text?.trim() || "{}";

  const cleanJsonText = (text: string): string => {
    let cleaned = text.trim();

    // Remove markdown code fences if Gemini returns them.
    cleaned = cleaned
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    // If extra text exists around the JSON object,
    // keep only the outermost JSON object.
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (
      firstBrace !== -1 &&
      lastBrace !== -1 &&
      lastBrace > firstBrace
    ) {
      cleaned = cleaned.slice(
        firstBrace,
        lastBrace + 1
      );
    }

    return cleaned;
  };

  const parseJson = (text: string): T => {
    const cleaned = cleanJsonText(text);

    try {
      return JSON.parse(cleaned) as T;
    } catch {
      // Repair common trailing-comma issues.
      const repaired = cleaned
        .replace(/,\s*}/g, "}")
        .replace(/,\s*]/g, "]");

      return JSON.parse(repaired) as T;
    }
  };

  try {
    return parseJson(rawText);
  } catch (error) {
    console.error(
      "Gemini returned invalid JSON:",
      rawText
    );

    console.error(
      "Gemini JSON parse error:",
      error
    );

    throw new Error(
      "AI response could not be parsed. Please try again."
    );
  }
};