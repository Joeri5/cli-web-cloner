import {IGlobalOptions} from "../IGlobalOptions";

export interface IDeployOptions extends IGlobalOptions {
    path?: string;
    prebuilt?: boolean;
    builtEnv?: string | string[];
    yes?: boolean;
    env?: string | string[];
    name?: string;
    prod?: boolean;
    skipDomain?: boolean;
    public?: boolean;
    regions?: string;
    noWait?: boolean;
    force?: boolean;
    withCache?: boolean;
    archive?: string;
}