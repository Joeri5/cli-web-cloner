import {IAliasService, IBisectService} from "./vercel";

interface IVercelService {
    // alias
    // apply custom domain aliases to a Vercel deployment
    alias: IAliasService;

    // bisect
    // perform binary search on deployments to help surface issues
    bisect: IBisectService;
}

export {IVercelService};