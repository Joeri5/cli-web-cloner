import {IAliasListOptions, IAliasRemoveOptions, IAliasService} from "../../interfaces";
import {exec} from "child_process";
import {injectable} from "tsyringe";

@injectable()
class AliasService implements IAliasService {
    async set(deploymentUrl: string, customDomain: string): Promise<void> {
        // logic to set alias
        exec(`vercel alias ${deploymentUrl} ${customDomain}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    }

    async remove(customDomain: string, options?: IAliasRemoveOptions): Promise<void> {
        // logic to remove alias
        exec(`vercel alias rm ${customDomain}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    }

    async list(options?: IAliasListOptions): Promise<void> {
        // logic to list aliases
        exec(`vercel alias ls`, (error, stdout, stderr) => {
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