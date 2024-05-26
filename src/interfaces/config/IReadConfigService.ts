export interface IReadConfigService {
    // read config file child
    readChild(child: string): Promise<Record<string, string>>;

    // read config file key from child
    readKeyFromChild(child: string, key: string): Promise<string>;
}