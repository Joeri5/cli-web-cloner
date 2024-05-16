import "reflect-metadata";
import {container} from "tsyringe";
import {
    IAliasService,
    IBisectService,
    IBuildService,
    IDomainManager,
    IHttpClient,
    IVercelService,
    IWebsiteCloner,
    IWebsiteDeployer
} from "./interfaces";
import {
    AliasService,
    AxiosHttpClient,
    BisectService,
    BuildService,
    DomainManager,
    VercelService,
    WebsiteCloner,
    WebsiteDeployer
} from "./services";

container.register<IWebsiteCloner>('IWebsiteCloner', {useClass: WebsiteCloner});
container.register<IWebsiteDeployer>('IWebsiteDeployer', {useClass: WebsiteDeployer});
container.register<IDomainManager>('IDomainManager', {useClass: DomainManager});
container.register<IHttpClient>('IHttpClient', {useClass: AxiosHttpClient});
container.register<IVercelService>("IVercelService", VercelService);

// services needed by VercelService
container.register<IAliasService>("IAliasService", AliasService);
container.register<IBisectService>("IBisectService", BisectService);
container.register<IBuildService>("IBuildService", BuildService);
