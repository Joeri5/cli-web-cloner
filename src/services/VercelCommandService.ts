import {IGlobalOptions, IVercelCommandService} from "../interfaces";
import {appendGlobalOptions} from "../utility";
import {exec} from "child_process";
import {injectable} from "tsyringe";

@injectable()
export class VercelCommandService implements IVercelCommandService {
    execute(command: string, options?: IGlobalOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            const commandParts = ['vercel', command];

            appendGlobalOptions(commandParts, options)

            const executableCommand = commandParts.join(' ');

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