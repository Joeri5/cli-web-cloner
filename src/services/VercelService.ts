import {
    IAliasService,
    IBisectService,
    IBuildService,
    ICertsService,
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
    ) {
    }
}