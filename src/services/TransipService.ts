import {IConfigService, ITransipService} from "../interfaces";
import {inject, injectable} from "tsyringe";

@injectable()
export class TransipService implements ITransipService {
    constructor(@inject("IConfigService") private configService: IConfigService) {
    }

    async writeToken(token: string) {
        return await this.configService.writeConfig.write('transip', {token: token});
    }

    async readToken() {
        return await this.configService.readConfig.readKeyFromChild('transip', 'token');
    }

    async updateToken(token: string) {
        await this.deleteToken();
        return await this.configService.writeConfig.write('transip', {token: token});
    }

    async deleteToken() {
        return await this.configService.deleteConfig.deleteKeyFromChild('transip', 'token');
    }
}