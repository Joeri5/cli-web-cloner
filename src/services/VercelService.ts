import {IAliasService, IBisectService, IBuildService, IVercelService} from "../interfaces";
import {inject, injectable} from "tsyringe";
import {ICertsService} from "../interfaces/vercel/ICertsService";

@injectable()
class VercelService implements IVercelService {
    constructor(
        @inject("IAliasService") public alias: IAliasService,
        @inject("IBisectService") public bisect: IBisectService,
        @inject("IBuildService") public build: IBuildService,
        @inject("ICertsService") public certs: ICertsService,
    ) {
    }
}

export {VercelService};