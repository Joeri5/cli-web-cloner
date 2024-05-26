import {IInitOptions} from "./options/init";

export interface IInitService {
    init(projectName: string, options?: IInitOptions): Promise<void>;
}