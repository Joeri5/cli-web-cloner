export interface IDomainService {
    buyDomain(domain: string): Promise<void>;

    checkDomain(domain: string): Promise<void>;

    listTransipDomains(vercel: boolean, transip: boolean, all: boolean): Promise<void>;

    listVercelDomains(vercel: boolean, transip: boolean, all: boolean): Promise<void>;

    listAllDomains(vercel: boolean, transip: boolean, all: boolean): Promise<void>;
}