"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const commander_1 = require("commander");
const tsyringe_1 = require("tsyringe");
require("./container");
const program = new commander_1.Command();
program
    .name("web-clone-deployer")
    .description("CLI to clone, deploy websites and add domains")
    .version("1.0.0");
program
    .command("clone")
    .description("Clone a website")
    .argument('<sourceUrl>', "URL of the website to clone")
    .argument('<destDir>', "Destination directory for the cloned website")
    .action((sourceUrl, destDir) => __awaiter(void 0, void 0, void 0, function* () {
    const cloner = tsyringe_1.container.resolve("IWebsiteCloner");
    yield cloner.clone(sourceUrl, destDir);
}));
program
    .command("deploy")
    .description("Deploy the cloned website")
    .argument('<sourceDir>', "Source directory of the cloned website")
    .action((sourceDir) => {
    const deployer = tsyringe_1.container.resolve("IWebsiteDeployer");
    deployer.deploy(sourceDir);
});
program
    .command("add-domain")
    .description("Add a domain to the deployed website")
    .argument('<projectId>', "Vercel project ID")
    .argument('<domain>', "Domain to add")
    .action((projectId, domain) => {
    const manager = tsyringe_1.container.resolve("IDomainManager");
    manager.addDomain(projectId, domain);
});
program.parse(process.argv);
