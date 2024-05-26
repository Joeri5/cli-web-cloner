export interface IConfigExtractorService {
    // extract config file
    extract(): Promise<string>;

    // extract config file child
    extractChild(child: string): Promise<Record<string, string>>;

    // extract config file key from child
    extractKeyFromChild(child: string, key: string): Promise<string>;
}