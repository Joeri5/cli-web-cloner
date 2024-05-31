import {
    IApiService,
    IConfigService,
    IProjectService,
    IProjectsListOptions,
    IVercelCommandService
} from "../../interfaces";
import {inject, injectable} from "tsyringe";
import {ApiRequestResult} from "../../models";

@injectable()
export class ProjectService implements IProjectService {
    constructor(@inject('IVercelCommandService') private vercelCommandService: IVercelCommandService, @inject('IApiService') private apiService: IApiService, @inject('IConfigService') private configService: IConfigService) {
    }

    private token = this.configService.readConfig.readKeyFromChild('vercel', 'token');

    add(projectName: string): Promise<void> {
        return this.vercelCommandService.execute(`project add ${projectName}`);
    }

    async get(projectName?: string): Promise<ApiRequestResult> {
        return await this.apiService.get(`https://api.vercel.com/v9/projects/${projectName || ''}`, await this.token);
    }

    list(options?: IProjectsListOptions): Promise<void> {
        return this.vercelCommandService.execute(`project list`, options, options?.updateRequired && "--update-required" || "");
    }

    remove(projectName: string): Promise<void> {
        return this.vercelCommandService.execute(`project remove ${projectName}`);
    }

}