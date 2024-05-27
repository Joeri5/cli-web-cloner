#!/usr/bin/env node

import "reflect-metadata";
import {Command} from "commander";
import {container} from "tsyringe";
import {IApiService, IDomainManager, IVercelService, IWebsiteCloner, IWebsiteDeployer} from "./interfaces";
import "./container";
import select from "@inquirer/select";


const program = new Command();

program
    .name("web-clone-deployer")
    .description("CLI to clone, deploy websites and add domains")
    .version("1.0.0");

const vercelCommand = program
    .command('vercel')
    .description('Vercel related commands');

vercelCommand
    .command('init')
    .description('Initialize a new project')
    .argument('<projectName>', 'Name of the project')
    .option('-f, --framework <type>', 'Framework to use')
    .action(async (projectName: string, options: Record<string, string>) => {
        const vercelService = container.resolve<IVercelService>("IVercelService");
        const apiClient = container.resolve<IApiService>("IApiService");

        let exampleList = await apiClient.get('https://now-example-files.zeit.sh/v2/list.json');

        if (options.framework)
            await vercelService.init.init(projectName, options.framework);
        else {
            select({
                message: 'Select a framework',
                choices: exampleList.data
            }).then(async (answer: any) => {
                await vercelService.init.init(projectName, answer);
            });
        }
    });


const authCommand = vercelCommand
    .command('auth')
    .description('Authenticate with Vercel');

authCommand
    .command('login')
    .description('Login to Vercel account')
    .argument('<email>', 'Email address to use for Vercel login')
    .action(async (email: string) => {
        const vercelService = container.resolve<IVercelService>("IVercelService");

        if (await vercelService.auth.isAuthenticated())
            return console.log("You are already logged in.");

        try {
            await vercelService.auth.login(email);
        } catch (error) {
            console.error("Error logging in. Please try again later.");
        }
    });

authCommand
    .command('logout')
    .description('Logout from Vercel account')
    .action(async () => {
        const vercelService = container.resolve<IVercelService>("IVercelService");

        if (!await vercelService.auth.isAuthenticated())
            return console.log("You are not logged in.");

        try {
            await vercelService.auth.logout();
        } catch (error) {
            console.error("Error logging out. Please try again later.");
        }
    });

authCommand
    .command('whoami')
    .description('Check the currently authenticated user')
    .action(async () => {
        const vercelService = container.resolve<IVercelService>("IVercelService");

        if (!await vercelService.auth.isAuthenticated())
            return console.log("You are not logged in.");

        try {
            await vercelService.auth.whoami();
        } catch (error) {
            console.error("Error checking user. Please try again later.");
        }
    });

authCommand
    .command('status')
    .description('Check the authentication status')
    .action(async () => {
        const vercelService = container.resolve<IVercelService>("IVercelService");

        if (await vercelService.auth.isAuthenticated())
            return console.log("You are logged in.");
        console.log("You are not logged in.");
    });

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