import {IAliasService, IBisectService, IBuildService, ICertsService, IInitService, IVercelAuthService} from "./vercel";

export interface IVercelService {
    // alias
    // apply custom domain aliases to a Vercel deployment
    alias: IAliasService;

    // bisect
    // perform binary search on deployments to help surface issues
    bisect: IBisectService;

    // build
    // build a vercel project locally or in your own ci environment
    build: IBuildService;

    // certs
    // manage certificates for your domains
    certs: ICertsService;

    // auth
    // manage authentication with vercel
    auth: IVercelAuthService;

    // init
    // initialize a new vercel project
    init: IInitService;
}