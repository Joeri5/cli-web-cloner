#!/usr/bin/env node

import "reflect-metadata";
import {Command} from "commander";
import {container} from "tsyringe";
import {
    IApiService,
    IBuildOptions,
    IDeployService,
    IDomainService,
    IProjectService,
    ITransipService,
    IVercelService,
} from "./interfaces";
import "./container";
import select from "@inquirer/select";
import dotenv from "dotenv";


const program = new Command();
dotenv.config();

program
    .name("web-clone-deployer")
    .description("CLI to clone, deploy websites and add domains")
    .version("1.0.0");

program
    .command('test')
    .description('Test the CLI')
    .action(() => {
        console.log("Test successful");
        console.log(process.env.TEST);
    });

program
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
            let choices = exampleList.data.map((example: any) => {
                return {
                    name: example.name,
                    value: example.name,
                    description: example.description,
                }
            });

            const answer: string = await select({
                message: 'Select a framework',
                choices: choices,
            });

            await vercelService.init.init(projectName, answer);
        }
    });

program
    .command('link')
    .description('Link a project')
    .option('-y, --yes', 'Skip confirmation')
    .option('-p, --project <name>', 'Project name')
    .action(async (options: any) => {
        console.log(options);
        const vercelService = container.resolve<IVercelService>("IVercelService");
        await vercelService.link.link(options);
    });

program
    .command('list')
    .description('List projects')
    .option('-u, --updateRequired', 'Update the list')
    .action(async (options: any) => {
        console.log(options);
        const vercelService = container.resolve<IVercelService>("IVercelService");
        await vercelService.project.list(options);
    });

program
    .command('build')
    .description('Build the project')
    .option('-p, --production', 'Build for production')
    .option('-y, --yes', 'Skip confirmation')
    .action(async (options: IBuildOptions) => {
        const vercelService = container.resolve<IVercelService>("IVercelService");
        await vercelService.build.build(options);
    });

program
    .command('pull')
    .description('Pull the project')
    .option('-e, --environment <name>', 'Environment name')
    .option('-g, --gitBranch <name>', 'Git branch name')
    .option('-y, --yes', 'Skip confirmation')
    .action(async (options: any) => {
        const vercelService = container.resolve<IVercelService>("IVercelService");
        await vercelService.pull.pull(options);
    });

const authCommand = program
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
    .argument('<projectName>', "Name of the project")
    .action(async (projectName: string) => {
        const projectService = container.resolve<IProjectService>("IProjectService");
        const deployerService = container.resolve<IDeployService>("IDeployService");

        const projects = await projectService.get(projectName).then((result) => result.data);
        if (!projects)
            await deployerService.deploy({yes: true, prod: true});

        else {
            console.log("Project already exists. Do you want to overwrite it?");
            const answer = await select({
                message: 'Select an option',
                choices: [
                    {name: 'Yes', value: 'yes'},
                    {name: 'No', value: 'no'},
                ],
            });

            if (answer === 'yes')
                await deployerService.deploy({yes: true, prod: true});
        }

        const allProjects = await projectService.get().then((result) => result.data);
        console.log('https://' + allProjects?.projects[0]?.targets?.production?.alias[0]);
    });

const transipCommand = program
    .command('transip')
    .description("Transip commands");

transipCommand
    .command('set-token')
    .description('Set the Transip API token')
    .argument('<token>', 'Transip API token')
    .action(async (token: string) => {
        const transipService = container.resolve<ITransipService>("ITransipService");

        try {
            await transipService.writeToken(token);
            console.log('Token set');
        } catch (error) {
            console.error('Error setting token');
        }
    });

transipCommand
    .command('get-token')
    .description('Get the Transip API token')
    .action(async () => {
        const transipService = container.resolve<ITransipService>("ITransipService");

        try {
            const token = await transipService.readToken();
            console.log('Token:', token);
        } catch (error) {
            console.error('Error getting token');
        }
    });

transipCommand
    .command('update-token')
    .description('Update the Transip API token')
    .argument('<token>', 'Transip API token')
    .action(async (token: string) => {
        const transipService = container.resolve<ITransipService>("ITransipService");

        try {
            await transipService.updateToken(token);
            console.log('Token updated');
        } catch (error) {
            console.error('Error updating token');
        }
    });

