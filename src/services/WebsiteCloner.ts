import {inject, injectable} from "tsyringe";
import fs from "fs";
import path from "path";
import {IApiService, IWebsiteCloner} from "../interfaces";

@injectable()
class WebsiteCloner implements IWebsiteCloner {
    constructor(@inject('IApiService') private apiService: IApiService) {
    }

    async clone(sourceUrl: string, destDir: string): Promise<void> {
        try {
            const response = await this.apiService.get(sourceUrl);
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir);
            }
            fs.writeFileSync(path.join(destDir, "index.html"), response.data);
            console.log(`Website cloned to ${destDir}`);
        } catch (error: any) {
            console.log(`Failed to clone website: ${error.message}`);
        }
    }
}

export {WebsiteCloner};