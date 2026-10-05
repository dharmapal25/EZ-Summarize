import officeParser from "officeparser";

const data = await officeParser.parseOffice("MVP-Summarizer/Docs/Resume.pdf");
// const data = await officeParser.parseOffice("MVP-Summarizer/Docs/Tense.docx");
// const data = await officeParser.parseOffice("MVP-Summarizer/Docs/Flash.pptx");

console.log(data)