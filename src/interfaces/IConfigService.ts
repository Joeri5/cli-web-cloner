import {IDeleteConfigService, IReadConfigService, IUpdateConfigService, IWriteConfigService} from "./config";

export interface IConfigService {
    // write config file
    write: IWriteConfigService;

    // read config file
    read: IReadConfigService;

    // update config file
    update: IUpdateConfigService;

    // delete config file
    delete: IDeleteConfigService;

}