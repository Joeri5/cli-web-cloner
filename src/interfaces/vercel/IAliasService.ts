import {IAliasListOptions, IAliasRemoveOptions, IGlobalOptions} from "./options";

export interface IAliasService {
    set(deploymentUrl: string, customDomain: string, options?: IGlobalOptions): Promise<void>;

    remove(customDomain: string, options?: IAliasRemoveOptions): Promise<void>;

    list(options?: IAliasListOptions): Promise<void>;
}