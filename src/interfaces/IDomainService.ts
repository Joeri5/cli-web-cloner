export interface IDomainService {
    buyDomain(domain: string, vercelDns: boolean): Promise<void>;

    checkDomain(domain: string): Promise<void>;

    listTransipDomains(): Promise<void>;

    listVercelDomains(): Promise<void>;

    listAllDomains(): Promise<void>;
}