import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiError } from "./ApiError.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateWithGemini = async (content) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(content);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error); // helpful for debugging
    throw new ApiError(500, "Something went wrong while communicating with the AI.");
  }
};

export { generateWithGemini };
