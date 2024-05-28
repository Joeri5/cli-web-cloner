import {IBisectOptions, IBisectService, IVercelCommandService} from "../../interfaces";
import {inject, injectable} from "tsyringe";

@injectable()
class BisectService implements IBisectService {
    constructor(@inject('IVercelCommandService') private vercelCommandService: IVercelCommandService) {
    }

    async bisect(options?: IBisectOptions): Promise<void> {
        let bisectOptions = "";

        if (options?.good)
            bisectOptions += ` --good ${options.good} `;

        if (options?.bad)
            bisectOptions += ` --bad ${options.bad} `;

        if (options?.path)
            bisectOptions += ` --path ${options.path} `;

        if (options?.open)
            bisectOptions += ` --open `;

        if (options?.run)
            bisectOptions += ` --run ${options.run} `;


        return this.vercelCommandService.execute('bisect', options, bisectOptions);
    }
}

export {BisectService};