import fs from 'fs';
import axios from 'axios';
import { exec } from 'child_process';
import path from 'path';

export async function cloneWebsite(sourceUrl: string, destDir: string) {
    try {
        const response = await axios.get(sourceUrl);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir);
        }
        fs.writeFileSync(path.join(destDir, 'index.html'), response.data);
        console.log(`Website cloned to ${destDir}`);
    } catch (error) {
        console.error(`Failed to clone website: ${error.message}`);
    }
}

export function deployWebsite(sourceDir: string) {
    exec(`vercel --prod ${sourceDir}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error deploying website: ${error.message}`);
            return;
        }
        console.log(`Deployment successful: ${stdout}`);
    });
}

export function addDomain(projectId: string, domain: string) {
    exec(`vercel domains add ${domain} --project ${projectId}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error adding domain: ${error.message}`);
            return;
        }
        console.log(`Domain ${domain} added to project ${projectId}`);
    });
}