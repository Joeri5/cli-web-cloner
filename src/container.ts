import "reflect-metadata";
import {container} from "tsyringe";
import {IDomainManager, IHttpClient, IWebsiteCloner, IWebsiteDeployer} from "./interfaces";
import {AxiosHttpClient, DomainManager, WebsiteCloner, WebsiteDeployer} from "./services";

container.register<IWebsiteCloner>('IWebsiteCloner', {useClass: WebsiteCloner});
container.register<IWebsiteDeployer>('IWebsiteDeployer', {useClass: WebsiteDeployer});
container.register<IDomainManager>('IDomainManager', {useClass: DomainManager});
container.register<IHttpClient>('IHttpClient', {useClass: AxiosHttpClient});