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
    IVercelService
} from "../interfaces";
import {inject, injectable} from "tsyringe";

@injectable()
export class VercelService implements IVercelService {
    constructor(
        @inject("IAliasService") public alias: IAliasService,
        @inject("IBisectService") public bisect: IBisectService,
        @inject("IBuildService") public build: IBuildService,
        @inject("ICertsService") public certs: ICertsService,
        @inject("IVercelAuthService") public auth: IVercelAuthService,
        @inject("IInitService") public init: IInitService,
        @inject("IProjectService") public project: IProjectService,
        @inject("ILinkService") public link: ILinkService,
        @inject("IPullService") public pull: IPullService,
        @inject("IDeployService") public deploy: IDeployService,
    ) {
    }
}