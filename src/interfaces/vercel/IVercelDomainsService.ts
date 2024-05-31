import {IDomainAddOptions, IDomainsListOptions, IDomainsRemoveOptions, IGlobalOptions} from "./options";

export interface IVercelDomainsService {
    list(options?: IDomainsListOptions): Promise<void>;

    inspect(domain: string, options?: IGlobalOptions): Promise<void>;

    add(domain: string, project: string, options?: IDomainAddOptions): Promise<void>;

    remove(domain: string, options?: IDomainsRemoveOptions): Promise<void>;

    buy(domain: string, options?: IGlobalOptions): Promise<void>;

    move(domain: string, scopeName: string, options?: IGlobalOptions): Promise<void>;

    transfer(domain: string, options?: IGlobalOptions): Promise<void>;
}