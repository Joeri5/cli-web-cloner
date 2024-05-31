import {inject, injectable} from "tsyringe";
import {IApiService, IConfigService, IDomainService} from "../interfaces";

@injectable()
export class DomainService implements IDomainService {
    constructor(@inject('IApiService') private apiService: IApiService, @inject('IConfigService') private configService: IConfigService) {
    }

    private transipToken = this.configService.readConfig.readKeyFromChild('transip', 'token');
    private vercelToken = this.configService.readConfig.readKeyFromChild('vercel', 'token');

    async buyDomain(domain: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async checkDomain(domain: string): Promise<void> {
        const availability = await this.apiService.get(`https://api.transip.nl/v6/domain-availability/${domain}`, await this.transipToken).then((r) => r.data.availability.status);

        if (availability !== 'free') {
            console.log(`Domain ${domain} is not available`);
        } else {
            // get the top level domain of the domain
            const tld = domain.split('.').pop();
            const price = await this.apiService.get(`https://api.transip.nl/v6/tlds/.${tld}`, await this.transipToken).then((r) => r.data.tld.price);
            // the price is in cents, so divide by 100 to get the price in euros and multiply by 1.21 to get the price including VAT (21%) then round to 2 decimals
            const incVatPrice = Math.round(price / 100 * 1.21 * 100) / 100;
            console.log(`Domain ${domain} is available for €${incVatPrice} including VAT`);
        }
    }

    async listTransipDomains(vercel: boolean, transip: boolean, all: boolean): Promise<void> {
        // get javascript timestamp in seconds
        const now = Math.floor(Date.now() / 1000);
        // get all domains
        const domains = await this.apiService.get(`https://api.transip.nl/v6/domain?until=${now}`, await this.transipToken).then((r) => r.data.domains);
    }

    async listVercelDomains(vercel: boolean, transip: boolean, all: boolean): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async listAllDomains(vercel: boolean, transip: boolean, all: boolean): Promise<void> {
        throw new Error("Method not implemented.");
    }
}