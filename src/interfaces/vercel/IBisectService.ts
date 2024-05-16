import {IBisectOptions} from "./options";

export interface IBisectService {
    bisect(options?: IBisectOptions): Promise<void>;
}