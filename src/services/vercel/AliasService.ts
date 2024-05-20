import {appendGlobalOptions} from "../../utility";
import {injectable} from "tsyringe";
import {IAliasListOptions, IAliasRemoveOptions, IAliasService, IGlobalOptions} from "../../interfaces";
import {exec} from "child_process";

@injectable()
class AliasService implements IAliasService {
    async set(deploymentUrl: string, customDomain: string, options?: IGlobalOptions): Promise<void> {
        const commandParts = [`vercel alias ${deploymentUrl} ${customDomain}`];
        appendGlobalOptions(commandParts, options);
        const command = commandParts.join(' ');

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    }

    async remove(customDomain: string, options?: IAliasRemoveOptions): Promise<void> {
        const commandParts = [`vercel alias rm ${customDomain}`];
        appendGlobalOptions(commandParts, options);
        const command = commandParts.join(' ');

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    }

    async list(options?: IAliasListOptions): Promise<void> {
        const commandParts = ['vercel alias ls'];
        appendGlobalOptions(commandParts, options);
        const command = commandParts.join(' ');

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    }
}

export {AliasService};