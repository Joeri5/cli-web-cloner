import {inject, injectable} from "tsyringe";
import {ICertsIssueOptions, ICertsListOptions, ICertsService, IVercelCommandService} from "../../interfaces";

@injectable()
export class CertsService implements ICertsService {
    constructor(@inject('IVercelCommandService') private vercelCommandService: IVercelCommandService) {
    }

    async list(options?: ICertsListOptions): Promise<void> {
        return this.vercelCommandService.execute('certs ls', options);
    }

    async issue(domain: string | Array<string>, options?: ICertsIssueOptions): Promise<void> {
        return this.vercelCommandService.execute(`certs issue ${domain}`, options);
    }

    async remove(uid: Array<string>): Promise<void> {
        return this.vercelCommandService.execute(`certs rm ${uid.join(' ')}`);
    }
}