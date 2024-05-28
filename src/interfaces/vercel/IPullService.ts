import {IPullOptions} from "./options";

export interface IPullService {
    pull(options: IPullOptions): Promise<void>
}