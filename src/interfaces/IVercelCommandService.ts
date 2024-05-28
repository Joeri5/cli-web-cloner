import {IGlobalOptions} from "./vercel";

export interface IVercelCommandService {
    execute(command: string, globalOptions?: IGlobalOptions, options?: string): Promise<void>;
}