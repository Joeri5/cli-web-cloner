import {injectable} from "tsyringe";
import {IWriteConfigService} from "../../interfaces";
import fs from "fs";
import path from "path";
import {getRootDir} from "../../utility";

@injectable()
export class WriteConfigService implements IWriteConfigService {
    async write(child: string, data: Record<string, string>): Promise<void> {
        let configContent: string | Buffer;

        configContent = fs.readFileSync(path.join(getRootDir(), '.clonerConfig'), 'utf-8');

        const childExists = configContent.includes(`[${child}]`);
        if (childExists) {
            process.exit(1)
        }

        const newChildContent = `\n\n[${child}]\n${Object.entries(data)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')}`;

        fs.writeFileSync(path.join(getRootDir(), '.clonerConfig'), configContent + newChildContent, 'utf-8');
    }
}