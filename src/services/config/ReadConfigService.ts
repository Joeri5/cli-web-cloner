// import {injectable} from "tsyringe";
// import {IReadConfigService} from "../../interfaces";
//
// @injectable()
// class ReadConfigService implements IReadConfigService {
//     async readChild(child: string): Promise<Record<string, string>> {
//         try {
//             const configContent = await fs.readFile(this.configFilePath, 'utf8');
//             return this.extractKeyValuePairs(child, configContent);
//         } catch (error) {
//             console.error(`Error reading the config file: ${error.message}`);
//             return {};
//         }
//     }
// }