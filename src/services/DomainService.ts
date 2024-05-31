import {inject, injectable} from "tsyringe";
import {IApiService, IConfigService, IDomainService} from "../interfaces";

@injectable()
export class DomainService implements IDomainService {
    constructor(@inject('IApiService') private apiService: IApiService, @inject('IConfigService') private configService: IConfigService) {
    }

    private transipToken = this.configService.readConfig.readKeyFromChild('transip', 'token');
    private vercelToken = this.configService.readConfig.readKeyFromChild('vercel', 'token');

    async buyDomain(domain: string, vercelDns: boolean): Promise<void> {
        const nameServerData = {
            domainName: domain,
            nameservers: [
                {
                    hostname: 'ns1.vercel-dns.com',
                    ipv4: '',
                    ipv6: ''
                },
                {
                    hostname: 'ns2.vercel-dns.com',
                    ipv4: '',
                    ipv6: ''
                }
            ]
        };
        const data = vercelDns ? nameServerData : {domainName: domain};
        await this.apiService.post(`https://api.transip.nl/v6/domains`, data, await this.transipToken)
            .then(() => console.log(`Domain ${domain} bought`))
            .catch((e) => console.error(`Error buying domain ${domain}: ${e.message}`));
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

    async listTransipDomains(): Promise<void> {
        console.log(await this.apiService.get(`https://api.transip.nl/v6/domains`, await this.transipToken).then((r) => r.data.domains.map((d: any) => d.name)));
    }

    async listVercelDomains(): Promise<void> {
        console.log(await this.apiService.get(`https://api.vercel.com/v5/domains`, await this.vercelToken).then((r) => r.data.domains.map((d: any) => d.name)));
    }

    async listAllDomains(): Promise<void> {
        console.log('Transip domains:');
        await this.listTransipDomains();
        console.log('Vercel domains:');
        await this.listVercelDomains();
    }
}