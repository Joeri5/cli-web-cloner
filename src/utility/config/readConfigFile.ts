import * as fs from 'fs';
import * as path from 'path';

const configFilePath = path.resolve(process.cwd(), '.clonerConfig');

/**
 * Reads the .clonerConfig file and returns the contents as an object.
 * @returns {Record<string, string>} The contents of the .clonerConfig file.
 */
export function readConfigFile(): Record<string, string> {
    if (!fs.existsSync(configFilePath)) {
        return {};
    }

    const configContent = fs.readFileSync(configFilePath, {encoding: 'utf-8'});
    const config: Record<string, string> = {};

    configContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            config[key.trim()] = value.trim();
        }
    });

    return config;
}