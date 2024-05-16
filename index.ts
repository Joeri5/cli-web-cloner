import { Command } from 'commander';
import { cloneWebsite, deployWebsite, addDomain } from './actions';

const program = new Command();

program
    .name('web-clone-deployer')
    .description('CLI to clone, deploy websites and add domains')
    .version('1.0.0');

program
    .command('clone')
    .description('Clone a website')
    .argument('<sourceUrl>', 'URL of the website to clone')
    .argument('<destDir>', 'Destination directory for the cloned website')
    .action(cloneWebsite);

program
    .command('deploy')
    .description('Deploy the cloned website')
    .argument('<sourceDir>', 'Source directory of the cloned website')
    .action(deployWebsite);

program
    .command('add-domain')
    .description('Add a domain to the deployed website')
    .argument('<projectId>', 'Vercel project ID')
    .argument('<domain>', 'Domain to add')
    .action(addDomain);

program.parse(process.argv);