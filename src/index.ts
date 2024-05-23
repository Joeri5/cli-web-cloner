#!/usr/bin/env node

import "reflect-metadata";
import {Command} from "commander";
import {container} from "tsyringe";
import {IApiService, IDomainManager, IWebsiteCloner, IWebsiteDeployer} from "./interfaces";
import "./container";
import {clearDotLoader, createDotLoader} from "./utility";
import {readConfigFile, writeConfigFile} from "./utility/config";
import {extract, extractChild} from "./hello";

const program = new Command();

program
    .name("web-clone-deployer")
    .description("CLI to clone, deploy websites and add domains")
    .version("1.0.0");

program
    .command("dir")
    .description("Get the current directory")
    .action(async () => {
        const content = await extract();
        console.log(content);

        const child = await extractChild("child2");
        console.log(child);
    })

program
    .command('login')
    .description('Authenticate with Vercel using email')
    .argument('<email>', 'Email address to use for Vercel login')
    .action(async (email: string) => {
        const apiService = container.resolve<IApiService>("IApiService");

        const showError = (message: string) => {
            console.error(message);
        };

        try {
            const loaderInterval = createDotLoader('Email verification in progress. Please check your inbox and spam folder.');

            const response = await apiService.post("https://api.vercel.com/v2/registration?mode=login", {
                email: email,
                tokenName: "cloner"
            });

            if (!response) {
                clearDotLoader(loaderInterval, "Error logging in. Please try again later.");
                return;
            }

            let attemptCount = 0;
            const maxAttempts = 12; // Try for a minute (12 * 5 seconds)

            const checkEmailValidation = async () => {
                try {
                    const result = await apiService.get(`https://api.vercel.com/registration/verify?token=${response.data.token}&email=${email}`);
                    if (result.data.token) {
                        writeConfigFile('VERCEL_TOKEN', result.data.token);
                        readConfigFile(); // Trigger a read to update the config
                        clearDotLoader(loaderInterval, "Email verified successfully!");
                        clearInterval(validationInterval);
                        return true; // Verification successful
                    }
                } catch (error) {
                    // Ignore error
                }

                attemptCount++;
                if (attemptCount >= maxAttempts) {
                    clearDotLoader(loaderInterval, "Verification failed after multiple attempts. Please try again.");
                    clearInterval(validationInterval);
                    return true; // Max attempts reached
                }
                return false; // Continue trying
            };

            const validationInterval = setInterval(async () => {
                const done = await checkEmailValidation();
                if (done) clearInterval(validationInterval);
            }, 5000); // Try every 5 seconds

        } catch (error) {
            showError("Error logging in. Please try again later.");
        }
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