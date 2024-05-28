import {IInitOptions} from "./options";

export interface IInitService {
    init(projectName: string, framework?: string, options?: IInitOptions): Promise<void>;
}