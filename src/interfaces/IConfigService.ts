import {IDeleteConfigService, IReadConfigService, IUpdateConfigService, IWriteConfigService} from "./config";

export interface IConfigService {
    // write config file
    writeConfig: IWriteConfigService;

    // read config file
    readConfig: IReadConfigService;

    // update config file
    updateConfig: IUpdateConfigService;

    // delete config file
    deleteConfig: IDeleteConfigService;
}