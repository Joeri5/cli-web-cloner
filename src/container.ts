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
    IDeployService,
    IDomainManager,
    IDomainService,
    IInitService,
    ILinkService,
    IProjectService,
    IPullService,
    IReadConfigService,
    ITransipService,
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
    DeployService,
    DomainManager,
    DomainService,
    InitService,
    LinkService,
    ProjectService,
    PullService,
    ReadConfigService,
    TransipService,
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

container.register<IProjectService>("IProjectService", {
    useClass: ProjectService,
});

container.register<ILinkService>("ILinkService", {
    useClass: LinkService,
});

container.register<IPullService>("IPullService", {
    useClass: PullService,
});

container.register<IDeployService>("IDeployService", {
    useClass: DeployService,
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

//-------------------------------------------------------------------------------------------------------------------
container.register<IDomainService>("IDomainService", {
    useClass: DomainService,
});

//-------------------------------------------------------------------------------------------------------------------
container.register<ITransipService>("ITransipService", {
    useClass: TransipService,
})

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