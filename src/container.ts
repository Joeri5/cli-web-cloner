import "reflect-metadata";
import {container} from "tsyringe";
import {IDomainManager, IWebsiteCloner, IWebsiteDeployer} from "./interfaces";
import {DomainManager, WebsiteCloner, WebsiteDeployer} from "./services";

container.register<IWebsiteCloner>('IWebsiteCloner', {useClass: WebsiteCloner});
container.register<IWebsiteDeployer>('IWebsiteDeployer', {useClass: WebsiteDeployer});
container.register<IDomainManager>('IDomainManager', {useClass: DomainManager});
