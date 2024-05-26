import {IGlobalOptions} from "./vercel";

export interface IVercelCommandService {
    execute(command: string, options?: IGlobalOptions): Promise<void>;
}