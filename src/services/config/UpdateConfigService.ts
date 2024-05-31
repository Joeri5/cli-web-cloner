import {injectable} from "tsyringe";
import {IUpdateConfigService} from "../../interfaces";
import fs from "fs";
import {getRootDir} from "../../utility";
import path from "path";

@injectable()
export class UpdateConfigService implements IUpdateConfigService {
    async updateChild(child: string, data: Record<string, string>): Promise<void> {
        let configContent: string | Buffer;

        configContent = fs.readFileSync(path.join(getRootDir(), '.clonerConfig'), 'utf-8');

        const lines = configContent.split('\n');
        const updatedLines: string[] = [];
        let inTargetChild = false;

        for (const line of lines) {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
                if (inTargetChild) {
                    break;
                }
                inTargetChild = trimmedLine.slice(1, -1) === child;
            }

            if (!inTargetChild) {
                updatedLines.push(line);
            } else if (inTargetChild && trimmedLine === '') {
                break;
            }
        }

        const newChildContent = `[${child}]\n${Object.entries(data)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')}\n`;

        updatedLines.push(newChildContent);

        fs.writeFileSync(path.join(getRootDir(), '.clonerConfig'), updatedLines.join('\n'), 'utf-8');
    }

    async updateKeyFromChild(child: string, key: string, value: string): Promise<void> {
        let configContent: string;

        configContent = fs.readFileSync(path.join(getRootDir(), '.clonerConfig'), 'utf-8');

        const lines = configContent.split('\n');
        const updatedLines: string[] = [];
        let inTargetChild = false;
        let keyUpdated = false;

        for (const line of lines) {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
                if (inTargetChild) {
                    break;
                }
                inTargetChild = trimmedLine.slice(1, -1) === child;
            }

            if (!inTargetChild) {
                updatedLines.push(line);
            } else if (inTargetChild && trimmedLine.includes(':')) {
                const [currentKey] = trimmedLine.split(':').map(s => s.trim());
                if (currentKey === key) {
                    updatedLines.push(`${key}: ${value}`);
                    keyUpdated = true;
                } else {
                    updatedLines.push(line);
                }
            } else {
                updatedLines.push(line);
            }
        }

        fs.writeFileSync(path.join(getRootDir(), '.clonerConfig'), updatedLines.join('\n'), 'utf-8');
    }

}