import {IBuildOptions} from "./options";

export interface IBuildService {
    build(options?: IBuildOptions): Promise<void>;
}