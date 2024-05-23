export interface IReadConfigService {
    // read config file child
    readChild(child: string): Promise<Record<string, string> | undefined>;

    // read config file key from child
    readKeyFromChild(child: string, key: string): Promise<Record<string, string> | undefined>;
}