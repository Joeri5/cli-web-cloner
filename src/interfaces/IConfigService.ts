import {IDeleteConfigService, IReadConfigService, IValidateConfigService, IWriteConfigService} from "./config";

export interface IConfigService {
    // read config file
    read: IReadConfigService;

    // write config file
    write: IWriteConfigService;

    // delete config file
    delete: IDeleteConfigService;

    // validate config file
    validate: IValidateConfigService;
}