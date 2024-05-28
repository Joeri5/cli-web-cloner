import {ILinkOptions} from "./options";

export interface ILinkService {
    link(options?: ILinkOptions): Promise<void>;
}