import zip from "unzipper";
import fs from "fs";

fs.createReadStream("MVP-Summarizer/Docs/Cyber.zip")
    // .pipe(zip.Extract({ path: 'output/dir' }))
    .pipe(zip.Extract({ path: 'MVP-Summarizer/Docs/output' }))
    .on("close", () => {
        console.log("Done Extraction");
    }).on("error", (err) => {
        console.log("Extraction failed");
    })


