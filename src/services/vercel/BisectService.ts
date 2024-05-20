import {IBisectOptions, IBisectService} from "../../interfaces";
import {injectable} from "tsyringe";
import {exec} from "child_process";
import {appendGlobalOptions} from "../../utility";

@injectable()
class BisectService implements IBisectService {
    async bisect(options?: IBisectOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            const commandParts = ['vercel bisect'];

            if (options?.good) commandParts.push(`--good ${options.good}`);
            if (options?.bad) commandParts.push(`--bad ${options.bad}`);
            if (options?.path) commandParts.push(`--path ${options.path}`);
            if (options?.open) commandParts.push('--open');
            if (options?.run) commandParts.push(`--run ${options.run}`);

            // Append global options using the utility function
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

export {BisectService};