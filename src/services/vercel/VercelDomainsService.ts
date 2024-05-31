import {inject, injectable} from "tsyringe";
import {
    IDomainAddOptions,
    IDomainsListOptions,
    IDomainsRemoveOptions,
    IGlobalOptions,
    IVercelCommandService,
    IVercelDomainsService
} from "../../interfaces";

@injectable()
export class VercelDomainsService implements IVercelDomainsService {
    constructor(@inject('IVercelCommandService') private readonly vercelCommandService: IVercelCommandService) {
    }

    async add(domain: string, project: string, options?: IDomainAddOptions): Promise<void> {
        let addOptions = '';

        if (options?.force)
            addOptions += ' --force';

        await this.vercelCommandService.execute(`domains add ${domain} ${project}`, options, addOptions);
    }

    async buy(domain: string, options?: IGlobalOptions): Promise<void> {
        await this.vercelCommandService.execute(`domains buy ${domain}`, options);
    }

    async inspect(domain: string, options?: IGlobalOptions): Promise<void> {
        await this.vercelCommandService.execute(`domains inspect ${domain}`, options);
    }

    async list(options?: IDomainsListOptions): Promise<void> {
        let listOptions = '';

        if (options?.limit)
            listOptions += ' --limit ' + options.limit;

        await this.vercelCommandService.execute(`domains ls`, options, listOptions);
    }

    async move(domain: string, scopeName: string, options?: IGlobalOptions): Promise<void> {
        await this.vercelCommandService.execute(`domains move ${domain} ${scopeName}`, options);
    }

    async remove(domain: string, options?: IDomainsRemoveOptions): Promise<void> {
        let removeOptions = '';

        if (options?.yes)
            removeOptions += ' --yes';

        await this.vercelCommandService.execute(`domains rm ${domain}`, options, removeOptions);
    }

    async transfer(domain: string, options?: IGlobalOptions): Promise<void> {
        await this.vercelCommandService.execute(`domains transfer ${domain}`, options);
    }
}