transipCommand
    .command('delete-token')
    .description('Delete the Transip API token')
    .action(async () => {
        const transipService = container.resolve<ITransipService>("ITransipService");

        try {
            await transipService.deleteToken();
            console.log('Token deleted');
        } catch (error) {
            console.error('Error deleting token');
        }
    });

const domainCommand = program
    .command('domain')
    .description('Domain commands');

domainCommand
    .command('check')
    .description('Check the availability of a domain')
    .argument('<domain>', 'Domain to check')
    .action(async (domain: string) => {
        const domainService = container.resolve<IDomainService>("IDomainService");
        await domainService.checkDomain(domain);
    });

domainCommand
    .command('list')
    .description('List domains')
    .option('-v, --vercel', 'List Vercel domains')
    .option('-t --transip', 'List Transip domains')
    .option('-a --all', 'List all domains')
    .action(async (options: any) => {
        const domainService = container.resolve<IDomainService>("IDomainService");
        if (options.vercel)
            await domainService.listVercelDomains();
        else if (options.transip)
            await domainService.listTransipDomains();
        else if (options.all)
            await domainService.listAllDomains();
    });

domainCommand
    .command('buy')
    .description('Buy a domain')
    .argument('<domain>', 'Domain to buy')
    .action(async (domain: string, options: any) => {
        const domainService = container.resolve<IDomainService>("IDomainService");
        await domainService.checkDomain(domain);

        const answer = await select({
            message: 'Do you want to buy this domain?',
            choices: [
                {name: 'Yes', value: 'yes'},
                {name: 'No', value: 'no'},
            ],
        });

        if (answer === 'yes') {

            const dnsAnswer = await select({
                message: 'Do you want to add Vercel DNS records for this domain?',
                choices: [
                    {name: 'Yes', value: 'yes'},
                    {name: 'No', value: 'no'},
                ],
            });

            if (dnsAnswer === 'yes')
                await domainService.buyDomain(domain, true);
            else
                await domainService.buyDomain(domain, false);
        }
    });

const vercelDomainCommand = domainCommand
    .command('vercel')
    .description('Vercel domain commands');

vercelDomainCommand
    .command('add')
    .description('Add a domain to a project')
    .argument('<domain>', 'Domain to add')
    .argument('<project>', 'Project to add domain to')
    .option('-f, --force', 'Force the addition of the domain')
    .action(async (domain: string, project: string, options: any) => {
        const vercelService = container.resolve<IVercelService>("IVercelService");
        await vercelService.domains.add(domain, project, options);
    });

vercelDomainCommand
    .command('buy')
    .description('Buy a domain')
    .argument('<domain>', 'Domain to buy')
    .action(async (domain: string, options: any) => {
        const domainService = container.resolve<IDomainService>("IDomainService");
        await domainService.buyDomain(domain, true);
    });

vercelDomainCommand
    .command('inspect')
    .description('Inspect a domain')
    .argument('<domain>', 'Domain to inspect')
    .action(async (domain: string, options: any) => {
        const vercelService = container.resolve<IVercelService>("IVercelService");
        await vercelService.domains.inspect(domain, options);
    });

vercelDomainCommand
    .command('list')
    .description('List domains')
    .option('-l, --limit <number>', 'Limit the number of domains')
    .action(async (options: any) => {
        const vercelService = container.resolve<IVercelService>("IVercelService");
        await vercelService.domains.list(options);
    });

vercelDomainCommand
    .command('move')
    .description('Move a domain')
    .argument('<domain>', 'Domain to move')
    .argument('<scopeName>', 'Scope name')
    .action(async (domain: string, scopeName: string, options: any) => {
        const vercelService = container.resolve<IVercelService>("IVercelService");
        await vercelService.domains.move(domain, scopeName, options);
    });

vercelDomainCommand
    .command('remove')
    .description('Remove a domain')
    .argument('<domain>', 'Domain to remove')
    .option('-y, --yes', 'Skip confirmation')
    .action(async (domain: string, options: any) => {
        const vercelService = container.resolve<IVercelService>("IVercelService");
        await vercelService.domains.remove(domain, options);
    });

vercelDomainCommand
    .command('transfer')
    .description('Transfer a domain')
    .argument('<domain>', 'Domain to transfer')
    .action(async (domain: string, options: any) => {
        const vercelService = container.resolve<IVercelService>("IVercelService");
        await vercelService.domains.transfer(domain, options);
    });

program.parse(process.argv);