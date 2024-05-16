export interface IWebsiteCloner {
    clone(sourceUrl: string, destDir: string): Promise<void>;
}