import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export class envUtil {
    private static envFilePath: string = path.resolve(__dirname, '.env');

    public static setEnvValue(key: string, value: string): void {
        let envFileContent: string = '';
        if (fs.existsSync(this.envFilePath)) {
            envFileContent = fs.readFileSync(this.envFilePath, 'utf8');
        }

        const envVars = envFileContent.split('\n');
        let keyExists = false;

        for (let i = 0; i < envVars.length; i++) {
            const line = envVars[i];
            if (line.startsWith(`${key}=`)) {
                envVars[i] = `${key}=${value}`;
                keyExists = true;
                break;
            }
        }

        if (!keyExists) {
            envVars.push(`${key}=${value}`);
        }

        envFileContent = envVars.join('\n');

        fs.writeFileSync(this.envFilePath, envFileContent, 'utf8');
    }
}