import {injectable} from "tsyringe";
import axios from "axios";
import fs from "fs";
import path from "path";
import {IWebsiteCloner} from "../interfaces";

@injectable()
class WebsiteCloner implements IWebsiteCloner {
    async clone(sourceUrl: string, destDir: string): Promise<void> {
        try {
            const response = await axios.get(sourceUrl);
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