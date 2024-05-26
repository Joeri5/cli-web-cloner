import {IBuildOptions, IBuildService, IVercelCommandService} from "../../interfaces";
import {inject, injectable} from "tsyringe";

@injectable()
class BuildService implements IBuildService {
    constructor(@inject("IVercelCommandService") private vercelCommandService: IVercelCommandService) {
    }

    async build(options?: IBuildOptions): Promise<void> {
        return this.vercelCommandService.execute('build', options);
    }
}

export {BuildService};