import {IGlobalOptions} from "../IGlobalOptions";

export interface IBuildOptions extends IGlobalOptions {
    prod?: boolean;
    yes?: boolean;
}