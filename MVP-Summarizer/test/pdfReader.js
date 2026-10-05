import { PdfReader } from "pdfreader";

// new PdfReader().parseFileItems("MVP-Summarizer/Docs/Resume.pdf", (err, data) => {
new PdfReader().parseFileItems("MVP-Summarizer/Docs/1.pdf", (err, data) => {
    if (err) {
        console.log("ERROR : ", err);
        return
    }

    // if (!data) { // if image
    //     console.log("NULL");
    //     return
    // }

    if (data) {
        console.log("Data >> ", data.text);
        return
    }
})

