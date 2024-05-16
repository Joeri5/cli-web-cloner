import {injectable} from "tsyringe";
import {exec} from "child_process";
import {IWebsiteDeployer} from "../interfaces";

@injectable()
class WebsiteDeployer implements IWebsiteDeployer {
    deploy(sourceDir: string): void {
        exec(`vercel --prod ${sourceDir}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error deploying website: ${error.message}`);
                return;
            }
            console.log(`Deployment successful: ${stdout}`);
        });
    }
}

export {WebsiteDeployer};