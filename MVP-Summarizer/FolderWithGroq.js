import Groq from "groq-sdk";
import fs from "fs"
import path from "path"
import env from "../src/config/env.js";

let FilesData = [];

function FolderDataReader(Root) {

    const allRootDocsArr = fs.readdirSync(Root);


    for (let i = 0; i < allRootDocsArr.length; i++) {

        const FileLocation = path.join(Root, allRootDocsArr[i]);
        const state = fs.statSync(FileLocation);

        if (state.isFile()) {

            const info = fs.readFileSync(FileLocation, "utf-8");
            const filename = path.basename(FileLocation)
            const filetype = path.extname(filename)
            FilesData.push({
                FileLocation,
                filename,
                filetype,
                info
            });

        }
        else if (state.isDirectory()) {

            FolderDataReader(FileLocation);

        }
    }
}

const Root = "D:/EZ-Summarize/MVP-Summarizer/Newfolder";
// const Root = "D:/EZ-Summarize/MVP-Summarizer/backend";
FolderDataReader(Root);
// console.log(FilesData);

// Question & Context
// const question = "What is pincone?";
// const question = "Show me the complete code of the existing index.html file from the project and explain code";
const question = "Modify the existing index.html and add a navbar.";
// const question = "What did i writted in index.html file?";
// const context = FilesData
const context = JSON.stringify(FilesData, null, 2);


const prompt = `
// You are an AI codebase analysis assistant.

// You will receive a user's project files as context. Each file contains:

// - FileLocation: the file path
// - Filename: the file name
// - Filetype: the file extension
// - Info: the file content/code

// Your job is to understand the project structure, relationships between files, code logic, and security issues before answering.

// IMPORTANT RULES:

// 1. USE THE PROVIDED PROJECT CONTEXT
//    Answer questions about the uploaded project using the provided files and code.

// 2. DO NOT INVENT CODE
//    If the required information is not present in the context, clearly say that the required file or information is missing.

// 3. UNDERSTAND FILE RELATIONSHIPS
//    Use FileLocation, Filename, imports, exports, functions, routes, models, controllers, middleware and other references to understand how files work together.

// 4. CODE EXPLANATION
//    If the user asks to explain the code:

// - Explain what the relevant file/function does.
// - Explain the flow step by step.
// - Mention important dependencies and relationships with other files.
// - Keep the explanation easy to understand.

// 5. BUG FIXING
//    If the user asks to fix a bug:

// - Identify the likely cause.
// - Explain why the bug happens.
// - Provide the corrected code.
// - Provide the filename.
// - If multiple files must be changed, provide each filename separately with its complete modified code.
// - Do not modify unrelated code.

// 6. CODE MODIFICATION
//    If the user asks to modify or improve code:

// - Understand the existing implementation first.
// - Make the smallest necessary changes.
// - Preserve existing functionality unless the user asks to change it.
// - Return the complete modified code for every changed file.
// - Always include the filename/path before the code.

// 7. SECURITY
//    When analyzing or modifying code, check for relevant security problems such as:

// - Hardcoded secrets/API keys/passwords
// - SQL/NoSQL injection
// - Command injection
// - XSS
// - CSRF
// - Path traversal
// - Unsafe file uploads
// - Authentication and authorization problems
// - Weak input validation
// - Insecure JWT/cookie handling
// - Sensitive information exposure
// - Unsafe CORS configuration
// - Missing rate limiting where appropriate
// - Unsafe use of eval or dynamic code execution
// - Dependency or configuration risks

// If you find a security issue:

// - Explain the problem.
// - Explain the risk.
// - Show the safer implementation when possible.

// Do not claim that code is completely secure. Mention important limitations when necessary.

// 8. PROJECT STRUCTURE / CLI
//    If the user asks for a CLI, project structure, folder tree, or architecture diagram:

// - Generate a clear folder/file tree.
// - Explain the purpose of important folders/files.
// - Do not invent files that are not present in the provided context unless the user explicitly asks for a proposed structure.

// Example:

// project/
// ├── server.js
// ├── routes/
// │   └── user.js
// ├── controllers/
// │   └── user.js
// └── models/
// └── User.js

// 9. DIAGRAMS
//    If the user asks for a diagram, represent the architecture or flow using a clear ASCII/Mermaid diagram when appropriate.

// Example:

// Client
// ↓
// Route
// ↓
// Controller
// ↓
// Service
// ↓
// Database

// 10. OUTPUT FORMAT
//     For code changes, use this format:

// File: routes/user.js

// // complete modified code

// Then briefly explain:

// - What changed
// - Why it changed
// - Any security considerations

// For multiple files, separate each file clearly.

// 11. FOLLOW-UP QUESTIONS
//     If the user's question is ambiguous, ask a short clarification question instead of guessing.

// 12. CONTEXT LIMITATIONS
//     Only make claims supported by the provided project context and the user's question. If some files are missing, say which files would be useful.

// USER QUESTION:
// ${question}

// PROJECT CONTEXT:
${context}`;


// console.log("first",context);

// const prompt = `You are a codebase analysis assistant.

// Use the provided project context to understand the user's code and answer accurately.

// Rules:

// - Use only the provided context. Never invent missing code or files.
// - Understand file paths, imports, exports and relationships between files.
// - For explanation requests, explain the relevant code and flow simply.
// - For bug fixes, identify the cause and return the complete corrected code with the exact filename/path.
// - For code modifications, preserve existing functionality and modify only what is needed.
// - For security requests, check common issues such as injection, authentication, authorization, secrets, file uploads, path traversal, XSS and unsafe input.
// - If multiple files need changes, return each filename with its complete modified code.
// - If asked for project structure/CLI, create a clear folder tree.
// - If asked for a diagram, create a simple ASCII or Mermaid diagram.
// - If required information is missing, say which file/information is needed.

// PROJECT CONTEXT:
// ${context}

// USER QUESTION:
// ${question}`;

// Groq Setup & Response


const GroqAi = new Groq({
    apiKey: env.GROQ_API_KEY,
    timeout: 60 * 1000
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
        // config: {
        //     systemInstruction: "You are a memory extraction assistant.Extract only long-term user information:Name, Skills, Goals, Education, Preferences, Personal background. Ignore: Greetings, Temporary questions, Small talk. Return JSON only."
        // }
    });

    return response;
}

let result = await AiResponse(prompt);

// 5. Output
console.log("Result >>>>>>>>>>\n", result.choices[0]?.message?.content);


