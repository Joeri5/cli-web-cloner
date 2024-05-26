import "reflect-metadata";
import {container} from "tsyringe";
import {
    IAliasService,
    IApiService,
    IBisectService,
    IBuildService,
    ICertsService,
    IConfigExtractorService,
    IConfigService,
    IDeleteConfigService,
    IDomainManager,
    IInitService,
    IReadConfigService,
    IUpdateConfigService,
    IVercelAuthService,
    IVercelCommandService,
    IVercelService,
    IWebsiteCloner,
    IWebsiteDeployer,
    IWriteConfigService
} from "./interfaces";
import {
    AliasService,
    AxiosApiService,
    BisectService,
    BuildService,
    CertsService,
    ConfigExtractorService,
    ConfigService,
    DeleteConfigService,
    DomainManager,
    InitService,
    ReadConfigService,
    UpdateConfigService,
    VercelAuthService,
    VercelCommandService,
    VercelService,
    WebsiteCloner,
    WebsiteDeployer,
    WriteConfigService
} from "./services";

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

// --------------------------------------------------------------------------------------------------------------------
container.register<IVercelService>("IVercelService", {
    useClass: VercelService,
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

container.register<IInitService>("IInitService", {
    useClass: InitService,
});

container.register<IVercelAuthService>("IVercelAuthService", {
    useClass: VercelAuthService,
});

//-------------------------------------------------------------------------------------------------------------------

container.register<IVercelCommandService>("IVercelCommandService", {
    useClass: VercelCommandService,
});

//-------------------------------------------------------------------------------------------------------------------
container.register<IConfigService>("IConfigService", {
    useClass: ConfigService,
});

// <---- services needed by ConfigService ---->
container.register<IConfigExtractorService>("IConfigExtractorService", {
    useClass: ConfigExtractorService,
});

container.register<IReadConfigService>("IReadConfigService", {
    useClass: ReadConfigService,
});

container.register<IWriteConfigService>("IWriteConfigService", {
    useClass: WriteConfigService,
});

container.register<IUpdateConfigService>("IUpdateConfigService", {
    useClass: UpdateConfigService,
});

container.register<IDeleteConfigService>("IDeleteConfigService", {
    useClass: DeleteConfigService,
});