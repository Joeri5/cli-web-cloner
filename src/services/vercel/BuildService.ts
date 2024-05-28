import {IBuildOptions, IBuildService, IVercelCommandService} from "../../interfaces";
import {inject, injectable} from "tsyringe";

@injectable()
class BuildService implements IBuildService {
    constructor(@inject("IVercelCommandService") private vercelCommandService: IVercelCommandService) {
    }

    async build(options?: IBuildOptions): Promise<void> {
        let buildOptions = "";

        if (options?.prod)
            buildOptions += " --prod ";

        if (options?.yes)
            buildOptions += " --yes ";

        return this.vercelCommandService.execute('build', options, buildOptions);
    }
}

export {BuildService};