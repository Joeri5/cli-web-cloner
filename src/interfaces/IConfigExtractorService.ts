export interface IConfigExtractorService {
    // extract config file
    extract(): Promise<void> | undefined;

    // extract config file child
    extractChild(child: string): Record<string, Record<string, string>> | undefined;

    // extract config file key from child
    extractKeyFromChild(child: string, key: string): Record<string, string> | undefined;
}