import fs from "fs"
import path from "path"

let FilesData = [];


function FolderDataReader(Root) {

    const allRootDocsArr = fs.readdirSync(Root);

    for (let i = 0; i < allRootDocsArr.length; i++) {

        const FileLocation = path.join(
            Root,
            allRootDocsArr[i]
        );

        const state = fs.statSync(FileLocation);

        if (state.isFile()) {

            const info = fs.readFileSync(FileLocation,"utf-8");

            FilesData.push({
                location: FileLocation,
                info: info
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

console.log(FilesData);


