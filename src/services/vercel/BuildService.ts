import {IBuildOptions, IBuildService} from "../../interfaces";
import {injectable} from "tsyringe";
import {exec} from "child_process";
import {appendGlobalOptions} from "../../utility";

@injectable()
class BuildService implements IBuildService {
    async build(options?: IBuildOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            const commandParts = ['vercel build'];

            if (options?.prod) commandParts.push('--prod');
            if (options?.yes) commandParts.push('--yes');

            appendGlobalOptions(commandParts, options);

            const command = commandParts.join(' ');

            console.log(`Executing command: ${command}`);

            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${error}`);
                    reject(error);
                    return;
                }

                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                }

                console.log(`stdout: ${stdout}`);
                resolve();
            });
        });
    }
}

export {BuildService};