
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const getGeminiAPIResponse = async (message) => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is missing from .env");
    }

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: message
    });

    const reply = response.text;

    if (!reply) {
        throw new Error("Gemini returned an empty response");
    }

    return reply;
};

export default getGeminiAPIResponse;
