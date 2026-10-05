import fs from "fs/promises";
import path from "path";
import env from "../../src/config/env.js";
import Groq from "groq-sdk";

const GroqAi = new Groq({
      apiKey: env.GROQ_API_KEY,
});

async function readImage(imagePath) {
    const imageBuffer = await fs.readFile(imagePath);
    const base64Data = imageBuffer.toString("base64");

    const response = await GroqAi.chat.completions.create({
        // model: env.GROQ_MODEL,
        model: "Qwen3.8-27B",
        messages: [
            {
                role: "user",
                content: [
                    {
                        type : "text",
                        text : "Extract all visible text and clearly describe the contents of this image."
                    },

                    {
                        type : "image_url",
                        image_url : {
                            url : `data:image/jpeg;basse64,${base64Data}`
                        }
                    }
                ],
            },
        ],
        // config: {
        //     systemInstruction: "You are a memory extraction assistant.Extract only long-term user information:Name, Skills, Goals, Education, Preferences, Personal background. Ignore: Greetings, Temporary questions, Small talk. Return JSON only."
        // }
    });

    return response;
}

// Docs folder target
const imagePath = path.resolve("./MVP-Summarizer/Docs/boy.png");
const result = await readImage(imagePath);

console.log(result);