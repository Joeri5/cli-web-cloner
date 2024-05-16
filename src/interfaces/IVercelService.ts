import {IAliasService, IBisectService, IBuildService} from "./vercel";

interface IVercelService {
    // alias
    // apply custom domain aliases to a Vercel deployment
    alias: IAliasService;

    // bisect
    // perform binary search on deployments to help surface issues
    bisect: IBisectService;

    // build
    // build a vercel project locally or in your own ci environment
    build: IBuildService;
}

export {IVercelService};