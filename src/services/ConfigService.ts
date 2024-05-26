import {inject, injectable} from "tsyringe";
import {
    IConfigService,
    IDeleteConfigService,
    IReadConfigService,
    IUpdateConfigService,
    IWriteConfigService
} from "../interfaces";

@injectable()
export class ConfigService implements IConfigService {
    constructor(
        @inject("IWriteConfigService") public writeConfig: IWriteConfigService,
        @inject("IReadConfigService") public readConfig: IReadConfigService,
        @inject("IUpdateConfigService") public updateConfig: IUpdateConfigService,
        @inject("IDeleteConfigService") public deleteConfig: IDeleteConfigService,
    ) {
    }
}