import * as fs from 'fs';
import * as path from 'path';
import {readConfigFile} from "./readConfigFile";

const configFilePath = path.resolve(process.cwd(), '.clonerConfig');

/**
 * Writes a key-value pair to the .clonerConfig file.
 * @param {string} key - The key to add or update in the .clonerConfig file.
 * @param {string} value - The value to associate with the key.
 */
export function writeConfigFile(key: string, value: string): void {
    const config = readConfigFile();
    config[key] = value;

    const configContent = Object.entries(config)
        .map(([k, v]) => `${k}=${v}`)
        .join('\n');

    fs.writeFileSync(configFilePath, configContent, {encoding: 'utf-8'});
}