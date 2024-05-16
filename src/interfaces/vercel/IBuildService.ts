import {IBuildOptions} from "./options/build";

export interface IBuildService {
    build(options?: IBuildOptions): Promise<void>;
}