export interface IWebsiteDeployer {
    deploy(sourceDir: string): void;
}