import {
    IAliasService,
    IBisectService,
    IBuildService,
    ICertsService,
    IDeployService,
    IInitService,
    ILinkService,
    IProjectService,
    IPullService,
    IVercelAuthService,
    IVercelDomainsService
} from "./vercel";

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

    // project
    // manage projects on vercel
    project: IProjectService;

    // link
    // link a local project with a vercel project
    link: ILinkService;

    // pull
    // pull a vercel project to your local machine
    pull: IPullService;

    // deploy
    // deploy a vercel project
    deploy: IDeployService;

    // domains
    // manage domains on vercel
    domains: IVercelDomainsService;
}