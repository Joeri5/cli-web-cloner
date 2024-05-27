import {IInitOptions} from "./options/init";

export interface IInitService {
    init(projectName: string, framework?: string, options?: IInitOptions): Promise<void>;
}