import fs from "fs/promises";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import env from "../../src/config/env.js";

const ai = new GoogleGenAI({
    apiKey: env.GOOGLE_API_KEY 
});

async function readImage(imagePath) {
    const imageBuffer = await fs.readFile(imagePath);
    const base64Data = imageBuffer.toString("base64");

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{
            role: "user",
            parts: [{ text: "Extract all visible text and clearly describe the contents of this image." },
            {
                inlineData: {
                    data: base64Data,
                    mimeType: "image/png",
                },
            },
            ],
        },
        ],
    });

    return response.text;
}

// Docs folder target
const imagePath = path.resolve("./MVP-Summarizer/Docs/boy.png");
const result = await readImage(imagePath);

console.log(result);