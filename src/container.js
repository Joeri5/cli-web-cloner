"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const services_1 = require("./services");
tsyringe_1.container.register('IWebsiteCloner', { useClass: services_1.WebsiteCloner });
tsyringe_1.container.register('IWebsiteDeployer', { useClass: services_1.WebsiteDeployer });
tsyringe_1.container.register('IDomainManager', { useClass: services_1.DomainManager });
