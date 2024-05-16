import {injectable} from "tsyringe";
import {ICertsService} from "../../interfaces/vercel/ICertsService";
import {ICertsIssueOptions, ICertsListOptions} from "../../interfaces";
import {appendGlobalOptions} from "../../utility";
import {exec} from "child_process";

@injectable()
class CertsService implements ICertsService {
    async list(options?: ICertsListOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            const commandParts = ['vercel certs ls'];

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
            })
        })
    }

    async issue(domain: string | Array<string>, options?: ICertsIssueOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            const commandParts = ['vercel certs issue'];

            if (domain instanceof Array) {
                commandParts.push(domain.join(' '));
            } else {
                commandParts.push(domain);
            }

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

    async remove(uid: Array<string>): Promise<void> {
        return new Promise((resolve, reject) => {
            const commandParts = ['vercel certs rm'];

            commandParts.push(uid.join(' '));

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

export {CertsService};