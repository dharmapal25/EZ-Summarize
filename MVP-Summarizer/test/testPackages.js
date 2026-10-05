// Extension Test

import mime from "mime-types";

// console.log(mime)

console.log(mime.lookup()) // false
console.log(mime.lookup("")) // false
console.log(mime.lookup("demo.js")) // text/javascript
console.log(mime.lookup("demo.git")) // text/javascript
console.log(mime.lookup("demo.html")) // text/html
console.log(mime.lookup("Tense.docx")) // application/vnd.openxmlformats-officedocument.wordprocessingml.document
console.log(mime.lookup("demo.webp").split("/")) // image/webp



// console.log('\n\n');

// Image Test

// import { createWorker } from "tesseract.js";

// (async() => {
//     const worker = await createWorker("eng");

//     // const result = await worker.recognize("MVP-Summarizer/Docs/a.png");
//     const result = await worker.recognize("MVP-Summarizer/Docs/boy.png");

//     // console.log("result.data : ",result)
//     // console.log("result.data.text : ",result.data.text)

//     await worker.terminate();

// })();