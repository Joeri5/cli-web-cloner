import {IAliasService, IBisectService, IVercelService} from "../interfaces";
import {inject, injectable} from "tsyringe";

@injectable()
class VercelService implements IVercelService {
    constructor(
        @inject("IAliasService") public alias: IAliasService,
        @inject("IBisectService") public bisect: IBisectService
    ) {
    }
}

export {VercelService};