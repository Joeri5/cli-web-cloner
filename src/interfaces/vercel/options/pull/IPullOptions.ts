import {IGlobalOptions} from "../IGlobalOptions";

export interface IPullOptions extends IGlobalOptions {
    environment?: string;
    gitBranch?: string;
    yes?: boolean;
}