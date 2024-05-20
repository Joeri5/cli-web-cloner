import "reflect-metadata";
import {Command} from "commander";
import {container} from "tsyringe";
import {IDomainManager, IWebsiteCloner, IWebsiteDeployer} from "./interfaces";

const program = new Command();

program
    .name("web-clone-deployer")
    .description("CLI to clone, deploy websites and add domains")
    .version("1.0.0");

program
    .command("clone")
    .description("Clone a website")
    .argument('<sourceUrl>', "URL of the website to clone")
    .argument('<destDir>', "Destination directory for the cloned website")
    .action(async (sourceUrl: string, destDir: string) => {
        const cloner = container.resolve<IWebsiteCloner>("IWebsiteCloner");
        await cloner.clone(sourceUrl, destDir);
    });

program
    .command("deploy")
    .description("Deploy the cloned website")
    .argument('<sourceDir>', "Source directory of the cloned website")
    .action((sourceDir: string) => {
        const deployer = container.resolve<IWebsiteDeployer>("IWebsiteDeployer");
        deployer.deploy(sourceDir);
    });

program
    .command("add-domain")
    .description("Add a domain to the deployed website")
    .argument('<projectId>', "Vercel project ID")
    .argument('<domain>', "Domain to add")
    .action((projectId: string, domain: string) => {
        const manager = container.resolve<IDomainManager>("IDomainManager");
        manager.addDomain(projectId, domain);
    });

program.parse(process.argv);