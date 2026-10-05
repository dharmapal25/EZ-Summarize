import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import env from '../../src/config/env.js';
import Groq from 'groq-sdk';
import fs from "fs/promises";
// 1. Load Docs 

// const content = await fs.readFile("Dharmapal_Resume.pdf","utf-8");
// const rawDocs = await fs.readFile("MVP-Summarizer/Docs/demo.js", "utf-8");
const rawDocs = await fs.readFile("MVP-Summarizer/Docs/a.png");

// console.log(content)

// 2. Chunking
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});

async function chunkText(text) {
    const chunkedDocs = await textSplitter.createDocuments([text]);
    return chunkedDocs;
}

let data = await chunkText(rawDocs);

// 3. Question & Context
const question = "What is pincone?";
const context = data.map((item) => item.pageContent).join("\n\n");

const prompt = `
You are a helpful AI assistant.

Answer ONLY using the context below.

Context:
${context}

Question:
${question}`;

// 4. Groq Setup & Response
const GroqAi = new Groq({
    apiKey: env.GROQ_API_KEY,
});

async function AiResponse(message) {
    const response = await GroqAi.chat.completions.create({
        model: env.GROQ_MODEL,
        messages: [
            {
                role: "user",
                content: message,
            },
        ],
    });

    return response;
}

let result = await AiResponse(prompt);

// 5. Output
console.log("Result >>>>>>>>>>\n", result.choices[0]?.message?.content);
