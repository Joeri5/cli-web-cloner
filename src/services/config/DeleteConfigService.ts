import {injectable} from "tsyringe";
import {IDeleteConfigService} from "../../interfaces";
import {getRootDir} from "../../utility";
import fs from "fs";
import path from "path";

@injectable()
export class DeleteConfigService implements IDeleteConfigService {
    async delete(): Promise<void> {
        fs.writeFileSync(path.join(getRootDir(), '.clonerConfig'), '', 'utf-8');
    }

    async deleteChild(child: string): Promise<void> {
        const configContent = fs.readFileSync(path.join(getRootDir(), '.clonerConfig'), 'utf-8');

        const lines = configContent.split('\n');
        const updatedLines: string[] = [];
        let inTargetChild = false;

        for (const line of lines) {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
                inTargetChild = trimmedLine.slice(1, -1) === child;
            }

            if (!inTargetChild) {
                updatedLines.push(line);
            }

            if (inTargetChild && trimmedLine === '') {
                inTargetChild = false;
            }
        }

        fs.writeFileSync(path.join(getRootDir(), '.clonerConfig'), updatedLines.join('\n'), 'utf-8');
    }

    async deleteKeyFromChild(child: string, key: string): Promise<void> {
        let configContent: string | Buffer;

        configContent = fs.readFileSync(path.join(getRootDir(), '.clonerConfig'), 'utf-8');

        const lines = configContent.split('\n');
        const updatedLines: string[] = [];
        let inTargetChild = false;
        let keyDeleted = false;

        for (const line of lines) {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
                inTargetChild = trimmedLine.slice(1, -1) === child;
            }

            if (!inTargetChild) {
                updatedLines.push(line);
            } else if (inTargetChild && trimmedLine.includes(':')) {
                const [currentKey] = trimmedLine.split(':').map(s => s.trim());
                if (currentKey !== key) {
                    updatedLines.push(line);
                } else {
                    keyDeleted = true;
                }
            } else {
                updatedLines.push(line);
            }

            if (inTargetChild && trimmedLine === '') {
                inTargetChild = false;
            }
        }

        fs.writeFileSync(path.join(getRootDir(), '.clonerConfig'), updatedLines.join('\n'), 'utf-8');
    }
}