import {inject, injectable} from "tsyringe";
import {IConfigExtractorService, IReadConfigService} from "../../interfaces";

@injectable()
export class ReadConfigService implements IReadConfigService {
    constructor(@inject("IConfigExtractorService") private configExtractorService: IConfigExtractorService) {
    }

    readChild(child: string): Promise<Record<string, string>> {
        return this.configExtractorService.extractChild(child);
    }

    readKeyFromChild(child: string, key: string): Promise<string> {
        return this.configExtractorService.extractKeyFromChild(child, key);
    }

}