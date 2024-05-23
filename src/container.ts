import "reflect-metadata";
import {container} from "tsyringe";
import {
    IAliasService,
    IApiService,
    IBisectService,
    IBuildService,
    IConfigExtractorService,
    IDomainManager,
    IVercelService,
    IWebsiteCloner,
    IWebsiteDeployer
} from "./interfaces";
import {
    AliasService,
    AxiosApiService,
    BisectService,
    BuildService,
    CertsService,
    ConfigExtractorService,
    DomainManager,
    VercelService,
    WebsiteCloner,
    WebsiteDeployer,
    WriteConfigService
} from "./services";
import {ICertsService} from "./interfaces/vercel/ICertsService";
// import {ConfigService} from "./services/ConfigService";

container.register<IWebsiteCloner>('IWebsiteCloner', {
    useClass: WebsiteCloner
});

container.register<IWebsiteDeployer>('IWebsiteDeployer', {
    useClass: WebsiteDeployer
});

container.register<IDomainManager>('IDomainManager', {
    useClass: DomainManager
});

container.register<IApiService>("IApiService", {
    useClass: AxiosApiService,
});

container.register<IVercelService>("IVercelService", {
    useClass: VercelService,
});

// --------------------------------------------------------------------------------------------------------------------
container.register<IConfigExtractorService>("IConfigExtractorService", {
    useClass: ConfigExtractorService,
});

// <---- services needed by VercelService ---->
container.register<IAliasService>("IAliasService", {
    useClass: AliasService,
});

container.register<IBisectService>("IBisectService", {
    useClass: BisectService,
});

container.register<IBuildService>("IBuildService", {
    useClass: BuildService,
});

container.register<ICertsService>("ICertsService", {
    useClass: CertsService,
});

// --------------------------------------------------------------------------------------------------------------------
// container.register("IConfigService", {
//     useClass: ConfigService,
// });

// <---- services needed by ConfigService ---->
container.register("IReadConfigService", {
    useClass: ConfigExtractorService,
});

container.register("IWriteConfigService", {
    useClass: WriteConfigService,
});