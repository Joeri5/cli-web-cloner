import {IProjectsListOptions} from "./options";
import {ApiRequestResult} from "../../models";

export interface IProjectService {
    list(options?: IProjectsListOptions): Promise<void>;

    get(projectName?: string): Promise<ApiRequestResult>;

    add(projectName: string): Promise<void>;

    remove(projectName: string): Promise<void>;
}