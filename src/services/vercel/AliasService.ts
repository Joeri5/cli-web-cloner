import {inject, injectable} from "tsyringe";
import {
    IAliasListOptions,
    IAliasRemoveOptions,
    IAliasService,
    IGlobalOptions,
    IVercelCommandService
} from "../../interfaces";

@injectable()
class AliasService implements IAliasService {
    constructor(@inject('IVercelCommandService') private vercelCommandService: IVercelCommandService) {
    }

    async set(deploymentUrl: string, customDomain: string, options?: IGlobalOptions): Promise<void> {
        return this.vercelCommandService.execute(`alias ${deploymentUrl} ${customDomain}`, options);
    }

    async remove(customDomain: string, options?: IAliasRemoveOptions): Promise<void> {
        return this.vercelCommandService.execute(`alias rm ${customDomain}`, options, options?.yes && '-y' || '');
    }

    async list(options?: IAliasListOptions): Promise<void> {
        return this.vercelCommandService.execute('alias ls', options, options?.limit && `--limit ${options.limit}` || '');
    }
}

export {AliasService};