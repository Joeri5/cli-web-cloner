import {IDeployOptions, IDeployService, IVercelCommandService} from "../../interfaces";
import {inject, injectable} from "tsyringe";

@injectable()
export class DeployService implements IDeployService {
    constructor(@inject("IVercelCommandService") private vercelCommandService: IVercelCommandService) {
    }

    async deploy(options: IDeployOptions): Promise<void> {
        let deployOptions = "";

        if (options?.path)
            deployOptions += ` --cwd ${options.path} `;

        if (options?.prebuilt)
            deployOptions += '--prebuilt ';

        if (options?.builtEnv === typeof "object")
            for (let i = 0; i < options.builtEnv.length; i++) {
                deployOptions += `--build-env ${options.builtEnv[i]} `;
            }

        if (options?.builtEnv === typeof "string")
            deployOptions += `--build-env ${options.builtEnv} `;

        if (options?.yes)
            deployOptions += '--yes ';

        if (options?.env === typeof "object")
            for (let i = 0; i < options.env.length; i++) {
                deployOptions += `--env ${options.env[i]} `;
            }

        if (options?.env === typeof "string")
            deployOptions += `--env ${options.env} `;

        if (options?.name)
            deployOptions += `--name ${options.name} `;

        if (options?.prod)
            deployOptions += '--prod ';

        if (options?.skipDomain)
            deployOptions += '--skip-domain ';

        if (options?.public)
            deployOptions += '--public ';

        if (options?.regions)
            deployOptions += `--regions ${options.regions} `;

        if (options?.noWait)
            deployOptions += '--no-wait ';

        if (options?.force && !options?.withCache)
            deployOptions += '--force ';

        if (options?.force && options?.withCache)
            deployOptions += '--with-cache ';

        if (options?.archive)
            deployOptions += `--archive ${options.archive} `;

        await this.vercelCommandService.execute("deploy", options, deployOptions);
    }
}