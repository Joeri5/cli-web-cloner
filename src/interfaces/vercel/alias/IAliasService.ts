import {IAliasRemoveOptions} from "./IAliasRemoveOptions";
import {IAliasListOptions} from "./IAliasListOptions";

export interface IAliasService {
    set(deploymentUrl: string, customDomain: string): Promise<void>;

    remove(customDomain: string, options?: IAliasRemoveOptions): Promise<void>;

    list(options?: IAliasListOptions): Promise<void>;
}