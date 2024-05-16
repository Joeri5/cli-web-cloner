import {IGlobalOptions} from "../IGlobalOptions";

export interface IBisectOptions extends IGlobalOptions {
    good?: string;
    bad?: string;
    path?: string;
    open?: boolean;
    run?: string;
}