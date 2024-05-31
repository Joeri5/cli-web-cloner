import {IInitOptions, IInitService, IVercelCommandService} from "../../interfaces";
import {inject, injectable} from "tsyringe";

@injectable()
export class InitService implements IInitService {
    constructor(@inject('IVercelCommandService') private vercelCommandService: IVercelCommandService) {
    }

    init(projectName: string, framework?: string, options?: IInitOptions): Promise<void> {
        return this.vercelCommandService.execute(`init ${framework} ${projectName}`, options, options?.force && "--force" || "");
    }
}