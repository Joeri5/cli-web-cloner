import {IPullService, IVercelCommandService} from "../../interfaces";
import {IPullOptions} from "../../interfaces/vercel/options/pull";
import {inject, injectable} from "tsyringe";

@injectable()
export class PullService implements IPullService {
    constructor(@inject('IVercelCommandService') private vercelCommandService: IVercelCommandService) {
    }

    async pull(options: IPullOptions): Promise<void> {
        let pullOptions = "";

        if (options.environment)
            pullOptions += `--environment ${options.environment} `;

        if (options.gitBranch)
            pullOptions += `--gitBranch ${options.gitBranch} `;

        if (options.yes)
            pullOptions += `--yes `;

        return this.vercelCommandService.execute('pull', options, pullOptions);
    }
}