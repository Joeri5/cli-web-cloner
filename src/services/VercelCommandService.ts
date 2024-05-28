import {IConfigService, IGlobalOptions, IVercelCommandService} from "../interfaces";
import {appendGlobalOptions} from "../utility";
import {exec} from "child_process";
import {inject, injectable} from "tsyringe";

@injectable()
export class VercelCommandService implements IVercelCommandService {
    constructor(@inject('IConfigService') private configService: IConfigService) {
    }

    async execute(command: string, globalOptions?: IGlobalOptions, options?: string): Promise<void> {
        const token = await this.configService.readConfig.readKeyFromChild('auth', 'token');

        if (!token)
            console.error('No token found in config file, please login first.');

        return new Promise((resolve, reject) => {
            const commandParts = ['vercel', command];

            appendGlobalOptions(commandParts, globalOptions)

            const executableCommand = commandParts.join(' ') + ` ${options || ""}` + ` --token ${token}`;

            console.log(`Executing command: ${executableCommand}`);

            exec(executableCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${error}`);
                    reject(error);
                    return;
                }

                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                }

                resolve();
            })
        })
    }
}