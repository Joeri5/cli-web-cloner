import {getRootDir} from "./utility";
import fs from "fs";
import path from "path";

export async function extract(): Promise<string> {
    return fs.readFileSync(path.join(getRootDir(), '.clonerConfig'), 'utf8');
}

export async function extractChild(child: string): Promise<Record<string, string>> {
    const configContent = await extract();
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
        throw new Error(`Child section [${child}] not found in the config file.`);
    }

    return result;
}