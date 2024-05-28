import {IDeployOptions} from "./options";

export interface IDeployService {
    deploy(options?: IDeployOptions): Promise<void>
}