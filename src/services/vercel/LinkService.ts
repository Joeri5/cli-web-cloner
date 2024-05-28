import {ILinkService, IVercelCommandService} from "../../interfaces";
import {ILinkOptions} from "../../interfaces/vercel/options/link";
import {inject, injectable} from "tsyringe";

@injectable()
export class LinkService implements ILinkService {
    constructor(@inject('IVercelCommandService') private vercelCommandService: IVercelCommandService) {
    }

    link(options?: ILinkOptions) {
        let linkOptions = '';

        if (options?.project)
            linkOptions += ` --project ${options.project} `;

        if (options?.yes)
            linkOptions += ` --yes `;

        return this.vercelCommandService.execute(`link`, options, linkOptions);
    }
}