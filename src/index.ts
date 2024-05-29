#!/usr/bin/env node

import "reflect-metadata";
import {Command} from "commander";
import {container} from "tsyringe";
import {
    IApiService,
    IBuildOptions,
    IDeployService,
    IDomainManager,
    IProjectService,
    IVercelService,
    IWebsiteDeployer
} from "./interfaces";
import "./container";
import select from "@inquirer/select";


const program = new Command();

program
    .name("web-clone-deployer")
    .description("CLI to clone, deploy websites and add domains")
    .version("1.0.0");

program
    .command('test')
    .description('Test the CLI')
    .action(() => {
        console.log("Test successful");
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

        // const allProjects = await projectService.get().then((result) => result.data);
        // console.log(allProjects?.projects[0]?.targets?.production?.alias[0]);
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