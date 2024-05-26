import {IBisectOptions, IBisectService, IVercelCommandService} from "../../interfaces";
import {inject, injectable} from "tsyringe";

@injectable()
class BisectService implements IBisectService {
    constructor(@inject('IVercelCommandService') private vercelCommandService: IVercelCommandService) {
    }

    async bisect(options?: IBisectOptions): Promise<void> {
        return this.vercelCommandService.execute('bisect', options);
    }
}

export {BisectService};