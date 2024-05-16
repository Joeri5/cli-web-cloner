import {IAliasService} from "./vercel";

export interface IVercelService {
    // alias
    // apply custom domain aliases to a Vercel deployment
    alias: IAliasService;
}