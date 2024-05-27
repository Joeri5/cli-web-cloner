import {injectable} from "tsyringe";
import {IConfigExtractorService} from "../interfaces";
import fs from "fs";
import {getRootDir} from "../utility";
import path from "path";

@injectable()
export class ConfigExtractorService implements IConfigExtractorService {
    async extract(): Promise<string> {
        return fs.readFileSync(path.join(getRootDir(), '.clonerConfig'), 'utf8');
    }

    async extractChild(child: string): Promise<Record<string, string>> {
        const configContent = await this.extract();
        const lines = configContent.split('\n');
        const result: Record<string, string> = {};
        let currentChild: string | null = null;
        let inTargetChild = false;

        for (const line of lines) {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
                currentChild = trimmedLine.slice(1, -1);
                inTargetChild = currentChild === child;
            } else if (inTargetChild && trimmedLine.includes(':')) {
                const [key, value] = trimmedLine.split(':').map(s => s.trim());
                if (key && value) {
                    result[key] = value;
                }
            } else if (inTargetChild && trimmedLine === '') {
                break;
            }
        }

        if (Object.keys(result).length === 0) {
            console.error(`Child section [${child}] not found in the config file.`);
        }

        return result;
    }

    async extractKeyFromChild(child: string, key: string): Promise<string> {
        const childConfig = await this.extractChild(child);
        const value = childConfig[key];

        if (!value) {
            console.error(`Key ${key} not found in the config file.`);
        }

        return value;
    }
}