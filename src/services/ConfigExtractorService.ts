// import {injectable} from "tsyringe";
// import {IConfigExtractorService} from "../interfaces";
// import fs from "fs";
// import {getRootDir} from "../utility";
//
// @injectable()
// export class ConfigExtractorService implements IConfigExtractorService {
//     async extract(): Promise<void> {
//         return fs.readFile(getRootDir() + "/.clonerConfig", 'utf8', (err, data) => {
//             if (err) {
//                 console.error(`Error reading the config file: ${err.message}`);
//                 return;
//             }
//         });
//     };
//
//     async extractChild(child: string): Promise<Record<string, Record<string, string>>> {
//         const regex = /\[([^\]]+)\]\s*([^[]*)/g;
//         let match;
//         const result: Record<string, Record<string, string>> = {};
//
//         while ((match = regex.exec(getRootDir() + "/.clonerConfig")) !== null) {
//             const child = match[1].trim();
//             result[child] = match[2].trim().split('\n').reduce((acc: Record<string, string>, line: string) => {
//                 const [key, value] = line.split(':').map(part => part.trim());
//                 if (key && value) {
//                     acc[key] = value;
//                 }
//                 return acc;
//             }, {});
//         }
//
//         return result;
//     }
// }