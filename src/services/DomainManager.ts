import {injectable} from "tsyringe";
import {exec} from "child_process";
import {IDomainManager} from "../interfaces";

@injectable()
class DomainManager implements IDomainManager {
    addDomain(projectId: string, domain: string): void {
        exec(`vercel domains add ${domain} --project ${projectId}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error adding domain: ${error.message}`);
                return;
            }
            console.log(`Domain ${domain} added to project ${projectId}`);
        });
    }
}

export {DomainManager};